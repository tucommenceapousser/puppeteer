/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';

import {assert} from '../../util/assert.js';
import {isErrorLike} from '../../util/ErrorLike.js';
import {EventEmitter, Handler} from '../EventEmitter.js';
import {NetworkManagerEmittedEvents} from '../NetworkManager.js';
import {debugError} from '../util.js';

import {Context} from './Context.js';
import {HTTPRequest} from './HTTPRequest.js';
import {HTTPResponse} from './HTTPResponse.js';

export class NetworkManager extends EventEmitter {
  #context: Context;
  #subscribedEvents = new Map<string, Handler<any>>([
    ['network.beforeRequestSent', this.#onBeforeRequestSent.bind(this)],
    ['network.responseStarted', this.#onResponseStarted.bind(this)],
    ['network.responseCompleted', this.#onResponseCompleted.bind(this)],
    ['network.fetchError', this.#onFetchError.bind(this)],
  ]) as Map<Bidi.Message.EventNames, Handler>;

  _requestMap = new Map<string, HTTPRequest>();

  constructor(context: Context) {
    super();
    this.#context = context;

    this.#context.connection
      .send('session.subscribe', {
        events: [...this.#subscribedEvents.keys()],
        contexts: [this.#context.id],
      })
      .catch(error => {
        if (
          isErrorLike(error) &&
          !error.message.includes('Target closed') &&
          !error.message.includes('session.subscribe')
        ) {
          throw error;
        }
      });

    for (const [event, subscriber] of this.#subscribedEvents) {
      this.#context.on(event, subscriber);
    }
  }

  #onBeforeRequestSent(event: Bidi.Network.BeforeRequestSentParams): void {
    const request = this._requestMap.get(event.request.request);

    let upsertRequest: HTTPRequest;
    if (request) {
      const requestChain = request._redirectChain;
      requestChain.push(request);
      upsertRequest = new HTTPRequest(event, requestChain);
    } else {
      upsertRequest = new HTTPRequest(event, []);
    }
    this._requestMap.set(event.request.request, upsertRequest);
    this.emit(NetworkManagerEmittedEvents.Request, upsertRequest);
  }

  #onResponseStarted(_event: any) {}

  #onResponseCompleted(event: Bidi.Network.ResponseCompletedParams): void {
    const request = this._requestMap.get(event.request.request);
    try {
      assert(request, 'Response has no matching request.');
      const response = new HTTPResponse(request, event);
      request._response = response;
      this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
      if (response.fromCache()) {
        this.emit(NetworkManagerEmittedEvents.RequestServedFromCache);
      }
      this.emit(NetworkManagerEmittedEvents.Response, response);
    } catch (error) {
      debugError(error);
    }
  }

  #onFetchError(event: any) {
    const request = this._requestMap.get(event.request.request);
    if (!request) {
      return;
    }
    request._failureText = event.errorText;
    this.emit(NetworkManagerEmittedEvents.RequestFailed, request);
  }

  getNavigationResponse(navigationId: string | null): HTTPResponse | null {
    for (const request of this._requestMap.values()) {
      if (navigationId === request._navigation) {
        return request.response();
      }
    }

    return null;
  }
}

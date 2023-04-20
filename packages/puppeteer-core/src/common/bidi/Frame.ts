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

import {Frame as BaseFrame} from '../../api/Frame.js';
import {HTTPResponse} from '../../api/HTTPResponse.js';
import {PuppeteerLifeCycleEvent} from '../LifecycleWatcher.js';
import {EvaluateFunc, HandleFor} from '../types.js';

import {Context} from './Context.js';
import {FrameManager} from './FrameManager.js';
import {Page} from './Page.js';

/**
 * @internal
 */
export class Frame extends BaseFrame {
  frameManager: FrameManager;
  context: Context;

  /**
   * @internal
   */
  constructor(frameManager: FrameManager, context: Context) {
    super();
    this.frameManager = frameManager;
    this.context = context;
    this._id = context.id;
    this._parentId = context.parentId ?? undefined;
  }

  override page(): Page {
    return this.frameManager.page();
  }

  override async goto(
    url: string,
    options?: {
      referer?: string;
      referrerPolicy?: string;
      timeout?: number;
      waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }
  ): Promise<HTTPResponse | null> {
    return this.context.goto(url, options);
  }

  override async waitForNavigation(options?: {
    timeout?: number;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
  }): Promise<HTTPResponse | null>;
  override async waitForNavigation(): Promise<HTTPResponse | null> {
    throw new Error('Not implemented');
  }

  override async evaluateHandle<
    Params extends unknown[],
    Func extends EvaluateFunc<Params> = EvaluateFunc<Params>
  >(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<HandleFor<Awaited<ReturnType<Func>>>> {
    return this.context.evaluateHandle(pageFunction, ...args);
  }

  override async evaluate<
    Params extends unknown[],
    Func extends EvaluateFunc<Params> = EvaluateFunc<Params>
  >(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    return this.context.evaluate(pageFunction, ...args);
  }

  override async content(): Promise<string> {
    return this.context.content();
  }

  override async setContent(
    html: string,
    options: {
      timeout?: number;
      waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }
  ): Promise<void> {
    return this.context.setContent(html, options);
  }

  override name(): string {
    return this._name || '';
  }

  override url(): string {
    return this.context.url();
  }

  override parentFrame(): Frame | null {
    return this.frameManager._frameTree.parentFrame(this._id) ?? null;
  }

  override childFrames(): Frame[] {
    return this.frameManager._frameTree.childFrames(this._id);
  }

  override isDetached(): boolean {
    throw new Error('Not implemented');
  }

  override async title(): Promise<string> {
    throw new Error('Not implemented');
  }

  override _navigatedWithinDocument(url: string): void;
  override _navigatedWithinDocument(): void {
    throw new Error('Not implemented');
  }

  override _onLifecycleEvent(loaderId: string, name: string): void;
  override _onLifecycleEvent(): void {
    throw new Error('Not implemented');
  }

  override _onLoadingStopped(): void {
    throw new Error('Not implemented');
  }

  override _onLoadingStarted(): void {
    throw new Error('Not implemented');
  }

  override _detach(): void {}
}

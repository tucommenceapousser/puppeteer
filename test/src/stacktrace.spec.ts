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

import expect from 'expect';

import {
  getTestState,
  setupTestBrowserHooks,
  setupTestPageAndContextHooks,
} from './mocha-utils.js';

describe('Stack trace', function () {
  setupTestBrowserHooks();
  setupTestPageAndContextHooks();

  it('should work', async () => {
    const {page} = getTestState();

    const error = (await page
      .evaluate(() => {
        throw new Error('Test');
      })
      .catch((error: Error) => {
        return error;
      })) as Error;

    expect(error.name).toEqual('Error');
    expect(error.message).toEqual('Test');
    expect(
      /evaluate \(evaluate at (?:.*)stacktrace.spec.js(?:.*)\)/m.test(
        error.stack ?? ''
      )
    ).toBeTruthy();
  });

  it('should work with handles', async () => {
    const {page} = getTestState();

    const error = (await page
      .evaluateHandle(() => {
        throw new Error('Test');
      })
      .catch((error: Error) => {
        return error;
      })) as Error;

    expect(error.name).toEqual('Error');
    expect(error.message).toEqual('Test');
    expect(
      /evaluateHandle \(evaluateHandle at (?:.*)stacktrace.spec.js(?:.*)\)/m.test(
        error.stack ?? ''
      )
    ).toBeTruthy();
  });
});

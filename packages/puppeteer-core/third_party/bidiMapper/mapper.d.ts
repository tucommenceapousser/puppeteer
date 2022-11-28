import { EventType, WildcardHandler, Handler } from 'mitt';
import { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping.js';
import { z } from 'zod';
import WebSocket from 'ws';

/**
 * Copyright 2022 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

declare class EventEmitter<Events extends Record<EventType, unknown>> {
    #private;
    /**
     * Binds an event listener to fire when an event occurs.
     * @param event - the event type you'd like to listen to. Can be a string or symbol.
     * @param handler - the function to be called when the event occurs.
     * @returns `this` to enable you to chain method calls.
     */
    on(type: '*', handler: WildcardHandler<Events>): EventEmitter<Events>;
    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): EventEmitter<Events>;
    /**
     * Like `on` but the listener will only be fired once and then it will be removed.
     * @param event - the event you'd like to listen to
     * @param handler - the handler function to run when the event occurs
     * @returns `this` to enable you to chain method calls.
     */
    once(event: EventType, handler: Handler): EventEmitter<Events>;
    /**
     * Removes an event listener from firing.
     * @param event - the event type you'd like to stop listening to.
     * @param handler - the function that should be removed.
     * @returns `this` to enable you to chain method calls.
     */
    off(type: '*', handler: WildcardHandler<Events>): EventEmitter<Events>;
    off<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): EventEmitter<Events>;
    /**
     * Emits an event and call any associated listeners.
     *
     * @param event - the event you'd like to emit
     * @param eventData - any data you'd like to emit with the event
     * @returns `true` if there are any listeners, `false` if there are not.
     */
    emit(event: EventType, eventData: Events[EventType]): void;
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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
/**
 * Represents a low-level transport mechanism for raw text messages like
 * a WebSocket, pipe, or Window binding.
 */
interface ITransport {
    setOnMessage: (handler: (message: string) => Promise<void>) => void;
    sendMessage: (message: string) => Promise<void>;
    close(): void;
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

/**
 * Represents a high-level CDP connection to the browser backend.
 * Manages a CdpClient instance for each active CDP session.
 */
declare class CdpConnection {
    #private;
    constructor(transport: ITransport, logCdp?: (...message: unknown[]) => void);
    /**
     * Close the connection to the browser.
     */
    close(): void;
    /**
     * @returns The CdpClient object attached to the root browser session.
     */
    browserClient(): CdpClient;
    /**
     * Get a CdpClient instance by sessionId.
     * @param sessionId The sessionId of the CdpClient to retrieve.
     * @returns The CdpClient object attached to the given session, or null if the session is not attached.
     */
    getCdpClient(sessionId: string): CdpClient;
    sendCommand(method: string, params: object | undefined, sessionId: string | null): Promise<object>;
    private _onMessage;
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

type Mapping = {
    [Property in keyof ProtocolMapping.Events]: ProtocolMapping.Events[Property][0];
};
declare class CdpClient extends EventEmitter<Mapping> {
    private _cdpConnection;
    private _sessionId;
    constructor(_cdpConnection: CdpConnection, _sessionId: string | null);
    /**
     * Returns command promise, which will be resolved wth the command result after receiving CDP result.
     * @param method Name of the CDP command to call.
     * @param params Parameters to pass to the CDP command.
     */
    sendCommand<T extends keyof ProtocolMapping.Commands>(method: T, ...params: ProtocolMapping.Commands[T]['paramsType']): Promise<ProtocolMapping.Commands[T]['returnType']>;
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

declare class WebSocketTransport implements ITransport {
    private _ws;
    private _onMessage;
    constructor(_ws: WebSocket);
    setOnMessage(onMessage: (message: string) => void): void;
    sendMessage(message: string): Promise<void>;
    close(): void;
}

/**
 * Copyright 2022 Google LLC.
 * Copyright (c) Microsoft Corporation.
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
declare class EventResponseClass<ParamsType> {
    readonly method: string;
    readonly params: ParamsType;
    protected constructor(method: string, params: ParamsType);
}

/**
 * Copyright 2022 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

declare namespace Message {
    type OutgoingMessage = CommandResponse | EventMessage | {
        launched: true;
    };
    type RawCommandRequest = {
        id: number;
        method: string;
        params: object;
        channel?: string;
    };
    type CommandRequest = {
        id: number;
    } & (BrowsingContext.Command | Script.Command | Session.Command | CDP.Command);
    type CommandResponse = {
        id: number;
    } & CommandResponseResult;
    type CommandResponseResult = BrowsingContext.CommandResult | Script.CommandResult | Session.CommandResult | CDP.CommandResult | ErrorResult;
    type EventMessage = BrowsingContext.Event | Log.Event | CDP.Event;
    type ErrorCode = 'unknown error' | 'unknown command' | 'invalid argument' | 'no such frame';
    type ErrorResult = {
        readonly error: ErrorCode;
        readonly message: string;
        readonly stacktrace?: string;
    };
}
declare namespace CommonDataTypes {
    export const RemoteReferenceSchema: z.ZodObject<{
        handle: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        handle: string;
    }, {
        handle: string;
    }>;
    export type RemoteReference = z.infer<typeof RemoteReferenceSchema>;
    const PrimitiveProtocolValueSchema: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"undefined">;
    }, "strip", z.ZodTypeAny, {
        type: "undefined";
    }, {
        type: "undefined";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"null">;
    }, "strip", z.ZodTypeAny, {
        type: "null";
    }, {
        type: "null";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"string">;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "string";
        value: string;
    }, {
        type: "string";
        value: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"number">;
        value: z.ZodUnion<[z.ZodEnum<["NaN", "-0", "Infinity", "+Infinity", "-Infinity"]>, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        type: "number";
        value: number | "NaN" | "-0" | "Infinity" | "+Infinity" | "-Infinity";
    }, {
        type: "number";
        value: number | "NaN" | "-0" | "Infinity" | "+Infinity" | "-Infinity";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        value: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: "boolean";
        value: boolean;
    }, {
        type: "boolean";
        value: boolean;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bigint">;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "bigint";
        value: string;
    }, {
        type: "bigint";
        value: string;
    }>]>;
    export type PrimitiveProtocolValue = z.infer<typeof PrimitiveProtocolValueSchema>;
    export type LocalValue = PrimitiveProtocolValue | ArrayLocalValue | DateLocalValue | MapLocalValue | ObjectLocalValue | RegExpLocalValue | SetLocalValue;
    export const LocalValueSchema: z.ZodType<LocalValue>;
    const ListLocalValueSchema: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        handle: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        handle: string;
    }, {
        handle: string;
    }>, z.ZodType<any, z.ZodTypeDef, any>]>, "many">;
    export type ListLocalValue = z.infer<typeof ListLocalValueSchema>;
    const ArrayLocalValueSchema: any;
    export type ArrayLocalValue = z.infer<typeof ArrayLocalValueSchema>;
    const DateLocalValueSchema: z.ZodObject<{
        type: z.ZodLiteral<"date">;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "date";
        value: string;
    }, {
        type: "date";
        value: string;
    }>;
    export type DateLocalValue = z.infer<typeof DateLocalValueSchema>;
    const MappingLocalValueSchema: any;
    export type MappingLocalValue = z.infer<typeof MappingLocalValueSchema>;
    const MapLocalValueSchema: z.ZodObject<{
        type: z.ZodLiteral<"map">;
        value: z.ZodArray<any, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "map";
        value: any[];
    }, {
        type: "map";
        value: any[];
    }>;
    export type MapLocalValue = z.infer<typeof MapLocalValueSchema>;
    const ObjectLocalValueSchema: z.ZodObject<{
        type: z.ZodLiteral<"object">;
        value: z.ZodArray<any, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "object";
        value: any[];
    }, {
        type: "object";
        value: any[];
    }>;
    export type ObjectLocalValue = z.infer<typeof ObjectLocalValueSchema>;
    const RegExpLocalValueSchema: any;
    export type RegExpLocalValue = z.infer<typeof RegExpLocalValueSchema>;
    const SetLocalValueSchema: any;
    export type SetLocalValue = z.infer<typeof SetLocalValueSchema>;
    export type RemoteValue = PrimitiveProtocolValue | SymbolRemoteValue | ArrayRemoteValue | ObjectRemoteValue | FunctionRemoteValue | RegExpRemoteValue | DateRemoteValue | MapRemoteValue | SetRemoteValue | WeakMapRemoteValue | WeakSetRemoteValue | IteratorRemoteValue | GeneratorRemoteValue | ProxyRemoteValue | ErrorRemoteValue | PromiseRemoteValue | TypedArrayRemoteValue | ArrayBufferRemoteValue | NodeRemoteValue | WindowProxyRemoteValue;
    export type ListRemoteValue = RemoteValue[];
    export type MappingRemoteValue = [RemoteValue | string, RemoteValue][];
    export type SymbolRemoteValue = RemoteReference & {
        type: 'symbol';
    };
    export type ArrayRemoteValue = RemoteReference & {
        type: 'array';
        value?: ListRemoteValue;
    };
    export type ObjectRemoteValue = RemoteReference & {
        type: 'object';
        value?: MappingRemoteValue;
    };
    export type FunctionRemoteValue = RemoteReference & {
        type: 'function';
    };
    export type RegExpRemoteValue = RemoteReference & RegExpLocalValue;
    export type DateRemoteValue = RemoteReference & DateLocalValue;
    export type MapRemoteValue = RemoteReference & {
        type: 'map';
        value: MappingRemoteValue;
    };
    export type SetRemoteValue = RemoteReference & {
        type: 'set';
        value: ListRemoteValue;
    };
    export type WeakMapRemoteValue = RemoteReference & {
        type: 'weakmap';
    };
    export type WeakSetRemoteValue = RemoteReference & {
        type: 'weakset';
    };
    export type IteratorRemoteValue = RemoteReference & {
        type: 'iterator';
    };
    export type GeneratorRemoteValue = RemoteReference & {
        type: 'generator';
    };
    export type ProxyRemoteValue = RemoteReference & {
        type: 'proxy';
    };
    export type ErrorRemoteValue = RemoteReference & {
        type: 'error';
    };
    export type PromiseRemoteValue = RemoteReference & {
        type: 'promise';
    };
    export type TypedArrayRemoteValue = RemoteReference & {
        type: 'typedarray';
    };
    export type ArrayBufferRemoteValue = RemoteReference & {
        type: 'arraybuffer';
    };
    export type NodeRemoteValue = RemoteReference & {
        type: 'node';
        value?: NodeProperties;
    };
    export type NodeProperties = RemoteReference & {
        nodeType: number;
        nodeValue: string;
        localName?: string;
        namespaceURI?: string;
        childNodeCount: number;
        children?: [NodeRemoteValue];
        attributes?: any;
        shadowRoot?: NodeRemoteValue | null;
    };
    export type WindowProxyRemoteValue = RemoteReference & {
        type: 'window';
    };
    export const BrowsingContextSchema: z.ZodString;
    export type BrowsingContext = z.infer<typeof BrowsingContextSchema>;
    export {};
}
declare namespace Script {
    export type Command = EvaluateCommand | CallFunctionCommand | GetRealmsCommand | DisownCommand;
    export type CommandResult = EvaluateResult | CallFunctionResult | GetRealmsResult | DisownResult;
    export type Realm = string;
    export type ScriptResult = ScriptResultSuccess | ScriptResultException;
    export type ScriptResultSuccess = {
        result: CommonDataTypes.RemoteValue;
        realm: string;
    };
    export type ScriptResultException = {
        exceptionDetails: ExceptionDetails;
        realm: string;
    };
    export type ExceptionDetails = {
        columnNumber: number;
        exception: CommonDataTypes.RemoteValue;
        lineNumber: number;
        stackTrace: Script.StackTrace;
        text: string;
    };
    export type RealmInfo = WindowRealmInfo | DedicatedWorkerRealmInfo | SharedWorkerRealmInfo | ServiceWorkerRealmInfo | WorkerRealmInfo | PaintWorkletRealmInfo | AudioWorkletRealmInfo | WorkletRealmInfo;
    export type BaseRealmInfo = {
        realm: Realm;
        origin: string;
    };
    export type WindowRealmInfo = BaseRealmInfo & {
        type: 'window';
        context: CommonDataTypes.BrowsingContext;
        sandbox?: string;
    };
    export type DedicatedWorkerRealmInfo = BaseRealmInfo & {
        type: 'dedicated-worker';
    };
    export type SharedWorkerRealmInfo = BaseRealmInfo & {
        type: 'shared-worker';
    };
    export type ServiceWorkerRealmInfo = BaseRealmInfo & {
        type: 'service-worker';
    };
    export type WorkerRealmInfo = BaseRealmInfo & {
        type: 'worker';
    };
    export type PaintWorkletRealmInfo = BaseRealmInfo & {
        type: 'paint-worklet';
    };
    export type AudioWorkletRealmInfo = BaseRealmInfo & {
        type: 'audio-worklet';
    };
    export type WorkletRealmInfo = BaseRealmInfo & {
        type: 'worklet';
    };
    const GetRealmsParametersSchema: z.ZodObject<{
        context: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["window", "dedicated-worker", "shared-worker", "service-worker", "worker", "paint-worklet", "audio-worklet", "worklet"]>>;
    }, "strip", z.ZodTypeAny, {
        type?: "worker" | "window" | "dedicated-worker" | "shared-worker" | "service-worker" | "paint-worklet" | "audio-worklet" | "worklet" | undefined;
        context?: string | undefined;
    }, {
        type?: "worker" | "window" | "dedicated-worker" | "shared-worker" | "service-worker" | "paint-worklet" | "audio-worklet" | "worklet" | undefined;
        context?: string | undefined;
    }>;
    export type GetRealmsParameters = z.infer<typeof GetRealmsParametersSchema>;
    export function parseGetRealmsParams(params: unknown): GetRealmsParameters;
    export type GetRealmsCommand = {
        method: 'script.getRealms';
        params: GetRealmsParameters;
    };
    export type GetRealmsResult = {
        result: {
            realms: RealmInfo[];
        };
    };
    export type EvaluateCommand = {
        method: 'script.evaluate';
        params: EvaluateParameters;
    };
    const ContextTargetSchema: z.ZodObject<{
        context: z.ZodString;
        sandbox: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sandbox?: string | undefined;
        context: string;
    }, {
        sandbox?: string | undefined;
        context: string;
    }>;
    export type ContextTarget = z.infer<typeof ContextTargetSchema>;
    const TargetSchema: z.ZodUnion<[z.ZodObject<{
        realm: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        realm: string;
    }, {
        realm: string;
    }>, z.ZodObject<{
        context: z.ZodString;
        sandbox: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sandbox?: string | undefined;
        context: string;
    }, {
        sandbox?: string | undefined;
        context: string;
    }>]>;
    export type Target = z.infer<typeof TargetSchema>;
    const OwnershipModelSchema: z.ZodEnum<["root", "none"]>;
    export type OwnershipModel = z.infer<typeof OwnershipModelSchema>;
    const EvaluateParametersSchema: z.ZodObject<{
        expression: z.ZodString;
        awaitPromise: z.ZodBoolean;
        target: z.ZodUnion<[z.ZodObject<{
            realm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            realm: string;
        }, {
            realm: string;
        }>, z.ZodObject<{
            context: z.ZodString;
            sandbox: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sandbox?: string | undefined;
            context: string;
        }, {
            sandbox?: string | undefined;
            context: string;
        }>]>;
        resultOwnership: z.ZodOptional<z.ZodEnum<["root", "none"]>>;
    }, "strip", z.ZodTypeAny, {
        resultOwnership?: "none" | "root" | undefined;
        expression: string;
        awaitPromise: boolean;
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
    }, {
        resultOwnership?: "none" | "root" | undefined;
        expression: string;
        awaitPromise: boolean;
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
    }>;
    export type EvaluateParameters = z.infer<typeof EvaluateParametersSchema>;
    export function parseEvaluateParams(params: unknown): EvaluateParameters;
    export type EvaluateResult = {
        result: ScriptResult;
    };
    export type DisownCommand = {
        method: 'script.disown';
        params: EvaluateParameters;
    };
    const DisownParametersSchema: z.ZodObject<{
        target: z.ZodUnion<[z.ZodObject<{
            realm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            realm: string;
        }, {
            realm: string;
        }>, z.ZodObject<{
            context: z.ZodString;
            sandbox: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sandbox?: string | undefined;
            context: string;
        }, {
            sandbox?: string | undefined;
            context: string;
        }>]>;
        handles: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
        handles: string[];
    }, {
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
        handles: string[];
    }>;
    export type DisownParameters = z.infer<typeof DisownParametersSchema>;
    export function parseDisownParams(params: unknown): DisownParameters;
    export type DisownResult = {
        result: {};
    };
    export type CallFunctionCommand = {
        method: 'script.callFunction';
        params: CallFunctionParameters;
    };
    const ArgumentValueSchema: z.ZodUnion<[z.ZodObject<{
        handle: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        handle: string;
    }, {
        handle: string;
    }>, z.ZodType<any, z.ZodTypeDef, any>]>;
    export type ArgumentValue = z.infer<typeof ArgumentValueSchema>;
    const ScriptCallFunctionParametersSchema: z.ZodObject<{
        functionDeclaration: z.ZodString;
        target: z.ZodUnion<[z.ZodObject<{
            realm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            realm: string;
        }, {
            realm: string;
        }>, z.ZodObject<{
            context: z.ZodString;
            sandbox: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sandbox?: string | undefined;
            context: string;
        }, {
            sandbox?: string | undefined;
            context: string;
        }>]>;
        arguments: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            handle: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            handle: string;
        }, {
            handle: string;
        }>, z.ZodType<any, z.ZodTypeDef, any>]>, "many">>;
        this: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            handle: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            handle: string;
        }, {
            handle: string;
        }>, z.ZodType<any, z.ZodTypeDef, any>]>>;
        awaitPromise: z.ZodBoolean;
        resultOwnership: z.ZodOptional<z.ZodEnum<["root", "none"]>>;
    }, "strip", z.ZodTypeAny, {
        resultOwnership?: "none" | "root" | undefined;
        arguments?: any[] | undefined;
        this?: any;
        awaitPromise: boolean;
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
        functionDeclaration: string;
    }, {
        resultOwnership?: "none" | "root" | undefined;
        arguments?: any[] | undefined;
        this?: any;
        awaitPromise: boolean;
        target: {
            realm: string;
        } | {
            sandbox?: string | undefined;
            context: string;
        };
        functionDeclaration: string;
    }>;
    export type CallFunctionParameters = z.infer<typeof ScriptCallFunctionParametersSchema>;
    export function parseCallFunctionParams(params: unknown): CallFunctionParameters;
    export type CallFunctionResult = {
        result: ScriptResult;
    };
    export type Source = {
        realm: Realm;
        context?: CommonDataTypes.BrowsingContext;
    };
    export type StackTrace = {
        callFrames: StackFrame[];
    };
    export type StackFrame = {
        columnNumber: number;
        functionName: string;
        lineNumber: number;
        url: string;
    };
    export {};
}
declare namespace BrowsingContext {
    export type Command = GetTreeCommand | NavigateCommand | CreateCommand | CloseCommand | PROTO.FindElementCommand;
    export type CommandResult = GetTreeResult | NavigateResult | CreateResult | CloseResult | PROTO.FindElementResult;
    export type Event = LoadEvent | DomContentLoadedEvent | ContextCreatedEvent | ContextDestroyedEvent;
    export type Navigation = string;
    export type GetTreeCommand = {
        method: 'browsingContext.getTree';
        params: GetTreeParameters;
    };
    const GetTreeParametersSchema: z.ZodObject<{
        maxDepth: z.ZodOptional<z.ZodNumber>;
        root: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        root?: string | undefined;
        maxDepth?: number | undefined;
    }, {
        root?: string | undefined;
        maxDepth?: number | undefined;
    }>;
    export type GetTreeParameters = z.infer<typeof GetTreeParametersSchema>;
    export function parseGetTreeParams(params: unknown): GetTreeParameters;
    export type GetTreeResult = {
        result: {
            contexts: InfoList;
        };
    };
    export type InfoList = Info[];
    export type Info = {
        context: CommonDataTypes.BrowsingContext;
        parent?: CommonDataTypes.BrowsingContext | null;
        url: string;
        children: InfoList | null;
    };
    export type NavigateCommand = {
        method: 'browsingContext.navigate';
        params: NavigateParameters;
    };
    const ReadinessStateSchema: z.ZodEnum<["none", "interactive", "complete"]>;
    export type ReadinessState = z.infer<typeof ReadinessStateSchema>;
    const NavigateParametersSchema: z.ZodObject<{
        context: z.ZodString;
        url: z.ZodString;
        wait: z.ZodOptional<z.ZodEnum<["none", "interactive", "complete"]>>;
    }, "strip", z.ZodTypeAny, {
        wait?: "none" | "interactive" | "complete" | undefined;
        url: string;
        context: string;
    }, {
        wait?: "none" | "interactive" | "complete" | undefined;
        url: string;
        context: string;
    }>;
    export type NavigateParameters = z.infer<typeof NavigateParametersSchema>;
    export function parseNavigateParams(params: unknown): NavigateParameters;
    export type NavigateResult = {
        result: {
            navigation: Navigation | null;
            url: string;
        };
    };
    export type CreateCommand = {
        method: 'browsingContext.create';
        params: CreateParameters;
    };
    const CreateParametersSchema: z.ZodObject<{
        type: z.ZodEnum<["tab", "window"]>;
        referenceContext: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        referenceContext?: string | undefined;
        type: "window" | "tab";
    }, {
        referenceContext?: string | undefined;
        type: "window" | "tab";
    }>;
    export type CreateParameters = z.infer<typeof CreateParametersSchema>;
    export function parseCreateParams(params: unknown): CreateParameters;
    export type CreateResult = {
        result: Info;
    };
    export type CloseCommand = {
        method: 'browsingContext.close';
        params: CloseParameters;
    };
    const CloseParametersSchema: z.ZodObject<{
        context: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        context: string;
    }, {
        context: string;
    }>;
    export type CloseParameters = z.infer<typeof CloseParametersSchema>;
    export function parseCloseParams(params: unknown): CloseParameters;
    export type CloseResult = {
        result: {};
    };
    export class LoadEvent extends EventResponseClass<NavigationInfo> {
        static readonly method = "browsingContext.load";
        constructor(params: BrowsingContext.NavigationInfo);
    }
    export class DomContentLoadedEvent extends EventResponseClass<NavigationInfo> {
        static readonly method = "browsingContext.domContentLoaded";
        constructor(params: BrowsingContext.NavigationInfo);
    }
    export type NavigationInfo = {
        context: CommonDataTypes.BrowsingContext;
        navigation: Navigation | null;
        url: string;
    };
    export class ContextCreatedEvent extends EventResponseClass<BrowsingContext.Info> {
        static readonly method = "browsingContext.contextCreated";
        constructor(params: BrowsingContext.Info);
    }
    export class ContextDestroyedEvent extends EventResponseClass<BrowsingContext.Info> {
        static readonly method = "browsingContext.contextDestroyed";
        constructor(params: BrowsingContext.Info);
    }
    export namespace PROTO {
        export type FindElementCommand = {
            method: 'PROTO.browsingContext.findElement';
            params: FindElementParameters;
        };
        const FindElementParametersSchema: z.ZodObject<{
            context: z.ZodString;
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            context: string;
            selector: string;
        }, {
            context: string;
            selector: string;
        }>;
        export type FindElementParameters = z.infer<typeof FindElementParametersSchema>;
        export function parseFindElementParams(params: unknown): FindElementParameters;
        export type FindElementResult = FindElementSuccessResult;
        export type FindElementSuccessResult = {
            result: CommonDataTypes.NodeRemoteValue;
        };
        export {};
    }
    export const EventNames: readonly ["browsingContext.load", "browsingContext.domContentLoaded", "browsingContext.contextCreated", "browsingContext.contextDestroyed"];
    export {};
}
declare namespace Log {
    type LogEntry = GenericLogEntry | ConsoleLogEntry | JavascriptLogEntry;
    type Event = LogEntryAddedEvent;
    type LogLevel = 'debug' | 'info' | 'warn' | 'error';
    type BaseLogEntry = {
        level: LogLevel;
        source: Script.Source;
        text: string | null;
        timestamp: number;
        stackTrace?: Script.StackTrace;
    };
    type GenericLogEntry = BaseLogEntry & {
        type: string;
    };
    type ConsoleLogEntry = BaseLogEntry & {
        type: 'console';
        method: string;
        args: CommonDataTypes.RemoteValue[];
    };
    type JavascriptLogEntry = BaseLogEntry & {
        type: 'javascript';
    };
    class LogEntryAddedEvent extends EventResponseClass<LogEntry> {
        static readonly method = "log.entryAdded";
        constructor(params: LogEntry);
    }
    const EventNames: readonly ["log.entryAdded"];
}
declare namespace CDP {
    export type Command = SendCommandCommand | GetSessionCommand;
    export type CommandResult = SendCommandResult | GetSessionResult;
    export type Event = EventReceivedEvent;
    export type SendCommandCommand = {
        method: 'cdp.sendCommand';
        params: SendCommandParams;
    };
    const SendCommandParamsSchema: z.ZodObject<{
        cdpMethod: z.ZodString;
        cdpParams: z.ZodObject<{}, "passthrough", z.ZodTypeAny, {}, {}>;
        cdpSession: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        cdpSession?: string | undefined;
        cdpMethod: string;
        cdpParams: {};
    }, {
        cdpSession?: string | undefined;
        cdpMethod: string;
        cdpParams: {};
    }>;
    export type SendCommandParams = z.infer<typeof SendCommandParamsSchema>;
    export function parseSendCommandParams(params: unknown): SendCommandParams;
    export type SendCommandResult = {
        result: any;
    };
    export type GetSessionCommand = {
        method: 'cdp.getSession';
        params: GetSessionParams;
    };
    const GetSessionParamsSchema: z.ZodObject<{
        context: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        context: string;
    }, {
        context: string;
    }>;
    export type GetSessionParams = z.infer<typeof GetSessionParamsSchema>;
    export function parseGetSessionParams(params: unknown): GetSessionParams;
    export type GetSessionResult = {
        result: {
            session: string;
        };
    };
    export class EventReceivedEvent extends EventResponseClass<EventReceivedParams> {
        static readonly method = "cdp.eventReceived";
        constructor(params: EventReceivedParams);
    }
    export type EventReceivedParams = {
        cdpMethod: string;
        cdpParams: object;
        cdpSession: string;
    };
    export const EventNames: readonly ["cdp.eventReceived"];
    export {};
}
declare namespace Session {
    export type Command = StatusCommand | SubscribeCommand | UnsubscribeCommand;
    export type CommandResult = StatusResult | SubscribeResult | UnsubscribeResult;
    export type StatusCommand = {
        method: 'session.status';
        params: {};
    };
    export type StatusResult = {
        result: {
            ready: boolean;
            message: string;
        };
    };
    export type SubscribeCommand = {
        method: 'session.subscribe';
        params: SubscribeParameters;
    };
    const SubscribeParametersSchema: z.ZodObject<{
        events: z.ZodArray<z.ZodEnum<["browsingContext.load", "browsingContext.domContentLoaded", "browsingContext.contextCreated", "browsingContext.contextDestroyed", "log.entryAdded", "cdp.eventReceived"]>, "many">;
        contexts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        contexts?: string[] | undefined;
        events: ("browsingContext.load" | "browsingContext.domContentLoaded" | "browsingContext.contextCreated" | "browsingContext.contextDestroyed" | "log.entryAdded" | "cdp.eventReceived")[];
    }, {
        contexts?: string[] | undefined;
        events: ("browsingContext.load" | "browsingContext.domContentLoaded" | "browsingContext.contextCreated" | "browsingContext.contextDestroyed" | "log.entryAdded" | "cdp.eventReceived")[];
    }>;
    export type SubscribeParameters = z.infer<typeof SubscribeParametersSchema>;
    export function parseSubscribeParams(params: unknown): SubscribeParameters;
    export type SubscribeResult = {
        result: {};
    };
    export type UnsubscribeCommand = {
        method: 'session.unsubscribe';
        params: SubscribeParameters;
    };
    export type UnsubscribeResult = {
        result: {};
    };
    export {};
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

interface IBidiServer {
    on(event: 'message', handler: (messageObj: Message.RawCommandRequest) => void): void;
    sendMessage: (message: Promise<BiDiMessageEntry>) => void;
    close(): void;
}
type BidiServerEvents = {
    message: Message.RawCommandRequest;
};
declare class BiDiMessageEntry {
    #private;
    constructor(message: Message.OutgoingMessage, channel: string | null);
    static createFromPromise(messagePromise: Promise<Message.OutgoingMessage>, channel: string | null): Promise<BiDiMessageEntry>;
    static createResolved(message: Message.OutgoingMessage, channel: string | null): Promise<BiDiMessageEntry>;
    get message(): Message.OutgoingMessage;
    get channel(): string | null;
}
declare class BidiServer extends EventEmitter<BidiServerEvents> implements IBidiServer {
    #private;
    private _transport;
    constructor(_transport: ITransport);
    /**
     * Sends BiDi message.
     */
    sendMessage(messageEntry: Promise<BiDiMessageEntry>): void;
    close(): void;
}

/**
 * Copyright 2022 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

interface IEventManager {
    registerEvent(event: Message.EventMessage, contextId: CommonDataTypes.BrowsingContext | null): Promise<void>;
    registerPromiseEvent(event: Promise<Message.EventMessage>, contextId: CommonDataTypes.BrowsingContext | null, eventName: string): Promise<void>;
    subscribe(events: string[], contextIds: (CommonDataTypes.BrowsingContext | null)[], channel: string | null): Promise<void>;
    unsubscribe(event: string[], contextIds: (CommonDataTypes.BrowsingContext | null)[], channel: string | null): Promise<void>;
}
declare class EventManager implements IEventManager {
    #private;
    constructor(bidiServer: IBidiServer);
    registerEvent(event: Message.EventMessage, contextId: CommonDataTypes.BrowsingContext | null): Promise<void>;
    registerPromiseEvent(event: Promise<Message.EventMessage>, contextId: CommonDataTypes.BrowsingContext | null, eventName: string): Promise<void>;
    subscribe(eventNames: string[], contextIds: (CommonDataTypes.BrowsingContext | null)[], channel: string | null): Promise<void>;
    unsubscribe(events: string[], contextIds: (CommonDataTypes.BrowsingContext | null)[], channel: string | null): Promise<void>;
}

/**
 * Copyright 2021 Google LLC.
 * Copyright (c) Microsoft Corporation.
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

declare class CommandProcessor {
    #private;
    static run(cdpConnection: CdpConnection, bidiServer: IBidiServer, eventManager: IEventManager, selfTargetId: string): void;
    private constructor();
}

declare class TypeHelper {
    static isString(candidate: any): candidate is string;
}

export { BiDiMessageEntry, BidiServer, CdpClient, CdpConnection, CommandProcessor, EventManager, IBidiServer, IEventManager, ITransport, TypeHelper, WebSocketTransport };

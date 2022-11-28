'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var bidiMapper = {};

var commandProcessor = {};

var browsingContextProcessor = {};

var log = {};

(function (exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.log = exports.LogType = void 0;
	(function (LogType) {
	    LogType["system"] = "System";
	    LogType["bidi"] = "BiDi Messages";
	    LogType["browsingContexts"] = "Browsing Contexts";
	    LogType["cdp"] = "CDP";
	    LogType["commandParser"] = "Command parser";
	})(exports.LogType || (exports.LogType = {}));
	function log(logType) {
	    return (...messages) => {
	        console.log(logType, ...messages);
	        // Add messages to the Mapper Tab Page, if exists.
	        // Dynamic lookup to avoid circlular dependency.
	        if ('MapperTabPage' in globalThis) {
	            globalThis['MapperTabPage'].log(logType, ...messages);
	        }
	    };
	}
	exports.log = log;
	
} (log));

var error = {};

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
Object.defineProperty(error, "__esModule", { value: true });
error.NoSuchFrameException = error.InvalidArgumentException = error.UnknownCommandException = error.UnknownException = error.ErrorResponseClass = void 0;
class ErrorResponseClass {
    constructor(error, message, stacktrace) {
        this.error = error;
        this.message = message;
        this.stacktrace = stacktrace;
    }
    toErrorResponse(commandId) {
        return {
            id: commandId,
            error: this.error,
            message: this.message,
            stacktrace: this.stacktrace,
        };
    }
}
error.ErrorResponseClass = ErrorResponseClass;
class UnknownException extends ErrorResponseClass {
    constructor(message, stacktrace) {
        super('unknown error', message, stacktrace);
    }
}
error.UnknownException = UnknownException;
class UnknownCommandException extends ErrorResponseClass {
    constructor(message, stacktrace) {
        super('unknown command', message, stacktrace);
    }
}
error.UnknownCommandException = UnknownCommandException;
class InvalidArgumentException extends ErrorResponseClass {
    constructor(message, stacktrace) {
        super('invalid argument', message, stacktrace);
    }
}
error.InvalidArgumentException = InvalidArgumentException;
class NoSuchFrameException extends ErrorResponseClass {
    constructor(message) {
        super('no such frame', message);
    }
}
error.NoSuchFrameException = NoSuchFrameException;

var browsingContextImpl = {};

var bidiProtocolTypes = {};

var event = {};

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
Object.defineProperty(event, "__esModule", { value: true });
event.EventResponseClass = void 0;
class EventResponseClass {
    constructor(method, params) {
        this.method = method;
        this.params = params;
    }
}
event.EventResponseClass = EventResponseClass;

var lib = {};

var external = {};

var errors = {};

var en = {};

var util = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getParsedType = exports.ZodParsedType = exports.util = void 0;
	var util;
	(function (util) {
	    util.assertEqual = (val) => val;
	    function assertIs(_arg) { }
	    util.assertIs = assertIs;
	    function assertNever(_x) {
	        throw new Error();
	    }
	    util.assertNever = assertNever;
	    util.arrayToEnum = (items) => {
	        const obj = {};
	        for (const item of items) {
	            obj[item] = item;
	        }
	        return obj;
	    };
	    util.getValidEnumValues = (obj) => {
	        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
	        const filtered = {};
	        for (const k of validKeys) {
	            filtered[k] = obj[k];
	        }
	        return util.objectValues(filtered);
	    };
	    util.objectValues = (obj) => {
	        return util.objectKeys(obj).map(function (e) {
	            return obj[e];
	        });
	    };
	    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
	        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
	        : (object) => {
	            const keys = [];
	            for (const key in object) {
	                if (Object.prototype.hasOwnProperty.call(object, key)) {
	                    keys.push(key);
	                }
	            }
	            return keys;
	        };
	    util.find = (arr, checker) => {
	        for (const item of arr) {
	            if (checker(item))
	                return item;
	        }
	        return undefined;
	    };
	    util.isInteger = typeof Number.isInteger === "function"
	        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
	        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
	    function joinValues(array, separator = " | ") {
	        return array
	            .map((val) => (typeof val === "string" ? `'${val}'` : val))
	            .join(separator);
	    }
	    util.joinValues = joinValues;
	    util.jsonStringifyReplacer = (_, value) => {
	        if (typeof value === "bigint") {
	            return value.toString();
	        }
	        return value;
	    };
	})(util = exports.util || (exports.util = {}));
	exports.ZodParsedType = util.arrayToEnum([
	    "string",
	    "nan",
	    "number",
	    "integer",
	    "float",
	    "boolean",
	    "date",
	    "bigint",
	    "symbol",
	    "function",
	    "undefined",
	    "null",
	    "array",
	    "object",
	    "unknown",
	    "promise",
	    "void",
	    "never",
	    "map",
	    "set",
	]);
	const getParsedType = (data) => {
	    const t = typeof data;
	    switch (t) {
	        case "undefined":
	            return exports.ZodParsedType.undefined;
	        case "string":
	            return exports.ZodParsedType.string;
	        case "number":
	            return isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
	        case "boolean":
	            return exports.ZodParsedType.boolean;
	        case "function":
	            return exports.ZodParsedType.function;
	        case "bigint":
	            return exports.ZodParsedType.bigint;
	        case "object":
	            if (Array.isArray(data)) {
	                return exports.ZodParsedType.array;
	            }
	            if (data === null) {
	                return exports.ZodParsedType.null;
	            }
	            if (data.then &&
	                typeof data.then === "function" &&
	                data.catch &&
	                typeof data.catch === "function") {
	                return exports.ZodParsedType.promise;
	            }
	            if (typeof Map !== "undefined" && data instanceof Map) {
	                return exports.ZodParsedType.map;
	            }
	            if (typeof Set !== "undefined" && data instanceof Set) {
	                return exports.ZodParsedType.set;
	            }
	            if (typeof Date !== "undefined" && data instanceof Date) {
	                return exports.ZodParsedType.date;
	            }
	            return exports.ZodParsedType.object;
	        default:
	            return exports.ZodParsedType.unknown;
	    }
	};
	exports.getParsedType = getParsedType;
} (util));

var ZodError$1 = {};

Object.defineProperty(ZodError$1, "__esModule", { value: true });
ZodError$1.ZodError = ZodError$1.quotelessJson = ZodError$1.ZodIssueCode = void 0;
const util_1$1 = util;
ZodError$1.ZodIssueCode = util_1$1.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
ZodError$1.quotelessJson = quotelessJson;
class ZodError extends Error {
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    get errors() {
        return this.issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util_1$1.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError$1.ZodError = ZodError;
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

Object.defineProperty(en, "__esModule", { value: true });
const util_1 = util;
const ZodError_1 = ZodError$1;
const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodError_1.ZodIssueCode.invalid_type:
            if (issue.received === util_1.ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodError_1.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
            break;
        case ZodError_1.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
            break;
        case ZodError_1.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodError_1.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodError_1.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodError_1.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodError_1.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util_1.util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodError_1.ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be greater than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.minimum)}`;
            else
                message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be smaller than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.maximum)}`;
            else
                message = "Invalid input";
            break;
        case ZodError_1.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodError_1.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodError_1.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        default:
            message = _ctx.defaultError;
            util_1.util.assertNever(issue);
    }
    return { message };
};
en.default = errorMap;

var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(errors, "__esModule", { value: true });
errors.getErrorMap = errors.setErrorMap = errors.defaultErrorMap = void 0;
const en_1 = __importDefault$1(en);
errors.defaultErrorMap = en_1.default;
let overrideErrorMap = en_1.default;
function setErrorMap(map) {
    overrideErrorMap = map;
}
errors.setErrorMap = setErrorMap;
function getErrorMap() {
    return overrideErrorMap;
}
errors.getErrorMap = getErrorMap;

var parseUtil = {};

(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.addIssueToContext = exports.EMPTY_PATH = exports.makeIssue = void 0;
	const errors_1 = errors;
	const en_1 = __importDefault(en);
	const makeIssue = (params) => {
	    const { data, path, errorMaps, issueData } = params;
	    const fullPath = [...path, ...(issueData.path || [])];
	    const fullIssue = {
	        ...issueData,
	        path: fullPath,
	    };
	    let errorMessage = "";
	    const maps = errorMaps
	        .filter((m) => !!m)
	        .slice()
	        .reverse();
	    for (const map of maps) {
	        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
	    }
	    return {
	        ...issueData,
	        path: fullPath,
	        message: issueData.message || errorMessage,
	    };
	};
	exports.makeIssue = makeIssue;
	exports.EMPTY_PATH = [];
	function addIssueToContext(ctx, issueData) {
	    const issue = exports.makeIssue({
	        issueData: issueData,
	        data: ctx.data,
	        path: ctx.path,
	        errorMaps: [
	            ctx.common.contextualErrorMap,
	            ctx.schemaErrorMap,
	            errors_1.getErrorMap(),
	            en_1.default,
	        ].filter((x) => !!x),
	    });
	    ctx.common.issues.push(issue);
	}
	exports.addIssueToContext = addIssueToContext;
	class ParseStatus {
	    constructor() {
	        this.value = "valid";
	    }
	    dirty() {
	        if (this.value === "valid")
	            this.value = "dirty";
	    }
	    abort() {
	        if (this.value !== "aborted")
	            this.value = "aborted";
	    }
	    static mergeArray(status, results) {
	        const arrayValue = [];
	        for (const s of results) {
	            if (s.status === "aborted")
	                return exports.INVALID;
	            if (s.status === "dirty")
	                status.dirty();
	            arrayValue.push(s.value);
	        }
	        return { status: status.value, value: arrayValue };
	    }
	    static async mergeObjectAsync(status, pairs) {
	        const syncPairs = [];
	        for (const pair of pairs) {
	            syncPairs.push({
	                key: await pair.key,
	                value: await pair.value,
	            });
	        }
	        return ParseStatus.mergeObjectSync(status, syncPairs);
	    }
	    static mergeObjectSync(status, pairs) {
	        const finalObject = {};
	        for (const pair of pairs) {
	            const { key, value } = pair;
	            if (key.status === "aborted")
	                return exports.INVALID;
	            if (value.status === "aborted")
	                return exports.INVALID;
	            if (key.status === "dirty")
	                status.dirty();
	            if (value.status === "dirty")
	                status.dirty();
	            if (typeof value.value !== "undefined" || pair.alwaysSet) {
	                finalObject[key.value] = value.value;
	            }
	        }
	        return { status: status.value, value: finalObject };
	    }
	}
	exports.ParseStatus = ParseStatus;
	exports.INVALID = Object.freeze({
	    status: "aborted",
	});
	const DIRTY = (value) => ({ status: "dirty", value });
	exports.DIRTY = DIRTY;
	const OK = (value) => ({ status: "valid", value });
	exports.OK = OK;
	const isAborted = (x) => x.status === "aborted";
	exports.isAborted = isAborted;
	const isDirty = (x) => x.status === "dirty";
	exports.isDirty = isDirty;
	const isValid = (x) => x.status === "valid";
	exports.isValid = isValid;
	const isAsync = (x) => typeof Promise !== undefined && x instanceof Promise;
	exports.isAsync = isAsync;
} (parseUtil));

var typeAliases = {};

Object.defineProperty(typeAliases, "__esModule", { value: true });

var types = {};

var errorUtil = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.errorUtil = void 0;
	(function (errorUtil) {
	    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
	    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
	})(exports.errorUtil || (exports.errorUtil = {}));
} (errorUtil));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.function = exports.enum = exports.effect = exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.custom = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.objectUtil = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
	exports.NEVER = exports.void = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports.null = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports.instanceof = void 0;
	const errors_1 = errors;
	const errorUtil_1 = errorUtil;
	const parseUtil_1 = parseUtil;
	const util_1 = util;
	const ZodError_1 = ZodError$1;
	class ParseInputLazyPath {
	    constructor(parent, value, path, key) {
	        this.parent = parent;
	        this.data = value;
	        this._path = path;
	        this._key = key;
	    }
	    get path() {
	        return this._path.concat(this._key);
	    }
	}
	const handleResult = (ctx, result) => {
	    if (parseUtil_1.isValid(result)) {
	        return { success: true, data: result.value };
	    }
	    else {
	        if (!ctx.common.issues.length) {
	            throw new Error("Validation failed but no issues detected.");
	        }
	        const error = new ZodError_1.ZodError(ctx.common.issues);
	        return { success: false, error };
	    }
	};
	function processCreateParams(params) {
	    if (!params)
	        return {};
	    const { errorMap, invalid_type_error, required_error, description } = params;
	    if (errorMap && (invalid_type_error || required_error)) {
	        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	    }
	    if (errorMap)
	        return { errorMap: errorMap, description };
	    const customMap = (iss, ctx) => {
	        if (iss.code !== "invalid_type")
	            return { message: ctx.defaultError };
	        if (typeof ctx.data === "undefined") {
	            return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
	        }
	        return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
	    };
	    return { errorMap: customMap, description };
	}
	class ZodType {
	    constructor(def) {
	        /** Alias of safeParseAsync */
	        this.spa = this.safeParseAsync;
	        this.superRefine = this._refinement;
	        this._def = def;
	        this.parse = this.parse.bind(this);
	        this.safeParse = this.safeParse.bind(this);
	        this.parseAsync = this.parseAsync.bind(this);
	        this.safeParseAsync = this.safeParseAsync.bind(this);
	        this.spa = this.spa.bind(this);
	        this.refine = this.refine.bind(this);
	        this.refinement = this.refinement.bind(this);
	        this.superRefine = this.superRefine.bind(this);
	        this.optional = this.optional.bind(this);
	        this.nullable = this.nullable.bind(this);
	        this.nullish = this.nullish.bind(this);
	        this.array = this.array.bind(this);
	        this.promise = this.promise.bind(this);
	        this.or = this.or.bind(this);
	        this.and = this.and.bind(this);
	        this.transform = this.transform.bind(this);
	        this.default = this.default.bind(this);
	        this.describe = this.describe.bind(this);
	        this.isNullable = this.isNullable.bind(this);
	        this.isOptional = this.isOptional.bind(this);
	    }
	    get description() {
	        return this._def.description;
	    }
	    _getType(input) {
	        return util_1.getParsedType(input.data);
	    }
	    _getOrReturnCtx(input, ctx) {
	        return (ctx || {
	            common: input.parent.common,
	            data: input.data,
	            parsedType: util_1.getParsedType(input.data),
	            schemaErrorMap: this._def.errorMap,
	            path: input.path,
	            parent: input.parent,
	        });
	    }
	    _processInputParams(input) {
	        return {
	            status: new parseUtil_1.ParseStatus(),
	            ctx: {
	                common: input.parent.common,
	                data: input.data,
	                parsedType: util_1.getParsedType(input.data),
	                schemaErrorMap: this._def.errorMap,
	                path: input.path,
	                parent: input.parent,
	            },
	        };
	    }
	    _parseSync(input) {
	        const result = this._parse(input);
	        if (parseUtil_1.isAsync(result)) {
	            throw new Error("Synchronous parse encountered promise.");
	        }
	        return result;
	    }
	    _parseAsync(input) {
	        const result = this._parse(input);
	        return Promise.resolve(result);
	    }
	    parse(data, params) {
	        const result = this.safeParse(data, params);
	        if (result.success)
	            return result.data;
	        throw result.error;
	    }
	    safeParse(data, params) {
	        var _a;
	        const ctx = {
	            common: {
	                issues: [],
	                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
	                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
	            },
	            path: (params === null || params === void 0 ? void 0 : params.path) || [],
	            schemaErrorMap: this._def.errorMap,
	            parent: null,
	            data,
	            parsedType: util_1.getParsedType(data),
	        };
	        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
	        return handleResult(ctx, result);
	    }
	    async parseAsync(data, params) {
	        const result = await this.safeParseAsync(data, params);
	        if (result.success)
	            return result.data;
	        throw result.error;
	    }
	    async safeParseAsync(data, params) {
	        const ctx = {
	            common: {
	                issues: [],
	                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
	                async: true,
	            },
	            path: (params === null || params === void 0 ? void 0 : params.path) || [],
	            schemaErrorMap: this._def.errorMap,
	            parent: null,
	            data,
	            parsedType: util_1.getParsedType(data),
	        };
	        const maybeAsyncResult = this._parse({ data, path: [], parent: ctx });
	        const result = await (parseUtil_1.isAsync(maybeAsyncResult)
	            ? maybeAsyncResult
	            : Promise.resolve(maybeAsyncResult));
	        return handleResult(ctx, result);
	    }
	    refine(check, message) {
	        const getIssueProperties = (val) => {
	            if (typeof message === "string" || typeof message === "undefined") {
	                return { message };
	            }
	            else if (typeof message === "function") {
	                return message(val);
	            }
	            else {
	                return message;
	            }
	        };
	        return this._refinement((val, ctx) => {
	            const result = check(val);
	            const setError = () => ctx.addIssue({
	                code: ZodError_1.ZodIssueCode.custom,
	                ...getIssueProperties(val),
	            });
	            if (typeof Promise !== "undefined" && result instanceof Promise) {
	                return result.then((data) => {
	                    if (!data) {
	                        setError();
	                        return false;
	                    }
	                    else {
	                        return true;
	                    }
	                });
	            }
	            if (!result) {
	                setError();
	                return false;
	            }
	            else {
	                return true;
	            }
	        });
	    }
	    refinement(check, refinementData) {
	        return this._refinement((val, ctx) => {
	            if (!check(val)) {
	                ctx.addIssue(typeof refinementData === "function"
	                    ? refinementData(val, ctx)
	                    : refinementData);
	                return false;
	            }
	            else {
	                return true;
	            }
	        });
	    }
	    _refinement(refinement) {
	        return new ZodEffects({
	            schema: this,
	            typeName: ZodFirstPartyTypeKind.ZodEffects,
	            effect: { type: "refinement", refinement },
	        });
	    }
	    optional() {
	        return ZodOptional.create(this);
	    }
	    nullable() {
	        return ZodNullable.create(this);
	    }
	    nullish() {
	        return this.optional().nullable();
	    }
	    array() {
	        return ZodArray.create(this);
	    }
	    promise() {
	        return ZodPromise.create(this);
	    }
	    or(option) {
	        return ZodUnion.create([this, option]);
	    }
	    and(incoming) {
	        return ZodIntersection.create(this, incoming);
	    }
	    transform(transform) {
	        return new ZodEffects({
	            schema: this,
	            typeName: ZodFirstPartyTypeKind.ZodEffects,
	            effect: { type: "transform", transform },
	        });
	    }
	    default(def) {
	        const defaultValueFunc = typeof def === "function" ? def : () => def;
	        return new ZodDefault({
	            innerType: this,
	            defaultValue: defaultValueFunc,
	            typeName: ZodFirstPartyTypeKind.ZodDefault,
	        });
	    }
	    brand() {
	        return new ZodBranded({
	            typeName: ZodFirstPartyTypeKind.ZodBranded,
	            type: this,
	            ...processCreateParams(undefined),
	        });
	    }
	    describe(description) {
	        const This = this.constructor;
	        return new This({
	            ...this._def,
	            description,
	        });
	    }
	    isOptional() {
	        return this.safeParse(undefined).success;
	    }
	    isNullable() {
	        return this.safeParse(null).success;
	    }
	}
	exports.ZodType = ZodType;
	exports.Schema = ZodType;
	exports.ZodSchema = ZodType;
	const cuidRegex = /^c[^\s-]{8,}$/i;
	const uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
	// from https://stackoverflow.com/a/46181/1550155
	// old version: too slow, didn't support unicode
	// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	// eslint-disable-next-line
	const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	class ZodString extends ZodType {
	    constructor() {
	        super(...arguments);
	        this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
	            validation,
	            code: ZodError_1.ZodIssueCode.invalid_string,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	        /**
	         * @deprecated Use z.string().min(1) instead.
	         * @see {@link ZodString.min}
	         */
	        this.nonempty = (message) => this.min(1, errorUtil_1.errorUtil.errToObj(message));
	        this.trim = () => new ZodString({
	            ...this._def,
	            checks: [...this._def.checks, { kind: "trim" }],
	        });
	    }
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.string) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.string,
	                received: ctx.parsedType,
	            }
	            //
	            );
	            return parseUtil_1.INVALID;
	        }
	        const status = new parseUtil_1.ParseStatus();
	        let ctx = undefined;
	        for (const check of this._def.checks) {
	            if (check.kind === "min") {
	                if (input.data.length < check.value) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_small,
	                        minimum: check.value,
	                        type: "string",
	                        inclusive: true,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "max") {
	                if (input.data.length > check.value) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_big,
	                        maximum: check.value,
	                        type: "string",
	                        inclusive: true,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "email") {
	                if (!emailRegex.test(input.data)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        validation: "email",
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "uuid") {
	                if (!uuidRegex.test(input.data)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        validation: "uuid",
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "cuid") {
	                if (!cuidRegex.test(input.data)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        validation: "cuid",
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "url") {
	                try {
	                    new URL(input.data);
	                }
	                catch (_a) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        validation: "url",
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "regex") {
	                check.regex.lastIndex = 0;
	                const testResult = check.regex.test(input.data);
	                if (!testResult) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        validation: "regex",
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "trim") {
	                input.data = input.data.trim();
	            }
	            else if (check.kind === "startsWith") {
	                if (!input.data.startsWith(check.value)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        validation: { startsWith: check.value },
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "endsWith") {
	                if (!input.data.endsWith(check.value)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.invalid_string,
	                        validation: { endsWith: check.value },
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else {
	                util_1.util.assertNever(check);
	            }
	        }
	        return { status: status.value, value: input.data };
	    }
	    _addCheck(check) {
	        return new ZodString({
	            ...this._def,
	            checks: [...this._def.checks, check],
	        });
	    }
	    email(message) {
	        return this._addCheck({ kind: "email", ...errorUtil_1.errorUtil.errToObj(message) });
	    }
	    url(message) {
	        return this._addCheck({ kind: "url", ...errorUtil_1.errorUtil.errToObj(message) });
	    }
	    uuid(message) {
	        return this._addCheck({ kind: "uuid", ...errorUtil_1.errorUtil.errToObj(message) });
	    }
	    cuid(message) {
	        return this._addCheck({ kind: "cuid", ...errorUtil_1.errorUtil.errToObj(message) });
	    }
	    regex(regex, message) {
	        return this._addCheck({
	            kind: "regex",
	            regex: regex,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	    }
	    startsWith(value, message) {
	        return this._addCheck({
	            kind: "startsWith",
	            value: value,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	    }
	    endsWith(value, message) {
	        return this._addCheck({
	            kind: "endsWith",
	            value: value,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	    }
	    min(minLength, message) {
	        return this._addCheck({
	            kind: "min",
	            value: minLength,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	    }
	    max(maxLength, message) {
	        return this._addCheck({
	            kind: "max",
	            value: maxLength,
	            ...errorUtil_1.errorUtil.errToObj(message),
	        });
	    }
	    length(len, message) {
	        return this.min(len, message).max(len, message);
	    }
	    get isEmail() {
	        return !!this._def.checks.find((ch) => ch.kind === "email");
	    }
	    get isURL() {
	        return !!this._def.checks.find((ch) => ch.kind === "url");
	    }
	    get isUUID() {
	        return !!this._def.checks.find((ch) => ch.kind === "uuid");
	    }
	    get isCUID() {
	        return !!this._def.checks.find((ch) => ch.kind === "cuid");
	    }
	    get minLength() {
	        let min = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "min") {
	                if (min === null || ch.value > min)
	                    min = ch.value;
	            }
	        }
	        return min;
	    }
	    get maxLength() {
	        let max = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "max") {
	                if (max === null || ch.value < max)
	                    max = ch.value;
	            }
	        }
	        return max;
	    }
	}
	exports.ZodString = ZodString;
	ZodString.create = (params) => {
	    return new ZodString({
	        checks: [],
	        typeName: ZodFirstPartyTypeKind.ZodString,
	        ...processCreateParams(params),
	    });
	};
	// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
	function floatSafeRemainder(val, step) {
	    const valDecCount = (val.toString().split(".")[1] || "").length;
	    const stepDecCount = (step.toString().split(".")[1] || "").length;
	    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
	    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
	    return (valInt % stepInt) / Math.pow(10, decCount);
	}
	class ZodNumber extends ZodType {
	    constructor() {
	        super(...arguments);
	        this.min = this.gte;
	        this.max = this.lte;
	        this.step = this.multipleOf;
	    }
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.number) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.number,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        let ctx = undefined;
	        const status = new parseUtil_1.ParseStatus();
	        for (const check of this._def.checks) {
	            if (check.kind === "int") {
	                if (!util_1.util.isInteger(input.data)) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.invalid_type,
	                        expected: "integer",
	                        received: "float",
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "min") {
	                const tooSmall = check.inclusive
	                    ? input.data < check.value
	                    : input.data <= check.value;
	                if (tooSmall) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_small,
	                        minimum: check.value,
	                        type: "number",
	                        inclusive: check.inclusive,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "max") {
	                const tooBig = check.inclusive
	                    ? input.data > check.value
	                    : input.data >= check.value;
	                if (tooBig) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_big,
	                        maximum: check.value,
	                        type: "number",
	                        inclusive: check.inclusive,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "multipleOf") {
	                if (floatSafeRemainder(input.data, check.value) !== 0) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.not_multiple_of,
	                        multipleOf: check.value,
	                        message: check.message,
	                    });
	                    status.dirty();
	                }
	            }
	            else {
	                util_1.util.assertNever(check);
	            }
	        }
	        return { status: status.value, value: input.data };
	    }
	    gte(value, message) {
	        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
	    }
	    gt(value, message) {
	        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
	    }
	    lte(value, message) {
	        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
	    }
	    lt(value, message) {
	        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
	    }
	    setLimit(kind, value, inclusive, message) {
	        return new ZodNumber({
	            ...this._def,
	            checks: [
	                ...this._def.checks,
	                {
	                    kind,
	                    value,
	                    inclusive,
	                    message: errorUtil_1.errorUtil.toString(message),
	                },
	            ],
	        });
	    }
	    _addCheck(check) {
	        return new ZodNumber({
	            ...this._def,
	            checks: [...this._def.checks, check],
	        });
	    }
	    int(message) {
	        return this._addCheck({
	            kind: "int",
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    positive(message) {
	        return this._addCheck({
	            kind: "min",
	            value: 0,
	            inclusive: false,
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    negative(message) {
	        return this._addCheck({
	            kind: "max",
	            value: 0,
	            inclusive: false,
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    nonpositive(message) {
	        return this._addCheck({
	            kind: "max",
	            value: 0,
	            inclusive: true,
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    nonnegative(message) {
	        return this._addCheck({
	            kind: "min",
	            value: 0,
	            inclusive: true,
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    multipleOf(value, message) {
	        return this._addCheck({
	            kind: "multipleOf",
	            value: value,
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    get minValue() {
	        let min = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "min") {
	                if (min === null || ch.value > min)
	                    min = ch.value;
	            }
	        }
	        return min;
	    }
	    get maxValue() {
	        let max = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "max") {
	                if (max === null || ch.value < max)
	                    max = ch.value;
	            }
	        }
	        return max;
	    }
	    get isInt() {
	        return !!this._def.checks.find((ch) => ch.kind === "int");
	    }
	}
	exports.ZodNumber = ZodNumber;
	ZodNumber.create = (params) => {
	    return new ZodNumber({
	        checks: [],
	        typeName: ZodFirstPartyTypeKind.ZodNumber,
	        ...processCreateParams(params),
	    });
	};
	class ZodBigInt extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.bigint) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.bigint,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodBigInt = ZodBigInt;
	ZodBigInt.create = (params) => {
	    return new ZodBigInt({
	        typeName: ZodFirstPartyTypeKind.ZodBigInt,
	        ...processCreateParams(params),
	    });
	};
	class ZodBoolean extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.boolean) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.boolean,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodBoolean = ZodBoolean;
	ZodBoolean.create = (params) => {
	    return new ZodBoolean({
	        typeName: ZodFirstPartyTypeKind.ZodBoolean,
	        ...processCreateParams(params),
	    });
	};
	class ZodDate extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.date) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.date,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (isNaN(input.data.getTime())) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_date,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const status = new parseUtil_1.ParseStatus();
	        let ctx = undefined;
	        for (const check of this._def.checks) {
	            if (check.kind === "min") {
	                if (input.data.getTime() < check.value) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_small,
	                        message: check.message,
	                        inclusive: true,
	                        minimum: check.value,
	                        type: "date",
	                    });
	                    status.dirty();
	                }
	            }
	            else if (check.kind === "max") {
	                if (input.data.getTime() > check.value) {
	                    ctx = this._getOrReturnCtx(input, ctx);
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.too_big,
	                        message: check.message,
	                        inclusive: true,
	                        maximum: check.value,
	                        type: "date",
	                    });
	                    status.dirty();
	                }
	            }
	            else {
	                util_1.util.assertNever(check);
	            }
	        }
	        return {
	            status: status.value,
	            value: new Date(input.data.getTime()),
	        };
	    }
	    _addCheck(check) {
	        return new ZodDate({
	            ...this._def,
	            checks: [...this._def.checks, check],
	        });
	    }
	    min(minDate, message) {
	        return this._addCheck({
	            kind: "min",
	            value: minDate.getTime(),
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    max(maxDate, message) {
	        return this._addCheck({
	            kind: "max",
	            value: maxDate.getTime(),
	            message: errorUtil_1.errorUtil.toString(message),
	        });
	    }
	    get minDate() {
	        let min = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "min") {
	                if (min === null || ch.value > min)
	                    min = ch.value;
	            }
	        }
	        return min != null ? new Date(min) : null;
	    }
	    get maxDate() {
	        let max = null;
	        for (const ch of this._def.checks) {
	            if (ch.kind === "max") {
	                if (max === null || ch.value < max)
	                    max = ch.value;
	            }
	        }
	        return max != null ? new Date(max) : null;
	    }
	}
	exports.ZodDate = ZodDate;
	ZodDate.create = (params) => {
	    return new ZodDate({
	        checks: [],
	        typeName: ZodFirstPartyTypeKind.ZodDate,
	        ...processCreateParams(params),
	    });
	};
	class ZodUndefined extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.undefined) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.undefined,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodUndefined = ZodUndefined;
	ZodUndefined.create = (params) => {
	    return new ZodUndefined({
	        typeName: ZodFirstPartyTypeKind.ZodUndefined,
	        ...processCreateParams(params),
	    });
	};
	class ZodNull extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.null) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.null,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodNull = ZodNull;
	ZodNull.create = (params) => {
	    return new ZodNull({
	        typeName: ZodFirstPartyTypeKind.ZodNull,
	        ...processCreateParams(params),
	    });
	};
	class ZodAny extends ZodType {
	    constructor() {
	        super(...arguments);
	        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
	        this._any = true;
	    }
	    _parse(input) {
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodAny = ZodAny;
	ZodAny.create = (params) => {
	    return new ZodAny({
	        typeName: ZodFirstPartyTypeKind.ZodAny,
	        ...processCreateParams(params),
	    });
	};
	class ZodUnknown extends ZodType {
	    constructor() {
	        super(...arguments);
	        // required
	        this._unknown = true;
	    }
	    _parse(input) {
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodUnknown = ZodUnknown;
	ZodUnknown.create = (params) => {
	    return new ZodUnknown({
	        typeName: ZodFirstPartyTypeKind.ZodUnknown,
	        ...processCreateParams(params),
	    });
	};
	class ZodNever extends ZodType {
	    _parse(input) {
	        const ctx = this._getOrReturnCtx(input);
	        parseUtil_1.addIssueToContext(ctx, {
	            code: ZodError_1.ZodIssueCode.invalid_type,
	            expected: util_1.ZodParsedType.never,
	            received: ctx.parsedType,
	        });
	        return parseUtil_1.INVALID;
	    }
	}
	exports.ZodNever = ZodNever;
	ZodNever.create = (params) => {
	    return new ZodNever({
	        typeName: ZodFirstPartyTypeKind.ZodNever,
	        ...processCreateParams(params),
	    });
	};
	class ZodVoid extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.undefined) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.void,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	}
	exports.ZodVoid = ZodVoid;
	ZodVoid.create = (params) => {
	    return new ZodVoid({
	        typeName: ZodFirstPartyTypeKind.ZodVoid,
	        ...processCreateParams(params),
	    });
	};
	class ZodArray extends ZodType {
	    _parse(input) {
	        const { ctx, status } = this._processInputParams(input);
	        const def = this._def;
	        if (ctx.parsedType !== util_1.ZodParsedType.array) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.array,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (def.minLength !== null) {
	            if (ctx.data.length < def.minLength.value) {
	                parseUtil_1.addIssueToContext(ctx, {
	                    code: ZodError_1.ZodIssueCode.too_small,
	                    minimum: def.minLength.value,
	                    type: "array",
	                    inclusive: true,
	                    message: def.minLength.message,
	                });
	                status.dirty();
	            }
	        }
	        if (def.maxLength !== null) {
	            if (ctx.data.length > def.maxLength.value) {
	                parseUtil_1.addIssueToContext(ctx, {
	                    code: ZodError_1.ZodIssueCode.too_big,
	                    maximum: def.maxLength.value,
	                    type: "array",
	                    inclusive: true,
	                    message: def.maxLength.message,
	                });
	                status.dirty();
	            }
	        }
	        if (ctx.common.async) {
	            return Promise.all(ctx.data.map((item, i) => {
	                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
	            })).then((result) => {
	                return parseUtil_1.ParseStatus.mergeArray(status, result);
	            });
	        }
	        const result = ctx.data.map((item, i) => {
	            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
	        });
	        return parseUtil_1.ParseStatus.mergeArray(status, result);
	    }
	    get element() {
	        return this._def.type;
	    }
	    min(minLength, message) {
	        return new ZodArray({
	            ...this._def,
	            minLength: { value: minLength, message: errorUtil_1.errorUtil.toString(message) },
	        });
	    }
	    max(maxLength, message) {
	        return new ZodArray({
	            ...this._def,
	            maxLength: { value: maxLength, message: errorUtil_1.errorUtil.toString(message) },
	        });
	    }
	    length(len, message) {
	        return this.min(len, message).max(len, message);
	    }
	    nonempty(message) {
	        return this.min(1, message);
	    }
	}
	exports.ZodArray = ZodArray;
	ZodArray.create = (schema, params) => {
	    return new ZodArray({
	        type: schema,
	        minLength: null,
	        maxLength: null,
	        typeName: ZodFirstPartyTypeKind.ZodArray,
	        ...processCreateParams(params),
	    });
	};
	/////////////////////////////////////////
	/////////////////////////////////////////
	//////////                     //////////
	//////////      ZodObject      //////////
	//////////                     //////////
	/////////////////////////////////////////
	/////////////////////////////////////////
	var objectUtil;
	(function (objectUtil) {
	    objectUtil.mergeShapes = (first, second) => {
	        return {
	            ...first,
	            ...second,
	        };
	    };
	})(objectUtil = exports.objectUtil || (exports.objectUtil = {}));
	const AugmentFactory = (def) => (augmentation) => {
	    return new ZodObject({
	        ...def,
	        shape: () => ({
	            ...def.shape(),
	            ...augmentation,
	        }),
	    });
	};
	function deepPartialify(schema) {
	    if (schema instanceof ZodObject) {
	        const newShape = {};
	        for (const key in schema.shape) {
	            const fieldSchema = schema.shape[key];
	            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
	        }
	        return new ZodObject({
	            ...schema._def,
	            shape: () => newShape,
	        });
	    }
	    else if (schema instanceof ZodArray) {
	        return ZodArray.create(deepPartialify(schema.element));
	    }
	    else if (schema instanceof ZodOptional) {
	        return ZodOptional.create(deepPartialify(schema.unwrap()));
	    }
	    else if (schema instanceof ZodNullable) {
	        return ZodNullable.create(deepPartialify(schema.unwrap()));
	    }
	    else if (schema instanceof ZodTuple) {
	        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	    }
	    else {
	        return schema;
	    }
	}
	class ZodObject extends ZodType {
	    constructor() {
	        super(...arguments);
	        this._cached = null;
	        /**
	         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
	         * If you want to pass through unknown properties, use `.passthrough()` instead.
	         */
	        this.nonstrict = this.passthrough;
	        this.augment = AugmentFactory(this._def);
	        this.extend = AugmentFactory(this._def);
	    }
	    _getCached() {
	        if (this._cached !== null)
	            return this._cached;
	        const shape = this._def.shape();
	        const keys = util_1.util.objectKeys(shape);
	        return (this._cached = { shape, keys });
	    }
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.object) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.object,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const { status, ctx } = this._processInputParams(input);
	        const { shape, keys: shapeKeys } = this._getCached();
	        const extraKeys = [];
	        if (!(this._def.catchall instanceof ZodNever &&
	            this._def.unknownKeys === "strip")) {
	            for (const key in ctx.data) {
	                if (!shapeKeys.includes(key)) {
	                    extraKeys.push(key);
	                }
	            }
	        }
	        const pairs = [];
	        for (const key of shapeKeys) {
	            const keyValidator = shape[key];
	            const value = ctx.data[key];
	            pairs.push({
	                key: { status: "valid", value: key },
	                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
	                alwaysSet: key in ctx.data,
	            });
	        }
	        if (this._def.catchall instanceof ZodNever) {
	            const unknownKeys = this._def.unknownKeys;
	            if (unknownKeys === "passthrough") {
	                for (const key of extraKeys) {
	                    pairs.push({
	                        key: { status: "valid", value: key },
	                        value: { status: "valid", value: ctx.data[key] },
	                    });
	                }
	            }
	            else if (unknownKeys === "strict") {
	                if (extraKeys.length > 0) {
	                    parseUtil_1.addIssueToContext(ctx, {
	                        code: ZodError_1.ZodIssueCode.unrecognized_keys,
	                        keys: extraKeys,
	                    });
	                    status.dirty();
	                }
	            }
	            else if (unknownKeys === "strip") ;
	            else {
	                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
	            }
	        }
	        else {
	            // run catchall validation
	            const catchall = this._def.catchall;
	            for (const key of extraKeys) {
	                const value = ctx.data[key];
	                pairs.push({
	                    key: { status: "valid", value: key },
	                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
	                    ),
	                    alwaysSet: key in ctx.data,
	                });
	            }
	        }
	        if (ctx.common.async) {
	            return Promise.resolve()
	                .then(async () => {
	                const syncPairs = [];
	                for (const pair of pairs) {
	                    const key = await pair.key;
	                    syncPairs.push({
	                        key,
	                        value: await pair.value,
	                        alwaysSet: pair.alwaysSet,
	                    });
	                }
	                return syncPairs;
	            })
	                .then((syncPairs) => {
	                return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
	            });
	        }
	        else {
	            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
	        }
	    }
	    get shape() {
	        return this._def.shape();
	    }
	    strict(message) {
	        errorUtil_1.errorUtil.errToObj;
	        return new ZodObject({
	            ...this._def,
	            unknownKeys: "strict",
	            ...(message !== undefined
	                ? {
	                    errorMap: (issue, ctx) => {
	                        var _a, _b, _c, _d;
	                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
	                        if (issue.code === "unrecognized_keys")
	                            return {
	                                message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
	                            };
	                        return {
	                            message: defaultError,
	                        };
	                    },
	                }
	                : {}),
	        });
	    }
	    strip() {
	        return new ZodObject({
	            ...this._def,
	            unknownKeys: "strip",
	        });
	    }
	    passthrough() {
	        return new ZodObject({
	            ...this._def,
	            unknownKeys: "passthrough",
	        });
	    }
	    setKey(key, schema) {
	        return this.augment({ [key]: schema });
	    }
	    /**
	     * Prior to zod@1.0.12 there was a bug in the
	     * inferred type of merged objects. Please
	     * upgrade if you are experiencing issues.
	     */
	    merge(merging) {
	        // const mergedShape = objectUtil.mergeShapes(
	        //   this._def.shape(),
	        //   merging._def.shape()
	        // );
	        const merged = new ZodObject({
	            unknownKeys: merging._def.unknownKeys,
	            catchall: merging._def.catchall,
	            shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
	            typeName: ZodFirstPartyTypeKind.ZodObject,
	        });
	        return merged;
	    }
	    catchall(index) {
	        return new ZodObject({
	            ...this._def,
	            catchall: index,
	        });
	    }
	    pick(mask) {
	        const shape = {};
	        util_1.util.objectKeys(mask).map((key) => {
	            // only add to shape if key corresponds to an element of the current shape
	            if (this.shape[key])
	                shape[key] = this.shape[key];
	        });
	        return new ZodObject({
	            ...this._def,
	            shape: () => shape,
	        });
	    }
	    omit(mask) {
	        const shape = {};
	        util_1.util.objectKeys(this.shape).map((key) => {
	            if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
	                shape[key] = this.shape[key];
	            }
	        });
	        return new ZodObject({
	            ...this._def,
	            shape: () => shape,
	        });
	    }
	    deepPartial() {
	        return deepPartialify(this);
	    }
	    partial(mask) {
	        const newShape = {};
	        if (mask) {
	            util_1.util.objectKeys(this.shape).map((key) => {
	                if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
	                    newShape[key] = this.shape[key];
	                }
	                else {
	                    newShape[key] = this.shape[key].optional();
	                }
	            });
	            return new ZodObject({
	                ...this._def,
	                shape: () => newShape,
	            });
	        }
	        else {
	            for (const key in this.shape) {
	                const fieldSchema = this.shape[key];
	                newShape[key] = fieldSchema.optional();
	            }
	        }
	        return new ZodObject({
	            ...this._def,
	            shape: () => newShape,
	        });
	    }
	    required() {
	        const newShape = {};
	        for (const key in this.shape) {
	            const fieldSchema = this.shape[key];
	            let newField = fieldSchema;
	            while (newField instanceof ZodOptional) {
	                newField = newField._def.innerType;
	            }
	            newShape[key] = newField;
	        }
	        return new ZodObject({
	            ...this._def,
	            shape: () => newShape,
	        });
	    }
	    keyof() {
	        return createZodEnum(util_1.util.objectKeys(this.shape));
	    }
	}
	exports.ZodObject = ZodObject;
	ZodObject.create = (shape, params) => {
	    return new ZodObject({
	        shape: () => shape,
	        unknownKeys: "strip",
	        catchall: ZodNever.create(),
	        typeName: ZodFirstPartyTypeKind.ZodObject,
	        ...processCreateParams(params),
	    });
	};
	ZodObject.strictCreate = (shape, params) => {
	    return new ZodObject({
	        shape: () => shape,
	        unknownKeys: "strict",
	        catchall: ZodNever.create(),
	        typeName: ZodFirstPartyTypeKind.ZodObject,
	        ...processCreateParams(params),
	    });
	};
	ZodObject.lazycreate = (shape, params) => {
	    return new ZodObject({
	        shape,
	        unknownKeys: "strip",
	        catchall: ZodNever.create(),
	        typeName: ZodFirstPartyTypeKind.ZodObject,
	        ...processCreateParams(params),
	    });
	};
	class ZodUnion extends ZodType {
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        const options = this._def.options;
	        function handleResults(results) {
	            // return first issue-free validation if it exists
	            for (const result of results) {
	                if (result.result.status === "valid") {
	                    return result.result;
	                }
	            }
	            for (const result of results) {
	                if (result.result.status === "dirty") {
	                    // add issues from dirty option
	                    ctx.common.issues.push(...result.ctx.common.issues);
	                    return result.result;
	                }
	            }
	            // return invalid
	            const unionErrors = results.map((result) => new ZodError_1.ZodError(result.ctx.common.issues));
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_union,
	                unionErrors,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (ctx.common.async) {
	            return Promise.all(options.map(async (option) => {
	                const childCtx = {
	                    ...ctx,
	                    common: {
	                        ...ctx.common,
	                        issues: [],
	                    },
	                    parent: null,
	                };
	                return {
	                    result: await option._parseAsync({
	                        data: ctx.data,
	                        path: ctx.path,
	                        parent: childCtx,
	                    }),
	                    ctx: childCtx,
	                };
	            })).then(handleResults);
	        }
	        else {
	            let dirty = undefined;
	            const issues = [];
	            for (const option of options) {
	                const childCtx = {
	                    ...ctx,
	                    common: {
	                        ...ctx.common,
	                        issues: [],
	                    },
	                    parent: null,
	                };
	                const result = option._parseSync({
	                    data: ctx.data,
	                    path: ctx.path,
	                    parent: childCtx,
	                });
	                if (result.status === "valid") {
	                    return result;
	                }
	                else if (result.status === "dirty" && !dirty) {
	                    dirty = { result, ctx: childCtx };
	                }
	                if (childCtx.common.issues.length) {
	                    issues.push(childCtx.common.issues);
	                }
	            }
	            if (dirty) {
	                ctx.common.issues.push(...dirty.ctx.common.issues);
	                return dirty.result;
	            }
	            const unionErrors = issues.map((issues) => new ZodError_1.ZodError(issues));
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_union,
	                unionErrors,
	            });
	            return parseUtil_1.INVALID;
	        }
	    }
	    get options() {
	        return this._def.options;
	    }
	}
	exports.ZodUnion = ZodUnion;
	ZodUnion.create = (types, params) => {
	    return new ZodUnion({
	        options: types,
	        typeName: ZodFirstPartyTypeKind.ZodUnion,
	        ...processCreateParams(params),
	    });
	};
	class ZodDiscriminatedUnion extends ZodType {
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.object) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.object,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const discriminator = this.discriminator;
	        const discriminatorValue = ctx.data[discriminator];
	        const option = this.options.get(discriminatorValue);
	        if (!option) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
	                options: this.validDiscriminatorValues,
	                path: [discriminator],
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (ctx.common.async) {
	            return option._parseAsync({
	                data: ctx.data,
	                path: ctx.path,
	                parent: ctx,
	            });
	        }
	        else {
	            return option._parseSync({
	                data: ctx.data,
	                path: ctx.path,
	                parent: ctx,
	            });
	        }
	    }
	    get discriminator() {
	        return this._def.discriminator;
	    }
	    get validDiscriminatorValues() {
	        return Array.from(this.options.keys());
	    }
	    get options() {
	        return this._def.options;
	    }
	    /**
	     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	     * have a different value for each object in the union.
	     * @param discriminator the name of the discriminator property
	     * @param types an array of object schemas
	     * @param params
	     */
	    static create(discriminator, types, params) {
	        // Get all the valid discriminator values
	        const options = new Map();
	        try {
	            types.forEach((type) => {
	                const discriminatorValue = type.shape[discriminator].value;
	                options.set(discriminatorValue, type);
	            });
	        }
	        catch (e) {
	            throw new Error("The discriminator value could not be extracted from all the provided schemas");
	        }
	        // Assert that all the discriminator values are unique
	        if (options.size !== types.length) {
	            throw new Error("Some of the discriminator values are not unique");
	        }
	        return new ZodDiscriminatedUnion({
	            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
	            discriminator,
	            options,
	            ...processCreateParams(params),
	        });
	    }
	}
	exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
	function mergeValues(a, b) {
	    const aType = util_1.getParsedType(a);
	    const bType = util_1.getParsedType(b);
	    if (a === b) {
	        return { valid: true, data: a };
	    }
	    else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
	        const bKeys = util_1.util.objectKeys(b);
	        const sharedKeys = util_1.util
	            .objectKeys(a)
	            .filter((key) => bKeys.indexOf(key) !== -1);
	        const newObj = { ...a, ...b };
	        for (const key of sharedKeys) {
	            const sharedValue = mergeValues(a[key], b[key]);
	            if (!sharedValue.valid) {
	                return { valid: false };
	            }
	            newObj[key] = sharedValue.data;
	        }
	        return { valid: true, data: newObj };
	    }
	    else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
	        if (a.length !== b.length) {
	            return { valid: false };
	        }
	        const newArray = [];
	        for (let index = 0; index < a.length; index++) {
	            const itemA = a[index];
	            const itemB = b[index];
	            const sharedValue = mergeValues(itemA, itemB);
	            if (!sharedValue.valid) {
	                return { valid: false };
	            }
	            newArray.push(sharedValue.data);
	        }
	        return { valid: true, data: newArray };
	    }
	    else if (aType === util_1.ZodParsedType.date &&
	        bType === util_1.ZodParsedType.date &&
	        +a === +b) {
	        return { valid: true, data: a };
	    }
	    else {
	        return { valid: false };
	    }
	}
	class ZodIntersection extends ZodType {
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        const handleParsed = (parsedLeft, parsedRight) => {
	            if (parseUtil_1.isAborted(parsedLeft) || parseUtil_1.isAborted(parsedRight)) {
	                return parseUtil_1.INVALID;
	            }
	            const merged = mergeValues(parsedLeft.value, parsedRight.value);
	            if (!merged.valid) {
	                parseUtil_1.addIssueToContext(ctx, {
	                    code: ZodError_1.ZodIssueCode.invalid_intersection_types,
	                });
	                return parseUtil_1.INVALID;
	            }
	            if (parseUtil_1.isDirty(parsedLeft) || parseUtil_1.isDirty(parsedRight)) {
	                status.dirty();
	            }
	            return { status: status.value, value: merged.data };
	        };
	        if (ctx.common.async) {
	            return Promise.all([
	                this._def.left._parseAsync({
	                    data: ctx.data,
	                    path: ctx.path,
	                    parent: ctx,
	                }),
	                this._def.right._parseAsync({
	                    data: ctx.data,
	                    path: ctx.path,
	                    parent: ctx,
	                }),
	            ]).then(([left, right]) => handleParsed(left, right));
	        }
	        else {
	            return handleParsed(this._def.left._parseSync({
	                data: ctx.data,
	                path: ctx.path,
	                parent: ctx,
	            }), this._def.right._parseSync({
	                data: ctx.data,
	                path: ctx.path,
	                parent: ctx,
	            }));
	        }
	    }
	}
	exports.ZodIntersection = ZodIntersection;
	ZodIntersection.create = (left, right, params) => {
	    return new ZodIntersection({
	        left: left,
	        right: right,
	        typeName: ZodFirstPartyTypeKind.ZodIntersection,
	        ...processCreateParams(params),
	    });
	};
	class ZodTuple extends ZodType {
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.array) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.array,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (ctx.data.length < this._def.items.length) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.too_small,
	                minimum: this._def.items.length,
	                inclusive: true,
	                type: "array",
	            });
	            return parseUtil_1.INVALID;
	        }
	        const rest = this._def.rest;
	        if (!rest && ctx.data.length > this._def.items.length) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.too_big,
	                maximum: this._def.items.length,
	                inclusive: true,
	                type: "array",
	            });
	            status.dirty();
	        }
	        const items = ctx.data
	            .map((item, itemIndex) => {
	            const schema = this._def.items[itemIndex] || this._def.rest;
	            if (!schema)
	                return null;
	            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
	        })
	            .filter((x) => !!x); // filter nulls
	        if (ctx.common.async) {
	            return Promise.all(items).then((results) => {
	                return parseUtil_1.ParseStatus.mergeArray(status, results);
	            });
	        }
	        else {
	            return parseUtil_1.ParseStatus.mergeArray(status, items);
	        }
	    }
	    get items() {
	        return this._def.items;
	    }
	    rest(rest) {
	        return new ZodTuple({
	            ...this._def,
	            rest,
	        });
	    }
	}
	exports.ZodTuple = ZodTuple;
	ZodTuple.create = (schemas, params) => {
	    if (!Array.isArray(schemas)) {
	        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	    }
	    return new ZodTuple({
	        items: schemas,
	        typeName: ZodFirstPartyTypeKind.ZodTuple,
	        rest: null,
	        ...processCreateParams(params),
	    });
	};
	class ZodRecord extends ZodType {
	    get keySchema() {
	        return this._def.keyType;
	    }
	    get valueSchema() {
	        return this._def.valueType;
	    }
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.object) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.object,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const pairs = [];
	        const keyType = this._def.keyType;
	        const valueType = this._def.valueType;
	        for (const key in ctx.data) {
	            pairs.push({
	                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
	                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
	            });
	        }
	        if (ctx.common.async) {
	            return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
	        }
	        else {
	            return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
	        }
	    }
	    get element() {
	        return this._def.valueType;
	    }
	    static create(first, second, third) {
	        if (second instanceof ZodType) {
	            return new ZodRecord({
	                keyType: first,
	                valueType: second,
	                typeName: ZodFirstPartyTypeKind.ZodRecord,
	                ...processCreateParams(third),
	            });
	        }
	        return new ZodRecord({
	            keyType: ZodString.create(),
	            valueType: first,
	            typeName: ZodFirstPartyTypeKind.ZodRecord,
	            ...processCreateParams(second),
	        });
	    }
	}
	exports.ZodRecord = ZodRecord;
	class ZodMap extends ZodType {
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.map) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.map,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const keyType = this._def.keyType;
	        const valueType = this._def.valueType;
	        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
	            return {
	                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
	                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
	            };
	        });
	        if (ctx.common.async) {
	            const finalMap = new Map();
	            return Promise.resolve().then(async () => {
	                for (const pair of pairs) {
	                    const key = await pair.key;
	                    const value = await pair.value;
	                    if (key.status === "aborted" || value.status === "aborted") {
	                        return parseUtil_1.INVALID;
	                    }
	                    if (key.status === "dirty" || value.status === "dirty") {
	                        status.dirty();
	                    }
	                    finalMap.set(key.value, value.value);
	                }
	                return { status: status.value, value: finalMap };
	            });
	        }
	        else {
	            const finalMap = new Map();
	            for (const pair of pairs) {
	                const key = pair.key;
	                const value = pair.value;
	                if (key.status === "aborted" || value.status === "aborted") {
	                    return parseUtil_1.INVALID;
	                }
	                if (key.status === "dirty" || value.status === "dirty") {
	                    status.dirty();
	                }
	                finalMap.set(key.value, value.value);
	            }
	            return { status: status.value, value: finalMap };
	        }
	    }
	}
	exports.ZodMap = ZodMap;
	ZodMap.create = (keyType, valueType, params) => {
	    return new ZodMap({
	        valueType,
	        keyType,
	        typeName: ZodFirstPartyTypeKind.ZodMap,
	        ...processCreateParams(params),
	    });
	};
	class ZodSet extends ZodType {
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.set) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.set,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const def = this._def;
	        if (def.minSize !== null) {
	            if (ctx.data.size < def.minSize.value) {
	                parseUtil_1.addIssueToContext(ctx, {
	                    code: ZodError_1.ZodIssueCode.too_small,
	                    minimum: def.minSize.value,
	                    type: "set",
	                    inclusive: true,
	                    message: def.minSize.message,
	                });
	                status.dirty();
	            }
	        }
	        if (def.maxSize !== null) {
	            if (ctx.data.size > def.maxSize.value) {
	                parseUtil_1.addIssueToContext(ctx, {
	                    code: ZodError_1.ZodIssueCode.too_big,
	                    maximum: def.maxSize.value,
	                    type: "set",
	                    inclusive: true,
	                    message: def.maxSize.message,
	                });
	                status.dirty();
	            }
	        }
	        const valueType = this._def.valueType;
	        function finalizeSet(elements) {
	            const parsedSet = new Set();
	            for (const element of elements) {
	                if (element.status === "aborted")
	                    return parseUtil_1.INVALID;
	                if (element.status === "dirty")
	                    status.dirty();
	                parsedSet.add(element.value);
	            }
	            return { status: status.value, value: parsedSet };
	        }
	        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
	        if (ctx.common.async) {
	            return Promise.all(elements).then((elements) => finalizeSet(elements));
	        }
	        else {
	            return finalizeSet(elements);
	        }
	    }
	    min(minSize, message) {
	        return new ZodSet({
	            ...this._def,
	            minSize: { value: minSize, message: errorUtil_1.errorUtil.toString(message) },
	        });
	    }
	    max(maxSize, message) {
	        return new ZodSet({
	            ...this._def,
	            maxSize: { value: maxSize, message: errorUtil_1.errorUtil.toString(message) },
	        });
	    }
	    size(size, message) {
	        return this.min(size, message).max(size, message);
	    }
	    nonempty(message) {
	        return this.min(1, message);
	    }
	}
	exports.ZodSet = ZodSet;
	ZodSet.create = (valueType, params) => {
	    return new ZodSet({
	        valueType,
	        minSize: null,
	        maxSize: null,
	        typeName: ZodFirstPartyTypeKind.ZodSet,
	        ...processCreateParams(params),
	    });
	};
	class ZodFunction extends ZodType {
	    constructor() {
	        super(...arguments);
	        this.validate = this.implement;
	    }
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.function) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.function,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        function makeArgsIssue(args, error) {
	            return parseUtil_1.makeIssue({
	                data: args,
	                path: ctx.path,
	                errorMaps: [
	                    ctx.common.contextualErrorMap,
	                    ctx.schemaErrorMap,
	                    errors_1.getErrorMap(),
	                    errors_1.defaultErrorMap,
	                ].filter((x) => !!x),
	                issueData: {
	                    code: ZodError_1.ZodIssueCode.invalid_arguments,
	                    argumentsError: error,
	                },
	            });
	        }
	        function makeReturnsIssue(returns, error) {
	            return parseUtil_1.makeIssue({
	                data: returns,
	                path: ctx.path,
	                errorMaps: [
	                    ctx.common.contextualErrorMap,
	                    ctx.schemaErrorMap,
	                    errors_1.getErrorMap(),
	                    errors_1.defaultErrorMap,
	                ].filter((x) => !!x),
	                issueData: {
	                    code: ZodError_1.ZodIssueCode.invalid_return_type,
	                    returnTypeError: error,
	                },
	            });
	        }
	        const params = { errorMap: ctx.common.contextualErrorMap };
	        const fn = ctx.data;
	        if (this._def.returns instanceof ZodPromise) {
	            return parseUtil_1.OK(async (...args) => {
	                const error = new ZodError_1.ZodError([]);
	                const parsedArgs = await this._def.args
	                    .parseAsync(args, params)
	                    .catch((e) => {
	                    error.addIssue(makeArgsIssue(args, e));
	                    throw error;
	                });
	                const result = await fn(...parsedArgs);
	                const parsedReturns = await this._def.returns._def.type
	                    .parseAsync(result, params)
	                    .catch((e) => {
	                    error.addIssue(makeReturnsIssue(result, e));
	                    throw error;
	                });
	                return parsedReturns;
	            });
	        }
	        else {
	            return parseUtil_1.OK((...args) => {
	                const parsedArgs = this._def.args.safeParse(args, params);
	                if (!parsedArgs.success) {
	                    throw new ZodError_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
	                }
	                const result = fn(...parsedArgs.data);
	                const parsedReturns = this._def.returns.safeParse(result, params);
	                if (!parsedReturns.success) {
	                    throw new ZodError_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
	                }
	                return parsedReturns.data;
	            });
	        }
	    }
	    parameters() {
	        return this._def.args;
	    }
	    returnType() {
	        return this._def.returns;
	    }
	    args(...items) {
	        return new ZodFunction({
	            ...this._def,
	            args: ZodTuple.create(items).rest(ZodUnknown.create()),
	        });
	    }
	    returns(returnType) {
	        return new ZodFunction({
	            ...this._def,
	            returns: returnType,
	        });
	    }
	    implement(func) {
	        const validatedFunc = this.parse(func);
	        return validatedFunc;
	    }
	    strictImplement(func) {
	        const validatedFunc = this.parse(func);
	        return validatedFunc;
	    }
	    static create(args, returns, params) {
	        return new ZodFunction({
	            args: (args
	                ? args
	                : ZodTuple.create([]).rest(ZodUnknown.create())),
	            returns: returns || ZodUnknown.create(),
	            typeName: ZodFirstPartyTypeKind.ZodFunction,
	            ...processCreateParams(params),
	        });
	    }
	}
	exports.ZodFunction = ZodFunction;
	class ZodLazy extends ZodType {
	    get schema() {
	        return this._def.getter();
	    }
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        const lazySchema = this._def.getter();
	        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
	    }
	}
	exports.ZodLazy = ZodLazy;
	ZodLazy.create = (getter, params) => {
	    return new ZodLazy({
	        getter: getter,
	        typeName: ZodFirstPartyTypeKind.ZodLazy,
	        ...processCreateParams(params),
	    });
	};
	class ZodLiteral extends ZodType {
	    _parse(input) {
	        if (input.data !== this._def.value) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_literal,
	                expected: this._def.value,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return { status: "valid", value: input.data };
	    }
	    get value() {
	        return this._def.value;
	    }
	}
	exports.ZodLiteral = ZodLiteral;
	ZodLiteral.create = (value, params) => {
	    return new ZodLiteral({
	        value: value,
	        typeName: ZodFirstPartyTypeKind.ZodLiteral,
	        ...processCreateParams(params),
	    });
	};
	function createZodEnum(values, params) {
	    return new ZodEnum({
	        values: values,
	        typeName: ZodFirstPartyTypeKind.ZodEnum,
	        ...processCreateParams(params),
	    });
	}
	class ZodEnum extends ZodType {
	    _parse(input) {
	        if (typeof input.data !== "string") {
	            const ctx = this._getOrReturnCtx(input);
	            const expectedValues = this._def.values;
	            parseUtil_1.addIssueToContext(ctx, {
	                expected: util_1.util.joinValues(expectedValues),
	                received: ctx.parsedType,
	                code: ZodError_1.ZodIssueCode.invalid_type,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (this._def.values.indexOf(input.data) === -1) {
	            const ctx = this._getOrReturnCtx(input);
	            const expectedValues = this._def.values;
	            parseUtil_1.addIssueToContext(ctx, {
	                received: ctx.data,
	                code: ZodError_1.ZodIssueCode.invalid_enum_value,
	                options: expectedValues,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	    get options() {
	        return this._def.values;
	    }
	    get enum() {
	        const enumValues = {};
	        for (const val of this._def.values) {
	            enumValues[val] = val;
	        }
	        return enumValues;
	    }
	    get Values() {
	        const enumValues = {};
	        for (const val of this._def.values) {
	            enumValues[val] = val;
	        }
	        return enumValues;
	    }
	    get Enum() {
	        const enumValues = {};
	        for (const val of this._def.values) {
	            enumValues[val] = val;
	        }
	        return enumValues;
	    }
	}
	exports.ZodEnum = ZodEnum;
	ZodEnum.create = createZodEnum;
	class ZodNativeEnum extends ZodType {
	    _parse(input) {
	        const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
	        const ctx = this._getOrReturnCtx(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.string &&
	            ctx.parsedType !== util_1.ZodParsedType.number) {
	            const expectedValues = util_1.util.objectValues(nativeEnumValues);
	            parseUtil_1.addIssueToContext(ctx, {
	                expected: util_1.util.joinValues(expectedValues),
	                received: ctx.parsedType,
	                code: ZodError_1.ZodIssueCode.invalid_type,
	            });
	            return parseUtil_1.INVALID;
	        }
	        if (nativeEnumValues.indexOf(input.data) === -1) {
	            const expectedValues = util_1.util.objectValues(nativeEnumValues);
	            parseUtil_1.addIssueToContext(ctx, {
	                received: ctx.data,
	                code: ZodError_1.ZodIssueCode.invalid_enum_value,
	                options: expectedValues,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return parseUtil_1.OK(input.data);
	    }
	    get enum() {
	        return this._def.values;
	    }
	}
	exports.ZodNativeEnum = ZodNativeEnum;
	ZodNativeEnum.create = (values, params) => {
	    return new ZodNativeEnum({
	        values: values,
	        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
	        ...processCreateParams(params),
	    });
	};
	class ZodPromise extends ZodType {
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        if (ctx.parsedType !== util_1.ZodParsedType.promise &&
	            ctx.common.async === false) {
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.promise,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        const promisified = ctx.parsedType === util_1.ZodParsedType.promise
	            ? ctx.data
	            : Promise.resolve(ctx.data);
	        return parseUtil_1.OK(promisified.then((data) => {
	            return this._def.type.parseAsync(data, {
	                path: ctx.path,
	                errorMap: ctx.common.contextualErrorMap,
	            });
	        }));
	    }
	}
	exports.ZodPromise = ZodPromise;
	ZodPromise.create = (schema, params) => {
	    return new ZodPromise({
	        type: schema,
	        typeName: ZodFirstPartyTypeKind.ZodPromise,
	        ...processCreateParams(params),
	    });
	};
	class ZodEffects extends ZodType {
	    innerType() {
	        return this._def.schema;
	    }
	    _parse(input) {
	        const { status, ctx } = this._processInputParams(input);
	        const effect = this._def.effect || null;
	        if (effect.type === "preprocess") {
	            const processed = effect.transform(ctx.data);
	            if (ctx.common.async) {
	                return Promise.resolve(processed).then((processed) => {
	                    return this._def.schema._parseAsync({
	                        data: processed,
	                        path: ctx.path,
	                        parent: ctx,
	                    });
	                });
	            }
	            else {
	                return this._def.schema._parseSync({
	                    data: processed,
	                    path: ctx.path,
	                    parent: ctx,
	                });
	            }
	        }
	        const checkCtx = {
	            addIssue: (arg) => {
	                parseUtil_1.addIssueToContext(ctx, arg);
	                if (arg.fatal) {
	                    status.abort();
	                }
	                else {
	                    status.dirty();
	                }
	            },
	            get path() {
	                return ctx.path;
	            },
	        };
	        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
	        if (effect.type === "refinement") {
	            const executeRefinement = (acc
	            // effect: RefinementEffect<any>
	            ) => {
	                const result = effect.refinement(acc, checkCtx);
	                if (ctx.common.async) {
	                    return Promise.resolve(result);
	                }
	                if (result instanceof Promise) {
	                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
	                }
	                return acc;
	            };
	            if (ctx.common.async === false) {
	                const inner = this._def.schema._parseSync({
	                    data: ctx.data,
	                    path: ctx.path,
	                    parent: ctx,
	                });
	                if (inner.status === "aborted")
	                    return parseUtil_1.INVALID;
	                if (inner.status === "dirty")
	                    status.dirty();
	                // return value is ignored
	                executeRefinement(inner.value);
	                return { status: status.value, value: inner.value };
	            }
	            else {
	                return this._def.schema
	                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
	                    .then((inner) => {
	                    if (inner.status === "aborted")
	                        return parseUtil_1.INVALID;
	                    if (inner.status === "dirty")
	                        status.dirty();
	                    return executeRefinement(inner.value).then(() => {
	                        return { status: status.value, value: inner.value };
	                    });
	                });
	            }
	        }
	        if (effect.type === "transform") {
	            if (ctx.common.async === false) {
	                const base = this._def.schema._parseSync({
	                    data: ctx.data,
	                    path: ctx.path,
	                    parent: ctx,
	                });
	                // if (base.status === "aborted") return INVALID;
	                // if (base.status === "dirty") {
	                //   return { status: "dirty", value: base.value };
	                // }
	                if (!parseUtil_1.isValid(base))
	                    return base;
	                const result = effect.transform(base.value, checkCtx);
	                if (result instanceof Promise) {
	                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
	                }
	                return { status: status.value, value: result };
	            }
	            else {
	                return this._def.schema
	                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
	                    .then((base) => {
	                    if (!parseUtil_1.isValid(base))
	                        return base;
	                    // if (base.status === "aborted") return INVALID;
	                    // if (base.status === "dirty") {
	                    //   return { status: "dirty", value: base.value };
	                    // }
	                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
	                });
	            }
	        }
	        util_1.util.assertNever(effect);
	    }
	}
	exports.ZodEffects = ZodEffects;
	exports.ZodTransformer = ZodEffects;
	ZodEffects.create = (schema, effect, params) => {
	    return new ZodEffects({
	        schema,
	        typeName: ZodFirstPartyTypeKind.ZodEffects,
	        effect,
	        ...processCreateParams(params),
	    });
	};
	ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	    return new ZodEffects({
	        schema,
	        effect: { type: "preprocess", transform: preprocess },
	        typeName: ZodFirstPartyTypeKind.ZodEffects,
	        ...processCreateParams(params),
	    });
	};
	class ZodOptional extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType === util_1.ZodParsedType.undefined) {
	            return parseUtil_1.OK(undefined);
	        }
	        return this._def.innerType._parse(input);
	    }
	    unwrap() {
	        return this._def.innerType;
	    }
	}
	exports.ZodOptional = ZodOptional;
	ZodOptional.create = (type, params) => {
	    return new ZodOptional({
	        innerType: type,
	        typeName: ZodFirstPartyTypeKind.ZodOptional,
	        ...processCreateParams(params),
	    });
	};
	class ZodNullable extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType === util_1.ZodParsedType.null) {
	            return parseUtil_1.OK(null);
	        }
	        return this._def.innerType._parse(input);
	    }
	    unwrap() {
	        return this._def.innerType;
	    }
	}
	exports.ZodNullable = ZodNullable;
	ZodNullable.create = (type, params) => {
	    return new ZodNullable({
	        innerType: type,
	        typeName: ZodFirstPartyTypeKind.ZodNullable,
	        ...processCreateParams(params),
	    });
	};
	class ZodDefault extends ZodType {
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        let data = ctx.data;
	        if (ctx.parsedType === util_1.ZodParsedType.undefined) {
	            data = this._def.defaultValue();
	        }
	        return this._def.innerType._parse({
	            data,
	            path: ctx.path,
	            parent: ctx,
	        });
	    }
	    removeDefault() {
	        return this._def.innerType;
	    }
	}
	exports.ZodDefault = ZodDefault;
	ZodDefault.create = (type, params) => {
	    return new ZodOptional({
	        innerType: type,
	        typeName: ZodFirstPartyTypeKind.ZodOptional,
	        ...processCreateParams(params),
	    });
	};
	class ZodNaN extends ZodType {
	    _parse(input) {
	        const parsedType = this._getType(input);
	        if (parsedType !== util_1.ZodParsedType.nan) {
	            const ctx = this._getOrReturnCtx(input);
	            parseUtil_1.addIssueToContext(ctx, {
	                code: ZodError_1.ZodIssueCode.invalid_type,
	                expected: util_1.ZodParsedType.nan,
	                received: ctx.parsedType,
	            });
	            return parseUtil_1.INVALID;
	        }
	        return { status: "valid", value: input.data };
	    }
	}
	exports.ZodNaN = ZodNaN;
	ZodNaN.create = (params) => {
	    return new ZodNaN({
	        typeName: ZodFirstPartyTypeKind.ZodNaN,
	        ...processCreateParams(params),
	    });
	};
	exports.BRAND = Symbol("zod_brand");
	class ZodBranded extends ZodType {
	    _parse(input) {
	        const { ctx } = this._processInputParams(input);
	        const data = ctx.data;
	        return this._def.type._parse({
	            data,
	            path: ctx.path,
	            parent: ctx,
	        });
	    }
	    unwrap() {
	        return this._def.type;
	    }
	}
	exports.ZodBranded = ZodBranded;
	const custom = (check, params = {}, fatal) => {
	    if (check)
	        return ZodAny.create().superRefine((data, ctx) => {
	            if (!check(data)) {
	                const p = typeof params === "function" ? params(data) : params;
	                const p2 = typeof p === "string" ? { message: p } : p;
	                ctx.addIssue({ code: "custom", ...p2, fatal });
	            }
	        });
	    return ZodAny.create();
	};
	exports.custom = custom;
	exports.late = {
	    object: ZodObject.lazycreate,
	};
	var ZodFirstPartyTypeKind;
	(function (ZodFirstPartyTypeKind) {
	    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
	    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
	    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
	    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
	    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
	    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
	    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
	    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
	    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
	    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
	    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
	    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
	    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
	    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
	    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
	    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
	    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
	    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
	    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
	    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
	    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
	    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
	    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
	    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
	    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
	    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
	    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
	    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
	    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
	    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
	    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
	})(ZodFirstPartyTypeKind = exports.ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = {}));
	// new approach that works for abstract classes
	// but required TS 4.4+
	// abstract class Class {
	//   constructor(..._: any[]) {}
	// }
	// const instanceOfType = <T extends typeof Class>(
	const instanceOfType = (cls, params = {
	    message: `Input not instance of ${cls.name}`,
	}) => exports.custom((data) => data instanceof cls, params, true);
	exports.instanceof = instanceOfType;
	const stringType = ZodString.create;
	exports.string = stringType;
	const numberType = ZodNumber.create;
	exports.number = numberType;
	const nanType = ZodNaN.create;
	exports.nan = nanType;
	const bigIntType = ZodBigInt.create;
	exports.bigint = bigIntType;
	const booleanType = ZodBoolean.create;
	exports.boolean = booleanType;
	const dateType = ZodDate.create;
	exports.date = dateType;
	const undefinedType = ZodUndefined.create;
	exports.undefined = undefinedType;
	const nullType = ZodNull.create;
	exports.null = nullType;
	const anyType = ZodAny.create;
	exports.any = anyType;
	const unknownType = ZodUnknown.create;
	exports.unknown = unknownType;
	const neverType = ZodNever.create;
	exports.never = neverType;
	const voidType = ZodVoid.create;
	exports.void = voidType;
	const arrayType = ZodArray.create;
	exports.array = arrayType;
	const objectType = ZodObject.create;
	exports.object = objectType;
	const strictObjectType = ZodObject.strictCreate;
	exports.strictObject = strictObjectType;
	const unionType = ZodUnion.create;
	exports.union = unionType;
	const discriminatedUnionType = ZodDiscriminatedUnion.create;
	exports.discriminatedUnion = discriminatedUnionType;
	const intersectionType = ZodIntersection.create;
	exports.intersection = intersectionType;
	const tupleType = ZodTuple.create;
	exports.tuple = tupleType;
	const recordType = ZodRecord.create;
	exports.record = recordType;
	const mapType = ZodMap.create;
	exports.map = mapType;
	const setType = ZodSet.create;
	exports.set = setType;
	const functionType = ZodFunction.create;
	exports.function = functionType;
	const lazyType = ZodLazy.create;
	exports.lazy = lazyType;
	const literalType = ZodLiteral.create;
	exports.literal = literalType;
	const enumType = ZodEnum.create;
	exports.enum = enumType;
	const nativeEnumType = ZodNativeEnum.create;
	exports.nativeEnum = nativeEnumType;
	const promiseType = ZodPromise.create;
	exports.promise = promiseType;
	const effectsType = ZodEffects.create;
	exports.effect = effectsType;
	exports.transformer = effectsType;
	const optionalType = ZodOptional.create;
	exports.optional = optionalType;
	const nullableType = ZodNullable.create;
	exports.nullable = nullableType;
	const preprocessType = ZodEffects.createWithPreprocess;
	exports.preprocess = preprocessType;
	const ostring = () => stringType().optional();
	exports.ostring = ostring;
	const onumber = () => numberType().optional();
	exports.onumber = onumber;
	const oboolean = () => booleanType().optional();
	exports.oboolean = oboolean;
	exports.NEVER = parseUtil_1.INVALID;
} (types));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodParsedType = exports.getParsedType = void 0;
	__exportStar(errors, exports);
	__exportStar(parseUtil, exports);
	__exportStar(typeAliases, exports);
	var util_1 = util;
	Object.defineProperty(exports, "getParsedType", { enumerable: true, get: function () { return util_1.getParsedType; } });
	Object.defineProperty(exports, "ZodParsedType", { enumerable: true, get: function () { return util_1.ZodParsedType; } });
	__exportStar(types, exports);
	__exportStar(ZodError$1, exports);
} (external));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.z = void 0;
	const mod = __importStar(external);
	exports.z = mod;
	__exportStar(external, exports);
	exports.default = mod;
} (lib));

(function (exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Session = exports.CDP = exports.Log = exports.BrowsingContext = exports.Script = exports.CommonDataTypes = void 0;
	const event_1 = event;
	const zod_1 = lib;
	const error_1 = error;
	const log_1 = log;
	const logParser = (0, log_1.log)(log_1.LogType.commandParser);
	const MAX_INT = 9007199254740991;
	function parseObject(obj, schema) {
	    const parseResult = schema.safeParse(obj);
	    if (parseResult.success) {
	        return parseResult.data;
	    }
	    logParser(`Command ${JSON.stringify(obj)} parse failed: ${JSON.stringify(parseResult)}.`);
	    const errorMessage = parseResult.error.errors
	        .map((e) => `${e.message} in ` +
	        `${e.path.map((p) => JSON.stringify(p)).join('/')}.`)
	        .join(' ');
	    throw new error_1.InvalidArgumentException(errorMessage);
	}
	var CommonDataTypes;
	(function (CommonDataTypes) {
	    CommonDataTypes.RemoteReferenceSchema = zod_1.z.object({
	        handle: zod_1.z.string().min(1),
	    });
	    // UndefinedValue = {
	    //   type: "undefined",
	    // }
	    const UndefinedValueSchema = zod_1.z.object({ type: zod_1.z.literal('undefined') });
	    //
	    // NullValue = {
	    //   type: "null",
	    // }
	    const NullValueSchema = zod_1.z.object({ type: zod_1.z.literal('null') });
	    // StringValue = {
	    //   type: "string",
	    //   value: text,
	    // }
	    const StringValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('string'),
	        value: zod_1.z.string(),
	    });
	    // SpecialNumber = "NaN" / "-0" / "+Infinity" / "-Infinity";
	    const SpecialNumberSchema = zod_1.z.enum([
	        'NaN',
	        '-0',
	        'Infinity',
	        '+Infinity',
	        '-Infinity',
	    ]);
	    //
	    // NumberValue = {
	    //   type: "number",
	    //   value: number / SpecialNumber,
	    // }
	    const NumberValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('number'),
	        value: zod_1.z.union([SpecialNumberSchema, zod_1.z.number()]),
	    });
	    // BooleanValue = {
	    //   type: "boolean",
	    //   value: bool,
	    // }
	    const BooleanValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('boolean'),
	        value: zod_1.z.boolean(),
	    });
	    // BigIntValue = {
	    //   type: "bigint",
	    //   value: text,
	    // }
	    const BigIntValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('bigint'),
	        value: zod_1.z.string(),
	    });
	    const PrimitiveProtocolValueSchema = zod_1.z.union([
	        UndefinedValueSchema,
	        NullValueSchema,
	        StringValueSchema,
	        NumberValueSchema,
	        BooleanValueSchema,
	        BigIntValueSchema,
	    ]);
	    CommonDataTypes.LocalValueSchema = zod_1.z.lazy(() => zod_1.z.union([
	        PrimitiveProtocolValueSchema,
	        ArrayLocalValueSchema,
	        DateLocalValueSchema,
	        MapLocalValueSchema,
	        ObjectLocalValueSchema,
	        RegExpLocalValueSchema,
	        SetLocalValueSchema,
	    ]));
	    // Order is important, as `parse` is processed in the same order.
	    // `RemoteReferenceSchema` has higher priority.
	    const LocalOrRemoteValueSchema = zod_1.z.union([
	        CommonDataTypes.RemoteReferenceSchema,
	        CommonDataTypes.LocalValueSchema,
	    ]);
	    // ListLocalValue = [*LocalValue];
	    const ListLocalValueSchema = zod_1.z.array(LocalOrRemoteValueSchema);
	    // ArrayLocalValue = {
	    //   type: "array",
	    //   value: ListLocalValue,
	    // }
	    const ArrayLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
	        type: zod_1.z.literal('array'),
	        value: ListLocalValueSchema,
	    }));
	    // DateLocalValue = {
	    //   type: "date",
	    //   value: text
	    // }
	    const DateLocalValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('date'),
	        value: zod_1.z.string().min(1),
	    });
	    // MappingLocalValue = [*[(LocalValue / text), LocalValue]];
	    const MappingLocalValueSchema = zod_1.z.lazy(() => zod_1.z.tuple([
	        zod_1.z.union([zod_1.z.string(), LocalOrRemoteValueSchema]),
	        LocalOrRemoteValueSchema,
	    ]));
	    // MapLocalValue = {
	    //   type: "map",
	    //   value: MappingLocalValue,
	    // }
	    const MapLocalValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('map'),
	        value: zod_1.z.array(MappingLocalValueSchema),
	    });
	    // ObjectLocalValue = {
	    //   type: "object",
	    //   value: MappingLocalValue,
	    // }
	    const ObjectLocalValueSchema = zod_1.z.object({
	        type: zod_1.z.literal('object'),
	        value: zod_1.z.array(MappingLocalValueSchema),
	    });
	    // RegExpLocalValue = {
	    //   type: "regexp",
	    //   value: RegExpValue,
	    // }
	    const RegExpLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
	        type: zod_1.z.literal('regexp'),
	        value: zod_1.z.object({
	            pattern: zod_1.z.string(),
	            flags: zod_1.z.string().optional(),
	        }),
	    }));
	    // SetLocalValue = {
	    //   type: "set",
	    //   value: ListLocalValue,
	    // }
	    const SetLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
	        type: zod_1.z.literal('set'),
	        value: ListLocalValueSchema,
	    }));
	    // BrowsingContext = text;
	    CommonDataTypes.BrowsingContextSchema = zod_1.z.string();
	})(CommonDataTypes = exports.CommonDataTypes || (exports.CommonDataTypes = {}));
	(function (Script) {
	    const RealmTypeSchema = zod_1.z.enum([
	        'window',
	        'dedicated-worker',
	        'shared-worker',
	        'service-worker',
	        'worker',
	        'paint-worklet',
	        'audio-worklet',
	        'worklet',
	    ]);
	    const GetRealmsParametersSchema = zod_1.z.object({
	        context: CommonDataTypes.BrowsingContextSchema.optional(),
	        type: RealmTypeSchema.optional(),
	    });
	    function parseGetRealmsParams(params) {
	        return parseObject(params, GetRealmsParametersSchema);
	    }
	    Script.parseGetRealmsParams = parseGetRealmsParams;
	    // ContextTarget = {
	    //   context: BrowsingContext,
	    //   ?sandbox: text
	    // }
	    const ContextTargetSchema = zod_1.z.object({
	        context: CommonDataTypes.BrowsingContextSchema,
	        sandbox: zod_1.z.string().optional(),
	    });
	    // RealmTarget = {realm: Realm};
	    const RealmTargetSchema = zod_1.z.object({
	        realm: zod_1.z.string().min(1),
	    });
	    //
	    // Target = (
	    //   RealmTarget //
	    //   ContextTarget
	    // );
	    // Order is important, as `parse` is processed in the same order.
	    // `RealmTargetSchema` has higher priority.
	    const TargetSchema = zod_1.z.union([RealmTargetSchema, ContextTargetSchema]);
	    const OwnershipModelSchema = zod_1.z.enum(['root', 'none']);
	    // ScriptEvaluateParameters = {
	    //   expression: text;
	    //   target: Target;
	    //   ?awaitPromise: bool;
	    //   ?resultOwnership: OwnershipModel;
	    // }
	    const EvaluateParametersSchema = zod_1.z.object({
	        expression: zod_1.z.string(),
	        awaitPromise: zod_1.z.boolean(),
	        target: TargetSchema,
	        resultOwnership: OwnershipModelSchema.optional(),
	    });
	    function parseEvaluateParams(params) {
	        return parseObject(params, EvaluateParametersSchema);
	    }
	    Script.parseEvaluateParams = parseEvaluateParams;
	    const DisownParametersSchema = zod_1.z.object({
	        target: TargetSchema,
	        handles: zod_1.z.array(zod_1.z.string()),
	    });
	    function parseDisownParams(params) {
	        return parseObject(params, DisownParametersSchema);
	    }
	    Script.parseDisownParams = parseDisownParams;
	    const ArgumentValueSchema = zod_1.z.union([
	        CommonDataTypes.RemoteReferenceSchema,
	        CommonDataTypes.LocalValueSchema,
	    ]);
	    const ScriptCallFunctionParametersSchema = zod_1.z.object({
	        functionDeclaration: zod_1.z.string(),
	        target: TargetSchema,
	        arguments: zod_1.z.array(ArgumentValueSchema).optional(),
	        this: ArgumentValueSchema.optional(),
	        awaitPromise: zod_1.z.boolean(),
	        resultOwnership: OwnershipModelSchema.optional(),
	    });
	    function parseCallFunctionParams(params) {
	        return parseObject(params, ScriptCallFunctionParametersSchema);
	    }
	    Script.parseCallFunctionParams = parseCallFunctionParams;
	})(exports.Script || (exports.Script = {}));
	// https://w3c.github.io/webdriver-bidi/#module-browsingContext
	var BrowsingContext;
	(function (BrowsingContext) {
	    const GetTreeParametersSchema = zod_1.z.object({
	        maxDepth: zod_1.z.number().int().nonnegative().max(MAX_INT).optional(),
	        root: CommonDataTypes.BrowsingContextSchema.optional(),
	    });
	    function parseGetTreeParams(params) {
	        return parseObject(params, GetTreeParametersSchema);
	    }
	    BrowsingContext.parseGetTreeParams = parseGetTreeParams;
	    const ReadinessStateSchema = zod_1.z.enum(['none', 'interactive', 'complete']);
	    // BrowsingContextNavigateParameters = {
	    //   context: BrowsingContext,
	    //   url: text,
	    //   ?wait: ReadinessState,
	    // }
	    // ReadinessState = "none" / "interactive" / "complete"
	    const NavigateParametersSchema = zod_1.z.object({
	        context: CommonDataTypes.BrowsingContextSchema,
	        url: zod_1.z.string().url(),
	        wait: ReadinessStateSchema.optional(),
	    });
	    function parseNavigateParams(params) {
	        return parseObject(params, NavigateParametersSchema);
	    }
	    BrowsingContext.parseNavigateParams = parseNavigateParams;
	    // BrowsingContextCreateType = "tab" / "window"
	    //
	    // BrowsingContextCreateParameters = {
	    //   type: BrowsingContextCreateType
	    // }
	    const CreateParametersSchema = zod_1.z.object({
	        type: zod_1.z.enum(['tab', 'window']),
	        referenceContext: CommonDataTypes.BrowsingContextSchema.optional(),
	    });
	    function parseCreateParams(params) {
	        return parseObject(params, CreateParametersSchema);
	    }
	    BrowsingContext.parseCreateParams = parseCreateParams;
	    // BrowsingContextCloseParameters = {
	    //   context: BrowsingContext
	    // }
	    const CloseParametersSchema = zod_1.z.object({
	        context: CommonDataTypes.BrowsingContextSchema,
	    });
	    function parseCloseParams(params) {
	        return parseObject(params, CloseParametersSchema);
	    }
	    BrowsingContext.parseCloseParams = parseCloseParams;
	    // events
	    class LoadEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(LoadEvent.method, params);
	        }
	    }
	    LoadEvent.method = 'browsingContext.load';
	    BrowsingContext.LoadEvent = LoadEvent;
	    class DomContentLoadedEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(DomContentLoadedEvent.method, params);
	        }
	    }
	    DomContentLoadedEvent.method = 'browsingContext.domContentLoaded';
	    BrowsingContext.DomContentLoadedEvent = DomContentLoadedEvent;
	    class ContextCreatedEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(ContextCreatedEvent.method, params);
	        }
	    }
	    ContextCreatedEvent.method = 'browsingContext.contextCreated';
	    BrowsingContext.ContextCreatedEvent = ContextCreatedEvent;
	    class ContextDestroyedEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(ContextDestroyedEvent.method, params);
	        }
	    }
	    ContextDestroyedEvent.method = 'browsingContext.contextDestroyed';
	    BrowsingContext.ContextDestroyedEvent = ContextDestroyedEvent;
	    (function (PROTO) {
	        const FindElementParametersSchema = zod_1.z.object({
	            context: CommonDataTypes.BrowsingContextSchema,
	            selector: zod_1.z.string(),
	        });
	        function parseFindElementParams(params) {
	            return parseObject(params, FindElementParametersSchema);
	        }
	        PROTO.parseFindElementParams = parseFindElementParams;
	    })(BrowsingContext.PROTO || (BrowsingContext.PROTO = {}));
	    BrowsingContext.EventNames = [
	        LoadEvent.method,
	        DomContentLoadedEvent.method,
	        ContextCreatedEvent.method,
	        ContextDestroyedEvent.method,
	    ];
	})(BrowsingContext = exports.BrowsingContext || (exports.BrowsingContext = {}));
	// https://w3c.github.io/webdriver-bidi/#module-log
	var Log;
	(function (Log) {
	    class LogEntryAddedEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(LogEntryAddedEvent.method, params);
	        }
	    }
	    LogEntryAddedEvent.method = 'log.entryAdded';
	    Log.LogEntryAddedEvent = LogEntryAddedEvent;
	    Log.EventNames = [LogEntryAddedEvent.method];
	})(Log = exports.Log || (exports.Log = {}));
	var CDP;
	(function (CDP) {
	    const SendCommandParamsSchema = zod_1.z.object({
	        cdpMethod: zod_1.z.string(),
	        // `passthrough` allows object to have any fields.
	        // https://github.com/colinhacks/zod#passthrough
	        cdpParams: zod_1.z.object({}).passthrough(),
	        cdpSession: zod_1.z.string().optional(),
	    });
	    function parseSendCommandParams(params) {
	        return parseObject(params, SendCommandParamsSchema);
	    }
	    CDP.parseSendCommandParams = parseSendCommandParams;
	    const GetSessionParamsSchema = zod_1.z.object({
	        context: CommonDataTypes.BrowsingContextSchema,
	    });
	    function parseGetSessionParams(params) {
	        return parseObject(params, GetSessionParamsSchema);
	    }
	    CDP.parseGetSessionParams = parseGetSessionParams;
	    class EventReceivedEvent extends event_1.EventResponseClass {
	        constructor(params) {
	            super(EventReceivedEvent.method, params);
	        }
	    }
	    EventReceivedEvent.method = 'cdp.eventReceived';
	    CDP.EventReceivedEvent = EventReceivedEvent;
	    CDP.EventNames = [EventReceivedEvent.method];
	})(CDP = exports.CDP || (exports.CDP = {}));
	(function (Session) {
	    const EventNameSchema = zod_1.z.enum([
	        ...BrowsingContext.EventNames,
	        ...Log.EventNames,
	        ...CDP.EventNames,
	    ]);
	    // SessionSubscribeParameters = {
	    //   events: [*text],
	    //   ?contexts: [*BrowsingContext],
	    // }
	    const SubscribeParametersSchema = zod_1.z.object({
	        events: zod_1.z.array(EventNameSchema),
	        contexts: zod_1.z.array(CommonDataTypes.BrowsingContextSchema).optional(),
	    });
	    function parseSubscribeParams(params) {
	        return parseObject(params, SubscribeParametersSchema);
	    }
	    Session.parseSubscribeParams = parseSubscribeParams;
	})(exports.Session || (exports.Session = {}));
	
} (bidiProtocolTypes));

var deferred = {};

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
var __classPrivateFieldGet$e = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$b = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Deferred_resolve, _Deferred_reject, _Deferred_promise, _Deferred_isFinished, _a$7;
Object.defineProperty(deferred, "__esModule", { value: true });
deferred.Deferred = void 0;
class Deferred {
    get isFinished() {
        return __classPrivateFieldGet$e(this, _Deferred_isFinished, "f");
    }
    constructor() {
        _Deferred_resolve.set(this, () => { });
        _Deferred_reject.set(this, () => { });
        _Deferred_promise.set(this, void 0);
        _Deferred_isFinished.set(this, false);
        this[_a$7] = 'Promise';
        __classPrivateFieldSet$b(this, _Deferred_promise, new Promise((resolve, reject) => {
            __classPrivateFieldSet$b(this, _Deferred_resolve, resolve, "f");
            __classPrivateFieldSet$b(this, _Deferred_reject, reject, "f");
        }), "f");
    }
    then(onFulfilled, onRejected) {
        return __classPrivateFieldGet$e(this, _Deferred_promise, "f").then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return __classPrivateFieldGet$e(this, _Deferred_promise, "f").catch(onRejected);
    }
    resolve(value) {
        __classPrivateFieldSet$b(this, _Deferred_isFinished, true, "f");
        __classPrivateFieldGet$e(this, _Deferred_resolve, "f").call(this, value);
    }
    reject(reason) {
        __classPrivateFieldSet$b(this, _Deferred_isFinished, true, "f");
        __classPrivateFieldGet$e(this, _Deferred_reject, "f").call(this, reason);
    }
    finally(onFinally) {
        return __classPrivateFieldGet$e(this, _Deferred_promise, "f").finally(onFinally);
    }
}
deferred.Deferred = Deferred;
_Deferred_resolve = new WeakMap(), _Deferred_reject = new WeakMap(), _Deferred_promise = new WeakMap(), _Deferred_isFinished = new WeakMap(), _a$7 = Symbol.toStringTag;

var logManager = {};

var logHelper = {};

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
Object.defineProperty(logHelper, "__esModule", { value: true });
logHelper.getRemoteValuesText = logHelper.logMessageFormatter = void 0;
const specifiers = ['%s', '%d', '%i', '%f', '%o', '%O', '%c'];
function isFormmatSpecifier(str) {
    return specifiers.some((spec) => str.includes(spec));
}
/**
 * @param args input remote values to be format printed
 * @returns parsed text of the remote values in specific format
 */
function logMessageFormatter(args) {
    let output = '';
    const argFormat = args[0].value.toString();
    const argValues = args.slice(1, undefined);
    const tokens = argFormat.split(new RegExp(specifiers.map((spec) => '(' + spec + ')').join('|'), 'g'));
    for (const token of tokens) {
        if (token === undefined || token == '') {
            continue;
        }
        if (isFormmatSpecifier(token)) {
            const arg = argValues.shift();
            // raise an exception when less value is provided
            if (arg === undefined) {
                throw new Error('Less value is provided: "' + getRemoteValuesText(args, false) + '"');
            }
            if (token === '%s') {
                output += stringFromArg(arg);
            }
            else if (token === '%d' || token === '%i') {
                if (['bigint', 'number', 'string'].includes(arg.type)) {
                    output += parseInt(arg.value.toString(), 10);
                }
                else {
                    output += 'NaN';
                }
            }
            else if (token === '%f') {
                if (['bigint', 'number', 'string'].includes(arg.type)) {
                    output += parseFloat(arg.value.toString());
                }
                else {
                    output += 'NaN';
                }
            }
            else {
                // %o, %O, %c
                output += toJson(arg);
            }
        }
        else {
            output += token;
        }
    }
    // raise an exception when more value is provided
    if (argValues.length > 0) {
        throw new Error('More value is provided: "' + getRemoteValuesText(args, false) + '"');
    }
    return output;
}
logHelper.logMessageFormatter = logMessageFormatter;
/**
 * @param arg input remote value to be parsed
 * @returns parsed text of the remote value
 *
 * input: {"type": "number", "value": 1}
 * output: 1
 *
 * input: {"type": "string", "value": "abc"}
 * output: "abc"
 *
 * input: {"type": "object",  "value": [["id", {"type": "number", "value": 1}]]}
 * output: '{"id": 1}'
 *
 * input: {"type": "object", "value": [["font-size", {"type": "string", "value": "20px"}]]}
 * output: '{"font-size": "20px"}'
 */
function toJson(arg) {
    // arg type validation
    if (!['array', 'bigint', 'date', 'number', 'object', 'string'].includes(arg.type)) {
        return stringFromArg(arg);
    }
    if (arg.type === 'bigint') {
        return arg.value.toString() + 'n';
    }
    if (arg.type === 'number') {
        return arg.value.toString();
    }
    if (['date', 'string'].includes(arg.type)) {
        return JSON.stringify(arg.value);
    }
    if (arg.type === 'object') {
        return ('{' +
            arg.value
                .map((pair) => {
                return `${JSON.stringify(pair[0])}:${toJson(pair[1])}`;
            })
                .join(',') +
            '}');
    }
    if (arg.type === 'array') {
        return '[' + arg.value.map((val) => toJson(val)).join(',') + ']';
    }
    throw Error('Invalid value type: ' + arg.toString());
}
function stringFromArg(arg) {
    if (!arg.hasOwnProperty('value')) {
        return arg.type;
    }
    switch (arg.type) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'bigint':
            return arg.value;
        case 'regexp':
            return `/${arg.value.pattern}/${arg.value.flags}`;
        case 'date':
            return new Date(arg.value).toString();
        case 'object':
            return `Object(${arg.value.length})`;
        case 'array':
            return `Array(${arg.value.length})`;
        case 'map':
            return `Map(${arg.value.length})`;
        case 'set':
            return `Set(${arg.value.length})`;
        case 'node':
            return 'node';
        default:
            return arg.type;
    }
}
function getRemoteValuesText(args, formatText) {
    if (args.length == 0) {
        return '';
    }
    // if args[0] is a format specifier, format the args as output
    if (args[0].type === 'string' &&
        isFormmatSpecifier(args[0].value.toString()) &&
        formatText) {
        return logMessageFormatter(args);
    }
    // if args[0] is not a format specifier, just join the args with \u0020
    return args
        .map((arg) => {
        return stringFromArg(arg);
    })
        .join('\u0020');
}
logHelper.getRemoteValuesText = getRemoteValuesText;

var realm = {};

var scriptEvaluator = {};

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
var __awaiter$9 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet$d = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a$6, _ScriptEvaluator_evaluateStacktraceLineOffset, _ScriptEvaluator_callFunctionStacktraceLineOffset, _ScriptEvaluator_knownHandlesToRealm, _ScriptEvaluator_serializeCdpExceptionDetails, _ScriptEvaluator_cdpToBidiValue, _ScriptEvaluator_deserializeToCdpArg, _ScriptEvaluator_flattenKeyValuePairs, _ScriptEvaluator_flattenValueList;
Object.defineProperty(scriptEvaluator, "__esModule", { value: true });
scriptEvaluator.ScriptEvaluator = void 0;
const error_1$4 = error;
class ScriptEvaluator {
    /**
     * Serializes a given CDP object into BiDi, keeping references in the
     * target's `globalThis`.
     * @param cdpObject CDP remote object to be serialized.
     * @param resultOwnership indicates desired OwnershipModel.
     * @param realm
     */
    static serializeCdpObject(cdpObject, resultOwnership, realm) {
        return __awaiter$9(this, void 0, void 0, function* () {
            const cdpWebDriverValue = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: String((obj) => obj),
                awaitPromise: false,
                arguments: [cdpObject],
                generateWebDriverValue: true,
                executionContextId: realm.executionContextId,
            });
            return yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_cdpToBidiValue).call(this, cdpWebDriverValue, realm, resultOwnership);
        });
    }
    /**
     * Gets the string representation of an object. This is equivalent to
     * calling toString() on the object value.
     * @param cdpObject CDP remote object representing an object.
     * @param realm
     * @returns string The stringified object.
     */
    static stringifyObject(cdpObject, realm) {
        return __awaiter$9(this, void 0, void 0, function* () {
            let stringifyResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: String(function (obj) {
                    return String(obj);
                }),
                awaitPromise: false,
                arguments: [cdpObject],
                returnByValue: true,
                executionContextId: realm.executionContextId,
            });
            return stringifyResult.result.value;
        });
    }
    static callFunction(realm, functionDeclaration, _this, _arguments, awaitPromise, resultOwnership) {
        return __awaiter$9(this, void 0, void 0, function* () {
            const callFunctionAndSerializeScript = `(...args)=>{ return _callFunction((\n${functionDeclaration}\n), args);
      function _callFunction(f, args) {
        const deserializedThis = args.shift();
        const deserializedArgs = args;
        return f.apply(deserializedThis, deserializedArgs);
      }}`;
            const thisAndArgumentsList = [
                yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_deserializeToCdpArg).call(this, _this, realm),
            ];
            thisAndArgumentsList.push(...(yield Promise.all(_arguments.map((a) => __awaiter$9(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_deserializeToCdpArg).call(this, a, realm);
            })))));
            let cdpCallFunctionResult;
            try {
                cdpCallFunctionResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: callFunctionAndSerializeScript,
                    awaitPromise,
                    arguments: thisAndArgumentsList,
                    generateWebDriverValue: true,
                    executionContextId: realm.executionContextId,
                });
            }
            catch (e) {
                // Heuristic to determine if the problem is in the argument.
                // The check can be done on the `deserialization` step, but this approach
                // helps to save round-trips.
                if (e.code === -32000 &&
                    [
                        'Could not find object with given id',
                        'Argument should belong to the same JavaScript world as target object',
                    ].includes(e.message)) {
                    throw new error_1$4.InvalidArgumentException('Handle was not found.');
                }
                throw e;
            }
            if (cdpCallFunctionResult.exceptionDetails) {
                // Serialize exception details.
                return {
                    exceptionDetails: yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_serializeCdpExceptionDetails).call(this, cdpCallFunctionResult.exceptionDetails, __classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_callFunctionStacktraceLineOffset), resultOwnership, realm),
                    realm: realm.realmId,
                };
            }
            return {
                result: yield __classPrivateFieldGet$d(ScriptEvaluator, _a$6, "m", _ScriptEvaluator_cdpToBidiValue).call(ScriptEvaluator, cdpCallFunctionResult, realm, resultOwnership),
                realm: realm.realmId,
            };
        });
    }
    static realmDestroyed(realm) {
        return Array.from(__classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_knownHandlesToRealm).entries())
            .filter(([, r]) => r === realm.realmId)
            .map(([h]) => __classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_knownHandlesToRealm).delete(h));
    }
    static disown(realm, handle) {
        return __awaiter$9(this, void 0, void 0, function* () {
            // Disowning an object from different realm does nothing.
            if (__classPrivateFieldGet$d(ScriptEvaluator, _a$6, "f", _ScriptEvaluator_knownHandlesToRealm).get(handle) !== realm.realmId) {
                return;
            }
            try {
                yield realm.cdpClient.sendCommand('Runtime.releaseObject', {
                    objectId: handle,
                });
            }
            catch (e) {
                // Heuristic to determine if the problem is in the unknown handler.
                // Ignore the error if so.
                if (!(e.code === -32000 && e.message === 'Invalid remote object id')) {
                    throw e;
                }
            }
            __classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_knownHandlesToRealm).delete(handle);
        });
    }
    static scriptEvaluate(realm, expression, awaitPromise, resultOwnership) {
        return __awaiter$9(this, void 0, void 0, function* () {
            let cdpEvaluateResult = yield realm.cdpClient.sendCommand('Runtime.evaluate', {
                contextId: realm.executionContextId,
                expression,
                awaitPromise,
                generateWebDriverValue: true,
            });
            if (cdpEvaluateResult.exceptionDetails) {
                // Serialize exception details.
                return {
                    exceptionDetails: yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_serializeCdpExceptionDetails).call(this, cdpEvaluateResult.exceptionDetails, __classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_evaluateStacktraceLineOffset), resultOwnership, realm),
                    realm: realm.realmId,
                };
            }
            return {
                result: yield __classPrivateFieldGet$d(ScriptEvaluator, _a$6, "m", _ScriptEvaluator_cdpToBidiValue).call(ScriptEvaluator, cdpEvaluateResult, realm, resultOwnership),
                realm: realm.realmId,
            };
        });
    }
}
scriptEvaluator.ScriptEvaluator = ScriptEvaluator;
_a$6 = ScriptEvaluator, _ScriptEvaluator_serializeCdpExceptionDetails = function _ScriptEvaluator_serializeCdpExceptionDetails(cdpExceptionDetails, lineOffset, resultOwnership, realm) {
    var _b;
    return __awaiter$9(this, void 0, void 0, function* () {
        const callFrames = (_b = cdpExceptionDetails.stackTrace) === null || _b === void 0 ? void 0 : _b.callFrames.map((frame) => ({
            url: frame.url,
            functionName: frame.functionName,
            // As `script.evaluate` wraps call into serialization script, so
            // `lineNumber` should be adjusted.
            lineNumber: frame.lineNumber - lineOffset,
            columnNumber: frame.columnNumber,
        }));
        const exception = yield this.serializeCdpObject(
        // Exception should always be there.
        cdpExceptionDetails.exception, resultOwnership, realm);
        const text = yield this.stringifyObject(cdpExceptionDetails.exception, realm);
        return {
            exception,
            columnNumber: cdpExceptionDetails.columnNumber,
            // As `script.evaluate` wraps call into serialization script, so
            // `lineNumber` should be adjusted.
            lineNumber: cdpExceptionDetails.lineNumber - lineOffset,
            stackTrace: {
                callFrames: callFrames || [],
            },
            text: text || cdpExceptionDetails.text,
        };
    });
}, _ScriptEvaluator_cdpToBidiValue = function _ScriptEvaluator_cdpToBidiValue(cdpValue, realm, resultOwnership) {
    return __awaiter$9(this, void 0, void 0, function* () {
        // This relies on the CDP to implement proper BiDi serialization, except
        // objectIds+handles.
        const cdpWebDriverValue = cdpValue.result.webDriverValue;
        if (!cdpValue.result.objectId) {
            return cdpWebDriverValue;
        }
        const objectId = cdpValue.result.objectId;
        const bidiValue = cdpWebDriverValue;
        if (resultOwnership === 'root') {
            bidiValue.handle = objectId;
            // Remember all the handles sent to client.
            __classPrivateFieldGet$d(this, _a$6, "f", _ScriptEvaluator_knownHandlesToRealm).set(objectId, realm.realmId);
        }
        else {
            yield realm.cdpClient.sendCommand('Runtime.releaseObject', { objectId });
        }
        return bidiValue;
    });
}, _ScriptEvaluator_deserializeToCdpArg = function _ScriptEvaluator_deserializeToCdpArg(argumentValue, realm) {
    return __awaiter$9(this, void 0, void 0, function* () {
        if ('handle' in argumentValue) {
            return { objectId: argumentValue.handle };
        }
        switch (argumentValue.type) {
            // Primitive Protocol Value
            // https://w3c.github.io/webdriver-bidi/#data-types-protocolValue-primitiveProtocolValue
            case 'undefined': {
                return { unserializableValue: 'undefined' };
            }
            case 'null': {
                return { unserializableValue: 'null' };
            }
            case 'string': {
                return { value: argumentValue.value };
            }
            case 'number': {
                if (argumentValue.value === 'NaN') {
                    return { unserializableValue: 'NaN' };
                }
                else if (argumentValue.value === '-0') {
                    return { unserializableValue: '-0' };
                }
                else if (argumentValue.value === '+Infinity') {
                    return { unserializableValue: '+Infinity' };
                }
                else if (argumentValue.value === 'Infinity') {
                    return { unserializableValue: 'Infinity' };
                }
                else if (argumentValue.value === '-Infinity') {
                    return { unserializableValue: '-Infinity' };
                }
                else {
                    return {
                        value: argumentValue.value,
                    };
                }
            }
            case 'boolean': {
                return { value: !!argumentValue.value };
            }
            case 'bigint': {
                return {
                    unserializableValue: `BigInt(${JSON.stringify(argumentValue.value)})`,
                };
            }
            // Local Value
            // https://w3c.github.io/webdriver-bidi/#data-types-protocolValue-LocalValue
            case 'date': {
                return {
                    unserializableValue: `new Date(Date.parse(${JSON.stringify(argumentValue.value)}))`,
                };
            }
            case 'regexp': {
                return {
                    unserializableValue: `new RegExp(${JSON.stringify(argumentValue.value.pattern)}, ${JSON.stringify(argumentValue.value.flags)})`,
                };
            }
            case 'map': {
                // TODO(sadym): if non of the nested keys and values has remote
                //  reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_flattenKeyValuePairs).call(this, argumentValue.value, realm);
                let argEvalResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(function (...args) {
                        const result = new Map();
                        for (let i = 0; i < args.length; i += 2) {
                            result.set(args[i], args[i + 1]);
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(sadym): dispose nested objects.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'object': {
                // TODO(sadym): if non of the nested keys and values has remote
                //  reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_flattenKeyValuePairs).call(this, argumentValue.value, realm);
                let argEvalResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(function (...args) {
                        const result = {};
                        for (let i = 0; i < args.length; i += 2) {
                            // Key should be either `string`, `number`, or `symbol`.
                            const key = args[i];
                            result[key] = args[i + 1];
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(sadym): dispose nested objects.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'array': {
                // TODO(sadym): if non of the nested items has remote reference,
                //  serialize to `unserializableValue` without CDP roundtrip.
                const args = yield __classPrivateFieldGet$d(ScriptEvaluator, _a$6, "m", _ScriptEvaluator_flattenValueList).call(ScriptEvaluator, argumentValue.value, realm);
                let argEvalResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(function (...args) {
                        return args;
                    }),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(sadym): dispose nested objects.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'set': {
                // TODO(sadym): if non of the nested items has remote reference,
                //  serialize to `unserializableValue` without CDP roundtrip.
                const args = yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_flattenValueList).call(this, argumentValue.value, realm);
                let argEvalResult = yield realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(function (...args) {
                        return new Set(args);
                    }),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                return { objectId: argEvalResult.result.objectId };
            }
            // TODO(sadym): dispose nested objects.
            default:
                throw new Error(`Value ${JSON.stringify(argumentValue)} is not deserializable.`);
        }
    });
}, _ScriptEvaluator_flattenKeyValuePairs = function _ScriptEvaluator_flattenKeyValuePairs(value, realm) {
    return __awaiter$9(this, void 0, void 0, function* () {
        const keyValueArray = [];
        for (let pair of value) {
            const key = pair[0];
            const value = pair[1];
            let keyArg, valueArg;
            if (typeof key === 'string') {
                // Key is a string.
                keyArg = { value: key };
            }
            else {
                // Key is a serialized value.
                keyArg = yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_deserializeToCdpArg).call(this, key, realm);
            }
            valueArg = yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_deserializeToCdpArg).call(this, value, realm);
            keyValueArray.push(keyArg);
            keyValueArray.push(valueArg);
        }
        return keyValueArray;
    });
}, _ScriptEvaluator_flattenValueList = function _ScriptEvaluator_flattenValueList(list, realm) {
    return __awaiter$9(this, void 0, void 0, function* () {
        const result = [];
        for (let value of list) {
            result.push(yield __classPrivateFieldGet$d(this, _a$6, "m", _ScriptEvaluator_deserializeToCdpArg).call(this, value, realm));
        }
        return result;
    });
};
// As `script.evaluate` wraps call into serialization script, `lineNumber`
// should be adjusted.
_ScriptEvaluator_evaluateStacktraceLineOffset = { value: 0 };
_ScriptEvaluator_callFunctionStacktraceLineOffset = { value: 1 };
// Keeps track of `handle`s and their realms sent to client.
_ScriptEvaluator_knownHandlesToRealm = { value: new Map() };

var browsingContextStorage = {};

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
var __classPrivateFieldGet$c = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a$5, _BrowsingContextStorage_contexts;
Object.defineProperty(browsingContextStorage, "__esModule", { value: true });
browsingContextStorage.BrowsingContextStorage = void 0;
const error_1$3 = error;
class BrowsingContextStorage {
    static getTopLevelContexts() {
        return Array.from(__classPrivateFieldGet$c(BrowsingContextStorage, _a$5, "f", _BrowsingContextStorage_contexts).values()).filter((c) => c.parentId === null);
    }
    static removeContext(contextId) {
        __classPrivateFieldGet$c(BrowsingContextStorage, _a$5, "f", _BrowsingContextStorage_contexts).delete(contextId);
    }
    static addContext(context) {
        __classPrivateFieldGet$c(BrowsingContextStorage, _a$5, "f", _BrowsingContextStorage_contexts).set(context.contextId, context);
        if (context.parentId !== null) {
            BrowsingContextStorage.getKnownContext(context.parentId).addChild(context);
        }
    }
    static hasKnownContext(contextId) {
        return __classPrivateFieldGet$c(BrowsingContextStorage, _a$5, "f", _BrowsingContextStorage_contexts).has(contextId);
    }
    static findContext(contextId) {
        return __classPrivateFieldGet$c(BrowsingContextStorage, _a$5, "f", _BrowsingContextStorage_contexts).get(contextId);
    }
    static getKnownContext(contextId) {
        const result = BrowsingContextStorage.findContext(contextId);
        if (result === undefined) {
            throw new error_1$3.NoSuchFrameException(`Context ${contextId} not found`);
        }
        return result;
    }
}
browsingContextStorage.BrowsingContextStorage = BrowsingContextStorage;
_a$5 = BrowsingContextStorage;
_BrowsingContextStorage_contexts = { value: new Map() };

(function (exports) {
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
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
	    if (kind === "m") throw new TypeError("Private method is not writable");
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	};
	var _a, _Realm_realmMap, _Realm_realmId, _Realm_browsingContextId, _Realm_executionContextId, _Realm_origin, _Realm_type, _Realm_sandbox, _Realm_cdpSessionId, _Realm_cdpClient;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Realm = exports.RealmType = void 0;
	const scriptEvaluator_1 = scriptEvaluator;
	const browsingContextStorage_1 = browsingContextStorage;
	const error_1 = error;
	(function (RealmType) {
	    RealmType["window"] = "window";
	})(exports.RealmType || (exports.RealmType = {}));
	class Realm {
	    static create(realmId, browsingContextId, executionContextId, origin, type, sandbox, cdpSessionId, cdpClient) {
	        const realm = new Realm(realmId, browsingContextId, executionContextId, origin, type, sandbox, cdpSessionId, cdpClient);
	        __classPrivateFieldGet(Realm, _a, "f", _Realm_realmMap).set(realm.realmId, realm);
	        return realm;
	    }
	    static findRealms(filter = {}) {
	        return Array.from(__classPrivateFieldGet(Realm, _a, "f", _Realm_realmMap).values()).filter((realm) => {
	            if (filter.realmId !== undefined && filter.realmId !== realm.realmId) {
	                return false;
	            }
	            if (filter.browsingContextId !== undefined &&
	                filter.browsingContextId !== realm.browsingContextId) {
	                return false;
	            }
	            if (filter.executionContextId !== undefined &&
	                filter.executionContextId !== realm.executionContextId) {
	                return false;
	            }
	            if (filter.type !== undefined && filter.type !== realm.type) {
	                return false;
	            }
	            if (filter.sandbox !== undefined && filter.sandbox !== __classPrivateFieldGet(realm, _Realm_sandbox, "f")) {
	                return false;
	            }
	            if (filter.cdpSessionId !== undefined &&
	                filter.cdpSessionId !== __classPrivateFieldGet(realm, _Realm_cdpSessionId, "f")) {
	                return false;
	            }
	            return true;
	        });
	    }
	    static findRealm(filter) {
	        const maybeRealms = Realm.findRealms(filter);
	        if (maybeRealms.length !== 1) {
	            return undefined;
	        }
	        return maybeRealms[0];
	    }
	    static getRealm(filter) {
	        const maybeRealm = Realm.findRealm(filter);
	        if (maybeRealm === undefined) {
	            throw new error_1.NoSuchFrameException(`Realm ${JSON.stringify(filter)} not found`);
	        }
	        return maybeRealm;
	    }
	    static clearBrowsingContext(browsingContextId) {
	        Realm.findRealms({ browsingContextId }).map((realm) => realm.delete());
	    }
	    delete() {
	        __classPrivateFieldGet(Realm, _a, "f", _Realm_realmMap).delete(this.realmId);
	        scriptEvaluator_1.ScriptEvaluator.realmDestroyed(this);
	    }
	    constructor(realmId, browsingContextId, executionContextId, origin, type, sandbox, cdpSessionId, cdpClient) {
	        _Realm_realmId.set(this, void 0);
	        _Realm_browsingContextId.set(this, void 0);
	        _Realm_executionContextId.set(this, void 0);
	        _Realm_origin.set(this, void 0);
	        _Realm_type.set(this, void 0);
	        _Realm_sandbox.set(this, void 0);
	        _Realm_cdpSessionId.set(this, void 0);
	        _Realm_cdpClient.set(this, void 0);
	        __classPrivateFieldSet(this, _Realm_realmId, realmId, "f");
	        __classPrivateFieldSet(this, _Realm_browsingContextId, browsingContextId, "f");
	        __classPrivateFieldSet(this, _Realm_executionContextId, executionContextId, "f");
	        __classPrivateFieldSet(this, _Realm_sandbox, sandbox, "f");
	        __classPrivateFieldSet(this, _Realm_origin, origin, "f");
	        __classPrivateFieldSet(this, _Realm_type, type, "f");
	        __classPrivateFieldSet(this, _Realm_cdpSessionId, cdpSessionId, "f");
	        __classPrivateFieldSet(this, _Realm_cdpClient, cdpClient, "f");
	    }
	    toBiDi() {
	        return Object.assign({ realm: this.realmId, origin: this.origin, type: this.type, context: this.browsingContextId }, (__classPrivateFieldGet(this, _Realm_sandbox, "f") !== undefined ? { sandbox: __classPrivateFieldGet(this, _Realm_sandbox, "f") } : {}));
	    }
	    get realmId() {
	        return __classPrivateFieldGet(this, _Realm_realmId, "f");
	    }
	    get browsingContextId() {
	        return __classPrivateFieldGet(this, _Realm_browsingContextId, "f");
	    }
	    get executionContextId() {
	        return __classPrivateFieldGet(this, _Realm_executionContextId, "f");
	    }
	    get origin() {
	        return __classPrivateFieldGet(this, _Realm_origin, "f");
	    }
	    get type() {
	        return __classPrivateFieldGet(this, _Realm_type, "f");
	    }
	    get cdpClient() {
	        return __classPrivateFieldGet(this, _Realm_cdpClient, "f");
	    }
	    callFunction(functionDeclaration, _this, _arguments, awaitPromise, resultOwnership) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const context = browsingContextStorage_1.BrowsingContextStorage.getKnownContext(this.browsingContextId);
	            yield context.awaitUnblocked();
	            return {
	                result: yield scriptEvaluator_1.ScriptEvaluator.callFunction(this, functionDeclaration, _this, _arguments, awaitPromise, resultOwnership),
	            };
	        });
	    }
	    scriptEvaluate(expression, awaitPromise, resultOwnership) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const context = browsingContextStorage_1.BrowsingContextStorage.getKnownContext(this.browsingContextId);
	            yield context.awaitUnblocked();
	            return {
	                result: yield scriptEvaluator_1.ScriptEvaluator.scriptEvaluate(this, expression, awaitPromise, resultOwnership),
	            };
	        });
	    }
	    disown(handle) {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield scriptEvaluator_1.ScriptEvaluator.disown(this, handle);
	        });
	    }
	    /**
	     * Serializes a given CDP object into BiDi, keeping references in the
	     * target's `globalThis`.
	     * @param cdpObject CDP remote object to be serialized.
	     * @param resultOwnership indicates desired OwnershipModel.
	     */
	    serializeCdpObject(cdpObject, resultOwnership) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield scriptEvaluator_1.ScriptEvaluator.serializeCdpObject(cdpObject, resultOwnership, this);
	        });
	    }
	    /**
	     * Gets the string representation of an object. This is equivalent to
	     * calling toString() on the object value.
	     * @param cdpObject CDP remote object representing an object.
	     * @param realm
	     * @returns string The stringified object.
	     */
	    stringifyObject(cdpObject) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return scriptEvaluator_1.ScriptEvaluator.stringifyObject(cdpObject, this);
	        });
	    }
	}
	exports.Realm = Realm;
	_a = Realm, _Realm_realmId = new WeakMap(), _Realm_browsingContextId = new WeakMap(), _Realm_executionContextId = new WeakMap(), _Realm_origin = new WeakMap(), _Realm_type = new WeakMap(), _Realm_sandbox = new WeakMap(), _Realm_cdpSessionId = new WeakMap(), _Realm_cdpClient = new WeakMap();
	_Realm_realmMap = { value: new Map() };
	
} (realm));

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
var __awaiter$8 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet$a = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$b = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LogManager_instances, _a$4, _LogManager_cdpClient, _LogManager_cdpSessionId, _LogManager_eventManager, _LogManager_initialize, _LogManager_initializeEventListeners, _LogManager_initializeLogEntryAddedEventListener, _LogManager_getLogLevel, _LogManager_getBidiStackTrace;
Object.defineProperty(logManager, "__esModule", { value: true });
logManager.LogManager = void 0;
const bidiProtocolTypes_1$2 = bidiProtocolTypes;
const logHelper_1 = logHelper;
const realm_1$2 = realm;
class LogManager {
    constructor(cdpClient, cdpSessionId, eventManager) {
        _LogManager_instances.add(this);
        _LogManager_cdpClient.set(this, void 0);
        _LogManager_cdpSessionId.set(this, void 0);
        _LogManager_eventManager.set(this, void 0);
        __classPrivateFieldSet$a(this, _LogManager_cdpSessionId, cdpSessionId, "f");
        __classPrivateFieldSet$a(this, _LogManager_cdpClient, cdpClient, "f");
        __classPrivateFieldSet$a(this, _LogManager_eventManager, eventManager, "f");
    }
    static create(cdpClient, cdpSessionId, eventManager) {
        const logManager = new LogManager(cdpClient, cdpSessionId, eventManager);
        __classPrivateFieldGet$b(logManager, _LogManager_instances, "m", _LogManager_initialize).call(logManager);
        return logManager;
    }
}
logManager.LogManager = LogManager;
_a$4 = LogManager, _LogManager_cdpClient = new WeakMap(), _LogManager_cdpSessionId = new WeakMap(), _LogManager_eventManager = new WeakMap(), _LogManager_instances = new WeakSet(), _LogManager_initialize = function _LogManager_initialize() {
    __classPrivateFieldGet$b(this, _LogManager_instances, "m", _LogManager_initializeEventListeners).call(this);
}, _LogManager_initializeEventListeners = function _LogManager_initializeEventListeners() {
    __classPrivateFieldGet$b(this, _LogManager_instances, "m", _LogManager_initializeLogEntryAddedEventListener).call(this);
}, _LogManager_initializeLogEntryAddedEventListener = function _LogManager_initializeLogEntryAddedEventListener() {
    __classPrivateFieldGet$b(this, _LogManager_cdpClient, "f").on('Runtime.consoleAPICalled', (params) => {
        var _b;
        // Try to find realm by `cdpSessionId` and `executionContextId`,
        // if provided.
        const realm = realm_1$2.Realm.findRealm({
            cdpSessionId: __classPrivateFieldGet$b(this, _LogManager_cdpSessionId, "f"),
            executionContextId: params.executionContextId,
        });
        const argsPromise = realm === undefined
            ? Promise.resolve(params.args)
            : // Properly serialize arguments if possible.
                Promise.all(params.args.map((arg) => __awaiter$8(this, void 0, void 0, function* () {
                    return realm.serializeCdpObject(arg, 'none');
                })));
        // No need in waiting for the result, just register the event promise.
        // noinspection JSIgnoredPromiseFromCall
        __classPrivateFieldGet$b(this, _LogManager_eventManager, "f").registerPromiseEvent(argsPromise.then((args) => {
            var _b, _c;
            return new bidiProtocolTypes_1$2.Log.LogEntryAddedEvent({
                level: __classPrivateFieldGet$b(LogManager, _a$4, "m", _LogManager_getLogLevel).call(LogManager, params.type),
                source: {
                    realm: (_b = realm === null || realm === void 0 ? void 0 : realm.realmId) !== null && _b !== void 0 ? _b : 'UNKNOWN',
                    context: (_c = realm === null || realm === void 0 ? void 0 : realm.browsingContextId) !== null && _c !== void 0 ? _c : 'UNKNOWN',
                },
                text: (0, logHelper_1.getRemoteValuesText)(args, true),
                timestamp: Math.round(params.timestamp),
                stackTrace: __classPrivateFieldGet$b(LogManager, _a$4, "m", _LogManager_getBidiStackTrace).call(LogManager, params.stackTrace),
                type: 'console',
                // Console method is `warn`, not `warning`.
                method: params.type === 'warning' ? 'warn' : params.type,
                args,
            });
        }), (_b = realm === null || realm === void 0 ? void 0 : realm.browsingContextId) !== null && _b !== void 0 ? _b : 'UNKNOWN', bidiProtocolTypes_1$2.Log.LogEntryAddedEvent.method);
    });
    __classPrivateFieldGet$b(this, _LogManager_cdpClient, "f").on('Runtime.exceptionThrown', (params) => {
        var _b;
        // Try to find realm by `cdpSessionId` and `executionContextId`,
        // if provided.
        const realm = realm_1$2.Realm.findRealm({
            cdpSessionId: __classPrivateFieldGet$b(this, _LogManager_cdpSessionId, "f"),
            executionContextId: params.exceptionDetails.executionContextId,
        });
        // Try all the best to get the exception text.
        const textPromise = (() => __awaiter$8(this, void 0, void 0, function* () {
            if (!params.exceptionDetails.exception) {
                return params.exceptionDetails.text;
            }
            if (realm === undefined) {
                return JSON.stringify(params.exceptionDetails.exception);
            }
            return yield realm.stringifyObject(params.exceptionDetails.exception);
        }))();
        // No need in waiting for the result, just register the event promise.
        // noinspection JSIgnoredPromiseFromCall
        __classPrivateFieldGet$b(this, _LogManager_eventManager, "f").registerPromiseEvent(textPromise.then((text) => {
            var _b, _c;
            return new bidiProtocolTypes_1$2.Log.LogEntryAddedEvent({
                level: 'error',
                source: {
                    realm: (_b = realm === null || realm === void 0 ? void 0 : realm.realmId) !== null && _b !== void 0 ? _b : 'UNKNOWN',
                    context: (_c = realm === null || realm === void 0 ? void 0 : realm.browsingContextId) !== null && _c !== void 0 ? _c : 'UNKNOWN',
                },
                text,
                timestamp: Math.round(params.timestamp),
                stackTrace: __classPrivateFieldGet$b(LogManager, _a$4, "m", _LogManager_getBidiStackTrace).call(LogManager, params.exceptionDetails.stackTrace),
                type: 'javascript',
            });
        }), (_b = realm === null || realm === void 0 ? void 0 : realm.browsingContextId) !== null && _b !== void 0 ? _b : 'UNKNOWN', bidiProtocolTypes_1$2.Log.LogEntryAddedEvent.method);
    });
}, _LogManager_getLogLevel = function _LogManager_getLogLevel(consoleApiType) {
    if (['assert', 'error'].includes(consoleApiType)) {
        return 'error';
    }
    if (['debug', 'trace'].includes(consoleApiType)) {
        return 'debug';
    }
    if (['warn', 'warning'].includes(consoleApiType)) {
        return 'warn';
    }
    return 'info';
}, _LogManager_getBidiStackTrace = function _LogManager_getBidiStackTrace(cdpStackTrace) {
    const stackFrames = cdpStackTrace === null || cdpStackTrace === void 0 ? void 0 : cdpStackTrace.callFrames.map((callFrame) => {
        return {
            columnNumber: callFrame.columnNumber,
            functionName: callFrame.functionName,
            lineNumber: callFrame.lineNumber,
            url: callFrame.url,
        };
    });
    return stackFrames ? { callFrames: stackFrames } : undefined;
};

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
var __awaiter$7 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet$a = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$9 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BrowsingContextImpl_instances, _BrowsingContextImpl_targetDefers, _BrowsingContextImpl_contextId, _BrowsingContextImpl_parentId, _BrowsingContextImpl_cdpBrowserContextId, _BrowsingContextImpl_eventManager, _BrowsingContextImpl_children, _BrowsingContextImpl_url, _BrowsingContextImpl_loaderId, _BrowsingContextImpl_cdpSessionId, _BrowsingContextImpl_cdpClient, _BrowsingContextImpl_maybeDefaultRealm, _BrowsingContextImpl_defaultRealm_get, _BrowsingContextImpl_removeChildContexts, _BrowsingContextImpl_updateConnection, _BrowsingContextImpl_unblockAttachedTarget, _BrowsingContextImpl_initListeners, _BrowsingContextImpl_getOrigin, _BrowsingContextImpl_documentChanged;
Object.defineProperty(browsingContextImpl, "__esModule", { value: true });
browsingContextImpl.BrowsingContextImpl = void 0;
const bidiProtocolTypes_1$1 = bidiProtocolTypes;
const deferred_1 = deferred;
const error_1$2 = error;
const logManager_1 = logManager;
const realm_1$1 = realm;
const browsingContextStorage_1$2 = browsingContextStorage;
var LoadEvent = bidiProtocolTypes_1$1.BrowsingContext.LoadEvent;
class BrowsingContextImpl {
    constructor(contextId, parentId, cdpClient, cdpSessionId, cdpBrowserContextId, eventManager) {
        _BrowsingContextImpl_instances.add(this);
        _BrowsingContextImpl_targetDefers.set(this, {
            documentInitialized: new deferred_1.Deferred(),
            targetUnblocked: new deferred_1.Deferred(),
            Page: {
                navigatedWithinDocument: new deferred_1.Deferred(),
                lifecycleEvent: {
                    DOMContentLoaded: new deferred_1.Deferred(),
                    load: new deferred_1.Deferred(),
                },
            },
        });
        _BrowsingContextImpl_contextId.set(this, void 0);
        _BrowsingContextImpl_parentId.set(this, void 0);
        _BrowsingContextImpl_cdpBrowserContextId.set(this, void 0);
        _BrowsingContextImpl_eventManager.set(this, void 0);
        _BrowsingContextImpl_children.set(this, new Map());
        _BrowsingContextImpl_url.set(this, 'about:blank');
        _BrowsingContextImpl_loaderId.set(this, null);
        _BrowsingContextImpl_cdpSessionId.set(this, void 0);
        _BrowsingContextImpl_cdpClient.set(this, void 0);
        _BrowsingContextImpl_maybeDefaultRealm.set(this, void 0);
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_contextId, contextId, "f");
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_parentId, parentId, "f");
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_cdpClient, cdpClient, "f");
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_cdpBrowserContextId, cdpBrowserContextId, "f");
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_eventManager, eventManager, "f");
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_cdpSessionId, cdpSessionId, "f");
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_initListeners).call(this);
        browsingContextStorage_1$2.BrowsingContextStorage.addContext(this);
    }
    static createFrameContext(contextId, parentId, cdpClient, cdpSessionId, eventManager) {
        return __awaiter$7(this, void 0, void 0, function* () {
            const context = new BrowsingContextImpl(contextId, parentId, cdpClient, cdpSessionId, null, eventManager);
            __classPrivateFieldGet$a(context, _BrowsingContextImpl_targetDefers, "f").targetUnblocked.resolve();
            yield eventManager.registerEvent(new bidiProtocolTypes_1$1.BrowsingContext.ContextCreatedEvent(context.serializeToBidiValue()), context.contextId);
        });
    }
    static createTargetContext(contextId, parentId, cdpClient, cdpSessionId, cdpBrowserContextId, eventManager) {
        return __awaiter$7(this, void 0, void 0, function* () {
            const context = new BrowsingContextImpl(contextId, parentId, cdpClient, cdpSessionId, cdpBrowserContextId, eventManager);
            // No need in waiting for target to be unblocked.
            // noinspection ES6MissingAwait
            __classPrivateFieldGet$a(context, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_unblockAttachedTarget).call(context);
            yield eventManager.registerEvent(new bidiProtocolTypes_1$1.BrowsingContext.ContextCreatedEvent(context.serializeToBidiValue()), context.contextId);
        });
    }
    get cdpBrowserContextId() {
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpBrowserContextId, "f");
    }
    convertFrameToTargetContext(cdpClient, cdpSessionId) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_updateConnection).call(this, cdpClient, cdpSessionId);
        // No need in waiting for target to be unblocked.
        // noinspection JSIgnoredPromiseFromCall
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_unblockAttachedTarget).call(this);
    }
    delete() {
        return __awaiter$7(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_removeChildContexts).call(this);
            // Remove context from the parent.
            if (this.parentId !== null) {
                const parent = browsingContextStorage_1$2.BrowsingContextStorage.getKnownContext(this.parentId);
                __classPrivateFieldGet$a(parent, _BrowsingContextImpl_children, "f").delete(this.contextId);
            }
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_eventManager, "f").registerEvent(new bidiProtocolTypes_1$1.BrowsingContext.ContextDestroyedEvent(this.serializeToBidiValue()), this.contextId);
            browsingContextStorage_1$2.BrowsingContextStorage.removeContext(this.contextId);
        });
    }
    get contextId() {
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_contextId, "f");
    }
    get parentId() {
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_parentId, "f");
    }
    get cdpSessionId() {
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpSessionId, "f");
    }
    get children() {
        return Array.from(__classPrivateFieldGet$a(this, _BrowsingContextImpl_children, "f").values());
    }
    get url() {
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_url, "f");
    }
    addChild(child) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_children, "f").set(child.contextId, child);
    }
    awaitLoaded() {
        return __awaiter$7(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load;
        });
    }
    awaitUnblocked() {
        return __awaiter$7(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked;
        });
    }
    serializeToBidiValue(maxDepth = 0, addParentFiled = true) {
        return Object.assign({ context: __classPrivateFieldGet$a(this, _BrowsingContextImpl_contextId, "f"), url: this.url, children: maxDepth > 0
                ? this.children.map((c) => c.serializeToBidiValue(maxDepth - 1, false))
                : null }, (addParentFiled ? { parent: __classPrivateFieldGet$a(this, _BrowsingContextImpl_parentId, "f") } : {}));
    }
    navigate(url, wait) {
        return __awaiter$7(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked;
            // TODO: handle loading errors.
            const cdpNavigateResult = yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Page.navigate', {
                url,
                frameId: this.contextId,
            });
            if (cdpNavigateResult.errorText) {
                throw new error_1$2.UnknownException(cdpNavigateResult.errorText);
            }
            if (cdpNavigateResult.loaderId !== undefined &&
                cdpNavigateResult.loaderId !== __classPrivateFieldGet$a(this, _BrowsingContextImpl_loaderId, "f")) {
                __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_documentChanged).call(this, cdpNavigateResult.loaderId);
            }
            // Wait for `wait` condition.
            switch (wait) {
                case 'none':
                    break;
                case 'interactive':
                    // No `loaderId` means same-document navigation.
                    if (cdpNavigateResult.loaderId === undefined) {
                        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument;
                    }
                    else {
                        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.DOMContentLoaded;
                    }
                    break;
                case 'complete':
                    // No `loaderId` means same-document navigation.
                    if (cdpNavigateResult.loaderId === undefined) {
                        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument;
                    }
                    else {
                        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load;
                    }
                    break;
                default:
                    throw new Error(`Not implemented wait '${wait}'`);
            }
            return {
                result: {
                    navigation: cdpNavigateResult.loaderId || null,
                    url: url,
                },
            };
        });
    }
    findElement(selector) {
        return __awaiter$7(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked;
            const functionDeclaration = `
      (resultsSelector) => document.querySelector(resultsSelector)
    `;
            const _arguments = [
                { type: 'string', value: selector },
            ];
            // TODO: execute in isolated world.
            // TODO(sadym): handle not found exception.
            const result = yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "a", _BrowsingContextImpl_defaultRealm_get).callFunction(functionDeclaration, {
                type: 'undefined',
            }, _arguments, true, 'root');
            // TODO(sadym): handle type properly.
            return result;
        });
    }
    getOrCreateSandbox(sandbox) {
        return __awaiter$7(this, void 0, void 0, function* () {
            if (sandbox === undefined || sandbox === '') {
                return __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "a", _BrowsingContextImpl_defaultRealm_get);
            }
            let maybeSandboxes = realm_1$1.Realm.findRealms({
                browsingContextId: this.contextId,
                sandbox,
            });
            if (maybeSandboxes.length == 0) {
                yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Page.createIsolatedWorld', {
                    frameId: this.contextId,
                    worldName: sandbox,
                });
                // `Runtime.executionContextCreated` should be emitted by the time the
                // previous command is done.
                maybeSandboxes = realm_1$1.Realm.findRealms({
                    browsingContextId: this.contextId,
                    sandbox,
                });
            }
            if (maybeSandboxes.length !== 1) {
                throw Error(`Sandbox ${sandbox} wasn't created.`);
            }
            return maybeSandboxes[0];
        });
    }
}
browsingContextImpl.BrowsingContextImpl = BrowsingContextImpl;
_BrowsingContextImpl_targetDefers = new WeakMap(), _BrowsingContextImpl_contextId = new WeakMap(), _BrowsingContextImpl_parentId = new WeakMap(), _BrowsingContextImpl_cdpBrowserContextId = new WeakMap(), _BrowsingContextImpl_eventManager = new WeakMap(), _BrowsingContextImpl_children = new WeakMap(), _BrowsingContextImpl_url = new WeakMap(), _BrowsingContextImpl_loaderId = new WeakMap(), _BrowsingContextImpl_cdpSessionId = new WeakMap(), _BrowsingContextImpl_cdpClient = new WeakMap(), _BrowsingContextImpl_maybeDefaultRealm = new WeakMap(), _BrowsingContextImpl_instances = new WeakSet(), _BrowsingContextImpl_defaultRealm_get = function _BrowsingContextImpl_defaultRealm_get() {
    if (__classPrivateFieldGet$a(this, _BrowsingContextImpl_maybeDefaultRealm, "f") === undefined) {
        throw new Error(`No default realm for browsing context ${__classPrivateFieldGet$a(this, _BrowsingContextImpl_contextId, "f")}`);
    }
    return __classPrivateFieldGet$a(this, _BrowsingContextImpl_maybeDefaultRealm, "f");
}, _BrowsingContextImpl_removeChildContexts = function _BrowsingContextImpl_removeChildContexts() {
    return __awaiter$7(this, void 0, void 0, function* () {
        yield Promise.all(this.children.map((child) => child.delete()));
    });
}, _BrowsingContextImpl_updateConnection = function _BrowsingContextImpl_updateConnection(cdpClient, cdpSessionId) {
    if (!__classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked.isFinished) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked.reject('OOPiF');
    }
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked = new deferred_1.Deferred();
    __classPrivateFieldSet$9(this, _BrowsingContextImpl_cdpClient, cdpClient, "f");
    __classPrivateFieldSet$9(this, _BrowsingContextImpl_cdpSessionId, cdpSessionId, "f");
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_initListeners).call(this);
}, _BrowsingContextImpl_unblockAttachedTarget = function _BrowsingContextImpl_unblockAttachedTarget() {
    return __awaiter$7(this, void 0, void 0, function* () {
        logManager_1.LogManager.create(__classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f"), __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpSessionId, "f"), __classPrivateFieldGet$a(this, _BrowsingContextImpl_eventManager, "f"));
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Runtime.enable');
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Page.enable');
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Page.setLifecycleEventsEnabled', {
            enabled: true,
        });
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Target.setAutoAttach', {
            autoAttach: true,
            waitForDebuggerOnStart: true,
            flatten: true,
        });
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").sendCommand('Runtime.runIfWaitingForDebugger');
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").targetUnblocked.resolve();
    });
}, _BrowsingContextImpl_initListeners = function _BrowsingContextImpl_initListeners() {
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Target.targetInfoChanged', (params) => {
        if (this.contextId !== params.targetInfo.targetId) {
            return;
        }
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_url, params.targetInfo.url, "f");
    });
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Page.frameNavigated', (params) => __awaiter$7(this, void 0, void 0, function* () {
        var _a;
        if (this.contextId !== params.frame.id) {
            return;
        }
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_url, params.frame.url + ((_a = params.frame.urlFragment) !== null && _a !== void 0 ? _a : ''), "f");
        // At the point the page is initiated, all the nested iframes from the
        // previous page are detached and realms are destroyed.
        // Remove context's children.
        yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_removeChildContexts).call(this);
        // Remove all the already created realms.
        realm_1$1.Realm.clearBrowsingContext(this.contextId);
    }));
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Page.navigatedWithinDocument', (params) => {
        if (this.contextId !== params.frameId) {
            return;
        }
        __classPrivateFieldSet$9(this, _BrowsingContextImpl_url, params.url, "f");
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument.resolve(params);
    });
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Page.lifecycleEvent', (params) => __awaiter$7(this, void 0, void 0, function* () {
        if (this.contextId !== params.frameId) {
            return;
        }
        if (params.name === 'init') {
            __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_documentChanged).call(this, params.loaderId);
            __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").documentInitialized.resolve();
        }
        if (params.name === 'commit') {
            __classPrivateFieldSet$9(this, _BrowsingContextImpl_loaderId, params.loaderId, "f");
            return;
        }
        if (params.loaderId !== __classPrivateFieldGet$a(this, _BrowsingContextImpl_loaderId, "f")) {
            return;
        }
        switch (params.name) {
            case 'DOMContentLoaded':
                __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.DOMContentLoaded.resolve(params);
                yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_eventManager, "f").registerEvent(new bidiProtocolTypes_1$1.BrowsingContext.DomContentLoadedEvent({
                    context: this.contextId,
                    navigation: __classPrivateFieldGet$a(this, _BrowsingContextImpl_loaderId, "f"),
                    url: __classPrivateFieldGet$a(this, _BrowsingContextImpl_url, "f"),
                }), this.contextId);
                break;
            case 'load':
                __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load.resolve(params);
                yield __classPrivateFieldGet$a(this, _BrowsingContextImpl_eventManager, "f").registerEvent(new LoadEvent({
                    context: this.contextId,
                    navigation: __classPrivateFieldGet$a(this, _BrowsingContextImpl_loaderId, "f"),
                    url: __classPrivateFieldGet$a(this, _BrowsingContextImpl_url, "f"),
                }), this.contextId);
                break;
        }
    }));
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Runtime.executionContextCreated', (params) => {
        if (params.context.auxData.frameId !== this.contextId) {
            return;
        }
        // Only this execution contexts are supported for now.
        if (!['default', 'isolated'].includes(params.context.auxData.type)) {
            return;
        }
        const realm = realm_1$1.Realm.create(params.context.uniqueId, this.contextId, params.context.id, __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "m", _BrowsingContextImpl_getOrigin).call(this, params), 
        // TODO: differentiate types.
        realm_1$1.RealmType.window, 
        // Sandbox name for isolated world.
        params.context.auxData.type === 'isolated'
            ? params.context.name
            : undefined, __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpSessionId, "f"), __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f"));
        if (params.context.auxData.isDefault) {
            __classPrivateFieldSet$9(this, _BrowsingContextImpl_maybeDefaultRealm, realm, "f");
        }
    });
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpClient, "f").on('Runtime.executionContextDestroyed', (params) => {
        realm_1$1.Realm.findRealms({
            cdpSessionId: __classPrivateFieldGet$a(this, _BrowsingContextImpl_cdpSessionId, "f"),
            executionContextId: params.executionContextId,
        }).map((realm) => realm.delete());
    });
}, _BrowsingContextImpl_getOrigin = function _BrowsingContextImpl_getOrigin(params) {
    if (params.context.auxData.type === 'isolated') {
        // Sandbox should have the same origin as the context itself, but in CDP
        // it has an empty one.
        return __classPrivateFieldGet$a(this, _BrowsingContextImpl_instances, "a", _BrowsingContextImpl_defaultRealm_get).origin;
    }
    // https://html.spec.whatwg.org/multipage/origin.html#ascii-serialisation-of-an-origin
    return ['://', ''].includes(params.context.origin)
        ? 'null'
        : params.context.origin;
}, _BrowsingContextImpl_documentChanged = function _BrowsingContextImpl_documentChanged(loaderId) {
    if (__classPrivateFieldGet$a(this, _BrowsingContextImpl_loaderId, "f") === loaderId) {
        return;
    }
    if (!__classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").documentInitialized.isFinished) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").documentInitialized.reject('Document changed');
    }
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").documentInitialized = new deferred_1.Deferred();
    if (!__classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument.isFinished) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument.reject('Document changed');
    }
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.navigatedWithinDocument =
        new deferred_1.Deferred();
    if (!__classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.DOMContentLoaded.isFinished) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.DOMContentLoaded.reject('Document changed');
    }
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.DOMContentLoaded =
        new deferred_1.Deferred();
    if (!__classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load.isFinished) {
        __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load.reject('Document changed');
    }
    __classPrivateFieldGet$a(this, _BrowsingContextImpl_targetDefers, "f").Page.lifecycleEvent.load =
        new deferred_1.Deferred();
    __classPrivateFieldSet$9(this, _BrowsingContextImpl_loaderId, loaderId, "f");
};

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
var __awaiter$6 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet$8 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$9 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowsingContextProcessor_instances, _a$3, _BrowsingContextProcessor_cdpConnection, _BrowsingContextProcessor_selfTargetId, _BrowsingContextProcessor_eventManager, _BrowsingContextProcessor_setBrowserClientEventListeners, _BrowsingContextProcessor_setTargetEventListeners, _BrowsingContextProcessor_setSessionEventListeners, _BrowsingContextProcessor_handleAttachedToTargetEvent, _BrowsingContextProcessor_handleDetachedFromTargetEvent, _BrowsingContextProcessor_getRealm, _BrowsingContextProcessor_isValidTarget;
Object.defineProperty(browsingContextProcessor, "__esModule", { value: true });
browsingContextProcessor.BrowsingContextProcessor = void 0;
const log_1$2 = log;
const error_1$1 = error;
const browsingContextImpl_1 = browsingContextImpl;
const realm_1 = realm;
const browsingContextStorage_1$1 = browsingContextStorage;
const logContext = (0, log_1$2.log)(log_1$2.LogType.browsingContexts);
class BrowsingContextProcessor {
    constructor(cdpConnection, selfTargetId, eventManager) {
        _BrowsingContextProcessor_instances.add(this);
        this.sessions = new Set();
        _BrowsingContextProcessor_cdpConnection.set(this, void 0);
        _BrowsingContextProcessor_selfTargetId.set(this, void 0);
        _BrowsingContextProcessor_eventManager.set(this, void 0);
        __classPrivateFieldSet$8(this, _BrowsingContextProcessor_cdpConnection, cdpConnection, "f");
        __classPrivateFieldSet$8(this, _BrowsingContextProcessor_selfTargetId, selfTargetId, "f");
        __classPrivateFieldSet$8(this, _BrowsingContextProcessor_eventManager, eventManager, "f");
        __classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_setBrowserClientEventListeners).call(this, __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").browserClient());
    }
    process_browsingContext_getTree(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const resultContexts = params.root === undefined
                ? browsingContextStorage_1$1.BrowsingContextStorage.getTopLevelContexts()
                : [browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(params.root)];
            return {
                result: {
                    contexts: resultContexts.map((c) => { var _b; return c.serializeToBidiValue((_b = params.maxDepth) !== null && _b !== void 0 ? _b : Number.MAX_VALUE); }),
                },
            };
        });
    }
    process_browsingContext_create(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const browserCdpClient = __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").browserClient();
            let referenceContext = undefined;
            if (params.referenceContext !== undefined) {
                referenceContext = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(params.referenceContext);
                if (referenceContext.parentId !== null) {
                    throw new error_1$1.InvalidArgumentException(`referenceContext should be a top-level context`);
                }
            }
            const result = yield browserCdpClient.sendCommand('Target.createTarget', Object.assign({ url: 'about:blank', newWindow: params.type === 'window' }, ((referenceContext === null || referenceContext === void 0 ? void 0 : referenceContext.cdpBrowserContextId)
                ? { browserContextId: referenceContext.cdpBrowserContextId }
                : {})));
            // Wait for the new tab to be loaded to avoid race conditions in the
            // `browsingContext` events, when the `browsingContext.domContentLoaded` and
            // `browsingContext.load` events from the initial `about:blank` navigation
            // are emitted after the next navigation is started.
            // Details: https://github.com/web-platform-tests/wpt/issues/35846
            const contextId = result.targetId;
            const context = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(contextId);
            yield context.awaitLoaded();
            return {
                result: context.serializeToBidiValue(1),
            };
        });
    }
    process_browsingContext_navigate(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const context = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(params.context);
            return yield context.navigate(params.url, params.wait !== undefined ? params.wait : 'none');
        });
    }
    process_script_evaluate(params) {
        var _b;
        return __awaiter$6(this, void 0, void 0, function* () {
            const realm = yield __classPrivateFieldGet$9(BrowsingContextProcessor, _a$3, "m", _BrowsingContextProcessor_getRealm).call(BrowsingContextProcessor, params.target);
            return yield realm.scriptEvaluate(params.expression, params.awaitPromise, (_b = params.resultOwnership) !== null && _b !== void 0 ? _b : 'none');
        });
    }
    process_script_getRealms(params) {
        if (params.context !== undefined) {
            // Make sure the context is known.
            browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(params.context);
        }
        const realms = realm_1.Realm.findRealms({
            browsingContextId: params.context,
            type: params.type,
        }).map((realm) => realm.toBiDi());
        return { result: { realms } };
    }
    process_script_callFunction(params) {
        var _b;
        return __awaiter$6(this, void 0, void 0, function* () {
            const realm = yield __classPrivateFieldGet$9(BrowsingContextProcessor, _a$3, "m", _BrowsingContextProcessor_getRealm).call(BrowsingContextProcessor, params.target);
            return yield realm.callFunction(params.functionDeclaration, params.this || {
                type: 'undefined',
            }, // `this` is `undefined` by default.
            params.arguments || [], // `arguments` is `[]` by default.
            params.awaitPromise, (_b = params.resultOwnership) !== null && _b !== void 0 ? _b : 'none');
        });
    }
    process_script_disown(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const realm = yield __classPrivateFieldGet$9(BrowsingContextProcessor, _a$3, "m", _BrowsingContextProcessor_getRealm).call(BrowsingContextProcessor, params.target);
            yield Promise.all(params.handles.map((h) => __awaiter$6(this, void 0, void 0, function* () { return yield realm.disown(h); })));
            return { result: {} };
        });
    }
    process_PROTO_browsingContext_findElement(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const context = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(params.context);
            return yield context.findElement(params.selector);
        });
    }
    process_browsingContext_close(commandParams) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const browserCdpClient = __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").browserClient();
            const context = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(commandParams.context);
            if (context.parentId !== null) {
                throw new error_1$1.InvalidArgumentException('Not a top-level browsing context cannot be closed.');
            }
            const detachedFromTargetPromise = new Promise((resolve) => __awaiter$6(this, void 0, void 0, function* () {
                const onContextDestroyed = (eventParams) => {
                    if (eventParams.targetId === commandParams.context) {
                        browserCdpClient.off('Target.detachedFromTarget', onContextDestroyed);
                        resolve();
                    }
                };
                browserCdpClient.on('Target.detachedFromTarget', onContextDestroyed);
            }));
            yield __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f")
                .browserClient()
                .sendCommand('Target.closeTarget', {
                targetId: commandParams.context,
            });
            // Sometimes CDP command finishes before `detachedFromTarget` event,
            // sometimes after. Wait for the CDP command to be finished, and then wait
            // for `detachedFromTarget` if it hasn't emitted.
            yield detachedFromTargetPromise;
            return { result: {} };
        });
    }
    process_cdp_sendCommand(params) {
        var _b;
        return __awaiter$6(this, void 0, void 0, function* () {
            const sendCdpCommandResult = yield __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").sendCommand(params.cdpMethod, params.cdpParams, (_b = params.cdpSession) !== null && _b !== void 0 ? _b : null);
            return {
                result: sendCdpCommandResult,
                cdpSession: params.cdpSession,
            };
        });
    }
    process_cdp_getSession(params) {
        return __awaiter$6(this, void 0, void 0, function* () {
            const context = params.context;
            const sessionId = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(context).cdpSessionId;
            if (sessionId === undefined) {
                return { result: { cdpSession: null } };
            }
            return { result: { cdpSession: sessionId } };
        });
    }
}
browsingContextProcessor.BrowsingContextProcessor = BrowsingContextProcessor;
_a$3 = BrowsingContextProcessor, _BrowsingContextProcessor_cdpConnection = new WeakMap(), _BrowsingContextProcessor_selfTargetId = new WeakMap(), _BrowsingContextProcessor_eventManager = new WeakMap(), _BrowsingContextProcessor_instances = new WeakSet(), _BrowsingContextProcessor_setBrowserClientEventListeners = function _BrowsingContextProcessor_setBrowserClientEventListeners(browserClient) {
    __classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_setTargetEventListeners).call(this, browserClient);
}, _BrowsingContextProcessor_setTargetEventListeners = function _BrowsingContextProcessor_setTargetEventListeners(cdpClient) {
    cdpClient.on('Target.attachedToTarget', (params) => __awaiter$6(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_handleAttachedToTargetEvent).call(this, params, cdpClient);
    }));
    cdpClient.on('Target.detachedFromTarget', (params) => __awaiter$6(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet$9(BrowsingContextProcessor, _a$3, "m", _BrowsingContextProcessor_handleDetachedFromTargetEvent).call(BrowsingContextProcessor, params);
    }));
}, _BrowsingContextProcessor_setSessionEventListeners = function _BrowsingContextProcessor_setSessionEventListeners(sessionId) {
    if (this.sessions.has(sessionId)) {
        return;
    }
    this.sessions.add(sessionId);
    const sessionCdpClient = __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").getCdpClient(sessionId);
    __classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_setTargetEventListeners).call(this, sessionCdpClient);
    sessionCdpClient.on('*', (method, params) => __awaiter$6(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet$9(this, _BrowsingContextProcessor_eventManager, "f").registerEvent({
            method: 'cdp.eventReceived',
            params: {
                cdpMethod: method,
                cdpParams: params || {},
                cdpSession: sessionId,
            },
        }, null);
    }));
    sessionCdpClient.on('Page.frameAttached', (params) => __awaiter$6(this, void 0, void 0, function* () {
        yield browsingContextImpl_1.BrowsingContextImpl.createFrameContext(params.frameId, params.parentFrameId, sessionCdpClient, sessionId, __classPrivateFieldGet$9(this, _BrowsingContextProcessor_eventManager, "f"));
    }));
}, _BrowsingContextProcessor_handleAttachedToTargetEvent = function _BrowsingContextProcessor_handleAttachedToTargetEvent(params, parentSessionCdpClient) {
    var _b;
    return __awaiter$6(this, void 0, void 0, function* () {
        const { sessionId, targetInfo } = params;
        let targetSessionCdpClient = __classPrivateFieldGet$9(this, _BrowsingContextProcessor_cdpConnection, "f").getCdpClient(sessionId);
        if (!__classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_isValidTarget).call(this, targetInfo)) {
            // DevTools or some other not supported by BiDi target.
            yield targetSessionCdpClient.sendCommand('Runtime.runIfWaitingForDebugger');
            yield parentSessionCdpClient.sendCommand('Target.detachFromTarget', params);
            return;
        }
        logContext('AttachedToTarget event received: ' + JSON.stringify(params));
        __classPrivateFieldGet$9(this, _BrowsingContextProcessor_instances, "m", _BrowsingContextProcessor_setSessionEventListeners).call(this, sessionId);
        if (browsingContextStorage_1$1.BrowsingContextStorage.hasKnownContext(targetInfo.targetId)) {
            // OOPiF.
            browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(targetInfo.targetId).convertFrameToTargetContext(targetSessionCdpClient, sessionId);
        }
        else {
            yield browsingContextImpl_1.BrowsingContextImpl.createTargetContext(targetInfo.targetId, null, targetSessionCdpClient, sessionId, (_b = params.targetInfo.browserContextId) !== null && _b !== void 0 ? _b : null, __classPrivateFieldGet$9(this, _BrowsingContextProcessor_eventManager, "f"));
        }
    });
}, _BrowsingContextProcessor_handleDetachedFromTargetEvent = function _BrowsingContextProcessor_handleDetachedFromTargetEvent(params) {
    var _b;
    return __awaiter$6(this, void 0, void 0, function* () {
        // TODO: params.targetId is deprecated. Update this class to track using
        // params.sessionId instead.
        // https://github.com/GoogleChromeLabs/chromium-bidi/issues/60
        const contextId = params.targetId;
        yield ((_b = browsingContextStorage_1$1.BrowsingContextStorage.findContext(contextId)) === null || _b === void 0 ? void 0 : _b.delete());
    });
}, _BrowsingContextProcessor_getRealm = function _BrowsingContextProcessor_getRealm(target) {
    return __awaiter$6(this, void 0, void 0, function* () {
        if ('realm' in target) {
            return realm_1.Realm.getRealm({ realmId: target.realm });
        }
        const context = browsingContextStorage_1$1.BrowsingContextStorage.getKnownContext(target.context);
        return yield context.getOrCreateSandbox(target.sandbox);
    });
}, _BrowsingContextProcessor_isValidTarget = function _BrowsingContextProcessor_isValidTarget(target) {
    if (target.targetId === __classPrivateFieldGet$9(this, _BrowsingContextProcessor_selfTargetId, "f")) {
        return false;
    }
    return ['page', 'iframe'].includes(target.type);
};

var bidiServer = {};

var EventEmitter$1 = {};

var mitt=function(n){return {all:n=n||new Map,on:function(e,t){var i=n.get(e);i?i.push(t):n.set(e,[t]);},off:function(e,t){var i=n.get(e);i&&(t?i.splice(i.indexOf(t)>>>0,1):n.set(e,[]));},emit:function(e,t){var i=n.get(e);i&&i.slice().map(function(n){n(t);}),(i=n.get("*"))&&i.slice().map(function(n){n(e,t);});}}};

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
var __classPrivateFieldGet$8 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EventEmitter_emitter;
Object.defineProperty(EventEmitter$1, "__esModule", { value: true });
EventEmitter$1.EventEmitter = void 0;
const mitt_1 = __importDefault(mitt);
class EventEmitter {
    constructor() {
        _EventEmitter_emitter.set(this, (0, mitt_1.default)());
    }
    on(type, handler) {
        __classPrivateFieldGet$8(this, _EventEmitter_emitter, "f").on(type, handler);
        return this;
    }
    /**
     * Like `on` but the listener will only be fired once and then it will be removed.
     * @param event - the event you'd like to listen to
     * @param handler - the handler function to run when the event occurs
     * @returns `this` to enable you to chain method calls.
     */
    once(event, handler) {
        const onceHandler = (eventData) => {
            handler(eventData);
            this.off(event, onceHandler);
        };
        return this.on(event, onceHandler);
    }
    off(type, handler) {
        __classPrivateFieldGet$8(this, _EventEmitter_emitter, "f").off(type, handler);
        return this;
    }
    /**
     * Emits an event and call any associated listeners.
     *
     * @param event - the event you'd like to emit
     * @param eventData - any data you'd like to emit with the event
     * @returns `true` if there are any listeners, `false` if there are not.
     */
    emit(event, eventData) {
        __classPrivateFieldGet$8(this, _EventEmitter_emitter, "f").emit(event, eventData);
    }
}
EventEmitter$1.EventEmitter = EventEmitter;
_EventEmitter_emitter = new WeakMap();

var processingQueue = {};

var __awaiter$5 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet$7 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$7 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ProcessingQueue_instances, _ProcessingQueue_queue, _ProcessingQueue_processor, _ProcessingQueue_catch, _ProcessingQueue_isProcessing, _ProcessingQueue_processIfNeeded;
Object.defineProperty(processingQueue, "__esModule", { value: true });
processingQueue.ProcessingQueue = void 0;
const log_1$1 = log;
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
const logSystem = (0, log_1$1.log)(log_1$1.LogType.system);
class ProcessingQueue {
    constructor(processor, _catch = () => Promise.resolve()) {
        _ProcessingQueue_instances.add(this);
        _ProcessingQueue_queue.set(this, []);
        _ProcessingQueue_processor.set(this, void 0);
        _ProcessingQueue_catch.set(this, void 0);
        // Flag to keep only 1 active processor.
        _ProcessingQueue_isProcessing.set(this, false);
        __classPrivateFieldSet$7(this, _ProcessingQueue_catch, _catch, "f");
        __classPrivateFieldSet$7(this, _ProcessingQueue_processor, processor, "f");
    }
    add(entry) {
        __classPrivateFieldGet$7(this, _ProcessingQueue_queue, "f").push(entry);
        // No need in waiting. Just initialise processor if needed.
        // noinspection JSIgnoredPromiseFromCall
        __classPrivateFieldGet$7(this, _ProcessingQueue_instances, "m", _ProcessingQueue_processIfNeeded).call(this);
    }
}
processingQueue.ProcessingQueue = ProcessingQueue;
_ProcessingQueue_queue = new WeakMap(), _ProcessingQueue_processor = new WeakMap(), _ProcessingQueue_catch = new WeakMap(), _ProcessingQueue_isProcessing = new WeakMap(), _ProcessingQueue_instances = new WeakSet(), _ProcessingQueue_processIfNeeded = function _ProcessingQueue_processIfNeeded() {
    return __awaiter$5(this, void 0, void 0, function* () {
        if (__classPrivateFieldGet$7(this, _ProcessingQueue_isProcessing, "f")) {
            return;
        }
        __classPrivateFieldSet$7(this, _ProcessingQueue_isProcessing, true, "f");
        while (__classPrivateFieldGet$7(this, _ProcessingQueue_queue, "f").length > 0) {
            const entryPromise = __classPrivateFieldGet$7(this, _ProcessingQueue_queue, "f").shift();
            if (entryPromise !== undefined) {
                yield entryPromise
                    .then((entry) => __classPrivateFieldGet$7(this, _ProcessingQueue_processor, "f").call(this, entry))
                    .catch((e) => {
                    logSystem('Event was not processed:' + e);
                    __classPrivateFieldGet$7(this, _ProcessingQueue_catch, "f").call(this, e);
                })
                    .finally();
            }
        }
        __classPrivateFieldSet$7(this, _ProcessingQueue_isProcessing, false, "f");
    });
};

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
var __awaiter$4 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BiDiMessageEntry_message, _BiDiMessageEntry_channel, _BidiServer_instances, _a$2, _BidiServer_messageQueue, _BidiServer_sendMessage, _BidiServer_onBidiMessage, _BidiServer_respondWithError, _BidiServer_getJsonType, _BidiServer_getErrorResponse, _BidiServer_parseBidiMessage;
Object.defineProperty(bidiServer, "__esModule", { value: true });
bidiServer.BidiServer = bidiServer.BiDiMessageEntry = void 0;
const log_1 = log;
const EventEmitter_1$1 = EventEmitter$1;
const processingQueue_1 = processingQueue;
const logBidi = (0, log_1.log)(log_1.LogType.bidi);
class BiDiMessageEntry {
    constructor(message, channel) {
        _BiDiMessageEntry_message.set(this, void 0);
        _BiDiMessageEntry_channel.set(this, void 0);
        __classPrivateFieldSet$6(this, _BiDiMessageEntry_message, message, "f");
        __classPrivateFieldSet$6(this, _BiDiMessageEntry_channel, channel, "f");
    }
    static createFromPromise(messagePromise, channel) {
        return messagePromise.then((message) => new BiDiMessageEntry(message, channel));
    }
    static createResolved(message, channel) {
        return Promise.resolve(new BiDiMessageEntry(message, channel));
    }
    get message() {
        return __classPrivateFieldGet$6(this, _BiDiMessageEntry_message, "f");
    }
    get channel() {
        return __classPrivateFieldGet$6(this, _BiDiMessageEntry_channel, "f");
    }
}
bidiServer.BiDiMessageEntry = BiDiMessageEntry;
_BiDiMessageEntry_message = new WeakMap(), _BiDiMessageEntry_channel = new WeakMap();
class BidiServer extends EventEmitter_1$1.EventEmitter {
    constructor(_transport) {
        super();
        this._transport = _transport;
        _BidiServer_instances.add(this);
        _BidiServer_messageQueue.set(this, void 0);
        _BidiServer_onBidiMessage.set(this, (messageStr) => __awaiter$4(this, void 0, void 0, function* () {
            logBidi('received < ' + messageStr);
            let messageObj;
            try {
                messageObj = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_parseBidiMessage).call(BidiServer, messageStr);
            }
            catch (e) {
                // Transport-level error does not provide channel.
                __classPrivateFieldGet$6(this, _BidiServer_instances, "m", _BidiServer_respondWithError).call(this, messageStr, 'invalid argument', e.message, null);
                return;
            }
            this.emit('message', messageObj);
        }));
        __classPrivateFieldSet$6(this, _BidiServer_messageQueue, new processingQueue_1.ProcessingQueue((m) => __classPrivateFieldGet$6(this, _BidiServer_instances, "m", _BidiServer_sendMessage).call(this, m)), "f");
        this._transport.setOnMessage(__classPrivateFieldGet$6(this, _BidiServer_onBidiMessage, "f"));
    }
    /**
     * Sends BiDi message.
     */
    sendMessage(messageEntry) {
        // messageEntry.then((m) => this.#sendMessage(m));
        __classPrivateFieldGet$6(this, _BidiServer_messageQueue, "f").add(messageEntry);
    }
    close() {
        this._transport.close();
    }
}
bidiServer.BidiServer = BidiServer;
_a$2 = BidiServer, _BidiServer_messageQueue = new WeakMap(), _BidiServer_onBidiMessage = new WeakMap(), _BidiServer_instances = new WeakSet(), _BidiServer_sendMessage = function _BidiServer_sendMessage(messageEntry) {
    return __awaiter$4(this, void 0, void 0, function* () {
        const message = messageEntry.message;
        if (messageEntry.channel !== null) {
            message['channel'] = messageEntry.channel;
        }
        const messageStr = JSON.stringify(message);
        logBidi('sent > ' + messageStr);
        yield this._transport.sendMessage(messageStr);
    });
}, _BidiServer_respondWithError = function _BidiServer_respondWithError(plainCommandData, errorCode, errorMessage, channel) {
    const errorResponse = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getErrorResponse).call(BidiServer, plainCommandData, errorCode, errorMessage);
    this.sendMessage(BiDiMessageEntry.createResolved(errorResponse, channel));
}, _BidiServer_getJsonType = function _BidiServer_getJsonType(value) {
    if (value === null) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    return typeof value;
}, _BidiServer_getErrorResponse = function _BidiServer_getErrorResponse(messageStr, errorCode, errorMessage) {
    // TODO: this is bizarre per spec. We reparse the payload and
    // extract the ID, regardless of what kind of value it was.
    let messageId = undefined;
    try {
        const messageObj = JSON.parse(messageStr);
        if (__classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, messageObj) === 'object' &&
            'id' in messageObj) {
            messageId = messageObj.id;
        }
    }
    catch (_b) { }
    return {
        id: messageId,
        error: errorCode,
        message: errorMessage,
        // TODO: optional stacktrace field.
    };
}, _BidiServer_parseBidiMessage = function _BidiServer_parseBidiMessage(messageStr) {
    let messageObj;
    try {
        messageObj = JSON.parse(messageStr);
    }
    catch (_b) {
        throw new Error('Cannot parse data as JSON');
    }
    const parsedType = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, messageObj);
    if (parsedType !== 'object') {
        throw new Error(`Expected JSON object but got ${parsedType}`);
    }
    // Extract amd validate id, method and params.
    const { id, method, params } = messageObj;
    const idType = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, id);
    if (idType !== 'number' || !Number.isInteger(id) || id < 0) {
        // TODO: should uint64_t be the upper limit?
        // https://tools.ietf.org/html/rfc7049#section-2.1
        throw new Error(`Expected unsigned integer but got ${idType}`);
    }
    const methodType = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, method);
    if (methodType !== 'string') {
        throw new Error(`Expected string method but got ${methodType}`);
    }
    const paramsType = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, params);
    if (paramsType !== 'object') {
        throw new Error(`Expected object params but got ${paramsType}`);
    }
    let channel = messageObj.channel;
    if (channel !== undefined) {
        const channelType = __classPrivateFieldGet$6(BidiServer, _a$2, "m", _BidiServer_getJsonType).call(BidiServer, channel);
        if (channelType !== 'string') {
            throw new Error(`Expected string channel but got ${channelType}`);
        }
        // Empty string channel is considered as no channel provided.
        if (channel === '') {
            channel = undefined;
        }
    }
    return { id, method, params, channel };
};

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
var __awaiter$3 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CommandProcessor_instances, _CommandProcessor_contextProcessor, _CommandProcessor_bidiServer, _CommandProcessor_eventManager, _CommandProcessor_run, _CommandProcessor_process_session_status, _CommandProcessor_process_session_subscribe, _CommandProcessor_process_session_unsubscribe, _CommandProcessor_processCommand, _CommandProcessor_onBidiMessage;
Object.defineProperty(commandProcessor, "__esModule", { value: true });
commandProcessor.CommandProcessor = void 0;
const browsingContextProcessor_1 = browsingContextProcessor;
const bidiProtocolTypes_1 = bidiProtocolTypes;
const bidiServer_1$1 = bidiServer;
const error_1 = error;
class CommandProcessor {
    static run(cdpConnection, bidiServer, eventManager, selfTargetId) {
        const commandProcessor = new CommandProcessor(cdpConnection, bidiServer, eventManager, selfTargetId);
        __classPrivateFieldGet$5(commandProcessor, _CommandProcessor_instances, "m", _CommandProcessor_run).call(commandProcessor);
    }
    constructor(cdpConnection, bidiServer, eventManager, selfTargetId) {
        _CommandProcessor_instances.add(this);
        _CommandProcessor_contextProcessor.set(this, void 0);
        _CommandProcessor_bidiServer.set(this, void 0);
        _CommandProcessor_eventManager.set(this, void 0);
        _CommandProcessor_onBidiMessage.set(this, (command) => __awaiter$3(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const result = yield __classPrivateFieldGet$5(this, _CommandProcessor_instances, "m", _CommandProcessor_processCommand).call(this, command);
                const response = Object.assign({ id: command.id }, result);
                yield __classPrivateFieldGet$5(this, _CommandProcessor_bidiServer, "f").sendMessage(bidiServer_1$1.BiDiMessageEntry.createResolved(response, (_a = command.channel) !== null && _a !== void 0 ? _a : null));
            }
            catch (e) {
                if (e instanceof error_1.ErrorResponseClass) {
                    const errorResponse = e;
                    yield __classPrivateFieldGet$5(this, _CommandProcessor_bidiServer, "f").sendMessage(bidiServer_1$1.BiDiMessageEntry.createResolved(errorResponse.toErrorResponse(command.id), (_b = command.channel) !== null && _b !== void 0 ? _b : null));
                }
                else {
                    const error = e;
                    console.error(error);
                    yield __classPrivateFieldGet$5(this, _CommandProcessor_bidiServer, "f").sendMessage(bidiServer_1$1.BiDiMessageEntry.createResolved(new error_1.UnknownException(error.message).toErrorResponse(command.id), (_c = command.channel) !== null && _c !== void 0 ? _c : null));
                }
            }
        }));
        __classPrivateFieldSet$5(this, _CommandProcessor_eventManager, eventManager, "f");
        __classPrivateFieldSet$5(this, _CommandProcessor_bidiServer, bidiServer, "f");
        __classPrivateFieldSet$5(this, _CommandProcessor_contextProcessor, new browsingContextProcessor_1.BrowsingContextProcessor(cdpConnection, selfTargetId, eventManager), "f");
    }
}
commandProcessor.CommandProcessor = CommandProcessor;
_CommandProcessor_contextProcessor = new WeakMap(), _CommandProcessor_bidiServer = new WeakMap(), _CommandProcessor_eventManager = new WeakMap(), _CommandProcessor_onBidiMessage = new WeakMap(), _CommandProcessor_instances = new WeakSet(), _CommandProcessor_run = function _CommandProcessor_run() {
    __classPrivateFieldGet$5(this, _CommandProcessor_bidiServer, "f").on('message', (messageObj) => {
        return __classPrivateFieldGet$5(this, _CommandProcessor_onBidiMessage, "f").call(this, messageObj);
    });
}, _CommandProcessor_process_session_status = function _CommandProcessor_process_session_status() {
    return __awaiter$3(this, void 0, void 0, function* () {
        return { result: { ready: false, message: 'already connected' } };
    });
}, _CommandProcessor_process_session_subscribe = function _CommandProcessor_process_session_subscribe(params, channel) {
    var _a;
    return __awaiter$3(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet$5(this, _CommandProcessor_eventManager, "f").subscribe(params.events, (_a = params.contexts) !== null && _a !== void 0 ? _a : [null], channel);
        return { result: {} };
    });
}, _CommandProcessor_process_session_unsubscribe = function _CommandProcessor_process_session_unsubscribe(params, channel) {
    var _a;
    return __awaiter$3(this, void 0, void 0, function* () {
        yield __classPrivateFieldGet$5(this, _CommandProcessor_eventManager, "f").unsubscribe(params.events, (_a = params.contexts) !== null && _a !== void 0 ? _a : [null], channel);
        return { result: {} };
    });
}, _CommandProcessor_processCommand = function _CommandProcessor_processCommand(commandData) {
    var _a, _b;
    return __awaiter$3(this, void 0, void 0, function* () {
        switch (commandData.method) {
            case 'session.status':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_instances, "m", _CommandProcessor_process_session_status).call(this);
            case 'session.subscribe':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_instances, "m", _CommandProcessor_process_session_subscribe).call(this, bidiProtocolTypes_1.Session.parseSubscribeParams(commandData.params), (_a = commandData.channel) !== null && _a !== void 0 ? _a : null);
            case 'session.unsubscribe':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_instances, "m", _CommandProcessor_process_session_unsubscribe).call(this, bidiProtocolTypes_1.Session.parseSubscribeParams(commandData.params), (_b = commandData.channel) !== null && _b !== void 0 ? _b : null);
            case 'browsingContext.create':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_browsingContext_create(bidiProtocolTypes_1.BrowsingContext.parseCreateParams(commandData.params));
            case 'browsingContext.close':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_browsingContext_close(bidiProtocolTypes_1.BrowsingContext.parseCloseParams(commandData.params));
            case 'browsingContext.getTree':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_browsingContext_getTree(bidiProtocolTypes_1.BrowsingContext.parseGetTreeParams(commandData.params));
            case 'browsingContext.navigate':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_browsingContext_navigate(bidiProtocolTypes_1.BrowsingContext.parseNavigateParams(commandData.params));
            case 'script.getRealms':
                return __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_script_getRealms(bidiProtocolTypes_1.Script.parseGetRealmsParams(commandData.params));
            case 'script.callFunction':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_script_callFunction(bidiProtocolTypes_1.Script.parseCallFunctionParams(commandData.params));
            case 'script.evaluate':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_script_evaluate(bidiProtocolTypes_1.Script.parseEvaluateParams(commandData.params));
            case 'script.disown':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_script_disown(bidiProtocolTypes_1.Script.parseDisownParams(commandData.params));
            case 'PROTO.browsingContext.findElement':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_PROTO_browsingContext_findElement(bidiProtocolTypes_1.BrowsingContext.PROTO.parseFindElementParams(commandData.params));
            case 'cdp.sendCommand':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_cdp_sendCommand(bidiProtocolTypes_1.CDP.parseSendCommandParams(commandData.params));
            case 'cdp.getSession':
                return yield __classPrivateFieldGet$5(this, _CommandProcessor_contextProcessor, "f").process_cdp_getSession(bidiProtocolTypes_1.CDP.parseGetSessionParams(commandData.params));
            default:
                throw new error_1.UnknownCommandException(`Unknown command '${commandData.method}'.`);
        }
    });
};

var typeHelper = {};

Object.defineProperty(typeHelper, "__esModule", { value: true });
typeHelper.TypeHelper = void 0;
class TypeHelper {
    static isString(candidate) {
        return typeof candidate === 'string' || candidate instanceof String;
    }
}
typeHelper.TypeHelper = TypeHelper;

var cdp = {};

var cdpClient = {};

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
Object.defineProperty(cdpClient, "__esModule", { value: true });
cdpClient.createClient = cdpClient.CdpClient = void 0;
const EventEmitter_1 = EventEmitter$1;
class CdpClient extends EventEmitter_1.EventEmitter {
    constructor(_cdpConnection, _sessionId) {
        super();
        this._cdpConnection = _cdpConnection;
        this._sessionId = _sessionId;
    }
    /**
     * Returns command promise, which will be resolved wth the command result after receiving CDP result.
     * @param method Name of the CDP command to call.
     * @param params Parameters to pass to the CDP command.
     */
    sendCommand(method, ...params) {
        const param = params[0];
        return this._cdpConnection.sendCommand(method, param, this._sessionId);
    }
}
cdpClient.CdpClient = CdpClient;
/**
 * Creates a new CDP client object that communicates with the browser using a given
 * transport mechanism.
 * @param transport A transport object that will be used to send and receive raw CDP messages.
 * @returns A connected CDP client object.
 */
function createClient(cdpConnection, sessionId) {
    return new CdpClient(cdpConnection, sessionId);
}
cdpClient.createClient = createClient;

var cdpConnection = {};

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
var __awaiter$2 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CdpConnection_transport, _CdpConnection_browserCdpClient, _CdpConnection_sessionCdpClients, _CdpConnection_commandCallbacks, _CdpConnection_log, _CdpConnection_nextId;
Object.defineProperty(cdpConnection, "__esModule", { value: true });
cdpConnection.CdpConnection = void 0;
const cdpClient_1 = cdpClient;
/**
 * Represents a high-level CDP connection to the browser backend.
 * Manages a CdpClient instance for each active CDP session.
 */
class CdpConnection {
    constructor(transport, logCdp = () => { }) {
        _CdpConnection_transport.set(this, void 0);
        _CdpConnection_browserCdpClient.set(this, void 0);
        _CdpConnection_sessionCdpClients.set(this, new Map());
        _CdpConnection_commandCallbacks.set(this, new Map());
        _CdpConnection_log.set(this, void 0);
        _CdpConnection_nextId.set(this, 0);
        this._onMessage = (message) => __awaiter$2(this, void 0, void 0, function* () {
            __classPrivateFieldGet$4(this, _CdpConnection_log, "f").call(this, 'received < ' + message);
            const parsed = JSON.parse(message);
            // Update client map if a session is attached or detached.
            // Listen for these events on every session.
            if (parsed.method === 'Target.attachedToTarget') {
                const { sessionId } = parsed.params;
                __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").set(sessionId, (0, cdpClient_1.createClient)(this, sessionId));
            }
            else if (parsed.method === 'Target.detachedFromTarget') {
                const { sessionId } = parsed.params;
                const client = __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").get(sessionId);
                if (client) {
                    __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").delete(sessionId);
                }
            }
            if (parsed.id !== undefined) {
                // Handle command response.
                const callbacks = __classPrivateFieldGet$4(this, _CdpConnection_commandCallbacks, "f").get(parsed.id);
                if (callbacks) {
                    if (parsed.result) {
                        callbacks.resolve(parsed.result);
                    }
                    else if (parsed.error) {
                        callbacks.reject(parsed.error);
                    }
                }
            }
            else if (parsed.method) {
                const client = parsed.sessionId
                    ? __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").get(parsed.sessionId)
                    : __classPrivateFieldGet$4(this, _CdpConnection_browserCdpClient, "f");
                if (client) {
                    client.emit(parsed.method, parsed.params || {});
                }
            }
        });
        __classPrivateFieldSet$4(this, _CdpConnection_transport, transport, "f");
        __classPrivateFieldSet$4(this, _CdpConnection_log, logCdp, "f");
        __classPrivateFieldGet$4(this, _CdpConnection_transport, "f").setOnMessage(this._onMessage);
        __classPrivateFieldSet$4(this, _CdpConnection_browserCdpClient, (0, cdpClient_1.createClient)(this, null), "f");
    }
    /**
     * Close the connection to the browser.
     */
    close() {
        __classPrivateFieldGet$4(this, _CdpConnection_transport, "f").close();
        for (const [_id, { reject }] of __classPrivateFieldGet$4(this, _CdpConnection_commandCallbacks, "f")) {
            reject(new Error('Disconnected'));
        }
        __classPrivateFieldGet$4(this, _CdpConnection_commandCallbacks, "f").clear();
        __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").clear();
    }
    /**
     * @returns The CdpClient object attached to the root browser session.
     */
    browserClient() {
        return __classPrivateFieldGet$4(this, _CdpConnection_browserCdpClient, "f");
    }
    /**
     * Get a CdpClient instance by sessionId.
     * @param sessionId The sessionId of the CdpClient to retrieve.
     * @returns The CdpClient object attached to the given session, or null if the session is not attached.
     */
    getCdpClient(sessionId) {
        const cdpClient = __classPrivateFieldGet$4(this, _CdpConnection_sessionCdpClients, "f").get(sessionId);
        if (!cdpClient) {
            throw new Error('Unknown CDP session ID');
        }
        return cdpClient;
    }
    sendCommand(method, params, sessionId) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            const id = (__classPrivateFieldSet$4(this, _CdpConnection_nextId, (_b = __classPrivateFieldGet$4(this, _CdpConnection_nextId, "f"), _a = _b++, _b), "f"), _a);
            __classPrivateFieldGet$4(this, _CdpConnection_commandCallbacks, "f").set(id, { resolve, reject });
            let messageObj = { id, method, params };
            if (sessionId) {
                messageObj.sessionId = sessionId;
            }
            const messageStr = JSON.stringify(messageObj);
            __classPrivateFieldGet$4(this, _CdpConnection_transport, "f").sendMessage(messageStr);
            __classPrivateFieldGet$4(this, _CdpConnection_log, "f").call(this, 'sent > ' + messageStr);
        });
    }
}
cdpConnection.CdpConnection = CdpConnection;
_CdpConnection_transport = new WeakMap(), _CdpConnection_browserCdpClient = new WeakMap(), _CdpConnection_sessionCdpClients = new WeakMap(), _CdpConnection_commandCallbacks = new WeakMap(), _CdpConnection_log = new WeakMap(), _CdpConnection_nextId = new WeakMap();

var websocketTransport = {};

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
var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(websocketTransport, "__esModule", { value: true });
websocketTransport.WebSocketTransport = void 0;
class WebSocketTransport {
    constructor(_ws) {
        this._ws = _ws;
        this._onMessage = null;
        this._ws.on('message', (message) => {
            if (this._onMessage) {
                this._onMessage.call(null, message);
            }
        });
    }
    setOnMessage(onMessage) {
        this._onMessage = onMessage;
    }
    sendMessage(message) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this._ws.send(message);
        });
    }
    close() {
        this._onMessage = null;
        this._ws.close();
    }
}
websocketTransport.WebSocketTransport = WebSocketTransport;

(function (exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebSocketTransport = exports.CdpConnection = exports.CdpClient = void 0;
	var cdpClient_1 = cdpClient;
	Object.defineProperty(exports, "CdpClient", { enumerable: true, get: function () { return cdpClient_1.CdpClient; } });
	var cdpConnection_1 = cdpConnection;
	Object.defineProperty(exports, "CdpConnection", { enumerable: true, get: function () { return cdpConnection_1.CdpConnection; } });
	var websocketTransport_1 = websocketTransport;
	Object.defineProperty(exports, "WebSocketTransport", { enumerable: true, get: function () { return websocketTransport_1.WebSocketTransport; } });
	
} (cdp));

var transport = {};

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
Object.defineProperty(transport, "__esModule", { value: true });

var EventManager$1 = {};

var SubscriptionManager$1 = {};

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
var __classPrivateFieldGet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SubscriptionManager_instances, _SubscriptionManager_subscriptionPriority, _SubscriptionManager_channelToContextToEventMap, _SubscriptionManager_getEventSubscriptionPriorityForChannel;
Object.defineProperty(SubscriptionManager$1, "__esModule", { value: true });
SubscriptionManager$1.SubscriptionManager = void 0;
class SubscriptionManager {
    constructor() {
        _SubscriptionManager_instances.add(this);
        _SubscriptionManager_subscriptionPriority.set(this, 0);
        // BrowsingContext `null` means the event has subscription across all the
        // browsing contexts.
        // Channel `null` means no `channel` should be added.
        _SubscriptionManager_channelToContextToEventMap.set(this, new Map());
    }
    getChannelsSubscribedToEvent(eventMethod, contextId) {
        const prioritiesAndChannels = Array.from(__classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").keys())
            .map((channel) => ({
            priority: __classPrivateFieldGet$3(this, _SubscriptionManager_instances, "m", _SubscriptionManager_getEventSubscriptionPriorityForChannel).call(this, eventMethod, contextId, channel),
            channel,
        }))
            .filter(({ priority }) => priority !== null);
        // Sort channels by priority.
        return prioritiesAndChannels
            .sort((a, b) => a.priority - b.priority)
            .map(({ channel }) => channel);
    }
    subscribe(event, contextId, channel) {
        var _a, _b;
        if (!__classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").has(channel)) {
            __classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").set(channel, new Map());
        }
        const contextToEventMap = __classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").get(channel);
        if (!contextToEventMap.has(contextId)) {
            contextToEventMap.set(contextId, new Map());
        }
        const eventMap = contextToEventMap.get(contextId);
        // Do not re-subscribe to events to keep the priority.
        if (eventMap.has(event)) {
            return;
        }
        eventMap.set(event, (__classPrivateFieldSet$3(this, _SubscriptionManager_subscriptionPriority, (_b = __classPrivateFieldGet$3(this, _SubscriptionManager_subscriptionPriority, "f"), _a = _b++, _b), "f"), _a));
    }
    unsubscribe(event, contextId, channel) {
        if (!__classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").has(channel)) {
            return;
        }
        const contextToEventMap = __classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").get(channel);
        if (!contextToEventMap.has(contextId)) {
            return;
        }
        const eventMap = contextToEventMap.get(contextId);
        eventMap.delete(event);
        // Clean up maps if empty.
        if (eventMap.size === 0) {
            contextToEventMap.delete(event);
        }
        if (contextToEventMap.size === 0) {
            __classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").delete(channel);
        }
    }
}
SubscriptionManager$1.SubscriptionManager = SubscriptionManager;
_SubscriptionManager_subscriptionPriority = new WeakMap(), _SubscriptionManager_channelToContextToEventMap = new WeakMap(), _SubscriptionManager_instances = new WeakSet(), _SubscriptionManager_getEventSubscriptionPriorityForChannel = function _SubscriptionManager_getEventSubscriptionPriorityForChannel(eventMethod, contextId, channel) {
    var _a, _b;
    const contextToEventMap = __classPrivateFieldGet$3(this, _SubscriptionManager_channelToContextToEventMap, "f").get(channel);
    if (contextToEventMap === undefined) {
        return null;
    }
    // Get all the subscription priorities.
    let priorities = [
        (_a = contextToEventMap.get(null)) === null || _a === void 0 ? void 0 : _a.get(eventMethod),
        (_b = contextToEventMap.get(contextId)) === null || _b === void 0 ? void 0 : _b.get(eventMethod),
    ].filter((p) => p !== undefined);
    if (priorities.length === 0) {
        // Not subscribed, return null.
        return null;
    }
    // Return minimal priority.
    return Math.min(...priorities);
};

var idWrapper = {};

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
var __classPrivateFieldGet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a$1, _IdWrapper_counter, _IdWrapper_id;
Object.defineProperty(idWrapper, "__esModule", { value: true });
idWrapper.IdWrapper = void 0;
/**
 * Creates an object with a positive unique incrementing id.
 */
class IdWrapper {
    constructor() {
        var _b, _c;
        _IdWrapper_id.set(this, void 0);
        __classPrivateFieldSet$2(this, _IdWrapper_id, __classPrivateFieldSet$2(_b = IdWrapper, _a$1, (_c = __classPrivateFieldGet$2(_b, _a$1, "f", _IdWrapper_counter), ++_c), "f", _IdWrapper_counter), "f");
    }
    get id() {
        return __classPrivateFieldGet$2(this, _IdWrapper_id, "f");
    }
}
idWrapper.IdWrapper = IdWrapper;
_a$1 = IdWrapper, _IdWrapper_id = new WeakMap();
_IdWrapper_counter = { value: 0 };

var buffer = {};

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
var __classPrivateFieldSet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Buffer_capacity, _Buffer_entries, _Buffer_onItemRemoved;
Object.defineProperty(buffer, "__esModule", { value: true });
buffer.Buffer = void 0;
/**
 * Implements a FIFO buffer with a fixed size.
 */
class Buffer {
    /**
     * @param capacity
     * @param onItemRemoved optional delegate called for each removed element.
     */
    constructor(capacity, onItemRemoved = () => { }) {
        _Buffer_capacity.set(this, void 0);
        _Buffer_entries.set(this, []);
        _Buffer_onItemRemoved.set(this, void 0);
        __classPrivateFieldSet$1(this, _Buffer_capacity, capacity, "f");
        __classPrivateFieldSet$1(this, _Buffer_onItemRemoved, onItemRemoved, "f");
    }
    get() {
        return __classPrivateFieldGet$1(this, _Buffer_entries, "f");
    }
    add(value) {
        __classPrivateFieldGet$1(this, _Buffer_entries, "f").push(value);
        while (__classPrivateFieldGet$1(this, _Buffer_entries, "f").length > __classPrivateFieldGet$1(this, _Buffer_capacity, "f")) {
            const item = __classPrivateFieldGet$1(this, _Buffer_entries, "f").shift();
            if (item !== undefined) {
                __classPrivateFieldGet$1(this, _Buffer_onItemRemoved, "f").call(this, item);
            }
        }
    }
}
buffer.Buffer = Buffer;
_Buffer_capacity = new WeakMap(), _Buffer_entries = new WeakMap(), _Buffer_onItemRemoved = new WeakMap();

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
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventWrapper_contextId, _EventWrapper_event, _EventManager_instances, _a, _EventManager_eventBufferLength, _EventManager_eventToContextsMap, _EventManager_eventBuffers, _EventManager_lastMessageSent, _EventManager_subscriptionManager, _EventManager_bidiServer, _EventManager_getMapKey, _EventManager_bufferEvent, _EventManager_markEventSent, _EventManager_getBufferedEvents;
Object.defineProperty(EventManager$1, "__esModule", { value: true });
EventManager$1.EventManager = void 0;
const bidiServer_1 = bidiServer;
const SubscriptionManager_1 = SubscriptionManager$1;
const idWrapper_1 = idWrapper;
const buffer_1 = buffer;
const browsingContextStorage_1 = browsingContextStorage;
class EventWrapper extends idWrapper_1.IdWrapper {
    constructor(event, contextId) {
        super();
        _EventWrapper_contextId.set(this, void 0);
        _EventWrapper_event.set(this, void 0);
        __classPrivateFieldSet(this, _EventWrapper_contextId, contextId, "f");
        __classPrivateFieldSet(this, _EventWrapper_event, event, "f");
    }
    get contextId() {
        return __classPrivateFieldGet(this, _EventWrapper_contextId, "f");
    }
    get event() {
        return __classPrivateFieldGet(this, _EventWrapper_event, "f");
    }
}
_EventWrapper_contextId = new WeakMap(), _EventWrapper_event = new WeakMap();
class EventManager {
    constructor(bidiServer) {
        _EventManager_instances.add(this);
        /**
         * Maps event name to a set of contexts where this event already happened.
         * Needed for getting buffered events from all the contexts in case of
         * subscripting to all contexts.
         */
        _EventManager_eventToContextsMap.set(this, new Map());
        /**
         * Maps `eventName` + `browsingContext` to buffer. Used to get buffered events
         * during subscription. Channel-agnostic.
         */
        _EventManager_eventBuffers.set(this, new Map());
        /**
         * Maps `eventName` + `browsingContext` + `channel` to last sent event id.
         * Used to avoid sending duplicated events when user
         * subscribes -> unsubscribes -> subscribes.
         */
        _EventManager_lastMessageSent.set(this, new Map());
        _EventManager_subscriptionManager.set(this, void 0);
        _EventManager_bidiServer.set(this, void 0);
        __classPrivateFieldSet(this, _EventManager_bidiServer, bidiServer, "f");
        __classPrivateFieldSet(this, _EventManager_subscriptionManager, new SubscriptionManager_1.SubscriptionManager(), "f");
    }
    registerEvent(event, contextId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerPromiseEvent(Promise.resolve(event), contextId, event.method);
        });
    }
    registerPromiseEvent(event, contextId, eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventWrapper = new EventWrapper(event, contextId);
            const sortedChannels = __classPrivateFieldGet(this, _EventManager_subscriptionManager, "f").getChannelsSubscribedToEvent(eventName, contextId);
            __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_bufferEvent).call(this, eventWrapper, eventName);
            // Send events to channels in the subscription priority.
            for (const channel of sortedChannels) {
                yield __classPrivateFieldGet(this, _EventManager_bidiServer, "f").sendMessage(bidiServer_1.BiDiMessageEntry.createFromPromise(event, channel));
                __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_markEventSent).call(this, eventWrapper, channel, eventName);
            }
        });
    }
    subscribe(eventNames, contextIds, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let eventName of eventNames) {
                for (let contextId of contextIds) {
                    if (contextId !== null &&
                        !browsingContextStorage_1.BrowsingContextStorage.hasKnownContext(contextId)) {
                        // Unknown context. Do nothing.
                        continue;
                    }
                    __classPrivateFieldGet(this, _EventManager_subscriptionManager, "f").subscribe(eventName, contextId, channel);
                    for (let eventWrapper of __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_getBufferedEvents).call(this, eventName, contextId, channel)) {
                        // The order of the events is important.
                        yield __classPrivateFieldGet(this, _EventManager_bidiServer, "f").sendMessage(bidiServer_1.BiDiMessageEntry.createFromPromise(eventWrapper.event, channel));
                        __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_markEventSent).call(this, eventWrapper, channel, eventName);
                    }
                }
            }
        });
    }
    unsubscribe(events, contextIds, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let event of events) {
                for (let contextId of contextIds) {
                    __classPrivateFieldGet(this, _EventManager_subscriptionManager, "f").unsubscribe(event, contextId, channel);
                }
            }
        });
    }
}
EventManager$1.EventManager = EventManager;
_a = EventManager, _EventManager_eventToContextsMap = new WeakMap(), _EventManager_eventBuffers = new WeakMap(), _EventManager_lastMessageSent = new WeakMap(), _EventManager_subscriptionManager = new WeakMap(), _EventManager_bidiServer = new WeakMap(), _EventManager_instances = new WeakSet(), _EventManager_getMapKey = function _EventManager_getMapKey(eventName, browsingContext, channel = undefined) {
    return JSON.stringify({ eventName, browsingContext, channel });
}, _EventManager_bufferEvent = function _EventManager_bufferEvent(eventWrapper, eventName) {
    if (!__classPrivateFieldGet(EventManager, _a, "f", _EventManager_eventBufferLength).has(eventName)) {
        // Do nothing if the event is no buffer-able.
        return;
    }
    const bufferMapKey = __classPrivateFieldGet(EventManager, _a, "m", _EventManager_getMapKey).call(EventManager, eventName, eventWrapper.contextId);
    if (!__classPrivateFieldGet(this, _EventManager_eventBuffers, "f").has(bufferMapKey)) {
        __classPrivateFieldGet(this, _EventManager_eventBuffers, "f").set(bufferMapKey, new buffer_1.Buffer(__classPrivateFieldGet(EventManager, _a, "f", _EventManager_eventBufferLength).get(eventName)));
    }
    __classPrivateFieldGet(this, _EventManager_eventBuffers, "f").get(bufferMapKey).add(eventWrapper);
    // Add the context to the list of contexts having `eventName` events.
    if (!__classPrivateFieldGet(this, _EventManager_eventToContextsMap, "f").has(eventName)) {
        __classPrivateFieldGet(this, _EventManager_eventToContextsMap, "f").set(eventName, new Set());
    }
    __classPrivateFieldGet(this, _EventManager_eventToContextsMap, "f").get(eventName).add(eventWrapper.contextId);
}, _EventManager_markEventSent = function _EventManager_markEventSent(eventWrapper, channel, eventName) {
    var _b;
    if (!__classPrivateFieldGet(EventManager, _a, "f", _EventManager_eventBufferLength).has(eventName)) {
        // Do nothing if the event is no buffer-able.
        return;
    }
    const lastSentMapKey = __classPrivateFieldGet(EventManager, _a, "m", _EventManager_getMapKey).call(EventManager, eventName, eventWrapper.contextId, channel);
    __classPrivateFieldGet(this, _EventManager_lastMessageSent, "f").set(lastSentMapKey, Math.max((_b = __classPrivateFieldGet(this, _EventManager_lastMessageSent, "f").get(lastSentMapKey)) !== null && _b !== void 0 ? _b : 0, eventWrapper.id));
}, _EventManager_getBufferedEvents = function _EventManager_getBufferedEvents(eventName, contextId, channel) {
    var _b, _c, _d, _e, _f;
    const bufferMapKey = __classPrivateFieldGet(EventManager, _a, "m", _EventManager_getMapKey).call(EventManager, eventName, contextId);
    const lastSentMapKey = __classPrivateFieldGet(EventManager, _a, "m", _EventManager_getMapKey).call(EventManager, eventName, contextId, channel);
    const lastSentMessageId = (_b = __classPrivateFieldGet(this, _EventManager_lastMessageSent, "f").get(lastSentMapKey)) !== null && _b !== void 0 ? _b : -Infinity;
    const result = (_d = (_c = __classPrivateFieldGet(this, _EventManager_eventBuffers, "f")
        .get(bufferMapKey)) === null || _c === void 0 ? void 0 : _c.get().filter((wrapper) => wrapper.id > lastSentMessageId)) !== null && _d !== void 0 ? _d : [];
    if (contextId === null) {
        // For global subscriptions, events buffered in each context should be sent back.
        Array.from((_f = (_e = __classPrivateFieldGet(this, _EventManager_eventToContextsMap, "f").get(eventName)) === null || _e === void 0 ? void 0 : _e.keys()) !== null && _f !== void 0 ? _f : [])
            // Events without context are already in the result.
            .filter((_contextId) => _contextId !== null)
            .map((_contextId) => __classPrivateFieldGet(this, _EventManager_instances, "m", _EventManager_getBufferedEvents).call(this, eventName, _contextId, channel))
            .forEach((events) => result.push(...events));
    }
    return result.sort((e1, e2) => e1.id - e2.id);
};
/**
 * Maps event name to a desired buffer length.
 */
_EventManager_eventBufferLength = { value: new Map([
        ['log.entryAdded', 100],
    ]) };

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(commandProcessor, exports);
	__exportStar(bidiServer, exports);
	__exportStar(typeHelper, exports);
	__exportStar(cdp, exports);
	__exportStar(transport, exports);
	__exportStar(EventManager$1, exports);
	
} (bidiMapper));

var index = /*@__PURE__*/getDefaultExportFromCjs(bidiMapper);

module.exports = index;
//# sourceMappingURL=mapper.js.map

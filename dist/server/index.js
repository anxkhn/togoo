globalThis.__VINEXT_LAZY_CHUNKS__ = ["assets/query-BbOc3VB2.js","assets/router-DKoeJs5I.js","assets/facade__virtual_vinext-rsc-entry-DQJMScnO.js"];
import * as __viteRscAsyncHooks from "node:async_hooks";
import { AsyncLocalStorage as AsyncLocalStorage$1 } from "node:async_hooks";
import assetsManifest from "./__vite_rsc_assets_manifest.js";
import { env } from "cloudflare:workers";
import { and, desc, eq, relations, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import "clsx";
import { z } from "zod";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/dist-rz-Bnebz.js
function tinyassert(value, message) {
	if (value) return;
	if (message instanceof Error) throw message;
	throw new TinyAssertionError(message, tinyassert);
}
var TinyAssertionError = class extends Error {
	constructor(message, stackStartFunction) {
		super(message ?? "TinyAssertionError");
		if (stackStartFunction && "captureStackTrace" in Error) Error.captureStackTrace(this, stackStartFunction);
	}
};
function safeFunctionCast(f) {
	return f;
}
function memoize(f, options) {
	const keyFn = options?.keyFn ?? ((...args) => args[0]);
	const cache = options?.cache ?? /* @__PURE__ */ new Map();
	return safeFunctionCast(function(...args) {
		const key = keyFn(...args);
		const value = cache.get(key);
		if (typeof value !== "undefined") return value;
		const newValue = f.apply(this, args);
		cache.set(key, newValue);
		return newValue;
	});
}
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/shared-BViDMJTQ.js
var SERVER_REFERENCE_PREFIX = "$$server:";
var SERVER_DECODE_CLIENT_PREFIX = "$$decode-client:";
function removeReferenceCacheTag(id) {
	return id.split("$$cache=")[0];
}
function setInternalRequire() {
	globalThis.__vite_rsc_require__ = (id) => {
		if (id.startsWith("$$server:")) {
			id = id.slice(9);
			return globalThis.__vite_rsc_server_require__(id);
		}
		return globalThis.__vite_rsc_client_require__(id);
	};
}
//#endregion
//#region node_modules/react/cjs/react.react-server.production.js
/**
* @license React
* react.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ReactSharedInternals = {
		H: null,
		A: null
	};
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var isArrayImpl = Array.isArray;
	function noop() {}
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error(formatProdErrorMessage(31, "[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array));
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	function createCacheRoot() {
		return /* @__PURE__ */ new WeakMap();
	}
	function createCacheNode() {
		return {
			s: 0,
			v: void 0,
			o: null,
			p: null
		};
	}
	exports.Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
			return children;
		}
	};
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.cache = function(fn) {
		return function() {
			var dispatcher = ReactSharedInternals.A;
			if (!dispatcher) return fn.apply(null, arguments);
			var fnMap = dispatcher.getCacheForType(createCacheRoot);
			dispatcher = fnMap.get(fn);
			void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
			fnMap = 0;
			for (var l = arguments.length; fnMap < l; fnMap++) {
				var arg = arguments[fnMap];
				if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
					var objectCache = dispatcher.o;
					null === objectCache && (dispatcher.o = objectCache = /* @__PURE__ */ new WeakMap());
					dispatcher = objectCache.get(arg);
					void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
				} else objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = /* @__PURE__ */ new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
			}
			if (1 === dispatcher.s) return dispatcher.v;
			if (2 === dispatcher.s) throw dispatcher.v;
			try {
				var result = fn.apply(null, arguments);
				fnMap = dispatcher;
				fnMap.s = 1;
				return fnMap.v = result;
			} catch (error) {
				throw result = dispatcher, result.s = 2, result.v = error, error;
			}
		};
	};
	exports.cacheSignal = function() {
		var dispatcher = ReactSharedInternals.A;
		return dispatcher ? dispatcher.cacheSignal() : null;
	};
	exports.captureOwnerStack = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error(formatProdErrorMessage(267, element));
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useDebugValue = function() {};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.version = "19.2.5";
}));
//#endregion
//#region node_modules/react/react.react-server.js
var require_react_react_server = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_react_server_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.react-server.production.js
/**
* @license React
* react-dom.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react_react_server();
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.version = "19.2.5";
}));
//#endregion
//#region node_modules/react-dom/react-dom.react-server.js
var require_react_dom_react_server = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_dom_react_server_production();
}));
//#endregion
//#region node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js
var require_react_server_dom_webpack_server_edge_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	globalThis.AsyncLocalStorage = __viteRscAsyncHooks.AsyncLocalStorage;
	var ReactDOM = require_react_dom_react_server(), React = require_react_react_server(), REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ASYNC_ITERATOR = Symbol.asyncIterator;
	function handleErrorInNextTick(error) {
		setTimeout(function() {
			throw error;
		});
	}
	var LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
		LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
	}, currentView = null, writtenBytes = 0;
	function writeChunkAndReturn(destination, chunk) {
		if (0 !== chunk.byteLength) if (2048 < chunk.byteLength) 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
		else {
			var allowableBytes = currentView.length - writtenBytes;
			allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
			currentView.set(chunk, writtenBytes);
			writtenBytes += chunk.byteLength;
		}
		return !0;
	}
	var textEncoder = new TextEncoder();
	function stringToChunk(content) {
		return textEncoder.encode(content);
	}
	function byteLengthOfChunk(chunk) {
		return chunk.byteLength;
	}
	function closeWithError(destination, error) {
		"function" === typeof destination.error ? destination.error(error) : destination.close();
	}
	var CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
	function registerClientReferenceImpl(proxyImplementation, id, async) {
		return Object.defineProperties(proxyImplementation, {
			$$typeof: { value: CLIENT_REFERENCE_TAG$1 },
			$$id: { value: id },
			$$async: { value: async }
		});
	}
	var FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice;
	function bind() {
		var newFn = FunctionBind.apply(this, arguments);
		if (this.$$typeof === SERVER_REFERENCE_TAG) {
			var args = ArraySlice.call(arguments, 1), $$typeof = { value: SERVER_REFERENCE_TAG }, $$id = { value: this.$$id };
			args = { value: this.$$bound ? this.$$bound.concat(args) : args };
			return Object.defineProperties(newFn, {
				$$typeof,
				$$id,
				$$bound: args,
				bind: {
					value: bind,
					configurable: !0
				}
			});
		}
		return newFn;
	}
	var serverReferenceToString = {
		value: function() {
			return "function () { [omitted code] }";
		},
		configurable: !0,
		writable: !0
	}, PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
		get: function(target, name) {
			switch (name) {
				case "$$typeof": return target.$$typeof;
				case "$$id": return target.$$id;
				case "$$async": return target.$$async;
				case "name": return target.name;
				case "displayName": return;
				case "defaultProps": return;
				case "_debugInfo": return;
				case "toJSON": return;
				case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
				case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
				case "Provider": throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
				case "then": throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
			}
			throw Error("Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
		},
		set: function() {
			throw Error("Cannot assign to a client module from a server module.");
		}
	};
	function getReference(target, name) {
		switch (name) {
			case "$$typeof": return target.$$typeof;
			case "$$id": return target.$$id;
			case "$$async": return target.$$async;
			case "name": return target.name;
			case "defaultProps": return;
			case "_debugInfo": return;
			case "toJSON": return;
			case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
			case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
			case "__esModule":
				var moduleId = target.$$id;
				target.default = registerClientReferenceImpl(function() {
					throw Error("Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
				}, target.$$id + "#", target.$$async);
				return !0;
			case "then":
				if (target.then) return target.then;
				if (target.$$async) return;
				var clientReference = registerClientReferenceImpl({}, target.$$id, !0), proxy = new Proxy(clientReference, proxyHandlers$1);
				target.status = "fulfilled";
				target.value = proxy;
				return target.then = registerClientReferenceImpl(function(resolve) {
					return Promise.resolve(resolve(proxy));
				}, target.$$id + "#then", !1);
		}
		if ("symbol" === typeof name) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
		clientReference = target[name];
		clientReference || (clientReference = registerClientReferenceImpl(function() {
			throw Error("Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
		}, target.$$id + "#" + name, target.$$async), Object.defineProperty(clientReference, "name", { value: name }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
		return clientReference;
	}
	var proxyHandlers$1 = {
		get: function(target, name) {
			return getReference(target, name);
		},
		getOwnPropertyDescriptor: function(target, name) {
			var descriptor = Object.getOwnPropertyDescriptor(target, name);
			descriptor || (descriptor = {
				value: getReference(target, name),
				writable: !1,
				configurable: !1,
				enumerable: !1
			}, Object.defineProperty(target, name, descriptor));
			return descriptor;
		},
		getPrototypeOf: function() {
			return PROMISE_PROTOTYPE;
		},
		set: function() {
			throw Error("Cannot assign to a client module from a server module.");
		}
	}, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
	ReactDOMSharedInternals.d = {
		f: previousDispatcher.f,
		r: previousDispatcher.r,
		D: prefetchDNS,
		C: preconnect,
		L: preload,
		m: preloadModule$1,
		X: preinitScript,
		S: preinitStyle,
		M: preinitModuleScript
	};
	function prefetchDNS(href) {
		if ("string" === typeof href && href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "D|" + href;
				hints.has(key) || (hints.add(key), emitHint(request, "D", href));
			} else previousDispatcher.D(href);
		}
	}
	function preconnect(href, crossOrigin) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
				hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [href, crossOrigin]) : emitHint(request, "C", href));
			} else previousDispatcher.C(href, crossOrigin);
		}
	}
	function preload(href, as, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "L";
				if ("image" === as && options) {
					var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
					"string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
					key += "[image]" + uniquePart;
				} else key += "[" + as + "]" + href;
				hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [
					href,
					as,
					options
				]) : emitHint(request, "L", [href, as]));
			} else previousDispatcher.L(href, as, options);
		}
	}
	function preloadModule$1(href, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "m|" + href;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "m", [href, options]) : emitHint(request, "m", href);
			}
			previousDispatcher.m(href, options);
		}
	}
	function preinitStyle(href, precedence, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "S|" + href;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "S", [
					href,
					"string" === typeof precedence ? precedence : 0,
					options
				]) : "string" === typeof precedence ? emitHint(request, "S", [href, precedence]) : emitHint(request, "S", href);
			}
			previousDispatcher.S(href, precedence, options);
		}
	}
	function preinitScript(src, options) {
		if ("string" === typeof src) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "X|" + src;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "X", [src, options]) : emitHint(request, "X", src);
			}
			previousDispatcher.X(src, options);
		}
	}
	function preinitModuleScript(src, options) {
		if ("string" === typeof src) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "M|" + src;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "M", [src, options]) : emitHint(request, "M", src);
			}
			previousDispatcher.M(src, options);
		}
	}
	function trimOptions(options) {
		if (null == options) return null;
		var hasProperties = !1, trimmed = {}, key;
		for (key in options) null != options[key] && (hasProperties = !0, trimmed[key] = options[key]);
		return hasProperties ? trimmed : null;
	}
	function getChildFormatContext(parentContext, type, props) {
		switch (type) {
			case "img":
				type = props.src;
				var srcSet = props.srcSet;
				if (!("lazy" === props.loading || !type && !srcSet || "string" !== typeof type && null != type || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || parentContext & 3) && ("string" !== typeof type || ":" !== type[4] || "d" !== type[0] && "D" !== type[0] || "a" !== type[1] && "A" !== type[1] || "t" !== type[2] && "T" !== type[2] || "a" !== type[3] && "A" !== type[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
					var sizes = "string" === typeof props.sizes ? props.sizes : void 0;
					var input = props.crossOrigin;
					preload(type || "", "image", {
						imageSrcSet: srcSet,
						imageSizes: sizes,
						crossOrigin: "string" === typeof input ? "use-credentials" === input ? input : "" : void 0,
						integrity: props.integrity,
						type: props.type,
						fetchPriority: props.fetchPriority,
						referrerPolicy: props.referrerPolicy
					});
				}
				return parentContext;
			case "link":
				type = props.rel;
				srcSet = props.href;
				if (!(parentContext & 1 || null != props.itemProp || "string" !== typeof type || "string" !== typeof srcSet || "" === srcSet)) switch (type) {
					case "preload":
						preload(srcSet, props.as, {
							crossOrigin: props.crossOrigin,
							integrity: props.integrity,
							nonce: props.nonce,
							type: props.type,
							fetchPriority: props.fetchPriority,
							referrerPolicy: props.referrerPolicy,
							imageSrcSet: props.imageSrcSet,
							imageSizes: props.imageSizes,
							media: props.media
						});
						break;
					case "modulepreload":
						preloadModule$1(srcSet, {
							as: props.as,
							crossOrigin: props.crossOrigin,
							integrity: props.integrity,
							nonce: props.nonce
						});
						break;
					case "stylesheet": preload(srcSet, "stylesheet", {
						crossOrigin: props.crossOrigin,
						integrity: props.integrity,
						nonce: props.nonce,
						type: props.type,
						fetchPriority: props.fetchPriority,
						referrerPolicy: props.referrerPolicy,
						media: props.media
					});
				}
				return parentContext;
			case "picture": return parentContext | 2;
			case "noscript": return parentContext | 1;
			default: return parentContext;
		}
	}
	var supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"), proxyHandlers = {
		get: function(target, name) {
			switch (name) {
				case "$$typeof": return target.$$typeof;
				case "name": return;
				case "displayName": return;
				case "defaultProps": return;
				case "_debugInfo": return;
				case "toJSON": return;
				case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
				case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
				case "Provider": throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
				case "then": return;
			}
			throw Error("Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
		},
		set: function() {
			throw Error("Cannot assign to a temporary client reference from a server module.");
		}
	};
	function createTemporaryReference(temporaryReferences, id) {
		var reference = Object.defineProperties(function() {
			throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
		}, { $$typeof: { value: TEMPORARY_REFERENCE_TAG } });
		reference = new Proxy(reference, proxyHandlers);
		temporaryReferences.set(reference, id);
		return reference;
	}
	function noop() {}
	var SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
	function trackUsedThenable(thenableState, thenable, index) {
		index = thenableState[index];
		void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop, noop), thenable = index);
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default:
				"string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState = thenable, thenableState.status = "pending", thenableState.then(function(fulfilledValue) {
					if ("pending" === thenable.status) {
						var fulfilledThenable = thenable;
						fulfilledThenable.status = "fulfilled";
						fulfilledThenable.value = fulfilledValue;
					}
				}, function(error) {
					if ("pending" === thenable.status) {
						var rejectedThenable = thenable;
						rejectedThenable.status = "rejected";
						rejectedThenable.reason = error;
					}
				}));
				switch (thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
				suspendedThenable = thenable;
				throw SuspenseException;
		}
	}
	var suspendedThenable = null;
	function getSuspendedThenable() {
		if (null === suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
		var thenable = suspendedThenable;
		suspendedThenable = null;
		return thenable;
	}
	var currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null;
	function getThenableStateAfterSuspending() {
		var state = thenableState || [];
		thenableState = null;
		return state;
	}
	var HooksDispatcher = {
		readContext: unsupportedContext,
		use,
		useCallback: function(callback) {
			return callback;
		},
		useContext: unsupportedContext,
		useEffect: unsupportedHook,
		useImperativeHandle: unsupportedHook,
		useLayoutEffect: unsupportedHook,
		useInsertionEffect: unsupportedHook,
		useMemo: function(nextCreate) {
			return nextCreate();
		},
		useReducer: unsupportedHook,
		useRef: unsupportedHook,
		useState: unsupportedHook,
		useDebugValue: function() {},
		useDeferredValue: unsupportedHook,
		useTransition: unsupportedHook,
		useSyncExternalStore: unsupportedHook,
		useId,
		useHostTransitionStatus: unsupportedHook,
		useFormState: unsupportedHook,
		useActionState: unsupportedHook,
		useOptimistic: unsupportedHook,
		useMemoCache: function(size) {
			for (var data = Array(size), i = 0; i < size; i++) data[i] = REACT_MEMO_CACHE_SENTINEL;
			return data;
		},
		useCacheRefresh: function() {
			return unsupportedRefresh;
		}
	};
	HooksDispatcher.useEffectEvent = unsupportedHook;
	function unsupportedHook() {
		throw Error("This Hook is not supported in Server Components.");
	}
	function unsupportedRefresh() {
		throw Error("Refreshing the cache is not supported in Server Components.");
	}
	function unsupportedContext() {
		throw Error("Cannot read a Client Context from a Server Component.");
	}
	function useId() {
		if (null === currentRequest$1) throw Error("useId can only be used while React is rendering");
		var id = currentRequest$1.identifierCount++;
		return "_" + currentRequest$1.identifierPrefix + "S_" + id.toString(32) + "_";
	}
	function use(usable) {
		if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
			if ("function" === typeof usable.then) {
				var index = thenableIndexCounter;
				thenableIndexCounter += 1;
				null === thenableState && (thenableState = []);
				return trackUsedThenable(thenableState, usable, index);
			}
			usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
		}
		if (usable.$$typeof === CLIENT_REFERENCE_TAG$1) {
			if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE) throw Error("Cannot read a Client Context from a Server Component.");
			throw Error("Cannot use() an already resolved Client Reference.");
		}
		throw Error("An unsupported type was passed to use(): " + String(usable));
	}
	var DefaultAsyncDispatcher = {
		getCacheForType: function(resourceType) {
			var JSCompiler_inline_result = (JSCompiler_inline_result = resolveRequest()) ? JSCompiler_inline_result.cache : /* @__PURE__ */ new Map();
			var entry = JSCompiler_inline_result.get(resourceType);
			void 0 === entry && (entry = resourceType(), JSCompiler_inline_result.set(resourceType, entry));
			return entry;
		},
		cacheSignal: function() {
			var request = resolveRequest();
			return request ? request.cacheController.signal : null;
		}
	}, ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	if (!ReactSharedInternalsServer) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	var isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf;
	function objectName(object) {
		object = Object.prototype.toString.call(object);
		return object.slice(8, object.length - 1);
	}
	function describeValueForErrorMessage(value) {
		switch (typeof value) {
			case "string": return JSON.stringify(10 >= value.length ? value : value.slice(0, 10) + "...");
			case "object":
				if (isArrayImpl(value)) return "[...]";
				if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG) return "client";
				value = objectName(value);
				return "Object" === value ? "{...}" : value;
			case "function": return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
			default: return String(value);
		}
	}
	function describeElementType(type) {
		if ("string" === typeof type) return type;
		switch (type) {
			case REACT_SUSPENSE_TYPE: return "Suspense";
			case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
		}
		if ("object" === typeof type) switch (type.$$typeof) {
			case REACT_FORWARD_REF_TYPE: return describeElementType(type.render);
			case REACT_MEMO_TYPE: return describeElementType(type.type);
			case REACT_LAZY_TYPE:
				var payload = type._payload;
				type = type._init;
				try {
					return describeElementType(type(payload));
				} catch (x) {}
		}
		return "";
	}
	var CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference");
	function describeObjectForErrorMessage(objectOrArray, expandedName) {
		var objKind = objectName(objectOrArray);
		if ("Object" !== objKind && "Array" !== objKind) return objKind;
		objKind = -1;
		var length = 0;
		if (isArrayImpl(objectOrArray)) {
			var str = "[";
			for (var i = 0; i < objectOrArray.length; i++) {
				0 < i && (str += ", ");
				var value = objectOrArray[i];
				value = "object" === typeof value && null !== value ? describeObjectForErrorMessage(value) : describeValueForErrorMessage(value);
				"" + i === expandedName ? (objKind = str.length, length = value.length, str += value) : str = 10 > value.length && 40 > str.length + value.length ? str + value : str + "...";
			}
			str += "]";
		} else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) str = "<" + describeElementType(objectOrArray.type) + "/>";
		else {
			if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
			str = "{";
			i = Object.keys(objectOrArray);
			for (value = 0; value < i.length; value++) {
				0 < value && (str += ", ");
				var name = i[value], encodedKey = JSON.stringify(name);
				str += ("\"" + name + "\"" === encodedKey ? name : encodedKey) + ": ";
				encodedKey = objectOrArray[name];
				encodedKey = "object" === typeof encodedKey && null !== encodedKey ? describeObjectForErrorMessage(encodedKey) : describeValueForErrorMessage(encodedKey);
				name === expandedName ? (objKind = str.length, length = encodedKey.length, str += encodedKey) : str = 10 > encodedKey.length && 40 > str.length + encodedKey.length ? str + encodedKey : str + "...";
			}
			str += "}";
		}
		return void 0 === expandedName ? str : -1 < objKind && 0 < length ? (objectOrArray = " ".repeat(objKind) + "^".repeat(length), "\n  " + str + "\n  " + objectOrArray) : "\n  " + str;
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty, ObjectPrototype$1 = Object.prototype, stringify = JSON.stringify;
	function defaultErrorHandler(error) {
		console.error(error);
	}
	function RequestInstance(type, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences) {
		if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher) throw Error("Currently React only supports one RSC renderer at a time.");
		ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
		var abortSet = /* @__PURE__ */ new Set(), pingedTasks = [], hints = /* @__PURE__ */ new Set();
		this.type = type;
		this.status = 10;
		this.flushScheduled = !1;
		this.destination = this.fatalError = null;
		this.bundlerConfig = bundlerConfig;
		this.cache = /* @__PURE__ */ new Map();
		this.cacheController = new AbortController();
		this.pendingChunks = this.nextChunkId = 0;
		this.hints = hints;
		this.abortableTasks = abortSet;
		this.pingedTasks = pingedTasks;
		this.completedImportChunks = [];
		this.completedHintChunks = [];
		this.completedRegularChunks = [];
		this.completedErrorChunks = [];
		this.writtenSymbols = /* @__PURE__ */ new Map();
		this.writtenClientReferences = /* @__PURE__ */ new Map();
		this.writtenServerReferences = /* @__PURE__ */ new Map();
		this.writtenObjects = /* @__PURE__ */ new WeakMap();
		this.temporaryReferences = temporaryReferences;
		this.identifierPrefix = identifierPrefix || "";
		this.identifierCount = 1;
		this.taintCleanupQueue = [];
		this.onError = void 0 === onError ? defaultErrorHandler : onError;
		this.onPostpone = void 0 === onPostpone ? noop : onPostpone;
		this.onAllReady = onAllReady;
		this.onFatalError = onFatalError;
		type = createTask(this, model, null, !1, 0, abortSet);
		pingedTasks.push(type);
	}
	var currentRequest = null;
	function resolveRequest() {
		if (currentRequest) return currentRequest;
		if (supportsRequestStorage) {
			var store = requestStorage.getStore();
			if (store) return store;
		}
		return null;
	}
	function serializeThenable(request, task, thenable) {
		var newTask = createTask(request, thenable, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		switch (thenable.status) {
			case "fulfilled": return newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
			case "rejected": return erroredTask(request, newTask, thenable.reason), newTask.id;
			default:
				if (12 === request.status) return request.abortableTasks.delete(newTask), 21 === request.type ? (haltTask(newTask), finishHaltedTask(newTask, request)) : (task = request.fatalError, abortTask(newTask), finishAbortedTask(newTask, request, task)), newTask.id;
				"string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				}));
		}
		thenable.then(function(value) {
			newTask.model = value;
			pingTask(request, newTask);
		}, function(reason) {
			0 === newTask.status && (erroredTask(request, newTask, reason), enqueueFlush(request));
		});
		return newTask.id;
	}
	function serializeReadableStream(request, task, stream) {
		function progress(entry) {
			if (0 === streamTask.status) if (entry.done) streamTask.status = 1, entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), request.abortableTasks.delete(streamTask), request.cacheController.signal.removeEventListener("abort", abortStream), enqueueFlush(request), callOnAllReadyIfReady(request);
			else try {
				streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), reader.read().then(progress, error);
			} catch (x$11) {
				error(x$11);
			}
		}
		function error(reason) {
			0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
		}
		function abortStream() {
			if (0 === streamTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortStream);
				signal = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal), enqueueFlush(request));
				reader.cancel(signal).then(error, error);
			}
		}
		var supportsBYOB = stream.supportsBYOB;
		if (void 0 === supportsBYOB) try {
			stream.getReader({ mode: "byob" }).releaseLock(), supportsBYOB = !0;
		} catch (x) {
			supportsBYOB = !1;
		}
		var reader = stream.getReader(), streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		request.pendingChunks++;
		task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
		request.completedRegularChunks.push(stringToChunk(task));
		request.cacheController.signal.addEventListener("abort", abortStream);
		reader.read().then(progress, error);
		return serializeByValueID(streamTask.id);
	}
	function serializeAsyncIterable(request, task, iterable, iterator) {
		function progress(entry) {
			if (0 === streamTask.status) if (entry.done) {
				streamTask.status = 1;
				if (void 0 === entry.value) var endStreamRow = streamTask.id.toString(16) + ":C\n";
				else try {
					var chunkId = outlineModelWithFormatContext(request, entry.value, 0);
					endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
				} catch (x) {
					error(x);
					return;
				}
				request.completedRegularChunks.push(stringToChunk(endStreamRow));
				request.abortableTasks.delete(streamTask);
				request.cacheController.signal.removeEventListener("abort", abortIterable);
				enqueueFlush(request);
				callOnAllReadyIfReady(request);
			} else try {
				streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), iterator.next().then(progress, error);
			} catch (x$12) {
				error(x$12);
			}
		}
		function error(reason) {
			0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortIterable), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
		}
		function abortIterable() {
			if (0 === streamTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortIterable);
				var reason = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal.reason), enqueueFlush(request));
				"function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
			}
		}
		iterable = iterable === iterator;
		var streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		request.pendingChunks++;
		task = streamTask.id.toString(16) + ":" + (iterable ? "x" : "X") + "\n";
		request.completedRegularChunks.push(stringToChunk(task));
		request.cacheController.signal.addEventListener("abort", abortIterable);
		iterator.next().then(progress, error);
		return serializeByValueID(streamTask.id);
	}
	function emitHint(request, code, model) {
		model = stringify(model);
		code = stringToChunk(":H" + code + model + "\n");
		request.completedHintChunks.push(code);
		enqueueFlush(request);
	}
	function readThenable(thenable) {
		if ("fulfilled" === thenable.status) return thenable.value;
		if ("rejected" === thenable.status) throw thenable.reason;
		throw thenable;
	}
	function createLazyWrapperAroundWakeable(request, task, wakeable) {
		switch (wakeable.status) {
			case "fulfilled": return wakeable.value;
			case "rejected": break;
			default: "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(function(fulfilledValue) {
				"pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
			}, function(error) {
				"pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
			}));
		}
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: wakeable,
			_init: readThenable
		};
	}
	function voidHandler() {}
	function processServerComponentReturnValue(request, task, Component, result) {
		if ("object" !== typeof result || null === result || result.$$typeof === CLIENT_REFERENCE_TAG$1) return result;
		if ("function" === typeof result.then) return createLazyWrapperAroundWakeable(request, task, result);
		var iteratorFn = getIteratorFn(result);
		return iteratorFn ? (request = {}, request[Symbol.iterator] = function() {
			return iteratorFn.call(result);
		}, request) : "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (request = {}, request[ASYNC_ITERATOR] = function() {
			return result[ASYNC_ITERATOR]();
		}, request);
	}
	function renderFunctionComponent(request, task, key, Component, props) {
		var prevThenableState = task.thenableState;
		task.thenableState = null;
		thenableIndexCounter = 0;
		thenableState = prevThenableState;
		props = Component(props, void 0);
		if (12 === request.status) throw "object" === typeof props && null !== props && "function" === typeof props.then && props.$$typeof !== CLIENT_REFERENCE_TAG$1 && props.then(voidHandler, voidHandler), null;
		props = processServerComponentReturnValue(request, task, Component, props);
		Component = task.keyPath;
		prevThenableState = task.implicitSlot;
		null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = !0);
		request = renderModelDestructive(request, task, emptyRoot, "", props);
		task.keyPath = Component;
		task.implicitSlot = prevThenableState;
		return request;
	}
	function renderFragment(request, task, children) {
		return null !== task.keyPath ? (request = [
			REACT_ELEMENT_TYPE,
			REACT_FRAGMENT_TYPE,
			task.keyPath,
			{ children }
		], task.implicitSlot ? [request] : request) : children;
	}
	var serializedSize = 0;
	function deferTask(request, task) {
		task = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		pingTask(request, task);
		return serializeLazyID(task.id);
	}
	function renderElement(request, task, type, key, ref, props) {
		if (null !== ref && void 0 !== ref) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
		if ("function" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1 && type.$$typeof !== TEMPORARY_REFERENCE_TAG) return renderFunctionComponent(request, task, key, type, props);
		if (type === REACT_FRAGMENT_TYPE && null === key) return type = task.implicitSlot, null === task.keyPath && (task.implicitSlot = !0), props = renderModelDestructive(request, task, emptyRoot, "", props.children), task.implicitSlot = type, props;
		if (null != type && "object" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1) switch (type.$$typeof) {
			case REACT_LAZY_TYPE:
				var init = type._init;
				type = init(type._payload);
				if (12 === request.status) throw null;
				return renderElement(request, task, type, key, ref, props);
			case REACT_FORWARD_REF_TYPE: return renderFunctionComponent(request, task, key, type.render, props);
			case REACT_MEMO_TYPE: return renderElement(request, task, type.type, key, ref, props);
		}
		else "string" === typeof type && (ref = task.formatContext, init = getChildFormatContext(ref, type, props), ref !== init && null != props.children && outlineModelWithFormatContext(request, props.children, init));
		request = key;
		key = task.keyPath;
		null === request ? request = key : null !== key && (request = key + "," + request);
		props = [
			REACT_ELEMENT_TYPE,
			type,
			request,
			props
		];
		task = task.implicitSlot && null !== request ? [props] : props;
		return task;
	}
	function pingTask(request, task) {
		var pingedTasks = request.pingedTasks;
		pingedTasks.push(task);
		1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
			return performWork(request);
		}) : setTimeout(function() {
			return performWork(request);
		}, 0));
	}
	function createTask(request, model, keyPath, implicitSlot, formatContext, abortSet) {
		request.pendingChunks++;
		var id = request.nextChunkId++;
		"object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
		var task = {
			id,
			status: 0,
			model,
			keyPath,
			implicitSlot,
			formatContext,
			ping: function() {
				return pingTask(request, task);
			},
			toJSON: function(parentPropertyName, value) {
				serializedSize += parentPropertyName.length;
				var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
				try {
					var JSCompiler_inline_result = renderModelDestructive(request, task, this, parentPropertyName, value);
				} catch (thrownValue) {
					if (parentPropertyName = task.model, parentPropertyName = "object" === typeof parentPropertyName && null !== parentPropertyName && (parentPropertyName.$$typeof === REACT_ELEMENT_TYPE || parentPropertyName.$$typeof === REACT_LAZY_TYPE), 12 === request.status) task.status = 3, 21 === request.type ? (prevKeyPath = request.nextChunkId++, prevKeyPath = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath), JSCompiler_inline_result = prevKeyPath) : (prevKeyPath = request.fatalError, JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath));
					else if (value = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof value && null !== value && "function" === typeof value.then) {
						JSCompiler_inline_result = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
						var ping = JSCompiler_inline_result.ping;
						value.then(ping, ping);
						JSCompiler_inline_result.thenableState = getThenableStateAfterSuspending();
						task.keyPath = prevKeyPath;
						task.implicitSlot = prevImplicitSlot;
						JSCompiler_inline_result = parentPropertyName ? serializeLazyID(JSCompiler_inline_result.id) : serializeByValueID(JSCompiler_inline_result.id);
					} else task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, request.pendingChunks++, prevKeyPath = request.nextChunkId++, prevImplicitSlot = logRecoverableError(request, value, task), emitErrorChunk(request, prevKeyPath, prevImplicitSlot), JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath);
				}
				return JSCompiler_inline_result;
			},
			thenableState: null
		};
		abortSet.add(task);
		return task;
	}
	function serializeByValueID(id) {
		return "$" + id.toString(16);
	}
	function serializeLazyID(id) {
		return "$L" + id.toString(16);
	}
	function encodeReferenceChunk(request, id, reference) {
		request = stringify(reference);
		id = id.toString(16) + ":" + request + "\n";
		return stringToChunk(id);
	}
	function serializeClientReference(request, parent, parentPropertyName, clientReference) {
		var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
		if (void 0 !== existingId) return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
		try {
			var config = request.bundlerConfig, modulePath = clientReference.$$id;
			existingId = "";
			var resolvedModuleData = config[modulePath];
			if (resolvedModuleData) existingId = resolvedModuleData.name;
			else {
				var idx = modulePath.lastIndexOf("#");
				-1 !== idx && (existingId = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
				if (!resolvedModuleData) throw Error("Could not find the module \"" + modulePath + "\" in the React Client Manifest. This is probably a bug in the React Server Components bundler.");
			}
			if (!0 === resolvedModuleData.async && !0 === clientReference.$$async) throw Error("The module \"" + modulePath + "\" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.");
			var JSCompiler_inline_result = !0 === resolvedModuleData.async || !0 === clientReference.$$async ? [
				resolvedModuleData.id,
				resolvedModuleData.chunks,
				existingId,
				1
			] : [
				resolvedModuleData.id,
				resolvedModuleData.chunks,
				existingId
			];
			request.pendingChunks++;
			var importId = request.nextChunkId++, json = stringify(JSCompiler_inline_result), processedChunk = stringToChunk(importId.toString(16) + ":I" + json + "\n");
			request.completedImportChunks.push(processedChunk);
			writtenClientReferences.set(clientReferenceKey, importId);
			return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
		} catch (x) {
			return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName), serializeByValueID(parent);
		}
	}
	function outlineModelWithFormatContext(request, value, formatContext) {
		value = createTask(request, value, null, !1, formatContext, request.abortableTasks);
		retryTask(request, value);
		return value.id;
	}
	function serializeTypedArray(request, tag, typedArray) {
		request.pendingChunks++;
		var bufferId = request.nextChunkId++;
		emitTypedArrayChunk(request, bufferId, tag, typedArray, !1);
		return serializeByValueID(bufferId);
	}
	function serializeBlob(request, blob) {
		function progress(entry) {
			if (0 === newTask.status) if (entry.done) request.cacheController.signal.removeEventListener("abort", abortBlob), pingTask(request, newTask);
			else return model.push(entry.value), reader.read().then(progress).catch(error);
		}
		function error(reason) {
			0 === newTask.status && (request.cacheController.signal.removeEventListener("abort", abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
		}
		function abortBlob() {
			if (0 === newTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortBlob);
				signal = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(newTask), haltTask(newTask), finishHaltedTask(newTask, request)) : (erroredTask(request, newTask, signal), enqueueFlush(request));
				reader.cancel(signal).then(error, error);
			}
		}
		var model = [blob.type], newTask = createTask(request, model, null, !1, 0, request.abortableTasks), reader = blob.stream().getReader();
		request.cacheController.signal.addEventListener("abort", abortBlob);
		reader.read().then(progress).catch(error);
		return "$B" + newTask.id.toString(16);
	}
	var modelRoot = !1;
	function renderModelDestructive(request, task, parent, parentPropertyName, value) {
		task.model = value;
		if (value === REACT_ELEMENT_TYPE) return "$";
		if (null === value) return null;
		if ("object" === typeof value) {
			switch (value.$$typeof) {
				case REACT_ELEMENT_TYPE:
					var elementReference = null, writtenObjects = request.writtenObjects;
					if (null === task.keyPath && !task.implicitSlot) {
						var existingReference = writtenObjects.get(value);
						if (void 0 !== existingReference) if (modelRoot === value) modelRoot = null;
						else return existingReference;
						else -1 === parentPropertyName.indexOf(":") && (parent = writtenObjects.get(parent), void 0 !== parent && (elementReference = parent + ":" + parentPropertyName, writtenObjects.set(value, elementReference)));
					}
					if (3200 < serializedSize) return deferTask(request, task);
					parentPropertyName = value.props;
					parent = parentPropertyName.ref;
					request = renderElement(request, task, value.type, value.key, void 0 !== parent ? parent : null, parentPropertyName);
					"object" === typeof request && null !== request && null !== elementReference && (writtenObjects.has(request) || writtenObjects.set(request, elementReference));
					return request;
				case REACT_LAZY_TYPE:
					if (3200 < serializedSize) return deferTask(request, task);
					task.thenableState = null;
					parentPropertyName = value._init;
					value = parentPropertyName(value._payload);
					if (12 === request.status) throw null;
					return renderModelDestructive(request, task, emptyRoot, "", value);
				case REACT_LEGACY_ELEMENT_TYPE: throw Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.");
			}
			if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
			if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference)) return "$T" + elementReference;
			elementReference = request.writtenObjects;
			writtenObjects = elementReference.get(value);
			if ("function" === typeof value.then) {
				if (void 0 !== writtenObjects) {
					if (null !== task.keyPath || task.implicitSlot) return "$@" + serializeThenable(request, task, value).toString(16);
					if (modelRoot === value) modelRoot = null;
					else return writtenObjects;
				}
				request = "$@" + serializeThenable(request, task, value).toString(16);
				elementReference.set(value, request);
				return request;
			}
			if (void 0 !== writtenObjects) if (modelRoot === value) {
				if (writtenObjects !== serializeByValueID(task.id)) return writtenObjects;
				modelRoot = null;
			} else return writtenObjects;
			else if (-1 === parentPropertyName.indexOf(":") && (writtenObjects = elementReference.get(parent), void 0 !== writtenObjects)) {
				existingReference = parentPropertyName;
				if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE) switch (parentPropertyName) {
					case "1":
						existingReference = "type";
						break;
					case "2":
						existingReference = "key";
						break;
					case "3":
						existingReference = "props";
						break;
					case "4": existingReference = "_owner";
				}
				elementReference.set(value, writtenObjects + ":" + existingReference);
			}
			if (isArrayImpl(value)) return renderFragment(request, task, value);
			if (value instanceof Map) return value = Array.from(value), "$Q" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if (value instanceof Set) return value = Array.from(value), "$W" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if ("function" === typeof FormData && value instanceof FormData) return value = Array.from(value.entries()), "$K" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if (value instanceof Error) return "$Z";
			if (value instanceof ArrayBuffer) return serializeTypedArray(request, "A", new Uint8Array(value));
			if (value instanceof Int8Array) return serializeTypedArray(request, "O", value);
			if (value instanceof Uint8Array) return serializeTypedArray(request, "o", value);
			if (value instanceof Uint8ClampedArray) return serializeTypedArray(request, "U", value);
			if (value instanceof Int16Array) return serializeTypedArray(request, "S", value);
			if (value instanceof Uint16Array) return serializeTypedArray(request, "s", value);
			if (value instanceof Int32Array) return serializeTypedArray(request, "L", value);
			if (value instanceof Uint32Array) return serializeTypedArray(request, "l", value);
			if (value instanceof Float32Array) return serializeTypedArray(request, "G", value);
			if (value instanceof Float64Array) return serializeTypedArray(request, "g", value);
			if (value instanceof BigInt64Array) return serializeTypedArray(request, "M", value);
			if (value instanceof BigUint64Array) return serializeTypedArray(request, "m", value);
			if (value instanceof DataView) return serializeTypedArray(request, "V", value);
			if ("function" === typeof Blob && value instanceof Blob) return serializeBlob(request, value);
			if (elementReference = getIteratorFn(value)) return parentPropertyName = elementReference.call(value), parentPropertyName === value ? (value = Array.from(parentPropertyName), "$i" + outlineModelWithFormatContext(request, value, 0).toString(16)) : renderFragment(request, task, Array.from(parentPropertyName));
			if ("function" === typeof ReadableStream && value instanceof ReadableStream) return serializeReadableStream(request, task, value);
			elementReference = value[ASYNC_ITERATOR];
			if ("function" === typeof elementReference) return null !== task.keyPath ? (request = [
				REACT_ELEMENT_TYPE,
				REACT_FRAGMENT_TYPE,
				task.keyPath,
				{ children: value }
			], request = task.implicitSlot ? [request] : request) : (parentPropertyName = elementReference.call(value), request = serializeAsyncIterable(request, task, value, parentPropertyName)), request;
			if (value instanceof Date) return "$D" + value.toJSON();
			request = getPrototypeOf(value);
			if (request !== ObjectPrototype$1 && (null === request || null !== getPrototypeOf(request))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName));
			return value;
		}
		if ("string" === typeof value) {
			serializedSize += value.length;
			if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date) return "$D" + value;
			if (1024 <= value.length && null !== byteLengthOfChunk) return request.pendingChunks++, task = request.nextChunkId++, emitTextChunk(request, task, value, !1), serializeByValueID(task);
			request = "$" === value[0] ? "$" + value : value;
			return request;
		}
		if ("boolean" === typeof value) return value;
		if ("number" === typeof value) return Number.isFinite(value) ? 0 === value && -Infinity === 1 / value ? "$-0" : value : Infinity === value ? "$Infinity" : -Infinity === value ? "$-Infinity" : "$NaN";
		if ("undefined" === typeof value) return "$undefined";
		if ("function" === typeof value) {
			if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
			if (value.$$typeof === SERVER_REFERENCE_TAG) return task = request.writtenServerReferences, parentPropertyName = task.get(value), void 0 !== parentPropertyName ? request = "$h" + parentPropertyName.toString(16) : (parentPropertyName = value.$$bound, parentPropertyName = null === parentPropertyName ? null : Promise.resolve(parentPropertyName), request = outlineModelWithFormatContext(request, {
				id: value.$$id,
				bound: parentPropertyName
			}, 0), task.set(value, request), request = "$h" + request.toString(16)), request;
			if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request)) return "$T" + request;
			if (value.$$typeof === TEMPORARY_REFERENCE_TAG) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
			if (/^on[A-Z]/.test(parentPropertyName)) throw Error("Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
			throw Error("Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with \"use server\". Or maybe you meant to call this function rather than return it." + describeObjectForErrorMessage(parent, parentPropertyName));
		}
		if ("symbol" === typeof value) {
			task = request.writtenSymbols;
			elementReference = task.get(value);
			if (void 0 !== elementReference) return serializeByValueID(elementReference);
			elementReference = value.description;
			if (Symbol.for(elementReference) !== value) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName));
			request.pendingChunks++;
			parentPropertyName = request.nextChunkId++;
			parent = encodeReferenceChunk(request, parentPropertyName, "$S" + elementReference);
			request.completedImportChunks.push(parent);
			task.set(value, parentPropertyName);
			return serializeByValueID(parentPropertyName);
		}
		if ("bigint" === typeof value) return "$n" + value.toString(10);
		throw Error("Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName));
	}
	function logRecoverableError(request, error) {
		var prevRequest = currentRequest;
		currentRequest = null;
		try {
			var onError = request.onError;
			var errorDigest = supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
		} finally {
			currentRequest = prevRequest;
		}
		if (null != errorDigest && "string" !== typeof errorDigest) throw Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof errorDigest + "\" instead");
		return errorDigest || "";
	}
	function fatalError(request, error) {
		var onFatalError = request.onFatalError;
		onFatalError(error);
		null !== request.destination ? (request.status = 14, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
		request.cacheController.abort(Error("The render was aborted due to a fatal error.", { cause: error }));
	}
	function emitErrorChunk(request, id, digest) {
		digest = { digest };
		id = id.toString(16) + ":E" + stringify(digest) + "\n";
		id = stringToChunk(id);
		request.completedErrorChunks.push(id);
	}
	function emitModelChunk(request, id, json) {
		id = id.toString(16) + ":" + json + "\n";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id);
	}
	function emitTypedArrayChunk(request, id, tag, typedArray, debug) {
		debug ? request.pendingDebugChunks++ : request.pendingChunks++;
		debug = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		typedArray = 2048 < typedArray.byteLength ? debug.slice() : debug;
		debug = typedArray.byteLength;
		id = id.toString(16) + ":" + tag + debug.toString(16) + ",";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id, typedArray);
	}
	function emitTextChunk(request, id, text, debug) {
		if (null === byteLengthOfChunk) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
		debug ? request.pendingDebugChunks++ : request.pendingChunks++;
		text = stringToChunk(text);
		debug = text.byteLength;
		id = id.toString(16) + ":T" + debug.toString(16) + ",";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id, text);
	}
	function emitChunk(request, task, value) {
		var id = task.id;
		"string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value, !1) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value), !1) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value, !1) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value, !1) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value, !1) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value, !1) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value, !1) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value, !1) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value, !1) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value, !1) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value, !1) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value, !1) : value instanceof BigUint64Array ? emitTypedArrayChunk(request, id, "m", value, !1) : value instanceof DataView ? emitTypedArrayChunk(request, id, "V", value, !1) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
	}
	function erroredTask(request, task, error) {
		task.status = 4;
		error = logRecoverableError(request, error, task);
		emitErrorChunk(request, task.id, error);
		request.abortableTasks.delete(task);
		callOnAllReadyIfReady(request);
	}
	var emptyRoot = {};
	function retryTask(request, task) {
		if (0 === task.status) {
			task.status = 5;
			var parentSerializedSize = serializedSize;
			try {
				modelRoot = task.model;
				var resolvedModel = renderModelDestructive(request, task, emptyRoot, "", task.model);
				modelRoot = resolvedModel;
				task.keyPath = null;
				task.implicitSlot = !1;
				if ("object" === typeof resolvedModel && null !== resolvedModel) request.writtenObjects.set(resolvedModel, serializeByValueID(task.id)), emitChunk(request, task, resolvedModel);
				else {
					var json = stringify(resolvedModel);
					emitModelChunk(request, task.id, json);
				}
				task.status = 1;
				request.abortableTasks.delete(task);
				callOnAllReadyIfReady(request);
			} catch (thrownValue) {
				if (12 === request.status) if (request.abortableTasks.delete(task), task.status = 0, 21 === request.type) haltTask(task), finishHaltedTask(task, request);
				else {
					var errorId = request.fatalError;
					abortTask(task);
					finishAbortedTask(task, request, errorId);
				}
				else {
					var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
					if ("object" === typeof x && null !== x && "function" === typeof x.then) {
						task.status = 0;
						task.thenableState = getThenableStateAfterSuspending();
						var ping = task.ping;
						x.then(ping, ping);
					} else erroredTask(request, task, x);
				}
			} finally {
				serializedSize = parentSerializedSize;
			}
		}
	}
	function tryStreamTask(request, task) {
		var parentSerializedSize = serializedSize;
		try {
			emitChunk(request, task, task.model);
		} finally {
			serializedSize = parentSerializedSize;
		}
	}
	function performWork(request) {
		var prevDispatcher = ReactSharedInternalsServer.H;
		ReactSharedInternalsServer.H = HooksDispatcher;
		var prevRequest = currentRequest;
		currentRequest$1 = currentRequest = request;
		try {
			var pingedTasks = request.pingedTasks;
			request.pingedTasks = [];
			for (var i = 0; i < pingedTasks.length; i++) retryTask(request, pingedTasks[i]);
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		} finally {
			ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
		}
	}
	function abortTask(task) {
		0 === task.status && (task.status = 3);
	}
	function finishAbortedTask(task, request, errorId) {
		3 === task.status && (errorId = serializeByValueID(errorId), task = encodeReferenceChunk(request, task.id, errorId), request.completedErrorChunks.push(task));
	}
	function haltTask(task) {
		0 === task.status && (task.status = 3);
	}
	function finishHaltedTask(task, request) {
		3 === task.status && request.pendingChunks--;
	}
	function flushCompletedChunks(request) {
		var destination = request.destination;
		if (null !== destination) {
			currentView = new Uint8Array(2048);
			writtenBytes = 0;
			try {
				for (var importsChunks = request.completedImportChunks, i = 0; i < importsChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, importsChunks[i]);
				importsChunks.splice(0, i);
				var hintChunks = request.completedHintChunks;
				for (i = 0; i < hintChunks.length; i++) writeChunkAndReturn(destination, hintChunks[i]);
				hintChunks.splice(0, i);
				var regularChunks = request.completedRegularChunks;
				for (i = 0; i < regularChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, regularChunks[i]);
				regularChunks.splice(0, i);
				var errorChunks = request.completedErrorChunks;
				for (i = 0; i < errorChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, errorChunks[i]);
				errorChunks.splice(0, i);
			} finally {
				request.flushScheduled = !1, currentView && 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
			}
		}
		0 === request.pendingChunks && (12 > request.status && request.cacheController.abort(Error("This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources.")), null !== request.destination && (request.status = 14, request.destination.close(), request.destination = null));
	}
	function startWork(request) {
		request.flushScheduled = null !== request.destination;
		supportsRequestStorage ? scheduleMicrotask(function() {
			requestStorage.run(request, performWork, request);
		}) : scheduleMicrotask(function() {
			return performWork(request);
		});
		setTimeout(function() {
			10 === request.status && (request.status = 11);
		}, 0);
	}
	function enqueueFlush(request) {
		!1 === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = !0, setTimeout(function() {
			request.flushScheduled = !1;
			flushCompletedChunks(request);
		}, 0));
	}
	function callOnAllReadyIfReady(request) {
		0 === request.abortableTasks.size && (request = request.onAllReady, request());
	}
	function startFlowing(request, destination) {
		if (13 === request.status) request.status = 14, closeWithError(destination, request.fatalError);
		else if (14 !== request.status && null === request.destination) {
			request.destination = destination;
			try {
				flushCompletedChunks(request);
			} catch (error) {
				logRecoverableError(request, error, null), fatalError(request, error);
			}
		}
	}
	function finishHalt(request, abortedTasks) {
		try {
			abortedTasks.forEach(function(task) {
				return finishHaltedTask(task, request);
			});
			var onAllReady = request.onAllReady;
			onAllReady();
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		}
	}
	function finishAbort(request, abortedTasks, errorId) {
		try {
			abortedTasks.forEach(function(task) {
				return finishAbortedTask(task, request, errorId);
			});
			var onAllReady = request.onAllReady;
			onAllReady();
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		}
	}
	function abort(request, reason) {
		if (!(11 < request.status)) try {
			request.status = 12;
			request.cacheController.abort(reason);
			var abortableTasks = request.abortableTasks;
			if (0 < abortableTasks.size) if (21 === request.type) abortableTasks.forEach(function(task) {
				return haltTask(task, request);
			}), setTimeout(function() {
				return finishHalt(request, abortableTasks);
			}, 0);
			else {
				var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason, digest = logRecoverableError(request, error, null), errorId = request.nextChunkId++;
				request.fatalError = errorId;
				request.pendingChunks++;
				emitErrorChunk(request, errorId, digest, error, !1, null);
				abortableTasks.forEach(function(task) {
					return abortTask(task, request, errorId);
				});
				setTimeout(function() {
					return finishAbort(request, abortableTasks, errorId);
				}, 0);
			}
			else {
				var onAllReady = request.onAllReady;
				onAllReady();
				flushCompletedChunks(request);
			}
		} catch (error$26) {
			logRecoverableError(request, error$26, null), fatalError(request, error$26);
		}
	}
	function resolveServerReference(bundlerConfig, id) {
		var name = "", resolvedModuleData = bundlerConfig[id];
		if (resolvedModuleData) name = resolvedModuleData.name;
		else {
			var idx = id.lastIndexOf("#");
			-1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
			if (!resolvedModuleData) throw Error("Could not find the module \"" + id + "\" in the React Server Manifest. This is probably a bug in the React Server Components bundler.");
		}
		return resolvedModuleData.async ? [
			resolvedModuleData.id,
			resolvedModuleData.chunks,
			name,
			1
		] : [
			resolvedModuleData.id,
			resolvedModuleData.chunks,
			name
		];
	}
	var chunkCache = /* @__PURE__ */ new Map();
	function requireAsyncModule(id) {
		var promise = __vite_rsc_require__(id);
		if ("function" !== typeof promise.then || "fulfilled" === promise.status) return null;
		promise.then(function(value) {
			promise.status = "fulfilled";
			promise.value = value;
		}, function(reason) {
			promise.status = "rejected";
			promise.reason = reason;
		});
		return promise;
	}
	function ignoreReject() {}
	function preloadModule(metadata) {
		for (var chunks = metadata[1], promises = [], i = 0; i < chunks.length;) {
			var chunkId = chunks[i++];
			chunks[i++];
			var entry = chunkCache.get(chunkId);
			if (void 0 === entry) {
				entry = __webpack_chunk_load__(chunkId);
				promises.push(entry);
				var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
				entry.then(resolve, ignoreReject);
				chunkCache.set(chunkId, entry);
			} else null !== entry && promises.push(entry);
		}
		return 4 === metadata.length ? 0 === promises.length ? requireAsyncModule(metadata[0]) : Promise.all(promises).then(function() {
			return requireAsyncModule(metadata[0]);
		}) : 0 < promises.length ? Promise.all(promises) : null;
	}
	function requireModule(metadata) {
		var moduleExports = __vite_rsc_require__(metadata[0]);
		if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
		else throw moduleExports.reason;
		if ("*" === metadata[2]) return moduleExports;
		if ("" === metadata[2]) return moduleExports.__esModule ? moduleExports.default : moduleExports;
		if (hasOwnProperty.call(moduleExports, metadata[2])) return moduleExports[metadata[2]];
	}
	var RESPONSE_SYMBOL = Symbol();
	function ReactPromise(status, value, reason) {
		this.status = status;
		this.value = value;
		this.reason = reason;
	}
	ReactPromise.prototype = Object.create(Promise.prototype);
	ReactPromise.prototype.then = function(resolve, reject) {
		switch (this.status) {
			case "resolved_model": initializeModelChunk(this);
		}
		switch (this.status) {
			case "fulfilled":
				if ("function" === typeof resolve) {
					for (var inspectedValue = this.value, cycleProtection = 0, visited = /* @__PURE__ */ new Set(); inspectedValue instanceof ReactPromise;) {
						cycleProtection++;
						if (inspectedValue === this || visited.has(inspectedValue) || 1e3 < cycleProtection) {
							"function" === typeof reject && reject(Error("Cannot have cyclic thenables."));
							return;
						}
						visited.add(inspectedValue);
						if ("fulfilled" === inspectedValue.status) inspectedValue = inspectedValue.value;
						else break;
					}
					resolve(this.value);
				}
				break;
			case "pending":
			case "blocked":
				"function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
				"function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
				break;
			default: "function" === typeof reject && reject(this.reason);
		}
	};
	var ObjectPrototype = Object.prototype, ArrayPrototype = Array.prototype;
	function wakeChunk(response, listeners, value, chunk) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, chunk.reason);
		}
	}
	function rejectChunk(response, listeners, error) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(error) : rejectReference(response, listener.handler, error);
		}
	}
	function triggerErrorOnChunk(response, chunk, error) {
		if ("pending" !== chunk.status && "blocked" !== chunk.status) chunk.reason.error(error);
		else {
			var listeners = chunk.reason;
			chunk.status = "rejected";
			chunk.reason = error;
			null !== listeners && rejectChunk(response, listeners, error);
		}
	}
	function createResolvedModelChunk(response, value, id) {
		var $jscomp$compprop2 = {};
		return new ReactPromise("resolved_model", value, ($jscomp$compprop2.id = id, $jscomp$compprop2[RESPONSE_SYMBOL] = response, $jscomp$compprop2));
	}
	function resolveModelChunk(response, chunk, value, id) {
		if ("pending" !== chunk.status) chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? "\"$undefined\"" : value.slice(1)) : chunk.enqueueModel(value);
		else {
			var resolveListeners = chunk.value, rejectListeners = chunk.reason;
			chunk.status = "resolved_model";
			chunk.value = value;
			value = {};
			chunk.reason = (value.id = id, value[RESPONSE_SYMBOL] = response, value);
			if (null !== resolveListeners) switch (initializeModelChunk(chunk), chunk.status) {
				case "fulfilled":
					wakeChunk(response, resolveListeners, chunk.value, chunk);
					break;
				case "blocked":
				case "pending":
					if (chunk.value) for (response = 0; response < resolveListeners.length; response++) chunk.value.push(resolveListeners[response]);
					else chunk.value = resolveListeners;
					if (chunk.reason) {
						if (rejectListeners) for (resolveListeners = 0; resolveListeners < rejectListeners.length; resolveListeners++) chunk.reason.push(rejectListeners[resolveListeners]);
					} else chunk.reason = rejectListeners;
					break;
				case "rejected": rejectListeners && rejectChunk(response, rejectListeners, chunk.reason);
			}
		}
	}
	function createResolvedIteratorResultChunk(response, value, done) {
		var $jscomp$compprop4 = {};
		return new ReactPromise("resolved_model", (done ? "{\"done\":true,\"value\":" : "{\"done\":false,\"value\":") + value + "}", ($jscomp$compprop4.id = -1, $jscomp$compprop4[RESPONSE_SYMBOL] = response, $jscomp$compprop4));
	}
	function resolveIteratorResultChunk(response, chunk, value, done) {
		resolveModelChunk(response, chunk, (done ? "{\"done\":true,\"value\":" : "{\"done\":false,\"value\":") + value + "}", -1);
	}
	function loadServerReference$1(response, metaData, parentObject, key) {
		function reject(error) {
			var rejectListeners = blockedPromise.reason, erroredPromise = blockedPromise;
			erroredPromise.status = "rejected";
			erroredPromise.value = null;
			erroredPromise.reason = error;
			null !== rejectListeners && rejectChunk(response, rejectListeners, error);
			rejectReference(response, handler, error);
		}
		var id = metaData.id;
		if ("string" !== typeof id || "then" === key) return null;
		var cachedPromise = metaData.$$promise;
		if (void 0 !== cachedPromise) {
			if ("fulfilled" === cachedPromise.status) return cachedPromise = cachedPromise.value, "__proto__" === key ? null : parentObject[key] = cachedPromise;
			initializingHandler ? (id = initializingHandler, id.deps++) : id = initializingHandler = {
				chunk: null,
				value: null,
				reason: null,
				deps: 1,
				errored: !1
			};
			cachedPromise.then(resolveReference.bind(null, response, id, parentObject, key), rejectReference.bind(null, response, id));
			return null;
		}
		var blockedPromise = new ReactPromise("blocked", null, null);
		metaData.$$promise = blockedPromise;
		var serverReference = resolveServerReference(response._bundlerConfig, id);
		cachedPromise = metaData.bound;
		if (id = preloadModule(serverReference)) cachedPromise instanceof ReactPromise && (id = Promise.all([id, cachedPromise]));
		else if (cachedPromise instanceof ReactPromise) id = Promise.resolve(cachedPromise);
		else return cachedPromise = requireModule(serverReference), id = blockedPromise, id.status = "fulfilled", id.value = cachedPromise;
		if (initializingHandler) {
			var handler = initializingHandler;
			handler.deps++;
		} else handler = initializingHandler = {
			chunk: null,
			value: null,
			reason: null,
			deps: 1,
			errored: !1
		};
		id.then(function() {
			var resolvedValue = requireModule(serverReference);
			if (metaData.bound) {
				var promiseValue = metaData.bound.value;
				promiseValue = isArrayImpl(promiseValue) ? promiseValue.slice(0) : [];
				if (1e3 < promiseValue.length) {
					reject(Error("Server Function has too many bound arguments. Received " + promiseValue.length + " but the limit is 1000."));
					return;
				}
				promiseValue.unshift(null);
				resolvedValue = resolvedValue.bind.apply(resolvedValue, promiseValue);
			}
			promiseValue = blockedPromise.value;
			var initializedPromise = blockedPromise;
			initializedPromise.status = "fulfilled";
			initializedPromise.value = resolvedValue;
			initializedPromise.reason = null;
			null !== promiseValue && wakeChunk(response, promiseValue, resolvedValue, initializedPromise);
			resolveReference(response, handler, parentObject, key, resolvedValue);
		}, reject);
		return null;
	}
	function reviveModel(response, parentObj, parentKey, value, reference, arrayRoot) {
		if ("string" === typeof value) return parseModelString(response, parentObj, parentKey, value, reference, arrayRoot);
		if ("object" === typeof value && null !== value) if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), isArrayImpl(value)) {
			if (null === arrayRoot) {
				var childContext = {
					count: 0,
					fork: !1
				};
				response._rootArrayContexts.set(value, childContext);
			} else childContext = arrayRoot;
			1 < value.length && (childContext.fork = !0);
			bumpArrayCount(childContext, value.length + 1, response);
			for (parentObj = 0; parentObj < value.length; parentObj++) value[parentObj] = reviveModel(response, value, "" + parentObj, value[parentObj], void 0 !== reference ? reference + ":" + parentObj : void 0, childContext);
		} else for (childContext in value) hasOwnProperty.call(value, childContext) && ("__proto__" === childContext ? delete value[childContext] : (parentObj = void 0 !== reference && -1 === childContext.indexOf(":") ? reference + ":" + childContext : void 0, parentObj = reviveModel(response, value, childContext, value[childContext], parentObj, null), void 0 !== parentObj ? value[childContext] = parentObj : delete value[childContext]));
		return value;
	}
	function bumpArrayCount(arrayContext, slots, response) {
		if ((arrayContext.count += slots) > response._arraySizeLimit && arrayContext.fork) throw Error("Maximum array nesting exceeded. Large nested arrays can be dangerous. Try adding intermediate objects.");
	}
	var initializingHandler = null;
	function initializeModelChunk(chunk) {
		var prevHandler = initializingHandler;
		initializingHandler = null;
		var _chunk$reason = chunk.reason, response = _chunk$reason[RESPONSE_SYMBOL];
		_chunk$reason = _chunk$reason.id;
		_chunk$reason = -1 === _chunk$reason ? void 0 : _chunk$reason.toString(16);
		var resolvedModel = chunk.value;
		chunk.status = "blocked";
		chunk.value = null;
		chunk.reason = null;
		try {
			var rawModel = JSON.parse(resolvedModel);
			resolvedModel = {
				count: 0,
				fork: !1
			};
			var value = reviveModel(response, { "": rawModel }, "", rawModel, _chunk$reason, resolvedModel), resolveListeners = chunk.value;
			if (null !== resolveListeners) for (chunk.value = null, chunk.reason = null, rawModel = 0; rawModel < resolveListeners.length; rawModel++) {
				var listener = resolveListeners[rawModel];
				"function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, resolvedModel);
			}
			if (null !== initializingHandler) {
				if (initializingHandler.errored) throw initializingHandler.reason;
				if (0 < initializingHandler.deps) {
					initializingHandler.value = value;
					initializingHandler.reason = resolvedModel;
					initializingHandler.chunk = chunk;
					return;
				}
			}
			chunk.status = "fulfilled";
			chunk.value = value;
			chunk.reason = resolvedModel;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		} finally {
			initializingHandler = prevHandler;
		}
	}
	function reportGlobalError(response, error) {
		response._closed = !0;
		response._closedReason = error;
		response._chunks.forEach(function(chunk) {
			"pending" === chunk.status ? triggerErrorOnChunk(response, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && (chunk = chunk.reason, "function" === typeof chunk.error && chunk.error(error));
		});
	}
	function getChunk(response, id) {
		var chunks = response._chunks, chunk = chunks.get(id);
		chunk || (chunk = response._formData.get(response._prefix + id), chunk = "string" === typeof chunk ? createResolvedModelChunk(response, chunk, id) : response._closed ? new ReactPromise("rejected", null, response._closedReason) : new ReactPromise("pending", null, null), chunks.set(id, chunk));
		return chunk;
	}
	function fulfillReference(response, reference, value, arrayRoot) {
		var handler = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
		try {
			for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < path.length; i++) {
				var name = path[i];
				if ("object" !== typeof value || null === value || getPrototypeOf(value) !== ObjectPrototype && getPrototypeOf(value) !== ArrayPrototype || !hasOwnProperty.call(value, name)) throw Error("Invalid reference.");
				value = value[name];
				if (isArrayImpl(value)) localLength = 0, arrayRoot = rootArrayContexts.get(value) || arrayRoot;
				else if (arrayRoot = null, "string" === typeof value) localLength = value.length;
				else if ("bigint" === typeof value) {
					var n = Math.abs(Number(value));
					localLength = 0 === n ? 1 : Math.floor(Math.log10(n)) + 1;
				} else localLength = ArrayBuffer.isView(value) ? value.byteLength : 0;
			}
			var resolvedValue = map(response, value, parentObject, key);
			var referenceArrayRoot = reference.arrayRoot;
			null !== referenceArrayRoot && (null !== arrayRoot ? (arrayRoot.fork && (referenceArrayRoot.fork = !0), bumpArrayCount(referenceArrayRoot, arrayRoot.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
		} catch (error) {
			rejectReference(response, handler, error);
			return;
		}
		resolveReference(response, handler, parentObject, key, resolvedValue);
	}
	function resolveReference(response, handler, parentObject, key, resolvedValue) {
		"__proto__" !== key && (parentObject[key] = resolvedValue);
		"" === key && null === handler.value && (handler.value = resolvedValue);
		handler.deps--;
		0 === handler.deps && (parentObject = handler.chunk, null !== parentObject && "blocked" === parentObject.status && (key = parentObject.value, parentObject.status = "fulfilled", parentObject.value = handler.value, parentObject.reason = handler.reason, null !== key && wakeChunk(response, key, handler.value, parentObject)));
	}
	function rejectReference(response, handler, error) {
		handler.errored || (handler.errored = !0, handler.value = null, handler.reason = error, handler = handler.chunk, null !== handler && "blocked" === handler.status && triggerErrorOnChunk(response, handler, error));
	}
	function getOutlinedModel(response, reference, parentObject, key, referenceArrayRoot, map) {
		reference = reference.split(":");
		var id = parseInt(reference[0], 16), chunk = getChunk(response, id);
		switch (chunk.status) {
			case "resolved_model": initializeModelChunk(chunk);
		}
		switch (chunk.status) {
			case "fulfilled":
				id = chunk.value;
				chunk = chunk.reason;
				for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < reference.length; i++) {
					localLength = reference[i];
					if ("object" !== typeof id || null === id || getPrototypeOf(id) !== ObjectPrototype && getPrototypeOf(id) !== ArrayPrototype || !hasOwnProperty.call(id, localLength)) throw Error("Invalid reference.");
					id = id[localLength];
					isArrayImpl(id) ? (localLength = 0, chunk = rootArrayContexts.get(id) || chunk) : (chunk = null, "string" === typeof id ? localLength = id.length : "bigint" === typeof id ? (localLength = Math.abs(Number(id)), localLength = 0 === localLength ? 1 : Math.floor(Math.log10(localLength)) + 1) : localLength = ArrayBuffer.isView(id) ? id.byteLength : 0);
				}
				parentObject = map(response, id, parentObject, key);
				null !== referenceArrayRoot && (null !== chunk ? (chunk.fork && (referenceArrayRoot.fork = !0), bumpArrayCount(referenceArrayRoot, chunk.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
				return parentObject;
			case "blocked": return initializingHandler ? (response = initializingHandler, response.deps++) : response = initializingHandler = {
				chunk: null,
				value: null,
				reason: null,
				deps: 1,
				errored: !1
			}, referenceArrayRoot = {
				handler: response,
				parentObject,
				key,
				map,
				path: reference,
				arrayRoot: referenceArrayRoot
			}, null === chunk.value ? chunk.value = [referenceArrayRoot] : chunk.value.push(referenceArrayRoot), null === chunk.reason ? chunk.reason = [referenceArrayRoot] : chunk.reason.push(referenceArrayRoot), null;
			case "pending": throw Error("Invalid forward reference.");
			default: return initializingHandler ? (initializingHandler.errored = !0, initializingHandler.value = null, initializingHandler.reason = chunk.reason) : initializingHandler = {
				chunk: null,
				value: null,
				reason: chunk.reason,
				deps: 0,
				errored: !0
			}, null;
		}
	}
	function createMap(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Map initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Map.");
		model.$$consumed = !0;
		return new Map(model);
	}
	function createSet(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Set initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Set.");
		model.$$consumed = !0;
		return new Set(model);
	}
	function extractIterator(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Iterator initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Iterator.");
		model.$$consumed = !0;
		return model[Symbol.iterator]();
	}
	function createModel(response, model, parentObject, key) {
		return "then" === key && "function" === typeof model ? null : model;
	}
	function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey, referenceArrayRoot) {
		function reject(error) {
			if (!handler.errored) {
				handler.errored = !0;
				handler.value = null;
				handler.reason = error;
				var chunk = handler.chunk;
				null !== chunk && "blocked" === chunk.status && triggerErrorOnChunk(response, chunk, error);
			}
		}
		reference = parseInt(reference.slice(2), 16);
		var key = response._prefix + reference;
		bytesPerElement = response._chunks;
		if (bytesPerElement.has(reference)) throw Error("Already initialized typed array.");
		bytesPerElement.set(reference, new ReactPromise("rejected", null, Error("Already initialized typed array.")));
		reference = response._formData.get(key).arrayBuffer();
		if (initializingHandler) {
			var handler = initializingHandler;
			handler.deps++;
		} else handler = initializingHandler = {
			chunk: null,
			value: null,
			reason: null,
			deps: 1,
			errored: !1
		};
		reference.then(function(buffer) {
			try {
				null !== referenceArrayRoot && bumpArrayCount(referenceArrayRoot, buffer.byteLength, response);
				var resolvedValue = constructor === ArrayBuffer ? buffer : new constructor(buffer);
				"__proto__" !== key && (parentObject[parentKey] = resolvedValue);
				"" === parentKey && null === handler.value && (handler.value = resolvedValue);
			} catch (x) {
				reject(x);
				return;
			}
			handler.deps--;
			0 === handler.deps && (buffer = handler.chunk, null !== buffer && "blocked" === buffer.status && (resolvedValue = buffer.value, buffer.status = "fulfilled", buffer.value = handler.value, buffer.reason = null, null !== resolvedValue && wakeChunk(response, resolvedValue, handler.value, buffer)));
		}, reject);
		return null;
	}
	function resolveStream(response, id, stream, controller) {
		var chunks = response._chunks;
		stream = new ReactPromise("fulfilled", stream, controller);
		chunks.set(id, stream);
		response = response._formData.getAll(response._prefix + id);
		for (id = 0; id < response.length; id++) chunks = response[id], "string" === typeof chunks && ("C" === chunks[0] ? controller.close("C" === chunks ? "\"$undefined\"" : chunks.slice(1)) : controller.enqueueModel(chunks));
	}
	function parseReadableStream(response, reference, type) {
		function enqueue(value) {
			"bytes" !== type || ArrayBuffer.isView(value) ? controller.enqueue(value) : flightController.error(Error("Invalid data for bytes stream."));
		}
		reference = parseInt(reference.slice(2), 16);
		if (response._chunks.has(reference)) throw Error("Already initialized stream.");
		var controller = null, closed = !1, stream = new ReadableStream({
			type,
			start: function(c) {
				controller = c;
			}
		}), previousBlockedChunk = null, flightController = {
			enqueueModel: function(json) {
				if (null === previousBlockedChunk) {
					var chunk = createResolvedModelChunk(response, json, -1);
					initializeModelChunk(chunk);
					"fulfilled" === chunk.status ? enqueue(chunk.value) : (chunk.then(enqueue, flightController.error), previousBlockedChunk = chunk);
				} else {
					chunk = previousBlockedChunk;
					var chunk$31 = new ReactPromise("pending", null, null);
					chunk$31.then(enqueue, flightController.error);
					previousBlockedChunk = chunk$31;
					chunk.then(function() {
						previousBlockedChunk === chunk$31 && (previousBlockedChunk = null);
						resolveModelChunk(response, chunk$31, json, -1);
					});
				}
			},
			close: function() {
				if (!closed) if (closed = !0, null === previousBlockedChunk) controller.close();
				else {
					var blockedChunk = previousBlockedChunk;
					previousBlockedChunk = null;
					blockedChunk.then(function() {
						return controller.close();
					});
				}
			},
			error: function(error) {
				if (!closed) if (closed = !0, null === previousBlockedChunk) controller.error(error);
				else {
					var blockedChunk = previousBlockedChunk;
					previousBlockedChunk = null;
					blockedChunk.then(function() {
						return controller.error(error);
					});
				}
			}
		};
		resolveStream(response, reference, stream, flightController);
		return stream;
	}
	function FlightIterator(next) {
		this.next = next;
	}
	FlightIterator.prototype = {};
	FlightIterator.prototype[ASYNC_ITERATOR] = function() {
		return this;
	};
	function parseAsyncIterable(response, reference, iterator) {
		reference = parseInt(reference.slice(2), 16);
		if (response._chunks.has(reference)) throw Error("Already initialized stream.");
		var buffer = [], closed = !1, nextWriteIndex = 0, $jscomp$compprop5 = {};
		$jscomp$compprop5 = ($jscomp$compprop5[ASYNC_ITERATOR] = function() {
			var nextReadIndex = 0;
			return new FlightIterator(function(arg) {
				if (void 0 !== arg) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
				if (nextReadIndex === buffer.length) {
					if (closed) return new ReactPromise("fulfilled", {
						done: !0,
						value: void 0
					}, null);
					buffer[nextReadIndex] = new ReactPromise("pending", null, null);
				}
				return buffer[nextReadIndex++];
			});
		}, $jscomp$compprop5);
		iterator = iterator ? $jscomp$compprop5[ASYNC_ITERATOR]() : $jscomp$compprop5;
		resolveStream(response, reference, iterator, {
			enqueueModel: function(value) {
				nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !1) : resolveIteratorResultChunk(response, buffer[nextWriteIndex], value, !1);
				nextWriteIndex++;
			},
			close: function(value) {
				if (!closed) for (closed = !0, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !0) : resolveIteratorResultChunk(response, buffer[nextWriteIndex], value, !0), nextWriteIndex++; nextWriteIndex < buffer.length;) resolveIteratorResultChunk(response, buffer[nextWriteIndex++], "\"$undefined\"", !0);
			},
			error: function(error) {
				if (!closed) for (closed = !0, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = new ReactPromise("pending", null, null)); nextWriteIndex < buffer.length;) triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
			}
		});
		return iterator;
	}
	function parseModelString(response, obj, key, value, reference, arrayRoot) {
		if ("$" === value[0]) {
			switch (value[1]) {
				case "$": return null !== arrayRoot && bumpArrayCount(arrayRoot, value.length - 1, response), value.slice(1);
				case "@": return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
				case "h": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, loadServerReference$1);
				case "T":
					if (void 0 === reference || void 0 === response._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
					return createTemporaryReference(response._temporaryReferences, reference);
				case "Q": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createMap);
				case "W": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createSet);
				case "K":
					obj = value.slice(2);
					obj = response._prefix + obj + "_";
					key = new FormData();
					response = response._formData;
					arrayRoot = Array.from(response.keys());
					for (value = 0; value < arrayRoot.length; value++) if (reference = arrayRoot[value], reference.startsWith(obj)) {
						for (var entries = response.getAll(reference), newKey = reference.slice(obj.length), j = 0; j < entries.length; j++) key.append(newKey, entries[j]);
						response.delete(reference);
					}
					return key;
				case "i": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, extractIterator);
				case "I": return Infinity;
				case "-": return "$-0" === value ? -0 : -Infinity;
				case "N": return NaN;
				case "u": return;
				case "D": return new Date(Date.parse(value.slice(2)));
				case "n":
					obj = value.slice(2);
					if (300 < obj.length) throw Error("BigInt is too large. Received " + obj.length + " digits but the limit is 300.");
					null !== arrayRoot && bumpArrayCount(arrayRoot, obj.length, response);
					return BigInt(obj);
				case "A": return parseTypedArray(response, value, ArrayBuffer, 1, obj, key, arrayRoot);
				case "O": return parseTypedArray(response, value, Int8Array, 1, obj, key, arrayRoot);
				case "o": return parseTypedArray(response, value, Uint8Array, 1, obj, key, arrayRoot);
				case "U": return parseTypedArray(response, value, Uint8ClampedArray, 1, obj, key, arrayRoot);
				case "S": return parseTypedArray(response, value, Int16Array, 2, obj, key, arrayRoot);
				case "s": return parseTypedArray(response, value, Uint16Array, 2, obj, key, arrayRoot);
				case "L": return parseTypedArray(response, value, Int32Array, 4, obj, key, arrayRoot);
				case "l": return parseTypedArray(response, value, Uint32Array, 4, obj, key, arrayRoot);
				case "G": return parseTypedArray(response, value, Float32Array, 4, obj, key, arrayRoot);
				case "g": return parseTypedArray(response, value, Float64Array, 8, obj, key, arrayRoot);
				case "M": return parseTypedArray(response, value, BigInt64Array, 8, obj, key, arrayRoot);
				case "m": return parseTypedArray(response, value, BigUint64Array, 8, obj, key, arrayRoot);
				case "V": return parseTypedArray(response, value, DataView, 1, obj, key, arrayRoot);
				case "B": return obj = parseInt(value.slice(2), 16), response._formData.get(response._prefix + obj);
				case "R": return parseReadableStream(response, value, void 0);
				case "r": return parseReadableStream(response, value, "bytes");
				case "X": return parseAsyncIterable(response, value, !1);
				case "x": return parseAsyncIterable(response, value, !0);
			}
			value = value.slice(1);
			return getOutlinedModel(response, value, obj, key, arrayRoot, createModel);
		}
		null !== arrayRoot && bumpArrayCount(arrayRoot, value.length, response);
		return value;
	}
	function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
		var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), arraySizeLimit = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1e6;
		return {
			_bundlerConfig: bundlerConfig,
			_prefix: formFieldPrefix,
			_formData: backingFormData,
			_chunks: /* @__PURE__ */ new Map(),
			_closed: !1,
			_closedReason: null,
			_temporaryReferences: temporaryReferences,
			_rootArrayContexts: /* @__PURE__ */ new WeakMap(),
			_arraySizeLimit: arraySizeLimit
		};
	}
	function close(response) {
		reportGlobalError(response, Error("Connection closed."));
	}
	function loadServerReference(bundlerConfig, metaData) {
		var id = metaData.id;
		if ("string" !== typeof id) return null;
		var serverReference = resolveServerReference(bundlerConfig, id);
		bundlerConfig = preloadModule(serverReference);
		metaData = metaData.bound;
		return metaData instanceof Promise ? Promise.all([metaData, bundlerConfig]).then(function(_ref) {
			_ref = _ref[0];
			var fn = requireModule(serverReference);
			if (1e3 < _ref.length) throw Error("Server Function has too many bound arguments. Received " + _ref.length + " but the limit is 1000.");
			return fn.bind.apply(fn, [null].concat(_ref));
		}) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
			return requireModule(serverReference);
		}) : Promise.resolve(requireModule(serverReference));
	}
	function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix, arraySizeLimit) {
		body = createResponse(serverManifest, formFieldPrefix, void 0, body, arraySizeLimit);
		close(body);
		body = getChunk(body, 0);
		body.then(function() {});
		if ("fulfilled" !== body.status) throw body.reason;
		return body.value;
	}
	exports.createClientModuleProxy = function(moduleId) {
		moduleId = registerClientReferenceImpl({}, moduleId, !1);
		return new Proxy(moduleId, proxyHandlers$1);
	};
	exports.createTemporaryReferenceSet = function() {
		return /* @__PURE__ */ new WeakMap();
	};
	exports.decodeAction = function(body, serverManifest) {
		var formData = new FormData(), action = null, seenActions = /* @__PURE__ */ new Set();
		body.forEach(function(value, key) {
			key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? seenActions.has(key) || (seenActions.add(key), value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value)) : key.startsWith("$ACTION_ID_") && !seenActions.has(key) && (seenActions.add(key), value = key.slice(11), action = loadServerReference(serverManifest, {
				id: value,
				bound: null
			})) : formData.append(key, value);
		});
		return null === action ? null : action.then(function(fn) {
			return fn.bind(null, formData);
		});
	};
	exports.decodeFormState = function(actionResult, body, serverManifest) {
		var keyPath = body.get("$ACTION_KEY");
		if ("string" !== typeof keyPath) return Promise.resolve(null);
		var metaData = null;
		body.forEach(function(value, key) {
			key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
		});
		if (null === metaData) return Promise.resolve(null);
		var referenceId = metaData.id;
		return Promise.resolve(metaData.bound).then(function(bound) {
			return null === bound ? null : [
				actionResult,
				keyPath,
				referenceId,
				bound.length - 1
			];
		});
	};
	exports.decodeReply = function(body, webpackMap, options) {
		if ("string" === typeof body) {
			var form = new FormData();
			form.append("0", body);
			body = form;
		}
		body = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0, body, options ? options.arraySizeLimit : void 0);
		webpackMap = getChunk(body, 0);
		close(body);
		return webpackMap;
	};
	exports.decodeReplyFromAsyncIterable = function(iterable, webpackMap, options) {
		function progress(entry) {
			if (entry.done) close(response);
			else {
				entry = entry.value;
				var name = entry[0];
				entry = entry[1];
				if ("string" === typeof entry) {
					response._formData.append(name, entry);
					var prefix = response._prefix;
					if (name.startsWith(prefix)) {
						var chunks = response._chunks;
						name = +name.slice(prefix.length);
						(chunks = chunks.get(name)) && resolveModelChunk(response, chunks, entry, name);
					}
				} else response._formData.append(name, entry);
				iterator.next().then(progress, error);
			}
		}
		function error(reason) {
			reportGlobalError(response, reason);
			"function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
		}
		var iterator = iterable[ASYNC_ITERATOR](), response = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0, void 0, options ? options.arraySizeLimit : void 0);
		iterator.next().then(progress, error);
		return getChunk(response, 0);
	};
	exports.prerender = function(model, webpackMap, options) {
		return new Promise(function(resolve, reject) {
			var request = new RequestInstance(21, model, webpackMap, options ? options.onError : void 0, options ? options.onPostpone : void 0, function() {
				resolve({ prelude: new ReadableStream({
					type: "bytes",
					pull: function(controller) {
						startFlowing(request, controller);
					},
					cancel: function(reason) {
						request.destination = null;
						abort(request, reason);
					}
				}, { highWaterMark: 0 }) });
			}, reject, options ? options.identifierPrefix : void 0, options ? options.temporaryReferences : void 0);
			if (options && options.signal) {
				var signal = options.signal;
				if (signal.aborted) abort(request, signal.reason);
				else {
					var listener = function() {
						abort(request, signal.reason);
						signal.removeEventListener("abort", listener);
					};
					signal.addEventListener("abort", listener);
				}
			}
			startWork(request);
		});
	};
	exports.registerClientReference = function(proxyImplementation, id, exportName) {
		return registerClientReferenceImpl(proxyImplementation, id + "#" + exportName, !1);
	};
	exports.registerServerReference = function(reference, id, exportName) {
		return Object.defineProperties(reference, {
			$$typeof: { value: SERVER_REFERENCE_TAG },
			$$id: {
				value: null === exportName ? id : id + "#" + exportName,
				configurable: !0
			},
			$$bound: {
				value: null,
				configurable: !0
			},
			bind: {
				value: bind,
				configurable: !0
			},
			toString: serverReferenceToString
		});
	};
	exports.renderToReadableStream = function(model, webpackMap, options) {
		var request = new RequestInstance(20, model, webpackMap, options ? options.onError : void 0, options ? options.onPostpone : void 0, noop, noop, options ? options.identifierPrefix : void 0, options ? options.temporaryReferences : void 0);
		if (options && options.signal) {
			var signal = options.signal;
			if (signal.aborted) abort(request, signal.reason);
			else {
				var listener = function() {
					abort(request, signal.reason);
					signal.removeEventListener("abort", listener);
				};
				signal.addEventListener("abort", listener);
			}
		}
		return new ReadableStream({
			type: "bytes",
			start: function() {
				startWork(request);
			},
			pull: function(controller) {
				startFlowing(request, controller);
			},
			cancel: function(reason) {
				request.destination = null;
				abort(request, reason);
			}
		}, { highWaterMark: 0 });
	};
}));
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/core/rsc.js
var import_server_edge = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var s = require_react_server_dom_webpack_server_edge_production();
	exports.renderToReadableStream = s.renderToReadableStream;
	exports.decodeReply = s.decodeReply;
	exports.decodeReplyFromAsyncIterable = s.decodeReplyFromAsyncIterable;
	exports.decodeAction = s.decodeAction;
	exports.decodeFormState = s.decodeFormState;
	exports.registerServerReference = s.registerServerReference;
	exports.registerClientReference = s.registerClientReference;
	exports.createClientModuleProxy = s.createClientModuleProxy;
	exports.createTemporaryReferenceSet = s.createTemporaryReferenceSet;
})))(), 1);
var init = false;
var requireModule;
function setRequireModule(options) {
	if (init) return;
	init = true;
	requireModule = (id) => {
		return options.load(removeReferenceCacheTag(id));
	};
	globalThis.__vite_rsc_server_require__ = memoize(async (id) => {
		if (id.startsWith("$$decode-client:")) {
			id = id.slice(SERVER_DECODE_CLIENT_PREFIX.length);
			id = removeReferenceCacheTag(id);
			const target = {};
			const getOrCreateClientReference = (name) => {
				return target[name] ??= import_server_edge.registerClientReference(() => {
					throw new Error(`Unexpectedly client reference export '${name}' is called on server`);
				}, id, name);
			};
			return new Proxy(target, { getOwnPropertyDescriptor(_target, name) {
				if (typeof name !== "string" || name === "then") return Reflect.getOwnPropertyDescriptor(target, name);
				getOrCreateClientReference(name);
				return Reflect.getOwnPropertyDescriptor(target, name);
			} });
		}
		return requireModule(id);
	});
	setInternalRequire();
}
async function loadServerAction(id) {
	const [file, name] = id.split("#");
	return (await requireModule(file))[name];
}
function createServerManifest() {
	const cacheTag = "";
	return new Proxy({}, { get(_target, $$id, _receiver) {
		tinyassert(typeof $$id === "string");
		let [id, name] = $$id.split("#");
		tinyassert(id);
		tinyassert(name);
		return {
			id: SERVER_REFERENCE_PREFIX + id + cacheTag,
			name,
			chunks: [],
			async: true
		};
	} });
}
function createClientManifest(options) {
	const cacheTag = "";
	return new Proxy({}, { get(_target, $$id, _receiver) {
		tinyassert(typeof $$id === "string");
		let [id, name] = $$id.split("#");
		tinyassert(id);
		tinyassert(name);
		options?.onClientReference?.({
			id,
			name
		});
		return {
			id: id + cacheTag,
			name,
			chunks: [],
			async: true
		};
	} });
}
//#endregion
//#region node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.edge.production.js
/**
* @license React
* react-server-dom-webpack-client.edge.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_server_dom_webpack_client_edge_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ReactDOM = require_react_dom_react_server(), hasOwnProperty = Object.prototype.hasOwnProperty;
	function requireModule(metadata) {
		var moduleExports = __vite_rsc_require__(metadata[0]);
		if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
		else throw moduleExports.reason;
		if ("*" === metadata[2]) return moduleExports;
		if ("" === metadata[2]) return moduleExports.__esModule ? moduleExports.default : moduleExports;
		if (hasOwnProperty.call(moduleExports, metadata[2])) return moduleExports[metadata[2]];
	}
	ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
	Array.isArray;
	Function.prototype.bind;
	Array.prototype.slice;
	function ReactPromise(status, value, reason) {
		this.status = status;
		this.value = value;
		this.reason = reason;
	}
	ReactPromise.prototype = Object.create(Promise.prototype);
	ReactPromise.prototype.then = function(resolve, reject) {
		switch (this.status) {
			case "resolved_model":
				initializeModelChunk(this);
				break;
			case "resolved_module": initializeModuleChunk(this);
		}
		switch (this.status) {
			case "fulfilled":
				"function" === typeof resolve && resolve(this.value);
				break;
			case "pending":
			case "blocked":
				"function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
				"function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
				break;
			case "halted": break;
			default: "function" === typeof reject && reject(this.reason);
		}
	};
	function wakeChunk(listeners, value, chunk) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
		}
	}
	function rejectChunk(listeners, error) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(error) : rejectReference(listener, error);
		}
	}
	function resolveBlockedCycle(resolvedChunk, reference) {
		var referencedChunk = reference.handler.chunk;
		if (null === referencedChunk) return null;
		if (referencedChunk === resolvedChunk) return reference.handler;
		reference = referencedChunk.value;
		if (null !== reference) for (referencedChunk = 0; referencedChunk < reference.length; referencedChunk++) {
			var listener = reference[referencedChunk];
			if ("function" !== typeof listener && (listener = resolveBlockedCycle(resolvedChunk, listener), null !== listener)) return listener;
		}
		return null;
	}
	function triggerErrorOnChunk(response, chunk, error) {
		"pending" !== chunk.status && "blocked" !== chunk.status ? chunk.reason.error(error) : (response = chunk.reason, chunk.status = "rejected", chunk.reason = error, null !== response && rejectChunk(response, error));
	}
	var initializingHandler = null;
	function initializeModelChunk(chunk) {
		var prevHandler = initializingHandler;
		initializingHandler = null;
		var resolvedModel = chunk.value, response = chunk.reason;
		chunk.status = "blocked";
		chunk.value = null;
		chunk.reason = null;
		try {
			var value = JSON.parse(resolvedModel, response._fromJSON), resolveListeners = chunk.value;
			if (null !== resolveListeners) for (chunk.value = null, chunk.reason = null, resolvedModel = 0; resolvedModel < resolveListeners.length; resolvedModel++) {
				var listener = resolveListeners[resolvedModel];
				"function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
			}
			if (null !== initializingHandler) {
				if (initializingHandler.errored) throw initializingHandler.reason;
				if (0 < initializingHandler.deps) {
					initializingHandler.value = value;
					initializingHandler.chunk = chunk;
					return;
				}
			}
			chunk.status = "fulfilled";
			chunk.value = value;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		} finally {
			initializingHandler = prevHandler;
		}
	}
	function initializeModuleChunk(chunk) {
		try {
			var value = requireModule(chunk.value);
			chunk.status = "fulfilled";
			chunk.value = value;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		}
	}
	function fulfillReference(reference, value) {
		var response = reference.response, handler = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
		try {
			for (var i = 1; i < path.length; i++) {
				for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE;) {
					var referencedChunk = value._payload;
					if (referencedChunk === handler.chunk) value = handler.value;
					else {
						switch (referencedChunk.status) {
							case "resolved_model":
								initializeModelChunk(referencedChunk);
								break;
							case "resolved_module": initializeModuleChunk(referencedChunk);
						}
						switch (referencedChunk.status) {
							case "fulfilled":
								value = referencedChunk.value;
								continue;
							case "blocked":
								var cyclicHandler = resolveBlockedCycle(referencedChunk, reference);
								if (null !== cyclicHandler) {
									value = cyclicHandler.value;
									continue;
								}
							case "pending":
								path.splice(0, i - 1);
								null === referencedChunk.value ? referencedChunk.value = [reference] : referencedChunk.value.push(reference);
								null === referencedChunk.reason ? referencedChunk.reason = [reference] : referencedChunk.reason.push(reference);
								return;
							case "halted": return;
							default:
								rejectReference(reference, referencedChunk.reason);
								return;
						}
					}
				}
				var name = path[i];
				if ("object" === typeof value && null !== value && hasOwnProperty.call(value, name)) value = value[name];
				else throw Error("Invalid reference.");
			}
			for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE;) {
				var referencedChunk$44 = value._payload;
				if (referencedChunk$44 === handler.chunk) value = handler.value;
				else {
					switch (referencedChunk$44.status) {
						case "resolved_model":
							initializeModelChunk(referencedChunk$44);
							break;
						case "resolved_module": initializeModuleChunk(referencedChunk$44);
					}
					switch (referencedChunk$44.status) {
						case "fulfilled":
							value = referencedChunk$44.value;
							continue;
					}
					break;
				}
			}
			var mappedValue = map(response, value, parentObject, key);
			"__proto__" !== key && (parentObject[key] = mappedValue);
			"" === key && null === handler.value && (handler.value = mappedValue);
			if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler.value && null !== handler.value && handler.value.$$typeof === REACT_ELEMENT_TYPE) {
				var element = handler.value;
				switch (key) {
					case "3": element.props = mappedValue;
				}
			}
		} catch (error) {
			rejectReference(reference, error);
			return;
		}
		handler.deps--;
		0 === handler.deps && (reference = handler.chunk, null !== reference && "blocked" === reference.status && (value = reference.value, reference.status = "fulfilled", reference.value = handler.value, reference.reason = handler.reason, null !== value && wakeChunk(value, handler.value, reference)));
	}
	function rejectReference(reference, error) {
		var handler = reference.handler;
		reference = reference.response;
		handler.errored || (handler.errored = !0, handler.value = null, handler.reason = error, handler = handler.chunk, null !== handler && "blocked" === handler.status && triggerErrorOnChunk(reference, handler, error));
	}
}));
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_server_dom_webpack_client_edge_production();
})))();
function renderToReadableStream$2(data, options, extraOptions) {
	return import_server_edge.renderToReadableStream(data, createClientManifest({ onClientReference: extraOptions?.onClientReference }), options);
}
function registerClientReference(proxy, id, name) {
	return import_server_edge.registerClientReference(proxy, id, name);
}
var decodeReply = (body, options) => import_server_edge.decodeReply(body, createServerManifest(), options);
var createTemporaryReferenceSet = import_server_edge.createTemporaryReferenceSet;
//#endregion
//#region \0virtual:vite-rsc/server-references
var server_references_default = {};
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/rsc.js
initialize();
function initialize() {
	setRequireModule({ load: async (id) => {
		{
			const import_ = server_references_default[id];
			if (!import_) throw new Error(`server reference not found '${id}'`);
			return import_();
		}
	} });
}
function renderToReadableStream$1(data, options, extraOptions) {
	return renderToReadableStream$2(data, options, { onClientReference(metadata) {
		const deps = assetsManifest.clientReferenceDeps[metadata.id] ?? {
			js: [],
			css: []
		};
		extraOptions?.onClientReference?.({
			id: metadata.id,
			name: metadata.name,
			deps
		});
	} });
}
//#endregion
//#region node_modules/vinext/dist/utils/base-path.js
var import_react_react_server = /* @__PURE__ */ __toESM(require_react_react_server(), 1);
/**
* Shared basePath helpers.
*
* Next.js only treats a pathname as being under basePath when it is an exact
* match ("/app") or starts with the basePath followed by a path separator
* ("/app/..."). Prefix-only matches like "/application" must be left intact.
*/
/**
* Check whether a pathname is inside the configured basePath.
*/
function hasBasePath(pathname, basePath) {
	if (!basePath) return false;
	return pathname === basePath || pathname.startsWith(basePath + "/");
}
/**
* Strip the basePath prefix from a pathname when it matches on a segment
* boundary. Returns the original pathname when it is outside the basePath.
*/
function stripBasePath(pathname, basePath) {
	if (!hasBasePath(pathname, basePath)) return pathname;
	return pathname.slice(basePath.length) || "/";
}
//#endregion
//#region node_modules/vinext/dist/shims/readonly-url-search-params.js
var ReadonlyURLSearchParamsError = class extends Error {
	constructor() {
		super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
	}
};
/**
* Read-only URLSearchParams wrapper matching Next.js runtime behavior.
* Mutation methods remain present for instanceof/API compatibility but throw.
*/
var ReadonlyURLSearchParams = class extends URLSearchParams {
	append(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	delete(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	set(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	sort() {
		throw new ReadonlyURLSearchParamsError();
	}
};
//#endregion
//#region node_modules/vinext/dist/shims/navigation.js
var _SERVER_INSERTED_HTML_CTX_KEY = Symbol.for("vinext.serverInsertedHTMLContext");
function getServerInsertedHTMLContext() {
	if (typeof import_react_react_server.createContext !== "function") return null;
	const globalState = globalThis;
	if (!globalState[_SERVER_INSERTED_HTML_CTX_KEY]) globalState[_SERVER_INSERTED_HTML_CTX_KEY] = import_react_react_server.createContext(null);
	return globalState[_SERVER_INSERTED_HTML_CTX_KEY] ?? null;
}
getServerInsertedHTMLContext();
var GLOBAL_ACCESSORS_KEY = Symbol.for("vinext.navigation.globalAccessors");
var _GLOBAL_ACCESSORS_KEY = GLOBAL_ACCESSORS_KEY;
function _getGlobalAccessors() {
	return globalThis[_GLOBAL_ACCESSORS_KEY];
}
var _serverContext = null;
var _getServerContext = () => {
	const g = _getGlobalAccessors();
	return g ? g.getServerContext() : _serverContext;
};
var _setServerContext = (ctx) => {
	const g = _getGlobalAccessors();
	if (g) g.setServerContext(ctx);
	else _serverContext = ctx;
};
/**
* Register ALS-backed state accessors. Called by navigation-state.ts on import.
* @internal
*/
function _registerStateAccessors(accessors) {
	_getServerContext = accessors.getServerContext;
	_setServerContext = accessors.setServerContext;
	accessors.getInsertedHTMLCallbacks;
	accessors.clearInsertedHTMLCallbacks;
}
/**
* Get the navigation context for the current SSR/RSC render.
* Reads from AsyncLocalStorage when available (concurrent-safe),
* otherwise falls back to module-level state.
*/
function getNavigationContext() {
	return _getServerContext();
}
/**
* Set the navigation context for the current SSR/RSC render.
* Called by the framework entry before rendering each request.
*/
function setNavigationContext$1(ctx) {
	_setServerContext(ctx);
}
var isServer = typeof window === "undefined";
var _CLIENT_NAV_STATE_KEY = Symbol.for("vinext.clientNavigationState");
function getClientNavigationState() {
	if (isServer) return null;
	const globalState = window;
	globalState[_CLIENT_NAV_STATE_KEY] ??= {
		listeners: /* @__PURE__ */ new Set(),
		cachedSearch: window.location.search,
		cachedReadonlySearchParams: new ReadonlyURLSearchParams(window.location.search),
		cachedPathname: stripBasePath(window.location.pathname, ""),
		clientParams: {},
		clientParamsJson: "{}",
		pendingClientParams: null,
		pendingClientParamsJson: null,
		originalPushState: window.history.pushState.bind(window.history),
		originalReplaceState: window.history.replaceState.bind(window.history),
		patchInstalled: false,
		hasPendingNavigationUpdate: false,
		suppressUrlNotifyCount: 0,
		navigationSnapshotActiveCount: 0
	};
	return globalState[_CLIENT_NAV_STATE_KEY];
}
function notifyNavigationListeners() {
	const state = getClientNavigationState();
	if (!state) return;
	for (const fn of state.listeners) fn();
}
function syncCommittedUrlStateFromLocation() {
	const state = getClientNavigationState();
	if (!state) return false;
	let changed = false;
	const pathname = stripBasePath(window.location.pathname, "");
	if (pathname !== state.cachedPathname) {
		state.cachedPathname = pathname;
		changed = true;
	}
	const search = window.location.search;
	if (search !== state.cachedSearch) {
		state.cachedSearch = search;
		state.cachedReadonlySearchParams = new ReadonlyURLSearchParams(search);
		changed = true;
	}
	return changed;
}
function commitClientNavigationState() {
	if (isServer) return;
	const state = getClientNavigationState();
	if (!state) return;
	if (state.navigationSnapshotActiveCount > 0) state.navigationSnapshotActiveCount -= 1;
	const urlChanged = syncCommittedUrlStateFromLocation();
	if (state.pendingClientParams !== null && state.pendingClientParamsJson !== null) {
		state.clientParams = state.pendingClientParams;
		state.clientParamsJson = state.pendingClientParamsJson;
		state.pendingClientParams = null;
		state.pendingClientParamsJson = null;
	}
	const shouldNotify = urlChanged || state.hasPendingNavigationUpdate;
	state.hasPendingNavigationUpdate = false;
	if (shouldNotify) notifyNavigationListeners();
}
/**
* Restore scroll position from a history state object (used on popstate).
*
* When an RSC navigation is in flight (back/forward triggers both this
* handler and the browser entry's popstate handler which calls
* __VINEXT_RSC_NAVIGATE__), we must wait for the new content to render
* before scrolling. Otherwise the user sees old content flash at the
* restored scroll position.
*
* This handler fires before the browser entry's popstate handler (because
* navigation.ts is loaded before hydration completes), so we defer via a
* microtask to give the browser entry handler a chance to set
* __VINEXT_RSC_PENDING__. Promise.resolve() schedules a microtask
* that runs after all synchronous event listeners have completed.
*/
function restoreScrollPosition(state) {
	if (state && typeof state === "object" && "__vinext_scrollY" in state) {
		const { __vinext_scrollX: x, __vinext_scrollY: y } = state;
		Promise.resolve().then(() => {
			const pending = window.__VINEXT_RSC_PENDING__ ?? null;
			if (pending) pending.then(() => {
				requestAnimationFrame(() => {
					window.scrollTo(x, y);
				});
			});
			else requestAnimationFrame(() => {
				window.scrollTo(x, y);
			});
		});
	}
}
/**
* HTTP Access Fallback error code — shared prefix for notFound/forbidden/unauthorized.
* Matches Next.js 16's unified error handling approach.
*/
var HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
/**
* Internal error class used by redirect/notFound/forbidden/unauthorized.
* The `digest` field is the serialised control-flow signal read by the
* framework's error boundary and server-side request handlers.
*/
var VinextNavigationError = class extends Error {
	digest;
	constructor(message, digest) {
		super(message);
		this.digest = digest;
	}
};
/**
* Throw a redirect. Caught by the framework to send a redirect response.
*
* When `type` is omitted, the digest carries an empty sentinel so the
* catch site can resolve the default based on context:
* - Server Action context → "push"  (Back button works after form submission)
* - SSR render context    → "replace"
*
* This matches Next.js behavior where `redirect()` checks
* `actionAsyncStorage.getStore()?.isAction` at call time.
*
* @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/redirect.ts
*/
function redirect(url, type) {
	throw new VinextNavigationError(`NEXT_REDIRECT:${url}`, `NEXT_REDIRECT;${type ?? ""};${encodeURIComponent(url)}`);
}
/**
* Trigger a not-found response (404). Caught by the framework.
*/
function notFound() {
	throw new VinextNavigationError("NEXT_NOT_FOUND", `${HTTP_ERROR_FALLBACK_ERROR_CODE};404`);
}
if (!isServer) {
	const state = getClientNavigationState();
	if (state && !state.patchInstalled) {
		state.patchInstalled = true;
		window.addEventListener("popstate", (event) => {
			if (typeof window.__VINEXT_RSC_NAVIGATE__ !== "function") {
				commitClientNavigationState();
				restoreScrollPosition(event.state);
			}
		});
		window.history.pushState = function patchedPushState(data, unused, url) {
			state.originalPushState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
		window.history.replaceState = function patchedReplaceState(data, unused, url) {
			state.originalReplaceState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
	}
}
//#endregion
//#region node_modules/vinext/dist/shims/unified-request-context.js
/**
* Unified per-request context backed by a single AsyncLocalStorage.
*
* Consolidates the 5–6 nested ALS scopes that previously wrapped every
* App Router request (headers, navigation, cache-state, private-cache,
* fetch-cache, execution-context) into one flat store.
*
* Each shim module checks `isInsideUnifiedScope()` and reads its sub-fields
* from the unified store, falling back to its own standalone ALS when
* outside (SSR environment, Pages Router, tests).
*/
var _ALS_KEY$5 = Symbol.for("vinext.unifiedRequestContext.als");
var _REQUEST_CONTEXT_ALS_KEY = Symbol.for("vinext.requestContext.als");
var _g$7 = globalThis;
var _als$4 = _g$7[_ALS_KEY$5] ??= new AsyncLocalStorage$1();
function _getInheritedExecutionContext() {
	const unifiedStore = _als$4.getStore();
	if (unifiedStore) return unifiedStore.executionContext;
	return _g$7[_REQUEST_CONTEXT_ALS_KEY]?.getStore() ?? null;
}
/**
* Create a fresh `UnifiedRequestContext` with defaults for all fields.
* Pass partial overrides for the fields you need to pre-populate.
*/
function createRequestContext(opts) {
	return {
		headersContext: null,
		dynamicUsageDetected: false,
		pendingSetCookies: [],
		draftModeCookieHeader: null,
		phase: "render",
		i18nContext: null,
		serverContext: null,
		serverInsertedHTMLCallbacks: [],
		requestScopedCacheLife: null,
		_privateCache: null,
		currentRequestTags: [],
		executionContext: _getInheritedExecutionContext(),
		requestCache: /* @__PURE__ */ new WeakMap(),
		ssrContext: null,
		ssrHeadChildren: [],
		...opts
	};
}
/**
* Run `fn` within a unified request context scope.
* All shim modules will read/write their state from `ctx` for the
* duration of the call, including async continuations.
*/
function runWithRequestContext(ctx, fn) {
	return _als$4.run(ctx, fn);
}
/**
* Get the current unified request context.
* Returns the ALS store when inside a `runWithRequestContext()` scope,
* or a fresh detached context otherwise. Unlike the legacy per-shim fallback
* singletons, this detached value is ephemeral — mutations do not persist
* across calls. This is intentional to prevent state leakage outside request
* scopes.
*
* Only direct callers observe this detached fallback. Shim `_getState()`
* helpers should continue to gate on `isInsideUnifiedScope()` and fall back
* to their standalone ALS/fallback singletons outside the unified scope.
* If called inside a standalone `runWithExecutionContext()` scope, the
* detached context still reflects that inherited `executionContext`.
*/
function getRequestContext() {
	return _als$4.getStore() ?? createRequestContext();
}
/**
* Check whether the current execution is inside a `runWithRequestContext()` scope.
* Shim modules use this to decide whether to read from the unified store
* or fall back to their own standalone ALS.
*/
function isInsideUnifiedScope() {
	return _als$4.getStore() != null;
}
//#endregion
//#region node_modules/vinext/dist/server/middleware-request-headers.js
var MIDDLEWARE_REQUEST_HEADER_PREFIX = "x-middleware-request-";
var MIDDLEWARE_OVERRIDE_HEADERS = "x-middleware-override-headers";
function encodeMiddlewareRequestHeaders(targetHeaders, requestHeaders) {
	const overrideHeaderNames = [...requestHeaders.keys()];
	targetHeaders.set(MIDDLEWARE_OVERRIDE_HEADERS, overrideHeaderNames.join(","));
	for (const [key, value] of requestHeaders.entries()) targetHeaders.set(`${MIDDLEWARE_REQUEST_HEADER_PREFIX}${key}`, value);
}
//#endregion
//#region node_modules/vinext/dist/shims/internal/parse-cookie-header.js
/**
* Port of the current Next.js/@edge-runtime request cookie parser semantics.
*
* Important details:
* - split on a semicolon-plus-optional-spaces pattern
* - preserve whitespace around names/values otherwise
* - bare tokens become "true"
* - malformed percent-encoded values are skipped
* - duplicate names collapse to the last value via Map.set()
*/
function parseCookieHeader(cookieHeader) {
	const cookies = /* @__PURE__ */ new Map();
	for (const pair of cookieHeader.split(/; */)) {
		if (!pair) continue;
		const splitAt = pair.indexOf("=");
		if (splitAt === -1) {
			cookies.set(pair, "true");
			continue;
		}
		const key = pair.slice(0, splitAt);
		const value = pair.slice(splitAt + 1);
		try {
			cookies.set(key, decodeURIComponent(value));
		} catch {}
	}
	return cookies;
}
//#endregion
//#region node_modules/vinext/dist/shims/headers.js
/**
* next/headers shim
*
* Provides cookies() and headers() functions for App Router Server Components.
* These read from a request context set by the RSC handler before rendering.
*
* In Next.js 15+, cookies() and headers() return Promises (async).
* We support both the sync (legacy) and async patterns.
*/
var _ALS_KEY$4 = Symbol.for("vinext.nextHeadersShim.als");
var _FALLBACK_KEY$3 = Symbol.for("vinext.nextHeadersShim.fallback");
var _g$6 = globalThis;
var _als$3 = _g$6[_ALS_KEY$4] ??= new AsyncLocalStorage$1();
var _fallbackState$2 = _g$6[_FALLBACK_KEY$3] ??= {
	headersContext: null,
	dynamicUsageDetected: false,
	pendingSetCookies: [],
	draftModeCookieHeader: null,
	phase: "render"
};
(/* @__PURE__ */ new Date(0)).toUTCString();
function _getState$2() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _als$3.getStore() ?? _fallbackState$2;
}
/**
* Dynamic usage flag — set when a component calls connection(), cookies(),
* headers(), or noStore() during rendering. When true, ISR caching is
* bypassed and the response gets Cache-Control: no-store.
*/
/**
* Mark the current render as requiring dynamic (uncached) rendering.
* Called by connection(), cookies(), headers(), and noStore().
*/
function markDynamicUsage() {
	_getState$2().dynamicUsageDetected = true;
}
/**
* Check and reset the dynamic usage flag.
* Called by the server after rendering to decide on caching.
*/
function consumeDynamicUsage() {
	const state = _getState$2();
	const used = state.dynamicUsageDetected;
	state.dynamicUsageDetected = false;
	return used;
}
function _setStatePhase(state, phase) {
	const previous = state.phase;
	state.phase = phase;
	return previous;
}
function setHeadersAccessPhase(phase) {
	return _setStatePhase(_getState$2(), phase);
}
/**
* Set the headers/cookies context for the current RSC render.
* Called by the framework's RSC entry before rendering each request.
*
* @deprecated Prefer runWithHeadersContext() which uses als.run() for
* proper per-request isolation. This function mutates the ALS store
* in-place and is only safe for cleanup (ctx=null) within an existing
* als.run() scope.
*/
/**
* Returns the current live HeadersContext from ALS (or the fallback).
* Used after applyMiddlewareRequestHeaders() to build a post-middleware
* request context for afterFiles/fallback rewrite has/missing evaluation.
*/
function getHeadersContext() {
	return _getState$2().headersContext;
}
function setHeadersContext(ctx) {
	const state = _getState$2();
	if (ctx !== null) {
		state.headersContext = ctx;
		state.dynamicUsageDetected = false;
		state.pendingSetCookies = [];
		state.draftModeCookieHeader = null;
		state.phase = "render";
	} else {
		state.headersContext = null;
		state.phase = "render";
	}
}
/** Methods on `Headers` that mutate state. Hoisted to module scope — static. */
var _HEADERS_MUTATING_METHODS = new Set([
	"set",
	"delete",
	"append"
]);
/**
* Create a HeadersContext from a standard Request object.
*
* Performance note: In Workerd (Cloudflare Workers), `new Headers(request.headers)`
* copies the entire header map across the V8/C++ boundary, which shows up as
* ~815 ms self-time in production profiles when requests carry many headers.
* We defer this copy with a lazy proxy:
*
* - Reads (`get`, `has`, `entries`, …) are forwarded directly to the original
*   immutable `request.headers` — zero copy cost on the hot path.
* - The first mutating call (`set`, `delete`, `append`) materialises
*   `new Headers(request.headers)` once, then applies the mutation to the copy.
*   All subsequent operations go to the copy.
*
* This means the ~815 ms copy only occurs when middleware actually rewrites
* request headers via `NextResponse.next({ request: { headers } })`, which is
* uncommon.  Pure read requests (the vast majority) pay zero copy cost.
*
* Cookie parsing is also deferred: the `cookie` header string is not split
* until the first call to `cookies()` or `draftMode()`.
*/
function headersContextFromRequest(request) {
	let _mutable = null;
	const headersProxy = new Proxy(request.headers, { get(target, prop) {
		const src = _mutable ?? target;
		if (typeof prop === "string" && _HEADERS_MUTATING_METHODS.has(prop)) return (...args) => {
			if (!_mutable) _mutable = new Headers(target);
			return _mutable[prop](...args);
		};
		const value = Reflect.get(src, prop, src);
		return typeof value === "function" ? value.bind(src) : value;
	} });
	let _cookies = null;
	function getCookies() {
		if (_cookies) return _cookies;
		_cookies = parseCookieHeader(headersProxy.get("cookie") || "");
		return _cookies;
	}
	return {
		headers: headersProxy,
		get cookies() {
			return getCookies();
		}
	};
}
/** Accumulated Set-Cookie headers from cookies().set() / .delete() calls */
/**
* Get and clear all pending Set-Cookie headers generated by cookies().set()/delete().
* Called by the framework after rendering to attach headers to the response.
*/
function getAndClearPendingCookies() {
	const state = _getState$2();
	const cookies = state.pendingSetCookies;
	state.pendingSetCookies = [];
	return cookies;
}
/**
* Get any Set-Cookie header generated by draftMode().enable()/disable().
* Called by the framework after rendering to attach the header to the response.
*/
function getDraftModeCookieHeader() {
	const state = _getState$2();
	const header = state.draftModeCookieHeader;
	state.draftModeCookieHeader = null;
	return header;
}
//#endregion
//#region node_modules/vinext/dist/shims/request-context.js
/**
* Request ExecutionContext — AsyncLocalStorage-backed accessor.
*
* Makes the Cloudflare Workers `ExecutionContext` (which provides
* `waitUntil`) available to any code on the call stack during a request
* without requiring it to be threaded through every function signature.
*
* Usage:
*
*   // In the worker entry, wrap the handler:
*   import { runWithExecutionContext } from "vinext/shims/request-context";
*   export default {
*     fetch(request, env, ctx) {
*       return runWithExecutionContext(ctx, () => handler.fetch(request, env, ctx));
*     }
*   };
*
*   // Anywhere downstream:
*   import { getRequestExecutionContext } from "vinext/shims/request-context";
*   const ctx = getRequestExecutionContext(); // null on Node.js dev
*   ctx?.waitUntil(somePromise);
*/
var _ALS_KEY$3 = Symbol.for("vinext.requestContext.als");
var _g$5 = globalThis;
var _als$2 = _g$5[_ALS_KEY$3] ??= new AsyncLocalStorage$1();
/**
* Get the `ExecutionContext` for the current request, or `null` when called
* outside a `runWithExecutionContext()` scope (e.g. on Node.js dev server).
*
* Use `ctx?.waitUntil(promise)` to schedule background work that must
* complete before the Worker isolate is torn down.
*/
function getRequestExecutionContext() {
	if (isInsideUnifiedScope()) return getRequestContext().executionContext;
	return _als$2.getStore() ?? null;
}
//#endregion
//#region node_modules/vinext/dist/shims/server.js
var NextRequest = class extends Request {
	_nextUrl;
	_cookies;
	constructor(input, init) {
		const { nextConfig: _nextConfig, ...requestInit } = init ?? {};
		if (input instanceof Request) {
			const req = input;
			super(req.url, {
				method: req.method,
				headers: req.headers,
				body: req.body,
				duplex: req.body ? "half" : void 0,
				...requestInit
			});
		} else super(input, requestInit);
		this._nextUrl = new NextURL(typeof input === "string" ? new URL(input, "http://localhost") : input instanceof URL ? input : new URL(input.url, "http://localhost"), void 0, _nextConfig ? {
			basePath: _nextConfig.basePath,
			nextConfig: { i18n: _nextConfig.i18n }
		} : void 0);
		this._cookies = new RequestCookies(this.headers);
	}
	get nextUrl() {
		return this._nextUrl;
	}
	get cookies() {
		return this._cookies;
	}
	/**
	* Client IP address. Prefers Cloudflare's trusted CF-Connecting-IP header
	* over the spoofable X-Forwarded-For. Returns undefined if unavailable.
	*/
	get ip() {
		return this.headers.get("cf-connecting-ip") ?? this.headers.get("x-real-ip") ?? this.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? void 0;
	}
	/**
	* Geolocation data. Platform-dependent (e.g., Cloudflare, Vercel).
	* Returns undefined if not available.
	*/
	get geo() {
		const country = this.headers.get("cf-ipcountry") ?? this.headers.get("x-vercel-ip-country") ?? void 0;
		if (!country) return void 0;
		return {
			country,
			city: this.headers.get("cf-ipcity") ?? this.headers.get("x-vercel-ip-city") ?? void 0,
			region: this.headers.get("cf-region") ?? this.headers.get("x-vercel-ip-country-region") ?? void 0,
			latitude: this.headers.get("cf-iplatitude") ?? this.headers.get("x-vercel-ip-latitude") ?? void 0,
			longitude: this.headers.get("cf-iplongitude") ?? this.headers.get("x-vercel-ip-longitude") ?? void 0
		};
	}
	/**
	* The build ID of the Next.js application.
	* Delegates to `nextUrl.buildId` to match Next.js API surface.
	* Can be used in middleware to detect deployment skew between client and server.
	*/
	get buildId() {
		return this._nextUrl.buildId;
	}
};
/** Valid HTTP redirect status codes, matching Next.js's REDIRECTS set. */
var REDIRECT_STATUSES = new Set([
	301,
	302,
	303,
	307,
	308
]);
var NextResponse = class NextResponse extends Response {
	_cookies;
	constructor(body, init) {
		super(body, init);
		this._cookies = new ResponseCookies(this.headers);
	}
	get cookies() {
		return this._cookies;
	}
	/**
	* Create a JSON response.
	*/
	static json(body, init) {
		const headers = new Headers(init?.headers);
		if (!headers.has("content-type")) headers.set("content-type", "application/json");
		return new NextResponse(JSON.stringify(body), {
			...init,
			headers
		});
	}
	/**
	* Create a redirect response.
	*/
	static redirect(url, init) {
		const status = typeof init === "number" ? init : init?.status ?? 307;
		if (!REDIRECT_STATUSES.has(status)) throw new RangeError(`Failed to execute "redirect" on "response": Invalid status code`);
		const destination = typeof url === "string" ? url : url.toString();
		const headers = new Headers(typeof init === "object" ? init?.headers : void 0);
		headers.set("Location", destination);
		return new NextResponse(null, {
			status,
			headers
		});
	}
	/**
	* Create a rewrite response (middleware pattern).
	* Sets the x-middleware-rewrite header.
	*/
	static rewrite(destination, init) {
		const url = typeof destination === "string" ? destination : destination.toString();
		const headers = new Headers(init?.headers);
		headers.set("x-middleware-rewrite", url);
		if (init?.request?.headers) encodeMiddlewareRequestHeaders(headers, init.request.headers);
		return new NextResponse(null, {
			...init,
			headers
		});
	}
	/**
	* Continue to the next handler (middleware pattern).
	* Sets the x-middleware-next header.
	*/
	static next(init) {
		const headers = new Headers(init?.headers);
		headers.set("x-middleware-next", "1");
		if (init?.request?.headers) encodeMiddlewareRequestHeaders(headers, init.request.headers);
		return new NextResponse(null, {
			...init,
			headers
		});
	}
};
var NextURL = class NextURL {
	/** Internal URL stores the pathname WITHOUT basePath or locale prefix. */
	_url;
	_basePath;
	_locale;
	_defaultLocale;
	_locales;
	constructor(input, base, config) {
		this._url = new URL(input.toString(), base);
		this._basePath = config?.basePath ?? "";
		this._stripBasePath();
		const i18n = config?.nextConfig?.i18n;
		if (i18n) {
			this._locales = [...i18n.locales];
			this._defaultLocale = i18n.defaultLocale;
			this._analyzeLocale(this._locales);
		}
	}
	/** Strip basePath prefix from the internal pathname. */
	_stripBasePath() {
		if (!this._basePath) return;
		const { pathname } = this._url;
		if (pathname === this._basePath || pathname.startsWith(this._basePath + "/")) this._url.pathname = pathname.slice(this._basePath.length) || "/";
	}
	/** Extract locale from pathname, stripping it from the internal URL. */
	_analyzeLocale(locales) {
		const segments = this._url.pathname.split("/");
		const candidate = segments[1]?.toLowerCase();
		const match = locales.find((l) => l.toLowerCase() === candidate);
		if (match) {
			this._locale = match;
			this._url.pathname = "/" + segments.slice(2).join("/");
		} else this._locale = this._defaultLocale;
	}
	/**
	* Reconstruct the full pathname with basePath + locale prefix.
	* Mirrors Next.js's internal formatPathname().
	*/
	_formatPathname() {
		let prefix = this._basePath;
		if (this._locale && this._locale !== this._defaultLocale) prefix += "/" + this._locale;
		if (!prefix) return this._url.pathname;
		const inner = this._url.pathname;
		return inner === "/" ? prefix : prefix + inner;
	}
	get href() {
		const formatted = this._formatPathname();
		if (formatted === this._url.pathname) return this._url.href;
		const { href, pathname, search, hash } = this._url;
		const baseEnd = href.length - pathname.length - search.length - hash.length;
		return href.slice(0, baseEnd) + formatted + search + hash;
	}
	set href(value) {
		this._url.href = value;
		this._stripBasePath();
		if (this._locales) this._analyzeLocale(this._locales);
	}
	get origin() {
		return this._url.origin;
	}
	get protocol() {
		return this._url.protocol;
	}
	set protocol(value) {
		this._url.protocol = value;
	}
	get username() {
		return this._url.username;
	}
	set username(value) {
		this._url.username = value;
	}
	get password() {
		return this._url.password;
	}
	set password(value) {
		this._url.password = value;
	}
	get host() {
		return this._url.host;
	}
	set host(value) {
		this._url.host = value;
	}
	get hostname() {
		return this._url.hostname;
	}
	set hostname(value) {
		this._url.hostname = value;
	}
	get port() {
		return this._url.port;
	}
	set port(value) {
		this._url.port = value;
	}
	/** Returns the pathname WITHOUT basePath or locale prefix. */
	get pathname() {
		return this._url.pathname;
	}
	set pathname(value) {
		this._url.pathname = value;
	}
	get search() {
		return this._url.search;
	}
	set search(value) {
		this._url.search = value;
	}
	get searchParams() {
		return this._url.searchParams;
	}
	get hash() {
		return this._url.hash;
	}
	set hash(value) {
		this._url.hash = value;
	}
	get basePath() {
		return this._basePath;
	}
	set basePath(value) {
		this._basePath = value === "" ? "" : value.startsWith("/") ? value : "/" + value;
	}
	get locale() {
		return this._locale ?? "";
	}
	set locale(value) {
		if (this._locales) {
			if (!value) {
				this._locale = this._defaultLocale;
				return;
			}
			if (!this._locales.includes(value)) throw new TypeError(`The locale "${value}" is not in the configured locales: ${this._locales.join(", ")}`);
		}
		this._locale = this._locales ? value : this._locale;
	}
	get defaultLocale() {
		return this._defaultLocale;
	}
	get locales() {
		return this._locales ? [...this._locales] : void 0;
	}
	clone() {
		const config = {
			basePath: this._basePath,
			nextConfig: this._locales ? { i18n: {
				locales: [...this._locales],
				defaultLocale: this._defaultLocale
			} } : void 0
		};
		return new NextURL(this.href, void 0, config);
	}
	toString() {
		return this.href;
	}
	/**
	* The build ID of the Next.js application.
	* Set from `generateBuildId` in next.config.js, or a random UUID if not configured.
	* Can be used in middleware to detect deployment skew between client and server.
	* Matches the Next.js API: `request.nextUrl.buildId`.
	*/
	get buildId() {
		return "3944fe3f-d72c-47ca-86b3-076bd1cc35cd";
	}
};
var RequestCookies = class {
	_headers;
	_parsed;
	constructor(headers) {
		this._headers = headers;
		this._parsed = parseCookieHeader(headers.get("cookie") ?? "");
	}
	get(name) {
		const value = this._parsed.get(name);
		return value !== void 0 ? {
			name,
			value
		} : void 0;
	}
	getAll(nameOrOptions) {
		const name = typeof nameOrOptions === "string" ? nameOrOptions : nameOrOptions?.name;
		return [...this._parsed.entries()].filter(([cookieName]) => name === void 0 || cookieName === name).map(([cookieName, value]) => ({
			name: cookieName,
			value
		}));
	}
	has(name) {
		return this._parsed.has(name);
	}
	set(nameOrOptions, value) {
		let cookieName;
		let cookieValue;
		if (typeof nameOrOptions === "string") {
			cookieName = nameOrOptions;
			cookieValue = value ?? "";
		} else {
			cookieName = nameOrOptions.name;
			cookieValue = nameOrOptions.value;
		}
		validateCookieName(cookieName);
		this._parsed.set(cookieName, cookieValue);
		this._syncHeader();
		return this;
	}
	delete(names) {
		if (Array.isArray(names)) {
			const results = names.map((name) => {
				validateCookieName(name);
				return this._parsed.delete(name);
			});
			this._syncHeader();
			return results;
		}
		validateCookieName(names);
		const result = this._parsed.delete(names);
		this._syncHeader();
		return result;
	}
	clear() {
		this._parsed.clear();
		this._syncHeader();
		return this;
	}
	get size() {
		return this._parsed.size;
	}
	toString() {
		return this._serialize();
	}
	_serialize() {
		return [...this._parsed.entries()].map(([n, v]) => `${n}=${encodeURIComponent(v)}`).join("; ");
	}
	_syncHeader() {
		if (this._parsed.size === 0) this._headers.delete("cookie");
		else this._headers.set("cookie", this._serialize());
	}
	[Symbol.iterator]() {
		return this.getAll().map((c) => [c.name, c])[Symbol.iterator]();
	}
};
/**
* RFC 6265 §4.1.1: cookie-name is a token (RFC 2616 §2.2).
* Allowed: any visible ASCII (0x21-0x7E) except separators: ()<>@,;:\"/[]?={}
*/
var VALID_COOKIE_NAME_RE = /^[\x21\x23-\x27\x2A\x2B\x2D\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+$/;
function validateCookieName(name) {
	if (!name || !VALID_COOKIE_NAME_RE.test(name)) throw new Error(`Invalid cookie name: ${JSON.stringify(name)}`);
}
function validateCookieAttributeValue(value, attributeName) {
	for (let i = 0; i < value.length; i++) {
		const code = value.charCodeAt(i);
		if (code <= 31 || code === 127 || value[i] === ";") throw new Error(`Invalid cookie ${attributeName} value: ${JSON.stringify(value)}`);
	}
}
var ResponseCookies = class {
	_headers;
	/** Internal map keyed by cookie name — single source of truth. */
	_parsed = /* @__PURE__ */ new Map();
	constructor(headers) {
		this._headers = headers;
		for (const header of headers.getSetCookie()) {
			const eq = header.indexOf("=");
			if (eq === -1) continue;
			const cookieName = header.slice(0, eq);
			const semi = header.indexOf(";", eq);
			const raw = header.slice(eq + 1, semi === -1 ? void 0 : semi);
			let value;
			try {
				value = decodeURIComponent(raw);
			} catch {
				value = raw;
			}
			this._parsed.set(cookieName, {
				serialized: header,
				entry: {
					name: cookieName,
					value
				}
			});
		}
	}
	set(...args) {
		const [name, value, opts] = parseCookieSetArgs(args);
		validateCookieName(name);
		const parts = [`${name}=${encodeURIComponent(value)}`];
		const path = opts?.path ?? "/";
		validateCookieAttributeValue(path, "Path");
		parts.push(`Path=${path}`);
		if (opts?.domain) {
			validateCookieAttributeValue(opts.domain, "Domain");
			parts.push(`Domain=${opts.domain}`);
		}
		if (opts?.maxAge !== void 0) parts.push(`Max-Age=${opts.maxAge}`);
		if (opts?.expires) parts.push(`Expires=${opts.expires.toUTCString()}`);
		if (opts?.httpOnly) parts.push("HttpOnly");
		if (opts?.secure) parts.push("Secure");
		if (opts?.sameSite) parts.push(`SameSite=${opts.sameSite}`);
		this._parsed.set(name, {
			serialized: parts.join("; "),
			entry: {
				name,
				value
			}
		});
		this._syncHeaders();
		return this;
	}
	get(...args) {
		const key = typeof args[0] === "string" ? args[0] : args[0].name;
		return this._parsed.get(key)?.entry;
	}
	has(name) {
		return this._parsed.has(name);
	}
	getAll(...args) {
		const all = [...this._parsed.values()].map((v) => v.entry);
		if (args.length === 0) return all;
		const key = typeof args[0] === "string" ? args[0] : args[0].name;
		return all.filter((c) => c.name === key);
	}
	delete(...args) {
		const [name, opts] = typeof args[0] === "string" ? [args[0], void 0] : [args[0].name, args[0]];
		return this.set({
			name,
			value: "",
			expires: /* @__PURE__ */ new Date(0),
			path: opts?.path,
			domain: opts?.domain,
			httpOnly: opts?.httpOnly,
			secure: opts?.secure,
			sameSite: opts?.sameSite
		});
	}
	[Symbol.iterator]() {
		return [...this._parsed.values()].map((v) => [v.entry.name, v.entry])[Symbol.iterator]();
	}
	/** Delete all Set-Cookie headers and re-append from the internal map. */
	_syncHeaders() {
		this._headers.delete("Set-Cookie");
		for (const { serialized } of this._parsed.values()) this._headers.append("Set-Cookie", serialized);
	}
};
/**
* Parse the overloaded arguments for ResponseCookies.set():
*   - (name, value, options?) — positional form
*   - ({ name, value, ...options }) — object form
*/
function parseCookieSetArgs(args) {
	if (typeof args[0] === "string") return [
		args[0],
		args[1],
		args[2]
	];
	const { name, value, ...opts } = args[0];
	return [
		name,
		value,
		opts
	];
}
globalThis.URLPattern;
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.react-server.production.js
/**
* @license React
* react-jsx-runtime.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react_react_server(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/vinext/dist/shims/metadata.js
var import_jsx_runtime_react_server = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_react_server_production();
})))();
/**
* Normalize null-prototype objects from matchPattern() into thenable objects.
* See entries/app-rsc-entry.ts makeThenableParams() for full explanation.
*/
function makeThenableParams$1(obj) {
	const plain = { ...obj };
	return Object.assign(Promise.resolve(plain), plain);
}
/**
* Resolve viewport config from a module. Handles both static `viewport` export
* and async `generateViewport()` function.
*/
async function resolveModuleViewport(mod, params) {
	if (typeof mod.generateViewport === "function") {
		const asyncParams = makeThenableParams$1(params);
		return await mod.generateViewport({ params: asyncParams });
	}
	if (mod.viewport && typeof mod.viewport === "object") return mod.viewport;
	return null;
}
/**
* Merge viewport configs from multiple sources (layouts + page).
* Later entries override earlier ones.
*/
var DEFAULT_VIEWPORT = {
	width: "device-width",
	initialScale: 1
};
function mergeViewport(viewportList) {
	const merged = { ...DEFAULT_VIEWPORT };
	for (const vp of viewportList) Object.assign(merged, vp);
	return merged;
}
/**
* React component that renders viewport meta tags into <head>.
*/
function ViewportHead({ viewport }) {
	const elements = [];
	let key = 0;
	const parts = [];
	if (viewport.width !== void 0) parts.push(`width=${viewport.width}`);
	if (viewport.height !== void 0) parts.push(`height=${viewport.height}`);
	if (viewport.initialScale !== void 0) parts.push(`initial-scale=${viewport.initialScale}`);
	if (viewport.minimumScale !== void 0) parts.push(`minimum-scale=${viewport.minimumScale}`);
	if (viewport.maximumScale !== void 0) parts.push(`maximum-scale=${viewport.maximumScale}`);
	if (viewport.userScalable !== void 0) parts.push(`user-scalable=${viewport.userScalable ? "yes" : "no"}`);
	if (parts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "viewport",
		content: parts.join(", ")
	}, key++));
	if (viewport.themeColor) {
		if (typeof viewport.themeColor === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "theme-color",
			content: viewport.themeColor
		}, key++));
		else if (Array.isArray(viewport.themeColor)) for (const entry of viewport.themeColor) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "theme-color",
			content: entry.color,
			...entry.media ? { media: entry.media } : {}
		}, key++));
	}
	if (viewport.colorScheme) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "color-scheme",
		content: viewport.colorScheme
	}, key++));
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_jsx_runtime_react_server.Fragment, { children: elements });
}
/**
* Merge metadata from multiple sources (layouts + page).
*
* The list is ordered [rootLayout, nestedLayout, ..., page].
* Title template from layouts applies to the page title but NOT to
* the segment that defines the template itself. `title.absolute`
* skips all templates. `title.default` is the fallback when no
* child provides a title.
*
* Shallow merge: later entries override earlier ones (per Next.js docs).
*/
function mergeMetadata(metadataList) {
	if (metadataList.length === 0) return {};
	const merged = {};
	let parentTemplate;
	for (let i = 0; i < metadataList.length; i++) {
		const meta = metadataList[i];
		if (!(i === metadataList.length - 1) && meta.title && typeof meta.title === "object" && meta.title.template) parentTemplate = meta.title.template;
		for (const key of Object.keys(meta)) {
			if (key === "title") continue;
			merged[key] = meta[key];
		}
		if (meta.title !== void 0) merged.title = meta.title;
	}
	const finalTitle = merged.title;
	if (finalTitle) {
		if (typeof finalTitle === "string") {
			if (parentTemplate) merged.title = parentTemplate.replace("%s", finalTitle);
		} else if (typeof finalTitle === "object") {
			if (finalTitle.absolute) merged.title = finalTitle.absolute;
			else if (finalTitle.default) merged.title = finalTitle.default;
			else if (finalTitle.template && !finalTitle.default && !finalTitle.absolute) merged.title = void 0;
		}
	}
	return merged;
}
/**
* Resolve metadata from a module. Handles both static `metadata` export
* and async `generateMetadata()` function.
*
* @param parent - A Promise that resolves to the accumulated (merged) metadata
*   from all ancestor segments. Passed as the second argument to
*   `generateMetadata()`, matching Next.js's eager-execution-with-serial-
*   resolution approach. If not provided, defaults to a promise that resolves
*   to an empty object (so `await parent` never throws).
*/
async function resolveModuleMetadata(mod, params = {}, searchParams, parent = Promise.resolve({})) {
	if (typeof mod.generateMetadata === "function") {
		const asyncParams = makeThenableParams$1(params);
		const asyncSp = makeThenableParams$1(searchParams ?? {});
		return await mod.generateMetadata({
			params: asyncParams,
			searchParams: asyncSp
		}, parent);
	}
	if (mod.metadata && typeof mod.metadata === "object") return mod.metadata;
	return null;
}
/**
* React component that renders metadata as HTML head elements.
* Used by the RSC entry to inject into the <head>.
*/
function MetadataHead({ metadata }) {
	const elements = [];
	let key = 0;
	const base = metadata.metadataBase;
	function resolveUrl(url) {
		if (!url) return void 0;
		const s = typeof url === "string" ? url : url instanceof URL ? url.toString() : String(url);
		if (!base) return s;
		if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("//")) return s;
		try {
			return new URL(s, base).toString();
		} catch {
			return s;
		}
	}
	const title = typeof metadata.title === "string" ? metadata.title : typeof metadata.title === "object" ? metadata.title.absolute || metadata.title.default : void 0;
	if (title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("title", { children: title }, key++));
	if (metadata.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "description",
		content: metadata.description
	}, key++));
	if (metadata.generator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "generator",
		content: metadata.generator
	}, key++));
	if (metadata.applicationName) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "application-name",
		content: metadata.applicationName
	}, key++));
	if (metadata.referrer) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "referrer",
		content: metadata.referrer
	}, key++));
	if (metadata.keywords) {
		const kw = Array.isArray(metadata.keywords) ? metadata.keywords.join(",") : metadata.keywords;
		elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "keywords",
			content: kw
		}, key++));
	}
	if (metadata.authors) {
		const authorList = Array.isArray(metadata.authors) ? metadata.authors : [metadata.authors];
		for (const author of authorList) {
			if (author.name) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name: "author",
				content: author.name
			}, key++));
			if (author.url) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "author",
				href: author.url
			}, key++));
		}
	}
	if (metadata.creator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "creator",
		content: metadata.creator
	}, key++));
	if (metadata.publisher) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "publisher",
		content: metadata.publisher
	}, key++));
	if (metadata.formatDetection) {
		const parts = [];
		if (metadata.formatDetection.telephone === false) parts.push("telephone=no");
		if (metadata.formatDetection.address === false) parts.push("address=no");
		if (metadata.formatDetection.email === false) parts.push("email=no");
		if (parts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "format-detection",
			content: parts.join(", ")
		}, key++));
	}
	if (metadata.category) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "category",
		content: metadata.category
	}, key++));
	if (metadata.robots) if (typeof metadata.robots === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "robots",
		content: metadata.robots
	}, key++));
	else {
		const { googleBot, ...robotsRest } = metadata.robots;
		const robotParts = [];
		for (const [k, v] of Object.entries(robotsRest)) if (v === true) robotParts.push(k);
		else if (v === false) robotParts.push(`no${k}`);
		else if (typeof v === "string" || typeof v === "number") robotParts.push(`${k}:${v}`);
		if (robotParts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "robots",
			content: robotParts.join(", ")
		}, key++));
		if (googleBot) if (typeof googleBot === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "googlebot",
			content: googleBot
		}, key++));
		else {
			const gbParts = [];
			for (const [k, v] of Object.entries(googleBot)) if (v === true) gbParts.push(k);
			else if (v === false) gbParts.push(`no${k}`);
			else if (typeof v === "string" || typeof v === "number") gbParts.push(`${k}:${v}`);
			if (gbParts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name: "googlebot",
				content: gbParts.join(", ")
			}, key++));
		}
	}
	if (metadata.openGraph) {
		const og = metadata.openGraph;
		if (og.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:title",
			content: og.title
		}, key++));
		if (og.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:description",
			content: og.description
		}, key++));
		if (og.url) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:url",
			content: resolveUrl(og.url)
		}, key++));
		if (og.siteName) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:site_name",
			content: og.siteName
		}, key++));
		if (og.type) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:type",
			content: og.type
		}, key++));
		if (og.locale) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:locale",
			content: og.locale
		}, key++));
		if (og.publishedTime) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:published_time",
			content: og.publishedTime
		}, key++));
		if (og.modifiedTime) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:modified_time",
			content: og.modifiedTime
		}, key++));
		if (og.authors) for (const author of og.authors) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:author",
			content: author
		}, key++));
		if (og.images) {
			const imgList = typeof og.images === "string" || og.images instanceof URL ? [{ url: og.images }] : Array.isArray(og.images) ? og.images : [og.images];
			for (const img of imgList) {
				const imgUrl = typeof img === "string" || img instanceof URL ? img : img.url;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					property: "og:image",
					content: resolveUrl(imgUrl)
				}, key++));
				if (typeof img !== "string" && !(img instanceof URL)) {
					if (img.width) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:width",
						content: String(img.width)
					}, key++));
					if (img.height) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:height",
						content: String(img.height)
					}, key++));
					if (img.alt) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:alt",
						content: img.alt
					}, key++));
				}
			}
		}
		if (og.videos) for (const video of og.videos) {
			elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video",
				content: resolveUrl(video.url)
			}, key++));
			if (video.width) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video:width",
				content: String(video.width)
			}, key++));
			if (video.height) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video:height",
				content: String(video.height)
			}, key++));
		}
		if (og.audio) for (const audio of og.audio) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:audio",
			content: resolveUrl(audio.url)
		}, key++));
	}
	if (metadata.twitter) {
		const tw = metadata.twitter;
		if (tw.card) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:card",
			content: tw.card
		}, key++));
		if (tw.site) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:site",
			content: tw.site
		}, key++));
		if (tw.siteId) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:site:id",
			content: tw.siteId
		}, key++));
		if (tw.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:title",
			content: tw.title
		}, key++));
		if (tw.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:description",
			content: tw.description
		}, key++));
		if (tw.creator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:creator",
			content: tw.creator
		}, key++));
		if (tw.creatorId) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:creator:id",
			content: tw.creatorId
		}, key++));
		if (tw.images) {
			const imgList = typeof tw.images === "string" || tw.images instanceof URL ? [tw.images] : Array.isArray(tw.images) ? tw.images : [tw.images];
			for (const img of imgList) {
				const imgUrl = typeof img === "string" || img instanceof URL ? img : img.url;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:image",
					content: resolveUrl(imgUrl)
				}, key++));
				if (typeof img !== "string" && !(img instanceof URL) && img.alt) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:image:alt",
					content: img.alt
				}, key++));
			}
		}
		if (tw.players) {
			const players = Array.isArray(tw.players) ? tw.players : [tw.players];
			for (const player of players) {
				const playerUrl = player.playerUrl.toString();
				const streamUrl = player.streamUrl.toString();
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player",
					content: resolveUrl(playerUrl)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:stream",
					content: resolveUrl(streamUrl)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:width",
					content: String(player.width)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:height",
					content: String(player.height)
				}, key++));
			}
		}
		if (tw.app) {
			const { app } = tw;
			for (const platform of [
				"iphone",
				"ipad",
				"googleplay"
			]) {
				if (app.name) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: `twitter:app:name:${platform}`,
					content: app.name
				}, key++));
				if (app.id[platform] !== void 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: `twitter:app:id:${platform}`,
					content: String(app.id[platform])
				}, key++));
				if (app.url?.[platform] !== void 0) {
					const appUrl = app.url[platform].toString();
					elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: `twitter:app:url:${platform}`,
						content: resolveUrl(appUrl)
					}, key++));
				}
			}
		}
	}
	if (metadata.icons) {
		const { icon, shortcut, apple, other } = metadata.icons;
		if (shortcut) {
			const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];
			for (const s of shortcuts) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "shortcut icon",
				href: resolveUrl(s)
			}, key++));
		}
		if (icon) {
			const icons = typeof icon === "string" || icon instanceof URL ? [{ url: icon }] : icon;
			for (const i of icons) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "icon",
				href: resolveUrl(i.url),
				...i.sizes ? { sizes: i.sizes } : {},
				...i.type ? { type: i.type } : {},
				...i.media ? { media: i.media } : {}
			}, key++));
		}
		if (apple) {
			const apples = typeof apple === "string" || apple instanceof URL ? [{ url: apple }] : apple;
			for (const a of apples) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "apple-touch-icon",
				href: resolveUrl(a.url),
				...a.sizes ? { sizes: a.sizes } : {},
				...a.type ? { type: a.type } : {}
			}, key++));
		}
		if (other) for (const o of other) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: o.rel,
			href: resolveUrl(o.url),
			...o.sizes ? { sizes: o.sizes } : {}
		}, key++));
	}
	if (metadata.manifest) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
		rel: "manifest",
		href: resolveUrl(metadata.manifest)
	}, key++));
	if (metadata.alternates) {
		const alt = metadata.alternates;
		if (alt.canonical) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "canonical",
			href: resolveUrl(alt.canonical)
		}, key++));
		if (alt.languages) for (const [lang, href] of Object.entries(alt.languages)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			hrefLang: lang,
			href: resolveUrl(href)
		}, key++));
		if (alt.media) for (const [media, href] of Object.entries(alt.media)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			media,
			href: resolveUrl(href)
		}, key++));
		if (alt.types) for (const [type, href] of Object.entries(alt.types)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			type,
			href: resolveUrl(href)
		}, key++));
	}
	if (metadata.verification) {
		const v = metadata.verification;
		if (v.google) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "google-site-verification",
			content: v.google
		}, key++));
		if (v.yahoo) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "y_key",
			content: v.yahoo
		}, key++));
		if (v.yandex) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "yandex-verification",
			content: v.yandex
		}, key++));
		if (v.other) for (const [name, content] of Object.entries(v.other)) {
			const values = Array.isArray(content) ? content : [content];
			for (const val of values) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name,
				content: val
			}, key++));
		}
	}
	if (metadata.appleWebApp) {
		const awa = metadata.appleWebApp;
		if (awa.capable !== false) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "mobile-web-app-capable",
			content: "yes"
		}, key++));
		if (awa.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-mobile-web-app-title",
			content: awa.title
		}, key++));
		if (awa.statusBarStyle) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-mobile-web-app-status-bar-style",
			content: awa.statusBarStyle
		}, key++));
		if (awa.startupImage) {
			const imgs = typeof awa.startupImage === "string" ? [{ url: awa.startupImage }] : awa.startupImage;
			for (const img of imgs) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "apple-touch-startup-image",
				href: resolveUrl(img.url),
				...img.media ? { media: img.media } : {}
			}, key++));
		}
	}
	if (metadata.itunes) {
		const { appId, appArgument } = metadata.itunes;
		let content = `app-id=${appId}`;
		if (appArgument) content += `, app-argument=${appArgument}`;
		elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-itunes-app",
			content
		}, key++));
	}
	if (metadata.appLinks) {
		const al = metadata.appLinks;
		for (const platform of [
			"ios",
			"iphone",
			"ipad",
			"android",
			"windows_phone",
			"windows",
			"windows_universal",
			"web"
		]) {
			const entries = al[platform];
			if (!entries) continue;
			const list = Array.isArray(entries) ? entries : [entries];
			for (const entry of list) for (const [k, v] of Object.entries(entry)) {
				if (v === void 0 || v === null) continue;
				const str = String(v);
				const content = k === "url" ? resolveUrl(str) : str;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					property: `al:${platform}:${k}`,
					content
				}, key++));
			}
		}
	}
	if (metadata.other) for (const [name, content] of Object.entries(metadata.other)) {
		const values = Array.isArray(content) ? content : [content];
		for (const val of values) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name,
			content: val
		}, key++));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_jsx_runtime_react_server.Fragment, { children: elements });
}
//#endregion
//#region node_modules/vinext/dist/config/config-matchers.js
/**
* Cache for compiled regex patterns in matchConfigPattern.
*
* Redirect/rewrite patterns are static — they come from next.config.js and
* never change at runtime. Without caching, every request that hits the regex
* branch re-runs the full tokeniser walk + isSafeRegex + new RegExp() for
* every rule in the array. On apps with many locale-prefixed rules (which all
* contain `(` and therefore enter the regex branch) this dominated profiling
* at ~2.4 seconds of CPU self-time.
*
* Value is `null` when safeRegExp rejected the pattern (ReDoS risk), so we
* skip it on subsequent requests too without re-running the scanner.
*/
var _compiledPatternCache = /* @__PURE__ */ new Map();
/**
* Cache for compiled header source regexes in matchHeaders.
*
* Each NextHeader rule has a `source` that is run through escapeHeaderSource()
* then safeRegExp() to produce a RegExp. Both are pure functions of the source
* string and the result never changes. Without caching, every request
* re-runs the full escapeHeaderSource tokeniser + isSafeRegex scan + new RegExp()
* for every header rule.
*
* Value is `null` when safeRegExp rejected the pattern (ReDoS risk).
*/
var _compiledHeaderSourceCache = /* @__PURE__ */ new Map();
/**
* Cache for compiled has/missing condition value regexes in checkSingleCondition.
*
* Each has/missing condition may carry a `value` string that is passed directly
* to safeRegExp() for matching against header/cookie/query/host values. The
* condition objects are static (from next.config.js) so the compiled RegExp
* never changes. Without caching, safeRegExp() is called on every request for
* every condition on every rule.
*
* Value is `null` when safeRegExp rejected the pattern, or `false` when the
* value string was undefined (no regex needed — use exact string comparison).
*/
var _compiledConditionCache = /* @__PURE__ */ new Map();
/**
* Cache for destination substitution regexes in substituteDestinationParams.
*
* The regex depends only on the set of param keys captured from the matched
* source pattern. Caching by sorted key list avoids recompiling a new RegExp
* for repeated redirect/rewrite calls that use the same param shape.
*/
var _compiledDestinationParamCache = /* @__PURE__ */ new Map();
/**
* Redirect index for O(1) locale-static rule lookup.
*
* Many Next.js apps generate 50-100 redirect rules of the form:
*   /:locale(en|es|fr|...)?/some-static-path  →  /some-destination
*
* The compiled regex for each is like:
*   ^/(en|es|fr|...)?/some-static-path$
*
* When no redirect matches (the common case for ordinary page loads),
* matchRedirect previously ran exec() on every one of those regexes —
* ~2ms per call, ~2992ms total self-time in profiles.
*
* The index splits rules into two buckets:
*
*   localeStatic — rules whose source is exactly /:paramName(alt1|alt2|...)?/suffix
*     where `suffix` is a static path with no further params or regex groups.
*     These are indexed in a Map<suffix, entry[]> for O(1) lookup after a
*     single fast strip of the optional locale prefix.
*
*   linear — all other rules. Matched with the original O(n) loop.
*
* The index is stored in a WeakMap keyed by the redirects array so it is
* computed once per config load and GC'd when the array is no longer live.
*
* ## Ordering invariant
*
* Redirect rules must be evaluated in their original order (first match wins).
* Each locale-static entry stores its `originalIndex` so that, when a
* locale-static fast-path match is found, any linear rules that appear earlier
* in the array are still checked first.
*/
/** Matches `/:param(alternation)?/static/suffix` — the locale-static pattern. */
var _LOCALE_STATIC_RE = /^\/:[\w-]+\(([^)]+)\)\?\/([a-zA-Z0-9_~.%@!$&'*+,;=:/-]+)$/;
var _redirectIndexCache = /* @__PURE__ */ new WeakMap();
/**
* Build (or retrieve from cache) the redirect index for a given redirects array.
*
* Called once per config load from matchRedirect. The WeakMap ensures the index
* is recomputed if the config is reloaded (new array reference) and GC'd when
* the array is collected.
*/
function _getRedirectIndex(redirects) {
	let index = _redirectIndexCache.get(redirects);
	if (index !== void 0) return index;
	const localeStatic = /* @__PURE__ */ new Map();
	const linear = [];
	for (let i = 0; i < redirects.length; i++) {
		const redirect = redirects[i];
		const m = _LOCALE_STATIC_RE.exec(redirect.source);
		if (m) {
			const paramName = redirect.source.slice(2, redirect.source.indexOf("("));
			const alternation = m[1];
			const suffix = "/" + m[2];
			const altRe = safeRegExp("^(?:" + alternation + ")$");
			if (!altRe) {
				linear.push([i, redirect]);
				continue;
			}
			const entry = {
				paramName,
				altRe,
				redirect,
				originalIndex: i
			};
			const bucket = localeStatic.get(suffix);
			if (bucket) bucket.push(entry);
			else localeStatic.set(suffix, [entry]);
		} else linear.push([i, redirect]);
	}
	index = {
		localeStatic,
		linear
	};
	_redirectIndexCache.set(redirects, index);
	return index;
}
/** Hop-by-hop headers that should not be forwarded through a proxy. */
var HOP_BY_HOP_HEADERS = new Set([
	"connection",
	"keep-alive",
	"proxy-authenticate",
	"proxy-authorization",
	"te",
	"trailers",
	"transfer-encoding",
	"upgrade"
]);
/**
* Request hop-by-hop headers to strip before proxying with fetch().
* Intentionally narrower than HOP_BY_HOP_HEADERS: external rewrite proxying
* still forwards proxy auth credentials, while response sanitization strips
* them before returning data to the client.
*/
var REQUEST_HOP_BY_HOP_HEADERS = new Set([
	"connection",
	"keep-alive",
	"te",
	"trailers",
	"transfer-encoding",
	"upgrade"
]);
function stripHopByHopRequestHeaders(headers) {
	const connectionTokens = (headers.get("connection") || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
	for (const header of REQUEST_HOP_BY_HOP_HEADERS) headers.delete(header);
	for (const token of connectionTokens) headers.delete(token);
}
/**
* Detect regex patterns vulnerable to catastrophic backtracking (ReDoS).
*
* Uses a lightweight heuristic: scans the pattern string for nested quantifiers
* (a quantifier applied to a group that itself contains a quantifier). This
* catches the most common pathological patterns like `(a+)+`, `(.*)*`,
* `([^/]+)+`, `(a|a+)+` without needing a full regex parser.
*
* Returns true if the pattern appears safe, false if it's potentially dangerous.
*/
function isSafeRegex(pattern) {
	const quantifierAtDepth = [];
	let depth = 0;
	let i = 0;
	while (i < pattern.length) {
		const ch = pattern[i];
		if (ch === "\\") {
			i += 2;
			continue;
		}
		if (ch === "[") {
			i++;
			while (i < pattern.length && pattern[i] !== "]") {
				if (pattern[i] === "\\") i++;
				i++;
			}
			i++;
			continue;
		}
		if (ch === "(") {
			depth++;
			if (quantifierAtDepth.length <= depth) quantifierAtDepth.push(false);
			else quantifierAtDepth[depth] = false;
			i++;
			continue;
		}
		if (ch === ")") {
			const hadQuantifier = depth > 0 && quantifierAtDepth[depth];
			if (depth > 0) depth--;
			const next = pattern[i + 1];
			if (next === "+" || next === "*" || next === "{") {
				if (hadQuantifier) return false;
				if (depth >= 0 && depth < quantifierAtDepth.length) quantifierAtDepth[depth] = true;
			}
			i++;
			continue;
		}
		if (ch === "+" || ch === "*") {
			if (depth > 0) quantifierAtDepth[depth] = true;
			i++;
			continue;
		}
		if (ch === "?") {
			const prev = i > 0 ? pattern[i - 1] : "";
			if (prev !== "+" && prev !== "*" && prev !== "?" && prev !== "}") {
				if (depth > 0) quantifierAtDepth[depth] = true;
			}
			i++;
			continue;
		}
		if (ch === "{") {
			let j = i + 1;
			while (j < pattern.length && /[\d,]/.test(pattern[j])) j++;
			if (j < pattern.length && pattern[j] === "}" && j > i + 1) {
				if (depth > 0) quantifierAtDepth[depth] = true;
				i = j + 1;
				continue;
			}
		}
		i++;
	}
	return true;
}
/**
* Compile a regex pattern safely. Returns the compiled RegExp or null if the
* pattern is invalid or vulnerable to ReDoS.
*
* Logs a warning when a pattern is rejected so developers can fix their config.
*/
function safeRegExp(pattern, flags) {
	if (!isSafeRegex(pattern)) {
		console.warn(`[vinext] Ignoring potentially unsafe regex pattern (ReDoS risk): ${pattern}\n  Patterns with nested quantifiers (e.g. (a+)+) can cause catastrophic backtracking.\n  Simplify the pattern to avoid nested repetition.`);
		return null;
	}
	try {
		return new RegExp(pattern, flags);
	} catch {
		return null;
	}
}
/**
* Convert a Next.js header/rewrite/redirect source pattern into a regex string.
*
* Regex groups in the source (e.g. `(\d+)`) are extracted first, the remaining
* text is escaped/converted in a **single pass** (avoiding chained `.replace()`
* which CodeQL flags as incomplete sanitization), then groups are restored.
*/
function escapeHeaderSource(source) {
	const S = "";
	const groups = [];
	const withPlaceholders = source.replace(/\(([^)]+)\)/g, (_m, inner) => {
		groups.push(inner);
		return `${S}G${groups.length - 1}${S}`;
	});
	let result = "";
	const re = new RegExp(`${S}G(\\d+)${S}|:[\\w-]+|[.+?*]|[^.+?*:\\uE000]+`, "g");
	let m;
	while ((m = re.exec(withPlaceholders)) !== null) if (m[1] !== void 0) result += `(${groups[Number(m[1])]})`;
	else if (m[0].startsWith(":")) {
		const constraintMatch = withPlaceholders.slice(re.lastIndex).match(new RegExp(`^${S}G(\\d+)${S}`));
		if (constraintMatch) {
			re.lastIndex += constraintMatch[0].length;
			result += `(${groups[Number(constraintMatch[1])]})`;
		} else result += "[^/]+";
	} else switch (m[0]) {
		case ".":
			result += "\\.";
			break;
		case "+":
			result += "\\+";
			break;
		case "?":
			result += "\\?";
			break;
		case "*":
			result += ".*";
			break;
		default:
			result += m[0];
			break;
	}
	return result;
}
/**
* Parse a Cookie header string into a key-value record.
*/
function parseCookies(cookieHeader) {
	if (!cookieHeader) return {};
	const cookies = {};
	for (const part of cookieHeader.split(";")) {
		const eq = part.indexOf("=");
		if (eq === -1) continue;
		const key = part.slice(0, eq).trim();
		const value = part.slice(eq + 1).trim();
		if (key) cookies[key] = value;
	}
	return cookies;
}
/**
* Build a RequestContext from a Web Request object.
*/
function requestContextFromRequest(request) {
	const url = new URL(request.url);
	return {
		headers: request.headers,
		cookies: parseCookies(request.headers.get("cookie")),
		query: url.searchParams,
		host: normalizeHost(request.headers.get("host"), url.hostname)
	};
}
function normalizeHost(hostHeader, fallbackHostname) {
	return (hostHeader ?? fallbackHostname).split(":", 1)[0].toLowerCase();
}
function _emptyParams() {
	return Object.create(null);
}
function _matchConditionValue(actualValue, expectedValue) {
	if (expectedValue === void 0) return _emptyParams();
	const re = _cachedConditionRegex(expectedValue);
	if (re) {
		const match = re.exec(actualValue);
		if (!match) return null;
		const params = _emptyParams();
		if (match.groups) {
			for (const [key, value] of Object.entries(match.groups)) if (value !== void 0) params[key] = value;
		}
		return params;
	}
	return actualValue === expectedValue ? _emptyParams() : null;
}
/**
* Check a single has/missing condition against request context.
* Returns captured params when the condition is satisfied, or null otherwise.
*/
function matchSingleCondition(condition, ctx) {
	switch (condition.type) {
		case "header": {
			const headerValue = ctx.headers.get(condition.key);
			if (headerValue === null) return null;
			return _matchConditionValue(headerValue, condition.value);
		}
		case "cookie": {
			const cookieValue = ctx.cookies[condition.key];
			if (cookieValue === void 0) return null;
			return _matchConditionValue(cookieValue, condition.value);
		}
		case "query": {
			const queryValue = ctx.query.get(condition.key);
			if (queryValue === null) return null;
			return _matchConditionValue(queryValue, condition.value);
		}
		case "host":
			if (condition.value !== void 0) return _matchConditionValue(ctx.host, condition.value);
			return ctx.host === condition.key ? _emptyParams() : null;
		default: return null;
	}
}
/**
* Return a cached RegExp for a has/missing condition value string, compiling
* on first use. Returns null if safeRegExp rejected the pattern or if the
* value is not a valid regex (fall back to exact string comparison).
*/
function _cachedConditionRegex(value) {
	let re = _compiledConditionCache.get(value);
	if (re === void 0) {
		re = safeRegExp(`^${value}$`);
		_compiledConditionCache.set(value, re);
	}
	return re;
}
/**
* Check all has/missing conditions for a config rule.
* Returns true if the rule should be applied (all has conditions pass, all missing conditions pass).
*
* - has: every condition must match (the request must have it)
* - missing: every condition must NOT match (the request must not have it)
*/
function collectConditionParams(has, missing, ctx) {
	const params = _emptyParams();
	if (has) for (const condition of has) {
		const conditionParams = matchSingleCondition(condition, ctx);
		if (!conditionParams) return null;
		Object.assign(params, conditionParams);
	}
	if (missing) {
		for (const condition of missing) if (matchSingleCondition(condition, ctx)) return null;
	}
	return params;
}
function checkHasConditions(has, missing, ctx) {
	return collectConditionParams(has, missing, ctx) !== null;
}
/**
* If the current position in `str` starts with a parenthesized group, consume
* it and advance `re.lastIndex` past the closing `)`. Returns the group
* contents or null if no group is present.
*/
function extractConstraint(str, re) {
	if (str[re.lastIndex] !== "(") return null;
	const start = re.lastIndex + 1;
	let depth = 1;
	let i = start;
	while (i < str.length && depth > 0) {
		if (str[i] === "(") depth++;
		else if (str[i] === ")") depth--;
		i++;
	}
	if (depth !== 0) return null;
	re.lastIndex = i;
	return str.slice(start, i - 1);
}
/**
* Match a Next.js config pattern (from redirects/rewrites sources) against a pathname.
* Returns matched params or null.
*
* Supports:
*   :param     - matches a single path segment
*   :param*    - matches zero or more segments (catch-all)
*   :param+    - matches one or more segments
*   (regex)    - inline regex patterns in the source
*   :param(constraint) - named param with inline regex constraint
*/
function matchConfigPattern(pathname, pattern) {
	if (pattern.includes("(") || pattern.includes("\\") || /:[\w-]+[*+][^/]/.test(pattern) || /:[\w-]+\./.test(pattern)) try {
		let compiled = _compiledPatternCache.get(pattern);
		if (compiled === void 0) {
			const paramNames = [];
			let regexStr = "";
			const tokenRe = /:([\w-]+)|[.]|[^:.]+/g;
			let tok;
			while ((tok = tokenRe.exec(pattern)) !== null) if (tok[1] !== void 0) {
				const name = tok[1];
				const rest = pattern.slice(tokenRe.lastIndex);
				if (rest.startsWith("*") || rest.startsWith("+")) {
					const quantifier = rest[0];
					tokenRe.lastIndex += 1;
					const constraint = extractConstraint(pattern, tokenRe);
					paramNames.push(name);
					if (constraint !== null) regexStr += `(${constraint})`;
					else regexStr += quantifier === "*" ? "(.*)" : "(.+)";
				} else {
					const constraint = extractConstraint(pattern, tokenRe);
					paramNames.push(name);
					regexStr += constraint !== null ? `(${constraint})` : "([^/]+)";
				}
			} else if (tok[0] === ".") regexStr += "\\.";
			else regexStr += tok[0];
			const re = safeRegExp("^" + regexStr + "$");
			compiled = re ? {
				re,
				paramNames
			} : null;
			_compiledPatternCache.set(pattern, compiled);
		}
		if (!compiled) return null;
		const match = compiled.re.exec(pathname);
		if (!match) return null;
		const params = Object.create(null);
		for (let i = 0; i < compiled.paramNames.length; i++) params[compiled.paramNames[i]] = match[i + 1] ?? "";
		return params;
	} catch {}
	const catchAllMatch = pattern.match(/:([\w-]+)(\*|\+)$/);
	if (catchAllMatch) {
		const prefix = pattern.slice(0, pattern.lastIndexOf(":"));
		const paramName = catchAllMatch[1];
		const isPlus = catchAllMatch[2] === "+";
		const prefixNoSlash = prefix.replace(/\/$/, "");
		if (!pathname.startsWith(prefixNoSlash)) return null;
		const charAfter = pathname[prefixNoSlash.length];
		if (charAfter !== void 0 && charAfter !== "/") return null;
		const rest = pathname.slice(prefixNoSlash.length);
		if (isPlus && (!rest || rest === "/")) return null;
		let restValue = rest.startsWith("/") ? rest.slice(1) : rest;
		return { [paramName]: restValue };
	}
	const parts = pattern.split("/");
	const pathParts = pathname.split("/");
	if (parts.length !== pathParts.length) return null;
	const params = Object.create(null);
	for (let i = 0; i < parts.length; i++) if (parts[i].startsWith(":")) params[parts[i].slice(1)] = pathParts[i];
	else if (parts[i] !== pathParts[i]) return null;
	return params;
}
/**
* Apply redirect rules from next.config.js.
* Returns the redirect info if a redirect was matched, or null.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating redirects, so this parameter is required.
*
* ## Performance
*
* Rules with a locale-capture-group prefix (the dominant pattern in large
* Next.js apps — e.g. `/:locale(en|es|fr|...)?/some-path`) are handled via
* a pre-built index. Instead of running exec() on each locale regex
* individually, we:
*
*   1. Strip the optional locale prefix from the pathname with one cheap
*      string-slice check (no regex exec on the hot path).
*   2. Look up the stripped suffix in a Map<suffix, entry[]>.
*   3. For each matching entry, validate the captured locale string against
*      a small, anchored alternation regex.
*
* This reduces the per-request cost from O(n × regex) to O(1) map lookup +
* O(matches × tiny-regex), eliminating the ~2992ms self-time reported in
* profiles for apps with 63+ locale-prefixed rules.
*
* Rules that don't fit the locale-static pattern fall back to the original
* linear matchConfigPattern scan.
*
* ## Ordering invariant
*
* First match wins, preserving the original redirect array order. When a
* locale-static fast-path match is found at position N, all linear rules with
* an original index < N are checked via matchConfigPattern first — they are
* few in practice (typically zero) so this is not a hot-path concern.
*/
function matchRedirect(pathname, redirects, ctx) {
	if (redirects.length === 0) return null;
	const index = _getRedirectIndex(redirects);
	let localeMatch = null;
	let localeMatchIndex = Infinity;
	if (index.localeStatic.size > 0) {
		const noLocaleBucket = index.localeStatic.get(pathname);
		if (noLocaleBucket) for (const entry of noLocaleBucket) {
			if (entry.originalIndex >= localeMatchIndex) continue;
			const redirect = entry.redirect;
			const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			let dest = substituteDestinationParams(redirect.destination, {
				[entry.paramName]: "",
				...conditionParams
			});
			dest = sanitizeDestination(dest);
			localeMatch = {
				destination: dest,
				permanent: redirect.permanent
			};
			localeMatchIndex = entry.originalIndex;
			break;
		}
		const slashTwo = pathname.indexOf("/", 1);
		if (slashTwo !== -1) {
			const suffix = pathname.slice(slashTwo);
			const localePart = pathname.slice(1, slashTwo);
			const localeBucket = index.localeStatic.get(suffix);
			if (localeBucket) for (const entry of localeBucket) {
				if (entry.originalIndex >= localeMatchIndex) continue;
				if (!entry.altRe.test(localePart)) continue;
				const redirect = entry.redirect;
				const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
				if (!conditionParams) continue;
				let dest = substituteDestinationParams(redirect.destination, {
					[entry.paramName]: localePart,
					...conditionParams
				});
				dest = sanitizeDestination(dest);
				localeMatch = {
					destination: dest,
					permanent: redirect.permanent
				};
				localeMatchIndex = entry.originalIndex;
				break;
			}
		}
	}
	for (const [origIdx, redirect] of index.linear) {
		if (origIdx >= localeMatchIndex) break;
		const params = matchConfigPattern(pathname, redirect.source);
		if (params) {
			const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			let dest = substituteDestinationParams(redirect.destination, {
				...params,
				...conditionParams
			});
			dest = sanitizeDestination(dest);
			return {
				destination: dest,
				permanent: redirect.permanent
			};
		}
	}
	return localeMatch;
}
/**
* Apply rewrite rules from next.config.js.
* Returns the rewritten URL or null if no rewrite matched.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating rewrites, so this parameter is required.
*/
function matchRewrite(pathname, rewrites, ctx) {
	for (const rewrite of rewrites) {
		const params = matchConfigPattern(pathname, rewrite.source);
		if (params) {
			const conditionParams = rewrite.has || rewrite.missing ? collectConditionParams(rewrite.has, rewrite.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			let dest = substituteDestinationParams(rewrite.destination, {
				...params,
				...conditionParams
			});
			dest = sanitizeDestination(dest);
			return dest;
		}
	}
	return null;
}
/**
* Substitute all matched route params into a redirect/rewrite destination.
*
* Handles repeated params (e.g. `/api/:id/:id`) and catch-all suffix forms
* (`:path*`, `:path+`) in a single pass. Unknown params are left intact.
*/
function substituteDestinationParams(destination, params) {
	const keys = Object.keys(params);
	if (keys.length === 0) return destination;
	const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
	const cacheKey = sortedKeys.join("\0");
	let paramRe = _compiledDestinationParamCache.get(cacheKey);
	if (!paramRe) {
		const paramAlternation = sortedKeys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
		paramRe = new RegExp(`:(${paramAlternation})([+*])?(?![A-Za-z0-9_])`, "g");
		_compiledDestinationParamCache.set(cacheKey, paramRe);
	}
	return destination.replace(paramRe, (_token, key) => params[key]);
}
/**
* Sanitize a redirect/rewrite destination to collapse protocol-relative URLs.
*
* After parameter substitution, a destination like `/:path*` can become
* `//evil.com` if the catch-all captured a decoded `%2F` (`/evil.com`).
* Browsers interpret `//evil.com` as a protocol-relative URL, redirecting
* users off-site.
*
* This function collapses any leading double (or more) slashes to a single
* slash for non-external (relative) destinations.
*/
function sanitizeDestination(dest) {
	if (dest.startsWith("http://") || dest.startsWith("https://")) return dest;
	dest = dest.replace(/^[\\/]+/, "/");
	return dest;
}
/**
* Check if a URL is external (absolute URL or protocol-relative).
* Detects any URL scheme (http:, https:, data:, javascript:, blob:, etc.)
* per RFC 3986, plus protocol-relative URLs (//).
*/
function isExternalUrl(url) {
	return /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//");
}
/**
* Proxy an incoming request to an external URL and return the upstream response.
*
* Used for external rewrites (e.g. `/ph/:path*` → `https://us.i.posthog.com/:path*`).
* Next.js handles these as server-side reverse proxies, forwarding the request
* method, headers, and body to the external destination.
*
* Works in all runtimes (Node.js, Cloudflare Workers) via the standard fetch() API.
*/
async function proxyExternalRequest(request, externalUrl) {
	const originalUrl = new URL(request.url);
	const targetUrl = new URL(externalUrl);
	const destinationKeys = new Set(targetUrl.searchParams.keys());
	for (const [key, value] of originalUrl.searchParams) if (!destinationKeys.has(key)) targetUrl.searchParams.append(key, value);
	const headers = new Headers(request.headers);
	headers.set("host", targetUrl.host);
	stripHopByHopRequestHeaders(headers);
	const keysToDelete = [];
	for (const key of headers.keys()) if (key.startsWith("x-middleware-")) keysToDelete.push(key);
	for (const key of keysToDelete) headers.delete(key);
	const method = request.method;
	const hasBody = method !== "GET" && method !== "HEAD";
	const init = {
		method,
		headers,
		redirect: "manual"
	};
	if (hasBody && request.body) {
		init.body = request.body;
		init.duplex = "half";
	}
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 3e4);
	let upstreamResponse;
	try {
		upstreamResponse = await fetch(targetUrl.href, {
			...init,
			signal: controller.signal
		});
	} catch (e) {
		if (e instanceof Error && e.name === "AbortError") {
			console.error("[vinext] External rewrite proxy timeout:", targetUrl.href);
			return new Response("Gateway Timeout", { status: 504 });
		}
		console.error("[vinext] External rewrite proxy error:", e);
		return new Response("Bad Gateway", { status: 502 });
	} finally {
		clearTimeout(timeout);
	}
	const isNodeRuntime = typeof process !== "undefined" && !!process.versions?.node;
	const responseHeaders = new Headers();
	upstreamResponse.headers.forEach((value, key) => {
		const lower = key.toLowerCase();
		if (HOP_BY_HOP_HEADERS.has(lower)) return;
		if (isNodeRuntime && (lower === "content-encoding" || lower === "content-length")) return;
		responseHeaders.append(key, value);
	});
	return new Response(upstreamResponse.body, {
		status: upstreamResponse.status,
		statusText: upstreamResponse.statusText,
		headers: responseHeaders
	});
}
/**
* Apply custom header rules from next.config.js.
* Returns an array of { key, value } pairs to set on the response.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating headers, so this parameter is required.
*/
function matchHeaders(pathname, headers, ctx) {
	const result = [];
	for (const rule of headers) {
		let sourceRegex = _compiledHeaderSourceCache.get(rule.source);
		if (sourceRegex === void 0) {
			sourceRegex = safeRegExp("^" + escapeHeaderSource(rule.source) + "$");
			_compiledHeaderSourceCache.set(rule.source, sourceRegex);
		}
		if (sourceRegex && sourceRegex.test(pathname)) {
			if (rule.has || rule.missing) {
				if (!checkHasConditions(rule.has, rule.missing, ctx)) continue;
			}
			result.push(...rule.headers);
		}
	}
	return result;
}
//#endregion
//#region node_modules/vinext/dist/server/request-pipeline.js
/**
* Shared request pipeline utilities.
*
* Extracted from the App Router RSC entry (entries/app-rsc-entry.ts) to enable
* reuse across entry points. Currently consumed by app-rsc-entry.ts;
* dev-server.ts, prod-server.ts, and index.ts still have inline versions
* that should be migrated in follow-up work.
*
* These utilities handle the common request lifecycle steps: protocol-
* relative URL guards, basePath stripping, trailing slash normalization,
* and CSRF origin validation.
*/
/**
* Guard against protocol-relative URL open redirects.
*
* Paths like `//example.com/` would be redirected to `//example.com` by the
* trailing-slash normalizer, which browsers interpret as `http://example.com`.
* Backslashes are equivalent to forward slashes in the URL spec
* (e.g. `/\evil.com` is treated as `//evil.com` by browsers).
*
* Next.js returns 404 for these paths. We check the RAW pathname before
* normalization so the guard fires before normalizePath collapses `//`.
*
* @param rawPathname - The raw pathname from the URL, before any normalization
* @returns A 404 Response if the path is protocol-relative, or null to continue
*/
function guardProtocolRelativeUrl(rawPathname) {
	if (rawPathname.replaceAll("\\", "/").startsWith("//")) return new Response("404 Not Found", { status: 404 });
	return null;
}
/**
* Check if the pathname needs a trailing slash redirect, and return the
* redirect Response if so.
*
* Follows Next.js behavior:
* - `/api` routes are never redirected
* - The root path `/` is never redirected
* - If `trailingSlash` is true, redirect `/about` → `/about/`
* - If `trailingSlash` is false (default), redirect `/about/` → `/about`
*
* @param pathname - The basePath-stripped pathname
* @param basePath - The basePath to prepend to the redirect Location
* @param trailingSlash - Whether trailing slashes should be enforced
* @param search - The query string (including `?`) to preserve in the redirect
* @returns A 308 redirect Response, or null if no redirect is needed
*/
function normalizeTrailingSlash(pathname, basePath, trailingSlash, search) {
	if (pathname === "/" || pathname === "/api" || pathname.startsWith("/api/")) return null;
	const hasTrailing = pathname.endsWith("/");
	if (trailingSlash && !hasTrailing && !pathname.endsWith(".rsc")) return new Response(null, {
		status: 308,
		headers: { Location: basePath + pathname + "/" + search }
	});
	if (!trailingSlash && hasTrailing) return new Response(null, {
		status: 308,
		headers: { Location: basePath + pathname.replace(/\/+$/, "") + search }
	});
	return null;
}
/**
* Validate CSRF origin for server action requests.
*
* Matches Next.js behavior: compares the Origin header against the Host
* header. If they don't match, the request is rejected with 403 unless
* the origin is in the allowedOrigins list.
*
* @param request - The incoming Request
* @param allowedOrigins - Origins from experimental.serverActions.allowedOrigins
* @returns A 403 Response if origin validation fails, or null to continue
*/
function validateCsrfOrigin(request, allowedOrigins = []) {
	const originHeader = request.headers.get("origin");
	if (!originHeader) return null;
	if (originHeader === "null") {
		if (allowedOrigins.includes("null")) return null;
		console.warn(`[vinext] CSRF origin "null" blocked for server action. To allow requests from sandboxed contexts, add "null" to experimental.serverActions.allowedOrigins.`);
		return new Response("Forbidden", {
			status: 403,
			headers: { "Content-Type": "text/plain" }
		});
	}
	let originHost;
	try {
		originHost = new URL(originHeader).host.toLowerCase();
	} catch {
		return new Response("Forbidden", {
			status: 403,
			headers: { "Content-Type": "text/plain" }
		});
	}
	const hostHeader = (request.headers.get("host") || "").split(",")[0].trim().toLowerCase() || new URL(request.url).host.toLowerCase();
	if (originHost === hostHeader) return null;
	if (allowedOrigins.length > 0 && isOriginAllowed(originHost, allowedOrigins)) return null;
	console.warn(`[vinext] CSRF origin mismatch: origin "${originHost}" does not match host "${hostHeader}". Blocking server action request.`);
	return new Response("Forbidden", {
		status: 403,
		headers: { "Content-Type": "text/plain" }
	});
}
/**
* Reject malformed Flight container reference graphs in server action payloads.
*
* `@vitejs/plugin-rsc` vendors its own React Flight decoder. Malicious action
* payloads can abuse container references (`$Q`, `$W`, `$i`) to trigger very
* expensive deserialization before the action is even looked up.
*
* Legitimate React-encoded container payloads use separate numeric backing
* fields (e.g. field `1` plus root field `0` containing `"$Q1"`). We reject
* numeric backing-field graphs that contain missing backing fields or cycles.
* Regular user form fields are ignored entirely.
*/
async function validateServerActionPayload(body) {
	const containerRefRe = /"\$([QWi])(\d+)"/g;
	const fieldRefs = /* @__PURE__ */ new Map();
	const collectRefs = (fieldKey, text) => {
		const refs = /* @__PURE__ */ new Set();
		let match;
		containerRefRe.lastIndex = 0;
		while ((match = containerRefRe.exec(text)) !== null) refs.add(match[2]);
		fieldRefs.set(fieldKey, refs);
	};
	if (typeof body === "string") collectRefs("0", body);
	else for (const [key, value] of body.entries()) {
		if (!/^\d+$/.test(key)) continue;
		if (typeof value === "string") {
			collectRefs(key, value);
			continue;
		}
		if (typeof value?.text === "function") collectRefs(key, await value.text());
	}
	if (fieldRefs.size === 0) return null;
	const knownFields = new Set(fieldRefs.keys());
	for (const refs of fieldRefs.values()) for (const ref of refs) if (!knownFields.has(ref)) return new Response("Invalid server action payload", {
		status: 400,
		headers: { "Content-Type": "text/plain" }
	});
	const visited = /* @__PURE__ */ new Set();
	const stack = /* @__PURE__ */ new Set();
	const hasCycle = (node) => {
		if (stack.has(node)) return true;
		if (visited.has(node)) return false;
		visited.add(node);
		stack.add(node);
		for (const ref of fieldRefs.get(node) ?? []) if (hasCycle(ref)) return true;
		stack.delete(node);
		return false;
	};
	for (const node of fieldRefs.keys()) if (hasCycle(node)) return new Response("Invalid server action payload", {
		status: 400,
		headers: { "Content-Type": "text/plain" }
	});
	return null;
}
/**
* Check if an origin matches any pattern in the allowed origins list.
* Supports wildcard subdomains (e.g. `*.example.com`).
*/
function isOriginAllowed(origin, allowed) {
	for (const pattern of allowed) if (pattern.startsWith("*.")) {
		const suffix = pattern.slice(1);
		if (origin === pattern.slice(2) || origin.endsWith(suffix)) return true;
	} else if (origin === pattern) return true;
	return false;
}
/**
* Validate an image optimization URL parameter.
*
* Ensures the URL is a relative path that doesn't escape the origin:
* - Must start with "/" but not "//"
* - Backslashes are normalized (browsers treat `\` as `/`)
* - Origin validation as defense-in-depth
*
* @param rawUrl - The raw `url` query parameter value
* @param requestUrl - The full request URL for origin comparison
* @returns An error Response if validation fails, or the normalized image URL
*/
function validateImageUrl(rawUrl, requestUrl) {
	const imgUrl = rawUrl?.replaceAll("\\", "/") ?? null;
	if (!imgUrl || !imgUrl.startsWith("/") || imgUrl.startsWith("//")) return new Response(!rawUrl ? "Missing url parameter" : "Only relative URLs allowed", { status: 400 });
	const url = new URL(requestUrl);
	if (new URL(imgUrl, url.origin).origin !== url.origin) return new Response("Only relative URLs allowed", { status: 400 });
	return imgUrl;
}
//#endregion
//#region node_modules/vinext/dist/server/app-route-handler-runtime.js
var ROUTE_HANDLER_HTTP_METHODS = [
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"DELETE",
	"PATCH",
	"OPTIONS"
];
function collectRouteHandlerMethods(handler) {
	const methods = ROUTE_HANDLER_HTTP_METHODS.filter((method) => typeof handler[method] === "function");
	if (methods.includes("GET") && !methods.includes("HEAD")) methods.push("HEAD");
	return methods;
}
function buildRouteHandlerAllowHeader(exportedMethods) {
	const allow = new Set(exportedMethods);
	allow.add("OPTIONS");
	return Array.from(allow).sort().join(", ");
}
var _KNOWN_DYNAMIC_APP_ROUTE_HANDLERS_KEY = Symbol.for("vinext.appRouteHandlerRuntime.knownDynamicHandlers");
var _g$4 = globalThis;
var knownDynamicAppRouteHandlers = _g$4[_KNOWN_DYNAMIC_APP_ROUTE_HANDLERS_KEY] ??= /* @__PURE__ */ new Set();
function isKnownDynamicAppRoute(pattern) {
	return knownDynamicAppRouteHandlers.has(pattern);
}
function markKnownDynamicAppRoute(pattern) {
	knownDynamicAppRouteHandlers.add(pattern);
}
function bindMethodIfNeeded(value, target) {
	return typeof value === "function" ? value.bind(target) : value;
}
function buildNextConfig(options) {
	if (!options.basePath && !options.i18n) return null;
	return {
		basePath: options.basePath,
		i18n: options.i18n ?? void 0
	};
}
function createTrackedAppRouteRequest(request, options = {}) {
	let didAccessDynamicRequest = false;
	const nextConfig = buildNextConfig(options);
	const markDynamicAccess = (access) => {
		didAccessDynamicRequest = true;
		options.onDynamicAccess?.(access);
	};
	const wrapNextUrl = (nextUrl) => {
		return new Proxy(nextUrl, { get(target, prop) {
			switch (prop) {
				case "search":
				case "searchParams":
				case "url":
				case "href":
				case "toJSON":
				case "toString":
				case "origin":
					markDynamicAccess(`nextUrl.${String(prop)}`);
					return bindMethodIfNeeded(Reflect.get(target, prop, target), target);
				case "clone": return () => wrapNextUrl(target.clone());
				default: return bindMethodIfNeeded(Reflect.get(target, prop, target), target);
			}
		} });
	};
	const wrapRequest = (input) => {
		const nextRequest = input instanceof NextRequest ? input : new NextRequest(input, { nextConfig: nextConfig ?? void 0 });
		let proxiedNextUrl = null;
		return new Proxy(nextRequest, { get(target, prop) {
			switch (prop) {
				case "nextUrl":
					proxiedNextUrl ??= wrapNextUrl(target.nextUrl);
					return proxiedNextUrl;
				case "headers":
				case "cookies":
				case "url":
				case "body":
				case "blob":
				case "json":
				case "text":
				case "arrayBuffer":
				case "formData":
					markDynamicAccess(`request.${String(prop)}`);
					return bindMethodIfNeeded(Reflect.get(target, prop, target), target);
				case "clone": return () => wrapRequest(target.clone());
				default: return bindMethodIfNeeded(Reflect.get(target, prop, target), target);
			}
		} });
	};
	return {
		request: wrapRequest(request),
		didAccessDynamicRequest() {
			return didAccessDynamicRequest;
		}
	};
}
//#endregion
//#region node_modules/vinext/dist/server/app-route-handler-policy.js
function getAppRouteHandlerRevalidateSeconds(handler) {
	return typeof handler.revalidate === "number" && handler.revalidate > 0 && handler.revalidate !== Infinity ? handler.revalidate : null;
}
function hasAppRouteHandlerDefaultExport(handler) {
	return typeof handler.default === "function";
}
function resolveAppRouteHandlerMethod(handler, method) {
	const exportedMethods = collectRouteHandlerMethods(handler);
	const allowHeaderForOptions = buildRouteHandlerAllowHeader(exportedMethods);
	const shouldAutoRespondToOptions = method === "OPTIONS" && typeof handler.OPTIONS !== "function";
	let handlerFn = typeof handler[method] === "function" ? handler[method] : void 0;
	let isAutoHead = false;
	if (method === "HEAD" && typeof handler.HEAD !== "function" && typeof handler.GET === "function") {
		handlerFn = handler.GET;
		isAutoHead = true;
	}
	return {
		allowHeaderForOptions,
		exportedMethods,
		handlerFn,
		isAutoHead,
		shouldAutoRespondToOptions
	};
}
function shouldReadAppRouteHandlerCache(options) {
	return options.isProduction && options.revalidateSeconds !== null && options.dynamicConfig !== "force-dynamic" && !options.isKnownDynamic && (options.method === "GET" || options.isAutoHead) && typeof options.handlerFn === "function";
}
function shouldApplyAppRouteHandlerRevalidateHeader(options) {
	return options.revalidateSeconds !== null && !options.dynamicUsedInHandler && (options.method === "GET" || options.isAutoHead) && !options.handlerSetCacheControl;
}
function shouldWriteAppRouteHandlerCache(options) {
	return options.isProduction && options.revalidateSeconds !== null && options.dynamicConfig !== "force-dynamic" && shouldApplyAppRouteHandlerRevalidateHeader(options);
}
function resolveAppRouteHandlerSpecialError(error, requestUrl) {
	if (!(error && typeof error === "object" && "digest" in error)) return null;
	const digest = String(error.digest);
	if (digest.startsWith("NEXT_REDIRECT;")) {
		const parts = digest.split(";");
		const redirectUrl = decodeURIComponent(parts[2]);
		return {
			kind: "redirect",
			location: new URL(redirectUrl, requestUrl).toString(),
			statusCode: parts[3] ? parseInt(parts[3], 10) : 307
		};
	}
	if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) return {
		kind: "status",
		statusCode: digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10)
	};
	return null;
}
//#endregion
//#region node_modules/vinext/dist/server/middleware-response-headers.js
var ADDITIVE_RESPONSE_HEADER_NAMES = new Set(["set-cookie", "vary"]);
/**
* Merge middleware response headers into a target Headers object.
*
* Set-Cookie and Vary are accumulated (append) since multiple sources can
* contribute values. All other headers use set() so middleware owns singular
* response headers like Cache-Control.
*/
function mergeMiddlewareResponseHeaders(target, middlewareHeaders) {
	if (!middlewareHeaders) return;
	for (const [key, value] of middlewareHeaders) {
		if (ADDITIVE_RESPONSE_HEADER_NAMES.has(key.toLowerCase())) {
			target.append(key, value);
			continue;
		}
		target.set(key, value);
	}
}
//#endregion
//#region node_modules/vinext/dist/server/app-route-handler-response.js
function buildRouteHandlerCacheControl(cacheState, revalidateSeconds) {
	if (cacheState === "STALE") return "s-maxage=0, stale-while-revalidate";
	return `s-maxage=${revalidateSeconds}, stale-while-revalidate`;
}
function applyRouteHandlerMiddlewareContext(response, middlewareContext) {
	if (!middlewareContext.headers && middlewareContext.status == null) return response;
	const responseHeaders = new Headers(response.headers);
	mergeMiddlewareResponseHeaders(responseHeaders, middlewareContext.headers);
	return new Response(response.body, {
		status: middlewareContext.status ?? response.status,
		statusText: response.statusText,
		headers: responseHeaders
	});
}
function buildRouteHandlerCachedResponse(cachedValue, options) {
	const headers = new Headers();
	for (const [key, value] of Object.entries(cachedValue.headers)) if (Array.isArray(value)) for (const entry of value) headers.append(key, entry);
	else headers.set(key, value);
	headers.set("X-Vinext-Cache", options.cacheState);
	headers.set("Cache-Control", buildRouteHandlerCacheControl(options.cacheState, options.revalidateSeconds));
	return new Response(options.isHead ? null : cachedValue.body, {
		status: cachedValue.status,
		headers
	});
}
function applyRouteHandlerRevalidateHeader(response, revalidateSeconds) {
	response.headers.set("cache-control", buildRouteHandlerCacheControl("HIT", revalidateSeconds));
}
function markRouteHandlerCacheMiss(response) {
	response.headers.set("X-Vinext-Cache", "MISS");
}
async function buildAppRouteCacheValue(response) {
	const body = await response.arrayBuffer();
	const headers = {};
	response.headers.forEach((value, key) => {
		if (key === "set-cookie" || key === "x-vinext-cache" || key === "cache-control") return;
		headers[key] = value;
	});
	const setCookies = response.headers.getSetCookie?.() ?? [];
	if (setCookies.length > 0) headers["set-cookie"] = setCookies;
	return {
		kind: "APP_ROUTE",
		body,
		status: response.status,
		headers
	};
}
function finalizeRouteHandlerResponse(response, options) {
	const { pendingCookies, draftCookie, isHead } = options;
	if (pendingCookies.length === 0 && !draftCookie && !isHead) return response;
	const headers = new Headers(response.headers);
	for (const cookie of pendingCookies) headers.append("Set-Cookie", cookie);
	if (draftCookie) headers.append("Set-Cookie", draftCookie);
	return new Response(isHead ? null : response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
//#endregion
//#region node_modules/vinext/dist/server/app-route-handler-execution.js
async function runAppRouteHandler(options) {
	options.consumeDynamicUsage();
	const trackedRequest = createTrackedAppRouteRequest(options.request, {
		basePath: options.basePath,
		i18n: options.i18n,
		onDynamicAccess() {
			options.markDynamicUsage();
		}
	});
	const response = await options.handlerFn(trackedRequest.request, { params: options.params });
	return {
		dynamicUsedInHandler: options.consumeDynamicUsage(),
		response
	};
}
async function executeAppRouteHandler(options) {
	const previousHeadersPhase = options.setHeadersAccessPhase("route-handler");
	try {
		const { dynamicUsedInHandler, response } = await runAppRouteHandler(options);
		const handlerSetCacheControl = response.headers.has("cache-control");
		if (dynamicUsedInHandler) markKnownDynamicAppRoute(options.routePattern);
		if (shouldApplyAppRouteHandlerRevalidateHeader({
			dynamicUsedInHandler,
			handlerSetCacheControl,
			isAutoHead: options.isAutoHead,
			method: options.method,
			revalidateSeconds: options.revalidateSeconds
		})) {
			const revalidateSeconds = options.revalidateSeconds;
			if (revalidateSeconds == null) throw new Error("Expected route handler revalidate seconds");
			applyRouteHandlerRevalidateHeader(response, revalidateSeconds);
		}
		if (shouldWriteAppRouteHandlerCache({
			dynamicConfig: options.handler.dynamic,
			dynamicUsedInHandler,
			handlerSetCacheControl,
			isAutoHead: options.isAutoHead,
			isProduction: options.isProduction,
			method: options.method,
			revalidateSeconds: options.revalidateSeconds
		})) {
			markRouteHandlerCacheMiss(response);
			const routeClone = response.clone();
			const routeKey = options.isrRouteKey(options.cleanPathname);
			const revalidateSeconds = options.revalidateSeconds;
			if (revalidateSeconds == null) throw new Error("Expected route handler cache revalidate seconds");
			const routeTags = options.buildPageCacheTags(options.cleanPathname, options.getCollectedFetchTags());
			const routeWritePromise = (async () => {
				try {
					const routeCacheValue = await buildAppRouteCacheValue(routeClone);
					await options.isrSet(routeKey, routeCacheValue, revalidateSeconds, routeTags);
					options.isrDebug?.("route cache written", routeKey);
				} catch (cacheErr) {
					console.error("[vinext] ISR route cache write error:", cacheErr);
				}
			})();
			options.executionContext?.waitUntil(routeWritePromise);
		}
		const pendingCookies = options.getAndClearPendingCookies();
		const draftCookie = options.getDraftModeCookieHeader();
		options.clearRequestContext();
		return applyRouteHandlerMiddlewareContext(finalizeRouteHandlerResponse(response, {
			pendingCookies,
			draftCookie,
			isHead: options.isAutoHead
		}), options.middlewareContext);
	} catch (error) {
		options.getAndClearPendingCookies();
		const specialError = resolveAppRouteHandlerSpecialError(error, options.request.url);
		options.clearRequestContext();
		if (specialError) {
			if (specialError.kind === "redirect") return applyRouteHandlerMiddlewareContext(new Response(null, {
				status: specialError.statusCode,
				headers: { Location: specialError.location }
			}), options.middlewareContext);
			return applyRouteHandlerMiddlewareContext(new Response(null, { status: specialError.statusCode }), options.middlewareContext);
		}
		console.error("[vinext] Route handler error:", error);
		options.reportRequestError(error instanceof Error ? error : new Error(String(error)), {
			path: options.cleanPathname,
			method: options.request.method,
			headers: Object.fromEntries(options.request.headers.entries())
		}, {
			routerKind: "App Router",
			routePath: options.routePattern,
			routeType: "route"
		});
		return applyRouteHandlerMiddlewareContext(new Response(null, { status: 500 }), options.middlewareContext);
	} finally {
		options.setHeadersAccessPhase(previousHeadersPhase);
	}
}
//#endregion
//#region node_modules/vinext/dist/server/app-route-handler-cache.js
function getCachedAppRouteValue(entry) {
	return entry?.value.value && entry.value.value.kind === "APP_ROUTE" ? entry.value.value : null;
}
async function readAppRouteHandlerCacheResponse(options) {
	const routeKey = options.isrRouteKey(options.cleanPathname);
	try {
		const cached = await options.isrGet(routeKey);
		const cachedValue = getCachedAppRouteValue(cached);
		if (cachedValue && !cached?.isStale) {
			options.isrDebug?.("HIT (route)", options.cleanPathname);
			options.clearRequestContext();
			return applyRouteHandlerMiddlewareContext(buildRouteHandlerCachedResponse(cachedValue, {
				cacheState: "HIT",
				isHead: options.isAutoHead,
				revalidateSeconds: options.revalidateSeconds
			}), options.middlewareContext);
		}
		if (cached?.isStale && cachedValue) {
			const staleValue = cachedValue;
			const revalidateSearchParams = new URLSearchParams(options.revalidateSearchParams);
			options.scheduleBackgroundRegeneration(routeKey, async () => {
				await options.runInRevalidationContext(async () => {
					options.setNavigationContext({
						pathname: options.cleanPathname,
						searchParams: revalidateSearchParams,
						params: options.params
					});
					const { dynamicUsedInHandler, response } = await runAppRouteHandler({
						basePath: options.basePath,
						consumeDynamicUsage: options.consumeDynamicUsage,
						handlerFn: options.handlerFn,
						i18n: options.i18n,
						markDynamicUsage: options.markDynamicUsage,
						params: options.params,
						request: new Request(options.requestUrl, { method: "GET" })
					});
					options.setNavigationContext(null);
					if (dynamicUsedInHandler) {
						markKnownDynamicAppRoute(options.routePattern);
						options.isrDebug?.("route regen skipped (dynamic usage)", options.cleanPathname);
						return;
					}
					const routeTags = options.buildPageCacheTags(options.cleanPathname, options.getCollectedFetchTags());
					const routeCacheValue = await buildAppRouteCacheValue(response);
					await options.isrSet(routeKey, routeCacheValue, options.revalidateSeconds, routeTags);
					options.isrDebug?.("route regen complete", routeKey);
				});
			});
			options.isrDebug?.("STALE (route)", options.cleanPathname);
			options.clearRequestContext();
			return applyRouteHandlerMiddlewareContext(buildRouteHandlerCachedResponse(staleValue, {
				cacheState: "STALE",
				isHead: options.isAutoHead,
				revalidateSeconds: options.revalidateSeconds
			}), options.middlewareContext);
		}
	} catch (routeCacheError) {
		console.error("[vinext] ISR route cache read error:", routeCacheError);
	}
	return null;
}
//#endregion
//#region node_modules/vinext/dist/shims/cache.js
var MemoryCacheHandler = class {
	store = /* @__PURE__ */ new Map();
	tagRevalidatedAt = /* @__PURE__ */ new Map();
	async get(key, _ctx) {
		const entry = this.store.get(key);
		if (!entry) return null;
		for (const tag of entry.tags) {
			const revalidatedAt = this.tagRevalidatedAt.get(tag);
			if (revalidatedAt && revalidatedAt >= entry.lastModified) {
				this.store.delete(key);
				return null;
			}
		}
		if (entry.revalidateAt !== null && Date.now() > entry.revalidateAt) return {
			lastModified: entry.lastModified,
			value: entry.value,
			cacheState: "stale"
		};
		return {
			lastModified: entry.lastModified,
			value: entry.value
		};
	}
	async set(key, data, ctx) {
		const typedCtx = ctx;
		const tagSet = /* @__PURE__ */ new Set();
		if (data && "tags" in data && Array.isArray(data.tags)) for (const t of data.tags) tagSet.add(t);
		if (typedCtx && Array.isArray(typedCtx.tags)) for (const t of typedCtx.tags) tagSet.add(t);
		const tags = [...tagSet];
		let effectiveRevalidate;
		if (typedCtx) {
			const revalidate = typedCtx.cacheControl?.revalidate ?? typedCtx.revalidate;
			if (typeof revalidate === "number") effectiveRevalidate = revalidate;
		}
		if (data && "revalidate" in data && typeof data.revalidate === "number") effectiveRevalidate = data.revalidate;
		if (effectiveRevalidate === 0) return;
		const revalidateAt = typeof effectiveRevalidate === "number" && effectiveRevalidate > 0 ? Date.now() + effectiveRevalidate * 1e3 : null;
		this.store.set(key, {
			value: data,
			tags,
			lastModified: Date.now(),
			revalidateAt
		});
	}
	async revalidateTag(tags, _durations) {
		const tagList = Array.isArray(tags) ? tags : [tags];
		const now = Date.now();
		for (const tag of tagList) this.tagRevalidatedAt.set(tag, now);
	}
	resetRequestCache() {}
};
var _HANDLER_KEY = Symbol.for("vinext.cacheHandler");
var _gHandler = globalThis;
function _getActiveHandler() {
	return _gHandler[_HANDLER_KEY] ?? (_gHandler[_HANDLER_KEY] = new MemoryCacheHandler());
}
/**
* Get the active CacheHandler (for internal use or testing).
*/
function getCacheHandler() {
	return _getActiveHandler();
}
var _ALS_KEY$2 = Symbol.for("vinext.cache.als");
var _FALLBACK_KEY$2 = Symbol.for("vinext.cache.fallback");
var _g$3 = globalThis;
var _cacheAls = _g$3[_ALS_KEY$2] ??= new AsyncLocalStorage$1();
var _cacheFallbackState = _g$3[_FALLBACK_KEY$2] ??= { requestScopedCacheLife: null };
function _getCacheState() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _cacheAls.getStore() ?? _cacheFallbackState;
}
/**
* Consume and reset the request-scoped cache life. Returns null if none was set.
* @internal
*/
function _consumeRequestScopedCacheLife() {
	const state = _getCacheState();
	const config = state.requestScopedCacheLife;
	state.requestScopedCacheLife = null;
	return config;
}
/**
* AsyncLocalStorage to track whether we're inside an unstable_cache() callback.
* Stored on globalThis via Symbol so headers.ts can detect the scope without
* a direct import (avoiding circular dependencies).
*/
var _UNSTABLE_CACHE_ALS_KEY = Symbol.for("vinext.unstableCache.als");
_g$3[_UNSTABLE_CACHE_ALS_KEY] ??= new AsyncLocalStorage$1();
//#endregion
//#region node_modules/vinext/dist/server/isr-cache.js
var _PENDING_REGEN_KEY = Symbol.for("vinext.isrCache.pendingRegenerations");
var _g$2 = globalThis;
_g$2[_PENDING_REGEN_KEY] ??= /* @__PURE__ */ new Map();
/**
* Build a CachedAppPageValue for the App Router ISR cache.
*/
function buildAppPageCacheValue(html, rscData, status) {
	return {
		kind: "APP_PAGE",
		html,
		rscData,
		headers: void 0,
		postponed: void 0,
		status
	};
}
var _REVALIDATE_KEY = Symbol.for("vinext.isrCache.revalidateDurations");
_g$2[_REVALIDATE_KEY] ??= /* @__PURE__ */ new Map();
//#endregion
//#region node_modules/vinext/dist/server/app-page-cache.js
function buildAppPageCacheControl(cacheState, revalidateSeconds) {
	if (cacheState === "STALE") return "s-maxage=0, stale-while-revalidate";
	return `s-maxage=${revalidateSeconds}, stale-while-revalidate`;
}
function getCachedAppPageValue(entry) {
	return entry?.value.value && entry.value.value.kind === "APP_PAGE" ? entry.value.value : null;
}
function buildAppPageCachedResponse(cachedValue, options) {
	const status = cachedValue.status || 200;
	const headers = {
		"Cache-Control": buildAppPageCacheControl(options.cacheState, options.revalidateSeconds),
		Vary: "RSC, Accept",
		"X-Vinext-Cache": options.cacheState
	};
	if (options.isRscRequest) {
		if (!cachedValue.rscData) return null;
		return new Response(cachedValue.rscData, {
			status,
			headers: {
				"Content-Type": "text/x-component; charset=utf-8",
				...headers
			}
		});
	}
	if (typeof cachedValue.html !== "string" || cachedValue.html.length === 0) return null;
	return new Response(cachedValue.html, {
		status,
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			...headers
		}
	});
}
async function readAppPageCacheResponse(options) {
	const isrKey = options.isRscRequest ? options.isrRscKey(options.cleanPathname) : options.isrHtmlKey(options.cleanPathname);
	try {
		const cached = await options.isrGet(isrKey);
		const cachedValue = getCachedAppPageValue(cached);
		if (cachedValue && !cached?.isStale) {
			const hitResponse = buildAppPageCachedResponse(cachedValue, {
				cacheState: "HIT",
				isRscRequest: options.isRscRequest,
				revalidateSeconds: options.revalidateSeconds
			});
			if (hitResponse) {
				options.isrDebug?.(options.isRscRequest ? "HIT (RSC)" : "HIT (HTML)", options.cleanPathname);
				options.clearRequestContext();
				return hitResponse;
			}
			options.isrDebug?.("MISS (empty cached entry)", options.cleanPathname);
		}
		if (cached?.isStale && cachedValue) {
			options.scheduleBackgroundRegeneration(options.cleanPathname, async () => {
				const revalidatedPage = await options.renderFreshPageForCache();
				await Promise.all([options.isrSet(options.isrHtmlKey(options.cleanPathname), buildAppPageCacheValue(revalidatedPage.html, void 0, 200), options.revalidateSeconds, revalidatedPage.tags), options.isrSet(options.isrRscKey(options.cleanPathname), buildAppPageCacheValue("", revalidatedPage.rscData, 200), options.revalidateSeconds, revalidatedPage.tags)]);
				options.isrDebug?.("regen complete", options.cleanPathname);
			});
			const staleResponse = buildAppPageCachedResponse(cachedValue, {
				cacheState: "STALE",
				isRscRequest: options.isRscRequest,
				revalidateSeconds: options.revalidateSeconds
			});
			if (staleResponse) {
				options.isrDebug?.(options.isRscRequest ? "STALE (RSC)" : "STALE (HTML)", options.cleanPathname);
				options.clearRequestContext();
				return staleResponse;
			}
			options.isrDebug?.("STALE MISS (empty stale entry)", options.cleanPathname);
		}
		if (!cached) options.isrDebug?.("MISS (no cache entry)", options.cleanPathname);
	} catch (isrReadError) {
		console.error("[vinext] ISR cache read error:", isrReadError);
	}
	return null;
}
function finalizeAppPageHtmlCacheResponse(response, options) {
	if (!response.body) return response;
	const [streamForClient, streamForCache] = response.body.tee();
	const htmlKey = options.isrHtmlKey(options.cleanPathname);
	const rscKey = options.isrRscKey(options.cleanPathname);
	const cachePromise = (async () => {
		try {
			const reader = streamForCache.getReader();
			const decoder = new TextDecoder();
			const chunks = [];
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				chunks.push(decoder.decode(value, { stream: true }));
			}
			chunks.push(decoder.decode());
			const pageTags = options.getPageTags();
			const writes = [options.isrSet(htmlKey, buildAppPageCacheValue(chunks.join(""), void 0, 200), options.revalidateSeconds, pageTags)];
			if (options.capturedRscDataPromise) writes.push(options.capturedRscDataPromise.then((rscData) => options.isrSet(rscKey, buildAppPageCacheValue("", rscData, 200), options.revalidateSeconds, pageTags)));
			await Promise.all(writes);
			options.isrDebug?.("HTML cache written", htmlKey);
		} catch (cacheError) {
			console.error("[vinext] ISR cache write error:", cacheError);
		}
	})();
	options.waitUntil?.(cachePromise);
	return new Response(streamForClient, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
}
function scheduleAppPageRscCacheWrite(options) {
	const capturedRscDataPromise = options.capturedRscDataPromise;
	if (!capturedRscDataPromise || options.dynamicUsedDuringBuild) return false;
	const rscKey = options.isrRscKey(options.cleanPathname);
	const cachePromise = (async () => {
		try {
			const rscData = await capturedRscDataPromise;
			if (options.consumeDynamicUsage()) {
				options.isrDebug?.("RSC cache write skipped (dynamic usage during render)", rscKey);
				return;
			}
			await options.isrSet(rscKey, buildAppPageCacheValue("", rscData, 200), options.revalidateSeconds, options.getPageTags());
			options.isrDebug?.("RSC cache written", rscKey);
		} catch (cacheError) {
			console.error("[vinext] ISR RSC cache write error:", cacheError);
		}
	})();
	options.waitUntil?.(cachePromise);
	return true;
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-execution.js
function isPromiseLike(value) {
	return Boolean(value && (typeof value === "object" || typeof value === "function") && "then" in value && typeof value.then === "function");
}
function getAppPageStatusText(statusCode) {
	return statusCode === 403 ? "Forbidden" : statusCode === 401 ? "Unauthorized" : "Not Found";
}
function resolveAppPageSpecialError(error) {
	if (!(error && typeof error === "object" && "digest" in error)) return null;
	const digest = String(error.digest);
	if (digest.startsWith("NEXT_REDIRECT;")) {
		const parts = digest.split(";");
		return {
			kind: "redirect",
			location: decodeURIComponent(parts[2]),
			statusCode: parts[3] ? parseInt(parts[3], 10) : 307
		};
	}
	if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) return {
		kind: "http-access-fallback",
		statusCode: digest === "NEXT_NOT_FOUND" ? 404 : parseInt(digest.split(";")[1], 10)
	};
	return null;
}
async function buildAppPageSpecialErrorResponse(options) {
	if (options.specialError.kind === "redirect") {
		options.clearRequestContext();
		return Response.redirect(new URL(options.specialError.location, options.requestUrl), options.specialError.statusCode);
	}
	if (options.renderFallbackPage) {
		const fallbackResponse = await options.renderFallbackPage(options.specialError.statusCode);
		if (fallbackResponse) return fallbackResponse;
	}
	options.clearRequestContext();
	return new Response(getAppPageStatusText(options.specialError.statusCode), { status: options.specialError.statusCode });
}
async function probeAppPageLayouts(options) {
	return options.runWithSuppressedHookWarning(async () => {
		for (let layoutIndex = options.layoutCount - 1; layoutIndex >= 0; layoutIndex--) try {
			const layoutResult = options.probeLayoutAt(layoutIndex);
			if (isPromiseLike(layoutResult)) await layoutResult;
		} catch (error) {
			const response = await options.onLayoutError(error, layoutIndex);
			if (response) return response;
		}
		return null;
	});
}
async function probeAppPageComponent(options) {
	return options.runWithSuppressedHookWarning(async () => {
		try {
			const pageResult = options.probePage();
			if (isPromiseLike(pageResult)) if (options.awaitAsyncResult) await pageResult;
			else Promise.resolve(pageResult).catch(() => {});
		} catch (error) {
			return options.onError(error);
		}
		return null;
	});
}
async function readAppPageTextStream(stream) {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	const chunks = [];
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(decoder.decode(value, { stream: true }));
	}
	chunks.push(decoder.decode());
	return chunks.join("");
}
async function readAppPageBinaryStream(stream) {
	const reader = stream.getReader();
	const chunks = [];
	let totalLength = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
		totalLength += value.byteLength;
	}
	const buffer = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		buffer.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return buffer.buffer;
}
function teeAppPageRscStreamForCapture(stream, shouldCapture) {
	if (!shouldCapture) return {
		capturedRscDataPromise: null,
		responseStream: stream
	};
	const [responseStream, captureStream] = stream.tee();
	return {
		capturedRscDataPromise: readAppPageBinaryStream(captureStream),
		responseStream
	};
}
function buildAppPageFontLinkHeader(preloads) {
	if (!preloads || preloads.length === 0) return "";
	return preloads.map((preload) => `<${preload.href}>; rel=preload; as=font; type=${preload.type}; crossorigin`).join(", ");
}
//#endregion
//#region node_modules/vinext/dist/shims/error-boundary.js
/**
* Generic ErrorBoundary used to wrap route segments with error.tsx.
* This must be a client component since error boundaries use
* componentDidCatch / getDerivedStateFromError.
*/
/**
* Inner class component that catches notFound() errors and renders the
* not-found.tsx fallback. Resets when the pathname changes (client navigation)
* so a previous notFound() doesn't permanently stick.
*
* The ErrorBoundary above re-throws notFound errors so they propagate up to this
* boundary. This must be placed above the ErrorBoundary in the component tree.
*/
/**
* Wrapper that reads the current pathname and passes it to the inner class
* component. This enables automatic reset on client-side navigation.
*/
var ErrorBoundary = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'ErrorBoundary' is called on server");
}, "593f344dc510", "ErrorBoundary");
var NotFoundBoundary = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'NotFoundBoundary' is called on server");
}, "593f344dc510", "NotFoundBoundary");
//#endregion
//#region node_modules/vinext/dist/shims/layout-segment-context.js
/**
* Layout segment context provider.
*
* Must be "use client" so that Vite's RSC bundler renders this component in
* the SSR/browser environment where React.createContext is available. The RSC
* entry imports and renders LayoutSegmentProvider directly, but because of the
* "use client" boundary the actual execution happens on the SSR/client side
* where the context can be created and consumed by useSelectedLayoutSegment(s).
*
* Without "use client", this runs in the RSC environment where
* React.createContext is undefined, getLayoutSegmentContext() returns null,
* the provider becomes a no-op, and useSelectedLayoutSegments always returns [].
*
* The context is shared with navigation.ts via getLayoutSegmentContext()
* to avoid creating separate contexts in different modules.
*/
/**
* Wraps children with the layout segment context.
*
* Each layout in the App Router tree wraps its children with this provider,
* passing a map of parallel route key to segment path. The "children" key is
* always present (the default parallel route). Named parallel slots at this
* layout level add their own keys.
*
* Components inside the provider call useSelectedLayoutSegments(parallelRoutesKey)
* to read the segments for a specific parallel route.
*/
var LayoutSegmentProvider = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'LayoutSegmentProvider' is called on server");
}, "15c18cfaeeff", "LayoutSegmentProvider");
//#endregion
//#region node_modules/vinext/dist/server/app-page-boundary.js
function resolveAppPageHttpAccessBoundaryComponent(options) {
	let boundaryModule;
	if (options.statusCode === 403) boundaryModule = options.routeForbiddenModule ?? options.rootForbiddenModule;
	else if (options.statusCode === 401) boundaryModule = options.routeUnauthorizedModule ?? options.rootUnauthorizedModule;
	else boundaryModule = options.routeNotFoundModule ?? options.rootNotFoundModule;
	return options.getDefaultExport(boundaryModule) ?? null;
}
function resolveAppPageErrorBoundary(options) {
	const pageErrorComponent = options.getDefaultExport(options.pageErrorModule);
	if (pageErrorComponent) return {
		component: pageErrorComponent,
		isGlobalError: false
	};
	if (options.layoutErrorModules) for (let index = options.layoutErrorModules.length - 1; index >= 0; index--) {
		const layoutErrorComponent = options.getDefaultExport(options.layoutErrorModules[index]);
		if (layoutErrorComponent) return {
			component: layoutErrorComponent,
			isGlobalError: false
		};
	}
	const globalErrorComponent = options.getDefaultExport(options.globalErrorModule);
	return {
		component: globalErrorComponent ?? null,
		isGlobalError: Boolean(globalErrorComponent)
	};
}
function wrapAppPageBoundaryElement(options) {
	let element = options.element;
	if (!options.skipLayoutWrapping) {
		const asyncParams = options.makeThenableParams(options.matchedParams);
		for (let index = options.layoutModules.length - 1; index >= 0; index--) {
			const layoutComponent = options.getDefaultExport(options.layoutModules[index]);
			if (!layoutComponent) continue;
			element = options.renderLayout(layoutComponent, element, asyncParams);
			if (options.isRscRequest && options.renderLayoutSegmentProvider && options.resolveChildSegments) {
				const treePosition = options.layoutTreePositions ? options.layoutTreePositions[index] : 0;
				const childSegments = options.resolveChildSegments(options.routeSegments ?? [], treePosition, options.matchedParams);
				element = options.renderLayoutSegmentProvider({ children: childSegments }, element);
			}
		}
	}
	if (options.isRscRequest && options.includeGlobalErrorBoundary && options.globalErrorComponent) element = options.renderErrorBoundary(options.globalErrorComponent, element);
	return element;
}
async function renderAppPageBoundaryResponse(options) {
	const rscStream = options.renderToReadableStream(options.element, { onError: options.createRscOnErrorHandler() });
	if (options.isRscRequest) return new Response(rscStream, {
		status: options.status,
		headers: {
			"Content-Type": "text/x-component; charset=utf-8",
			Vary: "RSC, Accept"
		}
	});
	return options.createHtmlResponse(rscStream, options.status);
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-stream.js
function createAppPageFontData(options) {
	return {
		links: options.getLinks(),
		preloads: options.getPreloads(),
		styles: options.getStyles()
	};
}
async function renderAppPageHtmlStream(options) {
	const ssrOptions = options.scriptNonce === void 0 ? void 0 : { scriptNonce: options.scriptNonce };
	return options.ssrHandler.handleSsr(options.rscStream, options.navigationContext, options.fontData, ssrOptions);
}
/**
* Wraps a stream so that `onFlush` is called when the last byte has been read
* by the downstream consumer (i.e. when the HTTP layer finishes draining the
* response body). This is the correct place to clear per-request context,
* because the RSC/SSR pipeline is lazy — components execute while the stream
* is being consumed, not when the stream handle is first obtained.
*/
function deferUntilStreamConsumed(stream, onFlush) {
	let called = false;
	const once = () => {
		if (!called) {
			called = true;
			onFlush();
		}
	};
	const cleanup = new TransformStream({ flush() {
		once();
	} });
	const reader = stream.pipeThrough(cleanup).getReader();
	return new ReadableStream({
		pull(controller) {
			return reader.read().then(({ done, value }) => {
				if (done) controller.close();
				else controller.enqueue(value);
			}, (error) => {
				once();
				controller.error(error);
			});
		},
		cancel(reason) {
			once();
			return reader.cancel(reason);
		}
	});
}
async function renderAppPageHtmlResponse(options) {
	const safeStream = deferUntilStreamConsumed(await renderAppPageHtmlStream(options), () => {
		options.clearRequestContext();
	});
	const headers = {
		"Content-Type": "text/html; charset=utf-8",
		Vary: "RSC, Accept"
	};
	if (options.fontLinkHeader) headers.Link = options.fontLinkHeader;
	return new Response(safeStream, {
		status: options.status,
		headers
	});
}
async function renderAppPageHtmlStreamWithRecovery(options) {
	try {
		const htmlStream = await options.renderHtmlStream();
		options.onShellRendered?.();
		return {
			htmlStream,
			response: null
		};
	} catch (error) {
		const specialError = options.resolveSpecialError(error);
		if (specialError) return {
			htmlStream: null,
			response: await options.renderSpecialErrorResponse(specialError)
		};
		const boundaryResponse = await options.renderErrorBoundaryResponse(error);
		if (boundaryResponse) return {
			htmlStream: null,
			response: boundaryResponse
		};
		throw error;
	}
}
function createAppPageRscErrorTracker(baseOnError) {
	let capturedError = null;
	return {
		getCapturedError() {
			return capturedError;
		},
		onRenderError(error, requestInfo, errorContext) {
			if (!(error && typeof error === "object" && "digest" in error)) capturedError = error;
			return baseOnError(error, requestInfo, errorContext);
		}
	};
}
function shouldRerenderAppPageWithGlobalError(options) {
	return Boolean(options.capturedError) && !options.hasLocalBoundary;
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-boundary-render.js
function getDefaultExport$1(module) {
	return module?.default ?? null;
}
async function resolveAppPageLayoutHead(layoutModules, params) {
	const filteredLayouts = layoutModules.filter(Boolean);
	const layoutMetadataPromises = [];
	let accumulatedMetadata = Promise.resolve({});
	for (let index = 0; index < filteredLayouts.length; index++) {
		const parentForLayout = accumulatedMetadata;
		const metadataPromise = resolveModuleMetadata(filteredLayouts[index], params, void 0, parentForLayout).catch((error) => {
			console.error("[vinext] Layout generateMetadata() failed:", error);
			return null;
		});
		layoutMetadataPromises.push(metadataPromise);
		accumulatedMetadata = metadataPromise.then(async (metadataResult) => {
			if (metadataResult) return mergeMetadata([await parentForLayout, metadataResult]);
			return parentForLayout;
		});
	}
	const [metadataResults, viewportResults] = await Promise.all([Promise.all(layoutMetadataPromises), Promise.all(filteredLayouts.map((layoutModule) => resolveModuleViewport(layoutModule, params).catch((error) => {
		console.error("[vinext] Layout generateViewport() failed:", error);
		return null;
	})))]);
	const metadataList = metadataResults.filter(Boolean);
	const viewportList = viewportResults.filter(Boolean);
	return {
		metadata: metadataList.length > 0 ? mergeMetadata(metadataList) : null,
		viewport: mergeViewport(viewportList)
	};
}
function wrapRenderedBoundaryElement(options) {
	return wrapAppPageBoundaryElement({
		element: options.element,
		getDefaultExport: getDefaultExport$1,
		globalErrorComponent: getDefaultExport$1(options.globalErrorModule),
		includeGlobalErrorBoundary: options.includeGlobalErrorBoundary,
		isRscRequest: options.isRscRequest,
		layoutModules: options.layoutModules,
		layoutTreePositions: options.layoutTreePositions,
		makeThenableParams: options.makeThenableParams,
		matchedParams: options.matchedParams,
		renderErrorBoundary(GlobalErrorComponent, children) {
			return (0, import_react_react_server.createElement)(ErrorBoundary, {
				fallback: GlobalErrorComponent,
				children
			});
		},
		renderLayout(LayoutComponent, children, asyncParams) {
			return (0, import_react_react_server.createElement)(LayoutComponent, {
				children,
				params: asyncParams
			});
		},
		renderLayoutSegmentProvider(segmentMap, children) {
			return (0, import_react_react_server.createElement)(LayoutSegmentProvider, { segmentMap }, children);
		},
		resolveChildSegments: options.resolveChildSegments,
		routeSegments: options.routeSegments ?? [],
		skipLayoutWrapping: options.skipLayoutWrapping
	});
}
async function renderAppPageBoundaryElementResponse(options) {
	const pathname = new URL(options.requestUrl).pathname;
	return renderAppPageBoundaryResponse({
		async createHtmlResponse(rscStream, responseStatus) {
			const fontData = createAppPageFontData({
				getLinks: options.getFontLinks,
				getPreloads: options.getFontPreloads,
				getStyles: options.getFontStyles
			});
			const ssrHandler = await options.loadSsrHandler();
			return renderAppPageHtmlResponse({
				clearRequestContext: options.clearRequestContext,
				fontData,
				fontLinkHeader: options.buildFontLinkHeader(fontData.preloads),
				navigationContext: options.getNavigationContext(),
				rscStream,
				scriptNonce: options.scriptNonce,
				ssrHandler,
				status: responseStatus
			});
		},
		createRscOnErrorHandler() {
			return options.createRscOnErrorHandler(pathname, options.routePattern ?? pathname);
		},
		element: options.element,
		isRscRequest: options.isRscRequest,
		renderToReadableStream: options.renderToReadableStream,
		status: options.status
	});
}
async function renderAppPageHttpAccessFallback(options) {
	const boundaryComponent = options.boundaryComponent ?? resolveAppPageHttpAccessBoundaryComponent({
		getDefaultExport: getDefaultExport$1,
		rootForbiddenModule: options.rootForbiddenModule,
		rootNotFoundModule: options.rootNotFoundModule,
		rootUnauthorizedModule: options.rootUnauthorizedModule,
		routeForbiddenModule: options.route?.forbidden,
		routeNotFoundModule: options.route?.notFound,
		routeUnauthorizedModule: options.route?.unauthorized,
		statusCode: options.statusCode
	});
	if (!boundaryComponent) return null;
	const layoutModules = options.layoutModules ?? options.route?.layouts ?? options.rootLayouts;
	const { metadata, viewport } = await resolveAppPageLayoutHead(layoutModules, options.matchedParams);
	const headElements = [(0, import_react_react_server.createElement)("meta", {
		charSet: "utf-8",
		key: "charset"
	}), (0, import_react_react_server.createElement)("meta", {
		content: "noindex",
		key: "robots",
		name: "robots"
	})];
	if (metadata) headElements.push((0, import_react_react_server.createElement)(MetadataHead, {
		key: "metadata",
		metadata
	}));
	headElements.push((0, import_react_react_server.createElement)(ViewportHead, {
		key: "viewport",
		viewport
	}));
	const element = wrapRenderedBoundaryElement({
		element: (0, import_react_react_server.createElement)(import_react_react_server.Fragment, null, ...headElements, (0, import_react_react_server.createElement)(boundaryComponent)),
		globalErrorModule: options.globalErrorModule,
		includeGlobalErrorBoundary: true,
		isRscRequest: options.isRscRequest,
		layoutModules,
		layoutTreePositions: options.route?.layoutTreePositions,
		makeThenableParams: options.makeThenableParams,
		matchedParams: options.matchedParams,
		resolveChildSegments: options.resolveChildSegments,
		routeSegments: options.route?.routeSegments
	});
	return renderAppPageBoundaryElementResponse({
		...options,
		element,
		routePattern: options.route?.pattern,
		status: options.statusCode
	});
}
async function renderAppPageErrorBoundary(options) {
	const errorBoundary = resolveAppPageErrorBoundary({
		getDefaultExport: getDefaultExport$1,
		globalErrorModule: options.globalErrorModule,
		layoutErrorModules: options.route?.errors,
		pageErrorModule: options.route?.error
	});
	if (!errorBoundary.component) return null;
	const rawError = options.error instanceof Error ? options.error : new Error(String(options.error));
	const errorObject = options.sanitizeErrorForClient(rawError);
	const matchedParams = options.matchedParams ?? options.route?.params ?? {};
	const layoutModules = options.route?.layouts ?? options.rootLayouts;
	const element = wrapRenderedBoundaryElement({
		element: (0, import_react_react_server.createElement)(errorBoundary.component, { error: errorObject }),
		globalErrorModule: options.globalErrorModule,
		includeGlobalErrorBoundary: !errorBoundary.isGlobalError,
		isRscRequest: options.isRscRequest,
		layoutModules,
		layoutTreePositions: options.route?.layoutTreePositions,
		makeThenableParams: options.makeThenableParams,
		matchedParams,
		resolveChildSegments: options.resolveChildSegments,
		routeSegments: options.route?.routeSegments,
		skipLayoutWrapping: errorBoundary.isGlobalError
	});
	return renderAppPageBoundaryElementResponse({
		...options,
		element,
		routePattern: options.route?.pattern,
		status: 200
	});
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-route-wiring.js
function getDefaultExport(module) {
	return module?.default ?? null;
}
function getErrorBoundaryExport(module) {
	return module?.default ?? null;
}
function createAppPageTreePath(routeSegments, treePosition) {
	const treePathSegments = routeSegments?.slice(0, treePosition) ?? [];
	if (treePathSegments.length === 0) return "/";
	return `/${treePathSegments.join("/")}`;
}
function createAppPageLayoutEntries(route) {
	return route.layouts.map((layoutModule, index) => {
		const treePosition = route.layoutTreePositions?.[index] ?? 0;
		const treePath = createAppPageTreePath(route.routeSegments, treePosition);
		return {
			errorModule: route.errors?.[index] ?? null,
			id: `layout:${treePath}`,
			layoutModule,
			notFoundModule: route.notFounds?.[index] ?? null,
			treePath,
			treePosition
		};
	});
}
function resolveAppPageChildSegments(routeSegments, treePosition, params) {
	const rawSegments = routeSegments.slice(treePosition);
	const resolvedSegments = [];
	for (const segment of rawSegments) {
		if (segment.startsWith("[[...") && segment.endsWith("]]") && segment.length >= 8) {
			const paramValue = params[segment.slice(5, -2)];
			if (Array.isArray(paramValue) && paramValue.length === 0) continue;
			if (paramValue === void 0) continue;
			resolvedSegments.push(Array.isArray(paramValue) ? paramValue.join("/") : paramValue);
			continue;
		}
		if (segment.startsWith("[...") && segment.endsWith("]")) {
			const paramValue = params[segment.slice(4, -1)];
			if (Array.isArray(paramValue)) {
				resolvedSegments.push(paramValue.join("/"));
				continue;
			}
			resolvedSegments.push(paramValue ?? segment);
			continue;
		}
		if (segment.startsWith("[") && segment.endsWith("]") && !segment.includes(".")) {
			const paramValue = params[segment.slice(1, -1)];
			resolvedSegments.push(Array.isArray(paramValue) ? paramValue.join("/") : paramValue ?? segment);
			continue;
		}
		resolvedSegments.push(segment);
	}
	return resolvedSegments;
}
function buildAppPageRouteElement(options) {
	let element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(LayoutSegmentProvider, {
		segmentMap: { children: [] },
		children: options.element
	});
	element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)(import_jsx_runtime_react_server.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", { charSet: "utf-8" }),
		options.resolvedMetadata ? /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(MetadataHead, { metadata: options.resolvedMetadata }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ViewportHead, { viewport: options.resolvedViewport }),
		element
	] });
	const loadingComponent = getDefaultExport(options.route.loading);
	if (loadingComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_react_react_server.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(loadingComponent, {}),
		children: element
	});
	const lastLayoutErrorModule = options.route.errors && options.route.errors.length > 0 ? options.route.errors[options.route.errors.length - 1] : null;
	const pageErrorComponent = getErrorBoundaryExport(options.route.error);
	if (pageErrorComponent && options.route.error !== lastLayoutErrorModule) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ErrorBoundary, {
		fallback: pageErrorComponent,
		children: element
	});
	const notFoundComponent = getDefaultExport(options.route.notFound) ?? getDefaultExport(options.rootNotFoundModule);
	if (notFoundComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(NotFoundBoundary, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(notFoundComponent, {}),
		children: element
	});
	const templates = options.route.templates ?? [];
	const routeSlots = options.route.slots ?? {};
	const layoutEntries = createAppPageLayoutEntries(options.route);
	const routeThenableParams = options.makeThenableParams(options.matchedParams);
	const getEffectiveSlotParams = (slotName) => options.slotOverrides?.[slotName]?.params ?? options.matchedParams;
	for (let index = layoutEntries.length - 1; index >= 0; index--) {
		const layoutEntry = layoutEntries[index];
		const layoutNotFoundComponent = getDefaultExport(layoutEntry.notFoundModule);
		if (layoutNotFoundComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(NotFoundBoundary, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(layoutNotFoundComponent, {}),
			children: element
		});
		const layoutErrorComponent = getErrorBoundaryExport(layoutEntry.errorModule);
		if (layoutErrorComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ErrorBoundary, {
			fallback: layoutErrorComponent,
			children: element
		});
		const templateComponent = getDefaultExport(templates[index]);
		if (templateComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(templateComponent, {
			params: options.matchedParams,
			children: element
		});
		const layoutComponent = getDefaultExport(layoutEntry.layoutModule);
		if (!layoutComponent) continue;
		const layoutProps = { params: routeThenableParams };
		for (const [slotName, slot] of Object.entries(routeSlots)) {
			const targetIndex = slot.layoutIndex >= 0 ? slot.layoutIndex : layoutEntries.length - 1;
			if (index !== targetIndex) continue;
			const slotOverride = options.slotOverrides?.[slotName];
			const slotParams = getEffectiveSlotParams(slotName);
			const slotComponent = getDefaultExport(slotOverride?.pageModule) ?? getDefaultExport(slot.page) ?? getDefaultExport(slot.default);
			if (!slotComponent) continue;
			const slotProps = { params: options.makeThenableParams(slotParams) };
			if (slotOverride?.props) Object.assign(slotProps, slotOverride.props);
			let slotElement = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(slotComponent, { ...slotProps });
			const slotLayoutComponent = getDefaultExport(slot.layout);
			if (slotLayoutComponent) slotElement = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(slotLayoutComponent, {
				params: options.makeThenableParams(slotParams),
				children: slotElement
			});
			const slotLoadingComponent = getDefaultExport(slot.loading);
			if (slotLoadingComponent) slotElement = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_react_react_server.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(slotLoadingComponent, {}),
				children: slotElement
			});
			const slotErrorComponent = getErrorBoundaryExport(slot.error);
			if (slotErrorComponent) slotElement = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ErrorBoundary, {
				fallback: slotErrorComponent,
				children: slotElement
			});
			layoutProps[slotName] = slotElement;
		}
		element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(layoutComponent, {
			...layoutProps,
			children: element
		});
		const segmentMap = { children: resolveAppPageChildSegments(options.route.routeSegments ?? [], layoutEntry.treePosition, options.matchedParams) };
		for (const [slotName, slot] of Object.entries(routeSlots)) {
			const targetIndex = slot.layoutIndex >= 0 ? slot.layoutIndex : layoutEntries.length - 1;
			if (index !== targetIndex) continue;
			const slotParams = getEffectiveSlotParams(slotName);
			if (slot.routeSegments) segmentMap[slotName] = resolveAppPageChildSegments(slot.routeSegments, 0, slotParams);
			else segmentMap[slotName] = [];
		}
		element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(LayoutSegmentProvider, {
			segmentMap,
			children: element
		});
	}
	const globalErrorComponent = getErrorBoundaryExport(options.globalErrorModule);
	if (globalErrorComponent) element = /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ErrorBoundary, {
		fallback: globalErrorComponent,
		children: element
	});
	return element;
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-probe.js
async function probeAppPageBeforeRender(options) {
	if (options.layoutCount > 0) {
		const layoutProbeResponse = await probeAppPageLayouts({
			layoutCount: options.layoutCount,
			async onLayoutError(layoutError, layoutIndex) {
				const specialError = options.resolveSpecialError(layoutError);
				if (!specialError) return null;
				return options.renderLayoutSpecialError(specialError, layoutIndex);
			},
			probeLayoutAt: options.probeLayoutAt,
			runWithSuppressedHookWarning(probe) {
				return options.runWithSuppressedHookWarning(probe);
			}
		});
		if (layoutProbeResponse) return layoutProbeResponse;
	}
	return probeAppPageComponent({
		awaitAsyncResult: !options.hasLoadingBoundary,
		async onError(pageError) {
			const specialError = options.resolveSpecialError(pageError);
			if (specialError) return options.renderPageSpecialError(specialError);
			return null;
		},
		probePage: options.probePage,
		runWithSuppressedHookWarning(probe) {
			return options.runWithSuppressedHookWarning(probe);
		}
	});
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-response.js
var STATIC_CACHE_CONTROL = "s-maxage=31536000, stale-while-revalidate";
var NO_STORE_CACHE_CONTROL = "no-store, must-revalidate";
function buildRevalidateCacheControl(revalidateSeconds) {
	return `s-maxage=${revalidateSeconds}, stale-while-revalidate`;
}
function applyTimingHeader(headers, timing) {
	if (!timing) return;
	const handlerStart = Math.round(timing.handlerStart);
	const compileMs = timing.compileEnd !== void 0 ? Math.round(timing.compileEnd - timing.handlerStart) : -1;
	const renderMs = timing.responseKind === "html" && timing.renderEnd !== void 0 && timing.compileEnd !== void 0 ? Math.round(timing.renderEnd - timing.compileEnd) : -1;
	headers.set("x-vinext-timing", `${handlerStart},${compileMs},${renderMs}`);
}
function resolveAppPageRscResponsePolicy(options) {
	if (options.isForceDynamic || options.dynamicUsedDuringBuild) return { cacheControl: NO_STORE_CACHE_CONTROL };
	if (options.revalidateSeconds === 0) return { cacheControl: NO_STORE_CACHE_CONTROL };
	if ((options.isForceStatic || options.isDynamicError) && !options.revalidateSeconds || options.revalidateSeconds === Infinity) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC"
	};
	if (options.revalidateSeconds) return {
		cacheControl: buildRevalidateCacheControl(options.revalidateSeconds),
		cacheState: options.isProduction ? "MISS" : void 0
	};
	return {};
}
function resolveAppPageHtmlResponsePolicy(options) {
	if (options.isForceDynamic) return {
		cacheControl: NO_STORE_CACHE_CONTROL,
		shouldWriteToCache: false
	};
	if (options.hasScriptNonce) return {
		cacheControl: NO_STORE_CACHE_CONTROL,
		shouldWriteToCache: false
	};
	if (options.revalidateSeconds === 0) return {
		cacheControl: NO_STORE_CACHE_CONTROL,
		shouldWriteToCache: false
	};
	if ((options.isForceStatic || options.isDynamicError) && options.revalidateSeconds === null) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC",
		shouldWriteToCache: false
	};
	if (options.dynamicUsedDuringRender) return {
		cacheControl: NO_STORE_CACHE_CONTROL,
		shouldWriteToCache: false
	};
	if (options.revalidateSeconds !== null && options.revalidateSeconds > 0 && options.revalidateSeconds !== Infinity) return {
		cacheControl: buildRevalidateCacheControl(options.revalidateSeconds),
		cacheState: options.isProduction ? "MISS" : void 0,
		shouldWriteToCache: options.isProduction
	};
	if (options.revalidateSeconds === Infinity) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC",
		shouldWriteToCache: false
	};
	return { shouldWriteToCache: false };
}
function buildAppPageRscResponse(body, options) {
	const headers = new Headers({
		"Content-Type": "text/x-component; charset=utf-8",
		Vary: "RSC, Accept"
	});
	if (options.params && Object.keys(options.params).length > 0) headers.set("X-Vinext-Params", encodeURIComponent(JSON.stringify(options.params)));
	if (options.policy.cacheControl) headers.set("Cache-Control", options.policy.cacheControl);
	if (options.policy.cacheState) headers.set("X-Vinext-Cache", options.policy.cacheState);
	mergeMiddlewareResponseHeaders(headers, options.middlewareContext.headers);
	applyTimingHeader(headers, options.timing);
	return new Response(body, {
		status: options.middlewareContext.status ?? 200,
		headers
	});
}
function buildAppPageHtmlResponse(body, options) {
	const headers = new Headers({
		"Content-Type": "text/html; charset=utf-8",
		Vary: "RSC, Accept"
	});
	if (options.policy.cacheControl) headers.set("Cache-Control", options.policy.cacheControl);
	if (options.policy.cacheState) headers.set("X-Vinext-Cache", options.policy.cacheState);
	if (options.draftCookie) headers.append("Set-Cookie", options.draftCookie);
	if (options.fontLinkHeader) headers.set("Link", options.fontLinkHeader);
	mergeMiddlewareResponseHeaders(headers, options.middlewareContext.headers);
	applyTimingHeader(headers, options.timing);
	return new Response(body, {
		status: options.middlewareContext.status ?? 200,
		headers
	});
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-render.js
function buildResponseTiming(options) {
	if (options.isProduction) return;
	return {
		compileEnd: options.compileEnd,
		handlerStart: options.handlerStart,
		renderEnd: options.renderEnd,
		responseKind: options.responseKind
	};
}
async function renderAppPageLifecycle(options) {
	const preRenderResponse = await probeAppPageBeforeRender({
		hasLoadingBoundary: options.hasLoadingBoundary,
		layoutCount: options.layoutCount,
		probeLayoutAt(layoutIndex) {
			return options.probeLayoutAt(layoutIndex);
		},
		probePage() {
			return options.probePage();
		},
		renderLayoutSpecialError(specialError, layoutIndex) {
			return options.renderLayoutSpecialError(specialError, layoutIndex);
		},
		renderPageSpecialError(specialError) {
			return options.renderPageSpecialError(specialError);
		},
		resolveSpecialError: resolveAppPageSpecialError,
		runWithSuppressedHookWarning(probe) {
			return options.runWithSuppressedHookWarning(probe);
		}
	});
	if (preRenderResponse) return preRenderResponse;
	const compileEnd = options.isProduction ? void 0 : performance.now();
	const rscErrorTracker = createAppPageRscErrorTracker(options.createRscOnErrorHandler(options.cleanPathname, options.routePattern));
	const rscStream = options.renderToReadableStream(options.element, { onError: rscErrorTracker.onRenderError });
	let revalidateSeconds = options.revalidateSeconds;
	const rscCapture = teeAppPageRscStreamForCapture(rscStream, options.isProduction && revalidateSeconds !== null && revalidateSeconds > 0 && revalidateSeconds !== Infinity && !options.isForceDynamic);
	const rscForResponse = rscCapture.responseStream;
	const isrRscDataPromise = rscCapture.capturedRscDataPromise;
	if (options.isRscRequest) {
		const dynamicUsedDuringBuild = options.consumeDynamicUsage();
		const rscResponsePolicy = resolveAppPageRscResponsePolicy({
			dynamicUsedDuringBuild,
			isDynamicError: options.isDynamicError,
			isForceDynamic: options.isForceDynamic,
			isForceStatic: options.isForceStatic,
			isProduction: options.isProduction,
			revalidateSeconds
		});
		const rscResponse = buildAppPageRscResponse(rscForResponse, {
			middlewareContext: options.middlewareContext,
			params: options.params,
			policy: rscResponsePolicy,
			timing: buildResponseTiming({
				compileEnd,
				handlerStart: options.handlerStart,
				isProduction: options.isProduction,
				responseKind: "rsc"
			})
		});
		scheduleAppPageRscCacheWrite({
			capturedRscDataPromise: options.isProduction ? isrRscDataPromise : null,
			cleanPathname: options.cleanPathname,
			consumeDynamicUsage: options.consumeDynamicUsage,
			dynamicUsedDuringBuild,
			getPageTags() {
				return options.getPageTags();
			},
			isrDebug: options.isrDebug,
			isrRscKey: options.isrRscKey,
			isrSet: options.isrSet,
			revalidateSeconds: revalidateSeconds ?? 0,
			waitUntil(promise) {
				options.waitUntil?.(promise);
			}
		});
		return rscResponse;
	}
	const fontData = createAppPageFontData({
		getLinks: options.getFontLinks,
		getPreloads: options.getFontPreloads,
		getStyles: options.getFontStyles
	});
	const fontLinkHeader = buildAppPageFontLinkHeader(fontData.preloads);
	let renderEnd;
	const htmlRender = await renderAppPageHtmlStreamWithRecovery({
		onShellRendered() {
			if (!options.isProduction) renderEnd = performance.now();
		},
		renderErrorBoundaryResponse(error) {
			return options.renderErrorBoundaryResponse(error);
		},
		async renderHtmlStream() {
			const ssrHandler = await options.loadSsrHandler();
			return renderAppPageHtmlStream({
				fontData,
				navigationContext: options.getNavigationContext(),
				rscStream: rscForResponse,
				scriptNonce: options.scriptNonce,
				ssrHandler
			});
		},
		renderSpecialErrorResponse(specialError) {
			return options.renderPageSpecialError(specialError);
		},
		resolveSpecialError: resolveAppPageSpecialError
	});
	if (htmlRender.response) return htmlRender.response;
	const htmlStream = htmlRender.htmlStream;
	if (!htmlStream) throw new Error("[vinext] Expected an HTML stream when no fallback response was returned");
	if (shouldRerenderAppPageWithGlobalError({
		capturedError: rscErrorTracker.getCapturedError(),
		hasLocalBoundary: options.routeHasLocalBoundary
	})) {
		const cleanResponse = await options.renderErrorBoundaryResponse(rscErrorTracker.getCapturedError());
		if (cleanResponse) return cleanResponse;
	}
	const draftCookie = options.getDraftModeCookieHeader();
	const dynamicUsedDuringRender = options.consumeDynamicUsage();
	const requestCacheLife = options.getRequestCacheLife();
	if (requestCacheLife?.revalidate !== void 0 && revalidateSeconds === null) revalidateSeconds = requestCacheLife.revalidate;
	const safeHtmlStream = deferUntilStreamConsumed(htmlStream, () => {
		options.clearRequestContext();
	});
	const htmlResponsePolicy = resolveAppPageHtmlResponsePolicy({
		dynamicUsedDuringRender,
		hasScriptNonce: Boolean(options.scriptNonce),
		isDynamicError: options.isDynamicError,
		isForceDynamic: options.isForceDynamic,
		isForceStatic: options.isForceStatic,
		isProduction: options.isProduction,
		revalidateSeconds
	});
	const htmlResponseTiming = buildResponseTiming({
		compileEnd,
		handlerStart: options.handlerStart,
		isProduction: options.isProduction,
		renderEnd,
		responseKind: "html"
	});
	if (htmlResponsePolicy.shouldWriteToCache) return finalizeAppPageHtmlCacheResponse(buildAppPageHtmlResponse(safeHtmlStream, {
		draftCookie,
		fontLinkHeader,
		middlewareContext: options.middlewareContext,
		policy: htmlResponsePolicy,
		timing: htmlResponseTiming
	}), {
		capturedRscDataPromise: isrRscDataPromise,
		cleanPathname: options.cleanPathname,
		getPageTags() {
			return options.getPageTags();
		},
		isrDebug: options.isrDebug,
		isrHtmlKey: options.isrHtmlKey,
		isrRscKey: options.isrRscKey,
		isrSet: options.isrSet,
		revalidateSeconds: revalidateSeconds ?? 0,
		waitUntil(cachePromise) {
			options.waitUntil?.(cachePromise);
		}
	});
	return buildAppPageHtmlResponse(safeHtmlStream, {
		draftCookie,
		fontLinkHeader,
		middlewareContext: options.middlewareContext,
		policy: htmlResponsePolicy,
		timing: htmlResponseTiming
	});
}
//#endregion
//#region node_modules/vinext/dist/server/csp.js
var ESCAPE_REGEX = /[&><\u2028\u2029]/;
function matchesDirectiveName(directive, name) {
	return directive === name || directive.startsWith(`${name} `);
}
function getScriptNonceFromHeader(cspHeaderValue) {
	const directives = cspHeaderValue.split(";").map((directive) => directive.trim());
	const directive = directives.find((value) => matchesDirectiveName(value, "script-src")) ?? directives.find((value) => matchesDirectiveName(value, "default-src"));
	if (!directive) return;
	const nonce = directive.split(" ").slice(1).map((source) => source.trim()).find((source) => source.startsWith("'nonce-") && source.length > 8 && source.endsWith("'"))?.slice(7, -1);
	if (!nonce) return;
	if (ESCAPE_REGEX.test(nonce)) throw new Error("Nonce value from Content-Security-Policy contained HTML escape characters.\nLearn more: https://nextjs.org/docs/messages/nonce-contained-invalid-characters");
	return nonce;
}
function getScriptNonceFromHeaders(headers) {
	const csp = headers?.get("content-security-policy") ?? headers?.get("content-security-policy-report-only");
	if (!csp) return;
	return getScriptNonceFromHeader(csp);
}
function getScriptNonceFromHeaderSources(...headersList) {
	for (const headers of headersList) {
		const nonce = getScriptNonceFromHeaders(headers);
		if (nonce) return nonce;
	}
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-request.js
function areStaticParamsAllowed(params, staticParams) {
	const paramKeys = Object.keys(params);
	return staticParams.some((staticParamSet) => paramKeys.every((key) => {
		const value = params[key];
		const staticValue = staticParamSet[key];
		if (staticValue === void 0) return true;
		if (Array.isArray(value)) return JSON.stringify(value) === JSON.stringify(staticValue);
		if (typeof staticValue === "string" || typeof staticValue === "number" || typeof staticValue === "boolean") return String(value) === String(staticValue);
		return JSON.stringify(value) === JSON.stringify(staticValue);
	}));
}
async function validateAppPageDynamicParams(options) {
	if (!options.enforceStaticParamsOnly || !options.isDynamicRoute || typeof options.generateStaticParams !== "function") return null;
	try {
		const staticParams = await options.generateStaticParams({ params: options.params });
		if (Array.isArray(staticParams) && !areStaticParamsAllowed(options.params, staticParams)) {
			options.clearRequestContext();
			return new Response("Not Found", { status: 404 });
		}
	} catch (error) {
		options.logGenerateStaticParamsError?.(error);
	}
	return null;
}
async function resolveAppPageIntercept(options) {
	if (!options.isRscRequest) return {
		interceptOpts: void 0,
		response: null
	};
	const intercept = options.findIntercept(options.cleanPathname);
	if (!intercept) return {
		interceptOpts: void 0,
		response: null
	};
	const sourceRoute = options.getSourceRoute(intercept.sourceRouteIndex);
	const interceptOpts = options.toInterceptOpts(intercept);
	if (sourceRoute && sourceRoute !== options.currentRoute) {
		const sourceParams = options.matchSourceRouteParams(options.getRoutePattern(sourceRoute)) ?? {};
		options.setNavigationContext({
			params: intercept.matchedParams,
			pathname: options.cleanPathname,
			searchParams: options.searchParams
		});
		const interceptElement = await options.buildPageElement(sourceRoute, sourceParams, interceptOpts, options.searchParams);
		return {
			interceptOpts: void 0,
			response: await options.renderInterceptResponse(sourceRoute, interceptElement)
		};
	}
	return {
		interceptOpts,
		response: null
	};
}
async function buildAppPageElement(options) {
	try {
		return {
			element: await options.buildPageElement(),
			response: null
		};
	} catch (error) {
		const specialError = options.resolveSpecialError(error);
		if (specialError) return {
			element: null,
			response: await options.renderSpecialError(specialError)
		};
		const errorBoundaryResponse = await options.renderErrorBoundaryPage(error);
		if (errorBoundaryResponse) return {
			element: null,
			response: errorBoundaryResponse
		};
		throw error;
	}
}
//#endregion
//#region node_modules/vinext/dist/shims/fetch-cache.js
/**
* Extended fetch() with Next.js caching semantics.
*
* Patches `globalThis.fetch` during server rendering to support:
*
*   fetch(url, { next: { revalidate: 60, tags: ['posts'] } })
*   fetch(url, { cache: 'force-cache' })
*   fetch(url, { cache: 'no-store' })
*
* Cached responses are stored via the pluggable CacheHandler, so
* revalidateTag() and revalidatePath() invalidate fetch-level caches.
*
* Usage (in server entry):
*   import { withFetchCache, cleanupFetchCache } from './fetch-cache';
*   const cleanup = withFetchCache();
*   try { ... render ... } finally { cleanup(); }
*
* Or use the async helper:
*   await runWithFetchCache(async () => { ... render ... });
*/
/**
* Headers excluded from the cache key. These are W3C trace context headers
* that can break request caching and deduplication.
* All other headers ARE included in the cache key, matching Next.js behavior.
*/
var HEADER_BLOCKLIST = ["traceparent", "tracestate"];
var CACHE_KEY_PREFIX = "v3";
var MAX_CACHE_KEY_BODY_BYTES = 1024 * 1024;
var BodyTooLargeForCacheKeyError = class extends Error {
	constructor() {
		super("Fetch body too large for cache key generation");
	}
};
var SkipCacheKeyGenerationError = class extends Error {
	constructor() {
		super("Fetch body could not be serialized for cache key generation");
	}
};
/**
* Collect all headers from the request, excluding the blocklist.
* Merges headers from both the Request object and the init object,
* with init taking precedence (matching fetch() spec behavior).
*/
function collectHeaders(input, init) {
	const merged = {};
	if (input instanceof Request && input.headers) input.headers.forEach((v, k) => {
		merged[k] = v;
	});
	if (init?.headers) (init.headers instanceof Headers ? init.headers : new Headers(init.headers)).forEach((v, k) => {
		merged[k] = v;
	});
	for (const blocked of HEADER_BLOCKLIST) delete merged[blocked];
	return merged;
}
/**
* Check whether a fetch request carries any per-user auth headers.
* Used for the safety bypass (skip caching when auth headers are present
* without an explicit cache opt-in).
*/
var AUTH_HEADERS = [
	"authorization",
	"cookie",
	"x-api-key"
];
function hasAuthHeaders(input, init) {
	const headers = collectHeaders(input, init);
	return AUTH_HEADERS.some((name) => name in headers);
}
async function serializeFormData(formData, pushBodyChunk, getTotalBodyBytes) {
	for (const [key, val] of formData.entries()) {
		if (typeof val === "string") {
			pushBodyChunk(JSON.stringify([key, {
				kind: "string",
				value: val
			}]));
			continue;
		}
		if (val.size > MAX_CACHE_KEY_BODY_BYTES || getTotalBodyBytes() + val.size > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(JSON.stringify([key, {
			kind: "file",
			name: val.name,
			type: val.type,
			value: await val.text()
		}]));
	}
}
function getParsedFormContentType(contentType) {
	const mediaType = contentType?.split(";")[0]?.trim().toLowerCase();
	if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") return mediaType;
}
function stripMultipartBoundary(contentType) {
	const [type, ...params] = contentType.split(";");
	const keptParams = params.map((param) => param.trim()).filter(Boolean).filter((param) => !/^boundary\s*=/i.test(param));
	const normalizedType = type.trim().toLowerCase();
	return keptParams.length > 0 ? `${normalizedType}; ${keptParams.join("; ")}` : normalizedType;
}
async function readRequestBodyChunksWithinLimit(request) {
	const contentLengthHeader = request.headers.get("content-length");
	if (contentLengthHeader) {
		const contentLength = Number(contentLengthHeader);
		if (Number.isFinite(contentLength) && contentLength > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
	}
	const requestClone = request.clone();
	const contentType = requestClone.headers.get("content-type") ?? void 0;
	const reader = requestClone.body?.getReader();
	if (!reader) return {
		chunks: [],
		contentType
	};
	const chunks = [];
	let totalBodyBytes = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			totalBodyBytes += value.byteLength;
			if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
			chunks.push(value);
		}
	} catch (err) {
		reader.cancel().catch(() => {});
		throw err;
	}
	return {
		chunks,
		contentType
	};
}
/**
* Serialize request body into string chunks for cache key inclusion.
* Handles all body types: string, Uint8Array, ReadableStream, FormData, Blob,
* and Request object bodies.
* Returns the serialized body chunks and optionally stashes the original body
* on init as `_ogBody` so it can still be used after stream consumption.
*/
async function serializeBody(input, init) {
	if (!init?.body && !(input instanceof Request && input.body)) return { bodyChunks: [] };
	const bodyChunks = [];
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	let totalBodyBytes = 0;
	let canonicalizedContentType;
	const pushBodyChunk = (chunk) => {
		totalBodyBytes += encoder.encode(chunk).byteLength;
		if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		bodyChunks.push(chunk);
	};
	const getTotalBodyBytes = () => totalBodyBytes;
	if (init?.body instanceof Uint8Array) {
		if (init.body.byteLength > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(decoder.decode(init.body));
		init._ogBody = init.body;
	} else if (init?.body && typeof init.body.getReader === "function") {
		const [bodyForHashing, bodyForFetch] = init.body.tee();
		init._ogBody = bodyForFetch;
		const reader = bodyForHashing.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (typeof value === "string") pushBodyChunk(value);
				else {
					totalBodyBytes += value.byteLength;
					if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
					bodyChunks.push(decoder.decode(value, { stream: true }));
				}
			}
			const finalChunk = decoder.decode();
			if (finalChunk) pushBodyChunk(finalChunk);
		} catch (err) {
			await reader.cancel();
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
	} else if (init?.body instanceof URLSearchParams) {
		init._ogBody = init.body;
		pushBodyChunk(init.body.toString());
	} else if (init?.body && typeof init.body.keys === "function") {
		const formData = init.body;
		init._ogBody = init.body;
		await serializeFormData(formData, pushBodyChunk, getTotalBodyBytes);
	} else if (init?.body && typeof init.body.arrayBuffer === "function") {
		const blob = init.body;
		if (blob.size > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(await blob.text());
		const arrayBuffer = await blob.arrayBuffer();
		init._ogBody = new Blob([arrayBuffer], { type: blob.type });
	} else if (typeof init?.body === "string") {
		if (init.body.length > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(init.body);
		init._ogBody = init.body;
	} else if (input instanceof Request && input.body) {
		let chunks;
		let contentType;
		try {
			({chunks, contentType} = await readRequestBodyChunksWithinLimit(input));
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
		const formContentType = getParsedFormContentType(contentType);
		if (formContentType) try {
			await serializeFormData(await new Request(input.url, {
				method: input.method,
				headers: contentType ? { "content-type": contentType } : void 0,
				body: new Blob(chunks)
			}).formData(), pushBodyChunk, getTotalBodyBytes);
			canonicalizedContentType = formContentType === "multipart/form-data" && contentType ? stripMultipartBoundary(contentType) : void 0;
			return {
				bodyChunks,
				canonicalizedContentType
			};
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
		for (const chunk of chunks) pushBodyChunk(decoder.decode(chunk, { stream: true }));
		const finalChunk = decoder.decode();
		if (finalChunk) pushBodyChunk(finalChunk);
	}
	return {
		bodyChunks,
		canonicalizedContentType
	};
}
/**
* Generate a deterministic cache key from a fetch request.
*
* Matches Next.js behavior: the key is a SHA-256 hash of a JSON array
* containing URL, method, all headers (minus blocklist), all RequestInit
* options, and the serialized body.
*/
async function buildFetchCacheKey(input, init) {
	let url;
	let method = "GET";
	if (typeof input === "string") url = input;
	else if (input instanceof URL) url = input.toString();
	else {
		url = input.url;
		method = input.method || "GET";
	}
	if (init?.method) method = init.method;
	const headers = collectHeaders(input, init);
	const { bodyChunks, canonicalizedContentType } = await serializeBody(input, init);
	if (canonicalizedContentType) headers["content-type"] = canonicalizedContentType;
	const cacheString = JSON.stringify([
		CACHE_KEY_PREFIX,
		url,
		method,
		headers,
		init?.mode,
		init?.redirect,
		init?.credentials,
		init?.referrer,
		init?.referrerPolicy,
		init?.integrity,
		init?.cache,
		bodyChunks
	]);
	const buffer = new TextEncoder().encode(cacheString);
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	return Array.prototype.map.call(new Uint8Array(hashBuffer), (b) => b.toString(16).padStart(2, "0")).join("");
}
var _PENDING_KEY = Symbol.for("vinext.fetchCache.pendingRefetches");
var _gPending = globalThis;
var pendingRefetches = _gPending[_PENDING_KEY] ??= /* @__PURE__ */ new Map();
var DEDUP_TIMEOUT_MS = 6e4;
var _ORIG_FETCH_KEY = Symbol.for("vinext.fetchCache.originalFetch");
var _gFetch = globalThis;
var originalFetch = _gFetch[_ORIG_FETCH_KEY] ??= globalThis.fetch;
var _ALS_KEY$1 = Symbol.for("vinext.fetchCache.als");
var _FALLBACK_KEY$1 = Symbol.for("vinext.fetchCache.fallback");
var _g$1 = globalThis;
var _als$1 = _g$1[_ALS_KEY$1] ??= new AsyncLocalStorage$1();
var _fallbackState$1 = _g$1[_FALLBACK_KEY$1] ??= { currentRequestTags: [] };
function _getState$1() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _als$1.getStore() ?? _fallbackState$1;
}
/**
* Get tags collected during the current render pass.
* Useful for associating page-level cache entries with all the
* fetch tags used during rendering.
*/
function getCollectedFetchTags() {
	return [..._getState$1().currentRequestTags];
}
/**
* Create a patched fetch function with Next.js caching semantics.
*
* The patched fetch:
* 1. Checks `cache` and `next` options to determine caching behavior
* 2. On cache hit, returns the cached response without hitting the network
* 3. On cache miss, fetches from network, stores in cache, returns response
* 4. Respects `next.revalidate` for TTL-based revalidation
* 5. Respects `next.tags` for tag-based invalidation via revalidateTag()
*/
function createPatchedFetch() {
	return async function patchedFetch(input, init) {
		const nextOpts = init?.next;
		const cacheDirective = init?.cache;
		if (!nextOpts && !cacheDirective) return originalFetch(input, init);
		if (cacheDirective === "no-store" || cacheDirective === "no-cache" || nextOpts?.revalidate === false || nextOpts?.revalidate === 0) return originalFetch(input, stripNextFromInit(init));
		if (!(cacheDirective === "force-cache" || typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0) && hasAuthHeaders(input, init)) return originalFetch(input, stripNextFromInit(init));
		let revalidateSeconds;
		if (cacheDirective === "force-cache") revalidateSeconds = nextOpts?.revalidate && typeof nextOpts.revalidate === "number" ? nextOpts.revalidate : 31536e3;
		else if (typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0) revalidateSeconds = nextOpts.revalidate;
		else if (nextOpts?.tags && nextOpts.tags.length > 0) revalidateSeconds = 31536e3;
		else return originalFetch(input, stripNextFromInit(init));
		const tags = nextOpts?.tags ?? [];
		let cacheKey;
		try {
			cacheKey = await buildFetchCacheKey(input, init);
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError || err instanceof SkipCacheKeyGenerationError) return originalFetch(input, stripNextFromInit(init));
			throw err;
		}
		const handler = getCacheHandler();
		const reqTags = _getState$1().currentRequestTags;
		if (tags.length > 0) {
			for (const tag of tags) if (!reqTags.includes(tag)) reqTags.push(tag);
		}
		try {
			const cached = await handler.get(cacheKey, {
				kind: "FETCH",
				tags
			});
			if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState !== "stale") {
				const cachedData = cached.value.data;
				return new Response(cachedData.body, {
					status: cachedData.status ?? 200,
					headers: cachedData.headers
				});
			}
			if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState === "stale") {
				const staleData = cached.value.data;
				if (!pendingRefetches.has(cacheKey)) {
					const refetchPromise = originalFetch(input, stripNextFromInit(init)).then(async (freshResp) => {
						if (freshResp.status !== 200) return;
						const freshBody = await freshResp.text();
						const freshHeaders = {};
						freshResp.headers.forEach((v, k) => {
							if (k.toLowerCase() === "set-cookie") return;
							freshHeaders[k] = v;
						});
						const freshValue = {
							kind: "FETCH",
							data: {
								headers: freshHeaders,
								body: freshBody,
								url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
								status: freshResp.status
							},
							tags,
							revalidate: revalidateSeconds
						};
						await handler.set(cacheKey, freshValue, {
							fetchCache: true,
							tags,
							revalidate: revalidateSeconds
						});
					}).catch((err) => {
						const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
						console.error(`[vinext] fetch cache background revalidation failed for ${url} (key=${cacheKey.slice(0, 12)}...):`, err);
					}).finally(() => {
						if (pendingRefetches.get(cacheKey) === refetchPromise) pendingRefetches.delete(cacheKey);
						clearTimeout(timeoutId);
					});
					pendingRefetches.set(cacheKey, refetchPromise);
					const timeoutId = setTimeout(() => {
						if (pendingRefetches.get(cacheKey) === refetchPromise) pendingRefetches.delete(cacheKey);
					}, DEDUP_TIMEOUT_MS);
					getRequestExecutionContext()?.waitUntil(refetchPromise);
				}
				return new Response(staleData.body, {
					status: staleData.status ?? 200,
					headers: staleData.headers
				});
			}
		} catch (cacheErr) {
			console.error("[vinext] fetch cache read error:", cacheErr);
		}
		const response = await originalFetch(input, stripNextFromInit(init));
		if (response.status === 200) {
			const cloned = response.clone();
			const body = await cloned.text();
			const headers = {};
			cloned.headers.forEach((v, k) => {
				if (k.toLowerCase() === "set-cookie") return;
				headers[k] = v;
			});
			const cacheValue = {
				kind: "FETCH",
				data: {
					headers,
					body,
					url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
					status: cloned.status
				},
				tags,
				revalidate: revalidateSeconds
			};
			handler.set(cacheKey, cacheValue, {
				fetchCache: true,
				tags,
				revalidate: revalidateSeconds
			}).catch((err) => {
				console.error("[vinext] fetch cache write error:", err);
			});
		}
		return response;
	};
}
/**
* Strip the `next` property from RequestInit before passing to real fetch.
* The `next` property is not a standard fetch option and would cause warnings
* in some environments.
*/
function stripNextFromInit(init) {
	if (!init) return init;
	const { next: _next, _ogBody, ...rest } = init;
	if (_ogBody !== void 0) rest.body = _ogBody;
	return Object.keys(rest).length > 0 ? rest : void 0;
}
var _PATCH_KEY = Symbol.for("vinext.fetchCache.patchInstalled");
function _ensurePatchInstalled() {
	if (_g$1[_PATCH_KEY]) return;
	_g$1[_PATCH_KEY] = true;
	globalThis.fetch = createPatchedFetch();
}
/**
* Install the patched fetch without creating a standalone ALS scope.
*
* `runWithFetchCache()` is the standalone helper: it installs the patch and
* creates an isolated per-request tag store. The unified request context owns
* that isolation itself via `currentRequestTags`, so callers inside
* `runWithRequestContext()` only need the process-global fetch monkey-patch.
*/
function ensureFetchPatch() {
	_ensurePatchInstalled();
}
//#endregion
//#region node_modules/vinext/dist/routing/route-trie.js
function createNode() {
	return {
		staticChildren: /* @__PURE__ */ new Map(),
		dynamicChild: null,
		catchAllChild: null,
		optionalCatchAllChild: null,
		route: null
	};
}
/**
* Build a trie from pre-sorted routes.
*
* Routes must have a `patternParts` property (string[] of URL segments).
* Pattern segment conventions:
*   - `:name`  — dynamic segment
*   - `:name+` — catch-all (1+ segments)
*   - `:name*` — optional catch-all (0+ segments)
*   - anything else — static segment
*
* First route to claim a terminal position wins (routes are pre-sorted
* by precedence, so insertion order preserves correct priority).
*/
function buildRouteTrie(routes) {
	const root = createNode();
	for (const route of routes) {
		const parts = route.patternParts;
		if (parts.length === 0) {
			if (root.route === null) root.route = route;
			continue;
		}
		let node = root;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (part.endsWith("+") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.catchAllChild === null) node.catchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.endsWith("*") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.optionalCatchAllChild === null) node.optionalCatchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.startsWith(":")) {
				const paramName = part.slice(1);
				if (node.dynamicChild === null) node.dynamicChild = {
					paramName,
					node: createNode()
				};
				node = node.dynamicChild.node;
				if (i === parts.length - 1) {
					if (node.route === null) node.route = route;
				}
				continue;
			}
			let child = node.staticChildren.get(part);
			if (!child) {
				child = createNode();
				node.staticChildren.set(part, child);
			}
			node = child;
			if (i === parts.length - 1) {
				if (node.route === null) node.route = route;
			}
		}
	}
	return root;
}
/**
* Match a URL against the trie.
*
* @param root - Trie root built by `buildRouteTrie`
* @param urlParts - Pre-split URL segments (no empty strings)
* @returns Match result with route and extracted params, or null
*/
function trieMatch(root, urlParts) {
	return match(root, urlParts, 0);
}
function match(node, urlParts, index) {
	if (index === urlParts.length) {
		if (node.route !== null) return {
			route: node.route,
			params: Object.create(null)
		};
		if (node.optionalCatchAllChild !== null) {
			const params = Object.create(null);
			params[node.optionalCatchAllChild.paramName] = [];
			return {
				route: node.optionalCatchAllChild.route,
				params
			};
		}
		return null;
	}
	const segment = urlParts[index];
	const staticChild = node.staticChildren.get(segment);
	if (staticChild) {
		const result = match(staticChild, urlParts, index + 1);
		if (result !== null) return result;
	}
	if (node.dynamicChild !== null) {
		const result = match(node.dynamicChild.node, urlParts, index + 1);
		if (result !== null) {
			result.params[node.dynamicChild.paramName] = segment;
			return result;
		}
	}
	if (node.catchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = Object.create(null);
		params[node.catchAllChild.paramName] = remaining;
		return {
			route: node.catchAllChild.route,
			params
		};
	}
	if (node.optionalCatchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = Object.create(null);
		params[node.optionalCatchAllChild.paramName] = remaining;
		return {
			route: node.optionalCatchAllChild.route,
			params
		};
	}
	return null;
}
//#endregion
//#region node_modules/vinext/dist/shims/navigation-state.js
/**
* Server-only navigation state backed by AsyncLocalStorage.
*
* This module provides request-scoped isolation for navigation context
* and useServerInsertedHTML callbacks. Without ALS, concurrent requests
* on Cloudflare Workers would share module-level state and leak data
* (pathnames, params, CSS-in-JS styles) between requests.
*
* This module is server-only — it imports node:async_hooks and must NOT
* be bundled for the browser. The dual-environment navigation.ts shim
* uses a registration pattern so it works in both environments.
*/
var _ALS_KEY = Symbol.for("vinext.navigation.als");
var _FALLBACK_KEY = Symbol.for("vinext.navigation.fallback");
var _g = globalThis;
var _als = _g[_ALS_KEY] ??= new AsyncLocalStorage$1();
var _fallbackState = _g[_FALLBACK_KEY] ??= {
	serverContext: null,
	serverInsertedHTMLCallbacks: []
};
function _getState() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _als.getStore() ?? _fallbackState;
}
var _accessors = {
	getServerContext() {
		return _getState().serverContext;
	},
	setServerContext(ctx) {
		_getState().serverContext = ctx;
	},
	getInsertedHTMLCallbacks() {
		return _getState().serverInsertedHTMLCallbacks;
	},
	clearInsertedHTMLCallbacks() {
		_getState().serverInsertedHTMLCallbacks = [];
	}
};
_registerStateAccessors(_accessors);
globalThis[GLOBAL_ACCESSORS_KEY] = _accessors;
//#endregion
//#region node_modules/vinext/dist/server/instrumentation.js
/**
* Get the registered onRequestError handler (if any).
*
* Reads from globalThis so it works across Vite environment boundaries.
*/
function getOnRequestErrorHandler() {
	return globalThis.__VINEXT_onRequestErrorHandler__ ?? null;
}
/**
* Report a request error via the instrumentation handler.
*
* No-op if no onRequestError handler is registered.
*
* Reads the handler from globalThis so this function works correctly regardless
* of which environment it is called from.
*/
function reportRequestError(error, request, context) {
	const handler = getOnRequestErrorHandler();
	if (!handler) return Promise.resolve();
	const promise = (async () => {
		try {
			await handler(error, request, context);
		} catch (reportErr) {
			console.error("[vinext] onRequestError handler threw:", reportErr instanceof Error ? reportErr.message : String(reportErr));
		}
	})();
	getRequestExecutionContext()?.waitUntil(promise);
	return promise;
}
//#endregion
//#region node_modules/vinext/dist/shims/font-google-base.js
/**
* next/font/google shim
*
* Provides a compatible shim for Next.js Google Fonts.
*
* Two modes:
* 1. **Dev / CDN mode** (default): Loads fonts from Google Fonts CDN via <link> tags.
* 2. **Self-hosted mode** (production build): The vinext:google-fonts Vite plugin
*    fetches font CSS + .woff2 files at build time, caches them locally, and injects
*    @font-face CSS pointing at local assets. No requests to Google at runtime.
*
* Usage:
*   import { Inter } from 'next/font/google';
*   const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
*   // inter.className -> unique CSS class
*   // inter.style -> { fontFamily: "'Inter', sans-serif" }
*   // inter.variable -> CSS variable name like '--font-inter'
*/
/**
* Escape a string for safe interpolation inside a CSS single-quoted string.
*
* Prevents CSS injection by escaping characters that could break out of
* a `'...'` CSS string context: backslashes, single quotes, and newlines.
*/
function escapeCSSString(value) {
	return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\a ").replace(/\r/g, "\\d ");
}
/**
* Validate a CSS custom property name (e.g. `--font-inter`).
*
* Custom properties must start with `--` and only contain alphanumeric
* characters, hyphens, and underscores. Anything else could be used to
* break out of the CSS declaration and inject arbitrary rules.
*
* Returns the name if valid, undefined otherwise.
*/
function sanitizeCSSVarName(name) {
	if (/^--[a-zA-Z0-9_-]+$/.test(name)) return name;
}
/**
* Sanitize a CSS font-family fallback name.
*
* Generic family names (sans-serif, serif, monospace, etc.) are used as-is.
* Named families are wrapped in escaped quotes. This prevents injection via
* crafted fallback values like `); } body { color: red; } .x {`.
*/
function sanitizeFallback(name) {
	const generics = new Set([
		"serif",
		"sans-serif",
		"monospace",
		"cursive",
		"fantasy",
		"system-ui",
		"ui-serif",
		"ui-sans-serif",
		"ui-monospace",
		"ui-rounded",
		"emoji",
		"math",
		"fangsong"
	]);
	const trimmed = name.trim();
	if (generics.has(trimmed)) return trimmed;
	return `'${escapeCSSString(trimmed)}'`;
}
var classCounter = 0;
var injectedFonts = /* @__PURE__ */ new Set();
/**
* Convert a font family name to a CSS variable name.
* e.g., "Inter" -> "--font-inter", "Roboto Mono" -> "--font-roboto-mono"
*/
function toVarName(family) {
	return "--font-" + family.toLowerCase().replace(/\s+/g, "-");
}
/**
* Build a Google Fonts CSS URL.
*/
function buildGoogleFontsUrl(family, options) {
	const params = new URLSearchParams();
	let spec = family;
	const weights = options.weight ? Array.isArray(options.weight) ? options.weight : [options.weight] : [];
	const styles = options.style ? Array.isArray(options.style) ? options.style : [options.style] : [];
	if (weights.length > 0 || styles.length > 0) {
		const hasItalic = styles.includes("italic");
		if (weights.length > 0) if (hasItalic) {
			const pairs = [];
			for (const w of weights) {
				pairs.push(`0,${w}`);
				pairs.push(`1,${w}`);
			}
			spec += `:ital,wght@${pairs.join(";")}`;
		} else spec += `:wght@${weights.join(";")}`;
	} else spec += `:wght@100..900`;
	params.set("family", spec);
	params.set("display", options.display ?? "swap");
	return `https://fonts.googleapis.com/css2?${params.toString()}`;
}
/**
* Inject a <link> tag for the font (client-side only).
* On the server, we track font URLs for SSR head injection.
*/
function injectFontStylesheet(url) {
	if (injectedFonts.has(url)) return;
	injectedFonts.add(url);
	if (typeof document !== "undefined") {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = url;
		document.head.appendChild(link);
	}
}
/** Track which className CSS rules have been injected. */
var injectedClassRules = /* @__PURE__ */ new Set();
/**
* Inject a CSS rule that maps a className to a font-family.
*
* This is what makes `<div className={inter.className}>` apply the font.
* Next.js generates equivalent rules at build time.
*
* In Next.js, the .className class ONLY sets font-family — it does NOT
* set CSS variables. CSS variables are handled separately by the .variable class.
*/
function injectClassNameRule(className, fontFamily) {
	if (injectedClassRules.has(className)) return;
	injectedClassRules.add(className);
	const css = `.${className} { font-family: ${fontFamily}; }\n`;
	if (typeof document === "undefined") {
		ssrFontStyles$1.push(css);
		return;
	}
	const style = document.createElement("style");
	style.textContent = css;
	style.setAttribute("data-vinext-font-class", className);
	document.head.appendChild(style);
}
/** Track which variable class CSS rules have been injected. */
var injectedVariableRules = /* @__PURE__ */ new Set();
/** Track which :root CSS variable rules have been injected. */
var injectedRootVariables = /* @__PURE__ */ new Set();
/**
* Inject a CSS rule that sets a CSS variable on an element.
* This is what makes `<html className={inter.variable}>` set the CSS variable
* that can be referenced by other styles (e.g., Tailwind's font-sans).
*
* In Next.js, the .variable class ONLY sets the CSS variable — it does NOT
* set font-family. This is critical because apps commonly apply multiple
* .variable classes to <body> (e.g., geistSans.variable + geistMono.variable).
* If we also set font-family here, the last class wins due to CSS cascade,
* causing all text to use that font (e.g., everything becomes monospace).
*/
function injectVariableClassRule(variableClassName, cssVarName, fontFamily) {
	if (injectedVariableRules.has(variableClassName)) return;
	injectedVariableRules.add(variableClassName);
	let css = `.${variableClassName} { ${cssVarName}: ${fontFamily}; }\n`;
	if (!injectedRootVariables.has(cssVarName)) {
		injectedRootVariables.add(cssVarName);
		css += `:root { ${cssVarName}: ${fontFamily}; }\n`;
	}
	if (typeof document === "undefined") {
		ssrFontStyles$1.push(css);
		return;
	}
	const style = document.createElement("style");
	style.textContent = css;
	style.setAttribute("data-vinext-font-variable", variableClassName);
	document.head.appendChild(style);
}
var ssrFontStyles$1 = [];
/**
* Get collected SSR font class styles (used by the renderer).
* Note: We don't clear the arrays because fonts are loaded at module import
* time and need to persist across all requests in the Workers environment.
*/
function getSSRFontStyles$1() {
	return [...ssrFontStyles$1];
}
var ssrFontUrls = [];
/**
* Get collected SSR font URLs (used by the renderer).
* Note: We don't clear the arrays because fonts are loaded at module import
* time and need to persist across all requests in the Workers environment.
*/
function getSSRFontLinks() {
	return [...ssrFontUrls];
}
var ssrFontPreloads$1 = [];
var ssrFontPreloadHrefs = /* @__PURE__ */ new Set();
/**
* Get collected SSR font preload data (used by the renderer).
* Returns an array of { href, type } objects for emitting
* <link rel="preload" as="font" ...> tags.
*/
function getSSRFontPreloads$1() {
	return [...ssrFontPreloads$1];
}
/**
* Determine the MIME type for a font file based on its extension.
*/
function getFontMimeType(pathOrUrl) {
	if (pathOrUrl.endsWith(".woff2")) return "font/woff2";
	if (pathOrUrl.endsWith(".woff")) return "font/woff";
	if (pathOrUrl.endsWith(".ttf")) return "font/ttf";
	if (pathOrUrl.endsWith(".otf")) return "font/opentype";
	return "font/woff2";
}
/**
* Extract font file URLs from @font-face CSS rules.
* Parses url('...') references from the CSS text.
*/
function extractFontUrlsFromCSS(css) {
	const urls = [];
	const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
	let match;
	while ((match = urlRegex.exec(css)) !== null) {
		const url = match[1];
		if (url && url.startsWith("/")) urls.push(url);
	}
	return urls;
}
/**
* Collect font file URLs from self-hosted CSS for preload link generation.
* Only collects on the server (SSR). Deduplicates by href using a Set for O(1) lookups.
*/
function collectFontPreloadsFromCSS(css) {
	if (typeof document !== "undefined") return;
	const urls = extractFontUrlsFromCSS(css);
	for (const href of urls) if (!ssrFontPreloadHrefs.has(href)) {
		ssrFontPreloadHrefs.add(href);
		ssrFontPreloads$1.push({
			href,
			type: getFontMimeType(href)
		});
	}
}
/** Track injected self-hosted @font-face blocks (deduplicate) */
var injectedSelfHosted = /* @__PURE__ */ new Set();
/**
* Inject self-hosted @font-face CSS (from the build plugin).
* This replaces the CDN <link> tag with inline CSS.
*/
function injectSelfHostedCSS(css) {
	if (injectedSelfHosted.has(css)) return;
	injectedSelfHosted.add(css);
	collectFontPreloadsFromCSS(css);
	if (typeof document === "undefined") {
		ssrFontStyles$1.push(css);
		return;
	}
	const style = document.createElement("style");
	style.textContent = css;
	style.setAttribute("data-vinext-font-selfhosted", "true");
	document.head.appendChild(style);
}
function createFontLoader(family) {
	return function fontLoader(options = {}) {
		const id = classCounter++;
		const className = `__font_${family.toLowerCase().replace(/\s+/g, "_")}_${id}`;
		const fallback = options.fallback ?? ["sans-serif"];
		const fontFamily = `'${escapeCSSString(family)}', ${fallback.map(sanitizeFallback).join(", ")}`;
		const defaultVarName = toVarName(family);
		const cssVarName = options.variable ? sanitizeCSSVarName(options.variable) ?? defaultVarName : defaultVarName;
		const variableClassName = `__variable_${family.toLowerCase().replace(/\s+/g, "_")}_${id}`;
		if (options._selfHostedCSS) injectSelfHostedCSS(options._selfHostedCSS);
		else {
			const url = buildGoogleFontsUrl(family, options);
			injectFontStylesheet(url);
			if (typeof document === "undefined") {
				if (!ssrFontUrls.includes(url)) ssrFontUrls.push(url);
			}
		}
		injectClassNameRule(className, fontFamily);
		injectVariableClassRule(variableClassName, cssVarName, fontFamily);
		return {
			className,
			style: { fontFamily },
			variable: variableClassName
		};
	};
}
var googleFonts = new Proxy({}, { get(_target, prop) {
	if (prop === "__esModule") return true;
	if (prop === "default") return googleFonts;
	return createFontLoader(prop.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"));
} });
//#endregion
//#region node_modules/vinext/dist/shims/font-local.js
var ssrFontStyles = [];
var ssrFontPreloads = [];
/**
* Get collected SSR font styles (used by the renderer).
* Note: We don't clear the arrays because fonts are loaded at module import
* time and need to persist across all requests in the Workers environment.
*/
function getSSRFontStyles() {
	return [...ssrFontStyles];
}
/**
* Get collected SSR font preload data (used by the renderer).
* Returns an array of { href, type } objects for emitting
* <link rel="preload" as="font" ...> tags.
*/
function getSSRFontPreloads() {
	return [...ssrFontPreloads];
}
//#endregion
//#region lib/db/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	activity_log: () => activity_log,
	availability_windows: () => availability_windows,
	events: () => events,
	eventsRelations: () => eventsRelations,
	final_selections: () => final_selections,
	inviteTokensRelations: () => inviteTokensRelations,
	invite_tokens: () => invite_tokens,
	normalized_slots: () => normalized_slots,
	organizer_overrides: () => organizer_overrides,
	participant_preferences: () => participant_preferences,
	participants: () => participants,
	participantsRelations: () => participantsRelations,
	recommendation_snapshots: () => recommendation_snapshots
});
var events = sqliteTable("events", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	event_type: text("event_type").notNull().default("meetup"),
	timezone: text("timezone").notNull().default("UTC"),
	date_range_start: integer("date_range_start").notNull(),
	date_range_end: integer("date_range_end").notNull(),
	allowed_hours_start: integer("allowed_hours_start").notNull().default(9),
	allowed_hours_end: integer("allowed_hours_end").notNull().default(22),
	meeting_duration_minutes: integer("meeting_duration_minutes").notNull().default(120),
	slot_granularity_minutes: integer("slot_granularity_minutes").notNull().default(30),
	min_attendance_threshold: integer("min_attendance_threshold").notNull().default(0),
	participants_required_by_default: integer("participants_required_by_default").notNull().default(0),
	allow_participant_edit: integer("allow_participant_edit").notNull().default(1),
	show_results_to_participants: integer("show_results_to_participants").notNull().default(0),
	preferences_required: integer("preferences_required").notNull().default(0),
	enabled_preferences: text("enabled_preferences").notNull().default("[]"),
	scoring_mode: text("scoring_mode").notNull().default("maximize_attendance"),
	organizer_participant_id: text("organizer_participant_id"),
	status: text("status").notNull().default("active"),
	response_deadline: integer("response_deadline"),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
	updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`)
}, (t) => [index("idx_events_status").on(t.status)]);
var participants = sqliteTable("participants", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	email: text("email"),
	phone: text("phone"),
	role: text("role").notNull().default("participant"),
	is_required: integer("is_required").notNull().default(0),
	priority_tier: integer("priority_tier").notNull().default(0),
	response_status: text("response_status").notNull().default("pending"),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
	updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`)
}, (t) => [
	index("idx_participants_event_id").on(t.event_id),
	index("idx_participants_role").on(t.role),
	index("idx_participants_response_status").on(t.response_status)
]);
var invite_tokens = sqliteTable("invite_tokens", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	participant_id: text("participant_id").notNull().references(() => participants.id, { onDelete: "cascade" }),
	token: text("token").notNull(),
	role: text("role").notNull(),
	is_active: integer("is_active").notNull().default(1),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
	expires_at: integer("expires_at")
}, (t) => [
	uniqueIndex("idx_invite_tokens_token").on(t.token),
	index("idx_invite_tokens_event_id").on(t.event_id),
	index("idx_invite_tokens_participant_id").on(t.participant_id),
	index("idx_invite_tokens_role").on(t.role)
]);
var availability_windows = sqliteTable("availability_windows", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	participant_id: text("participant_id").notNull().references(() => participants.id, { onDelete: "cascade" }),
	start_time: integer("start_time").notNull(),
	end_time: integer("end_time").notNull(),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`)
}, (t) => [
	index("idx_availability_event_id").on(t.event_id),
	index("idx_availability_participant_id").on(t.participant_id),
	index("idx_availability_start_time").on(t.start_time)
]);
var participant_preferences = sqliteTable("participant_preferences", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	participant_id: text("participant_id").notNull().references(() => participants.id, { onDelete: "cascade" }),
	preferred_area: text("preferred_area"),
	max_travel_distance: integer("max_travel_distance"),
	food_preference: text("food_preference").default("no_preference"),
	food_note: text("food_note"),
	budget_preference: text("budget_preference").default("no_preference"),
	preferred_day_type: text("preferred_day_type").default("no_preference"),
	preferred_time_of_day: text("preferred_time_of_day").default("no_preference"),
	indoor_outdoor: text("indoor_outdoor").default("no_preference"),
	notes: text("notes"),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
	updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`)
}, (t) => [
	index("idx_prefs_event_id").on(t.event_id),
	index("idx_prefs_participant_id").on(t.participant_id),
	uniqueIndex("idx_prefs_event_participant").on(t.event_id, t.participant_id)
]);
var organizer_overrides = sqliteTable("organizer_overrides", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	organizer_participant_id: text("organizer_participant_id").notNull(),
	override_type: text("override_type").notNull(),
	data: text("data").notNull(),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`)
}, (t) => [index("idx_overrides_event_id").on(t.event_id)]);
var normalized_slots = sqliteTable("normalized_slots", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	participant_id: text("participant_id").notNull().references(() => participants.id, { onDelete: "cascade" }),
	slot_start: integer("slot_start").notNull(),
	slot_end: integer("slot_end").notNull(),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`)
}, (t) => [
	index("idx_slots_event_id").on(t.event_id),
	index("idx_slots_participant_id").on(t.participant_id),
	index("idx_slots_slot_start").on(t.slot_start)
]);
var recommendation_snapshots = sqliteTable("recommendation_snapshots", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	computed_at: integer("computed_at").notNull().default(sql`(unixepoch())`),
	recommendations: text("recommendations").notNull(),
	total_responded: integer("total_responded").notNull().default(0)
}, (t) => [index("idx_rec_snapshots_event_id").on(t.event_id)]);
var final_selections = sqliteTable("final_selections", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	slot_start: integer("slot_start").notNull(),
	slot_end: integer("slot_end").notNull(),
	notes: text("notes"),
	selected_by: text("selected_by").notNull(),
	finalized_at: integer("finalized_at").notNull().default(sql`(unixepoch())`)
}, (t) => [uniqueIndex("idx_final_event_id").on(t.event_id)]);
var activity_log = sqliteTable("activity_log", {
	id: text("id").primaryKey(),
	event_id: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
	actor_id: text("actor_id"),
	action: text("action").notNull(),
	data: text("data"),
	created_at: integer("created_at").notNull().default(sql`(unixepoch())`)
}, (t) => [index("idx_activity_event_id").on(t.event_id), index("idx_activity_created_at").on(t.created_at)]);
var eventsRelations = relations(events, ({ many }) => ({
	participants: many(participants),
	invite_tokens: many(invite_tokens),
	availability_windows: many(availability_windows),
	participant_preferences: many(participant_preferences),
	organizer_overrides: many(organizer_overrides),
	normalized_slots: many(normalized_slots),
	recommendation_snapshots: many(recommendation_snapshots),
	final_selections: many(final_selections),
	activity_log: many(activity_log)
}));
var participantsRelations = relations(participants, ({ one, many }) => ({
	event: one(events, {
		fields: [participants.event_id],
		references: [events.id]
	}),
	invite_tokens: many(invite_tokens),
	availability_windows: many(availability_windows),
	preferences: many(participant_preferences)
}));
var inviteTokensRelations = relations(invite_tokens, ({ one }) => ({
	event: one(events, {
		fields: [invite_tokens.event_id],
		references: [events.id]
	}),
	participant: one(participants, {
		fields: [invite_tokens.participant_id],
		references: [participants.id]
	})
}));
//#endregion
//#region lib/db/index.ts
function getDB(d1) {
	return drizzle(d1, { schema: schema_exports });
}
//#endregion
//#region lib/tokens.ts
var ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function generateId(size = 10) {
	const bytes = crypto.getRandomValues(new Uint8Array(size));
	return Array.from(bytes, (b) => ALPHABET[b % 62]).join("");
}
function generateSecureToken(size = 32) {
	const bytes = crypto.getRandomValues(new Uint8Array(size));
	return Array.from(bytes, (b) => ALPHABET[b % 62]).join("");
}
function isTokenExpired(expiresAt) {
	if (!expiresAt) return false;
	return Date.now() / 1e3 > expiresAt;
}
//#endregion
//#region lib/utils.ts
function unixNow() {
	return Math.floor(Date.now() / 1e3);
}
function formatDate(unix, timezone) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: timezone
	}).format(/* @__PURE__ */ new Date(unix * 1e3));
}
function formatDuration(minutes) {
	if (minutes < 60) return `${minutes}m`;
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function getTimeCategory(hourInTimezone) {
	if (hourInTimezone >= 5 && hourInTimezone < 12) return "morning";
	if (hourInTimezone >= 12 && hourInTimezone < 17) return "afternoon";
	if (hourInTimezone >= 17 && hourInTimezone < 21) return "evening";
	return "late_night";
}
function getHourInTimezone(unixTs, timezone) {
	const date = /* @__PURE__ */ new Date(unixTs * 1e3);
	const formatter = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hour12: false,
		timeZone: timezone
	});
	return parseInt(formatter.format(date), 10);
}
function getDayOfWeekInTimezone(unixTs, timezone) {
	const date = /* @__PURE__ */ new Date(unixTs * 1e3);
	const day = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		timeZone: timezone
	}).format(date);
	return [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	].indexOf(day);
}
//#endregion
//#region lib/auth.ts
async function findActiveInviteToken(db, token, options = {}) {
	if (!token) return null;
	const clauses = [eq(invite_tokens.token, token), eq(invite_tokens.is_active, 1)];
	if (options.eventId) clauses.push(eq(invite_tokens.event_id, options.eventId));
	if (options.role) clauses.push(eq(invite_tokens.role, options.role));
	const tokenRecord = await db.query.invite_tokens.findFirst({ where: and(...clauses) });
	if (!tokenRecord || isTokenExpired(tokenRecord.expires_at)) return null;
	return tokenRecord;
}
async function findOrganizerInviteToken(db, eventId, token) {
	return findActiveInviteToken(db, token, {
		eventId,
		role: "organizer"
	});
}
async function findParticipantInviteToken(db, eventId, token) {
	return findActiveInviteToken(db, token, {
		eventId,
		role: "participant"
	});
}
//#endregion
//#region app/api/events/[eventId]/participants/[participantId]/token/route.ts
var route_exports$10 = /* @__PURE__ */ __exportAll({ POST: () => POST$6 });
async function POST$6(request, { params }) {
	try {
		const { eventId, participantId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		await db.update(invite_tokens).set({ is_active: 0 }).where(and(eq(invite_tokens.participant_id, participantId), eq(invite_tokens.event_id, eventId), eq(invite_tokens.role, "participant")));
		const newToken = generateSecureToken();
		const now = unixNow();
		await db.insert(invite_tokens).values({
			id: generateId(),
			event_id: eventId,
			participant_id: participantId,
			token: newToken,
			role: "participant",
			is_active: 1,
			created_at: now
		});
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "invite_token_regenerated",
			data: JSON.stringify({ participant_id: participantId }),
			created_at: now
		});
		return NextResponse.json({
			invite_token: newToken,
			invite_url: `/r/${newToken}`
		});
	} catch (err) {
		console.error("Regenerate token error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
var Resources = ((React, deps, RemoveDuplicateServerCss, precedence) => {
	return function Resources() {
		return React.createElement(React.Fragment, null, [...deps.css.map((href) => React.createElement("link", {
			key: "css:" + href,
			rel: "stylesheet",
			...precedence ? { precedence } : {},
			href,
			"data-rsc-css-href": href
		})), RemoveDuplicateServerCss && React.createElement(RemoveDuplicateServerCss, { key: "remove-duplicate-css" })]);
	};
})(import_react_react_server.default, assetsManifest.serverResources["app/layout.tsx"], void 0, "vite-rsc/importer-resources");
//#endregion
//#region app/layout.tsx
var layout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$wrap_RootLayout,
	metadata: () => metadata
});
var metadata = {
	title: "Togoo | Pick a meetup time without the back-and-forth",
	description: "Send one link, collect everyone's availability and preferences, and choose the best meetup time faster.",
	openGraph: {
		siteName: "Togoo",
		type: "website"
	}
};
function RootLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "preconnect",
			href: "https://fonts.googleapis.com"
		}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "anonymous"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("body", {
			className: "bg-bg font-sans text-text antialiased",
			children
		})]
	});
}
var $$wrap_RootLayout = /* @__PURE__ */ __vite_rsc_wrap_css__(RootLayout, "default");
function __vite_rsc_wrap_css__(value, name) {
	if (typeof value !== "function") return value;
	function __wrapper(props) {
		return import_react_react_server.createElement(import_react_react_server.Fragment, null, import_react_react_server.createElement(Resources), import_react_react_server.createElement(value, props));
	}
	Object.defineProperty(__wrapper, "name", { value: name });
	return __wrapper;
}
//#endregion
//#region node_modules/vinext/dist/shims/link.js
/**
* next/link shim
*
* Renders an <a> tag with client-side navigation support.
* On click, prevents full page reload and triggers client-side
* page swap via the router's navigation system.
*/
/**
* useLinkStatus returns the pending state of the enclosing <Link>.
* In Next.js, this is used to show loading indicators while a
* prefetch-triggered navigation is in progress.
*/
/** basePath from next.config.js, injected by the plugin at build time */
/**
* Prefetch a URL for faster navigation.
*
* For App Router (RSC): fetches the .rsc payload in the background and
* stores it in an in-memory cache for instant use during navigation.
* For Pages Router: injects a <link rel="prefetch"> for the page module.
*
* Uses `requestIdleCallback` (or `setTimeout` fallback) to avoid blocking
* the main thread during initial page load.
*/
/**
* Shared IntersectionObserver for viewport-based prefetching.
* All Link elements use the same observer to minimize resource usage.
*/
/**
* Apply locale prefix to a URL path based on the locale prop.
* - locale="fr" → prepend /fr (unless it already has a locale prefix)
* - locale={false} → use the href as-is (no locale prefix, link to default)
* - locale=undefined → use current locale (href as-is in most cases)
*/
var link_default = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'default' is called on server");
}, "c2747888630f", "default");
//#endregion
//#region app/not-found.tsx
var not_found_exports = /* @__PURE__ */ __exportAll({ default: () => NotFound });
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
					className: "font-display text-8xl font-bold text-border mb-4",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h1", {
					className: "font-display text-2xl font-semibold text-text mb-2",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
					className: "text-muted mb-6",
					children: "That page does not exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
					href: "/",
					className: "btn-primary",
					children: "Back home"
				})
			]
		})
	});
}
//#endregion
//#region lib/validation.ts
var CreateEventSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().max(1e3).optional(),
	event_type: z.enum([
		"dinner",
		"meetup",
		"hangout",
		"work_session",
		"custom"
	]).default("meetup"),
	timezone: z.string().min(1),
	date_range_start: z.number().int().positive(),
	date_range_end: z.number().int().positive(),
	allowed_hours_start: z.number().int().min(0).max(23).default(9),
	allowed_hours_end: z.number().int().min(1).max(24).default(22),
	meeting_duration_minutes: z.number().int().min(15).max(480).default(120),
	slot_granularity_minutes: z.union([z.literal(15), z.literal(30)]).default(30),
	min_attendance_threshold: z.number().int().min(0).default(0),
	participants_required_by_default: z.boolean().default(false),
	allow_participant_edit: z.boolean().default(true),
	show_results_to_participants: z.boolean().default(false),
	preferences_required: z.boolean().default(false),
	enabled_preferences: z.array(z.string()).default([
		"food",
		"budget",
		"location",
		"day_type",
		"time_of_day",
		"indoor_outdoor"
	]),
	scoring_mode: z.enum([
		"maximize_attendance",
		"prioritize_required",
		"vip_priority",
		"time_optimized"
	]).default("maximize_attendance"),
	response_deadline: z.number().int().positive().optional(),
	organizer_name: z.string().min(1).max(100),
	organizer_email: z.string().email().optional()
});
var AddParticipantSchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().max(20).optional().or(z.literal("")),
	is_required: z.boolean().default(false),
	priority_tier: z.union([
		z.literal(0),
		z.literal(1),
		z.literal(2)
	]).default(0),
	token_expires_hours: z.number().int().positive().optional()
});
var UpdateParticipantSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().max(20).optional().or(z.literal("")),
	is_required: z.boolean().optional(),
	priority_tier: z.union([
		z.literal(0),
		z.literal(1),
		z.literal(2)
	]).optional()
});
var SubmitResponseSchema = z.object({
	token: z.string().min(24).max(64),
	availability_windows: z.array(z.object({
		start_time: z.number().int().positive(),
		end_time: z.number().int().positive()
	})).min(1).max(20),
	preferences: z.object({
		preferred_area: z.string().max(200).optional(),
		max_travel_distance: z.number().int().min(0).max(200).optional(),
		food_preference: z.enum([
			"veg",
			"non_veg",
			"vegan",
			"jain",
			"halal",
			"eggetarian",
			"no_preference",
			"custom"
		]).default("no_preference"),
		food_note: z.string().max(300).optional(),
		budget_preference: z.enum([
			"low",
			"medium",
			"high",
			"no_preference"
		]).default("no_preference"),
		preferred_day_type: z.enum([
			"weekday",
			"weekend",
			"no_preference"
		]).default("no_preference"),
		preferred_time_of_day: z.enum([
			"morning",
			"afternoon",
			"evening",
			"late_night",
			"no_preference"
		]).default("no_preference"),
		indoor_outdoor: z.enum([
			"indoor",
			"outdoor",
			"no_preference"
		]).default("no_preference"),
		notes: z.string().max(500).optional()
	}).optional()
});
var OrganizerOverrideSchema = z.object({
	override_type: z.enum([
		"block_time",
		"force_include",
		"force_exclude"
	]),
	data: z.record(z.unknown())
});
var FinalizeEventSchema = z.object({
	slot_start: z.number().int().positive(),
	slot_end: z.number().int().positive(),
	notes: z.string().max(500).optional()
});
//#endregion
//#region app/api/events/[eventId]/finalize/route.ts
var route_exports$9 = /* @__PURE__ */ __exportAll({ POST: () => POST$5 });
async function POST$5(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const body = await request.json();
		const parsed = FinalizeEventSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const now = unixNow();
		await db.insert(final_selections).values({
			id: generateId(),
			event_id: eventId,
			slot_start: parsed.data.slot_start,
			slot_end: parsed.data.slot_end,
			notes: parsed.data.notes ?? null,
			selected_by: tokenRecord.participant_id,
			finalized_at: now
		}).onConflictDoUpdate({
			target: final_selections.event_id,
			set: {
				slot_start: parsed.data.slot_start,
				slot_end: parsed.data.slot_end,
				notes: parsed.data.notes ?? null,
				selected_by: tokenRecord.participant_id,
				finalized_at: now
			}
		});
		await db.update(events).set({
			status: "finalized",
			updated_at: now
		}).where(eq(events.id, eventId));
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "event_finalized",
			data: JSON.stringify({
				slot_start: parsed.data.slot_start,
				slot_end: parsed.data.slot_end
			}),
			created_at: now
		});
		return NextResponse.json({
			success: true,
			final_url: `/e/${eventId}/final`
		});
	} catch (err) {
		console.error("Finalize event error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/api/events/[eventId]/overrides/route.ts
var route_exports$8 = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE$1,
	GET: () => GET$4,
	POST: () => POST$4
});
async function GET$4(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		if (!await findOrganizerInviteToken(db, eventId, token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const overrides = await db.select().from(organizer_overrides).where(eq(organizer_overrides.event_id, eventId));
		return NextResponse.json({ overrides });
	} catch (err) {
		console.error("Get overrides error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
async function POST$4(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const body = await request.json();
		const parsed = OrganizerOverrideSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const now = unixNow();
		const overrideId = generateId();
		await db.insert(organizer_overrides).values({
			id: overrideId,
			event_id: eventId,
			organizer_participant_id: tokenRecord.participant_id,
			override_type: parsed.data.override_type,
			data: JSON.stringify(parsed.data.data),
			created_at: now
		});
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "override_added",
			data: JSON.stringify({
				override_id: overrideId,
				type: parsed.data.override_type
			}),
			created_at: now
		});
		return NextResponse.json({
			success: true,
			override_id: overrideId
		});
	} catch (err) {
		console.error("Add override error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
async function DELETE$1(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const { override_id } = await request.json();
		if (!override_id) return NextResponse.json({ error: "override_id is required" }, { status: 400 });
		const db = getDB(env.DB);
		if (!await findOrganizerInviteToken(db, eventId, token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		await db.delete(organizer_overrides).where(and(eq(organizer_overrides.id, override_id), eq(organizer_overrides.event_id, eventId)));
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Delete override error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/api/events/[eventId]/participants/route.ts
var route_exports$7 = /* @__PURE__ */ __exportAll({
	GET: () => GET$3,
	POST: () => POST$3
});
async function GET$3(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		if (!await findOrganizerInviteToken(db, eventId, token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const participants$4 = await db.select().from(participants).where(eq(participants.event_id, eventId));
		const tokensForEvent = await db.select().from(invite_tokens).where(and(eq(invite_tokens.event_id, eventId), eq(invite_tokens.is_active, 1)));
		const participantsWithTokens = participants$4.map((p) => {
			const t = tokensForEvent.find((t) => t.participant_id === p.id && t.role === "participant");
			return {
				...p,
				invite_token: t?.token ?? null,
				token_expires_at: t?.expires_at ?? null
			};
		});
		return NextResponse.json({ participants: participantsWithTokens });
	} catch (err) {
		console.error("List participants error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
async function POST$3(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const body = await request.json();
		const parsed = AddParticipantSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const { name, email, phone, is_required, priority_tier, token_expires_hours } = parsed.data;
		const now = unixNow();
		const participantId = generateId();
		const inviteToken = generateSecureToken();
		const expiresAt = token_expires_hours ? now + token_expires_hours * 3600 : null;
		await db.insert(participants).values({
			id: participantId,
			event_id: eventId,
			name,
			email: email || null,
			phone: phone || null,
			role: "participant",
			is_required: is_required ? 1 : 0,
			priority_tier,
			response_status: "pending",
			created_at: now,
			updated_at: now
		});
		await db.insert(invite_tokens).values({
			id: generateId(),
			event_id: eventId,
			participant_id: participantId,
			token: inviteToken,
			role: "participant",
			is_active: 1,
			created_at: now,
			expires_at: expiresAt
		});
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "participant_added",
			data: JSON.stringify({
				participant_id: participantId,
				name
			}),
			created_at: now
		});
		return NextResponse.json({
			participant: {
				id: participantId,
				name,
				email: email || null,
				phone: phone || null,
				is_required,
				priority_tier
			},
			invite_token: inviteToken,
			invite_url: `/r/${inviteToken}`
		});
	} catch (err) {
		console.error("Add participant error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region lib/scheduling.ts
function normalizeAvailabilityWindows(windows, settings) {
	const { slot_granularity_minutes, allowed_hours_start, allowed_hours_end, timezone } = settings;
	const granularitySec = slot_granularity_minutes * 60;
	const slots = [];
	for (const win of windows) {
		let current = Math.ceil(win.start_time / granularitySec) * granularitySec;
		while (current + granularitySec <= win.end_time) {
			const hour = getHourInTimezone(current, timezone);
			if (hour >= allowed_hours_start && hour + slot_granularity_minutes / 60 <= allowed_hours_end) slots.push({
				participant_id: win.participant_id,
				slot_start: current,
				slot_end: current + granularitySec
			});
			current += granularitySec;
		}
	}
	return slots;
}
function applyOverrides(candidates, overrides) {
	const blocked = [];
	const forceExclude = [];
	const forceInclude = /* @__PURE__ */ new Set();
	for (const override of overrides) {
		const data = JSON.parse(override.data);
		if (override.override_type === "block_time") blocked.push({
			start: data.start_time,
			end: data.end_time
		});
		else if (override.override_type === "force_include") forceInclude.add(data.slot_start);
		else if (override.override_type === "force_exclude") forceExclude.push(data.slot_start);
	}
	return candidates.filter((c) => {
		if (forceInclude.has(c.start)) return true;
		if (forceExclude.includes(c.start)) return false;
		for (const block of blocked) if (c.start < block.end && c.end > block.start) return false;
		return true;
	});
}
function buildExplanation(m) {
	const attendancePct = Math.round(m.attendingCount / m.totalParticipants * 100);
	const parts = [];
	parts.push(`Works for ${m.attendingCount} of ${m.totalParticipants} people (${attendancePct}%)`);
	if (m.totalRequired > 0) if (m.requiredAttending === m.totalRequired) parts.push("includes all required attendees");
	else parts.push(`${m.requiredAttending}/${m.totalRequired} required attendees`);
	const timeLabel = m.timeCategory.replace("_", " ");
	parts.push(`${m.isWeekend ? "weekend" : "weekday"} ${timeLabel}`);
	return parts.join(", ") + ".";
}
function tierWeight(tier) {
	if (tier === 2) return 4;
	if (tier === 1) return 2;
	return 1;
}
function computeRecommendations(participants, slots, preferences, settings, overrides) {
	const { meeting_duration_minutes, slot_granularity_minutes, timezone, scoring_mode, min_attendance_threshold = 0 } = settings;
	const slotsPerMeeting = Math.ceil(meeting_duration_minutes / slot_granularity_minutes);
	const granularitySec = slot_granularity_minutes * 60;
	const attendanceBySlot = /* @__PURE__ */ new Map();
	for (const slot of slots) {
		if (!attendanceBySlot.has(slot.slot_start)) attendanceBySlot.set(slot.slot_start, /* @__PURE__ */ new Set());
		attendanceBySlot.get(slot.slot_start).add(slot.participant_id);
	}
	const allSlotStarts = [...attendanceBySlot.keys()].sort((a, b) => a - b);
	const prefMap = new Map(preferences.map((p) => [p.participant_id, p]));
	const respondedParticipants = participants.filter((p) => p.response_status === "responded");
	const totalTierWeight = respondedParticipants.reduce((sum, p) => sum + tierWeight(p.priority_tier), 0);
	const candidates = [];
	for (let i = 0; i < allSlotStarts.length; i++) {
		const windowStart = allSlotStarts[i];
		let valid = true;
		const attending = new Set(attendanceBySlot.get(windowStart) ?? []);
		for (let j = 1; j < slotsPerMeeting; j++) {
			const expectedSlot = windowStart + j * granularitySec;
			if (!attendanceBySlot.has(expectedSlot)) {
				valid = false;
				break;
			}
			const slotAttendees = attendanceBySlot.get(expectedSlot) ?? /* @__PURE__ */ new Set();
			for (const pid of [...attending]) if (!slotAttendees.has(pid)) attending.delete(pid);
		}
		if (!valid || attending.size === 0) continue;
		const windowEnd = windowStart + meeting_duration_minutes * 60;
		const attendingIds = [...attending];
		const requiredParticipants = respondedParticipants.filter((p) => p.is_required === 1);
		const requiredAttending = requiredParticipants.filter((p) => attendingIds.includes(p.id)).length;
		const totalRequired = requiredParticipants.length;
		const attendanceScore = respondedParticipants.length > 0 ? attendingIds.length / respondedParticipants.length : 0;
		const requiredScore = totalRequired > 0 ? requiredAttending / totalRequired : 1;
		const attendingWeight = attendingIds.reduce((sum, pid) => {
			return sum + tierWeight(respondedParticipants.find((rp) => rp.id === pid)?.priority_tier);
		}, 0);
		const weightedAttendanceScore = totalTierWeight > 0 ? attendingWeight / totalTierWeight : attendanceScore;
		const timeCategory = getTimeCategory(getHourInTimezone(windowStart, timezone));
		const dayOfWeek = getDayOfWeekInTimezone(windowStart, timezone);
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
		let timePrefTotal = 0;
		let dayTypePrefTotal = 0;
		for (const pid of attendingIds) {
			const pref = prefMap.get(pid);
			const timePref = pref?.preferred_time_of_day ?? "no_preference";
			const dayPref = pref?.preferred_day_type ?? "no_preference";
			timePrefTotal += timePref === "no_preference" || timePref === timeCategory ? 1 : .25;
			dayTypePrefTotal += dayPref === "no_preference" ? 1 : dayPref === "weekend" === isWeekend ? 1 : .25;
		}
		const timePrefScore = attendingIds.length > 0 ? timePrefTotal / attendingIds.length : 1;
		const dayTypePrefScore = attendingIds.length > 0 ? dayTypePrefTotal / attendingIds.length : 1;
		let compositeScore;
		switch (scoring_mode) {
			case "prioritize_required":
				compositeScore = .2 * attendanceScore + .55 * requiredScore + .15 * timePrefScore + .1 * dayTypePrefScore;
				break;
			case "vip_priority":
				compositeScore = .15 * attendanceScore + .15 * requiredScore + .6 * weightedAttendanceScore + .1 * timePrefScore;
				break;
			case "time_optimized":
				compositeScore = .3 * attendanceScore + .15 * requiredScore + .4 * timePrefScore + .15 * dayTypePrefScore;
				break;
			default: compositeScore = .5 * attendanceScore + .3 * requiredScore + .12 * timePrefScore + .08 * dayTypePrefScore;
		}
		candidates.push({
			start: windowStart,
			end: windowEnd,
			attendingIds,
			attendingCount: attendingIds.length,
			requiredAttending,
			totalParticipants: respondedParticipants.length,
			totalRequired,
			attendanceScore,
			requiredScore,
			timePrefScore,
			dayTypePrefScore,
			compositeScore,
			timeCategory,
			isWeekend
		});
	}
	const filtered = applyOverrides(candidates.filter((candidate) => candidate.attendingCount >= min_attendance_threshold), overrides);
	const sorted = [...filtered].sort((a, b) => b.compositeScore - a.compositeScore);
	const bestOverall = sorted[0] ?? null;
	const bestAttendance = [...filtered].sort((a, b) => b.attendingCount - a.attendingCount)[0] ?? null;
	const bestRequired = [...filtered].sort((a, b) => b.requiredScore - a.requiredScore || b.attendingCount - a.attendingCount)[0] ?? null;
	const bestTimeFit = [...filtered].sort((a, b) => b.timePrefScore - a.timePrefScore || b.attendingCount - a.attendingCount)[0] ?? null;
	const withExplanations = (m, label) => {
		if (!m) return null;
		return {
			...m,
			label,
			explanation: `${label}: ${buildExplanation(m)}`
		};
	};
	return {
		best_overall: withExplanations(bestOverall, "Best overall"),
		best_attendance: withExplanations(bestAttendance, "Best attendance"),
		best_required_match: withExplanations(bestRequired, "Best required-attendee match"),
		best_time_fit: withExplanations(bestTimeFit, "Best time fit"),
		most_popular: withExplanations(bestAttendance, "Most popular timing"),
		top_candidates: sorted.slice(0, 10).map((c) => ({
			...c,
			explanation: buildExplanation(c)
		}))
	};
}
//#endregion
//#region app/api/events/[eventId]/recommendations/route.ts
var route_exports$6 = /* @__PURE__ */ __exportAll({ GET: () => GET$2 });
async function GET$2(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		if (!await findOrganizerInviteToken(db, eventId, token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const event = await db.query.events.findFirst({ where: eq(events.id, eventId) });
		if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
		const participants$3 = await db.select().from(participants).where(eq(participants.event_id, eventId));
		const slots = await db.select().from(normalized_slots).where(eq(normalized_slots.event_id, eventId));
		const preferences = await db.select().from(participant_preferences).where(eq(participant_preferences.event_id, eventId));
		const overrides = await db.select().from(organizer_overrides).where(eq(organizer_overrides.event_id, eventId));
		const respondedCount = participants$3.filter((p) => p.role === "participant" && p.response_status === "responded").length;
		const recommendations = computeRecommendations(participants$3.filter((p) => p.role !== "organizer").map((p) => ({
			id: p.id,
			is_required: p.is_required,
			response_status: p.response_status,
			priority_tier: p.priority_tier
		})), slots, preferences.map((p) => ({
			participant_id: p.participant_id,
			preferred_day_type: p.preferred_day_type,
			preferred_time_of_day: p.preferred_time_of_day,
			food_preference: p.food_preference,
			budget_preference: p.budget_preference,
			indoor_outdoor: p.indoor_outdoor
		})), {
			timezone: event.timezone,
			meeting_duration_minutes: event.meeting_duration_minutes,
			slot_granularity_minutes: event.slot_granularity_minutes,
			allowed_hours_start: event.allowed_hours_start,
			allowed_hours_end: event.allowed_hours_end,
			scoring_mode: event.scoring_mode,
			min_attendance_threshold: event.min_attendance_threshold
		}, overrides);
		const now = unixNow();
		await db.insert(recommendation_snapshots).values({
			id: generateId(),
			event_id: eventId,
			recommendations: JSON.stringify(recommendations),
			total_responded: respondedCount,
			computed_at: now
		});
		const totalParticipants = participants$3.filter((p) => p.role === "participant").length;
		return NextResponse.json({
			recommendations,
			stats: {
				total_participants: totalParticipants,
				responded: respondedCount,
				pending: totalParticipants - respondedCount,
				response_rate: totalParticipants > 0 ? Math.round(respondedCount / totalParticipants * 100) : 0
			},
			computed_at: now
		});
	} catch (err) {
		console.error("Get recommendations error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/api/events/[eventId]/reopen/route.ts
var route_exports$5 = /* @__PURE__ */ __exportAll({ POST: () => POST$2 });
async function POST$2(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const now = unixNow();
		await db.update(events).set({
			status: "active",
			updated_at: now
		}).where(eq(events.id, eventId));
		await db.delete(final_selections).where(eq(final_selections.event_id, eventId));
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "event_reopened",
			data: null,
			created_at: now
		});
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Reopen event error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region lib/event-settings.ts
var DEFAULT_ENABLED_PREFERENCES = [
	"food",
	"budget",
	"location",
	"day_type",
	"time_of_day",
	"indoor_outdoor"
];
function parseEnabledPreferences(raw) {
	if (!raw) return [...DEFAULT_ENABLED_PREFERENCES];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
	} catch {
		return [...DEFAULT_ENABLED_PREFERENCES];
	}
}
function hasMeaningfulPreferences(preferences, enabledFields) {
	if (!preferences) return false;
	const fieldsToCheck = enabledFields.length > 0 ? enabledFields : [...DEFAULT_ENABLED_PREFERENCES];
	for (const field of fieldsToCheck) {
		if (field === "food" && preferences.food_preference && preferences.food_preference !== "no_preference") return true;
		if (field === "budget" && preferences.budget_preference && preferences.budget_preference !== "no_preference") return true;
		if (field === "location" && (preferences.preferred_area && preferences.preferred_area.trim().length > 0 || preferences.max_travel_distance !== null && preferences.max_travel_distance !== void 0 && String(preferences.max_travel_distance).trim().length > 0)) return true;
		if (field === "day_type" && preferences.preferred_day_type && preferences.preferred_day_type !== "no_preference") return true;
		if (field === "time_of_day" && preferences.preferred_time_of_day && preferences.preferred_time_of_day !== "no_preference") return true;
		if (field === "indoor_outdoor" && preferences.indoor_outdoor && preferences.indoor_outdoor !== "no_preference") return true;
	}
	return Boolean(preferences.food_note && preferences.food_note.trim().length > 0 || preferences.notes && preferences.notes.trim().length > 0);
}
//#endregion
//#region app/api/events/[eventId]/respond/route.ts
var route_exports$4 = /* @__PURE__ */ __exportAll({ POST: () => POST$1 });
async function POST$1(request, { params }) {
	try {
		const { eventId } = await params;
		const body = await request.json();
		const parsed = SubmitResponseSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const { token, availability_windows: availability_windows$1, preferences } = parsed.data;
		const db = getDB(env.DB);
		const tokenRecord = await findParticipantInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
		const event = await db.query.events.findFirst({ where: eq(events.id, eventId) });
		if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
		const now = unixNow();
		if (event.status === "finalized") return NextResponse.json({ error: "Event is finalized, responses closed" }, { status: 400 });
		if (event.response_deadline && now > event.response_deadline) return NextResponse.json({ error: "The response deadline has passed" }, { status: 403 });
		const participant = await db.query.participants.findFirst({ where: eq(participants.id, tokenRecord.participant_id) });
		if (!participant) return NextResponse.json({ error: "Participant not found" }, { status: 404 });
		const isUpdate = participant.response_status === "responded";
		if (isUpdate && event.allow_participant_edit === 0) return NextResponse.json({ error: "Editing responses is not allowed for this event" }, { status: 403 });
		const enabledPreferences = parseEnabledPreferences(event.enabled_preferences);
		if (event.preferences_required === 1 && !hasMeaningfulPreferences(preferences, enabledPreferences)) return NextResponse.json({ error: "Please add at least one preference before submitting" }, { status: 400 });
		await db.delete(availability_windows).where(and(eq(availability_windows.participant_id, participant.id), eq(availability_windows.event_id, eventId)));
		await db.delete(normalized_slots).where(and(eq(normalized_slots.participant_id, participant.id), eq(normalized_slots.event_id, eventId)));
		const windowsToInsert = availability_windows$1.map((w) => ({
			id: generateId(),
			event_id: eventId,
			participant_id: participant.id,
			start_time: w.start_time,
			end_time: w.end_time,
			created_at: now
		}));
		if (windowsToInsert.length > 0) await db.insert(availability_windows).values(windowsToInsert);
		const normalizedSlots = normalizeAvailabilityWindows(availability_windows$1.map((w) => ({
			participant_id: participant.id,
			...w
		})), {
			timezone: event.timezone,
			meeting_duration_minutes: event.meeting_duration_minutes,
			slot_granularity_minutes: event.slot_granularity_minutes,
			allowed_hours_start: event.allowed_hours_start,
			allowed_hours_end: event.allowed_hours_end,
			scoring_mode: event.scoring_mode,
			min_attendance_threshold: event.min_attendance_threshold
		});
		if (normalizedSlots.length > 0) await db.insert(normalized_slots).values(normalizedSlots.map((s) => ({
			id: generateId(),
			event_id: eventId,
			participant_id: participant.id,
			slot_start: s.slot_start,
			slot_end: s.slot_end,
			created_at: now
		})));
		if (preferences) {
			const existingPref = await db.query.participant_preferences.findFirst({ where: and(eq(participant_preferences.participant_id, participant.id), eq(participant_preferences.event_id, eventId)) });
			if (existingPref) await db.update(participant_preferences).set({
				preferred_area: preferences.preferred_area ?? null,
				max_travel_distance: preferences.max_travel_distance ?? null,
				food_preference: preferences.food_preference,
				food_note: preferences.food_note ?? null,
				budget_preference: preferences.budget_preference,
				preferred_day_type: preferences.preferred_day_type,
				preferred_time_of_day: preferences.preferred_time_of_day,
				indoor_outdoor: preferences.indoor_outdoor,
				notes: preferences.notes ?? null,
				updated_at: now
			}).where(eq(participant_preferences.id, existingPref.id));
			else await db.insert(participant_preferences).values({
				id: generateId(),
				event_id: eventId,
				participant_id: participant.id,
				preferred_area: preferences.preferred_area ?? null,
				max_travel_distance: preferences.max_travel_distance ?? null,
				food_preference: preferences.food_preference,
				food_note: preferences.food_note ?? null,
				budget_preference: preferences.budget_preference,
				preferred_day_type: preferences.preferred_day_type,
				preferred_time_of_day: preferences.preferred_time_of_day,
				indoor_outdoor: preferences.indoor_outdoor,
				notes: preferences.notes ?? null,
				created_at: now,
				updated_at: now
			});
		}
		await db.update(participants).set({
			response_status: "responded",
			updated_at: now
		}).where(eq(participants.id, participant.id));
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: participant.id,
			action: isUpdate ? "response_updated" : "response_submitted",
			data: JSON.stringify({ windows_count: availability_windows$1.length }),
			created_at: now
		});
		return NextResponse.json({
			success: true,
			is_update: isUpdate
		});
	} catch (err) {
		console.error("Submit response error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region components/share-buttons.tsx
var ShareButtons = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'ShareButtons' is called on server");
}, "168aa4fcfd59", "ShareButtons");
//#endregion
//#region app/e/[eventId]/final/page.tsx
var page_exports$7 = /* @__PURE__ */ __exportAll({
	default: () => FinalPage,
	generateMetadata: () => generateMetadata
});
async function generateMetadata({ params }) {
	const { eventId } = await params;
	const event = await getDB(env.DB).query.events.findFirst({ where: eq(events.id, eventId) });
	if (!event) return { title: "Togoo" };
	const desc = event.description ?? `The plan is set for ${event.title}. See the confirmed date and time.`;
	return {
		title: `${event.title} | Confirmed on Togoo`,
		description: desc,
		openGraph: {
			title: event.title,
			description: desc,
			type: "website"
		},
		twitter: {
			card: "summary",
			title: event.title,
			description: desc
		}
	};
}
async function FinalPage({ params }) {
	const { eventId } = await params;
	const db = getDB(env.DB);
	const event = await db.query.events.findFirst({ where: eq(events.id, eventId) });
	if (!event || event.status !== "finalized") return notFound();
	const finalSelection = await db.query.final_selections.findFirst({ where: eq(final_selections.event_id, eventId) });
	if (!finalSelection) return notFound();
	const startDate = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: event.timezone
	}).format(/* @__PURE__ */ new Date(finalSelection.slot_start * 1e3));
	const startTime = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: event.timezone
	}).format(/* @__PURE__ */ new Date(finalSelection.slot_start * 1e3));
	const endTime = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: event.timezone
	}).format(/* @__PURE__ */ new Date(finalSelection.slot_end * 1e3));
	const shareText = `The plan is set: ${event.title} is on ${startDate}, ${startTime}-${endTime} (${event.timezone})`;
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
			className: "max-w-md w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "text-center mb-10 animate-slide-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
							className: "w-14 h-14 rounded-full bg-accent-subtle flex items-center justify-center mx-auto mb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("svg", {
								className: "w-7 h-7 text-accent",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
							href: "/",
							className: "font-display text-xl font-semibold text-text block mb-8",
							children: "Togoo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
							className: "text-xs font-medium text-accent uppercase tracking-wide mb-2",
							children: [event.event_type, " | confirmed"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h1", {
							className: "font-display text-4xl font-bold text-text mb-2",
							children: event.title
						}),
						event.description && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-muted",
							children: event.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "card p-8 text-center shadow-card-elevated animate-scale-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-sm text-muted mb-1",
							children: "Locked in for"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "font-display text-3xl font-bold text-text mb-2",
							children: startDate
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
							className: "inline-flex items-center gap-2 bg-accent-subtle border border-accent-light rounded-full px-4 py-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("svg", {
								className: "w-4 h-4 text-accent",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("span", {
								className: "font-medium text-accent",
								children: [
									startTime,
									" – ",
									endTime
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								event.timezone,
								" · ",
								formatDuration(event.meeting_duration_minutes)
							]
						}),
						finalSelection.notes && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
							className: "mt-5 pt-5 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
								className: "text-sm text-muted",
								children: finalSelection.notes
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
							className: "mt-6 pt-5 border-t border-border flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("span", {
								className: "text-xs text-muted",
								children: "Share the plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(ShareButtons, {
								path: `/e/${eventId}/final`,
								title: event.title,
								description: shareText
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
					className: "text-center text-xs text-muted mt-6",
					children: [
						"Planned with",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
							href: "/",
							className: "text-accent hover:underline",
							children: "Togoo"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/api/events/[eventId]/participants/[participantId]/route.ts
var route_exports$3 = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT
});
async function PUT(request, { params }) {
	try {
		const { eventId, participantId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const body = await request.json();
		const parsed = UpdateParticipantSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const updates = { updated_at: unixNow() };
		if (parsed.data.name !== void 0) updates.name = parsed.data.name;
		if (parsed.data.email !== void 0) updates.email = parsed.data.email || null;
		if (parsed.data.phone !== void 0) updates.phone = parsed.data.phone || null;
		if (parsed.data.is_required !== void 0) updates.is_required = parsed.data.is_required ? 1 : 0;
		if (parsed.data.priority_tier !== void 0) updates.priority_tier = parsed.data.priority_tier;
		await db.update(participants).set(updates).where(and(eq(participants.id, participantId), eq(participants.event_id, eventId)));
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "participant_updated",
			data: JSON.stringify({
				participant_id: participantId,
				updates
			}),
			created_at: unixNow()
		});
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Update participant error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
async function DELETE(request, { params }) {
	try {
		const { eventId, participantId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
		if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const participant = await db.query.participants.findFirst({ where: and(eq(participants.id, participantId), eq(participants.event_id, eventId)) });
		if (!participant) return NextResponse.json({ error: "Participant not found" }, { status: 404 });
		if (participant.role === "organizer") return NextResponse.json({ error: "Cannot remove organizer" }, { status: 400 });
		await db.delete(participants).where(and(eq(participants.id, participantId), eq(participants.event_id, eventId)));
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: tokenRecord.participant_id,
			action: "participant_removed",
			data: JSON.stringify({
				participant_id: participantId,
				name: participant.name
			}),
			created_at: unixNow()
		});
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Delete participant error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/e/[eventId]/organizer/[token]/page.tsx
var page_exports$6 = /* @__PURE__ */ __exportAll({ default: () => page_default$2 });
var page_default$2 = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'default' is called on server");
}, "80177f1a457a", "default");
//#endregion
//#region app/e/[eventId]/respond/[token]/page.tsx
var page_exports$5 = /* @__PURE__ */ __exportAll({ default: () => LegacyRespondPage });
async function LegacyRespondPage({ params }) {
	const { token } = await params;
	redirect(`/r/${token}`);
}
//#endregion
//#region app/e/[eventId]/summary/[token]/page.tsx
var page_exports$4 = /* @__PURE__ */ __exportAll({ default: () => SummaryPage });
function formatSlotTime(ts, timezone) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZone: timezone
	}).format(/* @__PURE__ */ new Date(ts * 1e3));
}
function formatSlotEnd(ts, timezone) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: timezone
	}).format(/* @__PURE__ */ new Date(ts * 1e3));
}
async function SummaryPage({ params }) {
	const { eventId, token } = await params;
	const db = getDB(env.DB);
	const event = await db.query.events.findFirst({ where: eq(events.id, eventId) });
	if (!event) return notFound();
	const tokenRecord = await findActiveInviteToken(db, token, { eventId });
	if (!tokenRecord) return notFound();
	if (tokenRecord.role === "participant" && event.show_results_to_participants !== 1) return notFound();
	const participants$2 = await db.select().from(participants).where(eq(participants.event_id, eventId));
	const slots = await db.select().from(normalized_slots).where(eq(normalized_slots.event_id, eventId));
	const preferences = await db.select().from(participant_preferences).where(eq(participant_preferences.event_id, eventId));
	const overrides = await db.select().from(organizer_overrides).where(eq(organizer_overrides.event_id, eventId));
	const recommendations = computeRecommendations(participants$2.filter((p) => p.role !== "organizer").map((p) => ({
		id: p.id,
		is_required: p.is_required,
		response_status: p.response_status,
		priority_tier: p.priority_tier
	})), slots, preferences.map((p) => ({
		participant_id: p.participant_id,
		preferred_day_type: p.preferred_day_type,
		preferred_time_of_day: p.preferred_time_of_day,
		food_preference: p.food_preference,
		budget_preference: p.budget_preference,
		indoor_outdoor: p.indoor_outdoor
	})), {
		timezone: event.timezone,
		meeting_duration_minutes: event.meeting_duration_minutes,
		slot_granularity_minutes: event.slot_granularity_minutes,
		allowed_hours_start: event.allowed_hours_start,
		allowed_hours_end: event.allowed_hours_end,
		scoring_mode: event.scoring_mode,
		min_attendance_threshold: event.min_attendance_threshold
	}, overrides);
	const totalParticipants = participants$2.filter((p) => p.role !== "organizer").length;
	const responded = participants$2.filter((p) => p.role !== "organizer" && p.response_status === "responded").length;
	const popularTimings = [...recommendations.top_candidates].sort((a, b) => b.attendingCount - a.attendingCount).slice(0, 3);
	const suggestedTimings = recommendations.top_candidates.slice(0, 3);
	const popularStarts = new Set(popularTimings.map((t) => t.start));
	const uniqueSuggested = suggestedTimings.filter((t) => !popularStarts.has(t.start));
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("header", {
			className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
				className: "max-w-xl mx-auto px-5 h-14 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
					href: "/",
					className: "font-display text-xl font-semibold text-text",
					children: "Togoo"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("main", {
			className: "max-w-xl mx-auto px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "mb-8 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-xs font-medium text-accent uppercase tracking-wide mb-1",
							children: event.event_type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h1", {
							className: "font-display text-3xl font-bold text-text",
							children: event.title
						}),
						event.description && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-sm text-muted mt-1",
							children: event.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
							className: "text-sm text-muted mt-2",
							children: [
								formatDate(event.date_range_start, event.timezone),
								" — ",
								formatDate(event.date_range_end, event.timezone),
								/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("span", {
									className: "ml-2 text-xs",
									children: [
										"(",
										event.timezone,
										")"
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
						className: "card p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "font-display text-3xl font-bold text-text",
							children: responded
						}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-xs text-muted mt-1",
							children: "Replied"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
						className: "card p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "font-display text-3xl font-bold text-text",
							children: totalParticipants - responded
						}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-xs text-muted mt-1",
							children: "Still waiting"
						})]
					})]
				}),
				responded < totalParticipants && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "bg-warning-light border border-warning/20 rounded-input px-4 py-3 text-sm text-warning mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("span", {
							className: "font-medium",
							children: "Still waiting on replies."
						}),
						" ",
						totalParticipants - responded,
						" ",
						totalParticipants - responded === 1 ? "person has not" : "people have not",
						" replied yet, so these results may change."
					]
				}),
				popularTimings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h2", {
							className: "section-title mb-3",
							children: "Best overlap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-xs text-muted mb-4",
							children: "Times when the largest number of people can make it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
							className: "space-y-3",
							children: popularTimings.map((slot, i) => /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
								className: "card card-interactive p-4 flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
										className: "w-8 h-8 rounded-full bg-accent-subtle flex items-center justify-center flex-shrink-0 font-display font-bold text-accent text-sm",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
											className: "text-sm font-medium text-text",
											children: [
												formatSlotTime(slot.start, event.timezone),
												" – ",
												formatSlotEnd(slot.end, event.timezone)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
											className: "text-xs text-muted mt-0.5",
											children: [
												slot.attendingCount,
												" of ",
												slot.totalParticipants,
												" people can make it"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
										className: "text-right flex-shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
											className: "text-sm font-semibold text-text",
											children: [Math.round(slot.attendingCount / slot.totalParticipants * 100), "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
											className: "text-xs text-muted",
											children: "can make it"
										})]
									})
								]
							}, slot.start))
						})
					]
				}),
				uniqueSuggested.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h2", {
							className: "section-title mb-3",
							children: "Best fit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-xs text-muted mb-4",
							children: "Times that balance attendance with the group's preferences."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
							className: "space-y-3",
							children: uniqueSuggested.map((slot, i) => /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
								className: "card p-4 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
									className: "w-8 h-8 rounded-full bg-surface-alt border border-border flex items-center justify-center flex-shrink-0 font-display font-bold text-muted text-sm",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
										className: "text-sm font-medium text-text",
										children: [
											formatSlotTime(slot.start, event.timezone),
											" – ",
											formatSlotEnd(slot.end, event.timezone)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("p", {
										className: "text-xs text-muted mt-0.5",
										children: [
											slot.attendingCount,
											" of ",
											slot.totalParticipants,
											" people can make it",
											slot.isWeekend ? " · weekend" : " · weekday"
										]
									})]
								})]
							}, slot.start))
						})
					]
				}),
				popularTimings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "card p-8 text-center text-muted text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
						className: "font-medium text-text mb-1",
						children: "No replies yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", { children: "Suggestions will appear after people start responding." })]
				})
			]
		})]
	});
}
//#endregion
//#region components/my-events.tsx
var MyEvents = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'MyEvents' is called on server");
}, "630c0b371760", "MyEvents");
//#endregion
//#region app/page.tsx
var page_exports$3 = /* @__PURE__ */ __exportAll({ default: () => LandingPage });
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("header", {
				className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "max-w-5xl mx-auto px-5 h-14 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("span", {
						className: "font-display text-xl font-semibold text-text",
						children: "Togoo"
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("nav", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
								href: "/faq",
								className: "text-sm text-muted hover:text-text transition-colors",
								children: "FAQ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("a", {
								href: "https://github.com/anxkhn/togoo",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-sm text-muted hover:text-text transition-colors",
								children: "GitHub"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
								href: "/events/new",
								className: "btn-primary text-sm",
								children: "Plan my meetup"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("section", {
					className: "max-w-5xl mx-auto px-5 pt-24 pb-20 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
							className: "inline-flex items-center gap-2 bg-accent-subtle border border-accent-light rounded-full px-3.5 py-1.5 mb-8 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", { className: "w-1.5 h-1.5 bg-accent rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("span", {
								className: "text-xs font-medium text-accent",
								children: "Cut the group chat back-and-forth"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("h1", {
							className: "font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text mb-6 leading-[1.05] animate-slide-up",
							children: [
								"Pick a meetup time",
								/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("span", {
									className: "text-accent",
									children: "without the back-and-forth"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed animate-slide-up",
							style: { animationDelay: "0.1s" },
							children: "Send one link, collect availability and preferences, and let Togoo surface the best time for your group to meet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up",
							style: { animationDelay: "0.15s" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
								href: "/events/new",
								className: "btn-primary text-base px-8 py-3 w-full sm:w-auto",
								children: "Plan my meetup"
							}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("a", {
								href: "#how-it-works",
								className: "btn-secondary text-base px-8 py-3 w-full sm:w-auto",
								children: "See it work"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(MyEvents, {}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("section", {
					id: "how-it-works",
					className: "max-w-5xl mx-auto px-5 py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
						className: "text-center mb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h2", {
							className: "font-display text-4xl font-semibold text-text mb-3",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
							className: "text-muted",
							children: "One link in, one decision out. No accounts needed for guests."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-6",
						children: [
							{
								step: "01",
								title: "Set the window",
								desc: "Choose the date range, meeting length, and hours that work for your group.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("svg", {
									className: "w-6 h-6",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 1.5,
										d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									})
								})
							},
							{
								step: "02",
								title: "Share one link",
								desc: "Invite everyone once. They reply with broad availability and any preferences you want to collect.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("svg", {
									className: "w-6 h-6",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 1.5,
										d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
									})
								})
							},
							{
								step: "03",
								title: "Choose the best option",
								desc: "See ranked suggestions based on overlap, priorities, and preference fit, then confirm the winner.",
								icon: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("svg", {
									className: "w-6 h-6",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 1.5,
										d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
									})
								})
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
							className: "card card-interactive p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
									className: "w-10 h-10 bg-accent-subtle border border-accent-light rounded-lg flex items-center justify-center flex-shrink-0 text-accent",
									children: item.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
										className: "text-xs font-medium text-accent mb-1",
										children: item.step
									}),
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h3", {
										className: "font-display text-lg font-semibold text-text mb-2",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
										className: "text-sm text-muted leading-relaxed",
										children: item.desc
									})
								] })]
							})
						}, item.step))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("section", {
					className: "max-w-5xl mx-auto px-5 py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
						className: "bg-surface border border-border rounded-card p-10 text-center shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h2", {
								className: "font-display text-4xl font-semibold text-text mb-3",
								children: "Get your group to yes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
								className: "text-muted mb-8 max-w-md mx-auto",
								children: "Set it up in a couple of minutes. Guests can reply without creating an account."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
								href: "/events/new",
								className: "btn-primary text-base px-8 py-3",
								children: "Create a free event"
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("footer", {
				className: "border-t border-border py-8 text-center text-sm text-muted space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", { children: "Togoo | group plans without the back-and-forth" }), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "flex items-center justify-center gap-4 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
						href: "/faq",
						className: "hover:text-accent transition-colors",
						children: "FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("a", {
						href: "https://github.com/anxkhn/togoo",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hover:text-accent transition-colors",
						children: "GitHub"
					})]
				})]
			})
		]
	});
}
//#endregion
//#region app/api/events/route.ts
var route_exports$2 = /* @__PURE__ */ __exportAll({ POST: () => POST });
async function POST(request) {
	try {
		const body = await request.json();
		const parsed = CreateEventSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({
			error: "Invalid input",
			details: parsed.error.flatten()
		}, { status: 400 });
		const data = parsed.data;
		if (data.date_range_end <= data.date_range_start) return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
		const db = getDB(env.DB);
		const eventId = generateId();
		const organizerParticipantId = generateId();
		const organizerTokenId = generateId();
		const organizerToken = generateSecureToken();
		const now = unixNow();
		await db.insert(events).values({
			id: eventId,
			title: data.title,
			description: data.description ?? null,
			event_type: data.event_type,
			timezone: data.timezone,
			date_range_start: data.date_range_start,
			date_range_end: data.date_range_end,
			allowed_hours_start: data.allowed_hours_start,
			allowed_hours_end: data.allowed_hours_end,
			meeting_duration_minutes: data.meeting_duration_minutes,
			slot_granularity_minutes: data.slot_granularity_minutes,
			min_attendance_threshold: data.min_attendance_threshold,
			participants_required_by_default: data.participants_required_by_default ? 1 : 0,
			allow_participant_edit: data.allow_participant_edit ? 1 : 0,
			show_results_to_participants: data.show_results_to_participants ? 1 : 0,
			preferences_required: data.preferences_required ? 1 : 0,
			enabled_preferences: JSON.stringify(data.enabled_preferences),
			scoring_mode: data.scoring_mode,
			organizer_participant_id: organizerParticipantId,
			status: "active",
			response_deadline: data.response_deadline ?? null,
			created_at: now,
			updated_at: now
		});
		await db.insert(participants).values({
			id: organizerParticipantId,
			event_id: eventId,
			name: data.organizer_name,
			email: data.organizer_email ?? null,
			role: "organizer",
			is_required: 1,
			response_status: "responded",
			created_at: now,
			updated_at: now
		});
		await db.insert(invite_tokens).values({
			id: organizerTokenId,
			event_id: eventId,
			participant_id: organizerParticipantId,
			token: organizerToken,
			role: "organizer",
			is_active: 1,
			created_at: now
		});
		await db.insert(activity_log).values({
			id: generateId(),
			event_id: eventId,
			actor_id: organizerParticipantId,
			action: "event_created",
			data: JSON.stringify({ title: data.title }),
			created_at: now
		});
		return NextResponse.json({
			event_id: eventId,
			organizer_token: organizerToken,
			organizer_participant_id: organizerParticipantId,
			dashboard_url: `/e/${eventId}/organizer/${organizerToken}`
		});
	} catch (err) {
		console.error("Create event error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/api/validate-token/route.ts
var route_exports$1 = /* @__PURE__ */ __exportAll({ GET: () => GET$1 });
async function GET$1(request) {
	try {
		const token = request.nextUrl.searchParams.get("token");
		if (!token) return NextResponse.json({ valid: false }, { status: 400 });
		const db = getDB(env.DB);
		const tokenRecord = await findActiveInviteToken(db, token);
		if (!tokenRecord) return NextResponse.json({ valid: false }, { status: 401 });
		const event = await db.query.events.findFirst({ where: eq(events.id, tokenRecord.event_id) });
		const participant = await db.query.participants.findFirst({ where: eq(participants.id, tokenRecord.participant_id) });
		const existingPrefs = await db.query.participant_preferences.findFirst({ where: and(eq(participant_preferences.participant_id, tokenRecord.participant_id), eq(participant_preferences.event_id, tokenRecord.event_id)) });
		const existingWindows = await db.select().from(availability_windows).where(and(eq(availability_windows.participant_id, tokenRecord.participant_id), eq(availability_windows.event_id, tokenRecord.event_id)));
		return NextResponse.json({
			valid: true,
			role: tokenRecord.role,
			event_id: tokenRecord.event_id,
			participant_id: tokenRecord.participant_id,
			event,
			participant,
			existing_windows: existingWindows,
			existing_preferences: existingPrefs ?? null
		});
	} catch (err) {
		console.error("Validate token error:", err);
		return NextResponse.json({ valid: false }, { status: 500 });
	}
}
//#endregion
//#region app/events/new/page.tsx
var page_exports$2 = /* @__PURE__ */ __exportAll({ default: () => page_default$1 });
var page_default$1 = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'default' is called on server");
}, "d61b284da072", "default");
//#endregion
//#region app/faq/page.tsx
var page_exports$1 = /* @__PURE__ */ __exportAll({ default: () => FAQPage });
var FAQS = [
	{
		q: "Do people need an account to reply?",
		a: "No. Everyone gets a private link and can respond right away without signing up."
	},
	{
		q: "What do invitees actually fill out?",
		a: "They share when they could make it and, if you want, details like food, budget, area, and indoor or outdoor preferences."
	},
	{
		q: "Can someone change their response later?",
		a: "Yes, as long as you allow edits when you create the event. They can reopen their link and update their availability."
	},
	{
		q: "What does the organizer see?",
		a: "You get a private dashboard with reply status, ranked time suggestions, participant details, and an availability heatmap so you can make a decision quickly."
	},
	{
		q: "How does Togoo decide which times to recommend?",
		a: "It compares overlap across everyone's availability, then ranks options based on attendance, must-have attendees, and the preferences you choose to collect."
	},
	{
		q: "Can I choose which preferences to ask about?",
		a: "Yes. Turn on only the fields that matter for that plan, like food, budget, location, weekday versus weekend, time of day, or indoor versus outdoor."
	},
	{
		q: "Is this private?",
		a: "Yes. Events are not publicly listed. Only people with the organizer link or an invite link can open the event. Invite links can also expire if you set a deadline."
	},
	{
		q: "Can invitees see the live summary?",
		a: "Only if you turn that on. When enabled, invitees can open a token-gated live summary from their own invite link."
	},
	{
		q: "What happens after I confirm a time?",
		a: "Togoo locks in the selected slot and creates a shareable final page you can send back to the group."
	},
	{
		q: "Can I send invites over WhatsApp or email?",
		a: "Yes. Each participant row includes quick share actions for copy, WhatsApp, email, and QR."
	},
	{
		q: "Is Togoo open source?",
		a: "Yes. You can browse the code on GitHub."
	}
];
function FAQPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("header", {
				className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
					className: "max-w-3xl mx-auto px-5 h-14 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
						href: "/",
						className: "font-display text-xl font-semibold text-text",
						children: "Togoo"
					}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(link_default, {
						href: "/events/new",
						className: "btn-primary text-sm",
						children: "Plan my meetup"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("main", {
				className: "max-w-3xl mx-auto px-5 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h1", {
						className: "font-display text-4xl font-bold text-text mb-2 animate-slide-up",
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
						className: "text-muted mb-12 animate-slide-up",
						style: { animationDelay: "0.05s" },
						children: "Everything people usually ask before they trust a group planning tool."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("div", {
						className: "space-y-4 animate-fade-in",
						style: { animationDelay: "0.1s" },
						children: FAQS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("div", {
							className: "card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("h2", {
								className: "font-display text-base font-semibold text-text mb-2",
								children: item.q
							}), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", {
								className: "text-sm text-muted leading-relaxed",
								children: item.a
							})]
						}, item.q))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsxs)("footer", {
				className: "border-t border-border py-8 text-center text-xs text-muted space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("p", { children: "Togoo | group plans without the back-and-forth" }), /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("a", {
					href: "https://github.com/anxkhn/togoo",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "hover:text-accent transition-[color] duration-150 ease inline-block",
					children: "GitHub"
				})]
			})
		]
	});
}
//#endregion
//#region app/api/events/[eventId]/route.ts
var route_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
async function GET(request, { params }) {
	try {
		const { eventId } = await params;
		const token = request.headers.get("x-organizer-token");
		const db = getDB(env.DB);
		if (!await findOrganizerInviteToken(db, eventId, token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		const event = await db.query.events.findFirst({ where: eq(events.id, eventId) });
		if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
		const participants$1 = await db.select().from(participants).where(eq(participants.event_id, eventId));
		const total = participants$1.filter((p) => p.role === "participant").length;
		const responded = participants$1.filter((p) => p.role === "participant" && p.response_status === "responded").length;
		const activity = await db.select().from(activity_log).where(eq(activity_log.event_id, eventId)).orderBy(desc(activity_log.created_at)).limit(25);
		const finalSelection = await db.query.final_selections.findFirst({ where: eq(final_selections.event_id, eventId) });
		return NextResponse.json({
			event,
			stats: {
				total_invited: total,
				total_responded: responded,
				pending: total - responded
			},
			activity,
			final_selection: finalSelection ?? null
		});
	} catch (err) {
		console.error("Get event error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
//#region app/r/[token]/page.tsx
var page_exports = /* @__PURE__ */ __exportAll({ default: () => page_default });
var page_default = /* @__PURE__ */ registerClientReference(() => {
	throw new Error("Unexpectedly client reference export 'default' is called on server");
}, "d45468d38d17", "default");
//#endregion
//#region \0virtual:vinext-rsc-entry
function renderToReadableStream(model, options) {
	const _hlFixRe = /(\d*:HL\[.*?),"stylesheet"(\]|,)/g;
	const stream = renderToReadableStream$1(model, options);
	const decoder = new TextDecoder();
	const encoder = new TextEncoder();
	let carry = "";
	return stream.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			const text = carry + decoder.decode(chunk, { stream: true });
			const lastNl = text.lastIndexOf("\n");
			if (lastNl === -1) {
				carry = text;
				return;
			}
			carry = text.slice(lastNl + 1);
			controller.enqueue(encoder.encode(text.slice(0, lastNl + 1).replace(_hlFixRe, "$1,\"style\"$2")));
		},
		flush(controller) {
			const text = carry + decoder.decode();
			if (text) controller.enqueue(encoder.encode(text.replace(_hlFixRe, "$1,\"style\"$2")));
		}
	}));
}
function _getSSRFontStyles() {
	return [...getSSRFontStyles$1(), ...getSSRFontStyles()];
}
function _getSSRFontPreloads() {
	return [...getSSRFontPreloads$1(), ...getSSRFontPreloads()];
}
var _suppressHookWarningAls = new AsyncLocalStorage$1();
var _origConsoleError = console.error;
console.error = (...args) => {
	if (_suppressHookWarningAls.getStore() === true && typeof args[0] === "string" && args[0].includes("Invalid hook call")) return;
	_origConsoleError.apply(console, args);
};
function setNavigationContext(ctx) {
	setNavigationContext$1(ctx);
}
async function __isrGet(key) {
	const result = await getCacheHandler().get(key);
	if (!result || !result.value) return null;
	return {
		value: result,
		isStale: result.cacheState === "stale"
	};
}
async function __isrSet(key, data, revalidateSeconds, tags) {
	await getCacheHandler().set(key, data, {
		revalidate: revalidateSeconds,
		tags: Array.isArray(tags) ? tags : []
	});
}
function __pageCacheTags(pathname, extraTags) {
	const tags = [pathname, "_N_T_" + pathname];
	tags.push("_N_T_/layout");
	const segments = pathname.split("/");
	let built = "";
	for (let i = 1; i < segments.length; i++) if (segments[i]) {
		built += "/" + segments[i];
		tags.push("_N_T_" + built + "/layout");
	}
	tags.push("_N_T_" + built + "/page");
	if (Array.isArray(extraTags)) {
		for (const tag of extraTags) if (!tags.includes(tag)) tags.push(tag);
	}
	return tags;
}
var __pendingRegenerations = /* @__PURE__ */ new Map();
function __triggerBackgroundRegeneration(key, renderFn) {
	if (__pendingRegenerations.has(key)) return;
	const promise = renderFn().catch((err) => console.error("[vinext] ISR regen failed for " + key + ":", err)).finally(() => __pendingRegenerations.delete(key));
	__pendingRegenerations.set(key, promise);
	const ctx = getRequestExecutionContext();
	if (ctx && typeof ctx.waitUntil === "function") ctx.waitUntil(promise);
}
function __isrFnv1a64(s) {
	let h1 = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h1 ^= s.charCodeAt(i);
		h1 = h1 * 16777619 >>> 0;
	}
	let h2 = 84696351;
	for (let i = 0; i < s.length; i++) {
		h2 ^= s.charCodeAt(i);
		h2 = h2 * 16777619 >>> 0;
	}
	return h1.toString(36) + h2.toString(36);
}
function __isrCacheKey(pathname, suffix) {
	const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
	const prefix = "app:3944fe3f-d72c-47ca-86b3-076bd1cc35cd";
	const key = prefix + ":" + normalized + ":" + suffix;
	if (key.length <= 200) return key;
	return prefix + ":__hash:" + __isrFnv1a64(normalized) + ":" + suffix;
}
function __isrHtmlKey(pathname) {
	return __isrCacheKey(pathname, "html");
}
function __isrRscKey(pathname) {
	return __isrCacheKey(pathname, "rsc");
}
function __isrRouteKey(pathname) {
	return __isrCacheKey(pathname, "route");
}
var __isrDebug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, "[vinext] ISR:") : void 0;
function makeThenableParams(obj) {
	const plain = { ...obj };
	return Object.assign(Promise.resolve(plain), plain);
}
function __errorDigest(str) {
	let hash = 5381;
	for (let i = str.length - 1; i >= 0; i--) hash = hash * 33 ^ str.charCodeAt(i);
	return (hash >>> 0).toString();
}
function __sanitizeErrorForClient(error) {
	if (resolveAppPageSpecialError(error)) return error;
	const msg = error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack || "" : "";
	const sanitized = /* @__PURE__ */ new Error("An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.");
	sanitized.digest = __errorDigest(msg + stack);
	return sanitized;
}
function rscOnError(error, requestInfo, errorContext) {
	if (error && typeof error === "object" && "digest" in error) return String(error.digest);
	if (requestInfo && errorContext && error) reportRequestError(error instanceof Error ? error : new Error(String(error)), requestInfo, errorContext);
	if (error) return __errorDigest((error instanceof Error ? error.message : String(error)) + (error instanceof Error ? error.stack || "" : ""));
}
function createRscOnErrorHandler(request, pathname, routePath) {
	const requestInfo = {
		path: pathname,
		method: request.method,
		headers: Object.fromEntries(request.headers.entries())
	};
	const errorContext = {
		routerKind: "App Router",
		routePath: routePath || pathname,
		routeType: "render"
	};
	return function(error) {
		return rscOnError(error, requestInfo, errorContext);
	};
}
var routes = [
	{
		pattern: "/api/events/:eventId/participants/:participantId/token",
		patternParts: [
			"api",
			"events",
			":eventId",
			"participants",
			":participantId",
			"token"
		],
		isDynamic: true,
		params: ["eventId", "participantId"],
		page: null,
		routeHandler: route_exports$10,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"participants",
			"[participantId]",
			"token"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/finalize",
		patternParts: [
			"api",
			"events",
			":eventId",
			"finalize"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$9,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"finalize"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/overrides",
		patternParts: [
			"api",
			"events",
			":eventId",
			"overrides"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$8,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"overrides"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/participants",
		patternParts: [
			"api",
			"events",
			":eventId",
			"participants"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$7,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"participants"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/recommendations",
		patternParts: [
			"api",
			"events",
			":eventId",
			"recommendations"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$6,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"recommendations"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/reopen",
		patternParts: [
			"api",
			"events",
			":eventId",
			"reopen"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$5,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"reopen"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/respond",
		patternParts: [
			"api",
			"events",
			":eventId",
			"respond"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports$4,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"respond"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/e/:eventId/final",
		patternParts: [
			"e",
			":eventId",
			"final"
		],
		isDynamic: true,
		params: ["eventId"],
		page: page_exports$7,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: [
			"e",
			"[eventId]",
			"final"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId/participants/:participantId",
		patternParts: [
			"api",
			"events",
			":eventId",
			"participants",
			":participantId"
		],
		isDynamic: true,
		params: ["eventId", "participantId"],
		page: null,
		routeHandler: route_exports$3,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]",
			"participants",
			"[participantId]"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/e/:eventId/organizer/:token",
		patternParts: [
			"e",
			":eventId",
			"organizer",
			":token"
		],
		isDynamic: true,
		params: ["eventId", "token"],
		page: page_exports$6,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: [
			"e",
			"[eventId]",
			"organizer",
			"[token]"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/e/:eventId/respond/:token",
		patternParts: [
			"e",
			":eventId",
			"respond",
			":token"
		],
		isDynamic: true,
		params: ["eventId", "token"],
		page: page_exports$5,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: [
			"e",
			"[eventId]",
			"respond",
			"[token]"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/e/:eventId/summary/:token",
		patternParts: [
			"e",
			":eventId",
			"summary",
			":token"
		],
		isDynamic: true,
		params: ["eventId", "token"],
		page: page_exports$4,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: [
			"e",
			"[eventId]",
			"summary",
			"[token]"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/",
		patternParts: [],
		isDynamic: false,
		params: [],
		page: page_exports$3,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: [],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events",
		patternParts: ["api", "events"],
		isDynamic: false,
		params: [],
		page: null,
		routeHandler: route_exports$2,
		layouts: [layout_exports],
		routeSegments: ["api", "events"],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/validate-token",
		patternParts: ["api", "validate-token"],
		isDynamic: false,
		params: [],
		page: null,
		routeHandler: route_exports$1,
		layouts: [layout_exports],
		routeSegments: ["api", "validate-token"],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/events/new",
		patternParts: ["events", "new"],
		isDynamic: false,
		params: [],
		page: page_exports$2,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: ["events", "new"],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/faq",
		patternParts: ["faq"],
		isDynamic: false,
		params: [],
		page: page_exports$1,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: ["faq"],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/api/events/:eventId",
		patternParts: [
			"api",
			"events",
			":eventId"
		],
		isDynamic: true,
		params: ["eventId"],
		page: null,
		routeHandler: route_exports,
		layouts: [layout_exports],
		routeSegments: [
			"api",
			"events",
			"[eventId]"
		],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	},
	{
		pattern: "/r/:token",
		patternParts: ["r", ":token"],
		isDynamic: true,
		params: ["token"],
		page: page_exports,
		routeHandler: null,
		layouts: [layout_exports],
		routeSegments: ["r", "[token]"],
		layoutTreePositions: [0],
		templates: [null],
		errors: [null],
		slots: {},
		loading: null,
		error: null,
		notFound: not_found_exports,
		notFounds: [not_found_exports],
		forbidden: null,
		unauthorized: null
	}
];
var _routeTrie = buildRouteTrie(routes);
var metadataRoutes = [];
var rootNotFoundModule = not_found_exports;
var rootForbiddenModule = null;
var rootUnauthorizedModule = null;
var rootLayouts = [layout_exports];
/**
* Render an HTTP access fallback page (not-found/forbidden/unauthorized) with layouts and noindex meta.
* Returns null if no matching component is available.
*
* @param opts.boundaryComponent - Override the boundary component (for layout-level notFound)
* @param opts.layouts - Override the layouts to wrap with (for layout-level notFound, excludes the throwing layout)
*/
async function renderHTTPAccessFallbackPage(route, statusCode, isRscRequest, request, opts, scriptNonce) {
	return renderAppPageHttpAccessFallback({
		boundaryComponent: opts?.boundaryComponent ?? null,
		buildFontLinkHeader: buildAppPageFontLinkHeader,
		clearRequestContext() {
			setHeadersContext(null);
			setNavigationContext(null);
		},
		createRscOnErrorHandler(pathname, routePath) {
			return createRscOnErrorHandler(request, pathname, routePath);
		},
		getFontLinks: getSSRFontLinks,
		getFontPreloads: _getSSRFontPreloads,
		getFontStyles: _getSSRFontStyles,
		getNavigationContext,
		globalErrorModule: null,
		isRscRequest,
		layoutModules: opts?.layouts ?? null,
		loadSsrHandler() {
			return import("./ssr/index.js");
		},
		makeThenableParams,
		matchedParams: opts?.matchedParams ?? route?.params ?? {},
		requestUrl: request.url,
		resolveChildSegments: resolveAppPageChildSegments,
		rootForbiddenModule,
		rootLayouts,
		rootNotFoundModule,
		rootUnauthorizedModule,
		route,
		renderToReadableStream,
		scriptNonce,
		statusCode
	});
}
/** Convenience: render a not-found page (404) */
async function renderNotFoundPage(route, isRscRequest, request, matchedParams, scriptNonce) {
	return renderHTTPAccessFallbackPage(route, 404, isRscRequest, request, { matchedParams }, scriptNonce);
}
/**
* Render an error.tsx boundary page when a server component or generateMetadata() throws.
* Returns null if no error boundary component is available for this route.
*
* Next.js returns HTTP 200 when error.tsx catches an error (the error is "handled"
* by the boundary). This matches that behavior intentionally.
*/
async function renderErrorBoundaryPage(route, error, isRscRequest, request, matchedParams, scriptNonce) {
	return renderAppPageErrorBoundary({
		buildFontLinkHeader: buildAppPageFontLinkHeader,
		clearRequestContext() {
			setHeadersContext(null);
			setNavigationContext(null);
		},
		createRscOnErrorHandler(pathname, routePath) {
			return createRscOnErrorHandler(request, pathname, routePath);
		},
		error,
		getFontLinks: getSSRFontLinks,
		getFontPreloads: _getSSRFontPreloads,
		getFontStyles: _getSSRFontStyles,
		getNavigationContext,
		globalErrorModule: null,
		isRscRequest,
		loadSsrHandler() {
			return import("./ssr/index.js");
		},
		makeThenableParams,
		matchedParams: matchedParams ?? route?.params ?? {},
		requestUrl: request.url,
		resolveChildSegments: resolveAppPageChildSegments,
		rootLayouts,
		route,
		renderToReadableStream,
		sanitizeErrorForClient: __sanitizeErrorForClient,
		scriptNonce
	});
}
function matchRoute(url) {
	const pathname = url.split("?")[0];
	return trieMatch(_routeTrie, (pathname === "/" ? "/" : pathname.replace(/\/$/, "")).split("/").filter(Boolean));
}
function __createStaticFileSignal(pathname, _mwCtx) {
	const headers = new Headers({ "x-vinext-static-file": encodeURIComponent(pathname) });
	if (_mwCtx.headers) for (const [key, value] of _mwCtx.headers) headers.append(key, value);
	return new Response(null, {
		status: _mwCtx.status ?? 200,
		headers
	});
}
function matchPattern(urlParts, patternParts) {
	const params = Object.create(null);
	for (let i = 0; i < patternParts.length; i++) {
		const pp = patternParts[i];
		if (pp.endsWith("+")) {
			if (i !== patternParts.length - 1) return null;
			const paramName = pp.slice(1, -1);
			const remaining = urlParts.slice(i);
			if (remaining.length === 0) return null;
			params[paramName] = remaining;
			return params;
		}
		if (pp.endsWith("*")) {
			if (i !== patternParts.length - 1) return null;
			const paramName = pp.slice(1, -1);
			params[paramName] = urlParts.slice(i);
			return params;
		}
		if (pp.startsWith(":")) {
			if (i >= urlParts.length) return null;
			params[pp.slice(1)] = urlParts[i];
			continue;
		}
		if (i >= urlParts.length || urlParts[i] !== pp) return null;
	}
	if (urlParts.length !== patternParts.length) return null;
	return params;
}
var interceptLookup = [];
for (let ri = 0; ri < routes.length; ri++) {
	const r = routes[ri];
	if (!r.slots) continue;
	for (const [slotName, slotMod] of Object.entries(r.slots)) {
		if (!slotMod.intercepts) continue;
		for (const intercept of slotMod.intercepts) interceptLookup.push({
			sourceRouteIndex: ri,
			slotName,
			targetPattern: intercept.targetPattern,
			targetPatternParts: intercept.targetPattern.split("/").filter(Boolean),
			page: intercept.page,
			params: intercept.params
		});
	}
}
/**
* Check if a pathname matches any intercepting route.
* Returns the match info or null.
*/
function findIntercept(pathname) {
	const urlParts = pathname.split("/").filter(Boolean);
	for (const entry of interceptLookup) {
		const params = matchPattern(urlParts, entry.targetPatternParts);
		if (params !== null) return {
			...entry,
			matchedParams: params
		};
	}
	return null;
}
async function buildPageElement(route, params, opts, searchParams) {
	const PageComponent = route.page?.default;
	if (!PageComponent) return (0, import_react_react_server.createElement)("div", null, "Page has no default export");
	const layoutMods = route.layouts.filter(Boolean);
	const layoutMetaPromises = [];
	let accumulatedMetaPromise = Promise.resolve({});
	for (let i = 0; i < layoutMods.length; i++) {
		const parentForThisLayout = accumulatedMetaPromise;
		const metaPromise = resolveModuleMetadata(layoutMods[i], params, void 0, parentForThisLayout).catch((err) => {
			console.error("[vinext] Layout generateMetadata() failed:", err);
			return null;
		});
		layoutMetaPromises.push(metaPromise);
		accumulatedMetaPromise = metaPromise.then(async (result) => result ? mergeMetadata([await parentForThisLayout, result]) : await parentForThisLayout);
	}
	const pageParentPromise = accumulatedMetaPromise;
	const spObj = {};
	let hasSearchParams = false;
	if (searchParams && searchParams.forEach) searchParams.forEach(function(v, k) {
		hasSearchParams = true;
		if (k in spObj) spObj[k] = Array.isArray(spObj[k]) ? spObj[k].concat(v) : [spObj[k], v];
		else spObj[k] = v;
	});
	const [layoutMetaResults, layoutVpResults, pageMeta, pageVp] = await Promise.all([
		Promise.all(layoutMetaPromises),
		Promise.all(layoutMods.map((mod) => resolveModuleViewport(mod, params).catch((err) => {
			console.error("[vinext] Layout generateViewport() failed:", err);
			return null;
		}))),
		route.page ? resolveModuleMetadata(route.page, params, spObj, pageParentPromise) : Promise.resolve(null),
		route.page ? resolveModuleViewport(route.page, params) : Promise.resolve(null)
	]);
	const metadataList = [...layoutMetaResults.filter(Boolean), ...pageMeta ? [pageMeta] : []];
	const viewportList = [...layoutVpResults.filter(Boolean), ...pageVp ? [pageVp] : []];
	const resolvedMetadata = metadataList.length > 0 ? mergeMetadata(metadataList) : null;
	const resolvedViewport = mergeViewport(viewportList);
	const pageProps = { params: makeThenableParams(params) };
	if (searchParams) {
		pageProps.searchParams = makeThenableParams(spObj);
		if (hasSearchParams) markDynamicUsage();
	}
	return buildAppPageRouteElement({
		element: (0, import_react_react_server.createElement)(PageComponent, pageProps),
		globalErrorModule: null,
		makeThenableParams,
		matchedParams: params,
		resolvedMetadata,
		resolvedViewport,
		rootNotFoundModule: not_found_exports,
		route,
		slotOverrides: opts && opts.interceptSlot && opts.interceptPage ? { [opts.interceptSlot]: {
			pageModule: opts.interceptPage,
			params: opts.interceptParams || params
		} } : null
	});
}
var __basePath = "";
var __trailingSlash = false;
var __i18nConfig = null;
var __configRedirects = [];
var __configRewrites = {
	"beforeFiles": [],
	"afterFiles": [],
	"fallback": []
};
var __configHeaders = [];
var __publicFiles = /* @__PURE__ */ new Set([]);
var __allowedOrigins = ["localhost:3000"];
function __normalizePath(pathname) {
	if (pathname === "/" || pathname.length > 1 && pathname[0] === "/" && !pathname.includes("//") && !pathname.includes("/./") && !pathname.includes("/../") && !pathname.endsWith("/.") && !pathname.endsWith("/..")) return pathname;
	const segments = pathname.split("/");
	const resolved = [];
	for (let i = 0; i < segments.length; i++) {
		const seg = segments[i];
		if (seg === "" || seg === ".") continue;
		if (seg === "..") resolved.pop();
		else resolved.push(seg);
	}
	return "/" + resolved.join("/");
}
var __pathDelimiterRegex = /([/#?\\]|%(2f|23|3f|5c))/gi;
function __decodeRouteSegment(segment) {
	return decodeURIComponent(segment).replace(__pathDelimiterRegex, function(char) {
		return encodeURIComponent(char);
	});
}
function __decodeRouteSegmentSafe(segment) {
	try {
		return __decodeRouteSegment(segment);
	} catch (e) {
		return segment;
	}
}
function __normalizePathnameForRouteMatch(pathname) {
	const segments = pathname.split("/");
	const normalized = [];
	for (let i = 0; i < segments.length; i++) normalized.push(__decodeRouteSegmentSafe(segments[i]));
	return normalized.join("/");
}
function __normalizePathnameForRouteMatchStrict(pathname) {
	const segments = pathname.split("/");
	const normalized = [];
	for (let i = 0; i < segments.length; i++) normalized.push(__decodeRouteSegment(segments[i]));
	return normalized.join("/");
}
/**
* Build a request context from the live ALS HeadersContext, which reflects
* any x-middleware-request-* header mutations applied by middleware.
* Used for afterFiles and fallback rewrite has/missing evaluation — these
* run after middleware in the App Router execution order.
*/
function __buildPostMwRequestContext(request) {
	const url = new URL(request.url);
	const ctx = getHeadersContext();
	if (!ctx) return requestContextFromRequest(request);
	const cookiesRecord = Object.fromEntries(ctx.cookies);
	return {
		headers: ctx.headers,
		cookies: cookiesRecord,
		query: url.searchParams,
		host: normalizeHost(ctx.headers.get("host"), url.hostname)
	};
}
/**
* Maximum server-action request body size.
* Configurable via experimental.serverActions.bodySizeLimit in next.config.
* Defaults to 1MB, matching the Next.js default.
* @see https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions#bodysizelimit
* Prevents unbounded request body buffering.
*/
var __MAX_ACTION_BODY_SIZE = 1048576;
/**
* Read a request body as text with a size limit.
* Enforces the limit on the actual byte stream to prevent bypasses
* via chunked transfer-encoding where Content-Length is absent or spoofed.
*/
async function __readBodyWithLimit(request, maxBytes) {
	if (!request.body) return "";
	var reader = request.body.getReader();
	var decoder = new TextDecoder();
	var chunks = [];
	var totalSize = 0;
	for (;;) {
		var result = await reader.read();
		if (result.done) break;
		totalSize += result.value.byteLength;
		if (totalSize > maxBytes) {
			reader.cancel();
			throw new Error("Request body too large");
		}
		chunks.push(decoder.decode(result.value, { stream: true }));
	}
	chunks.push(decoder.decode());
	return chunks.join("");
}
/**
* Read a request body as FormData with a size limit.
* Consumes the body stream with a byte counter and then parses the
* collected bytes as multipart form data via the Response constructor.
*/
async function __readFormDataWithLimit(request, maxBytes) {
	if (!request.body) return new FormData();
	var reader = request.body.getReader();
	var chunks = [];
	var totalSize = 0;
	for (;;) {
		var result = await reader.read();
		if (result.done) break;
		totalSize += result.value.byteLength;
		if (totalSize > maxBytes) {
			reader.cancel();
			throw new Error("Request body too large");
		}
		chunks.push(result.value);
	}
	var combined = new Uint8Array(totalSize);
	var offset = 0;
	for (var chunk of chunks) {
		combined.set(chunk, offset);
		offset += chunk.byteLength;
	}
	var contentType = request.headers.get("content-type") || "";
	return new Response(combined, { headers: { "Content-Type": contentType } }).formData();
}
var generateStaticParamsMap = {
	"/e/:eventId/final": null,
	"/e/:eventId/organizer/:token": null,
	"/e/:eventId/respond/:token": null,
	"/e/:eventId/summary/:token": null,
	"/r/:token": null
};
async function handler(request, ctx) {
	return runWithRequestContext(createRequestContext({
		headersContext: headersContextFromRequest(request),
		executionContext: ctx ?? getRequestExecutionContext() ?? null
	}), async () => {
		ensureFetchPatch();
		const __reqCtx = requestContextFromRequest(request);
		const response = await _handleRequest(request, __reqCtx, {
			headers: null,
			status: null
		});
		if (response && response.headers && !(response.status >= 300 && response.status < 400)) {
			if (__configHeaders.length) {
				const url = new URL(request.url);
				let pathname;
				try {
					pathname = __normalizePath(__normalizePathnameForRouteMatch(url.pathname));
				} catch {
					pathname = url.pathname;
				}
				const extraHeaders = matchHeaders(pathname, __configHeaders, __reqCtx);
				for (const h of extraHeaders) {
					const lk = h.key.toLowerCase();
					if (lk === "vary" || lk === "set-cookie") response.headers.append(h.key, h.value);
					else if (!response.headers.has(lk)) response.headers.set(h.key, h.value);
				}
			}
		}
		return response;
	});
}
async function _handleRequest(request, __reqCtx, _mwCtx) {
	const __reqStart = 0;
	const url = new URL(request.url);
	const __protoGuard = guardProtocolRelativeUrl(url.pathname);
	if (__protoGuard) return __protoGuard;
	let decodedUrlPathname;
	try {
		decodedUrlPathname = __normalizePathnameForRouteMatchStrict(url.pathname);
	} catch (e) {
		return new Response("Bad Request", { status: 400 });
	}
	let pathname = __normalizePath(decodedUrlPathname);
	if (pathname === "/__vinext/prerender/static-params") {
		if (process.env.VINEXT_PRERENDER !== "1") return new Response("Not Found", { status: 404 });
		const pattern = url.searchParams.get("pattern");
		if (!pattern) return new Response("missing pattern", { status: 400 });
		const fn = generateStaticParamsMap[pattern];
		if (typeof fn !== "function") return new Response("null", {
			status: 200,
			headers: { "content-type": "application/json" }
		});
		try {
			const parentParams = url.searchParams.get("parentParams");
			const raw = parentParams ? JSON.parse(parentParams) : {};
			const result = await fn({ params: typeof raw === "object" && raw !== null && !Array.isArray(raw) ? raw : {} });
			return new Response(JSON.stringify(result), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (e) {
			return new Response(JSON.stringify({ error: String(e) }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	}
	const __tsRedirect = normalizeTrailingSlash(pathname, __basePath, __trailingSlash, url.search);
	if (__tsRedirect) return __tsRedirect;
	if (__configRedirects.length) {
		const __redir = matchRedirect(pathname.endsWith(".rsc") ? pathname.slice(0, -4) : pathname, __configRedirects, __reqCtx);
		if (__redir) {
			const __redirDest = sanitizeDestination(__redir.destination);
			return new Response(null, {
				status: __redir.permanent ? 308 : 307,
				headers: { Location: __redirDest }
			});
		}
	}
	const isRscRequest = pathname.endsWith(".rsc") || request.headers.get("accept")?.includes("text/x-component");
	let cleanPathname = pathname.replace(/\.rsc$/, "");
	const _scriptNonce = getScriptNonceFromHeaderSources(request.headers, _mwCtx.headers);
	const __postMwReqCtx = __buildPostMwRequestContext(request);
	if (__configRewrites.beforeFiles && __configRewrites.beforeFiles.length) {
		const __rewritten = matchRewrite(cleanPathname, __configRewrites.beforeFiles, __postMwReqCtx);
		if (__rewritten) {
			if (isExternalUrl(__rewritten)) {
				setHeadersContext(null);
				setNavigationContext(null);
				return proxyExternalRequest(request, __rewritten);
			}
			cleanPathname = __rewritten;
		}
	}
	if (cleanPathname === "/_vinext/image") {
		const __imgResult = validateImageUrl(url.searchParams.get("url"), request.url);
		if (__imgResult instanceof Response) return __imgResult;
		return Response.redirect(new URL(__imgResult, url.origin).href, 302);
	}
	for (const metaRoute of metadataRoutes) {
		if (metaRoute.type === "sitemap" && metaRoute.isDynamic && typeof metaRoute.module.generateSitemaps === "function") {
			const sitemapPrefix = metaRoute.servedUrl.slice(0, -4);
			if (cleanPathname.startsWith(sitemapPrefix + "/") && cleanPathname.endsWith(".xml")) {
				const rawId = cleanPathname.slice(sitemapPrefix.length + 1, -4);
				if (rawId.includes("/")) continue;
				const matched = (await metaRoute.module.generateSitemaps()).find(function(s) {
					return String(s.id) === rawId;
				});
				if (!matched) return new Response("Not Found", { status: 404 });
				const result = await metaRoute.module.default({ id: matched.id });
				if (result instanceof Response) return result;
				return new Response(sitemapToXml(result), { headers: { "Content-Type": metaRoute.contentType } });
			}
			continue;
		}
		var _metaParams = null;
		if (metaRoute.patternParts) {
			_metaParams = matchPattern(cleanPathname.split("/").filter(Boolean), metaRoute.patternParts);
			if (!_metaParams) continue;
		} else if (cleanPathname !== metaRoute.servedUrl) continue;
		if (metaRoute.isDynamic) {
			const metaFn = metaRoute.module.default;
			if (typeof metaFn === "function") {
				const result = await metaFn({ params: makeThenableParams(_metaParams || {}) });
				let body;
				if (result instanceof Response) return result;
				if (metaRoute.type === "sitemap") body = sitemapToXml(result);
				else if (metaRoute.type === "robots") body = robotsToText(result);
				else if (metaRoute.type === "manifest") body = manifestToJson(result);
				else body = JSON.stringify(result);
				return new Response(body, { headers: { "Content-Type": metaRoute.contentType } });
			}
		} else try {
			const binary = atob(metaRoute.fileDataBase64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
			return new Response(bytes, { headers: {
				"Content-Type": metaRoute.contentType,
				"Cache-Control": "public, max-age=0, must-revalidate"
			} });
		} catch {
			return new Response("Not Found", { status: 404 });
		}
	}
	if ((request.method === "GET" || request.method === "HEAD") && !pathname.endsWith(".rsc") && __publicFiles.has(cleanPathname)) {
		setHeadersContext(null);
		setNavigationContext(null);
		return __createStaticFileSignal(cleanPathname, _mwCtx);
	}
	setNavigationContext({
		pathname: cleanPathname,
		searchParams: url.searchParams,
		params: {}
	});
	const actionId = request.headers.get("x-rsc-action");
	if (request.method === "POST" && actionId) {
		const csrfResponse = validateCsrfOrigin(request, __allowedOrigins);
		if (csrfResponse) return csrfResponse;
		if (parseInt(request.headers.get("content-length") || "0", 10) > __MAX_ACTION_BODY_SIZE) {
			setHeadersContext(null);
			setNavigationContext(null);
			return new Response("Payload Too Large", { status: 413 });
		}
		try {
			const contentType = request.headers.get("content-type") || "";
			let body;
			try {
				body = contentType.startsWith("multipart/form-data") ? await __readFormDataWithLimit(request, __MAX_ACTION_BODY_SIZE) : await __readBodyWithLimit(request, __MAX_ACTION_BODY_SIZE);
			} catch (sizeErr) {
				if (sizeErr && sizeErr.message === "Request body too large") {
					setHeadersContext(null);
					setNavigationContext(null);
					return new Response("Payload Too Large", { status: 413 });
				}
				throw sizeErr;
			}
			const payloadResponse = await validateServerActionPayload(body);
			if (payloadResponse) {
				setHeadersContext(null);
				setNavigationContext(null);
				return payloadResponse;
			}
			const temporaryReferences = createTemporaryReferenceSet();
			const args = await decodeReply(body, { temporaryReferences });
			const action = await loadServerAction(actionId);
			let returnValue;
			let actionRedirect = null;
			const previousHeadersPhase = setHeadersAccessPhase("action");
			try {
				try {
					returnValue = {
						ok: true,
						data: await action.apply(null, args)
					};
				} catch (e) {
					if (e && typeof e === "object" && "digest" in e) {
						const digest = String(e.digest);
						if (digest.startsWith("NEXT_REDIRECT;")) {
							const parts = digest.split(";");
							actionRedirect = {
								url: decodeURIComponent(parts[2]),
								type: parts[1] || "push",
								status: parts[3] ? parseInt(parts[3], 10) : 307
							};
							returnValue = {
								ok: true,
								data: void 0
							};
						} else if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;")) returnValue = {
							ok: false,
							data: e
						};
						else {
							console.error("[vinext] Server action error:", e);
							returnValue = {
								ok: false,
								data: __sanitizeErrorForClient(e)
							};
						}
					} else {
						console.error("[vinext] Server action error:", e);
						returnValue = {
							ok: false,
							data: __sanitizeErrorForClient(e)
						};
					}
				}
			} finally {
				setHeadersAccessPhase(previousHeadersPhase);
			}
			if (actionRedirect) {
				const actionPendingCookies = getAndClearPendingCookies();
				const actionDraftCookie = getDraftModeCookieHeader();
				setHeadersContext(null);
				setNavigationContext(null);
				const redirectHeaders = new Headers({
					"Content-Type": "text/x-component; charset=utf-8",
					"Vary": "RSC, Accept"
				});
				mergeMiddlewareResponseHeaders(redirectHeaders, _mwCtx.headers);
				redirectHeaders.set("x-action-redirect", actionRedirect.url);
				redirectHeaders.set("x-action-redirect-type", actionRedirect.type);
				redirectHeaders.set("x-action-redirect-status", String(actionRedirect.status));
				for (const cookie of actionPendingCookies) redirectHeaders.append("Set-Cookie", cookie);
				if (actionDraftCookie) redirectHeaders.append("Set-Cookie", actionDraftCookie);
				return new Response("", {
					status: 200,
					headers: redirectHeaders
				});
			}
			const match = matchRoute(cleanPathname);
			let element;
			if (match) {
				const { route: actionRoute, params: actionParams } = match;
				setNavigationContext({
					pathname: cleanPathname,
					searchParams: url.searchParams,
					params: actionParams
				});
				element = await buildPageElement(actionRoute, actionParams, void 0, url.searchParams);
			} else element = (0, import_react_react_server.createElement)("div", null, "Page not found");
			const onRenderError = createRscOnErrorHandler(request, cleanPathname, match ? match.route.pattern : cleanPathname);
			const rscStream = renderToReadableStream({
				root: element,
				returnValue
			}, {
				temporaryReferences,
				onError: onRenderError
			});
			const actionPendingCookies = getAndClearPendingCookies();
			const actionDraftCookie = getDraftModeCookieHeader();
			const actionHeaders = new Headers({
				"Content-Type": "text/x-component; charset=utf-8",
				"Vary": "RSC, Accept"
			});
			mergeMiddlewareResponseHeaders(actionHeaders, _mwCtx.headers);
			if (actionPendingCookies.length > 0 || actionDraftCookie) {
				for (const cookie of actionPendingCookies) actionHeaders.append("Set-Cookie", cookie);
				if (actionDraftCookie) actionHeaders.append("Set-Cookie", actionDraftCookie);
			}
			return new Response(rscStream, {
				status: _mwCtx.status ?? 200,
				headers: actionHeaders
			});
		} catch (err) {
			getAndClearPendingCookies();
			console.error("[vinext] Server action error:", err);
			reportRequestError(err instanceof Error ? err : new Error(String(err)), {
				path: cleanPathname,
				method: request.method,
				headers: Object.fromEntries(request.headers.entries())
			}, {
				routerKind: "App Router",
				routePath: cleanPathname,
				routeType: "action"
			});
			setHeadersContext(null);
			setNavigationContext(null);
			return new Response("Internal Server Error", { status: 500 });
		}
	}
	if (__configRewrites.afterFiles && __configRewrites.afterFiles.length) {
		const __afterRewritten = matchRewrite(cleanPathname, __configRewrites.afterFiles, __postMwReqCtx);
		if (__afterRewritten) {
			if (isExternalUrl(__afterRewritten)) {
				setHeadersContext(null);
				setNavigationContext(null);
				return proxyExternalRequest(request, __afterRewritten);
			}
			cleanPathname = __afterRewritten;
		}
	}
	let match = matchRoute(cleanPathname);
	if (!match && __configRewrites.fallback && __configRewrites.fallback.length) {
		const __fallbackRewritten = matchRewrite(cleanPathname, __configRewrites.fallback, __postMwReqCtx);
		if (__fallbackRewritten) {
			if (isExternalUrl(__fallbackRewritten)) {
				setHeadersContext(null);
				setNavigationContext(null);
				return proxyExternalRequest(request, __fallbackRewritten);
			}
			cleanPathname = __fallbackRewritten;
			match = matchRoute(cleanPathname);
		}
	}
	if (!match) {
		const notFoundResponse = await renderNotFoundPage(null, isRscRequest, request, void 0, _scriptNonce);
		if (notFoundResponse) return notFoundResponse;
		setHeadersContext(null);
		setNavigationContext(null);
		return new Response("Not Found", { status: 404 });
	}
	const { route, params } = match;
	setNavigationContext({
		pathname: cleanPathname,
		searchParams: url.searchParams,
		params
	});
	if (route.routeHandler) {
		const handler = route.routeHandler;
		const method = request.method.toUpperCase();
		const revalidateSeconds = getAppRouteHandlerRevalidateSeconds(handler);
		if (hasAppRouteHandlerDefaultExport(handler) && false);
		const { allowHeaderForOptions, handlerFn, isAutoHead, shouldAutoRespondToOptions } = resolveAppRouteHandlerMethod(handler, method);
		if (shouldAutoRespondToOptions) {
			setHeadersContext(null);
			setNavigationContext(null);
			return applyRouteHandlerMiddlewareContext(new Response(null, {
				status: 204,
				headers: { "Allow": allowHeaderForOptions }
			}), _mwCtx);
		}
		if (shouldReadAppRouteHandlerCache({
			dynamicConfig: handler.dynamic,
			handlerFn,
			isAutoHead,
			isKnownDynamic: isKnownDynamicAppRoute(route.pattern),
			isProduction: true,
			method,
			revalidateSeconds
		})) {
			const __cachedRouteResponse = await readAppRouteHandlerCacheResponse({
				basePath: __basePath,
				buildPageCacheTags: __pageCacheTags,
				cleanPathname,
				clearRequestContext: function() {
					setHeadersContext(null);
					setNavigationContext(null);
				},
				consumeDynamicUsage,
				getCollectedFetchTags,
				handlerFn,
				i18n: __i18nConfig,
				isAutoHead,
				isrDebug: __isrDebug,
				isrGet: __isrGet,
				isrRouteKey: __isrRouteKey,
				isrSet: __isrSet,
				markDynamicUsage,
				middlewareContext: _mwCtx,
				params,
				requestUrl: request.url,
				revalidateSearchParams: url.searchParams,
				revalidateSeconds,
				routePattern: route.pattern,
				runInRevalidationContext: async function(renderFn) {
					await runWithRequestContext(createRequestContext({
						headersContext: {
							headers: new Headers(),
							cookies: /* @__PURE__ */ new Map()
						},
						executionContext: getRequestExecutionContext()
					}), async () => {
						ensureFetchPatch();
						await renderFn();
					});
				},
				scheduleBackgroundRegeneration: __triggerBackgroundRegeneration,
				setNavigationContext
			});
			if (__cachedRouteResponse) return __cachedRouteResponse;
		}
		if (typeof handlerFn === "function") return executeAppRouteHandler({
			basePath: __basePath,
			buildPageCacheTags: __pageCacheTags,
			cleanPathname,
			clearRequestContext: function() {
				setHeadersContext(null);
				setNavigationContext(null);
			},
			consumeDynamicUsage,
			executionContext: getRequestExecutionContext(),
			getAndClearPendingCookies,
			getCollectedFetchTags,
			getDraftModeCookieHeader,
			handler,
			handlerFn,
			i18n: __i18nConfig,
			isAutoHead,
			isProduction: true,
			isrDebug: __isrDebug,
			isrRouteKey: __isrRouteKey,
			isrSet: __isrSet,
			markDynamicUsage,
			method,
			middlewareContext: _mwCtx,
			params: makeThenableParams(params),
			reportRequestError,
			request,
			revalidateSeconds,
			routePattern: route.pattern,
			setHeadersAccessPhase
		});
		setHeadersContext(null);
		setNavigationContext(null);
		return applyRouteHandlerMiddlewareContext(new Response(null, { status: 405 }), _mwCtx);
	}
	const PageComponent = route.page?.default;
	if (!PageComponent) {
		setHeadersContext(null);
		setNavigationContext(null);
		return new Response("Page has no default export", { status: 500 });
	}
	let revalidateSeconds = typeof route.page?.revalidate === "number" ? route.page.revalidate : null;
	const dynamicConfig = route.page?.dynamic;
	const dynamicParamsConfig = route.page?.dynamicParams;
	const isForceStatic = dynamicConfig === "force-static";
	const isDynamicError = dynamicConfig === "error";
	if (isForceStatic) {
		setHeadersContext({
			headers: new Headers(),
			cookies: /* @__PURE__ */ new Map()
		});
		setNavigationContext({
			pathname: cleanPathname,
			searchParams: new URLSearchParams(),
			params
		});
	}
	if (isDynamicError) {
		setHeadersContext({
			headers: new Headers(),
			cookies: /* @__PURE__ */ new Map(),
			accessError: /* @__PURE__ */ new Error("Page with `dynamic = \"error\"` used a dynamic API. This page was expected to be fully static, but headers(), cookies(), or searchParams was accessed. Remove the dynamic API usage or change the dynamic config to \"auto\" or \"force-dynamic\".")
		});
		setNavigationContext({
			pathname: cleanPathname,
			searchParams: new URLSearchParams(),
			params
		});
	}
	const isForceDynamic = dynamicConfig === "force-dynamic";
	if (!isForceDynamic && (isRscRequest || !_scriptNonce) && revalidateSeconds !== null && revalidateSeconds > 0 && revalidateSeconds !== Infinity) {
		const __cachedPageResponse = await readAppPageCacheResponse({
			cleanPathname,
			clearRequestContext: function() {
				setHeadersContext(null);
				setNavigationContext(null);
			},
			isRscRequest,
			isrDebug: __isrDebug,
			isrGet: __isrGet,
			isrHtmlKey: __isrHtmlKey,
			isrRscKey: __isrRscKey,
			isrSet: __isrSet,
			revalidateSeconds,
			renderFreshPageForCache: async function() {
				return runWithRequestContext(createRequestContext({
					headersContext: {
						headers: new Headers(),
						cookies: /* @__PURE__ */ new Map()
					},
					executionContext: getRequestExecutionContext()
				}), async () => {
					ensureFetchPatch();
					setNavigationContext({
						pathname: cleanPathname,
						searchParams: new URLSearchParams(),
						params
					});
					const __revalRscCapture = teeAppPageRscStreamForCapture(renderToReadableStream(await buildPageElement(route, params, void 0, new URLSearchParams()), { onError: createRscOnErrorHandler(request, cleanPathname, route.pattern) }), true);
					const __revalFontData = {
						links: getSSRFontLinks(),
						styles: _getSSRFontStyles(),
						preloads: _getSSRFontPreloads()
					};
					const __revalHtmlStream = await (await import("./ssr/index.js")).handleSsr(__revalRscCapture.responseStream, getNavigationContext(), __revalFontData);
					setHeadersContext(null);
					setNavigationContext(null);
					return {
						html: await readAppPageTextStream(__revalHtmlStream),
						rscData: await __revalRscCapture.capturedRscDataPromise,
						tags: __pageCacheTags(cleanPathname, getCollectedFetchTags())
					};
				});
			},
			scheduleBackgroundRegeneration: __triggerBackgroundRegeneration
		});
		if (__cachedPageResponse) return __cachedPageResponse;
	}
	const __dynamicParamsResponse = await validateAppPageDynamicParams({
		clearRequestContext() {
			setHeadersContext(null);
			setNavigationContext(null);
		},
		enforceStaticParamsOnly: dynamicParamsConfig === false,
		generateStaticParams: route.page?.generateStaticParams,
		isDynamicRoute: route.isDynamic,
		logGenerateStaticParamsError(err) {
			console.error("[vinext] generateStaticParams error:", err);
		},
		params
	});
	if (__dynamicParamsResponse) return __dynamicParamsResponse;
	const __interceptResult = await resolveAppPageIntercept({
		buildPageElement,
		cleanPathname,
		currentRoute: route,
		findIntercept,
		getRoutePattern(sourceRoute) {
			return sourceRoute.pattern;
		},
		getSourceRoute(sourceRouteIndex) {
			return routes[sourceRouteIndex];
		},
		isRscRequest,
		matchSourceRouteParams(pattern) {
			const patternParts = pattern.split("/").filter(Boolean);
			const urlParts = cleanPathname.split("/").filter(Boolean);
			const params = Object.create(null);
			for (let i = 0; i < patternParts.length; i++) {
				const pp = patternParts[i];
				if (pp.endsWith("+") || pp.endsWith("*")) {
					params[pp.slice(1, -1)] = urlParts.slice(i);
					break;
				}
				if (i >= urlParts.length) break;
				if (pp.startsWith(":")) params[pp.slice(1)] = urlParts[i];
				else if (pp !== urlParts[i]) break;
			}
			return params;
		},
		renderInterceptResponse(sourceRoute, interceptElement) {
			const interceptStream = renderToReadableStream(interceptElement, { onError: createRscOnErrorHandler(request, cleanPathname, sourceRoute.pattern) });
			const interceptHeaders = new Headers({
				"Content-Type": "text/x-component; charset=utf-8",
				"Vary": "RSC, Accept"
			});
			mergeMiddlewareResponseHeaders(interceptHeaders, _mwCtx.headers);
			return new Response(interceptStream, {
				status: _mwCtx.status ?? 200,
				headers: interceptHeaders
			});
		},
		searchParams: url.searchParams,
		setNavigationContext,
		toInterceptOpts(intercept) {
			return {
				interceptSlot: intercept.slotName,
				interceptPage: intercept.page,
				interceptParams: intercept.matchedParams
			};
		}
	});
	if (__interceptResult.response) return __interceptResult.response;
	const interceptOpts = __interceptResult.interceptOpts;
	const __pageBuildResult = await buildAppPageElement({
		buildPageElement() {
			return buildPageElement(route, params, interceptOpts, url.searchParams);
		},
		renderErrorBoundaryPage(buildErr) {
			return renderErrorBoundaryPage(route, buildErr, isRscRequest, request, params, _scriptNonce);
		},
		renderSpecialError(__buildSpecialError) {
			return buildAppPageSpecialErrorResponse({
				clearRequestContext() {
					setHeadersContext(null);
					setNavigationContext(null);
				},
				renderFallbackPage(statusCode) {
					return renderHTTPAccessFallbackPage(route, statusCode, isRscRequest, request, { matchedParams: params }, _scriptNonce);
				},
				requestUrl: request.url,
				specialError: __buildSpecialError
			});
		},
		resolveSpecialError: resolveAppPageSpecialError
	});
	if (__pageBuildResult.response) return __pageBuildResult.response;
	const element = __pageBuildResult.element;
	const _hasLoadingBoundary = !!(route.loading && route.loading.default);
	const _asyncLayoutParams = makeThenableParams(params);
	const _probeSearchObj = {};
	url.searchParams.forEach(function(v, k) {
		if (k in _probeSearchObj) _probeSearchObj[k] = Array.isArray(_probeSearchObj[k]) ? _probeSearchObj[k].concat(v) : [_probeSearchObj[k], v];
		else _probeSearchObj[k] = v;
	});
	const _asyncSearchParams = makeThenableParams(_probeSearchObj);
	return renderAppPageLifecycle({
		cleanPathname,
		clearRequestContext() {
			setHeadersContext(null);
			setNavigationContext(null);
		},
		consumeDynamicUsage,
		createRscOnErrorHandler(pathname, routePath) {
			return createRscOnErrorHandler(request, pathname, routePath);
		},
		element,
		getDraftModeCookieHeader,
		getFontLinks: getSSRFontLinks,
		getFontPreloads: _getSSRFontPreloads,
		getFontStyles: _getSSRFontStyles,
		getNavigationContext,
		getPageTags() {
			return __pageCacheTags(cleanPathname, getCollectedFetchTags());
		},
		getRequestCacheLife() {
			return _consumeRequestScopedCacheLife();
		},
		handlerStart: __reqStart,
		hasLoadingBoundary: _hasLoadingBoundary,
		isDynamicError,
		isForceDynamic,
		isForceStatic,
		isProduction: true,
		isRscRequest,
		isrDebug: __isrDebug,
		isrHtmlKey: __isrHtmlKey,
		isrRscKey: __isrRscKey,
		isrSet: __isrSet,
		layoutCount: route.layouts?.length ?? 0,
		loadSsrHandler() {
			return import("./ssr/index.js");
		},
		middlewareContext: _mwCtx,
		params,
		probeLayoutAt(li) {
			const LayoutComp = route.layouts[li]?.default;
			if (!LayoutComp) return null;
			return LayoutComp({
				params: _asyncLayoutParams,
				children: null
			});
		},
		probePage() {
			return PageComponent({
				params: _asyncLayoutParams,
				searchParams: _asyncSearchParams
			});
		},
		revalidateSeconds,
		renderErrorBoundaryResponse(renderErr) {
			return renderErrorBoundaryPage(route, renderErr, isRscRequest, request, params, _scriptNonce);
		},
		async renderLayoutSpecialError(__layoutSpecialError, li) {
			return buildAppPageSpecialErrorResponse({
				clearRequestContext() {
					setHeadersContext(null);
					setNavigationContext(null);
				},
				renderFallbackPage(statusCode) {
					let parentNotFound = null;
					if (route.notFounds) {
						for (let pi = li - 1; pi >= 0; pi--) if (route.notFounds[pi]?.default) {
							parentNotFound = route.notFounds[pi].default;
							break;
						}
					}
					if (!parentNotFound) parentNotFound = NotFound;
					const parentLayouts = route.layouts.slice(0, li);
					return renderHTTPAccessFallbackPage(route, statusCode, isRscRequest, request, {
						boundaryComponent: parentNotFound,
						layouts: parentLayouts,
						matchedParams: params
					}, _scriptNonce);
				},
				requestUrl: request.url,
				specialError: __layoutSpecialError
			});
		},
		async renderPageSpecialError(specialError) {
			return buildAppPageSpecialErrorResponse({
				clearRequestContext() {
					setHeadersContext(null);
					setNavigationContext(null);
				},
				renderFallbackPage(statusCode) {
					return renderHTTPAccessFallbackPage(route, statusCode, isRscRequest, request, { matchedParams: params }, _scriptNonce);
				},
				requestUrl: request.url,
				specialError
			});
		},
		renderToReadableStream,
		routeHasLocalBoundary: !!route?.error?.default || !!(route?.errors && route.errors.some(function(e) {
			return e?.default;
		})),
		routePattern: route.pattern,
		runWithSuppressedHookWarning(probe) {
			return _suppressHookWarningAls.run(true, probe);
		},
		scriptNonce: _scriptNonce,
		waitUntil(__cachePromise) {
			getRequestExecutionContext()?.waitUntil(__cachePromise);
		}
	});
}
//#endregion
export { handler as default, generateStaticParamsMap };

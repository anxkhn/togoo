import { n as __commonJSMin, r as __toESM, t as require_react } from "./react-BTme1M8l.js";
import { i as withBasePath, n as toBrowserNavigationHref, r as toSameOriginAppPath, t as resolveRelativeHref } from "./url-utils-FXwuJ3Kt.js";
import { a as toRscUrl, c as useRouter, i as prefetchRscResponse, n as getPrefetchedUrls, o as useParams, r as navigateClientSide, s as usePathname, t as getLayoutSegmentContext } from "../index.js";
import { a as getDomainLocaleUrl, i as addLocalePrefix, n as appendSearchParamsToUrl, r as urlQueryToSearchParams } from "./query-DX6Sk62_.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTimeZones } from "@vvo/tzdb";
import { fromZonedTime } from "date-fns-tz";
//#region node_modules/vinext/dist/shims/url-safety.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Shared URL safety utilities for Link, Form, and navigation shims.
*
* Centralizes dangerous URI scheme detection so all components and
* navigation functions use the same validation logic.
*/
/**
* Detect dangerous URI schemes that should never be navigated to.
*
* Adapted from Next.js's javascript URL detector:
* packages/next/src/client/lib/javascript-url.ts
* https://github.com/vercel/next.js/blob/canary/packages/next/src/client/lib/javascript-url.ts
*
* URL parsing ignores leading C0 control characters / spaces, and treats
* embedded tab/newline characters in the scheme as insignificant. We mirror
* that behavior here so obfuscated values like `java\nscript:` and
* `\x00javascript:` are still blocked.
*
* Vinext intentionally extends this handling to `data:` and `vbscript:` too,
* since both are also dangerous navigation targets.
*/
var LEADING_IGNORED = "[\\u0000-\\u001F \\u200B\\uFEFF]*";
var SCHEME_IGNORED = "[\\r\\n\\t]*";
function buildDangerousSchemeRegex(scheme) {
	const chars = scheme.split("").join(SCHEME_IGNORED);
	return new RegExp(`^${LEADING_IGNORED}${chars}${SCHEME_IGNORED}:`, "i");
}
var DANGEROUS_SCHEME_RES = [
	buildDangerousSchemeRegex("javascript"),
	buildDangerousSchemeRegex("data"),
	buildDangerousSchemeRegex("vbscript")
];
function isDangerousScheme(url) {
	const str = "" + url;
	return DANGEROUS_SCHEME_RES.some((re) => re.test(str));
}
//#endregion
//#region node_modules/vinext/dist/shims/i18n-context.js
var _getI18nContext = () => {
	if (globalThis.__VINEXT_DEFAULT_LOCALE__ == null && globalThis.__VINEXT_LOCALE__ == null) return null;
	return {
		locale: globalThis.__VINEXT_LOCALE__,
		locales: globalThis.__VINEXT_LOCALES__,
		defaultLocale: globalThis.__VINEXT_DEFAULT_LOCALE__,
		domainLocales: globalThis.__VINEXT_DOMAIN_LOCALES__,
		hostname: globalThis.__VINEXT_HOSTNAME__
	};
};
function getI18nContext() {
	return _getI18nContext();
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
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
//#region node_modules/vinext/dist/shims/link.js
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
})))();
/**
* next/link shim
*
* Renders an <a> tag with client-side navigation support.
* On click, prevents full page reload and triggers client-side
* page swap via the router's navigation system.
*/
var LinkStatusContext = (0, import_react.createContext)({ pending: false });
/** basePath from next.config.js, injected by the plugin at build time */
var __basePath = "";
function resolveHref(href) {
	if (typeof href === "string") return href;
	let url = href.pathname ?? "/";
	if (href.query) {
		const params = urlQueryToSearchParams(href.query);
		url = appendSearchParamsToUrl(url, params);
	}
	return url;
}
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
function prefetchUrl(href) {
	if (typeof window === "undefined") return;
	let prefetchHref = href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) {
		const localPath = toSameOriginAppPath(href, __basePath);
		if (localPath == null) return;
		prefetchHref = localPath;
	}
	const fullHref = toBrowserNavigationHref(prefetchHref, window.location.href, __basePath);
	const rscUrl = toRscUrl(fullHref);
	const prefetched = getPrefetchedUrls();
	if (prefetched.has(rscUrl)) return;
	prefetched.add(rscUrl);
	(window.requestIdleCallback ?? ((fn) => setTimeout(fn, 100)))(() => {
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") prefetchRscResponse(rscUrl, fetch(rscUrl, {
			headers: { Accept: "text/x-component" },
			credentials: "include",
			priority: "low",
			purpose: "prefetch"
		}));
		else if (window.__NEXT_DATA__?.__vinext?.pageModuleUrl) {
			const link = document.createElement("link");
			link.rel = "prefetch";
			link.href = fullHref;
			link.as = "document";
			document.head.appendChild(link);
		}
	});
}
/**
* Shared IntersectionObserver for viewport-based prefetching.
* All Link elements use the same observer to minimize resource usage.
*/
var sharedObserver = null;
var observerCallbacks = /* @__PURE__ */ new WeakMap();
function getSharedObserver() {
	if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
	if (sharedObserver) return sharedObserver;
	sharedObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			const callback = observerCallbacks.get(entry.target);
			if (callback) {
				callback();
				sharedObserver?.unobserve(entry.target);
				observerCallbacks.delete(entry.target);
			}
		}
	}, { rootMargin: "250px" });
	return sharedObserver;
}
function getDefaultLocale() {
	if (typeof window !== "undefined") return window.__VINEXT_DEFAULT_LOCALE__;
	return getI18nContext()?.defaultLocale;
}
function getDomainLocales() {
	if (typeof window !== "undefined") return window.__NEXT_DATA__?.domainLocales;
	return getI18nContext()?.domainLocales;
}
function getCurrentHostname() {
	if (typeof window !== "undefined") return window.location.hostname;
	return getI18nContext()?.hostname;
}
function getDomainLocaleHref(href, locale) {
	return getDomainLocaleUrl(href, locale, {
		basePath: __basePath,
		currentHostname: getCurrentHostname(),
		domainItems: getDomainLocales()
	});
}
/**
* Apply locale prefix to a URL path based on the locale prop.
* - locale="fr" → prepend /fr (unless it already has a locale prefix)
* - locale={false} → use the href as-is (no locale prefix, link to default)
* - locale=undefined → use current locale (href as-is in most cases)
*/
function applyLocaleToHref(href, locale) {
	if (locale === false) return href;
	if (locale === void 0) return href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return href;
	const domainLocaleHref = getDomainLocaleHref(href, locale);
	if (domainLocaleHref) return domainLocaleHref;
	return addLocalePrefix(href, locale, getDefaultLocale() ?? "");
}
var Link = (0, import_react.forwardRef)(function Link({ href, as, replace = false, prefetch: prefetchProp, scroll = true, children, onClick, onNavigate, ...rest }, forwardedRef) {
	const { locale, ...restWithoutLocale } = rest;
	const resolvedHref = as ?? resolveHref(href);
	const isDangerous = typeof resolvedHref === "string" && isDangerousScheme(resolvedHref);
	const localizedHref = applyLocaleToHref(isDangerous ? "/" : resolvedHref, locale);
	const fullHref = withBasePath(localizedHref, __basePath);
	const [pending, setPending] = (0, import_react.useState)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const internalRef = (0, import_react.useRef)(null);
	const shouldPrefetch = prefetchProp !== false && !isDangerous;
	const setRefs = (0, import_react.useCallback)((node) => {
		internalRef.current = node;
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef) forwardedRef.current = node;
	}, [forwardedRef]);
	(0, import_react.useEffect)(() => {
		if (!shouldPrefetch || typeof window === "undefined") return;
		const node = internalRef.current;
		if (!node) return;
		let hrefToPrefetch = localizedHref;
		if (localizedHref.startsWith("http://") || localizedHref.startsWith("https://") || localizedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(localizedHref, __basePath);
			if (localPath == null) return;
			hrefToPrefetch = localPath;
		}
		const observer = getSharedObserver();
		if (!observer) return;
		observerCallbacks.set(node, () => prefetchUrl(hrefToPrefetch));
		observer.observe(node);
		return () => {
			observer.unobserve(node);
			observerCallbacks.delete(node);
		};
	}, [shouldPrefetch, localizedHref]);
	const handleClick = async (e) => {
		if (onClick) onClick(e);
		if (e.defaultPrevented) return;
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		if (e.currentTarget.target && e.currentTarget.target !== "_self") return;
		let navigateHref = localizedHref;
		if (resolvedHref.startsWith("http://") || resolvedHref.startsWith("https://") || resolvedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(resolvedHref, __basePath);
			if (localPath == null) return;
			navigateHref = localPath;
		}
		e.preventDefault();
		const absoluteHref = resolveRelativeHref(navigateHref, window.location.href, __basePath);
		const absoluteFullHref = toBrowserNavigationHref(navigateHref, window.location.href, __basePath);
		if (onNavigate) try {
			const navUrl = new URL(absoluteFullHref, window.location.origin);
			let prevented = false;
			const navEvent = {
				url: navUrl,
				preventDefault() {
					prevented = true;
				},
				get defaultPrevented() {
					return prevented;
				}
			};
			onNavigate(navEvent);
			if (navEvent.defaultPrevented) return;
		} catch {}
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
			setPending(true);
			try {
				await navigateClientSide(navigateHref, replace ? "replace" : "push", scroll);
			} finally {
				if (mountedRef.current) setPending(false);
			}
		} else try {
			const Router = (await import("./router-cRrBmxp1.js")).default;
			if (replace) await Router.replace(absoluteHref, void 0, { scroll });
			else await Router.push(absoluteHref, void 0, { scroll });
		} catch {
			if (replace) window.history.replaceState({}, "", absoluteFullHref);
			else window.history.pushState({}, "", absoluteFullHref);
			window.dispatchEvent(new PopStateEvent("popstate"));
		}
	};
	const { passHref: _p, ...anchorProps } = restWithoutLocale;
	const linkStatusValue = import_react.useMemo(() => ({ pending }), [pending]);
	if (isDangerous) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...anchorProps,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkStatusContext.Provider, {
		value: linkStatusValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			ref: setRefs,
			href: fullHref,
			onClick: handleClick,
			...anchorProps,
			children
		})
	});
});
//#endregion
//#region node_modules/qrcode.react/lib/esm/index.js
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __objRest = (source, exclude) => {
	var target = {};
	for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
	if (source != null && __getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(source)) if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
	}
	return target;
};
/**
* @license QR Code generator library (TypeScript)
* Copyright (c) Project Nayuki.
* SPDX-License-Identifier: MIT
*/
var qrcodegen;
((qrcodegen2) => {
	const _QrCode = class _QrCode {
		constructor(version, errorCorrectionLevel, dataCodewords, msk) {
			this.version = version;
			this.errorCorrectionLevel = errorCorrectionLevel;
			this.modules = [];
			this.isFunction = [];
			if (version < _QrCode.MIN_VERSION || version > _QrCode.MAX_VERSION) throw new RangeError("Version value out of range");
			if (msk < -1 || msk > 7) throw new RangeError("Mask value out of range");
			this.size = version * 4 + 17;
			let row = [];
			for (let i = 0; i < this.size; i++) row.push(false);
			for (let i = 0; i < this.size; i++) {
				this.modules.push(row.slice());
				this.isFunction.push(row.slice());
			}
			this.drawFunctionPatterns();
			const allCodewords = this.addEccAndInterleave(dataCodewords);
			this.drawCodewords(allCodewords);
			if (msk == -1) {
				let minPenalty = 1e9;
				for (let i = 0; i < 8; i++) {
					this.applyMask(i);
					this.drawFormatBits(i);
					const penalty = this.getPenaltyScore();
					if (penalty < minPenalty) {
						msk = i;
						minPenalty = penalty;
					}
					this.applyMask(i);
				}
			}
			assert(0 <= msk && msk <= 7);
			this.mask = msk;
			this.applyMask(msk);
			this.drawFormatBits(msk);
			this.isFunction = [];
		}
		static encodeText(text, ecl) {
			const segs = qrcodegen2.QrSegment.makeSegments(text);
			return _QrCode.encodeSegments(segs, ecl);
		}
		static encodeBinary(data, ecl) {
			const seg = qrcodegen2.QrSegment.makeBytes(data);
			return _QrCode.encodeSegments([seg], ecl);
		}
		static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
			if (!(_QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= _QrCode.MAX_VERSION) || mask < -1 || mask > 7) throw new RangeError("Invalid value");
			let version;
			let dataUsedBits;
			for (version = minVersion;; version++) {
				const dataCapacityBits2 = _QrCode.getNumDataCodewords(version, ecl) * 8;
				const usedBits = QrSegment.getTotalBits(segs, version);
				if (usedBits <= dataCapacityBits2) {
					dataUsedBits = usedBits;
					break;
				}
				if (version >= maxVersion) throw new RangeError("Data too long");
			}
			for (const newEcl of [
				_QrCode.Ecc.MEDIUM,
				_QrCode.Ecc.QUARTILE,
				_QrCode.Ecc.HIGH
			]) if (boostEcl && dataUsedBits <= _QrCode.getNumDataCodewords(version, newEcl) * 8) ecl = newEcl;
			let bb = [];
			for (const seg of segs) {
				appendBits(seg.mode.modeBits, 4, bb);
				appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
				for (const b of seg.getData()) bb.push(b);
			}
			assert(bb.length == dataUsedBits);
			const dataCapacityBits = _QrCode.getNumDataCodewords(version, ecl) * 8;
			assert(bb.length <= dataCapacityBits);
			appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
			appendBits(0, (8 - bb.length % 8) % 8, bb);
			assert(bb.length % 8 == 0);
			for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 253) appendBits(padByte, 8, bb);
			let dataCodewords = [];
			while (dataCodewords.length * 8 < bb.length) dataCodewords.push(0);
			bb.forEach((b, i) => dataCodewords[i >>> 3] |= b << 7 - (i & 7));
			return new _QrCode(version, ecl, dataCodewords, mask);
		}
		getModule(x, y) {
			return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
		}
		getModules() {
			return this.modules;
		}
		drawFunctionPatterns() {
			for (let i = 0; i < this.size; i++) {
				this.setFunctionModule(6, i, i % 2 == 0);
				this.setFunctionModule(i, 6, i % 2 == 0);
			}
			this.drawFinderPattern(3, 3);
			this.drawFinderPattern(this.size - 4, 3);
			this.drawFinderPattern(3, this.size - 4);
			const alignPatPos = this.getAlignmentPatternPositions();
			const numAlign = alignPatPos.length;
			for (let i = 0; i < numAlign; i++) for (let j = 0; j < numAlign; j++) if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0)) this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
			this.drawFormatBits(0);
			this.drawVersion();
		}
		drawFormatBits(mask) {
			const data = this.errorCorrectionLevel.formatBits << 3 | mask;
			let rem = data;
			for (let i = 0; i < 10; i++) rem = rem << 1 ^ (rem >>> 9) * 1335;
			const bits = (data << 10 | rem) ^ 21522;
			assert(bits >>> 15 == 0);
			for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i));
			this.setFunctionModule(8, 7, getBit(bits, 6));
			this.setFunctionModule(8, 8, getBit(bits, 7));
			this.setFunctionModule(7, 8, getBit(bits, 8));
			for (let i = 9; i < 15; i++) this.setFunctionModule(14 - i, 8, getBit(bits, i));
			for (let i = 0; i < 8; i++) this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
			for (let i = 8; i < 15; i++) this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
			this.setFunctionModule(8, this.size - 8, true);
		}
		drawVersion() {
			if (this.version < 7) return;
			let rem = this.version;
			for (let i = 0; i < 12; i++) rem = rem << 1 ^ (rem >>> 11) * 7973;
			const bits = this.version << 12 | rem;
			assert(bits >>> 18 == 0);
			for (let i = 0; i < 18; i++) {
				const color = getBit(bits, i);
				const a = this.size - 11 + i % 3;
				const b = Math.floor(i / 3);
				this.setFunctionModule(a, b, color);
				this.setFunctionModule(b, a, color);
			}
		}
		drawFinderPattern(x, y) {
			for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
				const dist = Math.max(Math.abs(dx), Math.abs(dy));
				const xx = x + dx;
				const yy = y + dy;
				if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
			}
		}
		drawAlignmentPattern(x, y) {
			for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
		}
		setFunctionModule(x, y, isDark) {
			this.modules[y][x] = isDark;
			this.isFunction[y][x] = true;
		}
		addEccAndInterleave(data) {
			const ver = this.version;
			const ecl = this.errorCorrectionLevel;
			if (data.length != _QrCode.getNumDataCodewords(ver, ecl)) throw new RangeError("Invalid argument");
			const numBlocks = _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
			const blockEccLen = _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
			const rawCodewords = Math.floor(_QrCode.getNumRawDataModules(ver) / 8);
			const numShortBlocks = numBlocks - rawCodewords % numBlocks;
			const shortBlockLen = Math.floor(rawCodewords / numBlocks);
			let blocks = [];
			const rsDiv = _QrCode.reedSolomonComputeDivisor(blockEccLen);
			for (let i = 0, k = 0; i < numBlocks; i++) {
				let dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
				k += dat.length;
				const ecc = _QrCode.reedSolomonComputeRemainder(dat, rsDiv);
				if (i < numShortBlocks) dat.push(0);
				blocks.push(dat.concat(ecc));
			}
			let result = [];
			for (let i = 0; i < blocks[0].length; i++) blocks.forEach((block, j) => {
				if (i != shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
			});
			assert(result.length == rawCodewords);
			return result;
		}
		drawCodewords(data) {
			if (data.length != Math.floor(_QrCode.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
			let i = 0;
			for (let right = this.size - 1; right >= 1; right -= 2) {
				if (right == 6) right = 5;
				for (let vert = 0; vert < this.size; vert++) for (let j = 0; j < 2; j++) {
					const x = right - j;
					const y = (right + 1 & 2) == 0 ? this.size - 1 - vert : vert;
					if (!this.isFunction[y][x] && i < data.length * 8) {
						this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
						i++;
					}
				}
			}
			assert(i == data.length * 8);
		}
		applyMask(mask) {
			if (mask < 0 || mask > 7) throw new RangeError("Mask value out of range");
			for (let y = 0; y < this.size; y++) for (let x = 0; x < this.size; x++) {
				let invert;
				switch (mask) {
					case 0:
						invert = (x + y) % 2 == 0;
						break;
					case 1:
						invert = y % 2 == 0;
						break;
					case 2:
						invert = x % 3 == 0;
						break;
					case 3:
						invert = (x + y) % 3 == 0;
						break;
					case 4:
						invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
						break;
					case 5:
						invert = x * y % 2 + x * y % 3 == 0;
						break;
					case 6:
						invert = (x * y % 2 + x * y % 3) % 2 == 0;
						break;
					case 7:
						invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
						break;
					default: throw new Error("Unreachable");
				}
				if (!this.isFunction[y][x] && invert) this.modules[y][x] = !this.modules[y][x];
			}
		}
		getPenaltyScore() {
			let result = 0;
			for (let y = 0; y < this.size; y++) {
				let runColor = false;
				let runX = 0;
				let runHistory = [
					0,
					0,
					0,
					0,
					0,
					0,
					0
				];
				for (let x = 0; x < this.size; x++) if (this.modules[y][x] == runColor) {
					runX++;
					if (runX == 5) result += _QrCode.PENALTY_N1;
					else if (runX > 5) result++;
				} else {
					this.finderPenaltyAddHistory(runX, runHistory);
					if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
					runColor = this.modules[y][x];
					runX = 1;
				}
				result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * _QrCode.PENALTY_N3;
			}
			for (let x = 0; x < this.size; x++) {
				let runColor = false;
				let runY = 0;
				let runHistory = [
					0,
					0,
					0,
					0,
					0,
					0,
					0
				];
				for (let y = 0; y < this.size; y++) if (this.modules[y][x] == runColor) {
					runY++;
					if (runY == 5) result += _QrCode.PENALTY_N1;
					else if (runY > 5) result++;
				} else {
					this.finderPenaltyAddHistory(runY, runHistory);
					if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
					runColor = this.modules[y][x];
					runY = 1;
				}
				result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * _QrCode.PENALTY_N3;
			}
			for (let y = 0; y < this.size - 1; y++) for (let x = 0; x < this.size - 1; x++) {
				const color = this.modules[y][x];
				if (color == this.modules[y][x + 1] && color == this.modules[y + 1][x] && color == this.modules[y + 1][x + 1]) result += _QrCode.PENALTY_N2;
			}
			let dark = 0;
			for (const row of this.modules) dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
			const total = this.size * this.size;
			const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
			assert(0 <= k && k <= 9);
			result += k * _QrCode.PENALTY_N4;
			assert(0 <= result && result <= 2568888);
			return result;
		}
		getAlignmentPatternPositions() {
			if (this.version == 1) return [];
			else {
				const numAlign = Math.floor(this.version / 7) + 2;
				const step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
				let result = [6];
				for (let pos = this.size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
				return result;
			}
		}
		static getNumRawDataModules(ver) {
			if (ver < _QrCode.MIN_VERSION || ver > _QrCode.MAX_VERSION) throw new RangeError("Version number out of range");
			let result = (16 * ver + 128) * ver + 64;
			if (ver >= 2) {
				const numAlign = Math.floor(ver / 7) + 2;
				result -= (25 * numAlign - 10) * numAlign - 55;
				if (ver >= 7) result -= 36;
			}
			assert(208 <= result && result <= 29648);
			return result;
		}
		static getNumDataCodewords(ver, ecl) {
			return Math.floor(_QrCode.getNumRawDataModules(ver) / 8) - _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
		}
		static reedSolomonComputeDivisor(degree) {
			if (degree < 1 || degree > 255) throw new RangeError("Degree out of range");
			let result = [];
			for (let i = 0; i < degree - 1; i++) result.push(0);
			result.push(1);
			let root = 1;
			for (let i = 0; i < degree; i++) {
				for (let j = 0; j < result.length; j++) {
					result[j] = _QrCode.reedSolomonMultiply(result[j], root);
					if (j + 1 < result.length) result[j] ^= result[j + 1];
				}
				root = _QrCode.reedSolomonMultiply(root, 2);
			}
			return result;
		}
		static reedSolomonComputeRemainder(data, divisor) {
			let result = divisor.map((_) => 0);
			for (const b of data) {
				const factor = b ^ result.shift();
				result.push(0);
				divisor.forEach((coef, i) => result[i] ^= _QrCode.reedSolomonMultiply(coef, factor));
			}
			return result;
		}
		static reedSolomonMultiply(x, y) {
			if (x >>> 8 != 0 || y >>> 8 != 0) throw new RangeError("Byte out of range");
			let z = 0;
			for (let i = 7; i >= 0; i--) {
				z = z << 1 ^ (z >>> 7) * 285;
				z ^= (y >>> i & 1) * x;
			}
			assert(z >>> 8 == 0);
			return z;
		}
		finderPenaltyCountPatterns(runHistory) {
			const n = runHistory[1];
			assert(n <= this.size * 3);
			const core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
			return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
		}
		finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
			if (currentRunColor) {
				this.finderPenaltyAddHistory(currentRunLength, runHistory);
				currentRunLength = 0;
			}
			currentRunLength += this.size;
			this.finderPenaltyAddHistory(currentRunLength, runHistory);
			return this.finderPenaltyCountPatterns(runHistory);
		}
		finderPenaltyAddHistory(currentRunLength, runHistory) {
			if (runHistory[0] == 0) currentRunLength += this.size;
			runHistory.pop();
			runHistory.unshift(currentRunLength);
		}
	};
	_QrCode.MIN_VERSION = 1;
	_QrCode.MAX_VERSION = 40;
	_QrCode.PENALTY_N1 = 3;
	_QrCode.PENALTY_N2 = 3;
	_QrCode.PENALTY_N3 = 40;
	_QrCode.PENALTY_N4 = 10;
	_QrCode.ECC_CODEWORDS_PER_BLOCK = [
		[
			-1,
			7,
			10,
			15,
			20,
			26,
			18,
			20,
			24,
			30,
			18,
			20,
			24,
			26,
			30,
			22,
			24,
			28,
			30,
			28,
			28,
			28,
			28,
			30,
			30,
			26,
			28,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30
		],
		[
			-1,
			10,
			16,
			26,
			18,
			24,
			16,
			18,
			22,
			22,
			26,
			30,
			22,
			22,
			24,
			24,
			28,
			28,
			26,
			26,
			26,
			26,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28,
			28
		],
		[
			-1,
			13,
			22,
			18,
			26,
			18,
			24,
			18,
			22,
			20,
			24,
			28,
			26,
			24,
			20,
			30,
			24,
			28,
			28,
			26,
			30,
			28,
			30,
			30,
			30,
			30,
			28,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30
		],
		[
			-1,
			17,
			28,
			22,
			16,
			22,
			28,
			26,
			26,
			24,
			28,
			24,
			28,
			22,
			24,
			24,
			30,
			28,
			28,
			26,
			28,
			30,
			24,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30,
			30
		]
	];
	_QrCode.NUM_ERROR_CORRECTION_BLOCKS = [
		[
			-1,
			1,
			1,
			1,
			1,
			1,
			2,
			2,
			2,
			2,
			4,
			4,
			4,
			4,
			4,
			6,
			6,
			6,
			6,
			7,
			8,
			8,
			9,
			9,
			10,
			12,
			12,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			19,
			20,
			21,
			22,
			24,
			25
		],
		[
			-1,
			1,
			1,
			1,
			2,
			2,
			4,
			4,
			4,
			5,
			5,
			5,
			8,
			9,
			9,
			10,
			10,
			11,
			13,
			14,
			16,
			17,
			17,
			18,
			20,
			21,
			23,
			25,
			26,
			28,
			29,
			31,
			33,
			35,
			37,
			38,
			40,
			43,
			45,
			47,
			49
		],
		[
			-1,
			1,
			1,
			2,
			2,
			4,
			4,
			6,
			6,
			8,
			8,
			8,
			10,
			12,
			16,
			12,
			17,
			16,
			18,
			21,
			20,
			23,
			23,
			25,
			27,
			29,
			34,
			34,
			35,
			38,
			40,
			43,
			45,
			48,
			51,
			53,
			56,
			59,
			62,
			65,
			68
		],
		[
			-1,
			1,
			1,
			2,
			4,
			4,
			4,
			5,
			6,
			8,
			8,
			11,
			11,
			16,
			16,
			18,
			16,
			19,
			21,
			25,
			25,
			25,
			34,
			30,
			32,
			35,
			37,
			40,
			42,
			45,
			48,
			51,
			54,
			57,
			60,
			63,
			66,
			70,
			74,
			77,
			81
		]
	];
	qrcodegen2.QrCode = _QrCode;
	function appendBits(val, len, bb) {
		if (len < 0 || len > 31 || val >>> len != 0) throw new RangeError("Value out of range");
		for (let i = len - 1; i >= 0; i--) bb.push(val >>> i & 1);
	}
	function getBit(x, i) {
		return (x >>> i & 1) != 0;
	}
	function assert(cond) {
		if (!cond) throw new Error("Assertion error");
	}
	const _QrSegment = class _QrSegment {
		constructor(mode, numChars, bitData) {
			this.mode = mode;
			this.numChars = numChars;
			this.bitData = bitData;
			if (numChars < 0) throw new RangeError("Invalid argument");
			this.bitData = bitData.slice();
		}
		static makeBytes(data) {
			let bb = [];
			for (const b of data) appendBits(b, 8, bb);
			return new _QrSegment(_QrSegment.Mode.BYTE, data.length, bb);
		}
		static makeNumeric(digits) {
			if (!_QrSegment.isNumeric(digits)) throw new RangeError("String contains non-numeric characters");
			let bb = [];
			for (let i = 0; i < digits.length;) {
				const n = Math.min(digits.length - i, 3);
				appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
				i += n;
			}
			return new _QrSegment(_QrSegment.Mode.NUMERIC, digits.length, bb);
		}
		static makeAlphanumeric(text) {
			if (!_QrSegment.isAlphanumeric(text)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
			let bb = [];
			let i;
			for (i = 0; i + 2 <= text.length; i += 2) {
				let temp = _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
				temp += _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
				appendBits(temp, 11, bb);
			}
			if (i < text.length) appendBits(_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
			return new _QrSegment(_QrSegment.Mode.ALPHANUMERIC, text.length, bb);
		}
		static makeSegments(text) {
			if (text == "") return [];
			else if (_QrSegment.isNumeric(text)) return [_QrSegment.makeNumeric(text)];
			else if (_QrSegment.isAlphanumeric(text)) return [_QrSegment.makeAlphanumeric(text)];
			else return [_QrSegment.makeBytes(_QrSegment.toUtf8ByteArray(text))];
		}
		static makeEci(assignVal) {
			let bb = [];
			if (assignVal < 0) throw new RangeError("ECI assignment value out of range");
			else if (assignVal < 128) appendBits(assignVal, 8, bb);
			else if (assignVal < 16384) {
				appendBits(2, 2, bb);
				appendBits(assignVal, 14, bb);
			} else if (assignVal < 1e6) {
				appendBits(6, 3, bb);
				appendBits(assignVal, 21, bb);
			} else throw new RangeError("ECI assignment value out of range");
			return new _QrSegment(_QrSegment.Mode.ECI, 0, bb);
		}
		static isNumeric(text) {
			return _QrSegment.NUMERIC_REGEX.test(text);
		}
		static isAlphanumeric(text) {
			return _QrSegment.ALPHANUMERIC_REGEX.test(text);
		}
		getData() {
			return this.bitData.slice();
		}
		static getTotalBits(segs, version) {
			let result = 0;
			for (const seg of segs) {
				const ccbits = seg.mode.numCharCountBits(version);
				if (seg.numChars >= 1 << ccbits) return Infinity;
				result += 4 + ccbits + seg.bitData.length;
			}
			return result;
		}
		static toUtf8ByteArray(str) {
			str = encodeURI(str);
			let result = [];
			for (let i = 0; i < str.length; i++) if (str.charAt(i) != "%") result.push(str.charCodeAt(i));
			else {
				result.push(parseInt(str.substring(i + 1, i + 3), 16));
				i += 2;
			}
			return result;
		}
	};
	_QrSegment.NUMERIC_REGEX = /^[0-9]*$/;
	_QrSegment.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
	_QrSegment.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
	let QrSegment = _QrSegment;
	qrcodegen2.QrSegment = _QrSegment;
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
	((QrCode2) => {
		const _Ecc = class _Ecc {
			constructor(ordinal, formatBits) {
				this.ordinal = ordinal;
				this.formatBits = formatBits;
			}
		};
		_Ecc.LOW = new _Ecc(0, 1);
		_Ecc.MEDIUM = new _Ecc(1, 0);
		_Ecc.QUARTILE = new _Ecc(2, 3);
		_Ecc.HIGH = new _Ecc(3, 2);
		QrCode2.Ecc = _Ecc;
	})(qrcodegen2.QrCode || (qrcodegen2.QrCode = {}));
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
	((QrSegment2) => {
		const _Mode = class _Mode {
			constructor(modeBits, numBitsCharCount) {
				this.modeBits = modeBits;
				this.numBitsCharCount = numBitsCharCount;
			}
			numCharCountBits(ver) {
				return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
			}
		};
		_Mode.NUMERIC = new _Mode(1, [
			10,
			12,
			14
		]);
		_Mode.ALPHANUMERIC = new _Mode(2, [
			9,
			11,
			13
		]);
		_Mode.BYTE = new _Mode(4, [
			8,
			16,
			16
		]);
		_Mode.KANJI = new _Mode(8, [
			8,
			10,
			12
		]);
		_Mode.ECI = new _Mode(7, [
			0,
			0,
			0
		]);
		QrSegment2.Mode = _Mode;
	})(qrcodegen2.QrSegment || (qrcodegen2.QrSegment = {}));
})(qrcodegen || (qrcodegen = {}));
var qrcodegen_default = qrcodegen;
/**
* @license qrcode.react
* Copyright (c) Paul O'Shannessy
* SPDX-License-Identifier: ISC
*/
var ERROR_LEVEL_MAP = {
	L: qrcodegen_default.QrCode.Ecc.LOW,
	M: qrcodegen_default.QrCode.Ecc.MEDIUM,
	Q: qrcodegen_default.QrCode.Ecc.QUARTILE,
	H: qrcodegen_default.QrCode.Ecc.HIGH
};
var DEFAULT_SIZE = 128;
var DEFAULT_LEVEL = "L";
var DEFAULT_BGCOLOR = "#FFFFFF";
var DEFAULT_FGCOLOR = "#000000";
var DEFAULT_INCLUDEMARGIN = false;
var DEFAULT_MINVERSION = 1;
var SPEC_MARGIN_SIZE = 4;
var DEFAULT_MARGIN_SIZE = 0;
var DEFAULT_IMG_SCALE = .1;
function generatePath(modules, margin = 0) {
	const ops = [];
	modules.forEach(function(row, y) {
		let start = null;
		row.forEach(function(cell, x) {
			if (!cell && start !== null) {
				ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
				start = null;
				return;
			}
			if (x === row.length - 1) {
				if (!cell) return;
				if (start === null) ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
				else ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
				return;
			}
			if (cell && start === null) start = x;
		});
	});
	return ops.join("");
}
function excavateModules(modules, excavation) {
	return modules.slice().map((row, y) => {
		if (y < excavation.y || y >= excavation.y + excavation.h) return row;
		return row.map((cell, x) => {
			if (x < excavation.x || x >= excavation.x + excavation.w) return cell;
			return false;
		});
	});
}
function getImageSettings(cells, size, margin, imageSettings) {
	if (imageSettings == null) return null;
	const numCells = cells.length + margin * 2;
	const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
	const scale = numCells / size;
	const w = (imageSettings.width || defaultSize) * scale;
	const h = (imageSettings.height || defaultSize) * scale;
	const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
	const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
	const opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity;
	let excavation = null;
	if (imageSettings.excavate) {
		let floorX = Math.floor(x);
		let floorY = Math.floor(y);
		excavation = {
			x: floorX,
			y: floorY,
			w: Math.ceil(w + x - floorX),
			h: Math.ceil(h + y - floorY)
		};
	}
	const crossOrigin = imageSettings.crossOrigin;
	return {
		x,
		y,
		h,
		w,
		excavation,
		opacity,
		crossOrigin
	};
}
function getMarginSize(includeMargin, marginSize) {
	if (marginSize != null) return Math.max(Math.floor(marginSize), 0);
	return includeMargin ? SPEC_MARGIN_SIZE : DEFAULT_MARGIN_SIZE;
}
function useQRCode({ value, level, minVersion, includeMargin, marginSize, imageSettings, size, boostLevel }) {
	let qrcode = import_react.useMemo(() => {
		const segments = (Array.isArray(value) ? value : [value]).reduce((accum, v) => {
			accum.push(...qrcodegen_default.QrSegment.makeSegments(v));
			return accum;
		}, []);
		return qrcodegen_default.QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion, void 0, void 0, boostLevel);
	}, [
		value,
		level,
		minVersion,
		boostLevel
	]);
	const { cells, margin, numCells, calculatedImageSettings } = import_react.useMemo(() => {
		let cells2 = qrcode.getModules();
		const margin2 = getMarginSize(includeMargin, marginSize);
		return {
			cells: cells2,
			margin: margin2,
			numCells: cells2.length + margin2 * 2,
			calculatedImageSettings: getImageSettings(cells2, size, margin2, imageSettings)
		};
	}, [
		qrcode,
		size,
		imageSettings,
		includeMargin,
		marginSize
	]);
	return {
		qrcode,
		margin,
		cells,
		numCells,
		calculatedImageSettings
	};
}
var SUPPORTS_PATH2D = function() {
	try {
		new Path2D().addPath(new Path2D());
	} catch (e) {
		return false;
	}
	return true;
}();
var QRCodeCanvas = import_react.forwardRef(function QRCodeCanvas2(props, forwardedRef) {
	const _a = props, { value, size = DEFAULT_SIZE, level = DEFAULT_LEVEL, bgColor = DEFAULT_BGCOLOR, fgColor = DEFAULT_FGCOLOR, includeMargin = DEFAULT_INCLUDEMARGIN, minVersion = DEFAULT_MINVERSION, boostLevel, marginSize, imageSettings } = _a;
	const _b = __objRest(_a, [
		"value",
		"size",
		"level",
		"bgColor",
		"fgColor",
		"includeMargin",
		"minVersion",
		"boostLevel",
		"marginSize",
		"imageSettings"
	]), { style } = _b, otherProps = __objRest(_b, ["style"]);
	const imgSrc = imageSettings == null ? void 0 : imageSettings.src;
	const _canvas = import_react.useRef(null);
	const _image = import_react.useRef(null);
	const setCanvasRef = import_react.useCallback((node) => {
		_canvas.current = node;
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef) forwardedRef.current = node;
	}, [forwardedRef]);
	const [isImgLoaded, setIsImageLoaded] = import_react.useState(false);
	const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
		value,
		level,
		minVersion,
		boostLevel,
		includeMargin,
		marginSize,
		imageSettings,
		size
	});
	import_react.useEffect(() => {
		if (_canvas.current != null) {
			const canvas = _canvas.current;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			let cellsToDraw = cells;
			const image = _image.current;
			const haveImageToRender = calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
			if (haveImageToRender) {
				if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
			}
			const pixelRatio = window.devicePixelRatio || 1;
			canvas.height = canvas.width = size * pixelRatio;
			const scale = size / numCells * pixelRatio;
			ctx.scale(scale, scale);
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, numCells, numCells);
			ctx.fillStyle = fgColor;
			if (SUPPORTS_PATH2D) ctx.fill(new Path2D(generatePath(cellsToDraw, margin)));
			else cells.forEach(function(row, rdx) {
				row.forEach(function(cell, cdx) {
					if (cell) ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
				});
			});
			if (calculatedImageSettings) ctx.globalAlpha = calculatedImageSettings.opacity;
			if (haveImageToRender) ctx.drawImage(image, calculatedImageSettings.x + margin, calculatedImageSettings.y + margin, calculatedImageSettings.w, calculatedImageSettings.h);
		}
	});
	import_react.useEffect(() => {
		setIsImageLoaded(false);
	}, [imgSrc]);
	const canvasStyle = __spreadValues({
		height: size,
		width: size
	}, style);
	let img = null;
	if (imgSrc != null) img = /* @__PURE__ */ import_react.createElement("img", {
		src: imgSrc,
		key: imgSrc,
		style: { display: "none" },
		onLoad: () => {
			setIsImageLoaded(true);
		},
		ref: _image,
		crossOrigin: calculatedImageSettings == null ? void 0 : calculatedImageSettings.crossOrigin
	});
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("canvas", __spreadValues({
		style: canvasStyle,
		height: size,
		width: size,
		ref: setCanvasRef,
		role: "img"
	}, otherProps)), img);
});
QRCodeCanvas.displayName = "QRCodeCanvas";
var QRCodeSVG = import_react.forwardRef(function QRCodeSVG2(props, forwardedRef) {
	const _a = props, { value, size = DEFAULT_SIZE, level = DEFAULT_LEVEL, bgColor = DEFAULT_BGCOLOR, fgColor = DEFAULT_FGCOLOR, includeMargin = DEFAULT_INCLUDEMARGIN, minVersion = DEFAULT_MINVERSION, boostLevel, title, marginSize, imageSettings } = _a, otherProps = __objRest(_a, [
		"value",
		"size",
		"level",
		"bgColor",
		"fgColor",
		"includeMargin",
		"minVersion",
		"boostLevel",
		"title",
		"marginSize",
		"imageSettings"
	]);
	const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
		value,
		level,
		minVersion,
		boostLevel,
		includeMargin,
		marginSize,
		imageSettings,
		size
	});
	let cellsToDraw = cells;
	let image = null;
	if (imageSettings != null && calculatedImageSettings != null) {
		if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
		image = /* @__PURE__ */ import_react.createElement("image", {
			href: imageSettings.src,
			height: calculatedImageSettings.h,
			width: calculatedImageSettings.w,
			x: calculatedImageSettings.x + margin,
			y: calculatedImageSettings.y + margin,
			preserveAspectRatio: "none",
			opacity: calculatedImageSettings.opacity,
			crossOrigin: calculatedImageSettings.crossOrigin
		});
	}
	const fgPath = generatePath(cellsToDraw, margin);
	return /* @__PURE__ */ import_react.createElement("svg", __spreadValues({
		height: size,
		width: size,
		viewBox: `0 0 ${numCells} ${numCells}`,
		ref: forwardedRef,
		role: "img"
	}, otherProps), !!title && /* @__PURE__ */ import_react.createElement("title", null, title), /* @__PURE__ */ import_react.createElement("path", {
		fill: bgColor,
		d: `M0,0 h${numCells}v${numCells}H0z`,
		shapeRendering: "crispEdges"
	}), /* @__PURE__ */ import_react.createElement("path", {
		fill: fgColor,
		d: fgPath,
		shapeRendering: "crispEdges"
	}), image);
});
QRCodeSVG.displayName = "QRCodeSVG";
//#endregion
//#region lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatEventDate(unix, timezone) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZone: timezone
	}).format(/* @__PURE__ */ new Date(unix * 1e3));
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
//#endregion
//#region components/ui/button.tsx
function Button({ variant = "primary", size = "md", loading = false, className, children, disabled, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn({
			primary: "btn-primary",
			secondary: "btn-secondary",
			ghost: "btn-ghost",
			danger: "bg-danger text-white rounded-input px-5 py-2.5 font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
		}[variant], {
			sm: "!px-3.5 !py-1.5 !text-xs",
			md: "",
			lg: "!px-6 !py-3 !text-base"
		}[size], className),
		disabled: disabled || loading,
		...props,
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "animate-spin h-3.5 w-3.5",
				fill: "none",
				viewBox: "0 0 24 24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "opacity-25",
					cx: "12",
					cy: "12",
					r: "10",
					stroke: "currentColor",
					strokeWidth: "4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					className: "opacity-75",
					fill: "currentColor",
					d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				})]
			}), children]
		}) : children
	});
}
//#endregion
//#region components/ui/input.tsx
function Input({ label, error, hint, className, id, ...props }) {
	const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: inputId,
				className: "label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: inputId,
				className: cn("input", error && "border-danger focus:border-danger focus:ring-danger", className),
				...props
			}),
			hint && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted",
				children: hint
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-danger",
				children: error
			})
		]
	});
}
function Textarea({ label, error, hint, className, id, ...props }) {
	const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: inputId,
				className: "label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: inputId,
				className: cn("input resize-none", error && "border-danger focus:border-danger focus:ring-danger", className),
				...props
			}),
			hint && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted",
				children: hint
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-danger",
				children: error
			})
		]
	});
}
//#endregion
//#region components/ui/select.tsx
function Select({ label, error, hint, className, id, options, ...props }) {
	const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: inputId,
				className: "label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: inputId,
				className: cn("input appearance-none cursor-pointer", error && "border-danger focus:border-danger focus:ring-danger", className),
				...props,
				children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: opt.value,
					children: opt.label
				}, opt.value))
			}),
			hint && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted",
				children: hint
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-danger",
				children: error
			})
		]
	});
}
//#endregion
//#region components/ui/badge.tsx
function Badge({ children, variant = "default", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("badge", {
			default: "bg-surface-alt text-muted border border-border",
			success: "bg-accent-subtle text-accent border border-accent-light",
			warning: "bg-warning-light text-warning border border-warning/20",
			danger: "bg-danger-light text-danger border border-danger/20",
			accent: "bg-accent text-white"
		}[variant], className),
		children
	});
}
//#endregion
//#region components/recommendation-cards.tsx
function ScoreBar({ score, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 h-1.5 bg-border rounded-full overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full bg-accent rounded-full motion-safe:transition-[width] motion-safe:duration-700 motion-safe:[transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)]",
				style: { width: `${Math.round(score * 100)}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-medium text-muted w-9 text-right",
			children: [Math.round(score * 100), "%"]
		})]
	});
}
function RecommendationCard({ meeting, timezone, durationMinutes, highlight, onSelect, selected }) {
	meeting.label;
	const attendancePct = meeting.totalParticipants > 0 ? Math.round(meeting.attendingCount / meeting.totalParticipants * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("card p-5 motion-safe:transition-[box-shadow,border-color,background-color] motion-safe:duration-200 motion-safe:ease", highlight && "border-accent/40 bg-accent-subtle/30 shadow-card-hover", selected && "border-accent ring-2 ring-accent/20", onSelect && "cursor-pointer hover:shadow-card-hover"),
		onClick: () => onSelect?.(meeting),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-1",
						children: [
							highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-xs font-medium text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-3 h-3",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
								}), "Top recommendation"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: meeting.isWeekend ? "warning" : "default",
								children: meeting.isWeekend ? "Weekend" : "Weekday"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "default",
								children: meeting.timeCategory.replace("_", " ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold text-text",
						children: formatEventDate(meeting.start, timezone)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted mt-0.5",
						children: formatDuration(durationMinutes)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right flex-shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-display font-bold text-accent",
						children: [attendancePct, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "can make it"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted mb-3",
				children: [
					meeting.attendingCount,
					" of ",
					meeting.totalParticipants,
					" people can make it",
					meeting.totalRequired > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" · ",
						meeting.requiredAttending,
						"/",
						meeting.totalRequired,
						" required"
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Who can make it" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { score: meeting.attendanceScore }),
					meeting.totalRequired > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Must-have people" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { score: meeting.requiredScore })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preference fit" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { score: meeting.timePrefScore })
				]
			}),
			meeting.explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted border-t border-border pt-3",
				children: meeting.explanation
			}),
			onSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 pt-3 border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: selected ? "primary" : "secondary",
					size: "sm",
					className: "w-full",
					onClick: (e) => {
						e.stopPropagation();
						onSelect(meeting);
					},
					children: selected ? "Selected option" : "Choose this option"
				})
			})
		]
	});
}
function RecommendationCards({ recommendations, timezone, durationMinutes, onSelect, selectedStart }) {
	const { best_overall, best_attendance, best_required_match, best_time_fit, top_candidates } = recommendations;
	if (!best_overall && top_candidates.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-12 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-text",
			children: "No suggestions yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm mt-1",
			children: "Once more people reply, Togoo will rank the best options."
		})]
	});
	const shown = /* @__PURE__ */ new Set();
	const highlights = [];
	if (best_overall) {
		highlights.push({
			meeting: best_overall,
			isHighlight: true
		});
		shown.add(best_overall.start);
	}
	for (const candidate of [
		best_attendance,
		best_required_match,
		best_time_fit
	]) if (candidate && !shown.has(candidate.start)) {
		highlights.push({
			meeting: candidate,
			isHighlight: false
		});
		shown.add(candidate.start);
	}
	for (const c of top_candidates) if (!shown.has(c.start) && highlights.length < 6) {
		highlights.push({
			meeting: c,
			isHighlight: false
		});
		shown.add(c.start);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: highlights.map(({ meeting, isHighlight }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, {
			meeting,
			timezone,
			durationMinutes,
			highlight: isHighlight,
			onSelect,
			selected: selectedStart === meeting.start
		}, meeting.start))
	});
}
//#endregion
//#region components/overlap-heatmap.tsx
function getIntensityClass(ratio) {
	if (ratio === 0) return "bg-border";
	if (ratio <= .2) return "bg-accent/10";
	if (ratio <= .4) return "bg-accent/25";
	if (ratio <= .6) return "bg-accent/45";
	if (ratio <= .8) return "bg-accent/65";
	return "bg-accent/90";
}
function OverlapHeatmap({ slots, timezone, totalParticipants }) {
	if (slots.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-8 text-muted text-sm",
		children: "No replies yet. This heatmap fills in as people respond."
	});
	const countBySlot = /* @__PURE__ */ new Map();
	for (const slot of slots) countBySlot.set(slot.slot_start, slot.participant_ids.length);
	const allStarts = [...countBySlot.keys()].sort((a, b) => a - b);
	Math.max(...countBySlot.values(), 1);
	const dayGroups = /* @__PURE__ */ new Map();
	for (const start of allStarts) {
		const label = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
			timeZone: timezone
		}).format(/* @__PURE__ */ new Date(start * 1e3));
		if (!dayGroups.has(label)) dayGroups.set(label, []);
		dayGroups.get(label).push(start);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-[500px] space-y-1",
			children: [...dayGroups.entries()].map(([dayLabel, daySlots]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-24 flex-shrink-0 text-xs text-muted font-medium text-right pr-2 leading-tight",
					children: dayLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-0.5 flex-1",
					children: daySlots.map((start) => {
						const count = countBySlot.get(start) ?? 0;
						const ratio = totalParticipants > 0 ? count / totalParticipants : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							title: `${new Intl.DateTimeFormat("en-US", {
								hour: "numeric",
								minute: "2-digit",
								timeZone: timezone
							}).format(/* @__PURE__ */ new Date(start * 1e3))}: ${count}/${totalParticipants} available`,
							className: cn("h-6 rounded-sm flex-1 min-w-[6px] cursor-default transition-opacity hover:opacity-80", getIntensityClass(ratio))
						}, start);
					})
				})]
			}, dayLabel))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "Less"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						0,
						.2,
						.4,
						.6,
						.8,
						1
					].map((ratio) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-4 h-4 rounded-sm", getIntensityClass(ratio)) }, ratio))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "More"
				})
			]
		})]
	});
}
//#endregion
//#region components/share-buttons.tsx
function ShareButtons({ path, title, description, organizerName, participantName, participantEmail }) {
	const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
	const body = `${participantName ? `Hey ${participantName}! ` : ""}${organizerName ? `${organizerName} is collecting the best time for ${title}.` : `Can you make ${title}?`}\n\n${description ? description + "\n\n" : ""}Respond here: ${url}`;
	const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(body)}`;
	const mailtoUrl = `mailto:${participantEmail ?? ""}?subject=${encodeURIComponent(`${organizerName ?? "Someone"} invited you: ${title}`)}&body=${encodeURIComponent(body)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: whatsappUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors py-1 px-2 rounded hover:bg-accent-subtle",
			title: "Share on WhatsApp",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "w-3.5 h-3.5",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
			}), "WhatsApp"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: mailtoUrl,
			className: "inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors py-1 px-2 rounded hover:bg-accent-subtle",
			title: "Share by email",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "w-3.5 h-3.5",
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: 1.75,
					d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				})
			}), "Email"]
		})]
	});
}
//#endregion
//#region app/e/[eventId]/organizer/[token]/page.tsx
var AVATAR_COLORS$1 = [
	"bg-violet-100 text-violet-700",
	"bg-blue-100 text-blue-700",
	"bg-emerald-100 text-emerald-700",
	"bg-amber-100 text-amber-700",
	"bg-rose-100 text-rose-700",
	"bg-cyan-100 text-cyan-700",
	"bg-fuchsia-100 text-fuchsia-700",
	"bg-orange-100 text-orange-700"
];
function avatarColor$1(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = hash * 31 + name.charCodeAt(i) >>> 0;
	return AVATAR_COLORS$1[hash % AVATAR_COLORS$1.length];
}
function Avatar({ name, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm"} ${avatarColor$1(name)} rounded-full flex items-center justify-center flex-shrink-0 font-semibold`,
		children: name[0].toUpperCase()
	});
}
function CopyButton({ text, label }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: copy,
		className: "inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-[color,background-color] duration-150 ease py-1 px-2 rounded hover:bg-accent-subtle flex-shrink-0",
		children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "w-3.5 h-3.5 text-accent",
			fill: "none",
			viewBox: "0 0 24 24",
			stroke: "currentColor",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2.5,
				d: "M5 13l4 4L19 7"
			})
		}), "Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "w-3.5 h-3.5",
			fill: "none",
			viewBox: "0 0 24 24",
			stroke: "currentColor",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2,
				d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
			})
		}), label] })
	});
}
function QRModal({ url, name, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative card p-6 max-w-xs w-full shadow-xl flex flex-col items-center gap-4 animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-text",
						children: ["Invite QR for ", name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-muted hover:text-text transition-[color] duration-150 ease",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-4 h-4",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M6 18L18 6M6 6l12 12"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeSVG, {
					value: url,
					size: 200
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted text-center break-all",
					children: url
				})
			]
		})]
	});
}
function TierBadge({ tier }) {
	if (tier === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-amber-500 text-sm",
		title: "Key person",
		children: "★★"
	});
	if (tier === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-amber-400 text-sm",
		title: "Important",
		children: "★"
	});
	return null;
}
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function ParticipantRow({ participant, eventId, eventTitle, organizerName, onUpdate, onRemove, onRegenerateToken }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [editName, setEditName] = (0, import_react.useState)(participant.name);
	const [editEmail, setEditEmail] = (0, import_react.useState)(participant.email ?? "");
	const [editPhone, setEditPhone] = (0, import_react.useState)(participant.phone ?? "");
	const [editIsRequired, setEditIsRequired] = (0, import_react.useState)(participant.is_required === 1);
	const [editTier, setEditTier] = (0, import_react.useState)(String(participant.priority_tier));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [newToken, setNewToken] = (0, import_react.useState)(null);
	const [showQR, setShowQR] = (0, import_react.useState)(false);
	const currentToken = newToken ?? participant.invite_token;
	const inviteUrl = currentToken ? `${window.location.origin}/r/${currentToken}` : null;
	const waPhone = participant.phone?.replace(/\D/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showQR && inviteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRModal, {
		url: inviteUrl,
		name: participant.name,
		onClose: () => setShowQR(false)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 py-3.5 border-b border-border last:border-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: participant.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-w-0",
				children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input text-sm",
								value: editName,
								onChange: (e) => setEditName(e.target.value),
								placeholder: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input text-sm",
								value: editEmail,
								onChange: (e) => setEditEmail(e.target.value),
								placeholder: "Email (optional)",
								type: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input text-sm col-span-2",
								value: editPhone,
								onChange: (e) => setEditPhone(e.target.value),
								placeholder: "Phone for WhatsApp (optional)",
								type: "tel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "col-span-1 flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: editIsRequired,
									onChange: (e) => setEditIsRequired(e.target.checked)
								}), "Required attendee"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "input text-sm col-span-1",
								value: editTier,
								onChange: (e) => setEditTier(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "0",
										children: "Regular"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "1",
										children: "★ Important"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "2",
										children: "★★ Key person"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							loading: saving,
							onClick: async () => {
								setSaving(true);
								await onUpdate(participant.id, {
									name: editName,
									email: editEmail || null,
									phone: editPhone || null,
									is_required: editIsRequired ? 1 : 0,
									priority_tier: parseInt(editTier)
								});
								setSaving(false);
								setEditing(false);
							},
							children: "Save"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setEditing(false),
							children: "Cancel"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-text",
								children: participant.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBadge, { tier: participant.priority_tier }),
							participant.is_required === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "warning",
								className: "text-xs",
								children: "Required"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: participant.response_status === "responded" ? "success" : "default",
								children: participant.response_status === "responded" ? "Replied" : "Waiting"
							})
						]
					}),
					participant.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted mt-0.5",
						children: participant.email
					}),
					inviteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted font-mono break-all",
								children: inviteUrl
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
								text: inviteUrl,
								label: "Copy"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButtons, {
							path: `/r/${currentToken}`,
							title: eventTitle,
							organizerName,
							participantName: participant.name,
							participantEmail: participant.email
						})]
					})
				] })
			}),
			participant.role !== "organizer" && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 flex-shrink-0",
				children: [
					waPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `https://wa.me/${waPhone}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "btn-ghost p-1.5",
						title: "WhatsApp",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-3.5 h-3.5",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
						})
					}),
					inviteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowQR(true),
						className: "btn-ghost p-1.5",
						title: "Show QR code",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-3.5 h-3.5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 1.75,
								d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setEditing(true),
						className: "btn-ghost p-1.5",
						title: "Edit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-3.5 h-3.5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							setNewToken(await onRegenerateToken(participant.id));
						},
						className: "btn-ghost p-1.5",
						title: "Create a fresh invite link",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-3.5 h-3.5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (confirm(`Remove ${participant.name}?`)) onRemove(participant.id);
						},
						className: "btn-ghost p-1.5 hover:!text-danger",
						title: "Remove participant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-3.5 h-3.5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							})
						})
					})
				]
			})
		]
	})] });
}
function OrganizerDashboard() {
	const { eventId, token } = useParams();
	const [event, setEvent] = (0, import_react.useState)(null);
	const [participants, setParticipants] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)({
		total_invited: 0,
		total_responded: 0,
		pending: 0
	});
	const [recommendations, setRecommendations] = (0, import_react.useState)(null);
	const [recStats, setRecStats] = (0, import_react.useState)(null);
	const [heatmapSlots, setHeatmapSlots] = (0, import_react.useState)([]);
	const [activityLog, setActivityLog] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [recLoading, setRecLoading] = (0, import_react.useState)(false);
	const [selectedMeeting, setSelectedMeeting] = (0, import_react.useState)(null);
	const [finalSelection, setFinalSelection] = (0, import_react.useState)(null);
	const [finalPath, setFinalPath] = (0, import_react.useState)(null);
	const [finalizing, setFinalizing] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("participants");
	const [addingParticipant, setAddingParticipant] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newEmail, setNewEmail] = (0, import_react.useState)("");
	const [newEmailTouched, setNewEmailTouched] = (0, import_react.useState)(false);
	const [newPhone, setNewPhone] = (0, import_react.useState)("");
	const [newIsRequired, setNewIsRequired] = (0, import_react.useState)(false);
	const [newTier, setNewTier] = (0, import_react.useState)("0");
	const [newExpiresHours, setNewExpiresHours] = (0, import_react.useState)("0");
	const [addLoading, setAddLoading] = (0, import_react.useState)(false);
	const [pageError, setPageError] = (0, import_react.useState)("");
	const newEmailError = newEmailTouched && newEmail.trim() && !EMAIL_RE.test(newEmail.trim()) ? "Enter a valid email address" : "";
	const headers = { "x-organizer-token": token };
	const fetchDashboard = (0, import_react.useCallback)(async () => {
		try {
			const [eventRes, participantsRes] = await Promise.all([fetch(`/api/events/${eventId}`, { headers }), fetch(`/api/events/${eventId}/participants`, { headers })]);
			if (!eventRes.ok || !participantsRes.ok) {
				setPageError("We could not open this event.");
				return;
			}
			const eventData = await eventRes.json();
			const participantsData = await participantsRes.json();
			setEvent(eventData.event);
			setStats(eventData.stats);
			setActivityLog(eventData.activity ?? []);
			setFinalSelection(eventData.final_selection ?? null);
			setFinalPath(eventData.final_selection ? `/e/${eventId}/final` : null);
			setParticipants(participantsData.participants ?? []);
			setNewIsRequired(eventData.event.participants_required_by_default === 1);
		} catch {
			setPageError("We could not load this plan. Try refreshing.");
		} finally {
			setLoading(false);
		}
	}, [eventId, token]);
	const fetchRecommendations = (0, import_react.useCallback)(async () => {
		setRecLoading(true);
		try {
			const res = await fetch(`/api/events/${eventId}/recommendations`, { headers });
			if (res.ok) {
				const data = await res.json();
				setRecommendations(data.recommendations);
				setRecStats(data.stats);
				const bySlot = /* @__PURE__ */ new Map();
				for (const c of data.recommendations?.top_candidates ?? []) {
					if (!bySlot.has(c.start)) bySlot.set(c.start, /* @__PURE__ */ new Set());
					for (const id of c.attendingIds) bySlot.get(c.start).add(id);
				}
				setHeatmapSlots([...bySlot.entries()].map(([slot_start, ids]) => ({
					slot_start,
					participant_ids: [...ids]
				})));
			}
		} catch {} finally {
			setRecLoading(false);
		}
	}, [eventId, token]);
	(0, import_react.useEffect)(() => {
		fetchDashboard();
	}, [fetchDashboard]);
	(0, import_react.useEffect)(() => {
		if (!loading) fetchRecommendations();
	}, [loading, fetchRecommendations]);
	const handleAddParticipant = async () => {
		if (!newName.trim() || newEmailError) return;
		setAddLoading(true);
		try {
			const res = await fetch(`/api/events/${eventId}/participants`, {
				method: "POST",
				headers: {
					...headers,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: newName.trim(),
					email: newEmail.trim() || void 0,
					phone: newPhone.trim() || void 0,
					is_required: newIsRequired,
					priority_tier: parseInt(newTier),
					token_expires_hours: parseInt(newExpiresHours) || void 0
				})
			});
			const data = await res.json();
			if (res.ok) {
				setParticipants((prev) => [...prev, {
					...data.participant,
					is_required: data.participant.is_required ? 1 : 0,
					phone: data.participant.phone ?? null,
					role: "participant",
					response_status: "pending",
					invite_token: data.invite_token,
					priority_tier: data.participant.priority_tier ?? parseInt(newTier)
				}]);
				setStats((s) => ({
					...s,
					total_invited: s.total_invited + 1,
					pending: s.pending + 1
				}));
				setNewName("");
				setNewEmail("");
				setNewEmailTouched(false);
				setNewPhone("");
				setNewIsRequired(event?.participants_required_by_default === 1);
				setNewTier("0");
				setNewExpiresHours("0");
				setAddingParticipant(false);
			}
		} finally {
			setAddLoading(false);
		}
	};
	const handleUpdateParticipant = async (id, updates) => {
		await fetch(`/api/events/${eventId}/participants/${id}`, {
			method: "PUT",
			headers: {
				...headers,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: updates.name,
				email: updates.email,
				phone: updates.phone,
				is_required: updates.is_required,
				priority_tier: updates.priority_tier
			})
		});
		setParticipants((prev) => prev.map((p) => p.id === id ? {
			...p,
			...updates
		} : p));
	};
	const handleRemoveParticipant = async (id) => {
		await fetch(`/api/events/${eventId}/participants/${id}`, {
			method: "DELETE",
			headers
		});
		setParticipants((prev) => prev.filter((p) => p.id !== id));
	};
	const handleRegenerateToken = async (participantId) => {
		return (await (await fetch(`/api/events/${eventId}/participants/${participantId}/token`, {
			method: "POST",
			headers
		})).json()).invite_token;
	};
	const handleFinalize = async () => {
		if (!selectedMeeting) return;
		setFinalizing(true);
		try {
			const res = await fetch(`/api/events/${eventId}/finalize`, {
				method: "POST",
				headers: {
					...headers,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					slot_start: selectedMeeting.start,
					slot_end: selectedMeeting.end
				})
			});
			if (res.ok) {
				const data = await res.json();
				setEvent((e) => e ? {
					...e,
					status: "finalized"
				} : e);
				setFinalSelection({
					id: "pending-final-selection",
					slot_start: selectedMeeting.start,
					slot_end: selectedMeeting.end,
					notes: null,
					finalized_at: Math.floor(Date.now() / 1e3)
				});
				setFinalPath(data.final_url);
			}
		} finally {
			setFinalizing(false);
		}
	};
	const handleReopen = async () => {
		if (!confirm("Reopen this plan? The confirmed selection will be cleared.")) return;
		await fetch(`/api/events/${eventId}/reopen`, {
			method: "POST",
			headers
		});
		setEvent((e) => e ? {
			...e,
			status: "active"
		} : e);
		setSelectedMeeting(null);
		setFinalSelection(null);
		setFinalPath(null);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center text-muted animate-pulse",
			children: "Loading your dashboard..."
		})
	});
	if (pageError || !event) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-danger mb-4",
				children: pageError || "We could not find that event."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/",
				className: "btn-secondary",
				children: "Back home"
			})]
		})
	});
	const nonOrganizerParticipants = participants.filter((p) => p.role !== "organizer");
	const organizerName = participants.find((p) => p.role === "organizer")?.name ?? "";
	const responseRate = stats.total_invited > 0 ? Math.round(stats.total_responded / stats.total_invited * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/",
						className: "font-display text-xl font-semibold text-text flex-shrink-0",
						children: "Togoo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							event.show_results_to_participants === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: `/e/${eventId}/summary/${token}`,
								className: "btn-secondary text-sm",
								children: "Live summary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: event.status === "finalized" ? "success" : "default",
								children: event.status === "finalized" ? "Confirmed" : "Open"
							}),
							event.status === "finalized" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: handleReopen,
								children: "Reopen plan"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-5xl mx-auto px-5 py-8 flex-1 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 animate-slide-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted uppercase tracking-wide mb-1",
								children: event.event_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl sm:text-4xl font-bold text-text",
								children: event.title
							}),
							event.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								children: event.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									formatDate(event.date_range_start, event.timezone),
									" — ",
									formatDate(event.date_range_end, event.timezone),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2",
										children: "·"
									}),
									event.timezone
								]
							}),
							event.response_deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: ["Reply deadline: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-text",
									children: formatDate(event.response_deadline, event.timezone)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-4 mb-8",
						children: [
							{
								label: "Invited",
								value: stats.total_invited
							},
							{
								label: "Replied",
								value: stats.total_responded
							},
							{
								label: "Reply rate",
								value: `${responseRate}%`
							}
						].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card p-4 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl font-bold text-text",
								children: stat.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted mt-1",
								children: stat.label
							})]
						}, stat.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 mb-6 border-b border-border",
						children: [
							"participants",
							"recommendations",
							"activity"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(t),
							className: cn("px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px motion-safe:transition-[color,border-color] motion-safe:duration-150 motion-safe:ease", tab === t ? "border-accent text-accent" : "border-transparent text-muted hover:text-text"),
							children: t === "participants" ? "people" : t === "recommendations" ? "best options" : "activity"
						}, t))
					}),
					tab === "participants" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "section-title",
									children: [
										"People (",
										nonOrganizerParticipants.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setAddingParticipant(true),
									children: "+ Add person"
								})]
							}),
							addingParticipant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card p-4 mb-4 animate-scale-in",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text mb-3",
										children: "Add someone to this plan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Name",
											value: newName,
											onChange: (e) => setNewName(e.target.value),
											onKeyDown: (e) => e.key === "Enter" && handleAddParticipant()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Email (optional)",
											type: "email",
											value: newEmail,
											onChange: (e) => {
												setNewEmail(e.target.value);
												setNewEmailTouched(false);
											},
											onBlur: () => setNewEmailTouched(true)
										}), newEmailError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-danger mt-1",
											children: newEmailError
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Phone for WhatsApp (optional)",
											type: "tel",
											value: newPhone,
											onChange: (e) => setNewPhone(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: newIsRequired,
												onChange: (e) => setNewIsRequired(e.target.checked)
											}), "Required attendee"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											label: "Priority",
											options: [
												{
													value: "0",
													label: "Regular"
												},
												{
													value: "1",
													label: "★ Important"
												},
												{
													value: "2",
													label: "★★ Key person"
												}
											],
											value: newTier,
											onChange: (e) => setNewTier(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											label: "Invite link expires",
											options: [
												{
													value: "0",
													label: "Never"
												},
												{
													value: "24",
													label: "24 hours"
												},
												{
													value: "72",
													label: "3 days"
												},
												{
													value: "168",
													label: "7 days"
												},
												{
													value: "336",
													label: "14 days"
												}
											],
											value: newExpiresHours,
											onChange: (e) => setNewExpiresHours(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											loading: addLoading,
											onClick: handleAddParticipant,
											disabled: !!newEmailError,
											children: "Add invitee"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => setAddingParticipant(false),
											children: "Cancel"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "card divide-y-0",
								children: nonOrganizerParticipants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-8 text-center text-muted text-sm",
									children: "No invitees yet. Add people to start collecting replies."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4",
									children: nonOrganizerParticipants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticipantRow, {
										participant: p,
										eventId,
										eventTitle: event.title,
										organizerName,
										onUpdate: handleUpdateParticipant,
										onRemove: handleRemoveParticipant,
										onRegenerateToken: handleRegenerateToken
									}, p.id))
								})
							})
						]
					}),
					tab === "recommendations" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "section-title",
									children: "Best options"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [recStats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [
											"Based on ",
											recStats.response_rate,
											"% reply rate"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: fetchRecommendations,
										disabled: recLoading,
										className: "text-xs text-muted hover:text-accent transition-colors",
										children: recLoading ? "Refreshing..." : "Refresh"
									})]
								})]
							}), recLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-12 text-muted animate-pulse",
								children: "Scoring the best options..."
							}) : recommendations ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCards, {
								recommendations,
								timezone: event.timezone,
								durationMinutes: event.meeting_duration_minutes,
								onSelect: setSelectedMeeting,
								selectedStart: selectedMeeting?.start
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-12 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-text mb-1",
									children: "No replies yet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Suggestions appear after people start responding."
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								event.status === "finalized" && finalSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card bg-accent-subtle border-accent/30 p-4 animate-scale-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-accent mb-2",
											children: "Confirmed time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-base font-semibold text-text",
											children: new Intl.DateTimeFormat("en-US", {
												weekday: "short",
												month: "short",
												day: "numeric",
												hour: "numeric",
												minute: "2-digit",
												timeZone: event.timezone
											}).format(/* @__PURE__ */ new Date(finalSelection.slot_start * 1e3))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted mt-0.5",
											children: ["Ends ", new Intl.DateTimeFormat("en-US", {
												hour: "numeric",
												minute: "2-digit",
												timeZone: event.timezone
											}).format(/* @__PURE__ */ new Date(finalSelection.slot_end * 1e3))]
										}),
										finalPath && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
													text: `${window.location.origin}${finalPath}`,
													label: "Copy final page"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													href: finalPath,
													className: "text-xs text-accent hover:underline",
													children: "Open final page"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButtons, {
												path: finalPath,
												title: event.title,
												description: `${event.title} is confirmed.`
											})]
										})
									]
								}),
								selectedMeeting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card bg-accent-subtle border-accent/30 p-4 animate-scale-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium text-accent mb-2",
											children: "Selected option"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-base font-semibold text-text",
											children: new Intl.DateTimeFormat("en-US", {
												weekday: "short",
												month: "short",
												day: "numeric",
												hour: "numeric",
												minute: "2-digit",
												timeZone: event.timezone
											}).format(/* @__PURE__ */ new Date(selectedMeeting.start * 1e3))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted mt-0.5",
											children: [
												selectedMeeting.attendingCount,
												" of ",
												selectedMeeting.totalParticipants,
												" can make it"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full mt-3",
											size: "sm",
											loading: finalizing,
											onClick: handleFinalize,
											disabled: event.status === "finalized",
											children: event.status === "finalized" ? "Already confirmed" : "Confirm this time"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-medium text-text mb-3",
										children: "Where replies overlap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlapHeatmap, {
										slots: heatmapSlots,
										timezone: event.timezone,
										totalParticipants: stats.total_invited
									})]
								})
							]
						})]
					}),
					tab === "activity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-title mb-4",
							children: "Recent activity"
						}), activityLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card p-8 text-center text-muted text-sm",
							children: "Replies and changes will show up here."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card divide-y divide-border",
							children: activityLog.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-accent-light flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-text",
									children: entry.action.replace(/_/g, " ")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: new Intl.DateTimeFormat("en-US", {
										month: "short",
										day: "numeric",
										hour: "numeric",
										minute: "2-digit",
										timeZone: event.timezone
									}).format(/* @__PURE__ */ new Date(entry.created_at * 1e3))
								})] })]
							}, entry.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-6 text-center text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://github.com/anxkhn/togoo",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "hover:text-accent transition-colors",
					children: "github.com/anxkhn/togoo"
				})
			})
		]
	});
}
//#endregion
//#region components/my-events.tsx
function saveEvent(event) {
	try {
		const filtered = JSON.parse(localStorage.getItem("togoo_events") ?? "[]").filter((e) => !(e.id === event.id && e.role === event.role));
		filtered.unshift(event);
		localStorage.setItem("togoo_events", JSON.stringify(filtered.slice(0, 20)));
	} catch {}
}
function ConfirmDeleteDialog({ title, onConfirm, onCancel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in",
			onClick: onCancel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative card p-6 max-w-sm w-full shadow-xl animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold text-text mb-1",
					children: "Remove this shortcut?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-text",
						children: title
					}), " will be removed from your recent events on this device only."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						className: "px-4 py-2 text-sm rounded-lg border border-border text-muted hover:text-text hover:bg-surface-alt active:scale-[0.97] transition-[background-color,color,border-color] duration-150 ease",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onConfirm,
						className: "px-4 py-2 text-sm rounded-lg bg-danger text-white hover:bg-danger/90 active:scale-[0.97] transition-[background-color] duration-150 ease font-medium",
						children: "Remove"
					})]
				})
			]
		})]
	});
}
function MyEvents() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem("togoo_events");
			if (stored) setEvents(JSON.parse(stored).slice(0, 6));
		} catch {}
	}, []);
	function removeEvent() {
		if (!pendingDelete) return;
		const updated = events.filter((e) => !(e.id === pendingDelete.id && e.role === pendingDelete.role));
		setEvents(updated);
		try {
			localStorage.setItem("togoo_events", JSON.stringify(updated));
		} catch {}
		setPendingDelete(null);
	}
	if (events.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pendingDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDeleteDialog, {
		title: pendingDelete.title,
		onConfirm: removeEvent,
		onCancel: () => setPendingDelete(null)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-5xl mx-auto px-5 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold text-text mb-3",
			children: "Recent events"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
			children: events.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card p-4 hover:shadow-card-hover transition-shadow duration-200 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					href: ev.role === "organizer" ? `/e/${ev.id}/organizer/${ev.token}` : `/r/${ev.token}`,
					className: "block pr-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-text truncate",
							children: ev.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted bg-surface-alt border border-border rounded-full px-2 py-0.5 flex-shrink-0",
							children: ev.role === "organizer" ? "Hosting" : "Invited"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted mt-1",
						children: ev.role === "organizer" ? "Open dashboard" : "Update your response"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPendingDelete(ev),
					className: "absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md text-muted hover:text-danger hover:bg-danger/10 transition-[color,background-color] duration-150 ease",
					title: "Remove shortcut",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-3.5 h-3.5",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						})
					})
				})]
			}, ev.id + ev.role))
		})]
	})] });
}
//#endregion
//#region app/events/new/page.tsx
var ALL_TIMEZONES = getTimeZones({ includeUtc: true });
var TZ_ALIAS_TO_CANONICAL = new Map(ALL_TIMEZONES.flatMap((tz) => tz.group.map((alias) => [alias, tz.name])));
var TIMEZONE_OPTIONS = ALL_TIMEZONES.map((tz) => ({
	value: tz.name,
	label: `(${tz.abbreviation}, UTC${tz.rawOffsetInMinutes >= 0 ? "+" : ""}${Math.floor(tz.rawOffsetInMinutes / 60)}:${String(Math.abs(tz.rawOffsetInMinutes) % 60).padStart(2, "0")}) ${tz.name.replace(/_/g, " ")} - ${tz.alternativeName}`
}));
function detectTimezone() {
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return TZ_ALIAS_TO_CANONICAL.get(tz) ?? tz ?? "UTC";
}
var ALL_PREF_FIELDS = [
	{
		key: "food",
		label: "Food preferences"
	},
	{
		key: "budget",
		label: "Budget"
	},
	{
		key: "location",
		label: "Preferred area"
	},
	{
		key: "day_type",
		label: "Weekday or weekend"
	},
	{
		key: "time_of_day",
		label: "Time of day"
	},
	{
		key: "indoor_outdoor",
		label: "Indoor / outdoor"
	}
];
var AVATAR_COLORS = [
	"bg-violet-100 text-violet-700",
	"bg-blue-100 text-blue-700",
	"bg-emerald-100 text-emerald-700",
	"bg-amber-100 text-amber-700",
	"bg-rose-100 text-rose-700",
	"bg-cyan-100 text-cyan-700",
	"bg-fuchsia-100 text-fuchsia-700",
	"bg-orange-100 text-orange-700"
];
function avatarColor(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = hash * 31 + name.charCodeAt(i) >>> 0;
	return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
function localDateToUnix(localDate) {
	return Math.floor(new Date(localDate).getTime() / 1e3);
}
function todayPlus(days) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + days);
	return d.toISOString().split("T")[0];
}
function NewEventPage() {
	const router = useRouter();
	const [step, setStep] = (0, import_react.useState)(1);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		event_type: "meetup",
		timezone: "UTC",
		date_range_start_local: todayPlus(1),
		date_range_end_local: todayPlus(14),
		allowed_hours_start: "9",
		allowed_hours_end: "22",
		meeting_duration_minutes: "120",
		slot_granularity_minutes: "30",
		scoring_mode: "maximize_attendance",
		min_attendance_threshold: "0",
		participants_required_by_default: false,
		allow_participant_edit: true,
		show_results_to_participants: false,
		preferences_required: false,
		response_deadline_local: "",
		organizer_name: "",
		enabled_preferences: ["food"]
	});
	const [createdEventId, setCreatedEventId] = (0, import_react.useState)(null);
	const [createdOrganizerToken, setCreatedOrganizerToken] = (0, import_react.useState)(null);
	const [inviteName, setInviteName] = (0, import_react.useState)("");
	const [inviteEmail, setInviteEmail] = (0, import_react.useState)("");
	const [inviteEmailTouched, setInviteEmailTouched] = (0, import_react.useState)(false);
	const [invitePhone, setInvitePhone] = (0, import_react.useState)("");
	const [inviteIsRequired, setInviteIsRequired] = (0, import_react.useState)(false);
	const [invitePriorityTier, setInvitePriorityTier] = (0, import_react.useState)("0");
	const [addingInvite, setAddingInvite] = (0, import_react.useState)(false);
	const [inviteError, setInviteError] = (0, import_react.useState)("");
	const [addedParticipants, setAddedParticipants] = (0, import_react.useState)([]);
	const inviteEmailError = inviteEmailTouched && inviteEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim()) ? "Enter a valid email address" : "";
	(0, import_react.useEffect)(() => {
		const tz = detectTimezone();
		setForm((f) => ({
			...f,
			timezone: tz
		}));
	}, []);
	const set = (field, value) => {
		setForm((f) => ({
			...f,
			[field]: value
		}));
	};
	async function handleSubmit() {
		setLoading(true);
		setError("");
		try {
			const payload = {
				title: form.title.trim(),
				description: form.description.trim() || void 0,
				event_type: form.event_type,
				timezone: form.timezone,
				date_range_start: localDateToUnix(form.date_range_start_local + "T00:00:00"),
				date_range_end: localDateToUnix(form.date_range_end_local + "T23:59:59"),
				allowed_hours_start: parseInt(form.allowed_hours_start),
				allowed_hours_end: parseInt(form.allowed_hours_end),
				meeting_duration_minutes: parseInt(form.meeting_duration_minutes),
				slot_granularity_minutes: parseInt(form.slot_granularity_minutes),
				scoring_mode: form.scoring_mode,
				min_attendance_threshold: parseInt(form.min_attendance_threshold) || 0,
				allow_participant_edit: form.allow_participant_edit,
				show_results_to_participants: form.show_results_to_participants,
				participants_required_by_default: form.participants_required_by_default,
				preferences_required: form.preferences_required,
				enabled_preferences: form.enabled_preferences,
				response_deadline: form.response_deadline_local ? localDateToUnix(`${form.response_deadline_local}T23:59:59`) : void 0,
				organizer_name: form.organizer_name.trim()
			};
			const res = await fetch("/api/events", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok) {
				setError(("error" in data ? data.error : null) ?? "We could not create your plan. Please try again.");
				return;
			}
			const created = data;
			saveEvent({
				id: created.event_id,
				title: payload.title,
				role: "organizer",
				token: created.organizer_token,
				created_at: Math.floor(Date.now() / 1e3)
			});
			setCreatedEventId(created.event_id);
			setCreatedOrganizerToken(created.organizer_token);
			setInviteIsRequired(payload.participants_required_by_default);
			setInvitePriorityTier("0");
			setStep(4);
		} catch {
			setError("We hit a snag creating your plan. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	async function handleAddParticipant() {
		if (!inviteName.trim() || !createdEventId || !createdOrganizerToken) return;
		setAddingInvite(true);
		setInviteError("");
		try {
			const res = await fetch(`/api/events/${createdEventId}/participants`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-organizer-token": createdOrganizerToken
				},
				body: JSON.stringify({
					name: inviteName.trim(),
					email: inviteEmail.trim() || void 0,
					phone: invitePhone.trim() || void 0,
					is_required: inviteIsRequired,
					priority_tier: parseInt(invitePriorityTier)
				})
			});
			const data = await res.json();
			if (!res.ok) {
				setInviteError(("error" in data ? data.error : null) ?? "We could not add that invitee.");
				return;
			}
			const added = data;
			setAddedParticipants((prev) => [...prev, {
				name: inviteName.trim(),
				invite_url: `${window.location.origin}${added.invite_url}`
			}]);
			setInviteName("");
			setInviteEmail("");
			setInvitePhone("");
			setInviteIsRequired(form.participants_required_by_default);
			setInvitePriorityTier("0");
		} catch {
			setInviteError("We could not add that invitee. Try again.");
		} finally {
			setAddingInvite(false);
		}
	}
	const steps = [
		{
			n: 1,
			label: "Basics"
		},
		{
			n: 2,
			label: "Schedule"
		},
		{
			n: 3,
			label: "Check"
		},
		{
			n: 4,
			label: "Invite"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl mx-auto px-5 h-14 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/",
					className: "font-display text-xl font-semibold text-text",
					children: "Togoo"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-2xl mx-auto px-5 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold text-text mb-2",
						children: step === 4 ? "Invite your group" : "Start your plan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: step === 4 ? "Add the people who should reply. You can always invite more later from the dashboard." : "Tell Togoo what you're planning so it can surface the best options."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 mb-8",
					children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${step === s.n ? "bg-accent text-white" : step > s.n ? "bg-accent-light text-accent" : "bg-border text-muted"}`,
								children: step > s.n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-3.5 h-3.5",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2.5,
										d: "M5 13l4 4L19 7"
									})
								}) : s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-sm ${step === s.n ? "text-text font-medium" : "text-muted"}`,
								children: s.label
							}),
							i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-px bg-border mx-1" })
						]
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card p-6 animate-scale-in",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Your name",
									placeholder: "e.g., Alex",
									value: form.organizer_name,
									onChange: (e) => set("organizer_name", e.target.value),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Plan title",
									placeholder: "e.g., Friday dinner, birthday drinks, team offsite",
									value: form.title,
									onChange: (e) => set("title", e.target.value),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									label: "What should people know? (optional)",
									placeholder: "Add context, goals, or a note for the group.",
									rows: 3,
									value: form.description,
									onChange: (e) => set("description", e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Plan type",
									options: [
										{
											value: "meetup",
											label: "Meetup"
										},
										{
											value: "dinner",
											label: "Dinner"
										},
										{
											value: "hangout",
											label: "Hangout"
										},
										{
											value: "work_session",
											label: "Work session"
										},
										{
											value: "custom",
											label: "Custom"
										}
									],
									value: form.event_type,
									onChange: (e) => set("event_type", e.target.value)
								})
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Timezone",
									options: TIMEZONE_OPTIONS,
									value: form.timezone,
									onChange: (e) => set("timezone", e.target.value),
									hint: "Detected from your browser. Invitees will answer against this timezone."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Earliest date",
										type: "date",
										value: form.date_range_start_local,
										onChange: (e) => set("date_range_start_local", e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Latest date",
										type: "date",
										value: form.date_range_end_local,
										onChange: (e) => set("date_range_end_local", e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										label: "Earliest start time",
										options: Array.from({ length: 24 }, (_, i) => ({
											value: String(i),
											label: `${i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}`
										})),
										value: form.allowed_hours_start,
										onChange: (e) => set("allowed_hours_start", e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										label: "Latest end time",
										options: Array.from({ length: 24 }, (_, i) => ({
											value: String(i + 1),
											label: `${i + 1 === 12 ? "12 PM" : i + 1 < 12 ? `${i + 1} AM` : i + 1 === 24 ? "12 AM" : `${i + 1 - 12} PM`}`
										})),
										value: form.allowed_hours_end,
										onChange: (e) => set("allowed_hours_end", e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										label: "How long should it be?",
										options: [
											{
												value: "30",
												label: "30 minutes"
											},
											{
												value: "60",
												label: "1 hour"
											},
											{
												value: "90",
												label: "1.5 hours"
											},
											{
												value: "120",
												label: "2 hours"
											},
											{
												value: "180",
												label: "3 hours"
											},
											{
												value: "240",
												label: "4 hours"
											},
											{
												value: "480",
												label: "Full day (8h)"
											}
										],
										value: form.meeting_duration_minutes,
										onChange: (e) => set("meeting_duration_minutes", e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										label: "Suggestion spacing",
										options: [{
											value: "30",
											label: "30 minutes"
										}, {
											value: "15",
											label: "15 minutes"
										}],
										value: form.slot_granularity_minutes,
										onChange: (e) => set("slot_granularity_minutes", e.target.value),
										hint: "Smaller spacing gives you more candidate options."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "How should Togoo rank options?",
									options: [
										{
											value: "maximize_attendance",
											label: "Maximize attendance"
										},
										{
											value: "prioritize_required",
											label: "Prioritize required attendees"
										},
										{
											value: "vip_priority",
											label: "Prioritize ★★ key people"
										},
										{
											value: "time_optimized",
											label: "Match time preferences"
										}
									],
									value: form.scoring_mode,
									onChange: (e) => set("scoring_mode", e.target.value),
									hint: "Choose what matters most when it scores the best time."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Minimum people needed",
										type: "number",
										min: "0",
										value: form.min_attendance_threshold,
										onChange: (e) => set("min_attendance_threshold", e.target.value),
										hint: "Hide suggestions that fewer than this many people can make."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Reply deadline (optional)",
										type: "date",
										value: form.response_deadline_local,
										onChange: (e) => set("response_deadline_local", e.target.value),
										hint: "After this date, replies are closed."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text mb-1",
										children: "What should people weigh in on?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mb-3",
										children: "Turn on only the preferences that matter for this plan."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: ALL_PREF_FIELDS.map(({ key, label }) => {
											const enabled = form.enabled_preferences.includes(key);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													const next = enabled ? form.enabled_preferences.filter((k) => k !== key) : [...form.enabled_preferences, key];
													setForm((f) => ({
														...f,
														enabled_preferences: next
													}));
												},
												className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${enabled ? "bg-accent text-white border-accent" : "bg-surface border-border text-text hover:border-accent/40"}`,
												children: [enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													className: "w-3 h-3",
													fill: "none",
													viewBox: "0 0 24 24",
													stroke: "currentColor",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														strokeWidth: 2.5,
														d: "M5 13l4 4L19 7"
													})
												}), label]
											}, key);
										})
									})
								] })
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between py-3 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text",
										children: "Mark new invitees as required by default"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mt-0.5",
										children: "Useful when a small core group needs to be present."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => set("participants_required_by_default", !form.participants_required_by_default),
										className: `relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${form.participants_required_by_default ? "bg-accent" : "bg-border"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.participants_required_by_default ? "translate-x-5" : "translate-x-1"}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between py-3 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text",
										children: "Allow participants to edit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mt-0.5",
										children: "Let people update their availability after they submit"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => set("allow_participant_edit", !form.allow_participant_edit),
										className: `relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${form.allow_participant_edit ? "bg-accent" : "bg-border"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.allow_participant_edit ? "translate-x-5" : "translate-x-1"}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between py-3 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text",
										children: "Require at least one preference"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mt-0.5",
										children: "If on, people must fill one preference before they can submit."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => set("preferences_required", !form.preferences_required),
										className: `relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${form.preferences_required ? "bg-accent" : "bg-border"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.preferences_required ? "translate-x-5" : "translate-x-1"}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between py-3 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text",
										children: "Let participants view the live summary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted mt-0.5",
										children: "They can see the current overlap and top timings from their own invite link."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => set("show_results_to_participants", !form.show_results_to_participants),
										className: `relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${form.show_results_to_participants ? "bg-accent" : "bg-border"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.show_results_to_participants ? "translate-x-5" : "translate-x-1"}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card bg-surface-alt p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-text mb-1",
										children: "Quick review"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "text-sm space-y-1 text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text font-medium",
													children: form.title || "(untitled)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Host" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: form.organizer_name || "(no name)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Date window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "text-text",
													children: [
														form.date_range_start_local,
														" – ",
														form.date_range_end_local
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Duration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "text-text",
													children: [parseInt(form.meeting_duration_minutes) / 60, "h"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Timezone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: form.timezone
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Minimum people" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: form.min_attendance_threshold
												})]
											}),
											form.response_deadline_local && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Reply deadline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: form.response_deadline_local
												})]
											})
										]
									})]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-danger-light border border-danger/20 rounded-input px-4 py-3 text-sm text-danger",
									children: error
								})
							]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											label: "Name",
											placeholder: "e.g., Jamie",
											value: inviteName,
											onChange: (e) => setInviteName(e.target.value),
											onKeyDown: (e) => {
												if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
											}
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											label: "Email (optional)",
											type: "email",
											placeholder: "jamie@example.com",
											value: inviteEmail,
											onChange: (e) => {
												setInviteEmail(e.target.value);
												setInviteEmailTouched(false);
											},
											onBlur: () => setInviteEmailTouched(true),
											onKeyDown: (e) => {
												if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
											}
										}), inviteEmailError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-danger mt-1",
											children: inviteEmailError
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												label: "Phone for WhatsApp (optional)",
												type: "tel",
												placeholder: "+1 555 000 0000",
												value: invitePhone,
												onChange: (e) => setInvitePhone(e.target.value),
												onKeyDown: (e) => {
													if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "col-span-1 flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: inviteIsRequired,
												onChange: (e) => setInviteIsRequired(e.target.checked)
											}), "Required attendee"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "col-span-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
												label: "Priority",
												options: [
													{
														value: "0",
														label: "Regular"
													},
													{
														value: "1",
														label: "★ Important"
													},
													{
														value: "2",
														label: "★★ Key person"
													}
												],
												value: invitePriorityTier,
												onChange: (e) => setInvitePriorityTier(e.target.value)
											})
										})
									]
								}),
								inviteError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: inviteError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: handleAddParticipant,
									loading: addingInvite,
									disabled: !inviteName.trim() || !!inviteEmailError,
									variant: "secondary",
									className: "w-full",
									children: "Add invitee"
								}),
								addedParticipants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-medium text-muted uppercase tracking-wide mb-3",
										children: [
											"Invite links ready (",
											addedParticipants.length,
											")"
										]
									}), addedParticipants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor(p.name)}`,
												children: p.name[0].toUpperCase()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-text font-medium truncate",
												children: p.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => navigator.clipboard.writeText(p.invite_url),
											className: "text-xs text-accent hover:underline flex-shrink-0",
											children: "Copy link"
										})]
									}, p.invite_url))]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between mt-6",
					children: [
						step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted self-center",
							children: addedParticipants.length === 0 ? "You can always invite more people from the dashboard." : `${addedParticipants.length} invitee${addedParticipants.length === 1 ? "" : "s"} added`
						}) : step > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setStep(step - 1),
							children: "Back"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/",
							className: "btn-secondary inline-flex items-center",
							children: "Cancel"
						}),
						step < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (step === 1 && (!form.organizer_name.trim() || !form.title.trim())) {
									setError("Please enter your name and a plan title.");
									return;
								}
								setError("");
								setStep(step + 1);
							},
							children: "Continue"
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							loading,
							onClick: handleSubmit,
							disabled: !form.title.trim() || !form.organizer_name.trim(),
							children: "Create plan"
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => router.push(`/e/${createdEventId}/organizer/${createdOrganizerToken}`),
							children: "Open dashboard"
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region components/availability-picker.tsx
function toUnix(dateStr, h, m, tz) {
	const iso = `${dateStr}T${pad(h)}:${pad(m)}:00`;
	return Math.floor(fromZonedTime(iso, tz).getTime() / 1e3);
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function fmtTime(unix, tz) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: tz
	}).format(/* @__PURE__ */ new Date(unix * 1e3));
}
function fmtHour(h) {
	if (h === 0 || h === 24) return "12 AM";
	if (h < 12) return `${h} AM`;
	if (h === 12) return "12 PM";
	return `${h - 12} PM`;
}
function getDates(startUnix, endUnix, tz) {
	const fmt = new Intl.DateTimeFormat("en-CA", {
		timeZone: tz,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});
	const dates = [];
	const seen = /* @__PURE__ */ new Set();
	for (let ts = startUnix; ts <= endUnix + 3600; ts += 3600) {
		const d = fmt.format(/* @__PURE__ */ new Date(ts * 1e3));
		if (!seen.has(d)) {
			seen.add(d);
			dates.push(d);
		}
		if (dates.length > 60) break;
	}
	return dates;
}
function fmtDayLabel(dateStr, tz) {
	const noon = fromZonedTime(`${dateStr}T12:00:00`, tz);
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		timeZone: tz
	}).format(noon);
}
function getBlocks(aS, aE) {
	const b = [];
	const mE = Math.min(12, aE);
	if (mE > aS) b.push({
		key: "morning",
		label: "Morning",
		sh: aS,
		eh: mE
	});
	const pS = Math.max(12, aS);
	const pE = Math.min(17, aE);
	if (pE > pS) b.push({
		key: "afternoon",
		label: "Afternoon",
		sh: pS,
		eh: pE
	});
	const eS = Math.max(17, aS);
	if (aE > eS) b.push({
		key: "evening",
		label: "Evening",
		sh: eS,
		eh: aE
	});
	return b;
}
function isExactBlock(w, blocks, dateStr, tz) {
	return blocks.some((b) => w.start_time === toUnix(dateStr, b.sh, 0, tz) && w.end_time === toUnix(dateStr, b.eh, 0, tz));
}
function isBlockSelected(windows, s, e) {
	return windows.some((w) => w.start_time === s && w.end_time === e);
}
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function defaultDraft(aS, durMins, aE) {
	const endTotalMins = Math.min(aS * 60 + durMins, aE * 60);
	return {
		startH: aS,
		startM: 0,
		durMins,
		endH: Math.floor(endTotalMins / 60),
		endM: endTotalMins % 60
	};
}
function BlockPill({ block, selected, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 active:scale-[0.97]", selected ? "bg-accent text-white border-accent shadow-sm" : "bg-surface border-border text-text hover:border-accent/50 hover:bg-accent-subtle/30"),
		children: [
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "w-3 h-3 flex-shrink-0",
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: 2.5,
					d: "M5 13l4 4L19 7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: block.label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("text-[10px]", selected ? "text-white/70" : "text-muted"),
				children: [
					fmtHour(block.sh),
					"–",
					fmtHour(block.eh)
				]
			})
		]
	});
}
function WindowChip({ label, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 bg-accent-subtle border border-accent-light rounded-full px-2.5 py-1 text-xs text-accent font-medium",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRemove,
			className: "text-accent/70 hover:text-danger transition-colors ml-0.5",
			"aria-label": "Remove",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "w-3 h-3",
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: 2.5,
					d: "M6 18L18 6M6 6l12 12"
				})
			})
		})]
	});
}
function AvailabilityPicker({ windows, onChange, dateRangeStart, dateRangeEnd, timezone: tz, allowedHoursStart = 9, allowedHoursEnd = 22, meetingDurationMinutes = 60 }) {
	const dates = getDates(dateRangeStart, dateRangeEnd, tz);
	const blocks = getBlocks(allowedHoursStart, allowedHoursEnd);
	const [openDay, setOpenDay] = (0, import_react.useState)(null);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	function toggleBlock(dateStr, block) {
		const s = toUnix(dateStr, block.sh, 0, tz);
		const e = toUnix(dateStr, block.eh, 0, tz);
		if (isBlockSelected(windows, s, e)) onChange(windows.filter((w) => !(w.start_time === s && w.end_time === e)));
		else onChange([...windows, {
			id: uid(),
			start_time: s,
			end_time: e
		}]);
	}
	function selectAll() {
		const toAdd = [];
		for (const dateStr of dates) for (const block of blocks) {
			const s = toUnix(dateStr, block.sh, 0, tz);
			const e = toUnix(dateStr, block.eh, 0, tz);
			if (!isBlockSelected(windows, s, e) && !toAdd.some((w) => w.start_time === s && w.end_time === e)) toAdd.push({
				id: uid(),
				start_time: s,
				end_time: e
			});
		}
		onChange([...windows, ...toAdd]);
	}
	function openCustom(dateStr) {
		if (openDay === dateStr) {
			setOpenDay(null);
			return;
		}
		setOpenDay(dateStr);
		if (!drafts[dateStr]) setDrafts((p) => ({
			...p,
			[dateStr]: defaultDraft(allowedHoursStart, meetingDurationMinutes, allowedHoursEnd)
		}));
	}
	function updateDraft(dateStr, patch) {
		setDrafts((p) => ({
			...p,
			[dateStr]: {
				...p[dateStr],
				...patch
			}
		}));
	}
	function getStartOptions(dateStr) {
		const opts = [];
		for (let totalM = allowedHoursStart * 60; totalM < allowedHoursEnd * 60 - 29; totalM += 30) {
			const h = Math.floor(totalM / 60);
			const m = totalM % 60;
			opts.push({
				label: fmtTime(toUnix(dateStr, h, m, tz), tz),
				h,
				m
			});
		}
		return opts;
	}
	function getDurationOptions(startH, startM) {
		const maxMins = allowedHoursEnd * 60 - (startH * 60 + startM);
		return [
			30,
			60,
			90,
			120,
			180,
			240,
			360
		].filter((d) => d <= maxMins);
	}
	function getEndOptions(dateStr, startH, startM) {
		const opts = [];
		for (let totalM = startH * 60 + startM + 30; totalM <= allowedHoursEnd * 60; totalM += 30) {
			const h = Math.floor(totalM / 60);
			const m = totalM % 60;
			opts.push({
				label: fmtTime(toUnix(dateStr, h, m, tz), tz),
				h,
				m
			});
		}
		return opts;
	}
	function computeEnd(draft) {
		if (draft.durMins === "custom") return {
			h: draft.endH,
			m: draft.endM
		};
		const totalM = draft.startH * 60 + draft.startM + draft.durMins;
		if (totalM > allowedHoursEnd * 60) return null;
		return {
			h: Math.floor(totalM / 60),
			m: totalM % 60
		};
	}
	function addCustomWindow(dateStr) {
		const draft = drafts[dateStr];
		if (!draft) return;
		const end = computeEnd(draft);
		if (!end) return;
		const s = toUnix(dateStr, draft.startH, draft.startM, tz);
		const e = toUnix(dateStr, end.h, end.m, tz);
		if (e <= s) return;
		onChange([...windows, {
			id: uid(),
			start_time: s,
			end_time: e
		}]);
		setOpenDay(null);
	}
	const durLabels = {
		30: "30 min",
		60: "1 hr",
		90: "1.5 hr",
		120: "2 hr",
		180: "3 hr",
		240: "4 hr",
		360: "6 hr"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: ["Shown in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-text",
					children: tz
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [windows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange([]),
					className: "text-xs text-muted hover:text-danger transition-colors",
					children: "Clear all"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: selectAll,
					className: "text-xs font-medium text-accent hover:underline",
					children: "Select all blocks"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-0",
			children: dates.map((dateStr) => {
				const dateFmt = new Intl.DateTimeFormat("en-CA", {
					timeZone: tz,
					year: "numeric",
					month: "2-digit",
					day: "2-digit"
				});
				const customWindows = windows.filter((w) => dateFmt.format(/* @__PURE__ */ new Date(w.start_time * 1e3)) === dateStr).filter((w) => !isExactBlock(w, blocks, dateStr, tz));
				const isOpen = openDay === dateStr;
				const draft = drafts[dateStr];
				const durOpts = draft ? getDurationOptions(draft.startH, draft.startM) : [];
				const endOpts = draft ? getEndOptions(dateStr, draft.startH, draft.startM) : [];
				const computedEnd = draft ? computeEnd(draft) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border last:border-0 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-3 gap-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-text w-24 flex-shrink-0",
								children: fmtDayLabel(dateStr, tz)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5 flex-1",
								children: [blocks.map((block) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockPill, {
										block,
										selected: isBlockSelected(windows, toUnix(dateStr, block.sh, 0, tz), toUnix(dateStr, block.eh, 0, tz)),
										onClick: () => toggleBlock(dateStr, block)
									}, block.key);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openCustom(dateStr),
									className: cn("inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 active:scale-[0.97]", isOpen ? "bg-surface-alt border-border-strong text-text" : "bg-surface border-border text-muted hover:text-text hover:border-border-strong"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: cn("w-3 h-3 transition-transform duration-150", isOpen && "rotate-45"),
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M12 4v16m8-8H4"
										})
									}), "Add custom time"]
								})]
							})]
						}),
						isOpen && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 ml-0 sm:ml-[108px] p-3 bg-surface-alt rounded-input border border-border space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted block mb-1",
										children: "Start time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "input text-sm",
										value: `${draft.startH}:${draft.startM}`,
										onChange: (e) => {
											const [h, m] = e.target.value.split(":").map(Number);
											const newDurOpts = getDurationOptions(h, m);
											updateDraft(dateStr, {
												startH: h,
												startM: m,
												durMins: draft.durMins !== "custom" && newDurOpts.includes(draft.durMins) ? draft.durMins : newDurOpts[0] ?? meetingDurationMinutes
											});
										},
										children: getStartOptions(dateStr).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: `${o.h}:${o.m}`,
											children: o.label
										}, `${o.h}:${o.m}`))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted block mb-1",
										children: "Length"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-1",
										children: [durOpts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => updateDraft(dateStr, { durMins: d }),
											className: cn("px-2 py-1 rounded text-xs font-medium border transition-all duration-100 active:scale-[0.97]", draft.durMins === d ? "bg-accent text-white border-accent" : "bg-surface border-border text-text hover:border-accent/40"),
											children: durLabels[d] ?? `${d}m`
										}, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												const end = computeEnd(draft);
												updateDraft(dateStr, {
													durMins: "custom",
													endH: end?.h ?? allowedHoursEnd,
													endM: end?.m ?? 0
												});
											},
											className: cn("px-2 py-1 rounded text-xs font-medium border transition-all duration-100 active:scale-[0.97]", draft.durMins === "custom" ? "bg-accent text-white border-accent" : "bg-surface border-border text-text hover:border-accent/40"),
											children: "Set end time"
										})]
									})] })]
								}),
								draft.durMins === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-muted block mb-1",
									children: "End time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "input text-sm",
									value: `${draft.endH}:${draft.endM}`,
									onChange: (e) => {
										const [h, m] = e.target.value.split(":").map(Number);
										updateDraft(dateStr, {
											endH: h,
											endM: m
										});
									},
									children: endOpts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: `${o.h}:${o.m}`,
										children: o.label
									}, `${o.h}:${o.m}`))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: computedEnd ? `${fmtTime(toUnix(dateStr, draft.startH, draft.startM, tz), tz)} – ${fmtTime(toUnix(dateStr, computedEnd.h, computedEnd.m, tz), tz)}` : "Choose a length"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setOpenDay(null),
											className: "text-xs text-muted hover:text-text transition-colors",
											children: "Close"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => addCustomWindow(dateStr),
											disabled: !computedEnd,
											className: "btn-primary text-xs px-3 py-1 disabled:opacity-40",
											children: "Add"
										})]
									})]
								})
							]
						}),
						customWindows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 ml-0 sm:ml-[108px] flex flex-wrap gap-1.5",
							children: customWindows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowChip, {
								label: `${fmtTime(w.start_time, tz)} – ${fmtTime(w.end_time, tz)}`,
								onRemove: () => onChange(windows.filter((x) => x.id !== w.id))
							}, w.id))
						})
					]
				}, dateStr);
			})
		}),
		windows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center py-6 text-muted text-sm mt-2",
			children: "Choose the blocks when you could make it."
		}),
		windows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted mt-3 text-center",
			children: [
				windows.length,
				" window",
				windows.length !== 1 ? "s" : "",
				" selected"
			]
		})
	] });
}
//#endregion
//#region components/preference-form.tsx
var defaultPreferences = {
	preferred_area: "",
	max_travel_distance: "",
	food_preference: "no_preference",
	food_note: "",
	budget_preference: "no_preference",
	preferred_day_type: "no_preference",
	preferred_time_of_day: "no_preference",
	indoor_outdoor: "no_preference",
	notes: ""
};
function set(values, field, value) {
	return {
		...values,
		[field]: value
	};
}
function PillGroup({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium text-muted mb-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.value === value ? "no_preference" : opt.value),
			className: cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 active:scale-[0.97]", value === opt.value ? "bg-accent text-white border-accent" : "bg-surface border-border text-text hover:border-accent/50 hover:bg-accent-subtle/20"),
			children: opt.label
		}, opt.value))
	})] });
}
var FOOD_OPTS = [
	{
		value: "no_preference",
		label: "Anything works"
	},
	{
		value: "veg",
		label: "Veg"
	},
	{
		value: "vegan",
		label: "Vegan"
	},
	{
		value: "non_veg",
		label: "Non-veg"
	},
	{
		value: "halal",
		label: "Halal"
	},
	{
		value: "jain",
		label: "Jain"
	},
	{
		value: "eggetarian",
		label: "Eggetarian"
	},
	{
		value: "custom",
		label: "Other"
	}
];
var BUDGET_OPTS = [
	{
		value: "no_preference",
		label: "Anything works"
	},
	{
		value: "low",
		label: "Keep it affordable"
	},
	{
		value: "medium",
		label: "Mid-range"
	},
	{
		value: "high",
		label: "Splurge"
	}
];
var DAY_OPTS = [
	{
		value: "no_preference",
		label: "Anything works"
	},
	{
		value: "weekday",
		label: "Weekday"
	},
	{
		value: "weekend",
		label: "Weekend"
	}
];
var TIME_OPTS = [
	{
		value: "no_preference",
		label: "Anything works"
	},
	{
		value: "morning",
		label: "Morning"
	},
	{
		value: "afternoon",
		label: "Afternoon"
	},
	{
		value: "evening",
		label: "Evening"
	},
	{
		value: "late_night",
		label: "Late night"
	}
];
var SETTING_OPTS = [
	{
		value: "no_preference",
		label: "Anything works"
	},
	{
		value: "indoor",
		label: "Indoor"
	},
	{
		value: "outdoor",
		label: "Outdoor"
	}
];
function PreferenceForm({ values, onChange, enabledFields }) {
	const show = (key) => !enabledFields || enabledFields.length === 0 || enabledFields.includes(key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			show("food") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
				label: "Food",
				value: values.food_preference,
				options: FOOD_OPTS,
				onChange: (v) => onChange(set(values, "food_preference", v))
			}),
			show("food") && values.food_preference === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				label: "Tell us more",
				placeholder: "Gluten-free, nut allergy, etc.",
				value: values.food_note,
				onChange: (e) => onChange(set(values, "food_note", e.target.value))
			}),
			show("budget") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
				label: "Budget",
				value: values.budget_preference,
				options: BUDGET_OPTS,
				onChange: (v) => onChange(set(values, "budget_preference", v))
			}),
			show("day_type") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
				label: "Best day",
				value: values.preferred_day_type,
				options: DAY_OPTS,
				onChange: (v) => onChange(set(values, "preferred_day_type", v))
			}),
			show("time_of_day") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
				label: "Time of day",
				value: values.preferred_time_of_day,
				options: TIME_OPTS,
				onChange: (v) => onChange(set(values, "preferred_time_of_day", v))
			}),
			show("indoor_outdoor") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillGroup, {
				label: "Indoor or outdoor",
				value: values.indoor_outdoor,
				options: SETTING_OPTS,
				onChange: (v) => onChange(set(values, "indoor_outdoor", v))
			}),
			show("location") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				label: "Preferred area",
				placeholder: "Downtown, east side, close to the office...",
				value: values.preferred_area,
				onChange: (e) => onChange(set(values, "preferred_area", e.target.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				label: "Anything else? (optional)",
				placeholder: "Parking, a hard stop time, accessibility needs, or anything else the organizer should know.",
				rows: 2,
				value: values.notes,
				onChange: (e) => onChange(set(values, "notes", e.target.value))
			})
		]
	});
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
//#region app/r/[token]/page.tsx
function RespondPage() {
	const { token } = useParams();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [tokenError, setTokenError] = (0, import_react.useState)("");
	const [eventId, setEventId] = (0, import_react.useState)(null);
	const [event, setEvent] = (0, import_react.useState)(null);
	const [participant, setParticipant] = (0, import_react.useState)(null);
	const [step, setStep] = (0, import_react.useState)("availability");
	const [windows, setWindows] = (0, import_react.useState)([]);
	const [preferences, setPreferences] = (0, import_react.useState)(defaultPreferences);
	const [localTimezone, setLocalTimezone] = (0, import_react.useState)("UTC");
	const enabledPreferenceFields = parseEnabledPreferences(event?.enabled_preferences);
	const responseClosed = Boolean(event?.response_deadline && Date.now() / 1e3 > event.response_deadline);
	const preferencesSatisfied = !event || event.preferences_required !== 1 || hasMeaningfulPreferences(preferences, enabledPreferenceFields);
	(0, import_react.useEffect)(() => {
		setLocalTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!token) return;
		async function loadToken() {
			try {
				const data = await (await fetch(`/api/validate-token?token=${token}`)).json();
				if (!data.valid) {
					setTokenError("This invite link is invalid or has expired.");
					return;
				}
				if (data.role !== "participant") {
					setTokenError("This link is for organizer access, not participant replies.");
					return;
				}
				setEventId(data.event_id);
				setEvent(data.event);
				setParticipant(data.participant);
				if ((data.existing_windows?.length ?? 0) > 0) setWindows((data.existing_windows ?? []).map((w) => ({
					id: w.id,
					start_time: w.start_time,
					end_time: w.end_time
				})));
				if (data.existing_preferences) {
					const p = data.existing_preferences;
					setPreferences({
						preferred_area: p.preferred_area ?? "",
						max_travel_distance: p.max_travel_distance?.toString() ?? "",
						food_preference: p.food_preference ?? "no_preference",
						food_note: p.food_note ?? "",
						budget_preference: p.budget_preference ?? "no_preference",
						preferred_day_type: p.preferred_day_type ?? "no_preference",
						preferred_time_of_day: p.preferred_time_of_day ?? "no_preference",
						indoor_outdoor: p.indoor_outdoor ?? "no_preference",
						notes: p.notes ?? ""
					});
				}
			} catch {
				setTokenError("We could not load this invite. Try refreshing.");
			} finally {
				setLoading(false);
			}
		}
		loadToken();
	}, [token]);
	const handleSubmit = async () => {
		if (windows.length === 0) {
			setError("Add at least one time window.");
			return;
		}
		if (responseClosed) {
			setError("Responses are closed for this event.");
			return;
		}
		if (!preferencesSatisfied) {
			setError("Please add at least one preference before submitting.");
			return;
		}
		if (!eventId) return;
		setSubmitting(true);
		setError("");
		try {
			const payload = {
				token,
				availability_windows: windows.map((w) => ({
					start_time: w.start_time,
					end_time: w.end_time
				})),
				preferences: {
					preferred_area: preferences.preferred_area || void 0,
					max_travel_distance: preferences.max_travel_distance ? parseInt(preferences.max_travel_distance) : void 0,
					food_preference: preferences.food_preference,
					food_note: preferences.food_note || void 0,
					budget_preference: preferences.budget_preference,
					preferred_day_type: preferences.preferred_day_type,
					preferred_time_of_day: preferences.preferred_time_of_day,
					indoor_outdoor: preferences.indoor_outdoor,
					notes: preferences.notes || void 0
				}
			};
			const res = await fetch(`/api/events/${eventId}/respond`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error ?? "We could not save your response. Please try again.");
				return;
			}
			if (event && participant) saveEvent({
				id: eventId,
				title: event.title,
				role: "participant",
				token,
				created_at: Math.floor(Date.now() / 1e3)
			});
			setStep("success");
		} catch {
			setError("We could not save your response. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center text-muted animate-pulse",
			children: "Loading your invite..."
		})
	});
	if (tokenError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 h-12 rounded-full bg-danger-light flex items-center justify-center mx-auto mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-6 h-6 text-danger",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold text-text mb-2",
					children: "This invite link is not working"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mb-6",
					children: tokenError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/",
					className: "btn-secondary",
					children: "Back home"
				})
			]
		})
	});
	if (step === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg flex items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-sm animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 rounded-full bg-accent-subtle flex items-center justify-center mx-auto mb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-7 h-7 text-accent",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M5 13l4 4L19 7"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold text-text mb-2",
					children: "Response saved"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted mb-2",
					children: [
						"Thanks, ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-text",
							children: participant?.name
						}),
						". Your availability is in."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted mb-8",
					children: "The organizer will use everyone's replies to lock in the best time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						event?.show_results_to_participants === 1 && eventId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/e/${eventId}/summary/${token}`,
							className: "btn-secondary text-sm",
							children: "View live summary"
						}),
						event?.allow_participant_edit === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStep("availability"),
							className: "btn-secondary text-sm",
							children: "Update my response"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/",
							className: "text-sm text-muted hover:text-accent transition-colors",
							children: "Back home"
						})
					]
				})
			]
		})
	});
	const isUpdate = participant?.response_status === "responded";
	const stepIndex = [
		"availability",
		"preferences",
		"review"
	].indexOf(step);
	const showDualTimezone = event && localTimezone && localTimezone !== event.timezone;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl mx-auto px-5 h-14 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/",
					className: "font-display text-xl font-semibold text-text",
					children: "Togoo"
				}), isUpdate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted bg-surface-alt border border-border rounded-full px-3 py-1",
					children: "Updating reply"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-xl mx-auto px-5 py-8",
			children: [
				event && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-accent uppercase tracking-wide mb-1",
							children: event.event_type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold text-text mb-1",
							children: event.title
						}),
						event.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted text-sm mb-2",
							children: event.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								formatDate(event.date_range_start, event.timezone),
								" — ",
								formatDate(event.date_range_end, event.timezone),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-xs",
									children: [
										"(",
										event.timezone,
										")"
									]
								})
							]
						}),
						event.response_deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted mt-1",
							children: ["Reply by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text",
								children: formatDate(event.response_deadline, event.timezone)
							})]
						}),
						participant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted mt-1",
							children: ["Replying as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text",
								children: participant.name
							})]
						})
					]
				}),
				responseClosed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 bg-warning-light border border-warning/20 rounded-input px-4 py-3 text-sm text-warning",
					children: "Responses are closed for this event."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [
						"availability",
						"preferences",
						"review"
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all", step === s ? "bg-accent text-white" : stepIndex > i ? "bg-accent-light text-accent" : "bg-border text-muted"),
								children: stepIndex > i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-3 h-3",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2.5,
										d: "M5 13l4 4L19 7"
									})
								}) : i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-sm capitalize", step === s ? "text-text font-medium" : "text-muted"),
								children: s === "availability" ? "Availability" : s === "preferences" ? "Preferences" : "Review"
							}),
							i < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-6 h-px bg-border mx-1" })
						]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card p-5 animate-scale-in",
					children: [
						step === "availability" && event && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold text-text mb-1",
								children: "When could you make it?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted mb-5",
								children: [
									"Choose broad windows when you could join. The more flexibility you share, the easier it is to find a time that works for the group. Times are shown in ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: event.timezone }),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvailabilityPicker, {
								windows,
								onChange: setWindows,
								dateRangeStart: event.date_range_start,
								dateRangeEnd: event.date_range_end,
								timezone: event.timezone,
								allowedHoursStart: event.allowed_hours_start,
								allowedHoursEnd: event.allowed_hours_end,
								meetingDurationMinutes: event.meeting_duration_minutes
							})
						] }),
						step === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold text-text mb-1",
								children: "Anything to keep in mind?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mb-5",
								children: event?.preferences_required === 1 ? "Required for this event. Add at least one preference so the organizer can weigh tradeoffs." : "Optional, but helpful when the organizer is weighing tradeoffs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferenceForm, {
								values: preferences,
								onChange: setPreferences,
								enabledFields: enabledPreferenceFields
							})
						] }),
						step === "review" && event && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold text-text mb-1",
								children: "Ready to send?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mb-5",
								children: "Check your availability and preferences before you submit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-medium text-muted uppercase tracking-wide mb-2",
									children: [
										"Your availability (",
										windows.length,
										" window",
										windows.length !== 1 ? "s" : "",
										")"
									]
								}), windows.map((win) => {
									const eventTzFmt = new Intl.DateTimeFormat("en-US", {
										weekday: "short",
										month: "short",
										day: "numeric",
										hour: "numeric",
										minute: "2-digit",
										timeZone: event.timezone
									});
									const endFmt = new Intl.DateTimeFormat("en-US", {
										hour: "numeric",
										minute: "2-digit",
										timeZone: event.timezone
									});
									const localFmt = new Intl.DateTimeFormat("en-US", {
										hour: "numeric",
										minute: "2-digit",
										timeZone: localTimezone
									});
									const start = eventTzFmt.format(/* @__PURE__ */ new Date(win.start_time * 1e3));
									const end = endFmt.format(/* @__PURE__ */ new Date(win.end_time * 1e3));
									const localStart = localFmt.format(/* @__PURE__ */ new Date(win.start_time * 1e3));
									const localEnd = localFmt.format(/* @__PURE__ */ new Date(win.end_time * 1e3));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm text-text",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" }),
												start,
												" – ",
												end,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted",
													children: [
														"(",
														event.timezone,
														")"
													]
												})
											]
										}), showDualTimezone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted ml-3.5 mt-0.5",
											children: [
												localStart,
												" – ",
												localEnd,
												" your time (",
												localTimezone,
												")"
											]
										})]
									}, win.id);
								})] }), (preferences.food_preference !== "no_preference" || preferences.budget_preference !== "no_preference" || preferences.preferred_day_type !== "no_preference" || preferences.preferred_time_of_day !== "no_preference" || preferences.indoor_outdoor !== "no_preference" || preferences.preferred_area || preferences.notes) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-muted uppercase tracking-wide mb-2",
										children: "Your preferences"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "text-sm space-y-1",
										children: [
											preferences.food_preference !== "no_preference" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted",
													children: "Food:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: preferences.food_preference.replace(/_/g, " ")
												})]
											}),
											preferences.budget_preference !== "no_preference" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted",
													children: "Budget:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: preferences.budget_preference.replace(/_/g, " ")
												})]
											}),
											preferences.preferred_time_of_day !== "no_preference" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted",
													children: "Time:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: preferences.preferred_time_of_day.replace(/_/g, " ")
												})]
											}),
											preferences.preferred_area && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted",
													children: "Area:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: preferences.preferred_area
												})]
											}),
											preferences.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted",
													children: "Notes:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "text-text",
													children: preferences.notes
												})]
											})
										]
									})]
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 bg-danger-light border border-danger/20 rounded-input px-4 py-3 text-sm text-danger",
								children: error
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between mt-5",
					children: [
						step !== "availability" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => {
								if (step === "review") setStep("preferences");
								if (step === "preferences") setStep("availability");
							},
							children: "Back"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
						step === "availability" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: windows.length === 0,
							onClick: () => setStep("preferences"),
							children: "Continue"
						}),
						step === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: responseClosed || !preferencesSatisfied,
							onClick: () => {
								if (!preferencesSatisfied) {
									setError("Please add at least one preference before continuing.");
									return;
								}
								setError("");
								setStep("review");
							},
							children: "Continue"
						}),
						step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							loading: submitting,
							disabled: responseClosed || !preferencesSatisfied,
							onClick: handleSubmit,
							children: isUpdate ? "Update my availability" : "Send my availability"
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/vinext/dist/shims/error-boundary.js
/**
* Generic ErrorBoundary used to wrap route segments with error.tsx.
* This must be a client component since error boundaries use
* componentDidCatch / getDerivedStateFromError.
*/
var ErrorBoundaryInner = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (props.pathname !== state.previousPathname && state.error) return {
			error: null,
			previousPathname: props.pathname
		};
		return {
			error: state.error,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromError(error) {
		if (error && typeof error === "object" && "digest" in error) {
			const digest = String(error.digest);
			if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;") || digest.startsWith("NEXT_REDIRECT;")) throw error;
		}
		return { error };
	}
	reset = () => {
		this.setState({ error: null });
	};
	render() {
		if (this.state.error) {
			const FallbackComponent = this.props.fallback;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackComponent, {
				error: this.state.error,
				reset: this.reset
			});
		}
		return this.props.children;
	}
};
function ErrorBoundary({ fallback, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryInner, {
		pathname: usePathname(),
		fallback,
		children
	});
}
/**
* Inner class component that catches notFound() errors and renders the
* not-found.tsx fallback. Resets when the pathname changes (client navigation)
* so a previous notFound() doesn't permanently stick.
*
* The ErrorBoundary above re-throws notFound errors so they propagate up to this
* boundary. This must be placed above the ErrorBoundary in the component tree.
*/
var NotFoundBoundaryInner = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			notFound: false,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (props.pathname !== state.previousPathname && state.notFound) return {
			notFound: false,
			previousPathname: props.pathname
		};
		return {
			notFound: state.notFound,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromError(error) {
		if (error && typeof error === "object" && "digest" in error) {
			const digest = String(error.digest);
			if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")) return { notFound: true };
		}
		throw error;
	}
	render() {
		if (this.state.notFound) return this.props.fallback;
		return this.props.children;
	}
};
/**
* Wrapper that reads the current pathname and passes it to the inner class
* component. This enables automatic reset on client-side navigation.
*/
function NotFoundBoundary({ fallback, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundBoundaryInner, {
		pathname: usePathname(),
		fallback,
		children
	});
}
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
function LayoutSegmentProvider({ segmentMap, children }) {
	const ctx = getLayoutSegmentContext();
	if (!ctx) return children;
	return (0, import_react.createElement)(ctx.Provider, { value: segmentMap }, children);
}
//#endregion
//#region \0virtual:vite-rsc/client-references/group/facade:\0virtual:vinext-rsc-entry
var export_80177f1a457a = { default: OrganizerDashboard };
var export_d61b284da072 = { default: NewEventPage };
var export_d45468d38d17 = { default: RespondPage };
var export_630c0b371760 = { MyEvents };
var export_168aa4fcfd59 = { ShareButtons };
var export_593f344dc510 = {
	ErrorBoundary,
	NotFoundBoundary
};
var export_15c18cfaeeff = { LayoutSegmentProvider };
var export_c2747888630f = { default: Link };
//#endregion
export { export_15c18cfaeeff, export_168aa4fcfd59, export_593f344dc510, export_630c0b371760, export_80177f1a457a, export_c2747888630f, export_d45468d38d17, export_d61b284da072 };

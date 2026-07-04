"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextGallery = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const ReactGallery_1 = require("./ReactGallery");
function NextGallery(_a) {
    var { percentVw = 100, breakpoints, imgLoader } = _a, props = __rest(_a, ["percentVw", "breakpoints", "imgLoader"]);
    const render = (0, react_1.useCallback)((p) => {
        var _a;
        return ((0, jsx_runtime_1.jsx)(image_1.default, Object.assign({ src: p.src, alt: (_a = p.alt) !== null && _a !== void 0 ? _a : '', fill: true, loader: imgLoader, sizes: breakpoints
                .map((breakpoint, i) => `(max-width: ${breakpoint}px) ${(percentVw / 100) * p.sizes[i]}vw`)
                .join(', ') + `, ${(percentVw / 100) * p.sizes[breakpoints.length]}vw` }, p.nextImageProps)));
    }, [percentVw, imgLoader, breakpoints]);
    return (0, jsx_runtime_1.jsx)(ReactGallery_1.ReactGallery, Object.assign({ breakpoints: breakpoints }, props, { render: render }));
}
exports.NextGallery = NextGallery;
//# sourceMappingURL=NextGallery.js.map
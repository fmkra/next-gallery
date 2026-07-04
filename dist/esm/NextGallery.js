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
import { jsx as _jsx } from "react/jsx-runtime";
import Image from 'next/image';
import { useCallback } from 'react';
import { ReactGallery } from './ReactGallery';
export function NextGallery(_a) {
    var { percentVw = 100, breakpoints, imgLoader } = _a, props = __rest(_a, ["percentVw", "breakpoints", "imgLoader"]);
    const render = useCallback((p) => {
        var _a;
        return (_jsx(Image, Object.assign({ src: p.src, alt: (_a = p.alt) !== null && _a !== void 0 ? _a : '', fill: true, loader: imgLoader, sizes: breakpoints
                .map((breakpoint, i) => `(max-width: ${breakpoint}px) ${(percentVw / 100) * p.sizes[i]}vw`)
                .join(', ') + `, ${(percentVw / 100) * p.sizes[breakpoints.length]}vw` }, p.nextImageProps)));
    }, [percentVw, imgLoader, breakpoints]);
    return _jsx(ReactGallery, Object.assign({ breakpoints: breakpoints }, props, { render: render }));
}
//# sourceMappingURL=NextGallery.js.map
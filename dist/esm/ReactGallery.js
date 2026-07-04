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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useId, useMemo } from 'react';
import { calculateImageSizes, } from './calculateImageSizes';
const containerStyle = {
    display: `flex`,
    flexWrap: `wrap`,
};
const elementStyle = (aspectRatio, sizes) => sizes.reduce((acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc), {
    '--next-gallery-ar': `${aspectRatio}`,
    position: 'relative',
    boxSizing: `border-box`,
    flexShrink: 0,
    flexGrow: 1,
});
const ReactGalleryInner = (_a) => {
    var { render, breakpoints, gap = '1px', overlay } = _a, props = __rest(_a, ["render", "breakpoints", "gap", "overlay"]);
    const expectedRatiosLen = breakpoints.length + 1;
    if (expectedRatiosLen != props.ratios.length) {
        const shortLong = props.ratios.length < expectedRatiosLen ? 'short' : 'long';
        throw new Error(`'ratios' array is too ${shortLong}. It should have length ${expectedRatiosLen} (because ${breakpoints.length} breakpoints were provided), but has ${props.ratios.length}`);
    }
    const [sizes, width_left] = useMemo(() => calculateImageSizes(props), [
        props.ratios,
        props.images,
        props.lastRowBehavior,
        props === null || props === void 0 ? void 0 : props.shrinkLimit,
        props === null || props === void 0 ? void 0 : props.growLimit,
        props === null || props === void 0 ? void 0 : props.preferGrowing,
        props === null || props === void 0 ? void 0 : props.threshold,
    ]);
    const id = useId().replace(/:/g, '');
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
                .next-gallery__element-${id} {
                    width: var(--next-gallery-1);
                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));
                }
                .next-gallery__wl-${id} {
                    width: var(--next-gallery-1);
                    flex-shrink: 0,
                    flex-grow: 1,
                }` +
                    breakpoints
                        .map((breakpoint, i) => `
                            @media (min-width: ${breakpoint}px) {
                                .next-gallery__element-${id} {
                                    width: var(--next-gallery-${i + 2});
                                    padding-bottom: calc(var(--next-gallery-${i + 2}) / var(--next-gallery-ar));
                                }
                                .next-gallery__wl-${id} {
                                    width: var(--next-gallery-${i + 2});
                                }
                            }`)
                        .join('') }), _jsxs("div", { style: containerStyle, children: [props.images.map((img, i) => (_jsxs("div", { className: `next-gallery__element-${id}`, style: elementStyle(img.aspect_ratio, sizes[i]), children: [_jsx("div", { style: {
                                    position: 'absolute',
                                    top: gap,
                                    left: gap,
                                    right: gap,
                                    bottom: gap,
                                }, children: render(Object.assign(Object.assign({}, img), { sizes: sizes[i] })) }), overlay && (_jsx("div", { style: {
                                    position: 'absolute',
                                    top: gap,
                                    left: gap,
                                    right: gap,
                                    bottom: gap,
                                    zIndex: 2,
                                }, children: overlay(img, i) }))] }, i))), _jsx("div", { className: `next-gallery__wl-${id}`, style: width_left.reduce((acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc), {}) })] })] }));
};
export const ReactGallery = memo(ReactGalleryInner);
//# sourceMappingURL=ReactGallery.js.map
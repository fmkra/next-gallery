"use strict";var e=require("tslib"),l=require("react/jsx-runtime"),r=require("react"),t=require("next/image"),a=require("./calculateImageSizes.js");function n(e){return e&&e.__esModule?e:{default:e}}var i=n(t);const s={display:"flex",flexWrap:"wrap"},x=(e,l)=>l.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{"--next-gallery-ar":`${e}`,position:"relative",boxSizing:"border-box",flexShrink:0,flexGrow:1});exports.GalleryElement=function(t){var{widths:n,children:d}=t,g=e.__rest(t,["widths","children"]);const[c,o]=a.calculateImageSizes(g),y=r.useId().replace(/:/g,"");return l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`\n                .next-gallery__element-${y} {\n                    width: var(--next-gallery-1);\n                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));\n                }\n                .next-gallery__wl-${y} {\n                    width: var(--next-gallery-1);\n                    flex-shrink: 0,\n                    flex-grow: 1,\n                }`+n.map(((e,l)=>`\n                            @media (min-width: ${e}px) {\n                                .next-gallery__element-${y} {\n                                    width: var(--next-gallery-${l+2});\n                                    padding-bottom: calc(var(--next-gallery-${l+2}) / var(--next-gallery-ar));\n                                }\n                                .next-gallery__wl-${y} {\n                                    width: var(--next-gallery-${l+2});\n                                }\n                            }`)).join("")}),l.jsxs("div",{style:s,children:[c.map(((e,r)=>{var t;return l.jsxs("div",{className:`next-gallery__element-${y}`,style:x(g.images[r].aspect_ratio,e),children:[l.jsx("div",{style:{position:"absolute",top:"1px",left:"1px",right:"1px",bottom:"1px"},children:l.jsx(i.default,{src:g.images[r].src,alt:null!==(t=g.images[r].alt)&&void 0!==t?t:"",fill:!0,sizes:n.map(((l,r)=>`(max-width: ${l}px) ${1*e[r]}vw`)).join(", ")+`, ${1*c[c.length-1][r]}vw`})}),d(r)]},r)})),l.jsx("div",{className:`next-gallery__wl-${y}`,style:o.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{})})]})]})};
//# sourceMappingURL=GalleryElement.js.map
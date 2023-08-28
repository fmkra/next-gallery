"use strict";var e=require("tslib"),l=require("react/jsx-runtime"),r=require("react"),t=require("next/image"),a=require("./calculateImageSizes.js");function n(e){return e&&e.__esModule?e:{default:e}}var i=n(t);const s={display:"flex",flexWrap:"wrap"},x=(e,l)=>l.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{"--next-gallery-ar":`${e}`,position:"relative",boxSizing:"border-box",flexShrink:0,flexGrow:1});exports.Gallery=function(t){var{widths:n,gap:o="1px",percentVw:d=100,overlay:g,imgLoader:c}=t,y=e.__rest(t,["widths","gap","percentVw","overlay","imgLoader"]);const[m,p]=a.calculateImageSizes(y),u=r.useId().replace(/:/g,"");return l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`\n                .next-gallery__element-${u} {\n                    width: var(--next-gallery-1);\n                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));\n                }\n                .next-gallery__wl-${u} {\n                    width: var(--next-gallery-1);\n                    flex-shrink: 0,\n                    flex-grow: 1,\n                }`+n.map(((e,l)=>`\n                            @media (min-width: ${e}px) {\n                                .next-gallery__element-${u} {\n                                    width: var(--next-gallery-${l+2});\n                                    padding-bottom: calc(var(--next-gallery-${l+2}) / var(--next-gallery-ar));\n                                }\n                                .next-gallery__wl-${u} {\n                                    width: var(--next-gallery-${l+2});\n                                }\n                            }`)).join("")}),l.jsxs("div",{style:s,children:[m.map(((e,r)=>{var t;return l.jsxs("div",{className:`next-gallery__element-${u}`,style:x(y.images[r].aspect_ratio,e),children:[l.jsx("div",{style:{position:"absolute",top:o,left:o,right:o,bottom:o},children:l.jsx(i.default,{src:y.images[r].src,alt:null!==(t=y.images[r].alt)&&void 0!==t?t:"",fill:!0,loader:c,sizes:n.map(((l,r)=>`(max-width: ${l}px) ${d/100*e[r]}vw`)).join(", ")+`, ${d/100*m[m.length-1][r]}vw`})}),g&&l.jsx("div",{style:{position:"absolute",top:o,left:o,right:o,bottom:o,zIndex:2},children:g(r)})]},r)})),l.jsx("div",{className:`next-gallery__wl-${u}`,style:p.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{})})]})]})};
//# sourceMappingURL=Gallery.js.map

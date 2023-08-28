import{__rest as e}from"tslib";import{jsxs as l,Fragment as r,jsx as t}from"react/jsx-runtime";import{useId as n}from"react";import a from"next/image";import{calculateImageSizes as i}from"./calculateImageSizes.js";const o={display:"flex",flexWrap:"wrap"},x=(e,l)=>l.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{"--next-gallery-ar":`${e}`,position:"relative",boxSizing:"border-box",flexShrink:0,flexGrow:1});function m(m){var{widths:s,children:d}=m,g=e(m,["widths","children"]);const[c,p]=i(g),y=n().replace(/:/g,"");return l(r,{children:[t("style",{children:`\n                .next-gallery__element-${y} {\n                    width: var(--next-gallery-1);\n                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));\n                }\n                .next-gallery__wl-${y} {\n                    width: var(--next-gallery-1);\n                    flex-shrink: 0,\n                    flex-grow: 1,\n                }`+s.map(((e,l)=>`\n                            @media (min-width: ${e}px) {\n                                .next-gallery__element-${y} {\n                                    width: var(--next-gallery-${l+2});\n                                    padding-bottom: calc(var(--next-gallery-${l+2}) / var(--next-gallery-ar));\n                                }\n                                .next-gallery__wl-${y} {\n                                    width: var(--next-gallery-${l+2});\n                                }\n                            }`)).join("")}),l("div",{style:o,children:[c.map(((e,r)=>{var n;return l("div",{className:`next-gallery__element-${y}`,style:x(g.images[r].aspect_ratio,e),children:[t("div",{style:{position:"absolute",top:"1px",left:"1px",right:"1px",bottom:"1px"},children:t(a,{src:g.images[r].src,alt:null!==(n=g.images[r].alt)&&void 0!==n?n:"",fill:!0,sizes:s.map(((l,r)=>`(max-width: ${l}px) ${1*e[r]}vw`)).join(", ")+`, ${1*c[c.length-1][r]}vw`})}),d(r)]},r)})),t("div",{className:`next-gallery__wl-${y}`,style:p.reduce(((e,l,r)=>(e[`--next-gallery-${r+1}`]=`${l}%`,e)),{})})]})]})}export{m as GalleryElement};
//# sourceMappingURL=GalleryElement.js.map

"use strict";function t(t){return Math.floor(1e4*t)/100}exports.calculateImageSizes=e=>{var o;const s=Array.from({length:e.images.length},(()=>[])),l=[];for(const r of e.ratios){let a=0,i=[],n=0;for(let o=0;o<e.images.length;o++)if(a+e.images[o].aspect_ratio<=r)a+=e.images[o].aspect_ratio;else{n=i.length;for(let s=i.length;s<o;s++){const o=t(e.images[s].aspect_ratio/a);i.push(o)}a=e.images[o].aspect_ratio}const h=i.slice(n);for(let t=1;t<h.length;t++)h[t]+=h[t-1];h.push(100);let c=0;const f=i.length;let g=0;const p=[];for(let o=i.length;o<e.images.length;o++){const s=t(e.images[o].aspect_ratio/r);for(i.push(s),g+=s;h[c]<g;)c++;p.push(h[c]/g)}if("fill"==e.lastRowBehavior){const t=r/a;if(1>=t*(null!==(o=e.threshold)&&void 0!==o?o:0))for(let e=f;e<i.length;e++)i[e]*=t}else if("match-previous"==e.lastRowBehavior){let t=100/g;for(const e of p)e<t&&(t=e);for(let e=f;e<i.length;e++)i[e]*=t}let u=100;for(let t=f;t<i.length;t++)u-=i[t];for(const t in i)s[t].push(i[t]);l.push(u)}return[s,l]};
//# sourceMappingURL=calculateImageSizes.js.map

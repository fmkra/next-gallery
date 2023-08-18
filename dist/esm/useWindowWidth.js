import{useState as e,useEffect as n}from"react";function r(){const[r,t]=e(null);return n((()=>{const e=()=>t(window.innerWidth);return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}),[]),r}export{r as default};
//# sourceMappingURL=useWindowWidth.js.map

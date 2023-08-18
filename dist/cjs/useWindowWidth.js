"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");exports.default=function(){const[t,r]=e.useState(null);return e.useEffect((()=>{const e=()=>r(window.innerWidth);return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}),[]),t};
//# sourceMappingURL=useWindowWidth.js.map

import{r as n,j as e}from"./jsx-runtime-C2_ZV5RT.js";import{T as h}from"./ThemeContext-DeGVsnbL.js";import{l as x,n as y,o as S,p as f,_ as j,M as w,L as g,O as M,S as k}from"./components--m7cAfHq.js";/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function O({getKey:r,...l}){let{isSpaMode:c}=x(),o=y(),u=S();f({getKey:r,storageKey:a});let m=n.useMemo(()=>{if(!r)return null;let t=r(o,u);return t!==o.key?t:null},[]);if(c)return null;let d=((t,p)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let i=JSON.parse(sessionStorage.getItem(t)||"{}")[p||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(s){console.error(s),sessionStorage.removeItem(t)}}).toString();return n.createElement("script",j({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${d})(${JSON.stringify(a)}, ${JSON.stringify(m)})`}}))}const T=()=>[{title:"Remix.js. Проба в1.0"}];function _(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(w,{}),e.jsx(g,{})]}),e.jsx(h,{children:e.jsxs("body",{children:[e.jsx(M,{}),e.jsx(O,{}),e.jsx(k,{})]})})]})}export{_ as default,T as meta};

import{o as h,p as x,q as y,t as S,r as n,_ as f,n as e,M as j,L as w,O as g,S as M}from"./components-C7w5KGCO.js";import{T as k}from"./ThemeContext-BEsUXrFM.js";/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function O({getKey:r,...l}){let{isSpaMode:c}=h(),o=x(),u=y();S({getKey:r,storageKey:a});let d=n.useMemo(()=>{if(!r)return null;let t=r(o,u);return t!==o.key?t:null},[]);if(c)return null;let m=((t,p)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let i=JSON.parse(sessionStorage.getItem(t)||"{}")[p||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(s){console.error(s),sessionStorage.removeItem(t)}}).toString();return n.createElement("script",f({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(a)}, ${JSON.stringify(d)})`}}))}const L=()=>[{title:"Remix.js. Проба в1.0"}];function T(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(j,{}),e.jsx(w,{})]}),e.jsx(k,{children:e.jsxs("body",{children:[e.jsx(g,{}),e.jsx(O,{}),e.jsx(M,{})]})})]})}export{T as default,L as meta};

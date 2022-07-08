"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[92802],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>m});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=n.createContext({}),l=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},c=function(e){var r=l(e.components);return n.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),f=l(t),m=o,v=f["".concat(s,".").concat(m)]||f[m]||u[m]||i;return t?n.createElement(v,a(a({ref:r},c),{},{components:t})):n.createElement(v,a({ref:r},c))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=f;var p={};for(var s in r)hasOwnProperty.call(r,s)&&(p[s]=r[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var l=2;l<i;l++)a[l]=t[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},71038:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var n=t(87462),o=(t(67294),t(3905));const i={sidebar_label:"BrowserFetcher.revisionInfo"},a="BrowserFetcher.revisionInfo() method",p={unversionedId:"api/puppeteer.browserfetcher.revisioninfo",id:"version-15.3.1/api/puppeteer.browserfetcher.revisioninfo",title:"BrowserFetcher.revisionInfo() method",description:"Signature:",source:"@site/versioned_docs/version-15.3.1/api/puppeteer.browserfetcher.revisioninfo.md",sourceDirName:"api",slug:"/api/puppeteer.browserfetcher.revisioninfo",permalink:"/15.3.1/api/puppeteer.browserfetcher.revisioninfo",draft:!1,tags:[],version:"15.3.1",frontMatter:{sidebar_label:"BrowserFetcher.revisionInfo"},sidebar:"sidebar",previous:{title:"BrowserFetcher.remove",permalink:"/15.3.1/api/puppeteer.browserfetcher.remove"},next:{title:"BrowserFetcherOptions",permalink:"/15.3.1/api/puppeteer.browserfetcheroptions"}},s={},l=[{value:"Parameters",id:"parameters",level:2}],c={toc:l};function u(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"browserfetcherrevisioninfo-method"},"BrowserFetcher.revisionInfo() method"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Signature:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"class BrowserFetcher {\n  revisionInfo(revision: string): BrowserFetcherRevisionInfo;\n}\n")),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"revision"),(0,o.kt)("td",{parentName:"tr",align:null},"string"),(0,o.kt)("td",{parentName:"tr",align:null},"The revision to get info for.")))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns:")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/15.3.1/api/puppeteer.browserfetcherrevisioninfo"},"BrowserFetcherRevisionInfo")),(0,o.kt)("p",null,"The revision info for the given revision."))}u.isMDXComponent=!0}}]);
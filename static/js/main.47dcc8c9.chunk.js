(this["webpackJsonpcovitrack-frontend"]=this["webpackJsonpcovitrack-frontend"]||[]).push([[0],{197:function(e,t,n){"use strict";n.r(t);var r=n(6),c=n(1),a=n.n(c),o=n(88),i=n.n(o),u=n(22),l=n(15),s=n(19),f=n(50),b=n.n(f),j=n(17),d=n(10),O=n(8),v=n(0),h=n(20),p=n.n(h),m=n(49),x="yyyyMMdd",y=100,g="https://tmikoss.github.io/covitrack",w=n(30),k=Object(w.a)((function(e){return{countries:{},loaded:!1,load:function(){var t=Object(m.a)(p.a.mark((function t(){var n,r,c,a,o,i,u,l;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(g,"/api/cases.json"));case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,c={},a=Object(O.a)(r);try{for(a.s();!(o=a.n()).done;)i=o.value,u=i.country,l=i.newCases,c[u]=l}catch(s){a.e(s)}finally{a.f()}e({countries:c,loaded:!0});case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}})),E=function(e){return e.loaded},M=function(e){return e.load},D=n(93),I=Object(w.a)((function(e){var t=new Date(2020,0,1);return{focusDate:t,minDate:t,maxDate:Object(D.a)(new Date,2),setFocusDate:function(t){return e({focusDate:t})}}})),C=n(32),L=function(e,t){var n=(90-t)*(Math.PI/180),r=(e+180)*(Math.PI/180),c=-100*Math.sin(n)*Math.cos(r),a=y*Math.sin(n)*Math.sin(r);return[c,y*Math.cos(n),a]},P=function(e){var t=e.country,n=t.code,a=t.outlines,o=Object(l.f)(),i=Object(c.useRef)(k.getState().countries[n]||{}),u=Object(c.useRef)(k.getState().countries.OWID_WRL||{}),f=Object(c.useRef)(Object(C.a)(I.getState().focusDate,x)),b=Object(c.useRef)(new v.Color(o.minLevel)),h=new v.Color(o.maxLevel);Object(c.useEffect)((function(){return k.subscribe((function(e){i.current=e[n]||{},u.current=e.OWID_WRL||{}}),(function(e){return e.countries}))}),[n]),Object(c.useEffect)((function(){return I.subscribe((function(e){return f.current=Object(C.a)(e,x)}),(function(e){return e.focusDate}))}),[n]);var p,m=new v.LineBasicMaterial({color:o.minLevel}),y=[],g=Object(O.a)(a);try{for(g.s();!(p=g.n()).done;){var w,E=p.value.coordinates,M=[],D=Object(O.a)(E);try{for(D.s();!(w=D.n()).done;){var P=w.value,S=L.apply(void 0,Object(j.a)(P));M.push.apply(M,Object(j.a)(S))}}catch(z){D.e(z)}finally{D.f()}var R=new v.BufferGeometry;R.setAttribute("position",new v.Float32BufferAttribute(M,3));var B={geometry:R,material:m};y.push(Object(r.jsx)("line",Object(d.a)({},B),y.length))}}catch(z){g.e(z)}finally{g.f()}return Object(s.b)((function(){var e=i.current[f.current]||0,t=u.current[f.current]||0,n=0;t>0&&(n=e/(7*t)),b.current=new v.Color(o.minLevel).lerp(h,n),m.color.lerp(b.current,.1)})),Object(r.jsx)("group",{children:y})},S=n(199),R=n(200),B=n(97),z=Object(w.a)((function(e){return{countries:[],loaded:!1,load:function(){var t=Object(m.a)(p.a.mark((function t(){var n,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(g,"/api/countries.json"));case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,c=b()(r,(function(e){var t,n=e.code,r=e.name,c=e.outline,a=e.points,o=[],i=Object(O.a)(c.coordinates);try{for(i.s();!(t=i.n()).done;){var u,l=t.value,s=Object(O.a)(l);try{for(s.s();!(u=s.n()).done;){var f=u.value;o.push({coordinates:f})}}catch(b){s.e(b)}finally{s.f()}}}catch(b){i.e(b)}finally{i.f()}return{code:n,name:r,outlines:o,points:{coordinates:(null===a||void 0===a?void 0:a.coordinates)||[]}}})),e({countries:c,loaded:!0});case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}})),W=function(e){return e.loaded},H=function(e){return e.load},F=n(67),_=n(99),A=Object(c.memo)((function(){return 0===(Object(_.a)()||{tier:0}).tier?null:Object(r.jsx)(c.Suspense,{fallback:null,children:Object(r.jsx)(F.b,{children:Object(r.jsx)(F.a,{luminanceThreshold:.4,luminanceSmoothing:1,intensity:2},"bloom")})})})),G=function(){var e=Object(l.f)();return Object(r.jsxs)("mesh",{children:[Object(r.jsx)("sphereBufferGeometry",{args:[97,100,100]}),Object(r.jsx)("meshBasicMaterial",{color:e.background,side:1,transparent:!0,opacity:.95})]})},J=function(){var e=Object(l.f)(),t=z(Object(c.useCallback)((function(e){return e.countries}),[])),n=b()(t,(function(e){return Object(r.jsx)(P,{country:e},e.code)}));return Object(r.jsx)(s.a,{onCreated:function(t){return t.gl.setClearColor(e.background)},colorManagement:!1,children:Object(r.jsxs)(l.a.Provider,{value:e,children:[Object(r.jsx)(S.a,{fade:!0,factor:10,radius:320}),Object(r.jsx)("ambientLight",{}),n,Object(r.jsx)(G,{}),Object(r.jsx)(B.a,{makeDefault:!0,near:.001,far:1e3,fov:90,position:[120,120,0]}),Object(r.jsx)(R.a,{enablePan:!1,minDistance:1.1*y,maxDistance:300}),Object(r.jsx)(A,{})]})})},V={background:"#060606",minLevel:"#ffffff",maxLevel:"#ff0000"},T=n(89),q=n(7),K=n(68),N=n(37),Q=n(98),U=n.n(Q);function X(){return(X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Y(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var Z=c.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),$=c.createElement("path",{d:"M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"});function ee(e,t){var n=e.title,r=e.titleId,a=Y(e,["title","titleId"]);return c.createElement("svg",X({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"18px",height:"18px",ref:t,"aria-labelledby":r},a),n?c.createElement("title",{id:r},n):null,Z,$)}var te=c.forwardRef(ee);n.p;function ne(){return(ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function re(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var ce=c.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),ae=c.createElement("path",{d:"M8 5v14l11-7z"});function oe(e,t){var n=e.title,r=e.titleId,a=re(e,["title","titleId"]);return c.createElement("svg",ne({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"18px",height:"18px",ref:t,"aria-labelledby":r},a),n?c.createElement("title",{id:r},n):null,ce,ae)}var ie=c.forwardRef(oe);n.p;function ue(){return(ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function le(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var se=c.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),fe=c.createElement("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"});function be(e,t){var n=e.title,r=e.titleId,a=le(e,["title","titleId"]);return c.createElement("svg",ue({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",width:"18px",height:"18px",ref:t,"aria-labelledby":r},a),n?c.createElement("title",{id:r},n):null,se,fe)}var je=c.forwardRef(be);n.p;function de(){var e=Object(u.a)([""]);return de=function(){return e},e}function Oe(){var e=Object(u.a)([""]);return Oe=function(){return e},e}function ve(){var e=Object(u.a)([""]);return ve=function(){return e},e}function he(){var e=Object(u.a)(["\n  background-color: transparent;\n  border: none;\n  outline: none;\n  opacity: ",";\n"]);return he=function(){return e},e}function pe(){var e=Object(u.a)(["\n  grid-area: date;\n"]);return pe=function(){return e},e}function me(){var e=Object(u.a)(["\n  grid-area: avg;\n  white-space: nowrap;\n  overflow: hidden;\n"]);return me=function(){return e},e}function xe(){var e=Object(u.a)(["\n  flex: 1;\n"]);return xe=function(){return e},e}function ye(){var e=Object(u.a)(["\n  grid-area: slider;\n  display: flex;\n  flex-flow: row;\n"]);return ye=function(){return e},e}function ge(){var e=Object(u.a)(["\n  width: 100%;\n  position: absolute;\n  top: 0;\n  display: grid;\n  grid-template-columns: 20vw auto 20vw;\n  grid-template-areas: 'date slider avg';\n  align-items: center;\n  color: ",";\n  text-align: center;\n\n  @media only screen and (max-width: 600px) {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas:\n      'slider slider'\n      'date avg';\n  }\n"]);return ge=function(){return e},e}var we=l.e.div(ge(),(function(e){return e.theme.minLevel})),ke=l.e.div(ye()),Ee=l.e.input(xe()),Me=l.e.div(me()),De=l.e.div(pe()),Ie=l.e.button(he(),(function(e){return e.disabled?.5:1})),Ce=Object(l.e)(je).attrs((function(){return{width:40,height:40}}))(ve()),Le=Object(l.e)(ie).attrs((function(){return{width:40,height:40}}))(Oe()),Pe=Object(l.e)(te).attrs((function(){return{width:40,height:40}}))(de()),Se={"-5":Object(r.jsx)(Ce,{}),"-1":Object(r.jsx)(Pe,{transform:"scale(-1, 1)"}),0:Object(r.jsx)(Le,{transform:"scale(-1, 1)"}),1:Object(r.jsx)(Le,{transform:"scale(-1, 1)"}),5:Object(r.jsx)(Le,{transform:"scale(-1, 1)"})},Re={"-5":0,"-1":-5,0:-1,1:-1,5:-1},Be={"-5":Object(r.jsx)(Le,{}),"-1":Object(r.jsx)(Le,{}),0:Object(r.jsx)(Le,{}),1:Object(r.jsx)(Pe,{}),5:Object(r.jsx)(Ce,{})},ze={"-5":1,"-1":1,0:1,1:5,5:0},We=function(){var e=I(),t=e.minDate,n=e.maxDate,a=e.focusDate,o=e.setFocusDate,i=Object(c.useState)(0),u=Object(q.a)(i,2),l=u[0],s=u[1],f=k(Object(c.useCallback)((function(e){return e.countries.OWID_WRL||{}}),[]))[Object(C.a)(a,x)]||0;Object(c.useEffect)((function(){var e=setInterval((function(){var e=Object(N.a)(a,l);l>0&&e<=n||l<0&&e>=t?o(e):l<0?(o(t),s(0)):l>0&&(o(n),s(0))}),100);return function(){return clearInterval(e)}}),[a,l]);var b=Object(K.a)(n,t),j=Object(K.a)(a,t),d=Object(c.useCallback)((function(){return s((function(e){return Re[e]}))}),[]),O=Object(c.useCallback)((function(){return s((function(e){return ze[e]}))}),[]);return Object(r.jsxs)(we,{children:[Object(r.jsx)(De,{children:Object(C.a)(a,"dd.MM.yyyy")}),Object(r.jsxs)(ke,{children:[Object(r.jsx)(Ie,{onClick:d,disabled:a===t,children:Se[l]}),Object(r.jsx)(Ee,{type:"range",min:0,max:b,value:j,onChange:function(e){var n=e.target.value;s(0),o(Object(N.a)(t,parseInt(n)))}}),Object(r.jsx)(Ie,{onClick:O,disabled:a===n,children:Be[l]})]}),Object(r.jsxs)(Me,{children:["avg ",U()(f,2)," new cases / million"]})]})};function He(){var e=Object(u.a)(["\n  ","\n\n  #root {\n    height: 100vh;\n    font-family: 'Roboto', sans-serif;\n  }\n"]);return He=function(){return e},e}var Fe=Object(l.c)(He(),T.a),_e=function(){return function(){var e=z(W),t=z(H);Object(c.useEffect)((function(){e||t()}),[t,e])}(),function(){var e=k(E),t=k(M);Object(c.useEffect)((function(){e||t()}),[t,e])}(),Object(r.jsxs)(l.b,{theme:V,children:[Object(r.jsx)(Fe,{}),Object(r.jsx)(J,{}),Object(r.jsx)(We,{})]})};i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(_e,{})}),document.getElementById("root"))}},[[197,1,2]]]);
//# sourceMappingURL=main.47dcc8c9.chunk.js.map
(this["webpackJsonpcovitrack-frontend"]=this["webpackJsonpcovitrack-frontend"]||[]).push([[0],{196:function(e,t,n){"use strict";n.r(t);var r=n(7),c=n(0),a=n.n(c),o=n(83),u=n.n(o),i=n(21),s=n(12),f=n(16),l=n(45),j=n.n(l),b=n(13),O=n(6),d=n(15),v=n(2),h=n(19),p=n.n(h),x=n(44),y="yyyyMMdd",m=100,g="https://tmikoss.github.io/covitrack",w=n(26),k=Object(w.a)((function(e){return{countries:{},loaded:!1,load:function(){var t=Object(x.a)(p.a.mark((function t(){var n,r,c,a,o,u,i,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(g,"/api/cases.json"));case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,c={},a=Object(d.a)(r);try{for(a.s();!(o=a.n()).done;)u=o.value,i=u.country,s=u.newCases,c[i]=s}catch(f){a.e(f)}finally{a.f()}e({countries:c,loaded:!0});case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}})),D=function(e){return e.loaded},C=function(e){return e.load},M=n(89),L=Object(w.a)((function(e){var t=Object(M.a)(new Date,2);return{focusDate:t,minDate:new Date(2020,0,1),maxDate:t,setFocusDate:function(t){return e({focusDate:t})}}})),I=n(27),R=function(e,t){var n=(90-t)*(Math.PI/180),r=(e+180)*(Math.PI/180),c=-100*Math.sin(n)*Math.cos(r),a=m*Math.sin(n)*Math.sin(r);return[c,m*Math.cos(n),a]},E=function(e){var t=e.country,n=t.code,a=t.features,o=Object(s.f)(),u=Object(c.useRef)(k.getState().countries[n]||{}),i=Object(c.useRef)(k.getState().countries.OWID_WRL||{}),l=Object(c.useRef)(Object(I.a)(L.getState().focusDate,y)),j=Object(c.useRef)(new v.Color(o.minLevel)),h=new v.Color(o.maxLevel);Object(c.useEffect)((function(){return k.subscribe((function(e){u.current=e[n]||{},i.current=e.OWID_WRL||{}}),(function(e){return e.countries}))}),[n]),Object(c.useEffect)((function(){return L.subscribe((function(e){return l.current=Object(I.a)(e,y)}),(function(e){return e.focusDate}))}),[n]);var p,x=new v.LineBasicMaterial({color:o.minLevel}),m=[],g=Object(d.a)(a);try{for(g.s();!(p=g.n()).done;){var w,D=p.value.coordinates,C=[],M=Object(d.a)(D);try{for(M.s();!(w=M.n()).done;){var E=w.value,B=R.apply(void 0,Object(b.a)(E));C.push.apply(C,Object(b.a)(B))}}catch(P){M.e(P)}finally{M.f()}var W=new v.BufferGeometry;W.setAttribute("position",new v.Float32BufferAttribute(C,3));var S={geometry:W,material:x};m.push(Object(r.jsx)("line",Object(O.a)({},S),m.length))}}catch(P){g.e(P)}finally{g.f()}return Object(f.c)((function(){var e=u.current[l.current]||0,t=i.current[l.current]||0,n=0;t>0&&(n=e/(5*t)),j.current=new v.Color(o.minLevel).lerp(h,n),x.color.lerp(j.current,.1)})),Object(r.jsx)("group",{children:m})},B=n(198),W=n(96),S=n(94);Object(f.b)({OrbitControls:S.a});var P=function(){var e=Object(f.d)(),t=e.camera,n=e.gl.domElement,a=Object(c.useRef)();return Object(f.c)((function(e){var t;return null===(t=a.current)||void 0===t?void 0:t.update()})),Object(r.jsx)("orbitControls",{ref:a,args:[t,n]})},F=n(88),_=Object(w.a)(Object(F.persist)((function(e){return{countries:[],loaded:!1,load:function(){var t=Object(x.a)(p.a.mark((function t(){var n,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(g,"/api/countries.json"));case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,c=j()(r,(function(e){var t=e.code,n=e.name,r=e.geography,c=[];if("MultiPolygon"===r.type){var a,o=Object(d.a)(r.coordinates);try{for(o.s();!(a=o.n()).done;){var u,i=a.value,s=Object(d.a)(i);try{for(s.s();!(u=s.n()).done;){var f=u.value;c.push({coordinates:f})}}catch(O){s.e(O)}finally{s.f()}}}catch(O){o.e(O)}finally{o.f()}}else{var l,j=Object(d.a)(r.coordinates);try{for(j.s();!(l=j.n()).done;){var b=l.value;c.push({coordinates:b})}}catch(O){j.e(O)}finally{j.f()}}return{code:t,name:n,features:c}})),e({countries:c,loaded:!0});case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}}),{name:"countries-base-data"})),A=function(e){return e.loaded},G=function(e){return e.load},J=function(){var e=Object(s.f)();return Object(r.jsxs)("mesh",{children:[Object(r.jsx)("sphereBufferGeometry",{args:[98.5,100,100]}),Object(r.jsx)("meshBasicMaterial",{color:e.background,side:2,transparent:!0,opacity:.95})]})},q=function(){var e=Object(s.f)(),t=_(Object(c.useCallback)((function(e){return e.countries}),[])),n=j()(t,(function(e){return Object(r.jsx)(E,{country:e},e.code)}));return Object(r.jsx)(f.a,{onCreated:function(t){return t.gl.setClearColor(e.background)},colorManagement:!1,children:Object(r.jsxs)(s.a.Provider,{value:e,children:[Object(r.jsx)(B.a,{fade:!0,factor:3}),Object(r.jsx)("ambientLight",{}),n,Object(r.jsx)(J,{}),Object(r.jsx)(W.a,{makeDefault:!0,near:.001,far:360,fov:90,position:[120,120,0]}),Object(r.jsx)(P,{})]})})},z={background:"#060606",minLevel:"#ffffff",maxLevel:"#ff0000"},H=n(84),K=n(10),N=n(62),Q=n(32),T=n(95),U=n.n(T);function V(){var e=Object(i.a)(["\n  background-color: transparent;\n  border: none;\n  outline: none;\n"]);return V=function(){return e},e}function X(){var e=Object(i.a)(["\n  text-align: center;\n"]);return X=function(){return e},e}function Y(){var e=Object(i.a)(["\n  flex: 1;\n"]);return Y=function(){return e},e}function Z(){var e=Object(i.a)(["\n  display: flex;\n  flex-flow: row;\n  width: 40vw;\n"]);return Z=function(){return e},e}function $(){var e=Object(i.a)(["\n  width: 100%;\n  position: absolute;\n  top: 0;\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n\n  color: white;\n"]);return $=function(){return e},e}var ee=s.e.div($()),te=s.e.div(Z()),ne=s.e.input(Y()),re=s.e.div(X()),ce=s.e.button(V()),ae={"-5":"\u23f8\ufe0f","-1":"\u23ea\ufe0f",0:"\u25c0\ufe0f",1:"\u25c0\ufe0f",5:"\u25c0\ufe0f"},oe={"-5":0,"-1":-5,0:-1,1:-1,5:-1},ue={"-5":"\u25b6\ufe0f","-1":"\u25b6\ufe0f",0:"\u25b6\ufe0f",1:"\u23e9\ufe0f",5:"\u23f8\ufe0f"},ie={"-5":1,"-1":1,0:1,1:5,5:0},se=function(){var e=L(),t=e.minDate,n=e.maxDate,a=e.focusDate,o=e.setFocusDate,u=Object(c.useState)(0),i=Object(K.a)(u,2),s=i[0],f=i[1],l=k(Object(c.useCallback)((function(e){return e.countries.OWID_WRL||{}}),[]))[Object(I.a)(a,y)]||0;Object(c.useEffect)((function(){var e=setInterval((function(){var e=Object(Q.a)(a,s);s>0&&e<=n||s<0&&e>=t?o(e):s<0?(o(t),f(0)):s>0&&(o(n),f(0))}),100);return function(){return clearInterval(e)}}),[a,s]);var j=Object(N.a)(n,t),b=Object(N.a)(a,t),O=Object(c.useCallback)((function(){return f((function(e){return oe[e]}))}),[]),d=Object(c.useCallback)((function(){return f((function(e){return ie[e]}))}),[]);return Object(r.jsxs)(ee,{children:[Object(r.jsx)(re,{children:Object(I.a)(a,"dd.MM.yyyy")}),Object(r.jsxs)(te,{children:[Object(r.jsx)(ce,{onClick:O,disabled:a===t,children:ae[s]}),Object(r.jsx)(ne,{type:"range",min:0,max:j,value:b,onChange:function(e){var n=e.target.value;f(0),o(Object(Q.a)(t,parseInt(n)))}}),Object(r.jsx)(ce,{onClick:d,disabled:a===n,children:ue[s]})]}),Object(r.jsxs)(re,{children:["avg ",U()(l,2)," new cases / million"]})]})};function fe(){var e=Object(i.a)(["\n  ","\n\n  #root {\n    height: 100vh;\n  }\n"]);return fe=function(){return e},e}var le=Object(s.c)(fe(),H.a),je=function(){return function(){var e=_(A),t=_(G);Object(c.useEffect)((function(){e||t()}),[t,e])}(),function(){var e=k(D),t=k(C);Object(c.useEffect)((function(){e||t()}),[t,e])}(),Object(r.jsxs)(s.b,{theme:z,children:[Object(r.jsx)(le,{}),Object(r.jsx)(q,{}),Object(r.jsx)(se,{})]})};u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(je,{})}),document.getElementById("root"))}},[[196,1,2]]]);
//# sourceMappingURL=main.094b40df.chunk.js.map
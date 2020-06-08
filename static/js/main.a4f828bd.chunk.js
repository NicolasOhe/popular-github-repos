(this["webpackJsonppopular-github-repos"]=this["webpackJsonppopular-github-repos"]||[]).push([[0],{110:function(e,t,a){e.exports=a(123)},123:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),o=a.n(c),l=a(170),i=a(169),s=a(67),u=a(87),m=Object(u.a)({props:{MuiButtonBase:{disableRipple:!0}},palette:{primary:{main:"#556cd6"},secondary:{main:"#ffd600"},error:{main:s.a.A400},background:{default:"#fff"}}}),p=a(13),d=a(33),f=a(83),b=a(84),E=a(88),g=a(167),O=a(172),S=a(55),v=a(174),j=a(168),h=a(155);function y(){return r.a.createElement(S.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(h.a,{color:"inherit",href:"https://nicolascauet.me/"},"Nicolas C.")," ",(new Date).getFullYear(),".")}var _=a(35),R=a(165),T=a(156),N=a(86),D=a(17),A=a(171),L=function(e){return{type:"REPOS_SET_LOADING",value:e}};function w(){return function(e,t){var a=t().repos,n=a.selectedLanguages,r=a.selectedDate,c=new Date(r).toISOString().split("T")[0],o="created:>".concat(c),l=n.length?n.map((function(e){return"+language:".concat(encodeURIComponent(e))})).join(""):"",i="https://api.github.com/search/repositories?q=".concat(o).concat(l,"&sort=stars&order=desc&per_page=20 ");e(L(!0)),fetch(i).then((function(e){return e.json()})).then((function(t){return e(function(e){return{type:"REPOS_SET",data:e}}(t.items))})).catch((function(t){return e({type:"REPOS_SET_ERROR",value:!0})})).finally((function(){return e(L(!1))}))}}var x=Object(T.a)((function(){return{root:{margin:0}}}));function I(){var e=Object(p.b)(),t=x(),a=Object(p.c)((function(e){return e.repos.selectedDate}));return r.a.createElement(D.a,{className:t.root,utils:N.a},r.a.createElement(A.a,{margin:"normal",id:"date-picker-dialog",label:"Show most popular since:",format:"MM/dd/yyyy",value:a,onChange:function(t){e({type:"REPOS_SET_SELECTED_DATE",value:t}),e(w())},KeyboardButtonProps:{"aria-label":"change date"}}))}var C=a(23),P=a(162),k=a(178),G=a(173),M=a(160),F=a(164),B=Object(T.a)((function(e){return{formControl:{margin:e.spacing(2,0,1,0),minWidth:220,maxWidth:300}}})),W=["TypeScript","JavaScript","C","C++","Python","Go","Rust","Kotlin"].sort();function J(e,t,a){return{fontWeight:-1===t.indexOf(e)?a.typography.fontWeightRegular:a.typography.fontWeightMedium}}function V(){var e=Object(p.b)(),t=Object(p.c)((function(e){return e.repos.selectedLanguages})),a=B(),n=Object(C.a)();return r.a.createElement(P.a,{className:a.formControl},r.a.createElement(k.a,{id:"languages-filter-label"},"Languages filter"),r.a.createElement(G.a,{labelId:"languages-filter-label",id:"languages-filter",multiple:!0,value:t,onChange:function(t){e({type:"REPOS_SET_SELECTED_LANGUAGES",value:t.target.value}),e(w())},input:r.a.createElement(M.a,null),color:"secondary"},W.map((function(e){return r.a.createElement(F.a,{key:e,value:e,style:J(e,t,n)},e)}))))}var Y=Object(T.a)((function(e){return{grid:Object(_.a)({justifyContent:"space-between"},e.breakpoints.down("xs"),{justifyContent:"center"})}}));function U(){var e=Y();return r.a.createElement(O.a,{color:"text.primary"},r.a.createElement(R.a,{container:!0,className:e.grid},r.a.createElement(I,null),r.a.createElement(V,null)))}var q=a(159),K=a(163),z=a(66),H=a.n(z),Q=a(179),X=a(125),Z=a(166),$=a(158),ee=a(70),te=a.n(ee),ae=a(85),ne=function(e){return{type:"STARS_SET_INFOS",data:e}},re=function(e){return{type:"STARS_SET_LOADING",value:e}},ce=function(e){return{type:"STARS_SET_ERROR",value:e}};var oe=Object(T.a)((function(e){return{root:Object(_.a)({marginLeft:"1rem",marginTop:"1rem",width:"8rem",flexShrink:"0",display:"flex",justifyContent:"space-evenly"},e.breakpoints.down("xs"),{marginLeft:"0"})}}));function le(e){var t=e.fullName,a=Object(p.b)(),n=Object(p.c)((function(e){return e.stars.starsList})),c=oe();return r.a.createElement($.a,{className:c.root,variant:"outlined",onClick:function(e){e.preventDefault(),a(function(e){return function(t,a){if(a().stars.starsList.includes(e))t(function(e){return{type:"STARS_REMOVE",fullName:e}}(e)),t(function(e){return{type:"STARS_REMOVE_INFO",fullName:e}}(e));else{t(function(e){return{type:"STARS_ADD",fullName:e}}(e));var n=a().repos.register[e];t({type:"STARS_ADD_INFO",info:n})}var r=a().stars.starsList;window.localStorage.setItem("starred",JSON.stringify(r))}}(t))},outlined:!0},n.includes(t)?"Remove  ":"Add  ",r.a.createElement(H.a,{color:"secondary",className:c.star}))}var ie=Object(T.a)((function(e){return{listItem:{border:"1px solid lightgrey",marginBottom:"1.5rem"},link:{textDecoration:"none",width:"100%"},title:{marginBottom:"1rem"},chip:{marginLeft:"1rem",pointerEvents:"none"},star:{verticalAlign:"middle",width:"1rem",transform:"translateY(-2px)"},itemContent:Object(_.a)({display:"flex",alignItems:"flex-end"},e.breakpoints.down("xs"),{flexDirection:"column",alignItems:"center"}),itemDescription:{flexGrow:"1"}}}));function se(e){var t=e.infos,a=t.name,n=t.language,c=t.description,o=t.svn_url,l=t.full_name,i=t.stargazers_count,s=Object(p.c)((function(e){return e.stars.starsList})),u=ie(),m=r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,{component:"h5",variant:"h5",className:u.title,color:"textPrimary"},r.a.createElement("span",null,a),r.a.createElement(Q.a,{className:u.chip,variant:"outlined",label:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,i+(s.includes(l)?1:0)),r.a.createElement(H.a,{color:"secondary",className:u.star}))}),n&&r.a.createElement(Q.a,{component:"span",variant:"outlined",className:u.chip,label:r.a.createElement("span",null,n)}))),d=r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:u.itemDescription},r.a.createElement(S.a,{component:"span",variant:"body2",className:u.inline,color:"textPrimary"},c||"No description.")),r.a.createElement(le,{fullName:l}));return r.a.createElement(X.a,{button:!0,className:u.listItem,component:"li"},r.a.createElement("a",{href:o,className:u.link},r.a.createElement(Z.a,{primary:m,secondaryTypographyProps:{className:u.itemContent},secondary:d})))}var ue=Object(T.a)((function(e){return{root:{width:"100%"},noData:{marginTop:"2rem",marginBottom:"1rem",textAlign:"center"},progress:{display:"block",margin:"3rem auto"}}}));function me(e){var t=e.data,a=e.loading,n=e.noDataMessage,c=ue();return a?r.a.createElement(q.a,{className:c.progress}):0===t.length?r.a.createElement(S.a,{component:"p",variant:"p",className:c.noData,color:"textPrimary"},n||"No data."):r.a.createElement(K.a,{className:c.root},t.map((function(e){return r.a.createElement(se,{infos:e})})))}var pe=a(89);function de(e){var t=e.children,a=e.value,n=e.index,c=Object(pe.a)(e,["children","value","index"]);return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"wrapped-tabpanel-".concat(n),"aria-labelledby":"wrapped-tab-".concat(n)},c),t)}function fe(){var e=Object(p.b)(),t=Object(p.c)((function(e){return e.repos.list})),a=Object(p.c)((function(e){return e.repos.loading})),c=Object(p.c)((function(e){return e.stars.starsInfoList})),o=Object(p.c)((function(e){return e.stars.loading}));Object(n.useEffect)((function(){e(w()),e(function(){var e=Object(ae.a)(te.a.mark((function e(t){var a,n,r,c,o,l;return te.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{n=window.localStorage.getItem("starred"),a=JSON.parse(n),t({type:"STARS_SET",data:a})}catch(i){console.error("Error parsing the starred repos saved in local storage:",i),t(ce(!0))}if(a){e.next=3;break}return e.abrupt("return");case 3:return t(re(!0)),r=a.map((function(e){return fetch("https://api.github.com/repos/".concat(e))})),e.prev=5,e.next=8,Promise.all(r);case 8:return c=e.sent,o=c.map((function(e){return e.json()})),e.next=12,Promise.all(o);case 12:l=e.sent,t(ne(l)),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(5),console.error(e.t0),t(ce(!0));case 20:t(re(!1));case 21:case"end":return e.stop()}}),e,null,[[5,16]])})));return function(t){return e.apply(this,arguments)}}())}),[e]);var l=Object(n.useState)("trending"),i=Object(E.a)(l,2),s=i[0],u=i[1];return r.a.createElement(g.a,{maxWidth:"md"},r.a.createElement(O.a,{my:4},r.a.createElement(S.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center"},"Trending GitHub repositories"),r.a.createElement(v.a,{value:s,onChange:function(e,t){u(t)},"aria-label":"wrapped label tabs example",centered:!0},r.a.createElement(j.a,{value:"trending",label:"Popular",wrapped:!0,id:"wrapped-tab-trending","aria-controls":"wrapped-tabpanel-trending"}),r.a.createElement(j.a,{value:"favorites",label:"Your stars",id:"wrapped-tab-favorites","aria-controls":"wrapped-tabpanel-favorites"})),r.a.createElement(de,{value:s,index:"trending"},r.a.createElement(U,null),r.a.createElement(me,{data:t,loading:a})),r.a.createElement(de,{value:s,index:"favorites"},r.a.createElement(me,{data:c,loading:o,noDataMessage:"You haven't starred any repo yet."})),r.a.createElement(y,null)))}var be=a(31),Ee=a(10),ge={starsList:[],starsInfoList:[],loading:!1,error:!1},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"STARS_SET":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsList:Object(be.a)(t.data)});case"STARS_ADD":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsList:[].concat(Object(be.a)(e.starsList),[t.fullName])});case"STARS_REMOVE":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsList:e.starsList.filter((function(e){return e!==t.fullName}))});case"STARS_SET_INFOS":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsInfoList:Object(be.a)(t.data)});case"STARS_ADD_INFO":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsInfoList:[].concat(Object(be.a)(e.starsInfoList),[t.info])});case"STARS_REMOVE_INFO":return Object(Ee.a)(Object(Ee.a)({},e),{},{starsInfoList:e.starsInfoList.filter((function(e){return e.full_name!==t.fullName}))});case"STARS_SET_LOADING":return Object(Ee.a)(Object(Ee.a)({},e),{},{loading:t.value});case"STARS_SET_ERROR":return Object(Ee.a)(Object(Ee.a)({},e),{},{error:t.value});default:return e}},Se={list:[],register:{},loading:!1,error:!1,selectedDate:new Date(Date.now()-6048e5),selectedLanguages:[]},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REPOS_ADD":return Object(Ee.a)(Object(Ee.a)({},e),{},{list:[].concat(Object(be.a)(e.list),Object(be.a)(t.data))});case"REPOS_SET":return Object(Ee.a)(Object(Ee.a)({},e),{},{list:Object(be.a)(t.data),register:t.data.reduce((function(e,t){return e[t.full_name]=t,e}),{})});case"REPOS_SET_LOADING":return Object(Ee.a)(Object(Ee.a)({},e),{},{loading:t.value});case"REPOS_SET_ERROR":return Object(Ee.a)(Object(Ee.a)({},e),{},{error:t.value});case"REPOS_SET_SELECTED_DATE":return Object(Ee.a)(Object(Ee.a)({},e),{},{selectedDate:t.value});case"REPOS_SET_SELECTED_LANGUAGES":return Object(Ee.a)(Object(Ee.a)({},e),{},{selectedLanguages:t.value});default:return e}},je=Object(d.combineReducers)({repos:ve,stars:Oe}),he=Object(d.createStore)(je,Object(f.composeWithDevTools)(Object(d.applyMiddleware)(b.a)));o.a.render(r.a.createElement(p.a,{store:he},r.a.createElement(i.a,{theme:m},r.a.createElement(l.a,null),r.a.createElement(fe,null))),document.querySelector("#root"))}},[[110,1,2]]]);
//# sourceMappingURL=main.a4f828bd.chunk.js.map
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[509],{4144:function(e,t,a){"use strict";a.d(t,{$_:function(){return l},Pe:function(){return n},YO:function(){return s},e0:function(){return r},mx:function(){return i},xL:function(){return o}});var n=[{name:"Id",accessor:"id",sortable:!0,defaultSort:"asc"},{name:"External Id",accessor:"external_id",sortable:!0},{name:"User",accessor:"username",sortable:!0},{name:"Type",accessor:"type",sortable:!0},{name:"Time",accessor:"time",sortable:!0},{name:"In",accessor:"amount_in",sortable:!0},{name:"Out",accessor:"amount_out",sortable:!0},{name:"Status",accessor:"status",sortable:!0}],r=[{name:"Active",accessor:"active",defaultSort:"asc"},{name:"In",accessor:"in",sortable:!0},{name:"Out",accessor:"out",sortable:!0},{name:"Profit",accessor:"profit",sortable:!0},{name:"Tickets",accessor:"tickets",sortable:!0}],s=[{name:"Shop",accessor:"shop_id",sortable:!0,defaultSort:"desc"},{name:"In",accessor:"sumIn",sortable:!0},{name:"Out",accessor:"sumOut",sortable:!0},{name:"Profit",accessor:"concatPercentage",sortable:!0}],l=[{name:"#",accessor:"id",sortable:!0,defaultSort:"asc"},{name:"id",accessor:"user_id",sortable:!0},{name:"Type",accessor:"type",sortable:!0},{name:"Time",accessor:"time",sortable:!0},{name:"In",accessor:"amount_in",sortable:!0},{name:"Out",accessor:"amount_out",sortable:!0},{name:"Status",accessor:"status",sortable:!0}],o=[],i=[{name:"#",accessor:"id",sortable:!0,defaultSort:"asc"},{name:"Time",accessor:"time",sortable:!0},{name:"Currency",accessor:"currency_id",sortable:!0},{name:"In",accessor:"amount_in",sortable:!0},{name:"Out",accessor:"amount_out",sortable:!0},{name:"Status",accessor:"status",sortable:!0}]},7640:function(e,t,a){"use strict";var n=a(4246),r=(a(7378),a(66)),s=a(9895);t.Z=function(e){var t=e.chunk,a=e.last_chunk,l=e.total,o=e.limit,i=e.goToPage,u=e.displayedItems,c=e.itemId,d=e.isDarkMode,f=e.dataIndex;if(a<=1)return(0,n.jsx)(n.Fragment,{});var m=(0,s.useTranslation)("").t,h=t<=1?1:t*o-10,b=a==t?l:u*t;return(0,n.jsxs)("div",{className:"row",children:[(0,n.jsx)("div",{className:"col-4",children:(0,n.jsx)(r.l0,{inline:!0,children:(0,n.jsx)(r.Ph,{className:d?"is-dark":"",label:m("pagination.perPage"),options:[{label:"10",value:10},{label:"25",value:25},{label:"50",value:50},{label:"100",value:100}],onChange:function(e){i(1,e.target.value,c?{shops:c,dataIndex:null!==f&&void 0!==f?f:null}:"")}})})}),(0,n.jsx)("div",{className:"col-2",children:h+"-"+b+" of "+l}),(0,n.jsxs)("div",{className:"col-5 "+(d?"is-dark":""),children:[(0,n.jsx)("button",{className:"p-button--base",disabled:1==t,onClick:function(){return i(1,o,c?{shops:c,dataIndex:null!==f&&void 0!==f?f:null}:"")},"aria-disabled":"true",children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-left",viewBox:"0 0 16 16",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"})})}),(0,n.jsx)("button",{className:"p-button--base",disabled:1==t,onClick:function(){return i(t-1==0?1:t-1,o,c?{shops:c,dataIndex:null!==f&&void 0!==f?f:null}:"")},children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-short",viewBox:"0 0 16 16",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"})})}),(0,n.jsx)("button",{id:"next-page",className:"p-button--base",disabled:t==a,onClick:function(){return i(t+1,o,c?{shops:c,dataIndex:null!==f&&void 0!==f?f:null}:"")},children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-short",viewBox:"0 0 16 16",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"})})}),(0,n.jsx)("button",{id:"last-page",className:"p-button--base",disabled:t==a,onClick:function(){return i(a,o,c?{shops:c,dataIndex:null!==f&&void 0!==f?f:null}:"")},children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-right",viewBox:"0 0 16 16",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"})})})]})]})}},4644:function(e,t,a){"use strict";a.d(t,{b:function(){return u}});var n=a(2050),r=a(3204),s=a(4246),l=a(7378),o=a(6249),i=a(7640),u=function(e,t,a,n){var s=e===t&&"asc"===a?"desc":"asc";if(t)return(0,r.Z)(n).sort((function(e,a){return null===e[t]?1:null===a[t]?-1:null===e[t]&&null===a[t]?0:e[t].toString().localeCompare(a[t].toString(),"en",{numeric:!0})*("asc"===s?1:-1)}))};t.Z=function(e){var t=e.tableHeader,a=e.tableData,r=e.headers,c=e.onClickHandler,d=e.pageTotal,f=e.total,m=e.pagination,h=e.goToPage,b=(e.mode,e.itemId),p=(e.special,e.specialColumn,e.cellRenderer),v=e.dataIndex,_=(0,l.useContext)(o.Ni).isDarkMode,x=(0,n.Z)((0,l.useState)(""),2),g=x[0],y=x[1],j=(0,n.Z)((0,l.useState)(""),2),w=j[0],k=j[1],C=(0,n.Z)((0,l.useState)(a),2),I=C[0],S=C[1],O=(0,n.Z)((0,l.useState)(!0),2),T=(O[0],O[1]);return(0,l.useEffect)((function(){T(!0),S(a)}),[a]),(0,s.jsxs)(s.Fragment,{children:[t&&(0,s.jsx)("div",{children:(0,s.jsx)("h4",{children:t})}),(0,s.jsxs)("table",{className:"p-table--mobile-card",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:r.map((function(e,t){var n=e.name,r=e.sortable,l=e.accessor,o=e.defaultSort;""===g&&o&&(y(l),k(o));var i=r?g===l&&"asc"===w?"descending":g===l&&"desc"===w?"ascending":"none":"";return(0,s.jsx)("th",{"aria-sort":i,onClick:r?function(){var e=l===g&&"asc"===w?"desc":"asc",t=u(l,l,e,a);T(!1),y(l),k(e),S(t)}:null,children:n},t)}))})}),(0,s.jsxs)("tbody",{children:[I.map((function(e,t){return(0,s.jsx)("tr",{onClick:function(){c instanceof Function&&c({itemId:e.id})},children:r.map((function(t,a){var n=t.name,r=(t.sortable,t.accessor);return(0,s.jsx)("td",{"data-heading":n,children:p?p[r](e):e[r]},a)}))},t)})),d&&(0,s.jsx)("tr",{children:r.map((function(e,t){e.name,e.sortable;var a=e.accessor;return d[a]?(0,s.jsx)("td",{children:p?p[a](d):d[a]},t):(0,s.jsx)("td",{},t)}))},"page-total"),f&&(0,s.jsx)("tr",{children:r.map((function(e,t){var a=e.accessor;return f[a]?(0,s.jsx)("td",{children:p?p[a](f):f[a]},t):(0,s.jsx)("td",{},t)}))},"total")]})]}),(0,s.jsx)("div",{children:m&&(0,s.jsx)(i.Z,{chunk:m.chunk,last_chunk:m.last_chunk,total:m.total,limit:m.limit,goToPage:h,displayedItems:a.length,itemId:b||null,isDarkMode:_,dataIndex:v})})]})}},3039:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var a=s.default,r=(null==t?void 0:t.suspense)?{}:{loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?r.loader=function(){return e}:"function"===typeof e?r.loader=e:"object"===typeof e&&(r=n({},r,e));(r=n({},r,t)).suspense&&(delete r.ssr,delete r.loading);r.loadableGenerated&&delete(r=n({},r,r.loadableGenerated)).loadableGenerated;if("boolean"===typeof r.ssr&&!r.suspense){if(!r.ssr)return delete r.ssr,l(a,r);delete r.ssr}return a(r)},t.noSSR=l;var n=a(6516).Z,r=a(2619).Z,s=(r(a(7378)),r(a(1784)));function l(e,t){return delete t.webpack,delete t.modules,e(t)}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9425:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var n=(0,a(2619).Z)(a(7378)).default.createContext(null);t.LoadableContext=n},1784:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(93).Z,r=a(7758).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(6516).Z,l=(0,a(6808).Z)(a(7378)),o=a(9425),i=[],u=[],c=!1;function d(e){var t=e(),a={loading:!0,loaded:null,error:null};return a.promise=t.then((function(e){return a.loading=!1,a.loaded=e,e})).catch((function(e){throw a.loading=!1,a.error=e,e})),a}var f=function(){function e(t,a){n(this,e),this._loadFn=t,this._opts=a,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return r(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,a=this._opts;t.loading&&("number"===typeof a.delay&&(0===a.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),a.delay)),"number"===typeof a.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),a.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(t){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=s({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function m(e){return function(e,t){var a=function(){if(!i){var t=new f(e,r);i={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return i.promise()},n=function(){a();var e=l.default.useContext(o.LoadableContext);e&&Array.isArray(r.modules)&&r.modules.forEach((function(t){e(t)}))},r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},t);r.suspense&&(r.lazy=l.default.lazy(r.loader));var i=null;if(!c){var d=r.webpack?r.webpack():r.modules;d&&u.push((function(e){var t=!0,n=!1,r=void 0;try{for(var s,l=d[Symbol.iterator]();!(t=(s=l.next()).done);t=!0){var o=s.value;if(-1!==e.indexOf(o))return a()}}catch(i){n=!0,r=i}finally{try{t||null==l.return||l.return()}finally{if(n)throw r}}}))}var m=r.suspense?function(e,t){return n(),l.default.createElement(r.lazy,s({},e,{ref:t}))}:function(e,t){n();var a=l.useSyncExternalStore(i.subscribe,i.getCurrentValue,i.getCurrentValue);return l.default.useImperativeHandle(t,(function(){return{retry:i.retry}}),[]),l.default.useMemo((function(){return a.loading||a.error?l.default.createElement(r.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:i.retry}):a.loaded?l.default.createElement((t=a.loaded)&&t.__esModule?t.default:t,e):null;var t}),[e,a])};return m.preload=function(){return a()},m.displayName="LoadableComponent",l.default.forwardRef(m)}(d,e)}function h(e,t){for(var a=[];e.length;){var n=e.pop();a.push(n(t))}return Promise.all(a).then((function(){if(e.length)return h(e,t)}))}m.preloadAll=function(){return new Promise((function(e,t){h(i).then(e,t)}))},m.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var a=function(){return c=!0,t()};h(u,e).then(a,a)}))},window.__NEXT_PRELOADREADY=m.preloadReady;var b=m;t.default=b},5218:function(e,t,a){e.exports=a(3039)},8038:function(e,t,a){e.exports=a(3057)}}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[594],{9962:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_viewers",function(){return a(6241)}])},7640:function(e,n,a){"use strict";var t=a(4246),i=(a(7378),a(66)),l=a(9895);n.Z=function(e){var n=e.chunk,a=e.last_chunk,s=e.total,r=e.limit,d=e.goToPage,c=e.displayedItems,o=e.itemId,u=e.isDarkMode,h=e.dataIndex;if(a<=1)return(0,t.jsx)(t.Fragment,{});var x=(0,l.useTranslation)("").t,m=n<=1?1:n*r-r,v=a==n?s:c*n;return(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-4",children:(0,t.jsx)(i.l0,{inline:!0,children:(0,t.jsx)(i.Ph,{defaultValue:r,className:u?"is-dark":"",label:x("pagination.perPage"),options:[{label:"10",value:10},{label:"25",value:25},{label:"50",value:50},{label:"100",value:100}],onChange:function(e){d(1,e.target.value,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")}})})}),(0,t.jsx)("div",{className:"col-2",children:m+"-"+v+" of "+s}),(0,t.jsxs)("div",{className:"col-5 "+(u?"is-dark":""),children:[(0,t.jsx)("button",{className:"p-button--base",disabled:1==n,onClick:function(){return d(1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},"aria-disabled":"true",children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-left",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"})})}),(0,t.jsx)("button",{className:"p-button--base",disabled:1==n,onClick:function(){return d(n-1==0?1:n-1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-short",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"})})}),(0,t.jsx)("button",{id:"next-page",className:"p-button--base",disabled:n==a,onClick:function(){return d(n+1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-short",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"})})}),(0,t.jsx)("button",{id:"last-page",className:"p-button--base",disabled:n==a,onClick:function(){return d(a,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-right",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"})})})]})]})}},4644:function(e,n,a){"use strict";a.d(n,{b:function(){return c}});var t=a(2050),i=a(3204),l=a(4246),s=a(7378),r=a(6249),d=a(7640),c=function(e,n,a,t){var l=e===n&&"asc"===a?"desc":"asc";if(n)return(0,i.Z)(t).sort((function(e,a){return null===e[n]?1:null===a[n]?-1:null===e[n]&&null===a[n]?0:e[n].toString().localeCompare(a[n].toString(),"en",{numeric:!0})*("asc"===l?1:-1)}))};n.Z=function(e){var n=e.tableHeader,a=e.tableData,i=e.headers,o=e.onClickHandler,u=e.pageTotal,h=e.total,x=e.pagination,m=e.goToPage,v=(e.mode,e.itemId),p=(e.special,e.specialColumn,e.cellRenderer),f=e.dataIndex,j=(0,s.useContext)(r.Ni).isDarkMode,g=(0,t.Z)((0,s.useState)(""),2),b=g[0],w=g[1],k=(0,t.Z)((0,s.useState)(""),2),C=k[0],N=k[1],_=(0,t.Z)((0,s.useState)(a),2),I=_[0],Z=_[1],P=(0,t.Z)((0,s.useState)(!0),2),S=(P[0],P[1]);return(0,s.useEffect)((function(){S(!0),Z(a)}),[a]),(0,l.jsxs)(l.Fragment,{children:[n&&(0,l.jsx)("div",{children:(0,l.jsx)("h4",{children:n})}),(0,l.jsxs)("table",{className:"p-table--mobile-card",children:[(0,l.jsx)("thead",{children:(0,l.jsx)("tr",{children:i.map((function(e,n){var t=e.name,i=e.sortable,s=e.accessor,r=e.defaultSort;""===b&&r&&(w(s),N(r));var d=i?b===s&&"asc"===C?"descending":b===s&&"desc"===C?"ascending":"none":"";return(0,l.jsx)("th",{"aria-sort":d,onClick:i?function(){var e=s===b&&"asc"===C?"desc":"asc",n=c(s,s,e,a);S(!1),w(s),N(e),Z(n)}:null,children:t},n)}))})}),(0,l.jsxs)("tbody",{children:[I.map((function(e,n){return(0,l.jsx)("tr",{onClick:function(){o instanceof Function&&o({itemId:e.id})},children:i.map((function(n,a){var t=n.name,i=(n.sortable,n.accessor);return(0,l.jsx)("td",{"data-heading":t,children:p?p[i](e):e[i]},a)}))},n)})),u&&(0,l.jsx)("tr",{children:i.map((function(e,n){e.name,e.sortable;var a=e.accessor;return u[a]?(0,l.jsx)("td",{children:p?p[a](u):u[a]},n):(0,l.jsx)("td",{},n)}))},"page-total"),h&&(0,l.jsx)("tr",{children:i.map((function(e,n){var a=e.accessor;return h[a]?(0,l.jsx)("td",{children:p?p[a](h):h[a]},n):(0,l.jsx)("td",{},n)}))},"total")]})]}),(0,l.jsx)("div",{children:x&&(0,l.jsx)(d.Z,{chunk:x.chunk,last_chunk:x.last_chunk,total:x.total,limit:x.limit,goToPage:m,displayedItems:a.length,itemId:v||null,isDarkMode:j,dataIndex:f})})]})}},6241:function(e,n,a){"use strict";a.r(n),a.d(n,{default:function(){return f}});var t=a(2050),i=a(4246),l=a(7378),s=a(6249),r=a(4506),d=a(7554),c=a(7640),o=a(66),u=a(4047),h=function(e){var n=e.panelContext,a=e.panelHeader,r=e.buttonText,d=e.ariaControlls,c=(0,t.Z)((0,l.useState)(!0),2),o=c[0],u=c[1],h=(0,l.useContext)(s.Ni).isDarkMode;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("td",{className:"u-align--left",children:(0,i.jsx)("button",{className:"u-toggle is-dense p-button "+(h?"is-dark":""),"aria-controls":d,"aria-expanded":"true",onClick:function(){return u(!o)},children:r})}),(0,i.jsx)("td",{id:d,className:"p-table__expanding-panel ","aria-hidden":o,children:(0,i.jsx)("div",{className:"row",children:(0,i.jsxs)("div",{className:"col-8",children:[(0,i.jsx)("h4",{children:a}),(0,i.jsx)("p",{children:n})]})})})]})},x=a(4644),m=a(8021),v=a(9490),p=a(9895),f=function(e){var n=e.asidePanel,a=(0,m.a)({middleware:"auth"}).user,f=(0,t.Z)((0,l.useState)(!0),2),j=f[0],g=f[1],b=(0,l.useContext)(s.Ni).isDarkMode,w=(0,l.useContext)(s.pI).openAsidePanel,k=(0,t.Z)((0,l.useState)([]),2),C=k[0],N=k[1],_=(0,t.Z)((0,l.useState)(),2),I=_[0],Z=_[1],P=(0,t.Z)((0,l.useState)(10),2),S=P[0],T=(P[1],d.cP),M=(0,t.Z)((0,l.useState)("id"),2),H=M[0],y=M[1],E=(0,t.Z)((0,l.useState)("desc"),2),D=E[0],z=E[1],L=(0,p.useTranslation)("").t;(0,l.useEffect)((function(){(0,d.ae)({onSuccess:function(e){N(e.viewers),Z(e.pagination),g(!1)},onError:function(e){g(!1)}})}),[]);var R=(0,l.useCallback)((function(e){var n=e.itemId;"analyst"!=a.level&&w({isOpen:!0,title:"Viewer Details "+n,content:(0,i.jsx)(u.$B,{viewerId:n,updatePage:F})})}),[a]),B=(0,l.useCallback)((function(e,n){(0,d.ae)({pageIndex:e,numItemsPerPage:n,onSuccess:function(e){g(!1),N(e.viewers),Z(e.pagination)},onError:function(e){g(!1)}})}),[S]),F=(0,l.useCallback)((function(){B(I.chunk,I.limit)}),[B,I]);return j?(0,i.jsx)(r.Z,{}):(0,i.jsx)(v.Z,{asidePanel:n,children:(0,i.jsxs)("div",{className:"p-panel "+(b?"is-dark":""),children:[(0,i.jsxs)("div",{className:"p-panel__header",children:[(0,i.jsx)("h4",{className:"p-panel__title",children:"Viewers"}),(0,i.jsx)("div",{className:"p-panel__controls",children:"analyst"!=a.level&&(0,i.jsx)(o.zx,{hasIcon:!0,className:"u-no-margin--bottom "+(b?"is-dark":""),onClick:function(){w({isOpen:!0,title:"Create Viewer",content:(0,i.jsx)(u.hy,{updatePage:F})})},children:(0,i.jsx)("i",{className:"p-icon--plus"})})})]}),(0,i.jsx)("div",{className:"p-panel__content",children:(0,i.jsxs)("div",{className:"u-fixed-width",children:[0==C.length&&(0,i.jsx)(o.P_,{borderless:!0,severity:"information",title:L("error.warning"),children:L("error.no_result")}),C.length>0&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("table",{"aria-label":"Ticket List Table",className:"p-table--mobile-card p-table--expanding",children:[(0,i.jsx)("thead",{children:(0,i.jsx)("tr",{children:T.map((function(e,n){var a=e.name,t=e.sortable,l=e.accessor,s=(e.defaultSort,t?H===l&&"asc"===D?"descending":H===l&&"desc"===D?"ascending":"none":"");return(0,i.jsx)("th",{"aria-sort":s,onClick:t?function(){var e=l===H&&"asc"===D?"desc":"asc",n=l,a=(0,x.b)(l,n,e,C);y(l),z(e),N(a)}:null,children:a},n)}))})}),(0,i.jsx)("tbody",{children:C.map((function(e,n){return(0,i.jsxs)("tr",{"data-index":n,children:[(0,i.jsx)("th",{"data-heading":L("veiwer.table.id"),onClick:function(){return R({itemId:e.id})},children:e.id}),(0,i.jsx)("th",{"data-heading":L("veiwer.table.macaddress"),onClick:function(){return R({itemId:e.id})},children:e.macaddress}),(0,i.jsx)("th",{"data-heading":L("veiwer.table.user"),onClick:function(){return R({itemId:e.id})},children:e.user}),(0,i.jsx)("th",{"data-heading":L("veiwer.table.monitor"),onClick:function(){return R({itemId:e.id})},children:e.monitor}),(0,i.jsx)("th",{"data-heading":L("veiwer.table.channel"),onClick:function(){return R({itemId:e.id})},children:e.channel}),(0,i.jsxs)("th",{"data-heading":L("veiwer.table.lanuage"),onClick:function(){return R({itemId:e.id})},children:[e.language," "]}),(0,i.jsx)(h,{panelContext:e.videoURL,panelHeader:"Video Url",buttonText:"Url",ariaControlls:e.id})]},n)}))})]}),I&&(0,i.jsx)(c.Z,{chunk:I.chunk,last_chunk:I.last_chunk,total:I.total,limit:I.limit,goToPage:B,isDarkMode:b,displayedItems:C.length})]})]})})]})})}}},function(e){e.O(0,[969,863,974,486,774,888,179],(function(){return n=9962,e(e.s=n);var n}));var n=e.O();_N_E=n}]);
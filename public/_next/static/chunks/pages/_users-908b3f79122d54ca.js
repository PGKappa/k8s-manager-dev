(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[361],{365:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_users",function(){return n(6805)}])},7640:function(e,a,n){"use strict";var t=n(4246),s=(n(7378),n(66)),l=n(9895);a.Z=function(e){var a=e.chunk,n=e.last_chunk,i=e.total,r=e.limit,c=e.goToPage,d=e.displayedItems,o=e.itemId,u=e.isDarkMode,h=e.dataIndex;if(n<=1)return(0,t.jsx)(t.Fragment,{});var x=(0,l.useTranslation)("").t,m=a<=1?1:a*r-r,p=n==a?i:d*a;return(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-4",children:(0,t.jsx)(s.l0,{inline:!0,children:(0,t.jsx)(s.Ph,{defaultValue:r,className:u?"is-dark":"",label:x("pagination.perPage"),options:[{label:"10",value:10},{label:"25",value:25},{label:"50",value:50},{label:"100",value:100}],onChange:function(e){c(1,e.target.value,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")}})})}),(0,t.jsx)("div",{className:"col-2",children:m+"-"+p+" of "+i}),(0,t.jsxs)("div",{className:"col-5 "+(u?"is-dark":""),children:[(0,t.jsx)("button",{className:"p-button--base",disabled:1==a,onClick:function(){return c(1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},"aria-disabled":"true",children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-left",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"})})}),(0,t.jsx)("button",{className:"p-button--base",disabled:1==a,onClick:function(){return c(a-1==0?1:a-1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-short",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"})})}),(0,t.jsx)("button",{id:"next-page",className:"p-button--base",disabled:a==n,onClick:function(){return c(a+1,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-short",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"})})}),(0,t.jsx)("button",{id:"last-page",className:"p-button--base",disabled:a==n,onClick:function(){return c(n,r,o?{shops:o,dataIndex:null!==h&&void 0!==h?h:null}:"")},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-bar-right",viewBox:"0 0 16 16",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"})})})]})]})}},4644:function(e,a,n){"use strict";n.d(a,{b:function(){return d}});var t=n(2050),s=n(3204),l=n(4246),i=n(7378),r=n(6249),c=n(7640),d=function(e,a,n,t){var l=e===a&&"asc"===n?"desc":"asc";if(a)return(0,s.Z)(t).sort((function(e,n){return null===e[a]?1:null===n[a]?-1:null===e[a]&&null===n[a]?0:e[a].toString().localeCompare(n[a].toString(),"en",{numeric:!0})*("asc"===l?1:-1)}))};a.Z=function(e){var a=e.tableHeader,n=e.tableData,s=e.headers,o=e.onClickHandler,u=e.pageTotal,h=e.total,x=e.pagination,m=e.goToPage,p=(e.mode,e.itemId),j=(e.special,e.specialColumn,e.cellRenderer),f=e.dataIndex,v=(0,i.useContext)(r.Ni).isDarkMode,g=(0,t.Z)((0,i.useState)(""),2),b=g[0],w=g[1],k=(0,t.Z)((0,i.useState)(""),2),_=k[0],N=k[1],C=(0,t.Z)((0,i.useState)(n),2),I=C[0],P=C[1],Z=(0,t.Z)((0,i.useState)(!0),2),T=(Z[0],Z[1]);return(0,i.useEffect)((function(){T(!0),P(n)}),[n]),(0,l.jsxs)(l.Fragment,{children:[a&&(0,l.jsx)("div",{children:(0,l.jsx)("h4",{children:a})}),(0,l.jsxs)("table",{className:"p-table--mobile-card",children:[(0,l.jsx)("thead",{children:(0,l.jsx)("tr",{children:s.map((function(e,a){var t=e.name,s=e.sortable,i=e.accessor,r=e.defaultSort;""===b&&r&&(w(i),N(r));var c=s?b===i&&"asc"===_?"descending":b===i&&"desc"===_?"ascending":"none":"";return(0,l.jsx)("th",{"aria-sort":c,onClick:s?function(){var e=i===b&&"asc"===_?"desc":"asc",a=d(i,i,e,n);T(!1),w(i),N(e),P(a)}:null,children:t},a)}))})}),(0,l.jsxs)("tbody",{children:[I.map((function(e,a){return(0,l.jsx)("tr",{onClick:function(){o instanceof Function&&o({itemId:e.id})},children:s.map((function(a,n){var t=a.name,s=(a.sortable,a.accessor);return(0,l.jsx)("td",{"data-heading":t,children:j?j[s](e):e[s]},n)}))},a)})),u&&(0,l.jsx)("tr",{children:s.map((function(e,a){e.name,e.sortable;var n=e.accessor;return u[n]?(0,l.jsx)("td",{children:j?j[n](u):u[n]},a):(0,l.jsx)("td",{},a)}))},"page-total"),h&&(0,l.jsx)("tr",{children:s.map((function(e,a){var n=e.accessor;return h[n]?(0,l.jsx)("td",{children:j?j[n](h):h[n]},a):(0,l.jsx)("td",{},a)}))},"total")]})]}),(0,l.jsx)("div",{children:x&&(0,l.jsx)(c.Z,{chunk:x.chunk,last_chunk:x.last_chunk,total:x.total,limit:x.limit,goToPage:m,displayedItems:n.length,itemId:p||null,isDarkMode:v,dataIndex:f})})]})}},6805:function(e,a,n){"use strict";n.r(a);var t=n(2050),s=n(4246),l=n(7378),i=n(6249),r=n(4506),c=n(66),d=n(4047),o=n(5630),u=n(8291),h=n(7640),x=n(4644),m=n(9490),p=n(8038),j=n.n(p),f=n(8021),v=n(9895);a.default=function(e){var a=e.asidePanel,n=(0,f.a)({middleware:"auth"}).user,p=(0,l.useContext)(i.Ni).isDarkMode,g=(0,l.useContext)(i.pI),b=g.openAsidePanel,w=g.closeAsidePanel,k=(0,t.Z)((0,l.useState)(10),2),_=k[0],N=(k[1],u.B),C=(0,t.Z)((0,l.useState)(""),2),I=C[0],P=C[1],Z=(0,t.Z)((0,l.useState)("asc"),2),T=Z[0],M=Z[1],S=(0,v.useTranslation)("").t,D=(0,o.JL)({itemsPerPage:_}),H=D.waiting,z=D.users,E=D.updatePage,y=D.goToPage,L=D.pagination,R=(0,l.useCallback)((function(){b&&b({title:"Create User",content:(0,s.jsx)(d.R4,{updatePage:E,auth:n})})}),[b,n]),B=(0,l.useCallback)((function(e){var a=e.itemId;b&&b({title:"User Details",content:(0,s.jsx)(d.w8,{userId:a,updatePage:E})})}),[b,n]);return(0,l.useEffect)((function(){return function(){w&&w()}}),[w]),H?(0,s.jsx)(r.Z,{}):(0,s.jsxs)(m.Z,{asidePanel:a,children:[(0,s.jsx)(j(),{children:(0,s.jsx)("title",{children:S("user.title")})}),(0,s.jsxs)("div",{className:"p-panel "+(p?"is-dark":""),children:[(0,s.jsxs)("div",{className:"p-panel__header",children:[(0,s.jsx)("h4",{className:"p-panel__title",children:S("user.header")}),(0,s.jsx)("div",{className:"p-panel__controls ",children:(0,s.jsx)("div",{className:"p-form--inline col-4 ",children:(0,s.jsx)(c.zx,{hasIcon:!0,id:"user-create-button",className:"u-no-margin--bottom "+(p?"is-dark":""),onClick:function(){R()},children:(0,s.jsx)("i",{className:"p-icon--plus"})})})})]}),(0,s.jsxs)("div",{className:"p-panel__content",children:[(0,s.jsxs)("div",{className:"u-fixed-width",children:[0==z.length&&(0,s.jsx)(c.P_,{borderless:!0,severity:"information",title:S("error.warning"),children:S("error.no_result")}),z.length>0&&(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("table",{className:"p-table--mobile-card",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:N.map((function(e,a){e.name;var n=e.sortable,t=e.accessor,l=n?I===t&&"asc"===T?"descending":I===t&&"desc"===T?"ascending":"none":"";return(0,s.jsx)("th",{"aria-sort":l,onClick:n?function(){var e=t===I&&"asc"===T?"desc":"asc",a=t,n=(0,x.b)(t,a,e,z);P(t),M(e),setUserData(n)}:null,children:S("user.table.".concat(t))},a)}))})}),(0,s.jsx)("tbody",{children:z.map((function(e,a){return(0,s.jsxs)("tr",{onClick:function(){return B({itemId:e.id})},children:[(0,s.jsxs)("th",{"data-heading":S("user.table.username"),className:"p-table__cell--icon-placeholder",children:[0==e.enabled&&(0,s.jsx)("i",{className:"p-icon--error p-tooltip--top-center"}),e.username]}),(0,s.jsx)("th",{"data-heading":S("user.table.level"),children:e.level}),(0,s.jsx)("th",{"data-heading":S("user.table.created_at"),children:(0,v.formatTime)(e.created_at,e.intl)}),(0,s.jsx)("th",{"data-heading":S("user.table.updated_at"),children:(0,v.formatTime)(e.updated_at,e.intl)})]},a)}))})]})})]}),(0,s.jsx)(h.Z,{chunk:L.chunk,last_chunk:L.last_chunk,total:L.total,limit:L.limit,displayedItems:z.length,goToPage:y,isDarkMode:p})]})]})]})}},8038:function(e,a,n){e.exports=n(3057)}},function(e){e.O(0,[969,863,974,486,774,888,179],(function(){return a=365,e(e.s=a);var a}));var a=e.O();_N_E=a}]);
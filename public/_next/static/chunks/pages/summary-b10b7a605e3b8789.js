(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[346],{1556:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/summary",function(){return a(3228)}])},3228:function(e,t,a){"use strict";a.r(t);var n=a(5034),r=a(169),s=a(2050),o=a(4246),i=a(7378),u=a(6249),l=a(66),c=a(4047),d=a(4862),m=a(4144),p=a(4506),f=a(7640),h=a(4644),g=a(7542),k=a(9895),x=a(9490),_=a(8038),j=a.n(_),S=a(1454),v=a(5218),y=a.n(v),D=a(8021),N=y()((function(){return a.e(648).then(a.t.bind(a,2648,23))}),{loadableGenerated:{webpack:function(){return[2648]}},ssr:!1}),P={id:function(e){return e.id},external_id:function(e){return e.external_id},username:function(e){return e.username},type:function(e){return e.type},time:function(e){return(0,k.formatTime)(e.time,e.intl)},amount_in:function(e){return(0,k.formatStake)(e.amount_in,e.intl)},amount_out:function(e){return(0,k.formatStake)(e.amount_out,e.intl)},status:function(e){return e.status}},T={active:function(e){return e.active},in:function(e){return(0,k.formatStake)(e.in,e.intl)},out:function(e){return(0,k.formatStake)(e.out,e.intl)},profit:function(e){return(0,k.formatStake)(e.profit,e.intl)},tickets:function(e){return e.tickets}},b={id:function(e){return e.id},user_id:function(e){return e.user_id},type:function(e){return e.type},time:function(e){return(0,k.formatTime)(e.time,e.intl)},amount_in:function(e){return(0,k.formatStake)(e.amount_in,e.intl)},amount_out:function(e){return(0,k.formatStake)(e.amount_out,e.intl)},status:function(e){return e.status}},Z={id:function(e){return e.id},user_id:function(e){return e.user_id},type:function(e){return e.type},time:function(e){return(0,k.formatTime)(e.time,e.intl)},amount_in:function(e){return(0,k.formatStake)(e.amount_in,e.intl)},amount_out:function(e){return(0,k.formatStake)(e.amount_out,e.intl)},status:function(e){return e.status}},C={concatPercentage:function(e){return(0,k.formatStake)(e.concatPercentage,e.intl)},sumIn:function(e){return(0,k.formatStake)(e.sumIn,e.intl)},sumOut:function(e){return(0,k.formatStake)(e.sumOut,e.intl)},shop_id:function(e){return e.shop_id}};t.default=function(e){var t=e.asidePanel,a=function(e){var t=e.itemId;M({isOpen:!0,title:"Ticket Details: "+t,content:(0,o.jsx)(c.AI,{ticketId:t})})},_=(0,D.a)({middleware:"auth"}).user,v=(0,g.X$)(),y=(0,k.useTranslation)("").t,I=(0,i.useContext)(u.Ni).isDarkMode,w=(0,i.useContext)(u.pI),M=w.openAsidePanel,O=w.closeAsidePanel,E=(0,s.Z)((0,i.useState)(10),2),U=E[0],F=(E[1],(0,s.Z)((0,i.useState)(!0),2)),A=F[0],H=F[1],R=(0,s.Z)((0,i.useState)([]),2),B=R[0],X=R[1],$=(0,s.Z)((0,i.useState)(),2),z=$[0],G=$[1],L=(0,s.Z)((0,i.useState)({}),2),Y=L[0],q=L[1],J=(0,s.Z)((0,i.useState)({}),2),K=J[0],Q=J[1],V=(0,s.Z)((0,i.useState)({}),2),W=V[0],ee=V[1],te=(0,s.Z)((0,i.useState)({type:"summary",groupBy:"",fromDate:v,toDate:v,shops:[],users:[]}),2),ae=te[0],ne=te[1],re=(0,s.Z)((0,i.useState)(""),2),se=re[0],oe=re[1],ie=(0,s.Z)((0,i.useState)({shops:"",users:"",type:"",fromDate:"",toDate:"",groupBy:""}),2),ue=(ie[0],ie[1],(0,s.Z)((0,i.useState)(!1),2)),le=ue[0],ce=ue[1],de=(0,s.Z)((0,i.useState)(),2),me=de[0],pe=de[1],fe=(0,i.useCallback)((function(e,t,a){H(!0);var s=(0,r.Z)((0,n.Z)({},ae,a),{chunk:e,limit:t});if("transactionShops"!=se&&"transactionUsers"!=se||!a.shops)return(0,d.ph)({params:s,onSuccess:function(e){H(!1),oe(e.mode),X(e.reports),Q(e.totalSum),ee(e.totalSumOfPerPage),G(e.pagination),ne(e.params),(0,S.Am)("Tickets updated ",{hideProgressBar:!0,autoClose:2e3,type:"success"})},onError:function(e){H(!1),(0,S.Am)(e.message?e.message:"Failed To Update tickets",{hideProgressBar:!0,autoClose:2e3,type:"error"})}}),!0;var o={shop:[a.shops],type:"transaction",chunk:e,limit:t},i=se;return(0,d.cl)({params:o,onSuccess:function(e){H(!1),oe(i),B[a.dataIndex]=e.reports,X(B),K.group[a.dataIndex]=e.totalSum,Q(K),W.group[a.dataIndex]=e.totalSumOfPerPage,ee(W),z.group[a.dataIndex]=e.pagination,G(z),(0,S.Am)("Tickets updated for shop: "+a.shops,{hideProgressBar:!0,autoClose:2e3,type:"success"})},onError:function(e){(0,S.Am)(e.message?e.message:"Failed To Update tickets",{hideProgressBar:!0,autoClose:2e3,type:"error"})}}),!0}),[U,ae]);(0,i.useCallback)((function(e){switch(H(!1),oe(e.mode),X(e.reports),Q(e.totalSum),ee(e.totalSumOfPerPage),G(e.pagination),ne(e.params),e.mode){case"summary":q(m.e0);break;case"transaction":q(m.Pe);break;case"summaryShops":q(m.YO);break;case"transactionShops":q(m.$_);break;case"transactionUsers":q(m.mx);break;case"summaryUsers":q(m.xL);break;default:console.log("default mode? ")}return!0}),[]);(0,i.useEffect)((function(){(0,d.ph)({params:ae,onSuccess:function(e){H(!1),oe(e.mode),X(e.reports),Q(e.totalSum),ee(e.totalSumOfPerPage),G(e.pagination),ne(e.params),q(m.e0)},onError:function(e){pe(e&&e.message),ce(!0),H(!1),console.warn("ON ERROR",e);var t=e.message?e.message:"Failed get data";(0,S.Am)(t,{hideProgressBar:!0,autoClose:2e3,type:"error"})}})}),[]),(0,i.useEffect)((function(){return function(){O&&O()}}),[O]);var he=(0,i.useCallback)((function(e){var t=new Date(e);t.setMonth(t.getMonth()+1);var a=ae.toDate;ae.toDate>t&&(a=t),ne((0,r.Z)((0,n.Z)({},ae),{fromDate:e.toISOString().split("T")[0],toDate:a}))}),[ae]),ge=(0,i.useCallback)((function(e){var t=new Date(e);t.setMonth(t.getMonth()-1);var a=ae.fromDate;ae.fromDate<t&&(a=t),ne((0,r.Z)((0,n.Z)({},ae),{fromDate:a,toDate:e.toISOString().split("T")[0]}))}),[ae]);if(A)return(0,o.jsx)(p.Z,{});var ke="trasnsactionShops"===se||"transaction"===se||"trasnsactionUsers"===se?a:null;return(0,o.jsxs)(x.Z,{asidePanel:t,children:[(0,o.jsx)(j(),{children:(0,o.jsx)("title",{children:"Manager - Ticket Summary"})}),(0,o.jsxs)("div",{className:"p-panel "+(I?"is-dark":""),children:[(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-2 p-panel__header ",children:(0,o.jsx)("h4",{className:"p-panel__title",children:"Summary "})}),(0,o.jsx)("div",{className:"col-10",children:(0,o.jsx)("div",{className:"p-panel__controls",children:(0,o.jsx)("div",{className:"p-form p-form--stacked",children:(0,o.jsxs)("div",{className:"p-form__group row",children:[(0,o.jsx)("div",{className:"col-1 u-align--center",children:(0,o.jsx)("label",{className:"p-form__label",children:"From"})}),(0,o.jsx)("div",{className:"col-3",children:(0,o.jsx)("div",{className:"p-form__control",children:(0,o.jsx)(N,{className:"u-no-margin--bottom "+(I?"is-dark":""),dateFormat:"dd/MM/yyyy",selected:Date.parse((0,k.formatTime)(ae.fromDate,null===_||void 0===_?void 0:_.locale)),maxDate:Date.parse(v),onChange:he})})}),(0,o.jsx)("div",{className:"col-1 u-align--center",children:(0,o.jsx)("label",{className:"p-form__label",children:"To"})}),(0,o.jsx)("div",{className:"col-3",children:(0,o.jsx)("div",{className:"p-form__control",children:(0,o.jsx)(N,{className:"u-no-margin--bottom "+(I?"is-dark":""),dateFormat:"dd/MM/yyyy",selected:Date.parse((0,k.formatTime)(ae.toDate,null===_||void 0===_?void 0:_.locale)),maxDate:Date.parse(v),onChange:ge})})}),(0,o.jsx)("div",{className:"col-2 u-align--center",children:(0,o.jsxs)(l.zx,{className:I?"is-dark":"",hasIcon:!0,onClick:function(e){e.preventDefault(),fe(1,U,ae)},children:[(0,o.jsx)("i",{className:"p-icon--change-version"}),(0,o.jsx)("span",{children:"Update"})]})})]})})})})]}),(0,o.jsx)("div",{className:"p-panel__content",children:(0,o.jsx)("div",{className:"u-fixed-width",children:le?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(l.P_,{borderless:!0,className:I?"is-dark":"",severity:"negative",title:y("error.error"),children:me})}):(0,o.jsxs)(o.Fragment,{children:[0==B.length&&(0,o.jsx)(l.P_,{borderless:!0,severity:"information",title:y("error.warning"),className:I?"is-dark":"",children:y("error.no_result")}),B.length>0&&(0,o.jsxs)(o.Fragment,{children:["transactionUsers"==se&&(0,o.jsxs)("div",{children:[B.map((function(e,t){return(0,o.jsxs)("div",{children:[(0,o.jsx)(h.Z,{tableHeader:"User id: "+e[0].user_id+" Type: "+e[0].type,tableData:e,headers:Y,onClickHandler:a,pageTotal:W.group[t],total:K.group[t],pagination:z.group[t],goToPage:fe,mode:se,itemId:e[0].user_id,dataIndex:t,cellRenderer:b}),(0,o.jsx)("hr",{})]},t)})),(0,o.jsx)(f.Z,{chunk:z.chunk,last_chunk:z.last_chunk,total:z.total,limit:z.limit,goToPage:fe,displayedItems:B.length,isDarkMode:I})]}),"transactionShops"==se&&(0,o.jsxs)("div",{children:[B.map((function(e,t){return(0,o.jsxs)("div",{children:[(0,o.jsx)(h.Z,{tableHeader:"Shop: "+e[0].shop_id,tableData:e,headers:Y,onClickHandler:a,pageTotal:W.group[t],total:K.group[t],pagination:z.group[t],goToPage:fe,mode:se,itemId:e[0].user_id,dataIndex:t,cellRenderer:Z}),(0,o.jsx)("hr",{})]},t)})),(0,o.jsx)(f.Z,{chunk:z.chunk,last_chunk:z.last_chunk,total:z.total,limit:z.limit,goToPage:fe,displayedItems:B.length,isDarkMode:I})]}),"summary"==se&&(0,o.jsx)(h.Z,{tableData:B,headers:Y,onClickHandler:ke,pageTotal:W,total:K,pagination:z,goToPage:fe,isDarkMode:I,cellRenderer:T}),"transaction"==se&&(0,o.jsx)(h.Z,{tableData:B,headers:Y,onClickHandler:ke,pageTotal:W,total:K,pagination:z,goToPage:fe,isDarkMode:I,cellRenderer:P}),"summaryShops"==se&&(0,o.jsx)(h.Z,{tableData:B,headers:Y,onClickHandler:ke,pageTotal:W,total:K,pagination:z,goToPage:fe,isDarkMode:I,cellRenderer:C}),"summaryUsers"==se&&(0,o.jsx)(h.Z,{tableData:B,headers:Y,onClickHandler:ke,pageTotal:W,total:K,pagination:z,goToPage:fe,isDarkMode:I})]})]})})})]})]})}}},function(e){e.O(0,[969,863,974,486,509,774,888,179],(function(){return t=1556,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
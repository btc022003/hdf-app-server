(self.webpackChunkhdf_app_manager=self.webpackChunkhdf_app_manager||[]).push([[945],{64317:function($,M,e){"use strict";var _=e(22122),p=e(28991),j=e(81253),l=e(67294),B=e(10244),h=e(22270),y=e(66758),s=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","showSearch","options"],D=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","options"],g=l.forwardRef(function(t,m){var O=t.fieldProps,c=t.children,R=t.params,L=t.proFieldProps,W=t.mode,x=t.valueEnum,U=t.request,A=t.showSearch,K=t.options,v=(0,j.Z)(t,s),S=(0,l.useContext)(y.Z);return l.createElement(B.Z,(0,_.Z)({mode:"edit",valueEnum:(0,h.h)(x),request:U,params:R,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,p.Z)({options:K,mode:W,showSearch:A,getPopupContainer:S.getPopupContainer},O),ref:m,proFieldProps:L},v),c)}),C=l.forwardRef(function(t,m){var O=t.fieldProps,c=t.children,R=t.params,L=t.proFieldProps,W=t.mode,x=t.valueEnum,U=t.request,A=t.options,K=(0,j.Z)(t,D),v=(0,p.Z)({options:A,mode:W||"multiple",labelInValue:!0,showSearch:!0,showArrow:!1,autoClearSearchValue:!0,optionLabelProp:"label"},O),S=(0,l.useContext)(y.Z);return l.createElement(B.Z,(0,_.Z)({mode:"edit",valueEnum:(0,h.h)(x),request:U,params:R,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,p.Z)({getPopupContainer:S.getPopupContainer},v),ref:m,proFieldProps:L},K),c)}),r=g,i=C,E=r;E.SearchSelect=i,E.displayName="ProFormComponent",M.Z=E},9321:function($,M,e){"use strict";var _=e(9715),p=e(93766),j=e(43185),l=e(94412),B=e(34792),h=e(48086),y=e(2824),s=e(67294),D=e(7085),g=e(49101),C=e(17024),r=e(85893),i=function(t){var m=t.coverImage,O=t.setCoverImage,c=(0,s.useState)(!1),R=(0,y.Z)(c,2),L=R[0],W=R[1],x=function(v){var S=v.type==="image/jpeg"||v.type==="image/png";S||h.default.error("You can only upload JPG/PNG file!");var Y=v.size/1024/1024<2;return Y||h.default.error("Image must smaller than 2MB!"),S&&Y},U=function(v){if(v.file.status==="uploading"){W(!0);return}v.file.status==="done"&&(O(v.file.response.data),W(!1))},A=(0,r.jsxs)("div",{children:[L?(0,r.jsx)(D.Z,{}):(0,r.jsx)(g.Z,{}),(0,r.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return(0,r.jsx)(p.Z.Item,{label:"\u56FE\u7247",children:(0,r.jsx)(l.Z,{name:"file",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:"".concat("","/common/upload"),beforeUpload:x,onChange:U,children:m?(0,r.jsx)("img",{src:(0,C.up)(m),alt:"\u56FE\u7247",style:{maxWidth:"100%",maxHeight:"100%"}}):A})})};M.Z=i},76551:function($,M,e){"use strict";e.r(M),e.d(M,{default:function(){return he}});var _=e(34792),p=e(48086),j=e(49111),l=e(19650),B=e(62350),h=e(75443),y=e(57663),s=e(71577),D=e(11849),g=e(3182),C=e(9715),r=e(93766),i=e(2824),E=e(94043),t=e.n(E),m=e(67265),O=e(28991),c=e(67294),R={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M508 704c79.5 0 144-64.5 144-144s-64.5-144-144-144-144 64.5-144 144 64.5 144 144 144zm0-224c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z"}},{tag:"path",attrs:{d:"M832 256h-28.1l-35.7-120.9c-4-13.7-16.5-23.1-30.7-23.1h-451c-14.3 0-26.8 9.4-30.7 23.1L220.1 256H192c-17.7 0-32 14.3-32 32v28c0 4.4 3.6 8 8 8h45.8l47.7 558.7a32 32 0 0031.9 29.3h429.2a32 32 0 0031.9-29.3L802.2 324H856c4.4 0 8-3.6 8-8v-28c0-17.7-14.3-32-32-32zm-518.6-76h397.2l22.4 76H291l22.4-76zm376.2 664H326.4L282 324h451.9l-44.3 520z"}}]},name:"rest",theme:"outlined"},L=R,W=e(27029),x=function(d,P){return c.createElement(W.Z,(0,O.Z)((0,O.Z)({},d),{},{ref:P,icon:L}))};x.displayName="RestOutlined";var U=c.forwardRef(x),A=e(8212),K=e(73171),v=e(49101),S=e(8890),Y=e(5966),ne=e(64317),se=e(35255),z=e(21010);function Ie(){return request("/admin/managers?per=100")}var oe=function(){var F=(0,g.Z)(t().mark(function d(P){var I;return t().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return T.next=2,(0,z.WY)("/admin/managers",{method:"get",params:{page:P.current,userName:P.userName}});case 2:return I=T.sent,console.log(I),T.abrupt("return",new Promise(function(G){G({data:I.list,success:!0,total:I.total})}));case 5:case"end":return T.stop()}},d)}));return function(P){return F.apply(this,arguments)}}(),le=function(d){return(0,z.WY)("/admin/managers/".concat(d),{method:"GET"})},ue=function(d){return(0,z.WY)("/admin/managers",{method:"POST",data:d})},de=function(d,P){return(0,z.WY)("/admin/managers/".concat(d),{method:"PATCH",data:P})},ie=function(d){return(0,z.WY)("/admin/managers/".concat(d),{method:"DELETE"})},me=function(d,P){return(0,z.WY)("/admin/managers/reset_pwd/".concat(d),{method:"PATCH",data:P})},ce=e(62978),ve=e(9321),fe=e(17024),a=e(85893);function pe(){var F=(0,c.useState)(!1),d=(0,i.Z)(F,2),P=d[0],I=d[1],q=(0,c.useState)(!1),T=(0,i.Z)(q,2),G=T[0],b=T[1],ge=(0,c.useState)(""),ee=(0,i.Z)(ge,2),J=ee[0],w=ee[1],Ee=(0,c.useState)(""),te=(0,i.Z)(Ee,2),Q=te[0],X=te[1],V=(0,c.useRef)(),Pe=r.Z.useForm(),Me=(0,i.Z)(Pe,1),k=Me[0],De=(0,c.useState)({}),ae=(0,i.Z)(De,2),re=ae[0],Ce=ae[1];(0,c.useEffect)(function(){(0,ce.HM)().then(function(Z){var f={};Z.list.forEach(function(u){f[u.id]={text:u.name}}),Ce(f)})},[]);var Oe=[{title:"\u5E8F\u53F7",align:"center",hideInSearch:!0,render:function(f,u,o){return(0,a.jsx)(a.Fragment,{children:o+1})}},{title:"\u7528\u6237\u540D",align:"center",dataIndex:"userName"},{title:"\u5934\u50CF",align:"center",hideInSearch:!0,render:function(f,u){return(0,a.jsx)("img",{src:(0,fe.up)(u.avatar),style:{width:"80px"}})}},{title:"\u89D2\u8272",align:"center",render:function(f,u){var o;return console.log(u),(0,a.jsx)(a.Fragment,{children:(o=u.role)===null||o===void 0?void 0:o.name})},filters:!0,onFilter:!0,valueType:"select",valueEnum:re},{title:"\u6635\u79F0",align:"center",dataIndex:"nickName",hideInSearch:!0},{title:"\u64CD\u4F5C",align:"center",hideInSearch:!0,render:function(f,u){return(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(s.Z,{onClick:(0,g.Z)(t().mark(function o(){var H,n;return t().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,le(u.id);case 2:H=N.sent,I(!0),w(H.avatar),X(H.id),n=(0,D.Z)({},H),delete n.role,k.setFieldsValue((0,D.Z)((0,D.Z)({},n),{},{category:"".concat(u.role?u.role.id:"")}));case 9:case"end":return N.stop()}},o)})),type:"primary",size:"small",title:"\u7F16\u8F91",icon:(0,a.jsx)(A.Z,{})}),(0,a.jsx)(h.Z,{title:"\u662F\u5426\u786E\u8BA4\u5220\u9664",onConfirm:(0,g.Z)(t().mark(function o(){return t().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,ie(u.id);case 2:V.current&&V.current.reload();case 3:case"end":return n.stop()}},o)})),children:(0,a.jsx)(s.Z,{type:"primary",danger:!0,size:"small",title:"\u5220\u9664",icon:(0,a.jsx)(K.Z,{})})}),(0,a.jsx)(s.Z,{size:"small",onClick:function(){b(!0),X(u.id)},title:"\u91CD\u7F6E\u5BC6\u7801",icon:(0,a.jsx)(U,{})})]})}}];return(0,a.jsxs)(m.ZP,{children:[(0,a.jsx)(se.ZP,{headerTitle:"\u836F\u54C1",actionRef:V,rowKey:"id",columns:Oe,pagination:{showSizeChanger:!1,pageSize:10},request:oe,toolBarRender:function(){return[(0,a.jsxs)(s.Z,{type:"primary",onClick:function(){I(!0),X(""),w(""),k.setFieldsValue({name:"",desc:"",isStanding:!1,medicineCategoryId:""})},children:[(0,a.jsx)(v.Z,{}),"\u65B0\u5EFA"]},"primary")]}}),(0,a.jsxs)(S.Y,{title:"\u7F16\u8F91",width:"800px",initialValues:{},form:k,visible:P,onVisibleChange:I,onFinish:function(){var Z=(0,g.Z)(t().mark(function f(u){var o;return t().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(o=(0,D.Z)({},u),J&&(o.avatar=J),Q==""){n.next=9;break}return n.next=5,de(Q,o);case 5:p.default.success("\u4FEE\u6539\u6210\u529F"),I(!1),n.next=13;break;case 9:return n.next=11,ue(o);case 11:p.default.success("\u65B0\u589E\u6210\u529F"),I(!1);case 13:V.current&&V.current.reload();case 14:case"end":return n.stop()}},f)}));return function(f){return Z.apply(this,arguments)}}(),children:[(0,a.jsx)(Y.Z,{label:"\u7528\u6237\u540D",rules:[{required:!0,message:"\u7528\u6237\u540D\u5FC5\u586B"}],placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",width:"md",name:"userName"}),(0,a.jsx)(Y.Z.Password,{label:"\u5BC6\u7801",rules:[{required:!0,message:"\u5BC6\u7801\u5FC5\u586B"}],placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",width:"md",name:"password"}),(0,a.jsx)(ne.Z,{name:"roleId",label:"\u89D2\u8272",valueEnum:re,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u89D2\u8272"}]}),(0,a.jsx)(Y.Z,{label:"\u6635\u79F0",placeholder:"\u8BF7\u8F93\u5165\u6635\u79F0",name:"nickName"}),(0,a.jsx)(ve.Z,{coverImage:J,setCoverImage:w})]}),(0,a.jsx)(S.Y,{title:"\u4FEE\u6539\u5BC6\u7801",onVisibleChange:b,visible:G,onFinish:function(){var Z=(0,g.Z)(t().mark(function f(u){var o;return t().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,me(Q,u);case 2:b(!1),(o=V.current)===null||o===void 0||o.reload();case 4:case"end":return n.stop()}},f)}));return function(f){return Z.apply(this,arguments)}}(),children:(0,a.jsx)(Y.Z.Password,{placeholder:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",name:"password"})})]})}var he=pe},62978:function($,M,e){"use strict";e.d(M,{HM:function(){return B},e1:function(){return h},Sf:function(){return y},mS:function(){return s},Ec:function(){return D},Fv:function(){return g}});var _=e(3182),p=e(94043),j=e.n(p),l=e(21010);function B(){return(0,l.WY)("/admin/roles?per=100")}var h=function(){var C=(0,_.Z)(j().mark(function r(i){var E;return j().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,(0,l.WY)("/admin/roles",{method:"get",params:{page:i.current,name:i.name}});case 2:return E=m.sent,console.log(E),m.abrupt("return",new Promise(function(O){O({data:E.list,success:!0,total:E.total})}));case 5:case"end":return m.stop()}},r)}));return function(i){return C.apply(this,arguments)}}(),y=function(r){return(0,l.WY)("/admin/roles/".concat(r),{method:"GET"})},s=function(r){return(0,l.WY)("/admin/roles",{method:"POST",data:r})},D=function(r,i){return(0,l.WY)("/admin/roles/".concat(r),{method:"PATCH",data:i})},g=function(r){return(0,l.WY)("/admin/roles/".concat(r),{method:"DELETE"})}},17024:function($,M,e){"use strict";e.d(M,{up:function(){return h}});var _=e(30381),p=e.n(_);function j(s){sessionStorage.setItem("token",s)}function l(){return sessionStorage.getItem("token")}function B(){sessionStorage.removeItem("token")}function h(s){return s?s.startsWith("http")?s:"".concat("").concat(s):"http://oss.penkuoer.com/uPic/ss.jpeg"}function y(s){return moment(s).format("YYYY-MM-DD HH:mm:ss")}}}]);

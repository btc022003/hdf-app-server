(self.webpackChunkhdf_app_manager=self.webpackChunkhdf_app_manager||[]).push([[434],{64317:function(j,P,e){"use strict";var M=e(22122),E=e(28991),u=e(81253),n=e(67294),h=e(10244),c=e(22270),O=e(66758),_=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","showSearch","options"],p=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","options"],f=n.forwardRef(function(t,s){var g=t.fieldProps,L=t.children,I=t.params,A=t.proFieldProps,T=t.mode,R=t.valueEnum,U=t.request,K=t.showSearch,S=t.options,l=(0,u.Z)(t,_),B=(0,n.useContext)(O.Z);return n.createElement(h.Z,(0,M.Z)({mode:"edit",valueEnum:(0,c.h)(R),request:U,params:I,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,E.Z)({options:S,mode:T,showSearch:K,getPopupContainer:B.getPopupContainer},g),ref:s,proFieldProps:A},l),L)}),d=n.forwardRef(function(t,s){var g=t.fieldProps,L=t.children,I=t.params,A=t.proFieldProps,T=t.mode,R=t.valueEnum,U=t.request,K=t.options,S=(0,u.Z)(t,p),l=(0,E.Z)({options:K,mode:T||"multiple",labelInValue:!0,showSearch:!0,showArrow:!1,autoClearSearchValue:!0,optionLabelProp:"label"},g),B=(0,n.useContext)(O.Z);return n.createElement(h.Z,(0,M.Z)({mode:"edit",valueEnum:(0,c.h)(R),request:U,params:I,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,E.Z)({getPopupContainer:B.getPopupContainer},l),ref:s,proFieldProps:A},S),L)}),a=f,r=d,i=a;i.SearchSelect=r,i.displayName="ProFormComponent",P.Z=i},23080:function(j,P,e){"use strict";var M=e(85589),E=e.n(M),u=e(85893);function n(h){var c=h.editorState,O=h.setEditorState,_=function(f){O(f)};return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(E(),{style:{border:"1px solid",borderColor:"rgba(0, 0, 0, 0.5)"},value:c,onChange:function(f){return _(f)}})})}P.Z=n},9321:function(j,P,e){"use strict";var M=e(9715),E=e(93766),u=e(43185),n=e(94412),h=e(34792),c=e(48086),O=e(2824),_=e(67294),p=e(7085),f=e(49101),d=e(17024),a=e(85893),r=function(t){var s=t.coverImage,g=t.setCoverImage,L=(0,_.useState)(!1),I=(0,O.Z)(L,2),A=I[0],T=I[1],R=function(l){var B=l.type==="image/jpeg"||l.type==="image/png";B||c.default.error("You can only upload JPG/PNG file!");var y=l.size/1024/1024<2;return y||c.default.error("Image must smaller than 2MB!"),B&&y},U=function(l){if(l.file.status==="uploading"){T(!0);return}l.file.status==="done"&&(g(l.file.response.data),T(!1))},K=(0,a.jsxs)("div",{children:[A?(0,a.jsx)(p.Z,{}):(0,a.jsx)(f.Z,{}),(0,a.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return(0,a.jsx)(E.Z.Item,{label:"\u56FE\u7247",children:(0,a.jsx)(n.Z,{name:"file",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:"".concat("","/common/upload"),beforeUpload:R,onChange:U,children:s?(0,a.jsx)("img",{src:(0,d.up)(s),alt:"\u56FE\u7247",style:{maxWidth:"100%",maxHeight:"100%"}}):K})})};P.Z=r},32708:function(j,P,e){"use strict";e.r(P);var M=e(34792),E=e(48086),u=e(49111),n=e(19650),h=e(62350),c=e(75443),O=e(57663),_=e(71577),p=e(11849),f=e(3182),d=e(9715),a=e(93766),r=e(2824),i=e(94043),t=e.n(i),s=e(67265),g=e(8212),L=e(73171),I=e(49101),A=e(8890),T=e(5966),R=e(64317),U=e(90672),K=e(952),S=e(35255),l=e(67294),B=e(85589),y=e.n(B),te=e(23080),x=e(92264),ae=e(58794),ne=e(9321),re=e(17024),o=e(85893);function _e(){var se=(0,l.useState)(!1),z=(0,r.Z)(se,2),oe=z[0],F=z[1],le=(0,l.useState)(""),J=(0,r.Z)(le,2),$=J[0],V=J[1],de=(0,l.useState)(""),N=(0,r.Z)(de,2),Q=N[0],X=N[1],b=(0,l.useRef)(),ue=a.Z.useForm(),ie=(0,r.Z)(ue,1),G=ie[0],me=(0,l.useState)({}),w=(0,r.Z)(me,2),k=w[0],Ee=w[1],ce=(0,l.useState)({}),q=(0,r.Z)(ce,2),ee=q[0],H=q[1];(0,l.useEffect)(function(){(0,ae.Lp)().then(function(W){var C={};C[0]={text:"\u5168\u90E8"},W.list.forEach(function(D){C[D.id]={text:D.name}}),Ee(C)})},[]);var pe=[{title:"\u5E8F\u53F7",align:"center",hideInSearch:!0,render:function(C,D,v){return(0,o.jsx)(o.Fragment,{children:v+1})}},{title:"\u540D\u5B57",align:"center",dataIndex:"name"},{title:"\u4E3B\u56FE",align:"center",hideInSearch:!0,render:function(C,D){return(0,o.jsx)("img",{src:(0,re.up)(D.image),style:{width:"80px"}})}},{title:"\u6D4F\u89C8\u6B21\u6570",align:"center",hideInSearch:!0,dataIndex:"views"},{title:"\u5206\u7C7B",align:"center",dataIndex:"category",render:function(C,D){var v;return(0,o.jsx)("p",{children:(v=D.illnessCategory)===null||v===void 0?void 0:v.name})},filters:!0,onFilter:!0,valueType:"select",valueEnum:k},{title:"\u63CF\u8FF0",align:"center",dataIndex:"desc",hideInSearch:!0},{title:"\u64CD\u4F5C",align:"center",hideInSearch:!0,render:function(C,D){return(0,o.jsxs)(n.Z,{children:[(0,o.jsx)(_.Z,{onClick:(0,f.Z)(t().mark(function v(){var Z,m;return t().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,(0,x.Sf)(D.id);case 2:Z=Y.sent,F(!0),V(Z.image),H(y().createEditorState(Z.content)),X(Z.id),m=(0,p.Z)({},Z),delete m.illnessCategory,G.setFieldsValue((0,p.Z)((0,p.Z)({},m),{},{category:"".concat(D.illnessCategoryId)}));case 10:case"end":return Y.stop()}},v)})),type:"primary",size:"small",title:"\u7F16\u8F91",icon:(0,o.jsx)(g.Z,{})}),(0,o.jsx)(c.Z,{title:"\u662F\u5426\u786E\u8BA4\u5220\u9664",onConfirm:(0,f.Z)(t().mark(function v(){return t().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,(0,x.Fv)(D.id);case 2:b.current&&b.current.reload();case 3:case"end":return m.stop()}},v)})),children:(0,o.jsx)(_.Z,{type:"primary",danger:!0,size:"small",title:"\u5220\u9664",icon:(0,o.jsx)(L.Z,{})})})]})}}];return(0,o.jsxs)(s.ZP,{children:[(0,o.jsx)(S.ZP,{headerTitle:"\u8D44\u8BAF",actionRef:b,rowKey:"id",columns:pe,pagination:{showSizeChanger:!1,pageSize:10},request:x.e1,toolBarRender:function(){return[(0,o.jsxs)(_.Z,{type:"primary",onClick:function(){F(!0),H(y().createEditorState("")),X(""),V(""),G.setFieldsValue({name:"",desc:""})},children:[(0,o.jsx)(I.Z,{}),"\u65B0\u5EFA"]},"primary")]}}),(0,o.jsxs)(A.Y,{title:"\u7F16\u8F91",width:"800px",initialValues:{name:"Tom"},form:G,visible:oe,onVisibleChange:F,onFinish:function(){var W=(0,f.Z)(t().mark(function C(D){var v;return t().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:if(v=(0,p.Z)((0,p.Z)({},D),{},{content:ee.toHTML()}),$&&(v.image=$),Q==""){m.next=9;break}return m.next=5,(0,x.Ec)(Q,v);case 5:E.default.success("\u4FEE\u6539\u6210\u529F"),F(!1),m.next=13;break;case 9:return m.next=11,(0,x.mS)(v);case 11:E.default.success("\u65B0\u589E\u6210\u529F"),F(!1);case 13:b.current&&b.current.reload();case 14:case"end":return m.stop()}},C)}));return function(C){return W.apply(this,arguments)}}(),children:[(0,o.jsx)(T.Z,{label:"\u540D\u5B57",rules:[{required:!0,message:"\u5206\u7C7B\u540D\u5B57\u5FC5\u586B"}],placeholder:"\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u5B57",width:"md",name:"name"}),(0,o.jsx)(R.Z,{name:"illnessCategoryId",label:"\u5206\u7C7B",valueEnum:k,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u5546\u54C1\u5206\u7C7B"}]}),(0,o.jsx)(U.Z,{label:"\u7B80\u4ECB",placeholder:"\u8BF7\u8F93\u5165\u7B80\u4ECB",width:"md",name:"desc"}),(0,o.jsx)(ne.Z,{coverImage:$,setCoverImage:V}),(0,o.jsx)(K.ZP.Item,{label:"\u8BE6\u60C5",children:(0,o.jsx)(te.Z,{editorState:ee,setEditorState:H})})]})]})}P.default=_e},58794:function(j,P,e){"use strict";e.d(P,{Lp:function(){return h},e1:function(){return c},Sf:function(){return O},mS:function(){return _},Ec:function(){return p},Fv:function(){return f}});var M=e(3182),E=e(94043),u=e.n(E),n=e(21010);function h(){return(0,n.WY)("/admin/illness_categories?per=100")}var c=function(){var d=(0,M.Z)(u().mark(function a(r){var i;return u().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,(0,n.WY)("/admin/Illness_categories",{method:"get",params:{page:r.current,name:r.name}});case 2:return i=s.sent,console.log(i),s.abrupt("return",new Promise(function(g){g({data:i.list,success:!0,total:i.total})}));case 5:case"end":return s.stop()}},a)}));return function(r){return d.apply(this,arguments)}}(),O=function(a){return(0,n.WY)("/admin/Illness_categories/".concat(a),{method:"GET"})},_=function(a){return(0,n.WY)("/admin/Illness_categories",{method:"POST",data:a})},p=function(a,r){return(0,n.WY)("/admin/Illness_categories/".concat(a),{method:"PATCH",data:r})},f=function(a){return(0,n.WY)("/admin/Illness_categories/".concat(a),{method:"DELETE"})}},92264:function(j,P,e){"use strict";e.d(P,{e1:function(){return h},Jd:function(){return c},Sf:function(){return O},mS:function(){return _},Ec:function(){return p},Fv:function(){return f}});var M=e(3182),E=e(94043),u=e.n(E),n=e(21010),h=function(){var d=(0,M.Z)(u().mark(function a(r){var i;return u().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,(0,n.WY)("/admin/illnesses",{method:"get",params:{page:r.current,name:r.name}});case 2:return i=s.sent,s.abrupt("return",new Promise(function(g){g({data:i.list,success:!0,total:i.total})}));case 4:case"end":return s.stop()}},a)}));return function(r){return d.apply(this,arguments)}}(),c=function(){var d=(0,M.Z)(u().mark(function a(){var r;return u().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,n.WY)("/admin/illnesses",{method:"get",params:{per:100}});case 2:return r=t.sent,t.abrupt("return",r.list);case 4:case"end":return t.stop()}},a)}));return function(){return d.apply(this,arguments)}}(),O=function(a){return(0,n.WY)("/admin/illnesses/".concat(a),{method:"GET"})},_=function(a){return(0,n.WY)("/admin/illnesses",{method:"POST",data:a})},p=function(a,r){return(0,n.WY)("/admin/illnesses/".concat(a),{method:"PATCH",data:r})},f=function(a){return(0,n.WY)("/admin/illnesses/".concat(a),{method:"DELETE"})}},17024:function(j,P,e){"use strict";e.d(P,{up:function(){return c}});var M=e(30381),E=e.n(M);function u(_){sessionStorage.setItem("token",_)}function n(){return sessionStorage.getItem("token")}function h(){sessionStorage.removeItem("token")}function c(_){return _?_.startsWith("http")?_:"".concat("").concat(_):"".concat("","/avatar.jpeg")}function O(_){return moment(_).format("YYYY-MM-DD HH:mm:ss")}}}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{48082:function(e,t,s){Promise.resolve().then(s.bind(s,71714)),Promise.resolve().then(s.bind(s,17930)),Promise.resolve().then(s.t.bind(s,91366,23))},56970:function(e,t,s){"use strict";s.d(t,{HC:function(){return n.ListItem},Q:function(){return n.MenuHandler},XZ:function(){return n.Checkbox},ZT:function(){return n.Typography},qy:function(){return n.MenuList},sN:function(){return n.MenuItem},u1:function(){return n.ListItemPrefix},v2:function(){return n.Menu}});var n=s(46095)},19260:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});var n=s(9268);s(86006);var r=s(89791);t.C=e=>{let{type:t,fullWidth:s,children:a,onClick:i,secondary:l,danger:o,disabled:u}=e;return(0,n.jsx)("button",{onClick:i,type:t,disabled:u,className:(0,r.Z)("\n    flex justify-center\n    rounded-md\n    px-3\n    py-2\n    text-md\n    font-semibold\n    focus-visible:outline\n    focus-visible:outline-2\n    focus-visible:outline-offset-2\n    bg-blue-500\n    ",u&&"opacity-50 cursor-default",s&&"w-full",l?"text-gray-900":"text-white",o&&"bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",!l&&!o&&"bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"),children:a})};let a=e=>{let{type:t,fullWidth:s,children:r,onClick:a,secondary:i,danger:l,disabled:o,label:u,css:c}=e;return(0,n.jsx)("button",{onClick:a,type:t,disabled:o,className:" ".concat(c,"\n    p-1 px-2 text-base\n   opacity-90 font-semibold\n   ").concat(s&&"w-full","\n    ").concat(l?"bg-gray-300 hover:bg-gray-300 text-gray-900 focus-visible:outline-gray-600":"bg-blue-500 hover:bg-blue-600 text-white","\n   rounded-md"),children:u})}},77108:function(e,t,s){"use strict";s.d(t,{p:function(){return i},u:function(){return a}});var n=s(9268);s(86006);var r=s(9735);let a=e=>{let{className:t}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:t,children:(0,n.jsx)("div",{className:"cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100",children:(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)("div",{className:"mx-2",children:(0,n.jsx)("div",{className:"w-14 h-14 bg-gray-300 rounded-full"})}),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("div",{className:"w-52 h-4 bg-gray-300 rounded mb-1"}),(0,n.jsx)("div",{className:"w-28 h-4 bg-gray-300 rounded"})]})})]})})})})},i=e=>{let{className:t}=e;return(0,n.jsx)("div",{className:t,children:(0,n.jsx)("div",{className:"cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100",children:(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)("div",{className:"mx-2",children:(0,n.jsx)("div",{children:(0,n.jsx)(r.hov,{size:55,className:"bg-gray-300 rounded-full"})})}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"flex flex-col",children:(0,n.jsx)("div",{className:"text-lg font-semibold",children:"New Group"})})})]})})})}},17930:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return b}});var n=s(9268),r=s(86006),a=s(46338),i=s(19260),l=e=>{let{title:t,body:s,footer:l,actionLabel:o,disabled:u,secondaryAction:c,secondaryActionLabel:d,onSubmit:m,onClose:g,isOpen:f}=e,[p,v]=(0,r.useState)(f);(0,r.useEffect)(()=>{v(f)},[f]);let x=(0,r.useCallback)(()=>{u||(v(!1),setTimeout(()=>{g()},300))},[u,g]),b=(0,r.useCallback)(()=>{u||m()},[u,m]),h=(0,r.useCallback)(()=>{!u&&c&&c()},[u,c]);return f?(0,n.jsx)("div",{className:"   justify-center   items-center   flex   overflow-x-hidden   overflow-y-auto   fixed   inset-0   z-50   outline-none   focus:outline-none   bg-gray-900 bg-opacity-70   ",children:(0,n.jsx)("div",{className:"   relative   w-full    md:w-4/6    lg:w-3/6    xl:w-2/5    my-6   lg:h-auto   md:h-auto   mx-10   ",children:(0,n.jsx)("div",{className:"\n        translate\n        duration-300\n        full\n        ".concat(p?"opacity-100":"opacity-0","\n        ").concat(p?"translate-y-0":"translate-y-full","\n        "),children:(0,n.jsxs)("div",{className:"   translate   h-full   lg:h-auto   md:h-auto   border-0   rounded-3xl   shadow-lg   flex   flex-col   w-full   bg-white   outline-none   focus:outline-none   ",children:[(0,n.jsxs)("div",{className:"   flex   items-center   p-6   justify-between   relative   ",children:[(0,n.jsx)("div",{children:" "}),(0,n.jsx)("h3",{className:"   text-2xl   font-semibold   text-center   text-neutral-700   ",children:t}),(0,n.jsx)("button",{onClick:x,className:"   p-1   border-0   hover:opacity-70   transition   left-9",children:(0,n.jsx)(a.QAE,{size:24})})]}),(0,n.jsx)("div",{className:"   relative   px-2   flex-auto   ",children:s}),(0,n.jsxs)("div",{className:"flex flex-col gap-2 p-6",children:[(0,n.jsxs)("div",{className:"flex flex-row items-center gap-4 w-full",children:[c&&d&&(0,n.jsx)(i.Z,{disabled:u,onClick:h,label:d}),o&&(0,n.jsx)(i.Z,{disabled:u,onClick:b,label:o,children:o})]}),l]})]})})})}):null},o=s(54131),u=s(56970),c=s(92621),d=s(9516),m=s(70393),g=s(9802),f=s(25952),p=s.n(f),v=s(77108);let x=p()(()=>s.e(593).then(s.bind(s,39593)),{loadableGenerated:{webpack:()=>[39593]},loading:()=>(0,n.jsx)(v.u,{className:"my-2"}),ssr:!1});var b=()=>{var e;let t=(0,o.Z)(),s=(0,c.Z)(),[a,f]=(0,r.useState)(m.E),[p,v]=(0,r.useState)(!1),b=(0,r.useCallback)(e=>{if(a.groupMembers.find(t=>t.id===e)){let t=a.groupMembers.filter(t=>t.id!==e);f({...a,groupMembers:t})}else f({...a,groupMembers:[...a.groupMembers,{userId:e,id:(0,g.ZP)(),permission:"member"}]})},[a]),h=async()=>{if(a.groupName&&a.groupMembers.length>0){let e={admin:[s.state.id],groupName:a.groupName,groupImage:a.groupImage,CreatedUser:s.state.id,groupMembers:[...a.groupMembers,{userId:s.state.id,id:(0,g.ZP)(),permission:"Admin"}]};f(m.E),(0,d.DO)(e),v(!1),t.close()}},y=(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"flex justify-center",children:(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"Input For User Search px-2",children:(0,n.jsx)("div",{className:"flex my-3 items-center w-full p-2 border-gray-300   border-[1px] rounded-xl",children:(0,n.jsx)("input",{className:"px-2 focus:disabled:outline-none    focus:outline-none w-full",type:"text",placeholder:"Enter Group Name",value:a.groupName||"",onChange:e=>f({...a,groupName:e.target.value})})})})})})}),j=(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"overflow-y-scroll h-96",children:null===(e=s.FriendList)||void 0===e?void 0:e.map((e,t)=>{let r=s.FriendList.find(t=>t.id===e.id);if(r)return(0,n.jsx)(x,{user:r,right:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(u.XZ,{onClick:()=>{b(r.id)},ripple:!1,className:"h-6 w-6   rounded-full    duration-200"})})},e.id)})})});return(0,n.jsx)(l,{title:p?"Select User":"Create Group",body:p?j:y,isOpen:t.isOpen,onClose:t.close,footer:(0,n.jsxs)("div",{children:[p&&(0,n.jsx)(i.Z,{onClick:()=>v(!1),fullWidth:!0,danger:!0,label:"back",css:"h-12 my-2"}),(0,n.jsx)(i.Z,{fullWidth:!0,onClick:()=>p?h():v(!0),label:p?"Create Group":"Next",css:"h-12"})]}),onSubmit:()=>{}})}},71714:function(e,t,s){"use strict";s.r(t);var n=s(9268);s(86006);var r=s(68919);t.default=()=>(0,n.jsx)("div",{children:(0,n.jsx)(r.x7,{})})},54131:function(e,t,s){"use strict";var n=s(82561);let r=(0,n.Ue)(e=>({isOpen:!1,open:()=>e({isOpen:!0}),close:()=>e({isOpen:!1})}));t.Z=r},92621:function(e,t,s){"use strict";var n=s(5109),r=s(82561);let a=(0,r.Ue)(e=>({state:n.R,FriendList:[],setUser:t=>e({state:t}),setFriendList:t=>e(e=>e.FriendList.find(e=>e.id===t.id)?e:{FriendList:[...e.FriendList,t]})}));t.Z=a},70393:function(e,t,s){"use strict";s.d(t,{E:function(){return r},F:function(){return n}});let n={id:"",createDate:void 0,updateDate:void 0,lastMessageDate:void 0,lastMessage:"",type:"PERSONAL",MessageDataId:"",friendData:{id:"",name:"",email:""},group:{admin:[],groupName:null,groupImage:null,groupMembers:[],CreatedUser:""},isGroup:!1},r={admin:[],groupName:"",groupImage:"",groupMembers:[],CreatedUser:""}},5109:function(e,t,s){"use strict";s.d(t,{R:function(){return n}});let n={id:"",name:"",email:"",emailVerified:!1,image:"",createDate:new Date,updateDate:new Date,FriendRequest:[],activeUser:!1,bio:"",Conversations:[]}},9516:function(e,t,s){"use strict";s.d(t,{DO:function(){return c},HA:function(){return o},Qz:function(){return u},hO:function(){return d}});var n=s(6936),r=s(33134),a=s(9802),i=s(22082),l=s(16160);let o=async(e,t)=>{let s=new Date().toISOString(),l=(0,a.ZP)(),o={id:(0,a.ZP)(),createDate:s,updateDate:s,lastMessageDate:s,lastMessage:"new conversation",type:"PERSONAL",MessageDataId:l,friendData:{id:t.id,name:t.name,email:t.email},isGroup:!1,group:{admin:[],groupName:null,groupImage:null,groupMembers:[],CreatedUser:""}},u={...o,friendData:{id:e.id,name:e.name,email:e.email}};try{return(0,n.r7)((0,n.JU)(r.db,"users",e.id),{Conversations:(0,n.vr)(o)}),(0,n.r7)((0,n.JU)(r.db,"users",t.id),{Conversations:(0,n.vr)(u)}).then(()=>{(0,i.D)(l)}),!0}catch(e){return console.log(e),{message:e,code:400}}},u=async e=>{let t=new Date().toString(),{lastMessage:s,UserId:a,friendId:i,conversationId:o}=e;try{let e=await (0,l.Lv)(a),u=await (0,l.Lv)(i),c=e.Conversations.map(e=>e.id===o?{...e,lastMessage:s,lastMessageDate:t}:e),d=u.Conversations.map(e=>e.id===o?{...e,lastMessage:s,lastMessageDate:t}:e);await (0,n.pl)((0,n.JU)(r.db,"users",a),{...e,Conversations:c}),await (0,n.pl)((0,n.JU)(r.db,"users",i),{...u,Conversations:d})}catch(e){console.log("Error getting document:",e)}},c=async e=>{let t=new Date().toString(),s=(0,a.ZP)(),l={id:(0,a.ZP)(),createDate:t,updateDate:t,lastMessageDate:t,lastMessage:"add you",isGroup:!0,group:e,type:"GROUP",MessageDataId:s,friendData:{id:"",name:"",email:""}};try{for(let t=0;t<e.groupMembers.length;t++){let s=e.groupMembers[t];await (0,n.r7)((0,n.JU)(r.db,"users",s.userId),{Conversations:(0,n.vr)(l)})}return await (0,i.D)(s),!0}catch(e){console.log(e)}},d=async(e,t)=>{var s;let a=new Date().toString(),{lastMessage:i,UserId:o,friendId:u,conversationId:c}=e,d=(null===(s=t.group)||void 0===s?void 0:s.groupMembers)||[];if(d.length<0)throw Error("user not found");for(let e=0;e<(null==d?void 0:d.length);e++){let t=await (0,l.Lv)(d[e].userId);Promise.all(t.Conversations.map(e=>e.id===c?{...e,lastMessage:i,lastMessageDate:a}:e)).then(s=>{(0,n.pl)((0,n.JU)(r.db,"users",d[e].userId),{...t,Conversations:s})})}}},16160:function(e,t,s){"use strict";s.d(t,{Lv:function(){return a},Q1:function(){return l},Ti:function(){return i}});var n=s(6936),r=s(33134);let a=async e=>{try{let t=await (0,n.QT)((0,n.JU)(r.db,"users",e));return t.exists()?t.data():null}catch(e){return console.log("Error getting document:",e),null}},i=async e=>{let t=new Date().toISOString(),s={id:e.id,name:e.name,email:e.email,emailVerified:!1,image:e.image,lastTimeOnline:t,activeUser:!0,bio:"",createDate:t,updateDate:t,FriendRequest:[],Conversations:[]};try{await (0,n.pl)((0,n.JU)(r.db,"users",e.id),s)}catch(e){console.log(e)}},l=async(e,t)=>{try{await (0,n.r7)((0,n.JU)(r.db,"users",e),{activeUser:t,lastTimeOnline:new Date().toISOString()})}catch(e){console.log(e)}}},33134:function(e,t,s){"use strict";s.d(t,{db:function(){return o},lX:function(){return u},tO:function(){return c}});var n=s(1313),r=s(24734),a=s(6936),i=s(64202);let l=(0,n.ZF)({apiKey:"AIzaSyBcVSdMQGFxgaBIiJwvfmL5EIbEnUb0tJo",authDomain:"next-js-chat-app-33c2b.firebaseapp.com",projectId:"next-js-chat-app-33c2b",storageBucket:"next-js-chat-app-33c2b.appspot.com",messagingSenderId:"269077837950",appId:"1:269077837950:web:aa04484eb3107351d2c02f"}),o=(0,a.ad)(l),u=(0,r.v0)(l),c=(0,i.cF)(l);(0,r.v0)(l)},22082:function(e,t,s){"use strict";s.d(t,{D:function(){return l},P:function(){return i}});var n=s(6936),r=s(33134),a=s(6823);let i=async(e,t)=>{var s=[];try{if(e.img.length>0)for(let t=0;t<e.img.length;t++){let n=await (0,a.z)(e.img[t],e.messageUserId);s.push(n)}await (0,n.r7)((0,n.JU)(r.db,"UserMessage",t),{senderMessages:[],receiverMessages:[],messages:(0,n.vr)({id:e.id,message:e.message,img:s,reply:e.reply,seenIds:e.seenIds,createdAt:new Date().toISOString(),updateAt:new Date().toISOString(),date:new Date().toISOString(),conversationId:e.conversationId,messageUserId:e.messageUserId})})}catch(e){console.log(e)}},l=async e=>await (0,n.pl)((0,n.JU)(r.db,"UserMessage",e),{id:e,messages:[],senderMessages:[],receiverMessages:[]}).then(()=>e).catch(e=>{console.log(e)})},6823:function(e,t,s){"use strict";s.d(t,{z:function(){return a}});var n=s(64202),r=s(33134);let a=async(e,t)=>{let s=new Promise((s,a)=>{let i=(0,n.iH)(r.tO,"UserFiles/".concat(t,"/").concat(e.name)),l=(0,n.B0)(i,e);l.on("state_changed",e=>{e.bytesTransferred,e.totalBytes},e=>{console.log(e)},()=>{(0,n.Jt)(l.snapshot.ref).then(e=>{s(e)})})});return s}},91366:function(){}},function(e){e.O(0,[662,271,679,130,852,190,989,253,698,744],function(){return e(e.s=48082)}),_N_E=e.O()}]);
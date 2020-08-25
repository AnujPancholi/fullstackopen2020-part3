(this["webpackJsonppart2-ex"]=this["webpackJsonppart2-ex"]||[]).push([[0],{17:function(e,t,r){e.exports=r(43)},22:function(e,t,r){},24:function(e,t,r){},42:function(e,t,r){},43:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(14),c=r.n(s),o=(r(22),r(1)),u=r.n(o),l=r(3),E=r(4),i=(r(24),r(16)),R=r(15),m=r.n(R).a.create({baseURL:"https://node-fullstackdev-app.herokuapp.com/api/persons"}),p=function(e){var t="SERVER ERROR";switch(e){case 404:t="RECORD NOT FOUND"}return t},N=function(){return new Promise(function(){var e=Object(l.a)(u.a.mark((function e(t,r){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={success:!0,result:null,error:null},e.prev=1,e.next=4,m({method:"GET",url:"/"});case 4:a=e.sent,n.success=!0,n.error=null,n.result=a.data,e.next=16;break;case 10:e.prev=10,e.t0=e.catch(1),console.log("backendWrapper | getPersonsData | ERROR IN FETCHING PERSONS DATA ",e.t0),n.success=!1,n.result=null,e.t0.isAxiosError?e.t0.response?n.error=e.t0.response.data:e.t0.request?n.error={message:"NO RESPONSE FROM SERVER"}:n.error={message:"ERROR IN MAKING REQUEST"}:n.error={message:e.t0.message||"UNKNOWN REQUEST ERROR"};case 16:t(n);case 17:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,r){return e.apply(this,arguments)}}())},d=function(e){return new Promise(function(){var t=Object(l.a)(u.a.mark((function t(r,n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={success:!1,result:null,error:null},t.prev=1,t.next=4,m({method:"POST",url:"/",data:e});case 4:s=t.sent,a.success=!0,a.result=s.data,a.error=null,t.next=16;break;case 10:t.prev=10,t.t0=t.catch(1),console.log("backendWrapper | addPersonEntry | ERROR IN FETCHING PERSONS DATA ",t.t0),a.success=!1,a.result=null,t.t0.isAxiosError?t.t0.response?a.error=t.t0.response.data:t.t0.request?a.error={message:"NO RESPONSE FROM SERVER"}:a.error={message:"ERROR IN MAKING REQUEST"}:a.error={message:t.t0.message||"UNKNOWN REQUEST ERROR"};case 16:r(a);case 17:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,r){return t.apply(this,arguments)}}())},O=function(e){return new Promise(function(){var t=Object(l.a)(u.a.mark((function t(r,n){var a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={success:!1,result:null,error:null},t.prev=1,t.next=4,m({method:"DELETE",url:"/".concat(e)});case 4:s=t.sent,a.success=!0,a.result=s.data,a.error=null,t.next=16;break;case 10:t.prev=10,t.t0=t.catch(1),console.log("backendWrapper | deleteById | ERROR IN FETCHING PERSONS DATA ",t.t0),a.success=!1,a.result=null,t.t0.isAxiosError?t.t0.response?0===Object.keys(t.t0.response.data).length?a.error={errCode:t.t0.response.status,message:p(t.t0.response.status)}:a.error=t.t0.response.data:t.t0.request?a.error={message:"NO RESPONSE FROM SERVER"}:a.error={message:"ERROR IN MAKING REQUEST"}:a.error={message:t.t0.message||"UNKNOWN REQUEST ERROR"};case 16:r(a);case 17:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,r){return t.apply(this,arguments)}}())},f=function(e,t){return new Promise(function(){var r=Object(l.a)(u.a.mark((function r(n,a){var s,c;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s={success:!1,result:null,error:null},r.prev=1,r.next=4,m({method:"PUT",url:"".concat(e),data:Object(i.a)({},t)});case 4:c=r.sent,s.success=!0,s.result=c.data,s.error=null,r.next=16;break;case 10:r.prev=10,r.t0=r.catch(1),console.log("backendWrapper | updateById | ERROR IN FETCHING PERSONS DATA ",r.t0),s.success=!1,s.result=null,r.t0.isAxiosError?r.t0.response?0===Object.keys(r.t0.response.data).length?s.error={errCode:r.t0.response.status,message:p(r.t0.response.status)}:s.error=r.t0.response.data:r.t0.request?s.error={message:"NO RESPONSE FROM SERVER"}:s.error={message:"ERROR IN MAKING REQUEST"}:s.error={message:r.t0.message||"UNKNOWN REQUEST ERROR"};case 16:n(s);case 17:case"end":return r.stop()}}),r,null,[[1,10]])})));return function(e,t){return r.apply(this,arguments)}}())},b=function(e){var t=e.text,r=e.handleOnClick;return a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{onClick:r},t))},g=function(e){var t=e.name,r=e.phoneNumber,n=e.id,s=e.onDeleteListing;return a.a.createElement("div",{style:{border:"1px solid black"}},"Name: ",t,a.a.createElement("br",null),"Phone: ",r,a.a.createElement("br",null),a.a.createElement(b,{text:"Delete",handleOnClick:function(){window.confirm("Are you sure you want to delete ".concat(t,"?"))&&s(n)()}}))},h=function(e){var t=e.handleOnSubmit,r=e.handleNewNameChange,n=e.handleNewPhoneNumberChange;return a.a.createElement("form",{onSubmit:t},a.a.createElement("div",null,"name: ",a.a.createElement("input",{onChange:r})),a.a.createElement("div",null,"Phone Number: ",a.a.createElement("input",{onChange:n})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},S=Object(n.forwardRef)((function(e,t){var r=e.persons,s=e.onReloadFromServer,c=e.onDeleteListing,o=Object(n.useState)(""),u=Object(E.a)(o,2),l=u[0],i=u[1],R=Object(n.useState)(!0),m=Object(E.a)(R,2),p=m[0],N=m[1],d=function(e){i("")},O=l.length>0?new RegExp(l,"i"):null,f=r.filter((function(e){return!O||O.test(e.name)}));Object(n.useImperativeHandle)(t,(function(){return{setLoading:function(e){N(!!e)},clearPhonebookSearchFilter:function(){d()}}}));return console.log("PhonebookListingView RENDER | isLoading: ".concat(p)),p?a.a.createElement("div",null,a.a.createElement("h2",null,"Numbers"),a.a.createElement("p",null,"Loading...")):a.a.createElement("div",null,a.a.createElement("h2",null,"Numbers"),a.a.createElement("button",{onClick:function(){d(),s()}},"Reload from server"),a.a.createElement("div",null,"Search: ",a.a.createElement("input",{onChange:function(e){i(e.target.value)},value:l})," ",O?a.a.createElement(a.a.Fragment,null,"(Filtered Results)",a.a.createElement("span",{onClick:d,style:{color:"blue",textDecoration:"underline"}},"(Clear)")):a.a.createElement(a.a.Fragment,null)),a.a.createElement("br",null),a.a.createElement("div",null,f.length?f.reduce((function(e,t){return e.concat(a.a.createElement(a.a.Fragment,{key:t.id},a.a.createElement(g,{name:t.name,phoneNumber:t.phoneNumber,id:t.id,onDeleteListing:c}),a.a.createElement("br",null)))}),[]):a.a.createElement(a.a.Fragment,null,a.a.createElement("i",null,"No Results Found"))))})),v=(r(42),new Set(["inactive","error","success"])),w=function(e){var t=e.type,r=e.message,n="notif-".concat(v.has(t)?t:"inactive");return a.a.createElement("div",{className:n},r)},k=function(e){var t=Object(n.useState)([]),r=Object(E.a)(t,2),s=r[0],c=r[1],o=Object(n.useState)(""),i=Object(E.a)(o,2),R=i[0],m=i[1],p=Object(n.useState)(""),b=Object(E.a)(p,2),g=b[0],v=b[1],k=Object(n.useState)({type:"inactive",message:null}),x=Object(E.a)(k,2),T=x[0],A=x[1],I=Object(n.useRef)(null),P=function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Effect fired"),I.current.setLoading(!0),e.prev=2,e.next=5,N();case 5:if((t=e.sent).success){e.next=8;break}throw new Error(t.error.message||"SERVER ERROR");case 8:c(t.result),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),console.error("ERROR FETCHING DATA FROM SERVER",e.t0),D({type:"error",message:"ERROR FETCHING DATA: ".concat(e.t0.message||"PROBABALY A SERVER ISSUE")},1e4);case 15:I.current.setLoading(!1);case 16:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}(),D=function(e,t){A(e),setTimeout((function(){A({type:"inactive",message:null})}),t>1999&&t<15e3?t:3e3)};Object(n.useEffect)((function(){P()}),[]);var y=new Set(s.map((function(e){return e.name})));return console.log("App RENDER"),a.a.createElement("div",null,a.a.createElement("h2",{className:"App-title"},"Phonebook"),a.a.createElement(w,{type:T.type,message:T.message}),a.a.createElement(h,{handleOnSubmit:function(e){e.preventDefault(),Object(l.a)(u.a.mark((function e(){var t,r,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!y.has(R)){e.next=22;break}if(!window.confirm("".concat(R," already exists. Update number?"))){e.next=20;break}if(e.prev=2,t=s.find((function(e){return e.name===R}))){e.next=6;break}throw new Error("PERSON ENTRY NOT FOUND WITH GIVEN NAME");case 6:return e.next=8,f(t.id,{name:R,phoneNumber:g});case 8:if((r=e.sent).success){e.next=11;break}throw new Error(r.error.message||"SERVER ERROR");case 11:D({type:"success",message:"ENTRY UPDATED SUCCESSFULLY"},3e3),P(),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),console.error("ERROR IN UPDATING PERSON ENTRY - ",e.t0),D({type:"error",message:"ERROR IN UPDATING ENTRY: ".concat(e.t0.message||"PROBABALY A SERVER ISSUE")},3e3),P();case 20:e.next=48;break;case 22:if(""!==R){e.next=26;break}window.alert("The name cannot be empty"),e.next=48;break;case 26:if(g.match(/^\d+[\d\-]*\d+$/)){e.next=30;break}window.alert('Invalid phone number "'.concat(g,'" - it must only contain digits with hyphens in between being optional')),e.next=48;break;case 30:return n={name:R,phoneNumber:g},console.log("NEW ENTRY: ",n),I.current.clearPhonebookSearchFilter(),e.prev=33,e.next=36,d(n);case 36:if((a=e.sent).success){e.next=39;break}throw new Error(a.error.message||"SERVER ERROR");case 39:D({type:"success",message:"NEW PHONEBOOK ENTRY ADDED"},3e3),console.log("NEW ENTRY ADDED"),e.next=47;break;case 43:e.prev=43,e.t1=e.catch(33),console.error("ERROR IN MAKING NEW PERSON ENTRY - ",e.t1),D({type:"error",message:"ERROR IN MAKING ENTRY: ".concat(e.t1.message||"PROBABALY A SERVER ISSUE")},3e3);case 47:P();case 48:case"end":return e.stop()}}),e,null,[[2,15],[33,43]])})))()},handleNewNameChange:function(e){m(e.target.value)},handleNewPhoneNumberChange:function(e){v(e.target.value)}}),a.a.createElement(S,{ref:I,onReloadFromServer:P,persons:s,onDeleteListing:function(e){return Object(l.a)(u.a.mark((function t(){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O(e);case 3:if((r=t.sent).success){t.next=7;break}throw console.error(r.error),new Error(r.error.message||"SERVER ERROR");case 7:D({type:"success",message:"ENTRY SUCCESSFULLY DELETED"},3e3),P(),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),console.error("ERROR IN DELETING PERSON ENTRY - ",t.t0),D({type:"error",message:"ERROR IN DELETING ENTRY: ".concat(t.t0.message||"PROBABALY A SERVER ISSUE")},3e3),P();case 16:case"end":return t.stop()}}),t,null,[[0,11]])})))}}))};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(k,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.bef94842.chunk.js.map
(this["webpackJsonpaudio-recorder"]=this["webpackJsonpaudio-recorder"]||[]).push([[0],{27:function(t,e,n){},52:function(t,e,n){"use strict";n.r(e);var a=n(2),o=n.n(a),s=n(19),r=n.n(s),c=(n(27),n(10)),i=n.n(c),u=n(22),d=n(20),l=n(5),b=n(6),h=n(8),j=n(7),p=n(4),f=(n(31),n(21)),v=n.n(f),O=n(0),S=function(t){Object(h.a)(n,t);var e=Object(j.a)(n);function n(t){var a;return Object(l.a)(this,n),(a=e.call(this,t)).state={text:[]},a}return Object(b.a)(n,[{key:"componentDidMount",value:function(){var t=this;v.a.get("/read-file").then((function(e){t.setState({text:e.data})})).catch((function(t){console.log("Error from ShowResumeDetails")}))}},{key:"render",value:function(){return Object(O.jsx)("div",{children:this.state.text.map((function(t,e){return Object(O.jsx)("div",{className:"text-white m-2 rounded text-center bg-dark",children:t},e)}))})}}]),n}(a.Component),m=function(t){Object(h.a)(n,t);var e=Object(j.a)(n);function n(t){var a;return Object(l.a)(this,n),(a=e.call(this,t)).start=function(){a.setState({recordState:p.a.START})},a.pause=function(){a.setState({recordState:p.a.PAUSE})},a.stop=function(){a.setState({recordState:p.a.STOP})},a.onStop=function(t){a.setState({audioData:t}),console.log("This is data url : ",t.url),a.sendToServer(t.url),console.log("onStop: audio data",t)},a.sendToServer=function(){var t=Object(d.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("sending blob to server."),null!=e&&((n=new XMLHttpRequest).open("GET",e,!0),n.responseType="blob",n.onload=function(t){if(200===this.status&&4===this.readyState){console.log("this blob is: ",this.response);var e=this.response,n=new XMLHttpRequest,a=new FormData;a.append("audio_data",e,"cde.wav");var o,s=Object(u.a)(a.entries());try{for(s.s();!(o=s.n()).done;){var r=o.value;console.log(r[0]+", "+r[1])}}catch(c){s.e(c)}finally{s.f()}console.log("Fd is : ",a),n.open("POST","/receive-audio",!0),n.send(a)}},console.log("Before sending"),n.send());case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.state={recordState:null,audioData:null},a}return Object(b.a)(n,[{key:"render",value:function(){var t=this.state.recordState;return Object(O.jsx)("div",{className:"container",children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsxs)("div",{className:"col-sm",children:[Object(O.jsx)(p.b,{state:t,onStop:this.onStop,backgroundColor:"#99ccff"}),Object(O.jsx)("audio",{id:"audio",controls:!0,src:this.state.audioData?this.state.audioData.url:null}),Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("button",{className:"btn btn-primary",id:"record",onClick:this.start,children:"Start"}),Object(O.jsx)("button",{className:"btn btn-warning",id:"pause",onClick:this.pause,children:"Pause"}),Object(O.jsx)("button",{className:"btn btn-danger",id:"stop",onClick:this.stop,children:"Stop"})]})]}),Object(O.jsx)("div",{className:"command-container bg-secondary rounded col-sm",children:Object(O.jsx)(S,{})})]})})}}]),n}(o.a.Component),g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(e){var n=e.getCLS,a=e.getFID,o=e.getFCP,s=e.getLCP,r=e.getTTFB;n(t),a(t),o(t),s(t),r(t)}))};n(51);r.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(m,{})}),document.getElementById("root")),g()}},[[52,1,2]]]);
//# sourceMappingURL=main.f9a91f10.chunk.js.map
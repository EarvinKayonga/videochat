



function wrtc(){
   navigator.getUserMedia({
       video: true,
       audio: true,
   }, gotMedia, function() {});

   function gotMedia(stream) {
       var peer = new SimplePeer({
           initiator: location.hash === '#init',
           trickle: false,
           stream: stream
       })


       peer.on('signal', function(data) {
           document.getElementById('yourId').innerText = JSON.stringify(data)
       })

     /*  document.getElementById('connect').addEventListener('click', function() {
           var otherId = JSON.parse(document.getElementById('otherId').value)
           console.log(otherId);
           peer.signal(otherId);
       })*/


       peer.on('stream', function(stream) {
           var video = document.createElement('video')
           document.body.appendChild(video)

           video.src = window.URL.createObjectURL(stream)
           video.play()
       })
   }
 }

 function getUsers(){
   return axios.get('/users/all')
         .then(
           (users) => {
             return
              users.forEach((user) => {
               let nodeElm = document.createElement('span'),
                   text  = document.createTextNode(user.key),
                   btn = document.createElement("BUTTON"),
                   t = document.createTextNode("Call");

                 let chat = document.getElementById('chat');

                 nodeElm.appendChild(text);
                 btn.appendChild(t);
                 chat.appendChild(nodeElm);

                 console.log(user);
             });
           }
         )
         .catch(
           (error) => {
             console.log(error);
           }
         );
 };

 function notifyFailure() {
     swal({
         title: "Oups",
         text: "The Browser you using doesn't support WEBRTC",
         imageUrl: "img/web-rtc.png"
       });
 };

 function run() {
     let ws = new WebSocket('wss://' + window.document.location.host);

     function ifUserTaken(username) {
       //Check if is Taken and set in Level
       return (false);
     };

     swal({
       title: "Who are u ?",
       text: "Choose a username:",
       type: "input",
       showCancelButton: false,
       closeOnConfirm: false,
       animation: "slide-from-top",
       inputPlaceholder: "Choose a username" },
       (usrNm) => {
         if (usrNm === false || usrNm === "" || ifUserTaken(usrNm)){
           swal.showInputError("You need to write something!");
           return (false);
         } else {
           swal("Nice!", "You wrote: " + usrNm, "success");
           setTimeout(() => {
             return App(usrNm);
           }, 1000);
         };
       });
 }

 function App(username){
   return getUsers();
 };

 (function() {
     "use strict";
     return (SimplePeer.WEBRTC_SUPPORT || typeof(Worker) == "undefined") ? run() : notifyFailure();
 }());

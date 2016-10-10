function wrtc(initiator) {
    navigator.getUserMedia({
        video: true,
        audio: true,
    }, gotMedia, function() {});

    function gotMedia(stream) {
        var peer = new SimplePeer({
            initiator: initiator,
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

function notifyFailure() {
    swal({
        title: "Oups",
        text: "The Browser you using doesn't support WEBRTC",
        imageUrl: "img/web-rtc.png"
    });
};

function run() {
    let ws = new WebSocket('wss://' + window.document.location.host);
    ws.onmessage = (event) => {
        message = JSON.parse(event.data)
        var initiator = false
        var userName = ''


        var p1 = new Promise(function(resolve, reject) {
            swal({
                    title: "Who are u ?",
                    text: "Choose a username:",
                    type: "input",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Choose a username"
                },
                (usrNm) => {
                    if (usrNm === false || usrNm === "" || ifUserTaken(usrNm)) {
                        swal.showInputError("You need to write something!");
                        return (false);
                    } else {
                        setTimeout(() => {
                            userName = usrNm
                            resolve(usrNm)
                        }, 1000);
                        swal("Nice!", "You wrote: " + usrNm, "success");
                    };
                });
        })



        if (message && message.connected) {
            return p1.then(
                (userName) => {
                    console.log(userName);
                    return wrtc(message.connected <= 1, userName)
                }
            ).catch(
                (e) => {
                    console.log(e)
                }
            )
        } else {
            switch (message) {
                case message:
                    //console.log(message);
                    break;
                default:
            }
        }
    };





    function ifUserTaken(username) {
        //Check if is Taken and set in Level
        return (false);
    };


}

function App(username) {

    //return getUsers();
};

(function() {
    "use strict";

    return (SimplePeer.WEBRTC_SUPPORT || typeof(Worker) == "undefined") ? run() : notifyFailure();
}());

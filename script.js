// Initialize PeerJS
const peer = new Peer(undefined, {
    host: 'http://127.0.0.1:5501/css/%E1%88%98%E1%88%A8%E1%8C%83%20%E1%8C%A0%E1%89%8B%E1%88%9A.html', // You can use PeerJS cloud or your own server
    secure: true,
    port: 9000
});

// Get media stream from the user's camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        document.getElementById('myVideo').srcObject = stream;
        const callButton = document.getElementById('callButton');

        callButton.addEventListener('click', () => {
            const remotePeerId = prompt("Enter the Peer ID of the person you want to call:");
            const call = peer.call(remotePeerId, stream);
            call.on('stream', remoteStream => {
                document.getElementById('remoteVideo').srcObject = remoteStream;
            });
        });
    });

// Handle incoming calls
peer.on('call', call => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            call.answer(stream); // Answer the call with your stream
            document.getElementById('myVideo').srcObject = stream;
            call.on('stream', remoteStream => {
                document.getElementById('remoteVideo').srcObject = remoteStream;
            });
        });
});

// Handle peer connection errors
peer.on('error', err => {
    alert("Error: " + err.message);
});

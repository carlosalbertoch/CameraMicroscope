const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCamera = document.getElementById('startCamera');
const snap = document.getElementById('snap');
const stopCamera = document.getElementById('stopCamera');
const context = canvas.getContext('2d');
let stream;

startCamera.addEventListener('click', function() {
    video.style.display = 'block';
    canvas.style.display = 'none';
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(s) {
    stream = s;
    video.srcObject = stream;
    video.onloadedmetadata = function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };
    startCamera.style.display = 'none';
    snap.style.display = 'inline-block';
    })
    .catch(function(err) {
    console.log('Error: ', err);
    });
});


snap.addEventListener('click', function() {
    canvas.style.display = 'block';
    video.style.display = 'none';
    snap.style.display = 'none';
    stopCamera.style.display = 'inline-block';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});


stopCamera.addEventListener('click', function() {
    stream.getTracks().forEach(function(track) {
        track.stop();
});
    canvas.style.display = 'none';
    video.style.display = 'none';
    stopCamera.style.display = 'none';
    startCamera.style.display = 'inline-block';
});
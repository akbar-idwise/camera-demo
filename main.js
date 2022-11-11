'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

let constraints = {
  audio: false,
  video: {
    facingMode: 'user',
    width: { min: 1200, ideal: 1920, max: 1920 },
    height: { min: 600, ideal: 1080, max: 1080 },
    focusMode: { ideal: "continuous" },
    zoom: 1,
  },
};

const snapshotButton = document.getElementById('snapshot-button');
snapshotButton.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

const toggleButton = document.getElementById('toggle-button');
toggleButton.onclick = function() {
  constraints.video.facingMode = constraints.video.facingMode === 'user' ? 'environment' : 'user';
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

"use strict";

/* Get Our Elements */
var player = document.querySelector('.player');
var video = player.querySelector('.viewer');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress__filled');
var toggle = player.querySelector('.toggle');
var skipButtons = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player__slider'); // build out functions

function togglePlay() {
  var method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  toggle.innerHTML = this.paused ? "►" : "❚❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function progressUpdate() {
  var percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = "".concat(percent, "%");
}

function scrub(e) {
  var scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
} // event listeners


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(function (btn) {
  return btn.addEventListener('click', skip);
});
ranges.forEach(function (range) {
  return range.addEventListener('change', rangeUpdate);
});
var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function (e) {
  return mousedown && scrub;
});
progress.addEventListener('mousedown', mousedown = true);
progress.addEventListener('mouseup', mousedown = false);
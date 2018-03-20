"use strict";

function attachAudio(e) {
  var key = document.querySelector("div[data-key = '".concat(e.keyCode, "']"));
  var audio = document.querySelector("audio[data-key = '".concat(e.keyCode, "']"));

  if (key && audio) {
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }
}

function transitionEnd() {
  var keys = document.querySelectorAll('.key');
  keys.forEach(function (key) {
    return key.addEventListener('transitionend', function () {
      key.classList.remove('playing');
    });
  });
}

window.addEventListener('keydown', attachAudio);
transitionEnd();
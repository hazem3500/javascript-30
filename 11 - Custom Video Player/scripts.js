/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build out functions

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(){
  toggle.innerHTML = this.paused ? "►" : "❚❚";
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
  video[this.name] = this.value;
}

function progressUpdate(){
   const percent = (video.currentTime / video.duration) * 100;
   progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change', rangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub);
progress.addEventListener('mousedown', mousedown = true);
progress.addEventListener('mouseup', mousedown = false);

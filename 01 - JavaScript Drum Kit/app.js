const keys = document.querySelectorAll('.key');

function attachAudio(e) {
    const keyCode = (this.dataset) ? this.dataset.key : undefined;
    const key = document.querySelector(`div[data-key = '${keyCode || e.keyCode}']`);
    const audio = document.querySelector(`audio[data-key = '${keyCode || e.keyCode}']`);
    if (key && audio) {
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
    }
}

window.addEventListener('keydown', attachAudio);
keys.forEach(key => {
    key.addEventListener('touchstart', attachAudio);
    key.addEventListener('transitionend', () => {
        key.classList.remove('playing');
    });
});

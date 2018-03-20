function attachAudio(e) {
    const key = document.querySelector(`div[data-key = '${e.keyCode}']`);
    const audio = document.querySelector(`audio[data-key = '${e.keyCode}']`);
    if (key && audio) {
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
    }
}

function transitionEnd() {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) =>
        key.addEventListener('transitionend', () => {
            key.classList.remove('playing');
        })
    );
}

window.addEventListener('keydown', attachAudio);
transitionEnd();

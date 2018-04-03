let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const btns = document.querySelectorAll('[data-time]');

const twoDigit = (num) => (num < 10 ? `0${num}` : num);

function displayTimeLeft(seconds) {
    const min = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${twoDigit(min)}:${twoDigit(secondsLeft)}`;
    timeDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${twoDigit(hours % 12)}:${twoDigit(minutes)}`;
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + (seconds * 1000);

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft === 0) {
            clearInterval(countdown);
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function startTimer(e) {
    const { time } = e.target.dataset;
    timer(time);
}

function handleCustomTimer(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
}

btns.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', handleCustomTimer);

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const filters = document.querySelectorAll('.filter');

// FILTERS

function normal(pixels) {
    return pixels;
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] += 100; // red
        pixels.data[i + 1] -= 50;  // green
        pixels.data[i + 2] *= 0.5; // blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 150] = pixels.data[i + 0]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; // green
        pixels.data[i + 550] = pixels.data[i + 2]; // blue
    }
    return pixels;
}

function invert(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[pixels.data.length - 1 - i + 0]; // red
        pixels.data[i + 1] = pixels.data[pixels.data.length - 1 - i + 1]; // green
        pixels.data[i + 2] = pixels.data[pixels.data.length - 1 - i + 2]; // blue
    }
    return pixels;
}

function blur(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 3] = 50; // alpha
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i + 0];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

// END OF FILTERS

let mode = normal;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        }).catch(err => console.error(err));
}

function drawToCanvas() {
    const { width, height } = video;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // add filters
        pixels = mode(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', drawToCanvas);

filters.forEach(filter => filter.addEventListener('click', (e) => {
    const tempMode = e.dataset.mode;
    switch (tempMode) {
        case 'normal':
            mode = normal;
            break;
        case 'redEffect':
            mode = redEffect;
            break;
        case 'rgbSplit':
            mode = rgbSplit;
            break;
        case 'invert':
            mode = invert;
            break;
        case 'blur':
            mode = blur;
            break;
        case 'greenScreen':
            mode = greenScreen;
            break;
        default:
            mode = normal;
            break;
    }
}));

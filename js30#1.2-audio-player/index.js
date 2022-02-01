const audio = new Audio();
const player = document.querySelector('.btn-play')
const controlProgress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
let isPlay = false

const progress = document.querySelector('.range')
let range
let currentTime
let duration
let time = 0
let Xcoor
audio.src = 'assets/audio/Anacondaz.mp3';

isPlay = false;

audio.addEventListener("timeupdate", function () {
    progress.onmousemove = function (event) {
        progress.onclick = function () {
            time = (event.clientX - 80) / 294 * duration
            audio.currentTime = time
            console.log(time)
        }
    }
    duration = audio.duration;
    currentTime = audio.currentTime;
    range = (currentTime / duration) * 100
    progress.value = range
    console.log(currentTime)
});





function playAudio() {
    if (isPlay === false) {
        isPlay = true
        audio.currentTime = 0;
        player.classList.remove('play')
        player.classList.add('pause')
        audio.play();
        audio.currentTime = time
    } else {
        audio.pause();
        time = audio.currentTime
        isPlay = false
        player.classList.add('play')
        player.classList.remove('pause')
    }
}

player.addEventListener('click', playAudio);


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


audio.addEventListener("timeupdate", function () {
    currentTime = audio.currentTime;
    duration = audio.duration;
    range = (currentTime / duration) * 100
    progress.value = range
    console.log(range)
});

progress.onmousemove = function (event) {
    progress.onclick = function () {
        console.log()
        time = (event.clientX - 80)/294*duration
    }
}



function playAudio() {
    if (isPlay === false) {
        isPlay = true
        audio.src = 'assets/audio/Anacondaz.mp3';
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


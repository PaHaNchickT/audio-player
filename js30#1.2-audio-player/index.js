const audio = new Audio();
const player = document.querySelector('.btn-play')
const bar = document.querySelector('.bar-progress')
const progress = document.querySelector('.range')
const coordPlayer = player.getBoundingClientRect()
let coordLeft
let isPlay = false
let range
let currentTime
let duration
let time = 0
let Xcoor

audio.src = 'assets/audio/Anacondaz.mp3';

for (let keys in coordPlayer) {
    coordLeft = coordPlayer['left']
}

audio.addEventListener("timeupdate", function () {
    progress.onmousemove = function (event) {
        progress.onclick = function () {
            time = (event.clientX - coordLeft) / 294 * duration
            audio.currentTime = time
            console.log(time/duration)
        }
    }
    if (isPlay === false) {
        bar.style.left = `calc(${time/duration*100}% - 5.5px)`
    } else {
        bar.style.left = `calc(${currentTime/duration*100}% - 5.5px)`
    }
    duration = audio.duration;
    currentTime = audio.currentTime;
    range = (currentTime / duration) * 100
    progress.value = range
    // console.log(currentTime)
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


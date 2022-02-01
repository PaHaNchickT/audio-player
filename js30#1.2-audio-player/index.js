import songlist from './songs.js';

const audio = new Audio();
const player = document.querySelector('.btn-play')
const bar = document.querySelector('.bar-progress')
const progress = document.querySelector('.range')
const coordPlayer = player.getBoundingClientRect()
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let coordLeft
let isPlay = false
let range
let currentTime
let duration = audio.duration
let time = 0
let Xcoor
let min = 0
let sec = 0
let durmin = 0
let dursec = 0
let song = 1
let songsNumber = 0

for (let keys in songlist) {
    songsNumber = songsNumber + 1
}

audio.src = `assets/audio/${song}.mp3`;

for (let keys in coordPlayer) {
    coordLeft = coordPlayer['left']
}
//progression bar
audio.addEventListener("timeupdate", function () {
    progress.onmousemove = function (event) {
        progress.onclick = function () {
            time = (event.clientX - coordLeft) / 294 * duration
            audio.currentTime = time
        }
    }
    if (isPlay === false) {
        bar.style.left = `calc(${time / duration * 100}% - 5.5px)`
    } else {
        bar.style.left = `calc(${currentTime / duration * 100}% - 5.5px)`
    }
    duration = audio.duration;
    currentTime = audio.currentTime;
    range = (currentTime / duration) * 100
    progress.value = range
    //current time
    sec = Math.trunc(currentTime)
    if ((sec >= 0) && (sec <= 9)) {
        sec = `0${sec}`
    }
    if (sec >= 60) {
        min = Math.trunc(currentTime / 60)
        sec = Math.trunc(currentTime % 60)
        if ((sec >= 0) && (sec <= 9)) {
            sec = `0${sec}`
        }
    }
    document.querySelector('.current-time').textContent = `${min}:${sec}`
    //duration time
    dursec = Math.trunc(duration);
    if (dursec >= 60) {
        durmin = Math.trunc(duration / 60)
        dursec = Math.trunc(duration % 60)
        if ((dursec >= 0) && (dursec <= 9)) {
            dursec = `0${dursec}`
        }
    }
    document.querySelector('.duration-time').textContent = `${durmin}:${dursec}`
});

//play audio buttons
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

//prev and next

function prevSong() {
    song = song - 1
    audio.src = `assets/audio/${song}.mp3`;
    audio.play();
    audio.addEventListener('error', function () {
        song = songsNumber-1
        audio.src = `assets/audio/${song}.mp3`;
        audio.play();
    }, false);
}

function nextSong() {
    song = song + 1
    audio.src = `assets/audio/${song}.mp3`;
    audio.play();
    audio.addEventListener('error', function () {
        song = 0
        audio.src = `assets/audio/${song}.mp3`;
        audio.play();
    }, false);
}

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

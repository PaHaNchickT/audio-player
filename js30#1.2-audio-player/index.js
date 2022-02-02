import songlist from './songs.js';

const audio = new Audio();
const player = document.querySelector('.btn-play')
const bar = document.querySelector('.bar-progress')
const progress = document.querySelector('.range')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const cover = document.querySelector('.cover')
const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')
const bg = document.querySelector('body')

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
let song = 0
let songsNumber = 0
let info

for (let keys in songlist) {
    songsNumber = songsNumber + 1
}

audio.src = `assets/audio/${song}.mp3`;


//progression bar
audio.addEventListener("timeupdate", function () {
    //change style of cover

    if (isPlay === true) {
        cover.style.backgroundSize = '103%'
    } else {
        cover.style.backgroundSize = '100%'
    }
    //progress bar
    const coordPlayer = player.getBoundingClientRect()
    for (let keys in coordPlayer) {
        coordLeft = coordPlayer['left'] + 35;
    }
    progress.onmousemove = function (event) {
        progress.onclick = function () {
            time = (event.clientX - coordLeft) / 264 * duration
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

    //info
    for (let keys in songlist) {
        info = songlist[song].split('=')
    }
    h1.textContent = info[0]
    h2.textContent = info[1]
    if (info[2] === '') {
        cover.style.backgroundImage = `url(assets/img/default.jpg)`
        bg.style.backgroundImage = `url(assets/img/default.jpg)`
    } else {
        cover.style.backgroundImage = `url(assets/img/${info[2]}.jpg)`
        bg.style.backgroundImage = `url(assets/img/${info[2]}.jpg)`
    }
    //what if song ended
    if (currentTime === duration) {
        nextSong()
    }
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

//prev function
function prevSong() {
    if (sec > 1) {
        audio.currentTime = 0
        min = 0
        if (isPlay === false) {
            player.classList.remove('play')
            player.classList.add('pause')
            isPlay = true
            audio.play();
        }
    } else {
        if (isPlay === false) {
            player.classList.remove('play')
            player.classList.add('pause')
            isPlay = true
        }
        min = 0
        song = song - 1
        audio.src = `assets/audio/${song}.mp3`;
        audio.play();
        audio.addEventListener('error', function () {
            song = songsNumber - 1
            audio.src = `assets/audio/${song}.mp3`;
            audio.play();
        }, false);
    }
}
//next function
function nextSong() {
    min = 0
    song = song + 1
    audio.src = `assets/audio/${song}.mp3`;
    if (isPlay === false) {
        audio.currentTime = 0
        player.classList.remove('play')
        player.classList.add('pause')
        isPlay = true
    }
    audio.play();
    audio.addEventListener('error', function () {
        song = 0
        audio.src = `assets/audio/${song}.mp3`;
        audio.play();
    }, false);
}

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);


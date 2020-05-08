const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');
const background = document.getElementById('background');
const dance = document.getElementById('dance');
//Song titles
const songs = ['Anime_Thighs', 'tsundere'];

//Keep track of song
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
    dance.src = `images/${song}_Dance.gif`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play')
    playBtn.querySelector('i.fa').classList.add('fa-pause')

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause')
    playBtn.querySelector('i.fa').classList.add('fa-play')

    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement; //Destructuring
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX; //Position where user clicks X axis wise
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
    console.log('clicked'); 
});

//Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click',nextSong);

//Time song update
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click',setProgress);

//Song Ends
audio.addEventListener('ended', nextSong);
// ==========================================
// CODEALPHA - MUSIC PLAYER
// ==========================================


// ==========================================
// Select Elements
// ==========================================

const audioPlayer = document.getElementById("audioPlayer");

const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");
const volumeValue = document.getElementById("volumeValue");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");

const speedControl = document.getElementById("speedControl");

const playlist = document.getElementById("playlist");


// Add Track
const addTrackButton =
    document.getElementById("addTrackButton");

const addTrackModal =
    document.getElementById("addTrackModal");

const modalClose =
    document.getElementById("modalClose");

const saveTrackButton =
    document.getElementById("saveTrackButton");

const trackNameInput =
    document.getElementById("trackNameInput");

const artistInput =
    document.getElementById("artistInput");

const audioUrlInput =
    document.getElementById("audioUrlInput");


// ==========================================
// Playlist Data
// ==========================================

let tracks = [

    {
        title: "Midnight Dreams",
        artist: "CodeAlpha Beats",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        title: "Ocean Waves",
        artist: "Ambient Flow",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        title: "Neon Lights",
        artist: "Future Sound",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        title: "Calm Evening",
        artist: "Dreamy Audio",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        title: "Digital Journey",
        artist: "Tech Waves",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },

    {
        title: "Starlight",
        artist: "Night Vibes",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }

];


// ==========================================
// Player Variables
// ==========================================

let currentIndex = 0;

let isShuffle = false;

let isRepeat = false;


// ==========================================
// Load Track
// ==========================================

function loadTrack(index, autoPlay = false) {

    if (tracks.length === 0) {
        return;
    }

    currentIndex = index;

    const track = tracks[currentIndex];

    trackTitle.textContent = track.title;

    trackArtist.textContent = track.artist;

    audioPlayer.src = track.url;

    audioPlayer.load();

    currentTimeDisplay.textContent = "0:00";

    durationDisplay.textContent = "0:00";

    progressBar.value = 0;

    updateActiveTrack();


    if (autoPlay) {

        const playPromise =
            audioPlayer.play();

        if (playPromise !== undefined) {

            playPromise.catch(function () {

                console.log(
                    "Browser blocked automatic playback."
                );

            });

        }

    }

}


// ==========================================
// Play / Pause
// ==========================================

function togglePlay() {

    if (!audioPlayer.src) {
        loadTrack(currentIndex);
    }


    if (audioPlayer.paused) {

        audioPlayer.play();

    } else {

        audioPlayer.pause();

    }

}


// ==========================================
// Update Play Button
// ==========================================

function updatePlayButton() {

    if (audioPlayer.paused) {

        playButton.textContent = "▶";

    } else {

        playButton.textContent = "❚❚";

    }

}


// ==========================================
// Previous Track
// ==========================================

function previousTrack() {

    if (tracks.length === 0) {
        return;
    }


    if (
        isShuffle &&
        tracks.length > 1
    ) {

        currentIndex =
            getRandomTrackIndex();

    } else {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                tracks.length - 1;

        }

    }


    loadTrack(currentIndex, true);

}


// ==========================================
// Next Track
// ==========================================

function nextTrack() {

    if (tracks.length === 0) {
        return;
    }


    if (
        isShuffle &&
        tracks.length > 1
    ) {

        currentIndex =
            getRandomTrackIndex();

    } else {

        currentIndex++;

        if (currentIndex >= tracks.length) {

            currentIndex = 0;

        }

    }


    loadTrack(currentIndex, true);

}


// ==========================================
// Random Track
// ==========================================

function getRandomTrackIndex() {

    let newIndex;

    do {

        newIndex =
            Math.floor(
                Math.random() * tracks.length
            );

    } while (
        newIndex === currentIndex &&
        tracks.length > 1
    );

    return newIndex;

}


// ==========================================
// Format Time
// ==========================================

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


// ==========================================
// Audio Metadata Loaded
// ==========================================

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        durationDisplay.textContent =
            formatTime(
                audioPlayer.duration
            );

        progressBar.max =
            audioPlayer.duration;

    }
);


// ==========================================
// Time Update
// ==========================================

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (
            Number.isFinite(
                audioPlayer.duration
            )
        ) {

            progressBar.value =
                audioPlayer.currentTime;

            currentTimeDisplay.textContent =
                formatTime(
                    audioPlayer.currentTime
                );

        }

    }
);


// ==========================================
// Progress Bar
// ==========================================

progressBar.addEventListener(
    "input",
    function () {

        audioPlayer.currentTime =
            Number(progressBar.value);

    }
);


// ==========================================
// Volume
// ==========================================

function updateVolume() {

    audioPlayer.volume =
        Number(volumeControl.value);


    volumeValue.textContent =
        Math.round(
            audioPlayer.volume * 100
        ) + "%";


    if (
        audioPlayer.volume === 0
    ) {

        volumeControl.style.opacity =
            "0.5";

    } else {

        volumeControl.style.opacity =
            "1";

    }

}


volumeControl.addEventListener(
    "input",
    updateVolume
);


// ==========================================
// Playback Speed
// ==========================================

speedControl.addEventListener(
    "change",
    function () {

        audioPlayer.playbackRate =
            Number(
                speedControl.value
            );

    }
);


// ==========================================
// Shuffle
// ==========================================

shuffleButton.addEventListener(
    "click",
    function () {

        isShuffle = !isShuffle;

        shuffleButton.classList.toggle(
            "active",
            isShuffle
        );

    }
);


// ==========================================
// Repeat
// ==========================================

repeatButton.addEventListener(
    "click",
    function () {

        isRepeat = !isRepeat;

        repeatButton.classList.toggle(
            "active",
            isRepeat
        );

    }
);


// ==========================================
// Track Ended
// ==========================================

audioPlayer.addEventListener(
    "ended",
    function () {

        if (isRepeat) {

            audioPlayer.currentTime = 0;

            audioPlayer.play();

        } else {

            nextTrack();

        }

    }
);


// ==========================================
// Play State
// ==========================================

audioPlayer.addEventListener(
    "play",
    updatePlayButton
);

audioPlayer.addEventListener(
    "pause",
    updatePlayButton
);


// ==========================================
// Playlist Active Track
// ==========================================

function updateActiveTrack() {

    const trackElements =
        playlist.querySelectorAll(".track");


    trackElements.forEach(
        function (trackElement, index) {

            trackElement.classList.toggle(
                "active",
                index === currentIndex
            );

        }
    );

}


// ==========================================
// Playlist Click
// ==========================================

function setupTrackClick(trackElement) {

    trackElement.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    trackElement.dataset.index
                );


            if (
                Number.isInteger(index) &&
                index >= 0 &&
                index < tracks.length
            ) {

                loadTrack(index, true);

            }

        }
    );

}


// ==========================================
// Setup Existing Playlist
// ==========================================

function setupPlaylistClicks() {

    const trackElements =
        playlist.querySelectorAll(".track");


    trackElements.forEach(
        function (trackElement) {

            setupTrackClick(
                trackElement
            );

        }
    );

}


// ==========================================
// Add New Track
// ==========================================

addTrackButton.addEventListener(
    "click",
    function () {

        addTrackModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

        trackNameInput.focus();

    }
);


// ==========================================
// Close Add Track Modal
// ==========================================

function closeAddTrackModal() {

    addTrackModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "auto";

}


// Close Button

modalClose.addEventListener(
    "click",
    closeAddTrackModal
);


// Background Click

addTrackModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === addTrackModal
        ) {

            closeAddTrackModal();

        }

    }
);


// ==========================================
// Save New Track
// ==========================================

saveTrackButton.addEventListener(
    "click",
    function () {

        const title =
            trackNameInput.value.trim();

        const artist =
            artistInput.value.trim();

        const url =
            audioUrlInput.value.trim();


        if (
            title === "" ||
            artist === "" ||
            url === ""
        ) {

            alert(
                "Please enter song title, artist and audio URL."
            );

            return;

        }


        const newTrack = {

            title: title,

            artist: artist,

            url: url

        };


        tracks.push(newTrack);


        renderPlaylist();


        const newIndex =
            tracks.length - 1;


        loadTrack(
            newIndex,
            false
        );


        trackNameInput.value = "";

        artistInput.value = "";

        audioUrlInput.value = "";


        closeAddTrackModal();


        alert(
            "Track added successfully!"
        );

    }
);


// ==========================================
// Render Playlist
// ==========================================

function renderPlaylist() {

    playlist.innerHTML = "";


    tracks.forEach(
        function (track, index) {


            const trackElement =
                document.createElement("div");


            trackElement.className =
                "track";


            if (
                index === currentIndex
            ) {

                trackElement.classList.add(
                    "active"
                );

            }


            trackElement.dataset.index =
                index;


            trackElement.innerHTML = `

                <div class="track-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="track-details">

                    <h3>
                        ${escapeHTML(track.title)}
                    </h3>

                    <p>
                        ${escapeHTML(track.artist)}
                    </p>

                </div>

                <span class="track-duration">
                    ${index === currentIndex
                        ? formatTime(audioPlayer.duration)
                        : "--:--"
                    }
                </span>

            `;


            playlist.appendChild(
                trackElement
            );


            setupTrackClick(
                trackElement
            );

        }
    );

}


// ==========================================
// Escape HTML
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// Update Current Track Duration
// ==========================================

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        const activeTrack =
            playlist.querySelector(
                ".track.active"
            );


        if (activeTrack) {

            const durationElement =
                activeTrack.querySelector(
                    ".track-duration"
                );


            if (durationElement) {

                durationElement.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }

    }
);


// ==========================================
// Keyboard Controls
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        const tagName =
            document.activeElement.tagName;


        // Don't interfere while typing
        // inside inputs.

        if (
            tagName === "INPUT" ||
            tagName === "SELECT" ||
            tagName === "TEXTAREA"
        ) {

            return;

        }


        if (event.code === "Space") {

            event.preventDefault();

            togglePlay();

        }


        else if (
            event.code === "ArrowLeft"
        ) {

            event.preventDefault();

            audioPlayer.currentTime =
                Math.max(
                    0,
                    audioPlayer.currentTime - 5
                );

        }


        else if (
            event.code === "ArrowRight"
        ) {

            event.preventDefault();

            audioPlayer.currentTime =
                Math.min(
                    audioPlayer.duration || 0,
                    audioPlayer.currentTime + 5
                );

        }


        else if (
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            volumeControl.value =
                Math.min(
                    1,
                    Number(volumeControl.value) + 0.05
                );

            updateVolume();

        }


        else if (
            event.code === "ArrowDown"
        ) {

            event.preventDefault();

            volumeControl.value =
                Math.max(
                    0,
                    Number(volumeControl.value) - 0.05
                );

            updateVolume();

        }

    }
);


// ==========================================
// Button Events
// ==========================================

playButton.addEventListener(
    "click",
    togglePlay
);

previousButton.addEventListener(
    "click",
    previousTrack
);

nextButton.addEventListener(
    "click",
    nextTrack
);


// ==========================================
// Audio Error Handling
// ==========================================

audioPlayer.addEventListener(
    "error",
    function () {

        trackTitle.textContent =
            "Unable to load track";

        trackArtist.textContent =
            "Please check the audio URL";

        updatePlayButton();

    }
);


// ==========================================
// Initial Setup
// ==========================================

audioPlayer.volume =
    Number(volumeControl.value);

audioPlayer.playbackRate = 1;

updateVolume();

setupPlaylistClicks();

loadTrack(
    0,
    false
);
const popup = document.getElementById("welcome-popup");
const closePopup = document.getElementById("close-popup");

const music = document.getElementById("background-music");

music.volume = 0.5;

closePopup.addEventListener("click", function() {
    popup.style.display = "none";

    music.play();
});

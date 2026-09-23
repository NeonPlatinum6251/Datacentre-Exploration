const popup = document.getElementById("welcome-popup");
const closePopup = document.getElementById("close-popup");

const music = document.getElementById("background-music");

music.volume = 0.5;

closePopup.addEventListener("click", function() {
    popup.style.display = "none";

    music.play();
});

const padlock = document.getElementById("padlock");
const lockPopup = document.getElementById("lock-popup");
const lockSound = document.getElementById("lock-sound");
const closeLock = document.getElementById("close-lock");
const submitCode = document.getElementById("submit-code");
const codeInput = document.getElementById("code-input");
const codeMessage = document.getElementById("code-message");

padlock.volume = 10;

padlock.addEventListener("click", function() {

    lockSound.currentTime = 0;
    lockSound.play();

    lockPopup.style.display = "flex";

    codeInput.focus();

});

closeLock.addEventListener("click", function() {

    lockPopup.style.display = "none";

    codeInput.value = "";
    codeMessage.textContent = "";

});

submitCode.addEventListener("click", function() {

    const enteredCode = codeInput.value;

    if (enteredCode === "1234") {

        window.location.href = "datacentre.html";

    } else {

        codeMessage.textContent = "INCORRECT ACCESS CODE.";

    }

});

const protestorsButton = document.getElementById("protestors");
const protestorsDialogue = document.getElementById("protest-speech");
const protestorsDialogueClose = document.getElementById("close-speech");

protestorsButton.addEventListener("click", function() {
    protestorsDialogue.style.display = "flex";
});

protestorsDialogueClose.addEventListener("click", function() {
    protestorsDialogue.style.display = "none";
});
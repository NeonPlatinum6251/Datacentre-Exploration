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
    if (enteredCode === "12") {
        window.location.href = "datacentre.html";
    } else {
        codeMessage.textContent = "INCORRECT ACCESS CODE.";
    }
});

const dialogueModal = document.getElementById("dialogue-modal");
const speakerTitle = document.getElementById("speaker-title");
const dialogueText = document.getElementById("dialogue-text");
const dialogueOptions = document.getElementById("dialogue-options");
const closeSpeech = document.getElementById("close-speech");
const portraitContainer = document.getElementById("portrait-container");
const speakerPortrait = document.getElementById("speaker-portrait");

const npcData = {
    protester: {
        title: "PROTESTORS",
        image: "images/angryman.png",
        intro: "Only 12% of us in Ireland outright reject these facilities, but over 75% are terrified about what they’re doing to our water supply!",
        options: [
            { text: '"What is your issue with the water?"', response: "75% worry about local ecosystems, 72% worry about industry water, and 76% demand 100% renewable energy! Yet look at the smoke from those stacks!" },
            { text: '"Does anyone around here support this?"', response: "Sure, 66% think it brings local jobs and 62% see economic growth. But economics shouldn't destroy local resources!" },
            { text: '"Do you know the entry passcode?"', response: "We intercepted a memo—the code is set to the percentage of Irish respondents who outright reject data centers in their area. You didn't hear that from me..." }
        ]
    },
    reporter: {
        title: "TV NEWS REPORTER",
        image: "images/reporter.png",
        intro: "We're live covering the data center debate! Online news and social media are fueling a massive national debate over energy grid strains.",
        options: [
            { text: '"What are news outlets reporting?"', response: "RTÉ News highlights household energy price hikes due to grid demands. The Irish Times frames it as a choice between big tech investment and national climate goals." },
            { text: '"Are there new regulations?"', response: "Yes, tighter policies force new data centers to generate their own renewable power on-site to reduce pressure on the public grid." },
            { text: '"Why is public acceptance so divided?"', response: "People accept national digital growth in principle, but resist local facilities when they fear household electricity strain and water shortages." }
        ]
    }
};

function openDialogue(npcKey) {
    const npc = npcData[npcKey];
    
    speakerTitle.textContent = npc.title;
    dialogueText.textContent = npc.intro;
    
    speakerPortrait.src = npc.image;
    portraitContainer.style.display = "block";

    dialogueOptions.innerHTML = "";

    npc.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "dialogue-btn";
        btn.textContent = option.text;
        btn.onclick = () => {
            dialogueText.textContent = option.response;
        };
        dialogueOptions.appendChild(btn);
    });

    dialogueModal.style.display = "flex";
}

document.getElementById("protestors").addEventListener("click", () => openDialogue("protester"));

const reporterBtn = document.getElementById("reporter");
if (reporterBtn) {
    reporterBtn.addEventListener("click", () => openDialogue("reporter"));
}

closeSpeech.addEventListener("click", () => {
    dialogueModal.style.display = "none";
    portraitContainer.style.display = "none";
});
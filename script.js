const popup = document.getElementById("welcome-popup");
const closePopup = document.getElementById("close-popup");
const music = document.getElementById("background-music");

if (music) {
    music.volume = 0.5;
}

if (closePopup) {
    closePopup.addEventListener("click", function() {
        popup.style.display = "none";
        music.play();
    });
}

const padlock = document.getElementById("padlock");
const lockPopup = document.getElementById("lock-popup");
const lockSound = document.getElementById("lock-sound");
const closeLock = document.getElementById("close-lock");
const submitCode = document.getElementById("submit-code");
const codeInput = document.getElementById("code-input");
const codeMessage = document.getElementById("code-message");

if (padlock) {
    padlock.addEventListener("click", function() {
        lockSound.currentTime = 0;
        lockSound.play();
        lockPopup.style.display = "flex";
        codeInput.focus();
    });
}

if (closeLock) {
    closeLock.addEventListener("click", function() {
        lockPopup.style.display = "none";
        codeInput.value = "";
        codeMessage.textContent = "";
    });
}

if (submitCode) {
    submitCode.addEventListener("click", function() {
        const enteredCode = codeInput.value;
        if (enteredCode === "12") {
            window.location.href = "datacentre.html";
        } else {
            codeMessage.textContent = "INCORRECT ACCESS CODE.";
        }
    });
}

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
    },
    worker: {
        title: "DATA CENTER WORKER",
        image: "images/worker.png",
        intro: "Hello, can I help you? I work here at the data center.",
        options: [
            { text: '"What does it take to keep a facility like this running?"', response: "More power than most folks realize. Back in 2015, all the data centres in Ireland were using around 1,240 GWh of electricity a year. By 2024, that jumped to nearly 7,000 GWh—over 21% of the entire national electricity consumption! Right now across the sub-regions, between Dublin SouthWest and NorthWest alone, we're monitoring over 900 IT Megawatts of design capacity. The grid is under serious contract ramp pressure."},
            { text: 'People outside are protesting water and power waste. Are those figures accurate?', response: "Look, I hear their concerns—especially on water. But on efficiency, our metrics are top-tier. Our Power Usage Effectiveness here is sitting at 1.14 for hyperscale operations, compared to the European colocation average of 1.28. On water, our Water Usage Effectiveness is down around 0.51 L/kWh for hyperscale facilities because we use closed-loop liquid cooling. We’re not running open evaporative towers 24/7."},
            { text: '""How are you planning to handle future demand?"', response: "We can't just rely on raw grid power anymore. Grid CO2 intensity dropped from 896 gCO2/kWh back in 1990 down to around 255 gCO₂/kWh today, but that’s not fast enough. We’re deploying on-site battery energy storage systems, securing corporate power purchase agreements for wind, and setting up demand-flexibility response so we can throttle back when national demand peaks."},
            {text: "Where can I find more information?", response: "I'm not really supposed to do this, but you can access the terminal over there for more data. The passcode is the amount of electricty data centers used in 2024"}
        ]
    },
    terminal: {
        title: "DATA CENTRE TERMINAL",
        image: "images/terminal.png",
        intro: "The terminal is online. What would you like to inspect?",
        options: [
            {
                text: "Check the power systems", response: "The terminal reports that the facility is drawing heavily from the national grid.",
                followUp: [
                    { text: "View today's demand", response: "Demand is close to the site's maximum capacity." },
                    { text: "Inspect the backup batteries", response: "The batteries are charged and ready to support the facility during a peak." },
                    { text: "Review renewable sources", response: "A small portion of the facility's electricity currently comes from renewable contracts." }
                ]
            },

            {
                text:"Decide the fate of the center", response: "SYSTEM POWER CONTROL",
                followUp: [
                    { text: "Log off the data center and leave this place", response: "", action: () => { window.location.href = "ending-status-quo.html"; } },
                    {text: "trigger an emergency circuit trip/load shedding via terminal code to force the facility offline", response: "", action: () => { window.location.href = "ending-shutdown.html"; }},
                    {text: "You override the power router to require 100% On-Site Renewable Contracts (CPPAs), Battery Energy Storage Systems (BESS), and Demand Flexibility.", response: "", action: () => { window.location.href = "ending-renewable.html"; }}
                ]
            }


        ]
}};

function renderDialogueOptions(options) {
    dialogueOptions.innerHTML = "";

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "dialogue-btn";
        btn.textContent = option.text;
        btn.onclick = () => {
            dialogueText.textContent = option.response;
            if (option.action) {
                option.action();
                return;
            }
            if (option.followUp) {
                renderDialogueOptions(option.followUp);
            }
        };
        dialogueOptions.appendChild(btn);
    });
}

function openDialogue(npcKey) {
    const npc = npcData[npcKey];
    
    speakerTitle.textContent = npc.title;
    dialogueText.textContent = npc.intro;
    
    speakerPortrait.src = npc.image;
    portraitContainer.style.display = "block";

    renderDialogueOptions(npc.options);

    dialogueModal.style.display = "flex";
}

const protestorsButton = document.getElementById("protestors");
if (protestorsButton) {
    protestorsButton.addEventListener("click", () => openDialogue("protester"));
}

const reporterBtn = document.getElementById("reporter");
if (reporterBtn) {
    reporterBtn.addEventListener("click", () => openDialogue("reporter"));
}

closeSpeech.addEventListener("click", () => {
    dialogueModal.style.display = "none";
    portraitContainer.style.display = "none";
});


document.getElementById("worker").addEventListener("click", () => openDialogue("worker"));

const terminalButton = document.getElementById("terminal");
const terminalLockPopup = document.getElementById("terminal-lock-popup");
const terminalCodeInput = document.getElementById("terminal-code-input");
const submitTerminalCode = document.getElementById("submit-terminal-code");
const closeTerminalLock = document.getElementById("close-terminal-lock");
const terminalCodeMessage = document.getElementById("terminal-code-message");

if (terminalButton) {
    terminalButton.addEventListener("click", () => {
        terminalLockPopup.style.display = "flex";
        terminalCodeInput.focus();
    });
}

if (submitTerminalCode) {
    submitTerminalCode.addEventListener("click", () => {
        if (terminalCodeInput.value === "7000") {
            terminalLockPopup.style.display = "none";
            terminalCodeInput.value = "";
            terminalCodeMessage.textContent = "";
            openDialogue("terminal");
        } else {
            terminalCodeMessage.textContent = "INCORRECT ACCESS CODE.";
        }
    });
}

if (closeTerminalLock) {
    closeTerminalLock.addEventListener("click", () => {
        terminalLockPopup.style.display = "none";
        terminalCodeInput.value = "";
        terminalCodeMessage.textContent = "";
    });
}

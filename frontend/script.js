/* =====================================================
   JARVIS AI COMMAND CENTER
===================================================== */


/* ================= ELEMENTS ================= */

const input =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const messages =
    document.getElementById("messages");

const cpu =
    document.getElementById("cpu");

const memory =
    document.getElementById("memory");

const network =
    document.getElementById("network");

const cpuBar =
    document.getElementById("cpuBar");

const memoryBar =
    document.getElementById("memoryBar");

const networkBar =
    document.getElementById("networkBar");

const clock =
    document.getElementById("clock");

const uptimeElement =
    document.getElementById("uptime");

const systemStatus =
    document.getElementById("systemStatus");

const mode =
    document.getElementById("mode");

const voiceButton =
    document.getElementById("voiceButton");

const voiceStatus =
    document.getElementById("voiceStatus");

const terminal =
    document.getElementById("terminal");

const notification =
    document.getElementById("notification");

const graphLine =
    document.getElementById("graphLine");


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const now = new Date();

    const h =
        String(now.getHours()).padStart(2,"0");

    const m =
        String(now.getMinutes()).padStart(2,"0");

    const s =
        String(now.getSeconds()).padStart(2,"0");

    clock.textContent =
        `${h}:${m}:${s}`;
}

setInterval(updateClock,1000);

updateClock();


/* =====================================================
   UPTIME
===================================================== */

const startTime =
    Date.now();

function updateUptime() {

    const total =
        Math.floor(
            (Date.now() - startTime) / 1000
        );

    const h =
        Math.floor(total / 3600);

    const m =
        Math.floor((total % 3600) / 60);

    const s =
        total % 60;

    uptimeElement.textContent =
        `${String(h).padStart(2,"0")}:` +
        `${String(m).padStart(2,"0")}:` +
        `${String(s).padStart(2,"0")}`;
}

setInterval(updateUptime,1000);


/* =====================================================
   SYSTEM STATS
===================================================== */

function randomNumber(min,max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function updateSystemStats() {

    const cpuValue =
        randomNumber(20,65);

    const memoryValue =
        randomNumber(35,70);

    const networkValue =
        randomNumber(65,95);


    cpu.textContent =
        cpuValue;

    memory.textContent =
        memoryValue;

    network.textContent =
        networkValue;


    cpuBar.style.width =
        `${cpuValue}%`;

    memoryBar.style.width =
        `${memoryValue}%`;

    networkBar.style.width =
        `${networkValue}%`;
}

setInterval(
    updateSystemStats,
    2000
);

updateSystemStats();


/* =====================================================
   GRAPH
===================================================== */

function updateGraph() {

    const points = [];

    const totalPoints = 15;

    for (
        let i = 0;
        i < totalPoints;
        i++
    ) {

        const x =
            (500 / (totalPoints - 1)) * i;

        const y =
            randomNumber(25,125);

        points.push(
            `${x},${y}`
        );
    }

    graphLine.setAttribute(
        "points",
        points.join(" ")
    );
}

setInterval(
    updateGraph,
    2200
);


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification(text) {

    notification.textContent =
        text;

    notification.classList.add(
        "show"
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    },2200);
}


/* =====================================================
   CHAT
===================================================== */

function addMessage(text,sender) {

    const message =
        document.createElement("div");

    message.className =
        `message ${sender}-message`;


    const name =
        document.createElement("div");

    name.className =
        "message-name";

    name.textContent =
        sender === "user"
            ? "YOU"
            : "JARVIS";


    const content =
        document.createElement("div");

    content.className =
        "message-content";

    content.textContent =
        text;


    message.appendChild(name);

    message.appendChild(content);

    messages.appendChild(message);


    messages.scrollTop =
        messages.scrollHeight;
}


/* =====================================================
   LOCAL JARVIS RESPONSE
===================================================== */

function getJarvisResponse(command) {

    const text =
        command.toLowerCase().trim();


    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey"
    ) {

        return (
            "Hello. JARVIS systems are online."
        );
    }


    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {

        return (
            "I am JARVIS, your AI command center."
        );
    }


    if (
        text.includes("system status")
    ) {

        return (
            "All primary systems are operational. " +
            "AI core, network, voice and security are ready."
        );
    }


    if (
        text.includes("cpu")
    ) {

        return (
            `Current CPU load is ${cpu.textContent} percent.`
        );
    }


    if (
        text.includes("memory") ||
        text.includes("ram")
    ) {

        return (
            `Current memory utilization is ${memory.textContent} percent.`
        );
    }


    if (
        text.includes("network")
    ) {

        return (
            `Network activity is ${network.textContent} percent.`
        );
    }


    if (
        text.includes("time")
    ) {

        return (
            `Current system time is ${clock.textContent}.`
        );
    }


    if (
        text.includes("vision")
    ) {

        return (
            "Vision mode can be activated using the VISION button."
        );
    }


    if (
        text.includes("help") ||
        text.includes("commands")
    ) {

        return (
            "Available commands include system status, CPU, " +
            "memory, network, time, vision and calculations."
        );
    }


    /* BASIC CALCULATOR */

    if (
        /^[0-9+\-*/().\s]+$/.test(text)
    ) {

        try {

            const result =
                Function(
                    `"use strict"; return (${text})`
                )();

            return (
                `Calculation complete: ${result}`
            );

        } catch {

            return (
                "I could not calculate that."
            );
        }
    }


    return (
        "Command received. The interface is operational. " +
        "Connect your AI backend to process advanced requests."
    );
}


/* =====================================================
   SEND MESSAGE
===================================================== */

function sendMessage() {

    const text =
        input.value.trim();


    if (!text)
        return;


    addMessage(
        text,
        "user"
    );


    input.value = "";


    systemStatus.textContent =
        "PROCESSING";

    mode.textContent =
        "THINKING";


    setTimeout(() => {

        const response =
            getJarvisResponse(text);


        addMessage(
            response,
            "jarvis"
        );


        speakJarvis(response);


        systemStatus.textContent =
            "ONLINE";

        mode.textContent =
            "ACTIVE";

    },650);
}


sendButton.addEventListener(
    "click",
    sendMessage
);


input.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();
        }
    }
);


/* =====================================================
   ROBOT VOICE
===================================================== */

function speakJarvis(text) {

    if (
        !("speechSynthesis" in window)
    )
        return;


    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);


    utterance.lang =
        "en-IN";

    utterance.rate =
        0.82;

    utterance.pitch =
        0.45;

    utterance.volume =
        1;


    speechSynthesis.speak(
        utterance
    );
}


/* =====================================================
   VOICE INPUT
===================================================== */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

let listening = false;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";

    recognition.continuous =
        false;

    recognition.interimResults =
        false;


    recognition.onstart =
        () => {

            listening = true;

            voiceStatus.textContent =
                "LISTENING";

            voiceButton.classList.add(
                "active"
            );

            showNotification(
                "VOICE INTERFACE ACTIVE"
            );
        };


    recognition.onresult =
        event => {

            const transcript =
                event.results[0][0]
                    .transcript;

            input.value =
                transcript;

            sendMessage();
        };


    recognition.onerror =
        () => {

            listening = false;

            voiceStatus.textContent =
                "STANDBY";

            voiceButton.classList.remove(
                "active"
            );

            showNotification(
                "VOICE INPUT ERROR"
            );
        };


    recognition.onend =
        () => {

            listening = false;

            voiceStatus.textContent =
                "STANDBY";

            voiceButton.classList.remove(
                "active"
            );
        };


    voiceButton.addEventListener(
        "click",
        () => {

            if (listening) {

                recognition.stop();

            } else {

                try {

                    recognition.start();

                } catch {

                    /* Already running */
                }
            }
        }
    );

} else {

    voiceButton.addEventListener(
        "click",
        () => {

            showNotification(
                "VOICE INPUT NOT SUPPORTED"
            );
        }
    );
}


/* =====================================================
   TERMINAL
===================================================== */

const terminalLogs = [

    "[SYSTEM] Neural engine synchronized.",
    "[CORE] JARVIS processor stable.",
    "[NETWORK] Connection verified.",
    "[SECURITY] Security protocols active.",
    "[AI] Context engine ready.",
    "[VISION] Vision subsystem ready.",
    "[VOICE] Speech engine ready.",
    "[SYSTEM] Monitoring hardware.",
    "[JARVIS] Awaiting command."

];

let terminalIndex = 0;


function addTerminalLog() {

    const line =
        document.createElement("div");


    line.textContent =
        terminalLogs[
            terminalIndex
        ];


    terminal.appendChild(line);


    while (
        terminal.children.length > 8
    ) {

        terminal.removeChild(
            terminal.firstChild
        );
    }


    terminalIndex++;

    if (
        terminalIndex >=
        terminalLogs.length
    ) {

        terminalIndex = 0;
    }
}


setInterval(
    addTerminalLog,
    3000
);


/* =====================================================
   VISION MODE
===================================================== */

const visionButton =
    document.getElementById(
        "visionButton"
    );

const visionOverlay =
    document.getElementById(
        "visionOverlay"
    );

const cameraFeed =
    document.getElementById(
        "cameraFeed"
    );

const closeVision =
    document.getElementById(
        "closeVision"
    );

const gestureStatus =
    document.getElementById(
        "gestureStatus"
    );

const zoomStatus =
    document.getElementById(
        "zoomStatus"
    );


let cameraStream = null;

let visionZoom = 1;

let initialDistance = null;

let initialZoom = 1;


/* =====================================================
   OPEN CAMERA
===================================================== */

visionButton.addEventListener(
    "click",
    async () => {

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            showNotification(
                "CAMERA NOT SUPPORTED"
            );

            return;
        }


        try {

            cameraStream =
                await navigator.mediaDevices
                    .getUserMedia({

                        video: {
                            facingMode:
                                "user"
                        },

                        audio: false

                    });


            cameraFeed.srcObject =
                cameraStream;


            visionOverlay.classList.add(
                "active"
            );


            gestureStatus.textContent =
                "VISION ONLINE";


            zoomStatus.textContent =
                "ZOOM 1.00X";


            speakJarvis(
                "Vision system online."
            );


            showNotification(
                "VISION SYSTEM ONLINE"
            );

        } catch (error) {

            showNotification(
                "CAMERA ACCESS DENIED"
            );

            gestureStatus.textContent =
                "CAMERA PERMISSION REQUIRED";
        }
    }
);


/* =====================================================
   CLOSE CAMERA
===================================================== */

function closeVisionMode() {

    visionOverlay.classList.remove(
        "active"
    );


    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );

        cameraStream = null;
    }


    cameraFeed.srcObject =
        null;


    visionZoom = 1;


    cameraFeed.style.transform =
        "scale(1)";


    gestureStatus.textContent =
        "CAMERA READY";

    zoomStatus.textContent =
        "ZOOM 1.00X";
}


closeVision.addEventListener(
    "click",
    closeVisionMode
);


/* =====================================================
   ESCAPE TO CLOSE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            visionOverlay.classList.contains(
                "active"
            )
        ) {

            closeVisionMode();
        }
    }
);


/* =====================================================
   PINCH ZOOM
===================================================== */

function getTouchDistance(touches) {

    const dx =
        touches[0].clientX -
        touches[1].clientX;

    const dy =
        touches[0].clientY -
        touches[1].clientY;


    return Math.sqrt(
        dx * dx + dy * dy
    );
}


visionOverlay.addEventListener(
    "touchstart",
    event => {

        if (
            event.touches.length !== 2
        )
            return;


        initialDistance =
            getTouchDistance(
                event.touches
            );


        initialZoom =
            visionZoom;


        gestureStatus.textContent =
            "PINCH TRACKING";
    },
    {
        passive: true
    }
);


visionOverlay.addEventListener(
    "touchmove",
    event => {

        if (
            event.touches.length !== 2 ||
            initialDistance === null
        )
            return;


        const distance =
            getTouchDistance(
                event.touches
            );


        const scale =
            distance /
            initialDistance;


        visionZoom =
            initialZoom * scale;


        visionZoom =
            Math.min(
                4,
                Math.max(
                    .7,
                    visionZoom
                )
            );


        cameraFeed.style.transform =
            `scale(${visionZoom})`;


        zoomStatus.textContent =
            `ZOOM ${visionZoom.toFixed(2)}X`;
    },
    {
        passive: true
    }
);


visionOverlay.addEventListener(
    "touchend",
    event => {

        if (
            event.touches.length < 2
        ) {

            initialDistance =
                null;

            gestureStatus.textContent =
                "VISION ONLINE";
        }
    },
    {
        passive: true
    }
);


/* =====================================================
   MOUSE WHEEL ZOOM
   Useful on computer
===================================================== */

visionOverlay.addEventListener(
    "wheel",
    event => {

        event.preventDefault();


        const amount =
            event.deltaY > 0
                ? -.1
                : .1;


        visionZoom += amount;


        visionZoom =
            Math.min(
                4,
                Math.max(
                    .7,
                    visionZoom
                )
            );


        cameraFeed.style.transform =
            `scale(${visionZoom})`;


        zoomStatus.textContent =
            `ZOOM ${visionZoom.toFixed(2)}X`;
    },
    {
        passive: false
    }
);


/* =====================================================
   STARTUP
===================================================== */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                showNotification(
                    "JARVIS SYSTEM ONLINE"
                );

            },
            700
        );
    }
);
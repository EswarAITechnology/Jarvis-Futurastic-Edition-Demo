// ===============================
// JARVIS AI COMMAND CENTER
// ===============================

// Elements
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

const cpu = document.getElementById("cpu");
const memory = document.getElementById("memory");
const network = document.getElementById("network");

const cpuBar = document.getElementById("cpuBar");
const memoryBar = document.getElementById("memoryBar");
const networkBar = document.getElementById("networkBar");

const clock = document.getElementById("clock");
const uptimeElement = document.getElementById("uptime");

const systemStatus = document.getElementById("systemStatus");
const mode = document.getElementById("mode");

const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");

const terminal = document.getElementById("terminal");
const notification = document.getElementById("notification");


// ===============================
// CLOCK
// ===============================

function updateClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const time = `${hours}:${minutes}:${seconds}`;

    if (clock) {
        clock.textContent = time;
    }
}

setInterval(updateClock, 1000);
updateClock();


// ===============================
// UPTIME
// ===============================

const startTime = Date.now();

function updateUptime() {

    const secondsPassed =
        Math.floor((Date.now() - startTime) / 1000);

    const hours =
        Math.floor(secondsPassed / 3600);

    const minutes =
        Math.floor((secondsPassed % 3600) / 60);

    const seconds =
        secondsPassed % 60;

    if (uptimeElement) {

        uptimeElement.textContent =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;
    }
}

setInterval(updateUptime, 1000);


// ===============================
// SYSTEM STATISTICS
// ===============================

function updateSystemStats() {

    const cpuValue =
        Math.floor(Math.random() * 40) + 20;

    const memoryValue =
        Math.floor(Math.random() * 30) + 35;

    const networkValue =
        Math.floor(Math.random() * 20) + 70;


    if (cpu) {
        cpu.textContent = cpuValue;
    }

    if (memory) {
        memory.textContent = memoryValue;
    }

    if (network) {
        network.textContent = networkValue;
    }


    if (cpuBar) {
        cpuBar.style.width = `${cpuValue}%`;
    }

    if (memoryBar) {
        memoryBar.style.width = `${memoryValue}%`;
    }

    if (networkBar) {
        networkBar.style.width = `${networkValue}%`;
    }
}

setInterval(updateSystemStats, 2000);

updateSystemStats();


// ===============================
// NOTIFICATION
// ===============================

function showNotification(text) {

    if (!notification) return;

    notification.textContent = text;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    }, 2200);
}


// ===============================
// ADD CHAT MESSAGE
// ===============================

function addMessage(text, sender) {

    if (!messages) return;


    const message = document.createElement("div");

    message.className =
        `message ${sender}-message`;


    const name = document.createElement("div");

    name.className = "message-name";

    name.textContent =
        sender === "user"
            ? "YOU"
            : "JARVIS";


    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = text;


    message.appendChild(name);
    message.appendChild(content);

    messages.appendChild(message);


    messages.scrollTop =
        messages.scrollHeight;
}


// ===============================
// JARVIS RESPONSE
// ===============================

function getJarvisResponse(command) {

    const text =
        command.toLowerCase().trim();


    // Greeting
    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey"
    ) {

        return "Hello. JARVIS systems are online and ready.";
    }


    // Identity
    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {

        return "I am JARVIS, your AI command center.";
    }


    // System
    if (
        text.includes("system status") ||
        text.includes("system")
    ) {

        return "All primary systems are operational. Core status: ONLINE.";
    }


    // CPU
    if (
        text.includes("cpu") ||
        text.includes("processor")
    ) {

        return `Current CPU usage is ${cpu.textContent}%.`;
    }


    // Memory
    if (
        text.includes("memory") ||
        text.includes("ram")
    ) {

        return `Current memory usage is ${memory.textContent}%.`;
    }


    // Network
    if (
        text.includes("network") ||
        text.includes("internet")
    ) {

        return `Network activity is currently ${network.textContent}%.`;
    }


    // Time
    if (
        text.includes("time") ||
        text.includes("clock")
    ) {

        return `Current system time is ${clock.textContent}.`;
    }


    // Help
    if (
        text.includes("help") ||
        text.includes("commands")
    ) {

        return (
            "Available commands: system status, CPU, memory, " +
            "network, time, hello and basic calculations."
        );
    }


    // Basic calculator
    if (
        /^[0-9+\-*/().\s]+$/.test(text)
    ) {

        try {

            const result =
                Function(
                    `"use strict"; return (${text})`
                )();

            return `Calculation complete: ${result}`;

        } catch {

            return "I could not calculate that.";
        }
    }


    // Default
    return (
        "Command received. The JARVIS frontend is working, " +
        "but the AI backend has not been connected yet."
    );
}


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    if (!input) return;


    const text =
        input.value.trim();


    if (!text) return;


    // User message
    addMessage(text, "user");


    // Clear input
    input.value = "";


    // Processing state
    if (systemStatus) {
        systemStatus.textContent = "PROCESSING";
    }

    if (mode) {
        mode.textContent = "THINKING";
    }


    // Simulate AI thinking
    setTimeout(() => {

        const response =
            getJarvisResponse(text);


        addMessage(
            response,
            "jarvis"
        );


        if (systemStatus) {
            systemStatus.textContent = "ONLINE";
        }

        if (mode) {
            mode.textContent = "ACTIVE";
        }

    }, 600);
}


// ===============================
// SEND BUTTON
// ===============================

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );
}


// ===============================
// ENTER KEY
// ===============================

if (input) {

    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();
            }
        }
    );
}


// ===============================
// VOICE ASSISTANT
// ===============================

let recognition = null;
let listening = false;


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.onstart = function() {

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
        function(event) {

            const transcript =
                event
                    .results[0][0]
                    .transcript;


            input.value =
                transcript;


            sendMessage();
        };


    recognition.onerror =
        function() {

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
        function() {

            listening = false;


            voiceStatus.textContent =
                "STANDBY";


            voiceButton.classList.remove(
                "active"
            );
        };


    voiceButton.addEventListener(
        "click",
        function() {

            if (listening) {

                recognition.stop();

            } else {

                recognition.start();
            }
        }
    );

} else {

    voiceButton.addEventListener(
        "click",
        function() {

            showNotification(
                "VOICE IS NOT SUPPORTED"
            );

        }
    );
}


// ===============================
// TERMINAL LIVE LOGS
// ===============================

const terminalLogs = [

    "[SYSTEM] Neural engine synchronized.",

    "[CORE] JARVIS processor stable.",

    "[NETWORK] Connection verified.",

    "[SECURITY] Security protocols active.",

    "[AI] Context engine ready.",

    "[SYSTEM] Monitoring hardware.",

    "[CORE] Processing resources optimized.",

    "[JARVIS] Awaiting command..."

];


let terminalIndex = 0;


function addTerminalLog() {

    if (!terminal) return;


    const line =
        document.createElement("div");


    line.textContent =
        terminalLogs[terminalIndex];


    terminal.appendChild(line);


    while (
        terminal.children.length > 8
    ) {

        terminal.removeChild(
            terminal.firstChild
        );
    }


    terminal.scrollTop =
        terminal.scrollHeight;


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
    3500
);


// ===============================
// STARTUP
// ===============================

window.addEventListener(
    "load",
    function() {

        setTimeout(() => {

            showNotification(
                "JARVIS SYSTEM ONLINE"
            );

        }, 700);
    }
);
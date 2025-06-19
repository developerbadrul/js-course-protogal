console.log('user-activaty-console');

const logContainer = document.querySelector('.user-logs');
const statusText = document.querySelector('.status');
const timerSpan = document.querySelector('.count-down-timer');

let slideInterval;
let inactivityTimeout;
let countdownInterval;
let countdownValue = 0;

function updateWindowTitle(title) {
    document.title = `${title}`
}

function logMessage(message) {
    const logItem = document.createElement('p');
    logItem.textContent = `${new Date().toLocaleString()}  - ${message}`
    logContainer.prepend(logItem)
}

function updateStatus(text, color = '#333') {
    // Keep the countdown span in place and only update the text part
    statusText.firstChild.textContent = text;
    statusText.style.backgroundColor = color;
    updateWindowTitle(text)
}



function updateCountdownDisplay() {
    if (countdownValue > 0) {
        timerSpan.textContent = `⏳ Resuming in ${countdownValue}s`;
    } else {
        timerSpan.textContent = "";
    }
}

function startCountdown(sec) {
    countdownValue = sec;
    updateCountdownDisplay();
    countdownInterval = setInterval(() => {
        countdownValue--;
        updateCountdownDisplay();
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000)
}

function startAutoSlide() {
    if (slideInterval) return; // 🛡️ Prevent multiple intervals
    slideInterval = setInterval(() => {
        logMessage('⏩ Auto Slide');
    }, 5000);

    updateStatus('▶️ Auto slide started', '#2c7a7b');
    logMessage('▶️ Auto slide started');
}



function stopAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = null;
    updateStatus('⏸️ Auto slide paused due to user activity', '#c53030');
    logMessage('⏸️ Auto slide paused due to user activity');
}


function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    clearInterval(countdownInterval);
    startCountdown(10);
    inactivityTimeout = setTimeout(() => {
        logMessage('⏱️ No activity for 10s. Resuming auto slide...');
        startAutoSlide();
    }, 10000)
}


function onUserActivity(e) {
    logMessage(`👤 User did: ${e.type}`);
    stopAutoSlide();
    resetInactivityTimer();
}


startAutoSlide();


['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, onUserActivity)
})
// seclect elements

const timerDisplay = document.querySelector('.timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// initial values
let timerInterval;
let elapsedTime = 0;
let isRunning = false;


// Format time in HH: MM: SS
const formatTime = time => {
    const hours = Math.trunc(time / 3600);
    const minutes = Math.trunc((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, 0)}: ${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`
}

// Start Button Functionality

startButton.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
        elapsedTime++;
        // console.log('timerInterval', timerInterval);
        timerDisplay.textContent = formatTime(elapsedTime)
    }, 1000)
})


// stop Button func

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
})

//reset button func
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = formatTime(elapsedTime);
    isRunning = false;
})
let timer;
let isRunning = false;
let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let currentTime = workTime;
let onBreak = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const message = document.getElementById('message');
const cultivationBar = document.getElementById('cultivation-bar');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateCultivationBar() {
    const totalDuration = onBreak ? breakTime : workTime;
    const percentage = ((totalDuration - currentTime) / totalDuration) * 100;
    cultivationBar.style.width = `${percentage}%`;
}

function updateTime() {
    if (currentTime > 0) {
        currentTime--;
        timeDisplay.textContent = formatTime(currentTime);
        updateCultivationBar();
    } else {
        if (!onBreak) {
            message.textContent = 'Take a Break, Shinobi!';
            currentTime = breakTime;
            onBreak = true;
        } else {
            message.textContent = 'Training Begins!';
            currentTime = workTime;
            onBreak = false;
        }
        updateCultivationBar(); // Update cultivation bar when switching modes
    }
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        message.textContent = 'Training Begins!';
        timer = setInterval(updateTime, 1000);
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    currentTime = workTime;
    timeDisplay.textContent = formatTime(workTime);
    message.textContent = 'Prepare for battle!';
    cultivationBar.style.width = '0'; // Reset cultivation bar
});

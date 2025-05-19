const alarmSound = new Audio("./alarm.mp3");
const display = document.querySelector("#countdown");
let timer = 1200; // 20 minutes in seconds (initial value)
let isBreakTime = false;
let worker;

const startButton = document.querySelector("#start-button");
console.log(startButton)

if (startButton) {
  startButton.addEventListener("click", startTimer);
} else {
  console.error("Start button not found - check your HTML");
}

function startTimer() {
  if (worker) worker.terminate(); // Stop any existing worker
  
  worker = new Worker('timer-worker.js');
  
  worker.onmessage = function(e) {
    if (e.data === 'tick') {
      timer--;
      updateDisplay();
      
      if (timer === 0) {
        alarmSound.play();
        
        if (!isBreakTime) {
          // Start 20-second break
          isBreakTime = true;
          timer = 20;
        } else {
          // Break is over, restart 20-minute timer
          isBreakTime = false;
          timer = 1200;
        }
      }
    }
  };
  
  worker.postMessage('start');
}

function updateDisplay() {
  const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
}
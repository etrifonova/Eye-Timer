// const alarmSound = new Audio("./alarm.mp3"); // Replace with path to your sound file
// const display = document.querySelector("#countdown");
// // const fiveMinutes = 60 * 0.1;
// let timer = 1201;
// display.textContent = "20:00";

// function startTimer() {

//   if (timer > 0) {
  
//     timer--;
//     let minutes = parseInt(timer / 60, 10);
//     let seconds = parseInt(timer % 60, 10);
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//     let timeLeft = minutes + ":" + seconds;
  
//     display.textContent = timeLeft;
//     console.log(timeLeft)
//     setTimeout(startTimer, 1000);

//   }
//     else if (timer == 0) {
//       alarmSound.play();
//       console.log("bro");
//       timer = 1201;
//       setTimeout(startTimer, 20000);
//     }
// }

// In your main script
const alarmSound = new Audio("./alarm.mp3");
const display = document.querySelector("#countdown");
let timer = 1200; // 20 minutes in seconds
let worker;

function startTimer() {
  // Create a web worker
  worker = new Worker('timer-worker.js');
  
  worker.onmessage = function(e) {
    if (e.data === 'tick') {
      timer--;
      updateDisplay();
      
      if (timer === 0) {
        alarmSound.play();
        timer = 20; // 20 seconds break
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

// timer-worker.js file:
let interval;

self.onmessage = function(e) {
  if (e.data === 'start') {
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  }
};

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

// Register a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service Worker Registered');
  });
}

// In sw.js:
self.addEventListener('message', (event) => {
  if (event.data.command === 'startTimer') {
    let remaining = event.data.duration;
    const timer = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(timer);
        self.registration.showNotification("Time's up!", {
          body: 'Your 20 minutes are over!',
          vibrate: [200, 100, 200]
        });
      }
    }, 1000);
  }
});

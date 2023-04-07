function startTimer() {
    var interval = 20 * 60; // interval in seconds between alarms
    var timeLeft = interval;
    var alarmSound = new Audio('./alarm.mp3'); // Replace with path to your sound file
  
    function countdown() {
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft % 60;
      var countdownDisplay = document.getElementById("countdown");
      countdownDisplay.innerHTML = "Time left: " + minutes + "m " + seconds + "s";
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        alarmSound.play(); // Play the alarm sound
        timeLeft = interval;
        countdownDisplay.innerHTML = "";
        countdown();
      }
      timeLeft--;
    }
  
    countdown();
    var countdownInterval = setInterval(countdown, 1000);
  }
  
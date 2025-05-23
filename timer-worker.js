// timer-worker.js
let interval;

self.onmessage = function(e) {
  if (e.data === 'start') {
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (e.data === 'stop') {
    clearInterval(interval);
  }
};
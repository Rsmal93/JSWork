import { CountUp } from 'countup.js';

window.onload = function() {
  var countUp = new CountUp('target', 2000);
  countUp.start();
}
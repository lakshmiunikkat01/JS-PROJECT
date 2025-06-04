$(document).ready(function() {
 let score = 0;
 let timeLeft = 20;
 let timerInterval;
 const $bullet = $('#bullet');
 const $score = $('#score');
 const $timer = $('#timer');
 const gameWidth = $('#game-container').width();
 const gameHeight = $('#game-container').height();
 
 function createTarget() {
 const $newTarget = $('<div class="target"></div>');
 const newLeft = Math.random() * (gameWidth - 100);
 const newTop = Math.random() * (gameHeight - 100);
 $newTarget.css({
 left: newLeft,
 top: newTop
 }).appendTo('#game-container');
 
 animateTarget($newTarget);
 }
 function animateTarget($target) {
 function move() {
 const newLeft = Math.random() * (gameWidth - 100);
 const newTop = Math.random() * (gameHeight - 100);
 $target.animate({
 left: newLeft,
 top: newTop
 }, 1000, move);
 }
 move();
 }
 function shoot(event) {
 const bulletX = event.pageX - 5;
 const bulletY = event.pageY - 5;
 $bullet.css({
 left: bulletX,
 top: bulletY,
 display: 'block'
 }).fadeOut(500, function() {
 $bullet.hide();
 });
 $('.target').each(function() {
 const $target = $(this);
 const targetX = $target.offset().left;
 const targetY = $target.offset().top;
 if (bulletX >= targetX && bulletX <= targetX + 100 && bulletY >= targetY && bulletY <= 
targetY + 100) {
 score++;
 $score.text('Score: ' + score);
 $target.stop(true).fadeOut(100, function() {
 $target.remove();
 createTarget();
 });
 }
 });
 }
 function startTimer() {
 timeLeft = 20;
 $timer.text('Time: ' + timeLeft);
 timerInterval = setInterval(function() {
 timeLeft--;
 $timer.text('Time: ' + timeLeft);
 if (timeLeft <= 0) {
 clearInterval(timerInterval);
 endGame();
 }
 }, 1000);
 }
 function endGame() {
 alert('Time\'s up! Your final score is: ' + score);
 $('.target').remove();
 $bullet.hide();
 }
 function restartGame() {
 score = 0;
 $score.text('Score: ' + score);
 clearInterval(timerInterval);
 startTimer();
 $('.target').remove(); 
 createTarget();
 }
 $('#restart-btn').on('click', restartGame);
 $(document).on('click', shoot);
 restartGame();
});
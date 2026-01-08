const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("game-over");

let isJumping = false;
let gravity = 0.9;
let position = 0;
let score = 0;
let gameOver = false;

/* JUMP LOGIC */
function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  let count = 0;

  let upTimer = setInterval(() => {
    if (count === 15) {
      clearInterval(upTimer);
      let downTimer = setInterval(() => {
        if (count === 0) {
          clearInterval(downTimer);
          isJumping = false;
        }
        position -= 5;
        count--;
        position *= gravity;
        player.style.bottom = position + "px";
      }, 20);
    }
    position += 30;
    count++;
    position *= gravity;
    player.style.bottom = position + "px";
  }, 20);
}

/* OBSTACLE MOVEMENT */
let obstacleLeft = 800;

function moveObstacle() {
  if (gameOver) return;

  obstacleLeft -= 5;
  obstacle.style.left = obstacleLeft + "px";

  if (obstacleLeft < -30) {
    obstacleLeft = 800;
    score++;
    scoreEl.innerText = "Score: " + score;
  }

  // Collision detection
if (
  obstacleLeft > 50 &&
  obstacleLeft < 90 &&
  position < 45
) {
  endGame();
}

}

let obstacleTimer = setInterval(moveObstacle, 20);

/* GAME OVER */
function endGame() {
  clearInterval(obstacleTimer);
  gameOver = true;
  gameOverEl.style.display = "flex";
}

/* RESTART */
function restartGame() {
  position = 0;
  obstacleLeft = 800;
  score = 0;
  gameOver = false;
  scoreEl.innerText = "Score: 0";
  gameOverEl.style.display = "none";
  obstacleTimer = setInterval(moveObstacle, 20);
}

/* KEY EVENTS */
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (gameOver) {
      restartGame();
    } else {
      jump();
    }
  }
});

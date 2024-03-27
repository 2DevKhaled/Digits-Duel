"use strict";
// Selecting elements
let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
let diceEl = document.querySelector(".dice");
let btnRoll = document.querySelector(".btn--roll");
let btnNew = document.querySelector(".btn--new");
let btnHold = document.querySelector(".btn--hold");
let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");
let currentScore;
let scoers;
let activePlayer;
let playing;
function init() {
  currentScore = 0;
  scoers = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  document.querySelector(`#name--0`).textContent =
  "اللاعب الأول";
  document.querySelector(`#name--1`).textContent =
  "اللاعب الثاني";
}
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}
// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
init();
// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1- Generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2- Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `${dice}.png`;
    //3- Check for rolled 1: if true ,switch to the next player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scoers[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoers[activePlayer];
    // 2. Check if player's score is >=100
    if (scoers[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document.querySelector(`#name--${activePlayer}`).textContent =
        "You Win!!!";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      // switch the player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
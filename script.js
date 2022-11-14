'use strict';

// Selecting HTML elements.
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let diceEle = document.querySelector('.dice');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');

// Initial conditions.
score0El.textContent = 0;
score1El.textContent = 0;
diceEle.classList.add('hidden');
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playingState = true; // The game can be played only when playingState === true

// Function to switch the player.
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// When the player press ROLL DICE.
btnRoll.addEventListener('click', function () {
  if (playingState) {
    let dice = Math.trunc(Math.random() * 6) + 1; // This will produce a number between 1 and 6

    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// When the player press HOLD.
btnHold.addEventListener('click', function () {
  if (playingState) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceEle.classList.add('hidden');

      playingState = false;
    } else {
      switchPlayer();
    }
  }
});

// Function to make a new game [resetting the game].
function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEle.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

// When the player press NEW GAME.
btnNew.addEventListener('click', init);

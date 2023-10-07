'use strict';
// Selection elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scoreEl = document.querySelector('.score');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current = document.querySelector('.current');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, playing, activePlayer;

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;

  //Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  // scoreEl.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // current.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

// switch
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle remove it if it have it and when it not have not do any thing
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1 : if true , switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is >= 100;
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3.switch to the next player
      switchPlayer();
    }
  }
});

// new game
btnNew.addEventListener('click', init);

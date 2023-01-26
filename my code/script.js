'use strict';
//these two work the same (getElementById is faster in larger uses)
//El = element (selecting elements)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
//selecting buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions (outside function in order to use)
    let scores, currentScore, activePlayer, playing;

//function for start of game (initialization)
const init = function () {
    //Starting conditions (assign value)
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    //state variable with condition of the game (playing or not)
    playing = true;
    //set text for scores to zero
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    //remove winner class
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    //reset active player
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    //hide the dice
    diceEl.classList.add('hidden');
};

//call initialization code
init();

//function to switch players
const switchPlayer = function() {
    //reset current players current score to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //reset current score so next player starts at zero
    currentScore = 0;
    //Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //change backgrounds
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function() {
    //playing is already a boolean value
    if(playing) {
        //1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) +1;
            //console.log(dice);
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. Check for rolled 1 
        if(dice !== 1) {
            // Add dice to current score
            //currentScore = currentScore + dice;
            currentScore += dice;
            //build Id name dynamically
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

//Holding current score
btnHold.addEventListener('click', function() {
    if(playing) {
        //debugging
        //console.log('Hold button');
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        //debugging
        //console.log(scores[activePlayer]);
        //scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            //show black background for winner & not white background
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

//Start New Game (init function [do not call it])
btnNew.addEventListener('click', init);
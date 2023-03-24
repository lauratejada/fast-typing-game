'use strict';

import { Score } from './score.js';
import { wordsArray } from './array.js';

const btnPlay = document.querySelector('.button');
const gameSound = new Audio('./audio/game-sound.wav');
gameSound.type = 'audio/wav';

btnPlay.addEventListener('click', () => {
    gameSound.play();
    console.log('PLaying');
});


console.log(wordsArray);
// score is shown when the game ends
const newScore = new Score('2023-12-14', 3, 40);

console.log(newScore);


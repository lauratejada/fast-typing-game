'use strict';

import { Score } from './score.js';
import { wordsArray, randomArray } from './array.js';

const showSeconds = document.querySelector('.seconds');
const showPercentage = document.querySelector('.percentage');
const input = document.querySelector('.input');
const showWords = document.querySelector('span');
const btnPlay = document.querySelector('.button');
const gameSound = new Audio('./audio/game-sound.wav');
gameSound.type = 'audio/wav';
let sec = 9;
let hits;
let percentage;
const arrayCount = new Array();

// receive input, validate and add hits
function validateAndShow(words, hitsCounter) {
    //console.log(words);
    for(let i = 0; i < words.length; i++) {
        showWords.innerHTML = words[i];
        input.addEventListener('keydown', function(e){
            //console.log(e.keyCode);
            if(e.keyCode === 13) {
               // console.log('compare words');
                if(words[i] === input.value) {   
                    //console.log('are equal, show next word');
                    arrayCount.push(words.at(i));
                    hitsCounter++;
                    input.value = '';
                    showWords.innerHTML = words[hitsCounter];
                }
                //hits = hitsCounter;
                return;             
            } 
            return;
        }); 
    }     
}

// show words in game and timer
function startGame() {
    const newArray = randomArray();
    input.value = '';
    hits = 0;
    sec = 99; // 99 seconds
    let timer = setInterval(function(){
        if(sec > -1) {
            showSeconds.innerHTML = `${sec}`;
            sec = sec - 1; 
            gameSound.play();
            btnPlay.parentElement.style.display = 'none';
            input.parentElement.style.display = 'block';
            showPercentage.innerHTML = `0`;
        } else {
            gameSound.pause();
            input.parentElement.style.display = 'none';
            btnPlay.parentElement.style.display = 'block'; 
            clearInterval(timer);
            showScore(arrayCount);
            // score is shown when the game ends
            try {
                const newScore = new Score(new Date().toDateString(), hits, percentage);
                console.log(newScore);
            } catch(error) {
                console.log(error.message);
            }
        }
    }, 1000);
    validateAndShow(newArray, 0);
}

function showScore(arr) {
    hits = arr.length;
    showPercentage.innerHTML = `${percentageF(arr.length)}`;
}

function percentageF(hits){
    percentage = ((hits/wordsArray.length)*100).toFixed(0);
    return `${percentage}`;
}

// when click button start game
btnPlay.addEventListener('click', () => {
    startGame();
    console.log('PLaying');
});


'use strict';

import { Score } from './score.js';
import { wordsArray, randomArray } from './array.js';

const showSeconds = document.querySelector('.seconds');
const showPercentage = document.querySelector('.percentage');
const score = document.querySelector('.score');
const input = document.querySelector('.input');
const showWords = document.querySelector('span');
const btnPlay = document.querySelector('.button');
const highScores = document.querySelector('.scores');
const backOpen = document.querySelector('.background-opacity-nav-open');
const scoresContent = document.querySelector('.scores-content');
const gameSound = new Audio('./assets/audio/game-sound.wav');
gameSound.type = 'audio/wav';
let sec = 9;
let hits;
let percentage;
const arrayCount = new Array();

input.parentElement.style.display = 'none';
btnPlay.parentElement.style.display = 'block'; 
score.style.display = 'none';
highScores.classList.add('not-show');
backOpen.classList.add('not-show');

// receive input, validate and add hits
function validateAndShow(words, hitsCounter) {
   // console.log(words);
    hitsCounter = 0;
    //console.log(hitsCounter);
    arrayCount.splice(0, arrayCount.length); // delete previous elements
    //console.log(arrayCount);
    showWords.innerHTML = words[0];
    for(let i = 0; i < words.length; i++) {
        //console.log(words[i]);
        //showWords.innerHTML = words[i];
        input.addEventListener('input', letter => {
            //console.log(letter.data);
            if(letter.data === words[i].at(-1)) {
                if(words[i] === input.value) {  
                    console.log(words[i]); 
                    //console.log('are equal, show next word');
                    arrayCount.push(words.at(i));
                    input.value = '';
                    hitsCounter++;
                    console.log(hitsCounter);
                    if(arrayCount.length < words.length) {
                        showWords.innerHTML = words[arrayCount.length];
                    } else {
                        gameSound.pause();
                        input.parentElement.style.display = 'none';
                        btnPlay.parentElement.style.display = 'block'; 
                        showScore(arrayCount);
                        score.style.display = 'flex';
                    }
                }
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
    sec = 20; // 99 seconds
    let timer = setInterval(function(){
        if(sec > -1 && hits < newArray.length) {
            //console.log(hits);
            showSeconds.innerHTML = `${sec}`;
            sec = sec - 1; 
            gameSound.play();
            btnPlay.parentElement.style.display = 'none';
            input.parentElement.style.display = 'block';
            input.focus();
            showPercentage.innerHTML = `0`;
            score.style.display = 'none';
        } else {
            gameSound.pause();
            input.parentElement.style.display = 'none';
            btnPlay.parentElement.style.display = 'block'; 
            clearInterval(timer);
            showScore(arrayCount);
            score.style.display = 'flex';
            highScores.classList.remove('not-show');
            highScores.classList.add('show-scores');
            backOpen.classList.remove('not-show');
            
            // score is shown when the game ends
            try {
                      
                const scores = JSON.parse(localStorage.getItem('games')) || [];

                const addScoreToArray = (date, hits, perc) => {
                    scores.push({date, hits, perc});
                    //localStorage.setItem('games', JSON.stringify(scores));
                    return {date, hits, perc};
                };
                
                //const newScore = new Score(new Date().toDateString(), hits, percentage);
                const newScore = addScoreToArray(new Date().toDateString(), hits, percentage);
                console.log(newScore);   
                // sort array to display scores
                //so sort and ‘splice’ the array before ‘stringifying’ it
                //let sortedScores = 
                scores.sort(
                    //(s1, s2) => {s2.hits - s1.hits});
                    (s1, s2) => (s1.hits < s2.hits) ? 1 : (s1.hits > s2.hits) ? -1 : 0);
                //console.log(scores);
                //sortedScores.splice(8, sortedScores.length - 8);
                scores.splice(9, scores.length - 9);
                //console.log(scores);

                /*
                const showScoreDivs = ({date, hits, perc}, index) => {  
                    console.log(scores);
                    const getScore = document.createElement('div');
                    getScore.classList.add('get-score');
                    const divOrder = document.createElement('div');
                    const divHits = document.createElement('div');
                    const divPerc = document.createElement('div');
                    divOrder.innerText = '#' + `${index + 1}`;
                    divHits.innerText = ''+ `${hits}` + ' words' ;
                    divPerc.innerText = ''+ `${perc}` + '%' ;
                    getScore.append(divOrder, divHits, divPerc);
                    scoresContent.appendChild(getScore);
                }*/

                //scores.forEach(showScoreDivs);
                function showScoreDivs() {
                    for(let i = 0; i < scores.length; i++) {
                        //console.log(scores);
                        const getScore = document.createElement('div');
                        getScore.classList.add('get-score');
                        const divOrder = document.createElement('div');
                        const divHits = document.createElement('div');
                        const divPerc = document.createElement('div');
                        divOrder.innerText = '#' + `${i + 1}`;
                        divHits.innerText = ''+ `${scores[i].hits}` + ' words' ;
                        divPerc.innerText = ''+ `${scores[i].perc}` + '%' ;
                        getScore.append(divOrder, divHits, divPerc);
                        scoresContent.appendChild(getScore);
                    }
                }
                showScoreDivs();

                localStorage.setItem('games', JSON.stringify(scores));

               // console.log(scores);
               //console.log(sortedScores);

                //const newScore = addScoreToArray(new Date().toDateString(), hits, percentage);

               // showScoreDivs(newScore, scores.length - 1);
       
                
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

window.addEventListener('click', (event) => {
    if (event.target !== highScores) {
      highScores.classList.add('not-show');
      backOpen.classList.add('not-show');
    }
  });
  
document.addEventListener('keydown', function(e){
      if (e.code === "Escape") {
        highScores.classList.add('not-show');
        backOpen.classList.add('not-show');
      }
});
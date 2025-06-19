'use strict'

const numberBoard = document.querySelector('.number');
const againBtn = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const scoreBoard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highscore');
const messageBoard = document.querySelector('.message');
const generateSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
let secretNumber = generateSecretNumber()




scoreBoard.textContent = score;
highscoreBoard.textContent = highscore;
// numberBoard.textContent = secretNumber;
console.log('secret number', secretNumber);


function dispalyMessage(message) {
    messageBoard.textContent = message
}

checkBtn.addEventListener('click', () => {
    const guess = Number(guessInput.value)

    if (!guess) {
        dispalyMessage('⛔ No number!')
    } else if (guess === secretNumber) {
        dispalyMessage('🎉 Correct Number!')
        numberBoard.textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        if (score > highscore) {
            highscore = score;
            highscoreBoard.textContent = highscore;
        }
    } else {
        if (score > 1) {
            dispalyMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!')
            score--;
            scoreBoard.textContent = score;
        } else {
            dispalyMessage('💥 You lost the game!')
        }
    }

})


againBtn.addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    scoreBoard.textContent = score;
    numberBoard.textContent = '?';
    guessInput.value = "";
    document.querySelector('body').style.backgroundColor = '#222';
    dispalyMessage('Start guessing...');
    secretNumber = generateSecretNumber()
    console.log('secret number', secretNumber);

})
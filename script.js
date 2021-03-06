// pick random number

function randomNumber(min,max) {
    let rnumber = Math.floor(Math.random()*(max-min+1)) + min;
    return rnumber;
}

// declare variables
let time = 0 // time start from 0
let myTime; // timer will be assign to this variable
let  = 0;
let count = 0;
const maxTime = 30;
let history = [];
let score = [];
let finish = false;

// first start
let computerNumber = randomNumber(1,99);
console.log("Correct number is:", computerNumber);
let guessButton = document.getElementById("guessButton");
let remaining = document.getElementById("guesses-remaining");
remaining.innerHTML = 5;
let resultmessage = document.getElementById("result");
let failmessage = document.getElementById("fail");
let historymessage = document.getElementById("history");
let bestmessage = document.getElementById("bestscore");
document.getElementById('timecount').innerHTML = maxTime;
timecounting()// fire the timecounting function!!




function guess() {
    let repeat = false;
    let userNumber = document.getElementById("guessNumber").value;
    if (userNumber != "" && userNumber>0 && userNumber <=100){
        if (userNumber > computerNumber) {
        resultmessage.innerHTML = "Too high!";
        }
        
        else if (userNumber < computerNumber) {
            resultmessage.innerHTML = "Too low!";
        }
        else {
            resultmessage.innerHTML = `You are <span class="green">correct!</span>`;
            count += 1;
            win();
        }

        for (let i = 0; i < history.length; i++){
            if (history[i] == userNumber) {
                repeat = true;
                resultmessage.innerHTML += " But you have already entered this number before.";
            }
        }

        if (repeat == false) {
            historymessage.innerHTML += `<span class="history-number">${userNumber}<span>`;
            count += 1;
            history.push(userNumber);
            remaining.innerHTML -=1;
            if (count == 5 && finish == false) {fail();}
        }
    }
    else {alert("Please choose a valid number between 1 and 100.");}
    
}

function newgame() {
    guessButton.disabled = false;
    if (finish == false) {
        roundResult("wrong");
        displayScore("wrong");
    }
    count = 0;
    remaining.innerHTML = 5;
    failmessage.innerHTML = "";
    historymessage.innerHTML = "";
    resultmessage.innerHTML = "";
    computerNumber = randomNumber(1,99);
    console.log("Correct number is:", computerNumber);
    time = 0;
    history = [];
    clearInterval(myTime);
    timecounting();
    finish = false;
    document.getElementById('timecount').innerHTML = maxTime;   
}

function displayBest(){
    bestmessage.innerHTML = "";
    let scorecount = []; //number of guesses left
    for (let i = 0; i < score.length; i++) {
        if (score[i].Result == "correct") {
            scorecount[i] = 5 - score[i].Guesses;
        }
        else {scorecount[i] = -1;}
    }
    for (i = 0; i < score.length; i++) {
        if (scorecount[i] == Math.max(...scorecount)) {
            bestmessage.innerHTML += `<div class="best-card">
                                            <p>Number: <span class="scoretext">${score[i].Number}</span></p>
                                            <p>Result: <span class="green">correct</span></p>
                                            <p>Guesses: <span class="scoretext">${score[i].Guesses}</span></p>
                                            <p>Time taken   : <span class="scoretext">${score[i].Time}s</span></p>
                                        </div>`
        };
    }
}

function fail() {
    guessButton.disabled = true;
    finish = true;
    clearInterval(myTime);
    roundResult("wrong");
    displayScore("wrong");
    failmessage.innerHTML = `You <span class="red">failed</span>! The number was ${computerNumber}.`;
}

function win() {
    
    guessButton.disabled = true;
    finish = true;
    clearInterval(myTime);
    roundResult("correct");
    displayScore("correct");
    displayBest();
}

function displayScore(correct) {
    let coloredResult = "";
    if (correct == "correct"){
        coloredResult = "green"
    }
    else {coloredResult = "red"}

    document.getElementById("score").innerHTML += `
                                        <div class="result-card">
                                            <p>Number: <span class="scoretext">${computerNumber}</span></p>
                                            <p>Result: <span class="${coloredResult}">${correct}</span></p>
                                            <p>Guesses: <span class="scoretext">${count}</span></p>
                                            <p>Time taken   : <span class="scoretext">${time}s</span></p>
                                        </div>
    `
}

function roundResult(correct) {
    score.push ({
        Number: computerNumber,
        Result: correct,
        Guesses: count,
        Time: time
    })
}

function reset() {
    document.getElementById("score").innerHTML = "";
    bestmessage.innerHTML = "";
    newgame();
    score = [];
}


function timecounting() {
    myTime = setInterval(() => {
        time += 1;
        document.getElementById('timecount').innerHTML = maxTime - time;
        if (time == 30) {
            fail();
        }
    }, 1000)// every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
    
}

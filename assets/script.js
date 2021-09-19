//Array for all questions and answers
let questions = [{
    prompt: "Commonly used data types do NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
},
{
    prompt: "The condition in an if/else statement is enclosed with _______.",
    options: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses"
},
{
    prompt: "Arrays in JavaScript can be used to store ________.",
    options: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
    answer: "substr( )"
},
{
    prompt: "String Values must be enclosed within ______ when being assigned to variables.",
    options: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    answer: "Quotes"
},
{
    prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "Terminal/Bash", "for Loops", "console.log()"],
    answer: "console.log()"
}]

//Defining initial objects
let timeRemaining = 0;
let currentScore = 0;
let currentQuestion = -1;
var timer;
var startE1 = document.querySelector("#start");

//Function starts the game 
function start() {

    timeRemaining = 75;
    document.getElementById("timeRemaining")..innerHTML = timeRemaining;

    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;
        if (timeRmeaining <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    nextQuestion();
}

//function takes user to End Game screen when all questions are answered
function endGame() {
    clearInterval(timer);

    var quizContent = 
    <section id="score">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <h2>All done!</h2>
                        <p>Your final score is: <span id="currentScore" class="pl-1"> ' + currentScore + '</span></p>
                        <p>Enter initials: <span class="ml-1"><input placeholder="Initials" id="initials" /></span>
                            <button onclick="setHighscore()" id="submit-score" class="btn btn-outline-info mx-1 my-1 d-inline-block">Submit</button>
                        </p>
                    </div>
                </div>
    </section>;

    document.getElementById("quizBody").innerHTML = quizContent;
}


//Stores Highscores Locally
function setHighscore() {
    localStorage.setItem("highscore", currentScore);
    localStorage.setItem("highscoreInitials",  document.getElementById('initials').value);
    getScore();
}

//Retrieves Highscores
function getHighscore() {
    var quizContent =  `
    <section id="highscore">
        <div class="row">                  
            <div class="col-3"></div>
            <div class="col-6">
                    <h2>Highscores</h2>
                <h2>` + localStorage.getItem("highscoreInitials") + `</h2>
                <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
                <button onclick="resetGame()" class="btn btn-outline-info d-inline-block mx-1 my-1">Play Again</button>
                <button onclick="clearScores()" class="btn btn-outline-info mx-1 my-1 d-inline-block">Clear scores</button>
             </div>
        </div>
    </section>
    `;
    
    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears locally stores High
function clearScores() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreInitials",  "");

    resetGame();
}

//function resets the game
function resetGame() {
    clearInterval(timer);
    currentScore = 0;
    currentQuestion = -1;
    timeRemaining = 0;
    timer = null;

    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    var quizContent = 
    
    <section id="welcome">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <h1 class="d-flex justify-content-center text-center">Test Your Coding Knowledge</h1>
                <span></span>
                <h5 class="d-flex justify-content-center text-center">Your score will be calculated as the Time Remaining when you complete the quiz, less 10 pts for each missed question.</h5>
                <span></span>
                <h3 class="d-flex justify-content-center text-center good-luck">Good Luck!</h3>
                <span></span>
                <button onclick="start()" type="button" class="btn btn-outline-info mx-auto d-block good-luck">Start Quiz</button>
            </div>
        </div>
    </section>

    document.getElementById("quizBody").innerHTML = quizContent;
}

//correct answer, move to next question
function correct() {
    nextQuestion();
}

//incorrect answer, move to next question
function incorrect() {
    timeRemaining -= 10;
    nextQuestion();
}

//function runs through questions array
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].options.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].options[buttonLoop]);
        if (questions[currentQuestion].options[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}

//start event listener
startE1.addEventListener("click", function start())
//time
var timerEl = document.getElementById("time");
var time = 75000; //starting length 75 seconds
var wrongAnswerPenalty = 15000; // 15 seconds deducted if chosen incorrectly
var answerTimer;
var quizTimer;
var answerTimeOut = 0;

//questions
var questionCounter = 0;
var questionTitle = document.getElementById("question-title"); 
var questionChoices = document.getElementById("question-choices");

//Start and Finished
var startBtn = document.getElementById("start");
var finalScore = document.getElementById("final-score");

//screen elements
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var endScreenEl = document.getElementById("end-screen");

//result of answer (Correct/Wrong)
var resultScreenEl = document.getElementById("result-screen");
var resultText = document.getElementById("resultText");

//submition
var submitBtn = document.getElementById("submitBtn");
var score = document.getElementById("final-score");
var userInitialsInput = document.querySelector("#initials");

//Start (Btn on the bottom of this js file) this function starts the quiz by clicking the button and generating the questions to appear while also showing the timer beginning to count down.
function startQuiz() {
    updateTime(0); //sets initial time
    startScreenEl.setAttribute("class", "hide"); 
    questionsEl.removeAttribute("class");
    questionCounter = 0;
    getQuestions();    
    quizTimer = setInterval(updateTime, 1000);
}

//this function generates the question and clears the choice from before. It also has a for loop that shows all of the choices for the designated question.
function getQuestions() {
    questionTitle.innerHTML = questions[questionCounter].title;
    questionChoices.innerHTML = ""; // removes old choices
    
    // looping the question choices and converting them into buttons and li. 
    for (let i = 0; i < questions[questionCounter].choices.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        var choice = questions[questionCounter].choices[i];
        button.innerHTML = choice;
        button.value = choice;
        //on click function for the users choice.
        button.addEventListener("click", function() {
            answerClick(this.value);
        });
        li.appendChild(button);
        questionChoices.appendChild(li);
    };
}
//this function takes away the time if you get a question wrong and or moves onto the next question until you are out of questions, than it will send you to the end screen.
function answerClick(x) {
    var answer = questions[questionCounter].answer;
    showAnswer(x == answer);
    if (x !== answer) {
        time -= wrongAnswerPenalty;
        showTime();
    }
    questionCounter ++;
    if (questionCounter < questions.length) {
        getQuestions();
    }
    else {
        showEndScreen();
    }
}

//this function counts down the timer
function updateTime() {
    time -= 1000;
    showTime();  
}

//this function counts down the time and or sends you to the end screen if the user runs out of time.
function showTime() {
    if (time <= 0) {
        time = 0;
        clearInterval(quizTimer);
        showEndScreen();
    }
    //timer
    timerEl.innerHTML = Math.ceil(time/1000); 
}

//this function show you that you where right or wrong than disapears after 2 seconds.
function showAnswer(isCorrect) {
    if (isCorrect) {
        resultText.innerHTML = "Correct";
    }
    else {
        resultText.innerHTML = "Wrong";
    }
    resultScreenEl.removeAttribute("class");
    answerTimer = setTimeout(hideResultScreen, 2000);
}

//This screen tells you if you are right or wrong.
function hideResultScreen() {
    resultScreenEl.setAttribute("class", "hide");
}

//When you complete the quiz this function gets called and stops the timer which is your score
function showEndScreen() {
    hideResultScreen();
    clearInterval(quizTimer);
    questionsEl.setAttribute("class", "hide");
    endScreenEl.removeAttribute("class");
    finalScore.innerHTML = time/1000;
}

//Submiting score and saves it to a new variable called user which 
function saveScores() {
    var initials = userInitialsInput.value.trim();
    //Calls a new var "user" that will allow you to pass the dat through local storage
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        var user = {
            initials: initials,
            score: time/1000
        };
        highscores.push(user);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
    window.location.href = "highscore.html";
}

//btn priorities
submitBtn.onclick = saveScores;
startBtn.onclick = startQuiz;
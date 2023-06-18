// BUTTONS
var highScoresButton = document.getElementById('show-hi-scores');

var clearScoresButton = document.getElementById('clear-hi-scores');

var showHiScoresButton = document.querySelector('[data-action="show-hi-scores"]');

var submitButton = document.getElementById('submit-button');

var startQuizButton = document.getElementById('start-quiz-button');

var quizButtons = document.querySelectorAll('.multiple-choice button');





// CONTAINERS
var hiScoresContainer = document.querySelector('.hi-scores');

var startQuizContainer = document.querySelector('.start-quiz');

var quizContainer = document.querySelector('.quiz');

var hiScoresList = document.getElementById('hi-scores-list');

var rightWrong = document.querySelector('.right-wrong');



// CREATE LIST ELEMENT
var li = document.createElement('li');



// EVENT HANDLERS
startQuizButton.addEventListener('click', showQuizContainer);

submitButton.addEventListener('click', renderHiscores);

showHiScoresButton.addEventListener('click', showHiScores);

clearScoresButton.addEventListener('click', clearHighScores);








// LOCAL STORAGE FOR HIGHSCORES
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];



// QUESTIONS
var question1 = {
 question: 'Inside which HTML element do we put the JavaScript?',
 answers: {
    answer1:'<javascript>',
    answer2:'<js>',
    answer3:'<scripting>',
    answer4:'<script>'

 }
}

var question2 = {
    question: 'What does NaN mean in JavaScript?',
    answers: {
       answer1:'not a noun',
       answer2:'not available now',
       answer3:'not a number',
       answer4:'not allowed numbers'
   
    }
}

var question3 = {
    question: 'What is the correct way to write a word in JavaScript',
    answers: {
       answer1:'abigfatpig',
       answer2:'ABigFatPig',
       answer3:'abigFatpig',
       answer4:'a.big.fat.pig'
   
    }
}

var question4 = {
    question: 'How does a FOR loop start?',
    answers: {
       answer1:'for (i = 0; i <= 5)',
       answer2:'for i = 1 to 5',
       answer3:'for (i = 0; i <= 5; i++)',
       answer4:'for (i <= 5; i++)'
   
    }
}

var question5 = {
    question: 'How do you add comments in JavaScript',
    answers: {
       answer1:'**This is a comment**',
       answer2:'"This is a comment"',
       answer3:'// This is a comment',
       answer4:'<comment> This is a comment </comment>'
   
    }
}

var question6 = {
    question: 'Which of these assigns a constant?',
    answers: {
       answer1:'let x = 0',
       answer2:'var x = 0',
       answer3:'const x = 0',
       answer4:'for x = 0'
   
    }
}

var question7 = {
  question: 'What is the name of the logic that checks for true or false results?',
  answers: {
    answer1:'Boolean',
    answer2:'Variable',
    answer3:'Function',
    answer4:'Object'
  }
}

var question8 = {
  question: 'What is the value of the first index in an array?',
  answers: {
    answer1:'S',
    answer2:'null',
    answer3:'1',
    answer4:'0'
  }
}

var question9 = {
  question: 'What does CSS stand for?',
  answers: {
    answer1:'Cascading Style Sheet',
    answer2:'Code Style Sheet',
    answer3:'Code syntax scenario',
    answer4:'Cascading Sheet Snippet'
  }
}

var question10 = {
  question: 'What is the correct way to check if something isnt true?',
  answers: {
    answer1:'===',
    answer2:'=',
    answer3:'!=',
    answer4:'!!'
  }
}
// VARIABLES TO HOUSE ALL MY QUESTION OBJECTS AND CORRECT ANSWERS
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
var correctAnswers = ['3. const x = 0', '3. // This is a comment', '3. for (i = 0; i <= 5; i++)', '2. ABigFatPig', '3. not a number', '4. <script>', '1. Boolean', '3. !=', '1. Cascading Style Sheet', '4. 0'];


// TIMER SECTION
var time = 70;
var interval;


function timer() {
  
  var timerEl = document.querySelectorAll('.timer');
  
    for (var timerElement of timerEl) {
        timerElement.textContent = `Time: ${time}`;
    }
  time--;
    
    if(time < 0){
      clearInterval(interval);
      return;
    }
}

// FUNCTION FOR USER INITIAL INPUT
function renderHiscores () {
  var initialsInput = document.getElementById('initials-input');
  var initials = initialsInput.value.trim();
  if (initials === ""){
    return;
  }
  
  var remainingTime = time;
  
  var score = {
    initials: initials, 
    score: remainingTime + 1
  };
  li.textContent = `${score.initials}: ${score.score}`;
  
  
  hiScoresList.appendChild(li);
  initialsInput.value = '';
  
  
  highScores.push(score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  
  displayHighScores();
  
 

  
};

// FUNCTION FOR DISPLAY HIGHSCORES LIST

function displayHighScores(){
  
  hiScoresList.innerHTML = '';
  highScores.sort(function (a, b){
        return b.score - a.score;
      });

  
  if (highScores) {
    highScores.forEach(function (entry) {
      var li = document.createElement('li');
      li.textContent = `${entry.initials}: ${entry.score}`;
      hiScoresList.appendChild(li);
    });
  }
  

  
  
  
};

// FUNCTION FOR STARTING GAME

function showQuizContainer() {
    
    assignQuestions();
    choice();
    startQuizContainer.style.display = 'none'
    quizContainer.style.display = 'block';
    hiScoresContainer.style.display= 'none';
    clearInterval(interval);
    interval = setInterval(timer, 1000);
    
    time = 70;
    
    
        
    

    
};
  
// FUNCTION THAT SHOWS HIGHSCORES

function showHiScores() {
    
    startQuizContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    hiScoresContainer.style.display ='block';
    clearInterval(interval);
    interval = setInterval(timer, 1000);

    var remainingTime = time;
    var finalScoreInput = document.getElementById('final-score-input');
    finalScoreInput.textContent = `Your final score is ${remainingTime + 1}`;
    
    displayHighScores();
}

// FUNCTION TO CLEAR HIGH SCORES LIST

function clearHighScores(){
  highScores = [];
  localStorage.removeItem('highScores');
  displayHighScores();
}
  
  

// FUNCTION FOR QUESTION LOGIC AND ANSWER BUTTONS

function assignQuestions() {
    var questionIndex = Math.floor(Math.random() * questions.length);
    var question = questions[questionIndex];

    if (questions.length === 0) {
        
        showHiScores();
        clearInterval(interval);
        return;
    }
    time--;
    questions.splice(questionIndex, 1);
  
    
    var questionElement = document.querySelector('.quiz h1');
    questionElement.textContent = question.question;
  
    
    var answerButtons = document.querySelectorAll('.multiple-choice button');
    var answerKeys = Object.keys(question.answers);
  
    for (var i = 0; i < answerButtons.length; i++) {
      var answerButton = answerButtons[i];
      answerButton.textContent = [i + 1] + '. ' + question.answers[answerKeys[i]];
    }

    

  }

// FUNCTION FOR USER CHOICE, DISPLAYS NEXT QUESTION AND IF THEY GOT IT RIGHT OR WRONG
function choice() {
  var answerButtons = quizButtons;
  

  
  answerButtons.forEach(function(button) {
    button.addEventListener('click', function() {
          var clickedAnswer = this.textContent;
            
          if (correctAnswers.includes(clickedAnswer)) {
                  rightWrong.style.display = 'block';
                  rightWrong.textContent= 'Correct!';
                  
                  
          } else {
                  rightWrong.style.display = 'block';
                  rightWrong.textContent= 'Incorrect!';
                  time -= 10;
                  
          }

        assignQuestions();

        if (questions.length === 0) {
              
              showHiScores();
              clearInterval(interval);
             
              
        }
    });  
  });
};




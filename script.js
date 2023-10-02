let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question:
      "Welches Event wird ausgelöst, wenn ein HTML-Formular abgeschickt wird?",
    answer_1: "onsubmit",
    answer_2: "onclick",
    answer_3: "onchange",
    answer_4: "onformsubmit",
    right_answer: 1,
  },
  {
    question: "Was bedeutet das HTML Tag < a >?",
    answer_1: "Text Fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question:
      "Welche CSS-Eigenschaft wird verwendet, um den inneren Abstand eines Elements zu setzen?",
    answer_1: "padding",
    answer_2: "margin",
    answer_3: "border",
    answer_4: "spacing",
    right_answer: 1,
  },
  {
    question: "Wie definiert man in Javascript eine Variable?",
    answer_1: "let 100 - rate;",
    answer_2: "100 - let rate;",
    answer_3: "rate - 100;",
    answer_4: "let rate = 100;",
    right_answer: 4,
  },
  {
    question: "Was ist das Ergebnis von 5 + '5' in JavaScript?",
    answer_1: "'55'",
    answer_2: "10",
    answer_3: "NaN",
    answer_4: "'5'5'",
    right_answer: 1,
  },
  {
    question: "Was bewirkt die JavaScript-Methode 'splice()'?",
    answer_1: "Es fügt ein Element an den Anfang eines Arrays hinzu.",
    answer_2: "Es entfernt Elemente aus einem Array und gibt sie zurück.",
    answer_3: "Es sortiert die Elemente in einem Array in aufsteigender Reihenfolge.",
    answer_4: "Es kopiert alle Elemente aus einem Array in ein neues Array.",
    right_answer: 2,
  },
  {
    question: "Welche Funktion wird verwendet, um einen Wert in eine ganze Zahl in JavaScript umzuwandeln?",
    answer_1: "parseInt()",
    answer_2: "toFloat()",
    answer_3: "toInteger()",
    answer_4: "parseInteger()",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let rightQuestions = 0;
let answerSelected = false;
let AUDIO_SUCCESS = new Audio('audio/audio-success.mp3');
let AUDIO_WRONG = new Audio('audio/audio-wrong.mp3');


function init() {
  document.getElementById("all-questions").innerHTML = questions.length;
  updateProgressBar();
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function updateProgressBar() {
  let percent = currentQuestion / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style = `width: ${percent}%`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];  
}

function showEndScreen() {
    document.getElementById("endScreen").style = "";
    document.getElementById("questionBody").style = "display: none";

    document.getElementById("amount-of-questions").innerHTML = questions.length;
    document.getElementById("amount-of-right-questions").innerHTML = rightQuestions;
    document.getElementById("header-image").src = "./img/trophy.png";
  document.getElementById("header-image").className = "endscreen-img";
  updateProgressBar();
}

function answer(selection) {
  if (answerSelected) {
    return;    
  }
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    AUDIO_WRONG.play();
  }
  document.getElementById("next-button").disabled = false;
  answerSelected = true;
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  answerSelected = false;
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("header-image").src = "./img/question-mark.jpg";
  document.getElementById("questionBody").style = "";
  document.getElementById("endScreen").style = "display: none";
  document.getElementById("header-image").className = "card-img-top";

  currentQuestion = 0;
  rightQuestions = 0;
  init();
}

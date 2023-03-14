const operationWindow = document.getElementById("operationWindow");
const gameWindow = document.getElementById("gameWindow");
const finalScoreWindow = document.getElementById("finalScoreWindow");

const selectValue = document.getElementById('operationElem');
let valueInputElem = document.getElementById("valueInput");
const showChoices1 = document.getElementById('chosenOperation1');
const showChoices2 = document.getElementById('chosenOperation2');

const numberButtons = document.querySelectorAll('.numBtn');
const currentExpressionElem = document.getElementById("currentExpressionElem");
const currentScoreElem = document.getElementById("currentScoreElem");
const timeLeftElem = document.getElementById("timeLeftElem");
const finalUserScore = document.getElementById('finalUserScore');


let userScore = 0;
let trueAnswer = 0;
let symbol = '';
let timeLeft = 30;

function handleSelect() {

  valueInputElem.value = '';

  if (gameWindow.style.display === "none") {
    gameWindow.style.display = "block";
    operationWindow.style.display = "none";
  } else if (gameWindow.style.display === "block") {
    operationWindow.style.display = "none";
    finalScoreWindow.style.display = "block";
    gameWindow.style.display = 'none';
    finalUserScore.innerHTML = `Your final score is: ${userScore}`;
  } else {
    finalScoreWindow.style.display = "none";
    gameWindow.style.display = "none";
    operationWindow.style.display = "block";
  }

  chosenOperation(selectValue.value);
};

function chosenOperation(operation) {

  for (let btn of numberButtons) {
    btn.addEventListener('click', function (e) {
      valueInputElem.value += Number(e.target.innerHTML);
      valueInputElem.focus();

    });
  }

  gameWindow.style.display = "block";
  operationWindow.style.display = "none";

  if (operation == 'addition') {
    symbol = ' + ';
    showChoices1.textContent = operation;
    showChoices2.textContent = operation;
  } else if (operation == 'subtraction') {
    showChoices1.textContent = operation;
    showChoices2.textContent = operation;
    symbol = ' - ';
  } else if (operation == 'multiplication') {
    symbol = ' * ';
    showChoices1.textContent = operation;
    showChoices2.textContent = operation;
  } else if (operation == 'division') {
    symbol = ' / ';
    showChoices1.textContent = operation;
    showChoices2.textContent = operation;
  }

  display();

  function runInterval() {

    let timerInterval = setInterval(() => {
      timeLeft -= 1;
      timeLeftElem.innerHTML = timeLeft;

      if (timeLeft == 0) {
        clearInterval(timerInterval);
        handleSelect();
        gameWindow.style.display = 'none';
      };
    }, 1000);
  };

  runInterval();

  function randomNum() {
    return Math.ceil(Math.random() * 10);
  }

  function display() {

    currentScoreElem.innerHTML = userScore;

    let num1 = randomNum();
    let num2 = randomNum();

    let expression = num1 + symbol + num2;
    currentExpressionElem.innerHTML = expression;
    trueAnswer = eval(num1 + symbol + num2);
    console.log(trueAnswer);

    valueInputElem.addEventListener('change', validation);
  }

  function validation() {
    let currentUserInput = valueInputElem.value;
    if (currentUserInput == trueAnswer) {
      valueInputElem.value = '';
      userScore++;
      console.log(userScore);
      display();
    }
  }
}

window.addEventListener('load', function () {
  document
    .getElementById('goBtn')
    .addEventListener('click', handleSelect);
  document
    .getElementById('playAgain')
    .addEventListener('click', handleSelect);
  document
    .getElementById('span2btn')
    .addEventListener('click', function () {
    });
  document
    .getElementById('goBtn')
    .addEventListener('click', function () {
      valueInputElem.focus();
    });
});


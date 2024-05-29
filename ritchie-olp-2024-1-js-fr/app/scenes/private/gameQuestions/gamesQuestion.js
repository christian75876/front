import styles from './gameStyles.css'

export function gameQuestions(){
  const pageContent = `
  <div class="${styles.father}">
  <div class="${styles.contenedor}">
    <div id="question" class="${styles.title}"></div>
    <div id="options" class="${styles.options}"></div>
    <div id="result"></div>
    <button id="nextButton" style="display: none;">Siguiente</button>
  </div>
  </div>
`;

    
    const logic = () => {
      const questions = [
        {
          question: "What is the purpose of the <head> tag in HTML?",
          options: ["To define the main content of the document", "To define the header section of the document", "To provide metadata about the document", "To create a hyperlink"],
          answer: "To provide metadata about the document"
        },
        {
          question: "Which CSS property is used to change the color of text?",
          options: ["color", "text-color", "font-color", "text-style"],
          answer: "color"
        },
        {
          question: "What is the correct syntax for referring to an external JavaScript file?",
          options: ["<script src='script.js'>", "<javascript>script.js</javascript>", "<link rel='javascript' href='script.js'>", "<js>script.js</js>"],
          answer: "<script src='script.js'>"
        },
        {
          question: "What is the purpose of the CSS property 'float'?",
          options: ["To move an element to the right or left of its container", "To make text bold", "To change the font size", "To add spacing between lines of text"],
          answer: "To move an element to the right or left of its container"
        },
        {
          question: "What is the correct way to comment in JavaScript?",
          options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
          answer: "// This is a comment"
        },
        {
          question: "Which HTML tag is used to define an unordered list?",
          options: ["<ul>", "<ol>", "<list>", "<li>"],
          answer: "<ul>"
        },
        {
          question: "What does CSS stand for?",
          options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style Sheets", "Colorful Style System"],
          answer: "Cascading Style Sheets"
        },
        {
          question: "In JavaScript, what is a function?",
          options: ["A block of code that performs a specific task", "A variable that stores data", "An HTML element", "A type of loop"],
          answer: "A block of code that performs a specific task"
        },
        {
          question: "Which HTML attribute is used to specify an alternate text for an image, if the image cannot be displayed?",
          options: ["alt", "title", "src", "href"],
          answer: "alt"
        },
        {
          question: "What is the purpose of the JavaScript 'querySelector' method?",
          options: ["To select the first element that matches a specified CSS selector", "To create a new HTML element", "To apply styles to an element", "To add event listeners to elements"],
          answer: "To select the first element that matches a specified CSS selector"
        }
      ];
      let currentQuestion = 0;
      let score = 0;

      const questionElement = document.getElementById('question');
      const optionsElement = document.getElementById('options');
      const resultElement = document.getElementById('result');
      const nextButton = document.getElementById('nextButton');

      function displayQuestion() {
        const currentQ = questions[currentQuestion];
        questionElement.textContent = currentQ.question;

        optionsElement.innerHTML = '';
        currentQ.options.forEach(option => {
          const button = document.createElement('button');
          button.classList.add('btnOpcion');
          button.textContent = option;
          button.style.cursor = "pointer";
          button.addEventListener('click', () => checkAnswer(option));
          optionsElement.appendChild(button);
        });

      }

      function checkAnswer(option) {
        const currentQ = questions[currentQuestion];
        if (option === currentQ.answer) {
          resultElement.textContent = "Correct!";
          score++;
        } else {
          resultElement.textContent = "Incorrect!";
        }
        nextButton.style.display = 'block';
        nextButton.style.background = 'green'
        nextButton.style.color = "white"
        optionsElement.querySelectorAll('button').forEach(btn => btn.disabled = true );
      }

      function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          displayQuestion();
          resultElement.textContent = '';
          nextButton.style.display = 'none';
          optionsElement.querySelectorAll('button').forEach(btn => btn.disabled = false);
        } else {
          endGame();
        }
      }

      function endGame() {
        const percentage = (score / questions.length) * 100;
        let message = "";
        if (percentage >= 80) {
          message = "Congratulations! You answered most of the questions correctly!";
        } else if (percentage >= 60 && percentage < 80) {
          message = "You did well, but there's room for improvement!";
        } else {
          message = "You need more practice, my friend. Keep studying!";
        }
        questionElement.innerHTML = `
        <p>You answered ${score} out of ${questions.length} questions correctly! ${message}</p>
        <button id="restartButton">Restart</button>
    `;
        optionsElement.innerHTML = '';
        resultElement.textContent = '';
        nextButton.style.display = 'none';

        const restartButton = document.getElementById('restartButton');
        restartButton.addEventListener('click', restartGame);
      }

      function restartGame() {
        currentQuestion = 0;
        score = 0;
        displayQuestion();
      }


      displayQuestion();
      nextButton.addEventListener('click', nextQuestion);
        
    }
    return{
      pageContent,
      logic
    }
}
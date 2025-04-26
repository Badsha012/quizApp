const quizData = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which language is used for web development?", options: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
    // Add more questions as needed
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById('time').textContent = timeLeft;
    startTimer();
    const currentQuiz = quizData[currentQuestion];
    document.getElementById('ques').textContent = currentQuiz.question;
    const optionsEl = document.getElementById('opt');
    optionsEl.innerHTML = '';
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('ques').style.display = 'none';
    document.getElementById('opt').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = score;
    document.querySelector('.restart-btn').style.display = 'block';
}

document.querySelector('.restart-btn').onclick = () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').style.display = 'none';
    document.querySelector('.restart-btn').style.display = 'none';
    loadQuestion();
};

loadQuestion();
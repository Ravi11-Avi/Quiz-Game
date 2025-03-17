let questions = [
    {
        "question": "What is the capital of France?",
        "answers": ["Paris", "London", "Berlin", "Madrid"],
        "correctAnswer": 0
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": ["Earth", "Mars", "Jupiter", "Saturn"],
        "correctAnswer": 1
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "answers": ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        "correctAnswer": 0
    },
    {
        "question": "What is the largest mammal in the world?",
        "answers": ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        "correctAnswer": 1
    },
    {
        "question": "Which element has the chemical symbol 'O'?",
        "answers": ["Oxygen", "Osmium", "Ozone", "Olivine"],
        "correctAnswer": 0
    },
    {
        "question": "What is the fastest land animal?",
        "answers": ["Cheetah", "Lion", "Horse", "Elephant"],
        "correctAnswer": 0
    },
    {
        "question": "In what year did World War II end?",
        "answers": ["1941", "1945", "1939", "1918"],
        "correctAnswer": 1
    },
    {
        "question": "What is the smallest country in the world?",
        "answers": ["Monaco", "Vatican City", "Nauru", "San Marino"],
        "correctAnswer": 1
    },
    {
        "question": "Which gas do plants absorb from the atmosphere?",
        "answers": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        "correctAnswer": 1
    },
    {
        "question": "Which is the longest river in the world?",
        "answers": ["Amazon", "Nile", "Yangtze", "Mississippi"],
        "correctAnswer": 1
    }
];

let currentQuestion = 0;
let correctAnswers = [];
let incorrectAnswers = [];
let correctCount = 0;
let incorrectCount = 0;
let userAnswers = [];
let progress = 10;
let progress2 = 0;

let progressBar = document.getElementById("progressBar");
let progressBar2 = document.getElementById("progressBar2");
let MovePrev = document.getElementById("movePrev");
let MoveNext = document.getElementById("moveNext");
let submitButton = document.getElementById("submit");

const LoadQuestion = () => {
    const QuestionContainer = document.getElementById("question-container");
    const AnswerContainer = document.getElementById("answer-container");

    QuestionContainer.innerHTML = `<h2>${questions[currentQuestion].question} </h2>`;

    AnswerContainer.innerHTML = "";
    questions[currentQuestion].answers.forEach((answers, index) => {
        const button = document.createElement('button');
        button.innerHTML = ` ${index + 1}.  ${answers}`;

 
        if (userAnswers[currentQuestion] === index) {
            button.style.backgroundColor = "lightgreen";
        }

        button.onclick = () => {
            userAnswers[currentQuestion] = index;

            const allButtons = AnswerContainer.querySelectorAll("button");
            allButtons.forEach((btn) => {
                btn.style.backgroundColor = "";
            });
            button.style.backgroundColor = "lightgreen";
        };

        AnswerContainer.appendChild(button);
    });

    window.scrollTo({
        top: QuestionContainer.offsetTop,
        behavior: "smooth"
    });

    MovePrev.disabled = currentQuestion === 0;
    MoveNext.disabled = currentQuestion === questions.length - 1;

    document.getElementById("submit").disabled = currentQuestion !== questions.length - 1;
};

const checkAnswer = () => {
    if (userAnswers[currentQuestion] !== undefined) {
        if (userAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
            correctAnswers.push(questions[currentQuestion]);
         
        } else {
            incorrectAnswers.push(questions[currentQuestion]);
            
        }  
        
            correctCount = correctAnswers.length;
            incorrectCount = incorrectAnswers.length;
            console.log(`Correct Answers: ${correctCount} ${correctAnswers}`);
            console.log(`Incorrect Answers: ${incorrectCount} ${incorrectAnswers}`);
    };
}


const questionChoose = (direction) => {
    checkAnswer();

    if (direction === 1 && currentQuestion < questions.length - 1) {
        currentQuestion++;
    } else if (direction === 0 && currentQuestion > 0) {
        currentQuestion--;
    }
    console.log(currentQuestion);
    LoadQuestion();
};

MoveNext.addEventListener("click", () => {
    if (progress < 100) {
        progress += 10;
       
        progressBar.value = progress;
    }
});

MovePrev.addEventListener("click", () => {
    if (progress > 0) {
       
        progress -= 10;
        progressBar.value = progress;
    }
});

const submitQuiz = () => {
    document.getElementById("correctCount").innerText = correctCount;
    document.getElementById("incorrectCount").innerText = incorrectCount;
    document.getElementById("dashboard-section").style.display = "block";
    progressBar2.value = correctCount
    window.scrollTo({
        top: document.getElementById("dashboard-section").offsetTop,
        behavior: "smooth"
    });
};

const ViewReview = () => {
    document.getElementById("review-section").style.display = "block";
    window.scrollTo({
        top: document.getElementById("review-section").offsetTop,
        behavior: "smooth"
    });

    const correctList = document.getElementById("correct-list");
    correctList.innerHTML = "";

    correctAnswers.forEach(answer => {
        const li = document.createElement("li");
        const correctAnswerText = answer.answers[answer.correctAnswer];
        li.textContent = `Question: ${answer.question} | Correct Answer: ${correctAnswerText}`;
        correctList.appendChild(li);
    });

    const incorrectList = document.getElementById("incorrect-list");
    incorrectList.innerHTML = "";
    incorrectAnswers.forEach(answer => {
        const li = document.createElement("li");
        const correctAnswerText = answer.answers[answer.correctAnswer];
        li.textContent = `Question: ${answer.question} | Correct Answer: ${correctAnswerText}`;
        incorrectList.appendChild(li);
    });
};

const restartQuiz = () => {
    currentQuestion = 0;
    correctAnswers = [];
    incorrectAnswers = [];
    correctCount = 0;
    incorrectCount = 0;
    userAnswers = [];
    progress = 10;
    progressBar.value = progress;

    document.getElementById("correctCount").innerText = correctCount;
    document.getElementById("incorrectCount").innerText = incorrectCount;

    document.getElementById("review-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "none";

    LoadQuestion();
};

window.onload = () => {
    LoadQuestion();
};

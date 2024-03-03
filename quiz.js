console.log("Hello");
const questions = [
    {
        question : "What is the capital city of France?",
        answers : [
                {text: "Paris", correct: true},
                {text: "Canada", correct: false},
                {text: "Russia", correct: false},
                {text: "Korea", correct: false},
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers : [
                {text: "Sun", correct: false},
                {text: "Saturn", correct: false},
                {text: "Mars", correct: true},
                {text: "Jupiter", correct: false},
        ] 
    },
    {
        question : "How many continents are there on Earth?",
        answers : [
                {text: "9", correct: false},
                {text: "8", correct: false},
                {text: "7", correct: true},
                {text: "5", correct: false},
        ] 
    },
    {
        question : "What is the largest ocean on Earth?",
        answers : [
                {text: "Atlantic Ocean", correct: false},
                {text: "Pacific Ocean", correct: true},
                {text: "Arctic Ocean", correct: false},
                {text: "Southern Ocean", correct: false},
        ] 
    },
    {
        question : "What is the chemical symbol for gold?",
        answers : [
                {text: "H2O", correct: false},
                {text: "Au", correct: true},
                {text: "Ti", correct: false},
                {text: "Zr", correct: false},
        ] 
    },
    {
        question : "Which river is the longest in the world?",
        answers : [
                {text: "Nile River", correct: true},
                {text: "Amazon", correct: false},
                {text: "Danube", correct: false},
                {text: "Ganges", correct: false},
        ] 
    },
]

const ques = document.getElementById("question");
const ans = document.getElementById("ansbtns");
const next = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuesIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();
    let currentQues = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    ques.innerHTML = questionNo + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}

// to remove previous answer buttons
const resetState = () => {
    next.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ans.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next.style.display = "block";
}

const showScore = () => {
    resetState();
    ques.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = "Play Again";
    next.style.display = "block";
}


const handleNextBtn = () => {
    currentQuesIndex++;
    if(currentQuesIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

next.addEventListener("click", () => {
    if(currentQuesIndex < questions.length){
        handleNextBtn();
    } else{
        startQuiz();
    }
})


startQuiz();
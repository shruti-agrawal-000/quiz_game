const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-button')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestions()
  })

let shuffledQuestions, currentQuestionIndex

function startGame() {
    console.log("startted");
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestions()
}

function setNextQuestions() {
    resetState()
    showQuestions(shuffledQuestions[currentQuestionIndex]);
}

function showQuestions(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswers)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswers(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
      } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
      }

}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'what is 2+2 ?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'what is 2*6 ?',
        answers: [
            { text: '12', correct: true },
            { text: '22', correct: false },
            { text: '13', correct: false },
            { text: '18', correct: false }
        ]
    },
    {
        question: 'what is 8*0 ?',
        answers: [
            { text: '4', correct: false },
            { text: '0', correct: true },
            { text: '1', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'what is 1+2+3+4+5 ?',
        answers: [
            { text: '15', correct: true },
            { text: '22', correct: false },
            { text: '20', correct: false },
            { text: '18', correct: false }
        ]
    },
    {
        question: 'what is 3^3 ?',
        answers: [
            { text: '9', correct: true },
            { text: '22', correct: false },
            { text: '14', correct: false },
            { text: '0', correct: false }
        
        ]
    },
    {
        question: 'what is 2+2 ?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }

]
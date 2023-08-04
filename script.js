import demitQuestion from './demitQuestionBank.js'
import deculQuestion from './deculQuestionBank.js'
let questionData;

const questionShow = document.getElementById("question")
const answerButton = document.getElementById("answerPreBtn")
const submitButton = document.getElementById("submitButton")

let score = 0
let currentQuestionIndex = 0

function startQuiz(){
    score = 0
    currentQuestionIndex = 0

    showQuestionDemit()
}

function showQuestionDemit(){

    removePreviousQuestion()

    let currentQuestion = questionData.demit[currentQuestionIndex]
    questionShow.innerHTML = currentQuestion.question
    
    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButton.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)

    })
}

function removePreviousQuestion(){
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add('correctBtn')
        score ++
    }else{
        selectedBtn.classList.add('incorrectBtn')
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correctBtn')
        }
        button.disabled = true
        submitButton.style.display = "block"
    })
}

function showScore(){
    removePreviousQuestion()
    questionShow.innerHTML = `Kamu benar ${score} dan salah ${questionData.demit.length - score}`
    submitButton.style.marginTopv= "50px"
    submitButton.innerHTML = "Main Lagi"
}


function nextQuestion(){
    currentQuestionIndex++
    if(currentQuestionIndex < questionData.demit.length){
        showQuestionDemit()
    }else{
        showScore()
    }
}

submitButton.addEventListener('click', () =>{
    if(currentQuestionIndex <  questionData.demit.length){
        nextQuestion()
    }else{
        location.reload()
    }
})

function preTest(){

    answerButton.addEventListener('click', (e) =>{
        if(e.target.id == "decul"){
            questionData = deculQuestion
            startQuiz()
        }else if(e.target.id == "demit"){
            questionData = demitQuestion
            startQuiz()
        }
        console.log("HALLO")
        answerButton.id = "answerBtn"
    })

}

preTest()
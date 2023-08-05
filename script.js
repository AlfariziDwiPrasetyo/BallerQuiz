import demitQuestion from './demitQuestionBank.js'
import deculQuestion from './deculQuestionBank.js'
import munchenQuestion from './muncenQuestionBank.js';

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
    if(answerButton.style.display  == "block"){
        answerButton.style.display = "none"
        console.log(answerButton.style.display)
    }
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
    })
    submitButton.style.display = "block"
}

function showScore(){
    removePreviousQuestion()
    const container = document.getElementById("container")

    questionShow.innerHTML = `Kamu benar ${score} dan salah ${questionData.demit.length - score}`
    const skor = document.createElement('p')
    skor.innerHTML = `${Math.round((score * 100) / questionData.demit.length)} / 100`
    skor.classList.add('skor')
    answerButton.appendChild(skor)

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
        } else if(e.target.id == "emyu"){
            removePreviousQuestion()
            questionShow.style.marginBottom = "200px"
            questionShow.innerHTML = "Belum jadi wak, kapan kapan lah ya lgi males buat nya wak 😅"
            submitButton.addEventListener('click', () =>{
                location.reload()
            })
            submitButton.innerHTML = "Balik"
            submitButton.style.display = "block"
        } else if(e.target.id == "munchen"){
            questionData = munchenQuestion
            startQuiz()
        }
    })

}

preTest()
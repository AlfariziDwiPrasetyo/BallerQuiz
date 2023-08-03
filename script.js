const questionData = {
    demit:[
        {
        question:"Berapa banyak UCL Real Vardid ?",
        answer:[
            {text:"0", correct:false},
            {text:"15", correct:false},
            {text:"10", correct:false},
            {text:"14", correct:true}
        ]},
        {
        question:"Siapa top scorer of all time di Real Mardid ?",
        answer:[
            {text:"CRISTIAANOOO SIUUUUU", correct:true},
            {text:"Raul Gonzalez", correct:false},
            {text:"Ferenc Puskas", correct:false},
            {text:"Wak Haji Benzema", correct:false}
        ]},
        {
        question:"Siapa pemain yang paling banyak tampil di Real Madrid ? ",
        answer:[
            {text:"Bang SIUUUUU CR7", correct:false},
            {text:"Raul Gonzalez", correct:false},
            {text:"Sergio Ramoz", correct:true},
            {text:"Alfredo de stefano", correct:false}
        ]},
        {
            question:"Siapa kiper terbaik real madrid pada tahun 1990 - 2000 an ? ",
            answer:[
                {text:"Fransisco Buyo", correct:false},
                {text:"Iker Casillas", correct:true},
                {text:"King David De Gea", correct:false},
                {text:"Diego Lopez", correct:false}
            ]},
            {
                question:"Berapa piala UCL yang dimenangkan Real Marid saat dilatih oleh Jose Mourinho",
                answer:[
                    {text:"1", correct:false},
                    {text:"3", correct:false},
                    {text:"0", correct:true},
                    {text:"2", correct:false}
                ]},
            {
                question:"Siapa Player legend yang dijuluki 'The Blonde Arrow' ?",
                answer:[
                    {text:"Ferenc Puskas", correct:true},
                    {text:"THE GOAT CRISTIAAAANOOO", correct:false},
                    {text:"Emilio Butragueno", correct:false},
                    {text:"Hugo Sanchez", correct:false}
                ]},
            {
                question:"Dimana Santiago Bernabau berada ? ",
                answer:[
                    {text:"Getage", correct:false},
                    {text:"Cirebon ngalor titik", correct:false},
                    {text:"Alcoron", correct:false},
                    {text:"Chamartin", correct:true}
                ]},
            {
                question:"Siapa yang mencetak gol kemenangan untuk real madrid saat final liga champion lawan bayern laverkusen ",
                answer:[
                    {text:"David Beckham", correct:false},
                    {text:"Zinedine Zidane", correct:true},
                    {text:"Roberto Carlos", correct:false},
                    {text:"Alfarizi Dwi Prasetyo", correct:false}
                ]},
            {
                question:"Tim mana saja yang dikalahkan Real Madrid saat Final UCL thn 2016,2017,2018 secara berurutan ?",
                answer:[
                    {text:"King Emyu, King Emyu, King Emyu", correct:false},
                    {text:"Atletico Madrid, Juventus, Liverpool", correct:false},
                    {text:"Liverpool, Juventus, Atletico Madrid", correct:true},
                    {text:"Juventus, Liverpool, Atletico Madrid", correct:false}
                ]},
            {
                question:"Siapa yang mengalahkan Real Madrid saat International Champions Cup 2018",
                answer:[
                    {text:"King Emyu", correct:true},
                    {text:"Barkelona", correct:false},
                    {text:"Liverpool", correct:false},
                    {text:"Bayern Munchen", correct:false}
                ]},
            {
                question:"Dibawah ini yang bukan pemain real madrid musim 2017/2018 adalah",
                answer:[
                    {text:"Kiko Casilla", correct:true},
                    {text:"Lucas Vasquez", correct:false},
                    {text:"Dani Ceballos", correct:false},
                    {text:"Lucas Torro", correct:true}
                ]},
        
    ]
}

const questionShow = document.getElementById("question")
const answerButton = document.getElementById("answerBtn")
const submitButton = document.getElementById("submitButton")

console.log(questionData.demit.length)

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
        startQuiz()
    }
})

startQuiz()
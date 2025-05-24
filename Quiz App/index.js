const quizData = [
    {
        "question": "What is the capital of France?",
        "a": "Berlin",
        "b": "Madrid",
        "c": "Paris",
        "d": "Rome",
        "correctAnswer": "c",
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "a": "Earth",
        "b": "Mars",
        "c": "Jupiter",
        "d": "Saturn",
        "correctAnswer": "b",
    },
    {
        "question": "Who wrote the play 'Hamlet'?",
        "a": "Leo Tolstoy",
        "b": "Mark Twain",
        "c": "William Shakespeare",
        "d": "Charles Dickens",
        "correctAnswer": "c",
    },


];



let questions = document.querySelector(".que h1");
let options = document.querySelectorAll("input.options");
let btn = document.querySelector('.btn');
let index = 0;
let right = 0;
let wrong = 0;
let timeLeft = 60;
let total = quizData.length;

function loadQuestions() {
    let current = quizData[index]
    if (index == total) {
        return completeQuiz()
    }
    reset()
    const progress = document.getElementById("progress-bar");
    let indexx = index + 1
    progress.style.width = `${Math.round((indexx / total) * 100)}%`;
    questions.innerHTML = `${index + 1}. ${current.question}`




    options[0].nextElementSibling.innerText = current.a
    options[1].nextElementSibling.innerText = current.b
    options[2].nextElementSibling.innerText = current.c
    options[3].nextElementSibling.innerText = current.d



}



function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            completeQuiz(); // End quiz if time runs out
        } else {
            document.querySelector(".que h2").innerHTML = `${timeLeft}`;
            timeLeft--;
        }
    }, 1000);
}


startTimer()



function resetTimer() {
    clearInterval(timerId);
    timeLeft = 60;
    startTimer();
}


function completeQuiz() {
    document.querySelector('.box').innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Correct: ${right}</p>
        <p>Wrong: ${wrong}</p>
        <p>Score: ${Math.round((right / total) * 100)}%</p>
    `
}
function reset() {
    options.forEach((inp) => {
        inp.checked = false;
    })
}

btn.addEventListener('click', () => {
    let selected = '';


    options.forEach((inp) => {
        if (inp.checked) {
            selected = inp.value
        }
    })

    if (selected == '') {
        alert("Please Select the Option...")
        return
    }
    if (selected === quizData[index].correctAnswer) {
        right++

    }
    else {
        wrong++

    }
    index++
    loadQuestions()
    resetTimer()


})









// initial call

loadQuestions()

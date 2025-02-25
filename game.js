let score = 0;
let num1, num2, correctAnswer, operation;
let level = 1;
let timer = 180; // 3 minutes for level 1
let timerInterval;

document.getElementById("startGame").addEventListener("click", function() {
    document.getElementById("startGame").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    startTimer();
    generateQuestion();
});

function startTimer() {
    let timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timerElement.innerText = `الوقت المتبقي: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timer === 0) {
            clearInterval(timerInterval);
            timeExpired();
        }
        timer--;
    }, 1000);
}

function timeExpired() {
    alert("⏰ انتهى الوقت! اضغط على الزر للانتقال إلى المستوى التالي.");
    let nextButton = document.createElement("button");
    nextButton.innerText = "المتابعة إلى المستوى التالي";
    nextButton.onclick = nextLevel;
    nextButton.id = "nextLevelButton";
    document.getElementById("game").appendChild(nextButton);
}

function generateQuestion() {
    if (level === 1) {
        num1 = Math.floor(Math.random() * 12) + 1; // 1-12
        num2 = Math.floor(Math.random() * 12) + 1;
    } else if (level === 2) {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 12) + 1; // 1-12
    } else {
        num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
    }

    if (Math.random() > 0.5) {
        operation = "×";
        correctAnswer = num1 * num2;
    } else {
        operation = "÷";
        correctAnswer = Math.floor(num1 / num2); // Round down for whole number answers
        num1 = correctAnswer * num2; // Adjust to ensure division works
    }

    document.getElementById("question").innerText = `ما هو ${num1} ${operation} ${num2}?`;
}

document.getElementById("submit").addEventListener("click", function() {
    let userAnswer = parseInt(document.getElementById("answer").value);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "✅ إجابة صحيحة!";
    } else {
        document.getElementById("feedback").innerText = `❌ إجابة خاطئة. الإجابة الصحيحة هي ${correctAnswer}.`;
    }

    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = "";
    generateQuestion();
});

function nextLevel() {
    level++;
    if (level <= 3) {
        timer = 300; // Reset to 5 minutes for levels 2 and 3
        document.getElementById("level").innerText = `المستوى: ${level}`;
        document.getElementById("timer").innerText = "الوقت المتبقي: 5:00";
        document.getElementById("question").innerText = "";
        document.getElementById("answer").value = "";
        document.getElementById("feedback").innerText = "";
        document.getElementById("score").innerText = score;
        
        let nextButton = document.getElementById("nextLevelButton");
        if (nextButton) {
            nextButton.remove();
        }
        
        startTimer();
        generateQuestion();
    } else {
        document.getElementById("game").innerHTML = `<h2>🎉 انتهت اللعبة! لقد حصلت على ${score} نقطة 🎉</h2>`;
    }
}

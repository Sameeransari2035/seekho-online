
const TIME_LIMIT = 15;

let sawalList = [];
let current = 0;
let score = 0;
let answered = false;
let timeLeft = TIME_LIMIT;
let timerId = null;
let currentCat = "all";
let correctIndex = 0;

const categoryBox = document.getElementById("category-box");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const sawalEl = document.getElementById("sawal");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const bestText = document.getElementById("best-text");
const restartBtn = document.getElementById("restart-btn");

// Array ke items ko random order me karke naya array deta hai
function shuffle(arr) {
  const copy = arr.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

// Category button dabane par quiz shuru
document.querySelectorAll(".cat-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    startQuiz(btn.dataset.cat);
  });
});
function startQuiz(cat) {
  currentCat = cat;

  let selected;
  if (cat === "all") {
    selected = allQuestions;
  } else {
    selected = allQuestions.filter(function (q) {
      return q.category === cat;
    });
  }
  sawalList = shuffle(selected);

  current = 0;
  score = 0;
  categoryBox.style.display = "none";
  resultEl.style.display = "none";
  quizEl.style.display = "block";
  showQuestion();
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_LIMIT;
  updateTimer();

  timerId = setInterval(function () {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timeUp();
    }
  }, 1000);
}

function updateTimer() {
  timerEl.innerText = "Time: " + timeLeft + " sec";
  timerEl.classList.toggle("urgent", timeLeft <= 5);
}

function showQuestion() {
  answered = false;
  const q = sawalList[current];

  progressEl.innerText = "Sawal " + (current + 1) + " / " + sawalList.length;
  sawalEl.innerText = q.sawal;
  feedbackEl.innerText = "";
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";

  // Har option ke saath nishan lagao: sahi hai ya nahi
  const optionObjs = q.options.map(function (text, i) {
    return { text: text, correct: i === q.sahi };
  });

  // Shuffle karo, phir dekho sahi option ab kis position par hai
  const shuffledOptions = shuffle(optionObjs);
  correctIndex = shuffledOptions.findIndex(function (o) {
    return o.correct;
  });

    shuffledOptions.forEach(function (opt, i) {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.addEventListener("click", function () {
      checkAnswer(i, btn);
    });
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(chosen, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timerId);

  const buttons = optionsEl.querySelectorAll("button");

  if (chosen === correctIndex) {
    score++;
    btn.classList.add("sahi");
    feedbackEl.innerText = "Sahi jawab!";
  } else {
    btn.classList.add("galat");
    buttons[correctIndex].classList.add("sahi");
    feedbackEl.innerText = "Galat jawab.";
  }

  nextBtn.style.display = "inline-block";
}

function timeUp() {
  if (answered) return;
  answered = true;

  const buttons = optionsEl.querySelectorAll("button");
  buttons[correctIndex].classList.add("sahi");
  feedbackEl.innerText = "Time khatam! Sahi jawab upar hara dikh raha hai.";
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", function () {
  current++;
  if (current < sawalList.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  clearInterval(timerId);
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  scoreText.innerText = "Aapka score: " + score + " / " + sawalList.length;

  // Is category ka purana best score padho
  const key = "best-" + currentCat;
  const oldBest = Number(localStorage.getItem(key)) || 0;

  if (score > oldBest) {
    localStorage.setItem(key, score);
    bestText.textContent = "Naya best score: " + score + " 🎉";
  } else {
    bestText.textContent = "Aapka best score: " + oldBest;
  }
}

restartBtn.addEventListener("click", function () {
  resultEl.style.display = "none";
  categoryBox.style.display = "block";
});
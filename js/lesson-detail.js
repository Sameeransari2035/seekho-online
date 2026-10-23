// lesson-detail.js: URL ke id ke hisaab se ek lesson dikhata hai

const titleEl = document.getElementById("lesson-title");
const subjectEl = document.getElementById("lesson-subject");
const textEl = document.getElementById("lesson-text");
const pointsEl = document.getElementById("lesson-points");
const msgEl = document.getElementById("lesson-msg");
const doneBtn = document.getElementById("done-btn");
const prevLink = document.getElementById("prev-link");
const nextLink = document.getElementById("next-link");

// URL se id padho (jaise lesson.html?id=2 me 2)
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Array me us id wala lesson dhundho
const lesson = lessons.find(function (l) {
  return l.id === id;
});

if (!lesson) {
  msgEl.textContent = "Lesson nahi mila. Wapas jaake dobara chunein.";
} else {
  document.title = lesson.title + " - Seekho Online";
  titleEl.textContent = lesson.title;
  subjectEl.textContent = "Subject: " + lesson.subject;
  textEl.textContent = lesson.text;

  lesson.points.forEach(function (point) {
    const li = document.createElement("li");
    li.textContent = point;
    pointsEl.appendChild(li);
  });

  // "Padh liya" button (lessons page wali list hi use karta hai)
  let done = JSON.parse(localStorage.getItem("doneLessons")) || [];

  function refreshBtn() {
    const isDone = done.includes(lesson.id);
    doneBtn.textContent = isDone ? "✓ Padh liya" : "Padh liya mark karein";
    doneBtn.classList.toggle("done", isDone);
  }

  doneBtn.style.display = "inline-block";
  refreshBtn();

  doneBtn.addEventListener("click", function () {
    if (done.includes(lesson.id)) {
      done = done.filter(function (x) {
        return x !== lesson.id;
      });
    } else {
      done.push(lesson.id);
    }
    localStorage.setItem("doneLessons", JSON.stringify(done));
    refreshBtn();
  });

  // Pichhle aur agle lesson ke links
  const prevLesson = lessons.find(function (l) {
    return l.id === lesson.id - 1;
  });
  const nextLesson = lessons.find(function (l) {
    return l.id === lesson.id + 1;
  });

  if (prevLesson) {
    prevLink.href = "lesson.html?id=" + prevLesson.id;
    prevLink.style.display = "inline-block";
  }
  if (nextLesson) {
    nextLink.href = "lesson.html?id=" + nextLesson.id;
    nextLink.style.display = "inline-block";
  }
}


const listEl = document.getElementById("lessons-list");

const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");

// Jo lessons padh liye hain unki id ki list (localStorage se)
let done = JSON.parse(localStorage.getItem("doneLessons")) || [];

// Progress text aur bar ko update karta hai
function updateProgress() {
  const percent = Math.round((done.length / lessons.length) * 100);
  progressText.textContent =
    done.length + " / " + lessons.length + " lessons poore (" + percent + "%)";
  barFill.style.width = percent + "%";
}

lessons.forEach(function (l) {
  const article = document.createElement("article");
  article.className = "lesson";
  article.dataset.subject = l.subject;

  // Poora lesson dekhne ka link
  const readLink = document.createElement("a");
  readLink.href = "lesson.html?id=" + l.id;
  readLink.className = "read-link";
  readLink.textContent = "Poora padhein →";
  article.appendChild(readLink);

  // "Padh liya" button
  const doneBtn = document.createElement("button");
  doneBtn.className = "done-btn";

  // Button ka text aur rang, padhe hue ya nahi ke hisaab se
  function refreshBtn() {
    const isDone = done.includes(l.id);
    doneBtn.textContent = isDone ? "✓ Padh liya" : "Padh liya mark karein";
    doneBtn.classList.toggle("done", isDone);
  }

  doneBtn.addEventListener("click", function () {
    if (done.includes(l.id)) {
      // Pehle se padha hua hai, to list se hata do
      done = done.filter(function (x) {
        return x !== l.id;
      });
    } else {
      // Naya padha hua, list me jod do
      done.push(l.id);
    }
    localStorage.setItem("doneLessons", JSON.stringify(done));
    refreshBtn();
    updateProgress();
  });

  refreshBtn();
  article.appendChild(doneBtn);




  const h2 = document.createElement("h2");
  h2.textContent = l.subject + ": " + l.title;
  article.appendChild(h2);
  article.dataset.subject = l.subject;

  const p = document.createElement("p");
  p.textContent = l.text;
  article.appendChild(p);
  article.dataset.subject = l.subject;

  if (l.points.length > 0) {
    const ul = document.createElement("ul");
    l.points.forEach(function (point) {
      const li = document.createElement("li");
      li.textContent = point;
      ul.appendChild(li);
    });
    article.appendChild(ul);
  }

  listEl.appendChild(article);
});

updateProgress();
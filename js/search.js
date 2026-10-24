// search.js: lessons ko subject filter aur search box se chhupata/dikhata hai

const searchEl = document.getElementById("search");
const lessonEls = document.querySelectorAll(".lesson");
const noResult = document.getElementById("no-result");
const filterBtns = document.querySelectorAll(".filter-btn");

let selectedSubject = "all";

function applyFilters() {
  const text = searchEl.value.toLowerCase().trim();
  let found = 0;

  lessonEls.forEach(function (lesson) {
    const subjectOk =
      selectedSubject === "all" || lesson.dataset.subject === selectedSubject;

    // Sirf title, paragraph aur points me dhundho (button me nahi)
    const searchable =
      lesson.querySelector("h2").innerText + " " +
      lesson.querySelector("p").innerText + " " +
      (lesson.querySelector("ul") ? lesson.querySelector("ul").innerText : "");
    const textOk = searchable.toLowerCase().includes(text);

    if (subjectOk && textOk) {
      lesson.style.display = "block";
      found++;
    } else {
      lesson.style.display = "none";
    }
  });

  noResult.style.display = found === 0 ? "block" : "none";
}

searchEl.addEventListener("input", applyFilters);

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    selectedSubject = btn.dataset.subject;

    filterBtns.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    applyFilters();
  });
});

// Home ke card se aaye hon (lessons.html?subject=Maths) to wahi subject chuno
const subjectParam = new URLSearchParams(window.location.search).get("subject");
if (subjectParam) {
  const wantedBtn = document.querySelector(
    '.filter-btn[data-subject="' + subjectParam + '"]'
  );
  if (wantedBtn) wantedBtn.click();
}
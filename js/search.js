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
    const textOk = lesson.innerText.toLowerCase().includes(text);

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
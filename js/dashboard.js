// dashboard.js: home page par padhai ka progress aur best scores dikhata hai

const homeProgressText = document.getElementById("home-progress-text");
const homeBarFill = document.getElementById("home-bar-fill");

// Padhe hue lessons (lessons page wali hi list)
const doneList = JSON.parse(localStorage.getItem("doneLessons")) || [];
const percent = Math.round((doneList.length / lessons.length) * 100);

homeProgressText.textContent =
  doneList.length + " / " + lessons.length + " lessons poore (" + percent + "%)";
homeBarFill.style.width = percent + "%";

// Har subject ka best quiz score
["maths", "science", "english"].forEach(function (cat) {
  const best = localStorage.getItem("best-" + cat);
  const total = allQuestions.filter(function (q) {
    return q.category === cat;
  }).length;

  if (best !== null) {
    document.getElementById("best-" + cat).textContent = best + " / " + total;
  }
});

// Progress aur best scores saaf karne ka button
// Progress, best scores aur planner ke kaam saaf karne ka button
document.getElementById("reset-btn").addEventListener("click", function () {
  const sure = confirm(
    "Pakka? Padhe hue lessons, best scores aur planner ke saare kaam hamesha ke liye hat jayenge."
  );
  if (!sure) return;

  localStorage.removeItem("doneLessons");
  localStorage.removeItem("tasks");
  ["maths", "science", "english", "all"].forEach(function (cat) {
    localStorage.removeItem("best-" + cat);
  });

  location.reload();
});
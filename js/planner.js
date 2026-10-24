// planner.js: padhai ke kaam jodna, tick karna aur hatana

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const listEl = document.getElementById("task-list");
const countEl = document.getElementById("task-count");

// Saare kaam is array me rahenge
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Array ke hisaab se poori list screen par banata hai
// Array ke hisaab se poori list screen par banata hai

// Kaam ki list browser me save karta hai
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  listEl.innerHTML = "";

  tasks.forEach(function (t) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.classList.toggle("done", t.done);

    // Checkbox: kaam poora hua ya nahi
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.done;
    check.setAttribute("aria-label", "Kaam poora hua");
    check.addEventListener("change", function () {
      t.done = check.checked;
      saveTasks();
      render();
    });

    const span = document.createElement("span");
    span.textContent = t.text;

    // Delete button
    const del = document.createElement("button");
    del.className = "del-btn";
    del.textContent = "×";
    del.setAttribute("aria-label", "Kaam hatayein");
    del.addEventListener("click", function () {
      tasks = tasks.filter(function (x) {
        return x.id !== t.id;
      });
      saveTasks();
      render();
    });

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(del);
    listEl.appendChild(li);
  });

  const pending = tasks.filter(function (t) {
    return !t.done;
  }).length;
  countEl.textContent = pending + " kaam baaki (kul " + tasks.length + ")";
}

// Form submit hone par naya kaam jodo
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = "";
  render();
  saveTasks();
});

render();
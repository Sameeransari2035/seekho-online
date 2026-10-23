// layout.js: saare pages ka header aur footer ek hi jagah se banata hai

const pages = [
  { name: "Home", file: "index.html" },
  { name: "Lessons", file: "lessons.html" },
  { name: "Quiz", file: "quiz.html" },
  { name: "Contact", file: "contact.html" },
  { name: "Weather", file: "weather.html" },
  { name: "About", file: "about.html" }
];

// Abhi kaunsa page khula hai (jaise "lessons.html")
let currentFile = window.location.pathname.split("/").pop();
if (currentFile === "") currentFile = "index.html";

function buildHeader() {
  let links = "";
    pages.forEach(function (p) {
    const cls = p.file === currentFile ? ' class="active"' : "";
    links += '<a href="' + p.file + '"' + cls + ">" + p.name + "</a>";
  });

  return (
    "<h1>Seekho Online</h1>" +
    '<button id="menu-btn" aria-label="Menu">☰</button>' +
    '<nav id="menu">' +
    links +
    '<button id="theme-btn" aria-label="Dark mode">🌙</button>' +
    "</nav>"
  );
}

function buildFooter() {
  let links = "";
    pages.forEach(function (p) {
    const cls = p.file === currentFile ? ' class="active"' : "";
    links += '<a href="' + p.file + '"' + cls + ">" + p.name + "</a>";
  });

  return (
    '<nav class="footer-links">' +
    links +
    "</nav>" +
    "<p>&copy; 2026 Seekho Online</p>"
  );
}

// Page par header aur footer lagao
const headerEl = document.getElementById("site-header");
const footerEl = document.getElementById("site-footer");

if (headerEl) headerEl.innerHTML = buildHeader();
if (footerEl) footerEl.innerHTML = buildFooter();
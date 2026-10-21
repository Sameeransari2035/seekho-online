const form = document.getElementById("contact-form");
const naamEl = document.getElementById("naam");
const emailEl = document.getElementById("email");
const messageEl = document.getElementById("message");
const successEl = document.getElementById("success");

function showError(input, errorId, text) {
  document.getElementById(errorId).innerText = text;
  input.classList.add("invalid");
}

function clearError(input, errorId) {
  document.getElementById(errorId).innerText = "";
  input.classList.remove("invalid");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const naam = naamEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  if (naam === "") {
    showError(naamEl, "naam-error", "Naam likhna zaroori hai.");
    valid = false;
  } else if (naam.length < 3) {
    showError(naamEl, "naam-error", "Naam kam se kam 3 akshar ka ho.");
    valid = false;
  } else {
    clearError(naamEl, "naam-error");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(emailEl, "email-error", "Sahi email likhein.");
    valid = false;
  } else {
    clearError(emailEl, "email-error");
  }

  if (message.length < 10) {
    showError(messageEl, "message-error", "Message kam se kam 10 akshar ka ho.");
    valid = false;
  } else {
    clearError(messageEl, "message-error");
  }

  if (!valid) {
    successEl.style.display = "none";
    return;
  }

  const submitBtn = form.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  submitBtn.innerText = "Bhej rahe hain...";

  fetch("https://formspree.io/f/xbgdebgo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ naam: naam, email: email, message: message })
  })
    .then(function (response) {
      if (response.ok) {
        successEl.style.display = "block";
        form.reset();
      } else {
        alert("Message nahi gaya. Kuch der baad try karein.");
      }
    })
    .catch(function () {
      alert("Internet ki dikkat hai. Dobara try karein.");
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerText = "Bhejein";
    });
});
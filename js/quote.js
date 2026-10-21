const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

async function loadQuote() {
  quoteText.textContent = "Load ho raha hai...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    quoteText.textContent = "\"" + data.quote + "\"";
    quoteAuthor.textContent = "- " + data.author;
  } catch (error) {
    quoteText.textContent = "Aaj ka vichar abhi load nahi ho paya.";
  }
}

loadQuote();

document.getElementById("new-quote").addEventListener("click", loadQuote);
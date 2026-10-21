const lessons = [
  {
    subject: "Maths",
    title: "Algebra ka parichay",
    text: "Algebra me hum anjaan sankhya ko x ya y jaise akshar se dikhate hain.",
    points: [
      "Variable: jiski value badal sakti hai (x, y)",
      "Constant: jiski value fixed hai (5, 10)",
      "Equation: jaise x + 5 = 10"
    ]
  },
  {
    subject: "Science",
    title: "Matter kya hai?",
    text: "Jo jagah gheray aur jiska bhaar ho, use matter kehte hain.",
    points: ["Solid", "Liquid", "Gas"]
  },
  {
    subject: "English",
    title: "Noun aur Verb",
    text: "Noun kisi naam ko batata hai, aur verb kisi kaam ko.",
    points: ["Noun: Ram, school, dog", "Verb: run, eat, write"]
  }
];

const listEl = document.getElementById("lessons-list");

lessons.forEach(function (l) {
  const article = document.createElement("article");
  article.className = "lesson";
  article.dataset.subject = l.subject;

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
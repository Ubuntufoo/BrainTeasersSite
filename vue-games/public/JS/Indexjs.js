let elem = document.getElementById("blockquote");
let elem2 = document.getElementById("authors");
let quotes = [
  `"Two bytes meet.  The first byte asks, “Are you ill?”
    The second byte replies, “No, just feeling a bit off.”`,
  `"Why did the programmer quit his job? Because he didn't get arrays."`,
  `"The most used language in programming is profanity."`
];
let authors = [
  "- Mr. Yahoo",
  "- Jeeves",
  "- Googlepa"
]

elem.innerHTML = quotes[0];
elem2.innerHTML = authors[0];

let index = 1;

function cycleQuote() {
  elem.innerHTML = quotes[index];
  elem2.innerHTML = authors[index];

  index++;

  if (index === quotes.length) {
    index = 0;
  }
}

setInterval(cycleQuote, 10000);




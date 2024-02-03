var flashcards = [
  { question: "Question 1", answer: "Answer 1" },
  { question: "Question 2", answer: "Answer 2" },
  // Add more flashcards here
];

var flashcardsContainer = document.getElementById("flashcards");
var nextButton = document.getElementById("next");

flashcards.forEach(function (flashcard, index) {
  var flashcardElement = document.createElement("div");
  flashcardElement.className = "flashcard";
  if (index === 0) {
    flashcardElement.classList.add("active"); // Make the first flashcard active
  }
  flashcardElement.onclick = function () {
    this.classList.toggle("flipped");
  };

  var front = document.createElement("div");
  front.className = "side front";
  front.textContent = flashcard.question;

  var back = document.createElement("div");
  back.className = "side back";
  back.textContent = flashcard.answer;

  flashcardElement.appendChild(front);
  flashcardElement.appendChild(back);

  flashcardsContainer.appendChild(flashcardElement);
});

nextButton.onclick = function () {
  var current = document.querySelector(".flashcard.active");
  var next =
    current.nextElementSibling || flashcardsContainer.firstElementChild;
  current.classList.remove("active");
  next.classList.add("active");
};

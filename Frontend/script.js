var flashcards = [
  { question: "Question 1", answer: "Answer 1" },
  { question: "Question 2", answer: "Answer 2" },
  // Add more flashcards here
];

var flashcardsContainer = document.getElementById("flashcards");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");

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

prevButton.onclick = function () {
  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
    // Delay the switching of the cards until after the flip back animation has completed
    setTimeout(switchCard, 300); // 600ms is the duration of the flip animation
  } else {
    switchCard();
  }

  function switchCard() {
    var prev =
      current.previousElementSibling || flashcardsContainer.lastElementChild;
    current.classList.remove("active");
    prev.classList.add("active");
  }
};

nextButton.onclick = function () {
  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
    // Delay the switching of the cards until after the flip back animation has completed
    setTimeout(switchCard, 300); // 600ms is the duration of the flip animation
  } else {
    switchCard();
  }

  function switchCard() {
    var next =
      current.nextElementSibling || flashcardsContainer.firstElementChild;
    current.classList.remove("active");
    next.classList.add("active");
  }
};

fetch("/data")
  .then((response) => response.json())
  .then((data) => {
    var flashcards = [
      { question: "Question 1", answer: "Answer 1" },
      { question: "Question 2", answer: "Answer 2" },
      // Add more flashcards here
    ];
    for (let i = 0; i < data.length; i++) {
      flashcards.push({ question: data[i].question, answer: data[i].answer });
    }
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
      console.log(flashcard.question);
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
          current.previousElementSibling ||
          flashcardsContainer.lastElementChild;
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
  })
  .catch((error) => console.error("Error:", error));

function uploadFile() {
  var input = document.getElementById("myFile");
  var file = input.files[0];
  if (file) {
    // Do something with the file here, like upload it to a server
    alert(
      file.type === "image/png" ? "" : "Upload failed. File Type not supported."
    );
  } else {
    alert("No file selected");
  }
}

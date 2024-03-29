var flashcardsContainer = document.getElementById("flashcards");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
var choiceButtonOne = document.getElementById("Choice1");
var choiceButtonTwo = document.getElementById("Choice2");
var choiceButtonThree = document.getElementById("Choice3");
var choiceButtonFour = document.getElementById("Choice4");

var flashcards = [];
let randomAnswersArr = [];
let curretFlashcard = 0;
async function getFlashcardData() {
  return fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error:", error));
}

async function main() {
  data = await getFlashcardData();
  for (let i = 0; i < data.length; i++) {
    flashcards.push({ question: data[i].question, answer: data[i].answer });
  }
  generateFlashcards();

  for (let i = 0; i < flashcards.length; i++) {
    var randomAnswers = [];
    randomAnswers.push(flashcards[i].answer);
    while (randomAnswers.length < 4) {
      let random = Math.floor(Math.random() * flashcards.length);
      if (!randomAnswers.includes(flashcards[random].answer)) {
        randomAnswers.push(flashcards[random].answer);
      }
    }
    randomAnswersArr.push(randomAnswers);
  }
  renderQuestionAnswers();
}
function generateFlashcards() {
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
}
main();

prevButton.onclick = function () {
  curretFlashcard =
    (curretFlashcard - 1 + flashcards.length) % flashcards.length;
  renderQuestionAnswers();
  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
  }
  switchCard();

  function switchCard() {
    var prev =
      current.previousElementSibling || flashcardsContainer.lastElementChild;
    current.classList.remove("active");
    prev.classList.add("active");
  }
};

nextButton.onclick = function () {
  curretFlashcard = (curretFlashcard + 1) % flashcards.length;
  renderQuestionAnswers();

  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
  }
  switchCard();

  function switchCard() {
    var next =
      current.nextElementSibling || flashcardsContainer.firstElementChild;
    current.classList.remove("active");
    next.classList.add("active");
  }
};

function uploadFile() {
  var input = document.getElementById("myFile");
  var file = input.files[0];
  if (file) {
    
    alert(
      file.type === "image/png" ? "" : "Upload failed. File Type not supported."
    );
  } else {
    alert("No file selected");
  }
}

const body = document.body;
const strip1 = document.querySelector(".strip1");
const strip2 = document.querySelector(".strip2");
const border2 = document.querySelector(".border2");

// Update the background gradient based on mouse position
document.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX / window.innerWidth - 0.5;
  const mouseY = e.pageY / window.innerHeight - 0.5;

  // Update the gradient colors based on mouse position
  const color1 = getColor(mouseX, mouseY, 0);
  const color2 = getColor(mouseX, mouseY, 2);
  const color3 = getColor2(mouseX, mouseY, 5);
  const color4 = getColor2(mouseX, mouseY, 12);

  // Set the gradient background
  body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  strip1.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  strip2.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  border2.style.background = `linear-gradient(to bottom, ${color3}, ${color4})`;
});

// Function to get a color based on mouse position
function getColor(x, y, offset) {
  const r = Math.round(50 * Math.abs(Math.sin(x * 2 * Math.PI + offset)));
  const g = Math.round(15 * Math.abs(Math.sin(y * 2 * Math.PI + offset)));
  const b = Math.round(50 * Math.abs(Math.sin((x + y) * Math.PI + offset)));
  return `rgb(${r},${g},${b})`;
}

function getColor2(x, y, offset) {
  const r = Math.round(5 * Math.abs(Math.sin(x * 2 * Math.PI + offset)));
  const g = Math.round(90 * Math.abs(Math.sin(y * 2 * Math.PI + offset)));
  const b = Math.round(140 * Math.abs(Math.sin((x + y) * Math.PI + offset)));
  return `rgb(${r},${g},${b})`;
}

var videoElement = document.getElementById('video');
var toggleButton = document.getElementById('toggleButton');
var stream = null;

function toggleWebcam() {
  if (stream) {
    // If webcam is on, stop the stream and update button text
    stopWebcam();
    toggleButton.textContent = 'Turn On Webcam';
  } else {
    // If webcam is off, start the webcam and update button text
    startWebcam();
    toggleButton.textContent = 'Turn Off Webcam';
  }
}

function startWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (newStream) {
        stream = newStream;
        videoElement.srcObject = stream;
        videoElement.style.display = 'block';
      })
      .catch(function (error) {
        console.error('Error accessing the camera:', error);
      });
  } else {
    console.error('getUserMedia is not supported in this browser');
  }
}

function stopWebcam() {
  if (stream) {
    var tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
    stream = null;
  }
}
var canvas = document.createElement('canvas');
var captureButton = document.getElementById('captureButton');

 // Check if the browser supports the getUserMedia API
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Access the user's camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // Display the camera stream in the video element
      var videoElement = document.getElementById('video');
      videoElement.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Error accessing the camera:', error);
    });
} else {
  console.error('getUserMedia is not supported in this browser');
}

function capturePhoto() {
  videoElement.pause();

  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Save the captured photo by simulating a download
  var link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'captured_photo.png';
  link.click();

  videoElement.play();
}


function renderQuestionAnswers() {
  const choiceButtons = [
    choiceButtonOne,
    choiceButtonTwo,
    choiceButtonThree,
    choiceButtonFour,
  ];
  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].innerText = randomAnswersArr[curretFlashcard][i];
  }
}

let buttons = document.querySelectorAll(".Choice-Buttons");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let answer = this.innerText;
    console.log(answer);
    console.log(flashcards[curretFlashcard].answer);
    if (answer.trim() == flashcards[curretFlashcard].answer.trim()) {
      alert("Correct");
    } else {
      alert("Incorrect");
    }
  });
});

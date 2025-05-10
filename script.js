const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const timeText = document.querySelector('.time span b');
const mistakesText = document.querySelector('.mistake span');
const wpmText = document.querySelector('.wpm span');
const cpmText = document.querySelector('.cpm span');
const button = document.querySelector('button');

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = false;

const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the riverbank before sunrise.",
  "Typing speed improves with practice, especially when you're focused and error-free.",
  "JavaScript enables dynamic interaction on websites, making user experiences engaging.",
  "Learning to code can be challenging, but persistence and curiosity lead to mastery.",
  "A watched pot never boils, but an unwatched one often boils over unexpectedly.",
  "Artificial intelligence is transforming industries through automation and prediction.",
  "She sells seashells by the seashore, and Peter Piper picked a peck of pickled peppers.",
  "Keep your code clean, readable, and maintainable to avoid future debugging nightmares.",
  "Technology evolves rapidly, and staying up to date is essential for every developer.",
  "Practice typing daily with random passages to boost both speed and accuracy."
];

function loadParagraph() {
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = '';
  for (const char of paragraphs[randIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll('span')[0].classList.add('active');

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll('span');
  const typedChar = inputField.value.charAt(charIndex);

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar === characters[charIndex].innerText) {
      characters[charIndex].classList.add("correct");
    } else {
      characters[charIndex].classList.add("incorrect");
      mistakes++;
    }

    characters[charIndex].classList.remove("active");
    charIndex++;
    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }

    mistakesText.innerText = mistakes;
    cpmText.innerText = charIndex - mistakes;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmText.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  } else {
    clearInterval(timer);
    inputField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeText.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmText.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = 0;
  isTyping = false;
  inputField.value = "";
  timeText.innerText = timeLeft;
  mistakesText.innerText = mistakes;
  wpmText.innerText = 0;
  cpmText.innerText = 0;
}

inputField.addEventListener("input", initTyping);
button.addEventListener("click", resetGame);

loadParagraph();

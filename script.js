// Selecting all necessary DOM elements
const typingText = document.querySelector('.typing-text p');      // The paragraph text that user will type
const inputField = document.querySelector('.input-field');        // Input box where user types
const timeText = document.querySelector('.time span b');          // Timer display (bold element)
const mistakesText = document.querySelector('.mistake span');     // Mistake count display
const wpmText = document.querySelector('.wpm span');              // WPM (Words Per Minute) display
const cpmText = document.querySelector('.cpm span');              // CPM (Characters Per Minute) display
const button = document.querySelector('button');                  // Reset button

// Declaring variables to track state
let timer,                     // To hold setInterval reference for the countdown
    maxTime = 60,              // Total game time (60 seconds)
    timeLeft = maxTime,        // Time left in the countdown
    charIndex = 0,             // Current character index user is typing
    mistakes = 0,              // Total typing mistakes made
    isTyping = false;          // Flag to track if typing has started

// Array of sample paragraphs for the typing test
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

// Loads a random paragraph into the typing area
function loadParagraph() {
  const randIndex = Math.floor(Math.random() * paragraphs.length);  // Pick a random paragraph
  typingText.innerHTML = '';                                        // Clear previous content

  // Wrap each character in a <span> so it can be styled individually
  for (const char of paragraphs[randIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  typingText.querySelectorAll('span')[0].classList.add('active');   // Highlight the first character

  // Automatically focus input when user presses a key or clicks the text
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

// This runs on every input in the typing box
function initTyping() {
  const characters = typingText.querySelectorAll('span');           // Get all characters in the paragraph
  const typedChar = inputField.value.charAt(charIndex);             // Get the latest character typed

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);                          // Start timer when typing begins
      isTyping = true;
    }

    // Check if typed character is correct
    if (typedChar === characters[charIndex].innerText) {
      characters[charIndex].classList.add("correct");               // Mark as correct
    } else {
      characters[charIndex].classList.add("incorrect");             // Mark as incorrect
      mistakes++;                                                   // Increase mistake count
    }

    characters[charIndex].classList.remove("active");               // Remove active class from current char
    charIndex++;                                                    // Move to next character

    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");                // Highlight next character
    }

    // Update the statistics
    mistakesText.innerText = mistakes;
    cpmText.innerText = charIndex - mistakes;                       // Characters per minute = correct chars
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);  // Standard WPM calc
    wpmText.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;  // Avoid invalid numbers
  } else {
    clearInterval(timer);                                           // Stop timer when done
    inputField.value = "";                                          // Clear input
  }
}

// Handles the countdown timer and updates WPM live
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;                                                    // Decrease time
    timeText.innerText = timeLeft;                                 // Update time display

    // Update WPM live even if not typing
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmText.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  } else {
    clearInterval(timer);                                          // Time up – stop countdown
  }
}

// Resets everything to start a new game
function resetGame() {
  loadParagraph();                                                 // Load new random paragraph
  clearInterval(timer);                                            // Clear timer
  timeLeft = maxTime;                                              // Reset time
  charIndex = mistakes = 0;                                        // Reset stats
  isTyping = false;
  inputField.value = "";                                           // Clear input field
  timeText.innerText = timeLeft;
  mistakesText.innerText = mistakes;
  wpmText.innerText = 0;
  cpmText.innerText = 0;
}

// Event listener for typing
inputField.addEventListener("input", initTyping);

// Event listener for reset button
button.addEventListener("click", resetGame);

// Load paragraph on page load
loadParagraph();

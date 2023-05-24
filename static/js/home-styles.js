const words = ['Math Skills', 'Vocabulary', 'Wit', 'Problem-Solving', 'Creativity']; // Replace with your array of words
const wordAnimationElement = document.getElementById('word-animation');

let currentWordIndex = 0;

function animateWords() {
  wordAnimationElement.textContent = words[currentWordIndex];

  // Increment the current word index and wrap around if necessary
  currentWordIndex = (currentWordIndex + 1) % words.length;
}

// Start the initial animation
animateWords();

// Repeat the animation every 3 seconds (adjust as needed)
setInterval(animateWords, 3300);

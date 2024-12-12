// Elements
const scoreInput = document.getElementById('score');
const addScoreButton = document.getElementById('add-score');
const totalScoreElement = document.getElementById('total-score');
const scoreList = document.getElementById('score-list');

// Variables
let scores = [];

// Function to add a score
addScoreButton.addEventListener('click', () => {
  const score = parseInt(scoreInput.value);
  if (!isNaN(score)) {
    scores.push(score);
    updateScores();
    scoreInput.value = '';
    scoreInput.focus();
  } else {
    alert('Please enter a valid score.');
  }
});

// Function to update the score display
function updateScores() {
  // Calculate total score
  const totalScore = scores.reduce((acc, score) => acc + score, 0);
  totalScoreElement.textContent = totalScore;

  // Update score list
  scoreList.innerHTML = '';
  scores.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Round ${index + 1}: ${score}`;
    scoreList.appendChild(listItem);
  });
}

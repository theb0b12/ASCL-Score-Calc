// DOM Elements
const modeSelector = document.getElementById('mode');
const boulderingForm = document.getElementById('bouldering-form');
const mixedForm = document.getElementById('mixed-form');
const resultsSection = document.getElementById('results');
const totalScoreElement = document.getElementById('total-score');
const totalPercentElement = document.getElementById('total-percent');
const routeDetailsElement = document.getElementById('route-details');

// Event Listeners
modeSelector.addEventListener('change', switchMode);
document.getElementById('calculate-bouldering').addEventListener('click', calculateBouldering);
document.getElementById('calculate-mixed').addEventListener('click', calculateMixed);

// Switching between modes
function switchMode() {
  const mode = modeSelector.value;
  if (mode === 'bouldering') {
    boulderingForm.classList.remove('hidden');
    mixedForm.classList.add('hidden');
  } else {
    boulderingForm.classList.add('hidden');
    mixedForm.classList.remove('hidden');
  }
}

// Bouldering Competition Logic
function calculateBouldering() {
  let totalScore = 0;
  let scoreList = [];
  const maxScore = 14240; // Maximum possible score for percentage calculation

  for (let i = 1; i <= 5; i++) {
    const routeNumber = i;
    const flash = confirm(`Did you flash Route ${i}?`);
    const score = (routeNumber * 100) + (flash ? 20 : 0) + routeNumber;
    totalScore += score;

    // Add to score list
    scoreList.push(`Route ${routeNumber}: ${flash ? 'Flash' : 'No Flash'} - Score: ${score}`);
  }

  displayResults(totalScore, scoreList, maxScore);
}

// Mixed Competition Logic
function calculateMixed() {
  let totalScore = 0;
  let scoreList = [];
  const maxScore = 9931; // Maximum possible score for percentage calculation

  // Rope Routes
  for (let i = 1; i <= 2; i++) {
    const routeNumber = i;
    const flash = confirm(`Did you flash Rope Route ${i}?`);
    const lead = confirm(`Was Rope Route ${i} lead?`);
    const score = (routeNumber * 100) + (flash ? 20 : 0) + (lead ? 45 : 0) + routeNumber;
    totalScore += score;

    scoreList.push(`Rope Route ${routeNumber}: ${flash ? 'Flash' : 'No Flash'}, ${lead ? 'Lead' : 'Toprope'} - Score: ${score}`);
  }

  // Boulder Routes
  for (let i = 1; i <= 2; i++) {
    const routeNumber = i;
    const flash = confirm(`Did you flash Boulder Route ${i}?`);
    const score = (routeNumber * 100) + (flash ? 20 : 0) + routeNumber;
    totalScore += score;

    scoreList.push(`Boulder Route ${routeNumber}: ${flash ? 'Flash' : 'No Flash'} - Score: ${score}`);
  }

  // Choice Route
  const choiceRoute = 1; // Example choice route
  const flash = confirm('Did you flash the Choice Route?');
  const lead = confirm('Was the Choice Route lead?');
  const choiceScore = (choiceRoute * 100) + (flash ? 20 : 0) + (lead ? 45 : 0) + choiceRoute;
  totalScore += choiceScore;

  scoreList.push(`Choice Route: ${flash ? 'Flash' : 'No Flash'}, ${lead ? 'Lead' : 'Toprope'} - Score: ${choiceScore}`);

  displayResults(totalScore, scoreList, maxScore);
}

// Display Results
function displayResults(totalScore, scoreList, maxScore) {
  const percent = Math.round((totalScore / maxScore) * 10000) / 100;

  totalScoreElement.textContent = totalScore;
  totalPercentElement.textContent = `${percent}%`;
  routeDetailsElement.innerHTML = scoreList.map(route => `<li>${route}</li>`).join('');

  resultsSection.classList.remove('hidden');
}

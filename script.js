// DOM Elements
const competitionModal = document.getElementById('competition-modal');
const boulderingForm = document.getElementById('bouldering-form');
const mixedForm = document.getElementById('mixed-form');
const resultsSection = document.getElementById('results');
const totalScoreElement = document.getElementById('total-score');
const totalPercentElement = document.getElementById('total-percent');
const routeDetailsElement = document.getElementById('route-details');
const selectBoulderingButton = document.getElementById('select-bouldering');
const selectMixedButton = document.getElementById('select-mixed');

// Event Listeners
selectBoulderingButton.addEventListener('click', () => selectCompetition('bouldering'));
selectMixedButton.addEventListener('click', () => selectCompetition('mixed'));
document.getElementById('calculate-bouldering').addEventListener('click', calculateBouldering);
document.getElementById('calculate-mixed').addEventListener('click', calculateMixed);

// Select competition type and display the corresponding form
function selectCompetition(type) {
  competitionModal.classList.add('hidden');
  if (type === 'bouldering') {
    boulderingForm.classList.remove('hidden');
  } else if (type === 'mixed') {
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
  const flash = confirm('Did you flash the

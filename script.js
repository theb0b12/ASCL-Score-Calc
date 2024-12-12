// DOM Elements
const competitionModal = document.getElementById('competition-modal');
const boulderingForm = document.getElementById('bouldering-form');
const resultsSection = document.getElementById('results');
const totalScoreElement = document.getElementById('total-score');
const totalPercentElement = document.getElementById('total-percent');
const routeDetailsElement = document.getElementById('route-details');
const selectBoulderingButton = document.getElementById('select-bouldering');
const calculateBoulderingButton = document.getElementById('calculate-bouldering');

// Event Listeners
selectBoulderingButton.addEventListener('click', () => selectCompetition('bouldering'));
calculateBoulderingButton.addEventListener('click', calculateBouldering);

// Select competition type
function selectCompetition(type) {
  competitionModal.classList.add('hidden');
  if (type === 'bouldering') {
    boulderingForm.classList.remove('hidden');
    generateBoulderingInputs();
  }
}

// Generate dropdowns for bouldering routes
function generateBoulderingInputs() {
  const boulderingInputs = document.getElementById('bouldering-inputs');
  boulderingInputs.innerHTML = ''; // Clear any existing inputs

  for (let i = 1; i <= 5; i++) {
    const div = document.createElement('div');
    div.className = 'bouldering-route';
    div.innerHTML = `
      <label for="boulder-route-${i}">Select Route ${i}:</label>
      <select id="boulder-route-${i}" class="boulder-route">
        ${generateRouteOptions()}
      </select>
      <label for="boulder-flash-${i}">Flash:</label>
      <input type="checkbox" id="boulder-flash-${i}" class="boulder-flash">
    `;
    boulderingInputs.appendChild(div);
  }
}

// Generate route options (1–30)
function generateRouteOptions() {
  let options = '';
  for (let i = 1; i <= 30; i++) {
    options += `<option value="${i}">Route ${i}</option>`;
  }
  return options;
}

// Calculate Bouldering Score
function calculateBouldering() {
  let totalScore = 0;
  let scoreList = [];
  const maxScore = 14240; // Maximum possible score for percentage calculation

  for (let i = 1; i <= 5; i++) {
    const routeNumber = parseInt(document.getElementById(`boulder-route-${i}`).value, 10);
    const flash = document.getElementById(`boulder-flash-${i}`).checked;
    const score = (routeNumber * 100) + (flash ? 20 : 0) + routeNumber;
    totalScore += score;

    // Add to score list
    scoreList.push(`Route ${routeNumber}: ${flash ? 'Flash' : 'No Flash'} - Score: ${score}`);
  }

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

// DOM Elements
const boulderingForm = document.getElementById('bouldering-form');
const resultsSection = document.getElementById('results');
const totalScoreElement = document.getElementById('total-score');
const totalPercentElement = document.getElementById('total-percent');
const routeDetailsElement = document.getElementById('route-details');
const calculateBoulderingButton = document.getElementById('calculate-bouldering');

// Event Listeners
calculateBoulderingButton.addEventListener('click', calculateBouldering);

// Generate route options for 1–30
function generateRouteOptions() {
  let options = '';
  for (let i = 1; i <= 30; i++) {
    options += `<option value="${i}">Route ${i}</option>`;
  }
  return options;
}

// Generate Bouldering input fields
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

// Calculate Bouldering Score
function calculateBouldering() {
  let totalScore = 0;
  let scoreList = [];
  const maxScore = 14240; // Maximum possible score for percentage calculation

  // Iterate over 5 routes
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

// Initialize Bouldering form
generateBoulderingInputs();

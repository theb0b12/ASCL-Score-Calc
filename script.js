document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

const compTypeSelect = document.getElementById('compType');
const inputForm = document.getElementById('inputForm');
const resultsDiv = document.getElementById('results');

compTypeSelect.addEventListener('change', generateInputs);

function generateInputs() {
    const compType = compTypeSelect.value;
    inputForm.innerHTML = '';

    if (compType === 'bouldering') {
        for (let i = 1; i <= 5; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <div class="input-row">
                    <label>Bouldering Route ${i}:</label>
                    <input type="number" id="route${i}" placeholder="Route #" min="1" max="30" step="1">
                    <input type="checkbox" id="flash${i}">
                    <label for="flash${i}">Flash</label>
                    <span class="error" id="routeError${i}"></span>
                </div>
            `;
            inputForm.appendChild(inputGroup);

            // Add event listeners for validation
            const routeInput = document.getElementById(`route${i}`);
            const routeError = document.getElementById(`routeError${i}`);
            
            routeInput.addEventListener('input', () => validateRouteInput(routeInput, routeError, 30));
        }
    } else {
        // Rope Routes
        for (let i = 1; i <= 2; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <div class="input-row">
                    <label>Rope Route ${i}:</label>
                    <input type="number" id="ropeRoute${i}" placeholder="Route #" min="1" max="20" step="1">
                    <input type="checkbox" id="ropeFlash${i}">
                    <label for="ropeFlash${i}">Flash</label>
                    <input type="checkbox" id="ropeLead${i}">
                    <label for="ropeLead${i}">Lead</label>
                    <span class="error" id="ropeRouteError${i}"></span>
                </div>
            `;
            inputForm.appendChild(inputGroup);

            // Add event listeners for validation
            const ropeRouteInput = document.getElementById(`ropeRoute${i}`);
            const ropeRouteError = document.getElementById(`ropeRouteError${i}`);
            
            ropeRouteInput.addEventListener('input', () => validateRouteInput(ropeRouteInput, ropeRouteError, 20));
        }

        // Boulder Routes
        for (let i = 1; i <= 2; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <div class="input-row">
                    <label>Boulder Route ${i}:</label>
                    <input type="number" id="boulderRoute${i}" placeholder="Route #" min="1" max="20" step="1">
                    <input type="checkbox" id="boulderFlash${i}">
                    <label for="boulderFlash${i}">Flash</label>
                    <span class="error" id="boulderRouteError${i}"></span>
                </div>
            `;
            inputForm.appendChild(inputGroup);

            // Add event listeners for validation
            const boulderRouteInput = document.getElementById(`boulderRoute${i}`);
            const boulderRouteError = document.getElementById(`boulderRouteError${i}`);
            
            boulderRouteInput.addEventListener('input', () => validateRouteInput(boulderRouteInput, boulderRouteError, 20));
        }

        // Choice Route
        const choiceInputGroup = document.createElement('div');
        choiceInputGroup.className = 'input-group';
        choiceInputGroup.innerHTML = `
            <div class="input-row">
                <label>Choice Route:</label>
                <input type="number" id="choiceRoute" placeholder="Route #" min="1" max="20" step="1">
                <input type="checkbox" id="choiceFlash">
                <label for="choiceFlash">Flash</label>
                <input type="checkbox" id="choiceLead">
                <label for="choiceLead">Lead</label>
                <span class="error" id="choiceRouteError"></span>
            </div>
        `;
        inputForm.appendChild(choiceInputGroup);

        // Add event listener for choice route
        const choiceRouteInput = document.getElementById('choiceRoute');
        const choiceRouteError = document.getElementById('choiceRouteError');
        
        choiceRouteInput.addEventListener('input', () => validateRouteInput(choiceRouteInput, choiceRouteError, 20));
    }
}

function validateRouteInput(input, errorSpan, maxRouteNumber) {
    const value = input.value.trim();
    
    // Check if input is empty
    if (value === '') {
        errorSpan.textContent = 'Route is required';
        input.classList.add('invalid');
        return false;
    }
    
    // Convert to number and check for valid input
    const numValue = parseInt(value, 10);
    
    // Check for non-numeric input
    if (isNaN(numValue)) {
        errorSpan.textContent = 'Please enter a valid number';
        input.classList.add('invalid');
        return false;
    }
    
    // Check for negative numbers
    if (numValue < 0) {
        errorSpan.textContent = 'Route number cannot be negative';
        input.classList.add('invalid');
        return false;
    }
    
    // Check for route number exceeding maximum
    if (numValue > maxRouteNumber) {
        errorSpan.textContent = `Route number cannot exceed ${maxRouteNumber}`;
        input.classList.add('invalid');
        return false;
    }
    
    // Clear any previous error
    errorSpan.textContent = '';
    input.classList.remove('invalid');
    return true;
}

function calculateScore() {
    const compType = compTypeSelect.value;
    let score = 0;
    const routeDetails = [];

    // Input validation
    const validateInput = (inputId) => {
        const input = document.getElementById(inputId);
        const value = input.value.trim();
        
        // Check for empty or invalid input
        if (value === '' || isNaN(parseInt(value, 10)) || parseInt(value, 10) < 0) {
            input.style.border = '2px solid red';
            return false;
        }
        
        input.style.border = ''; // Reset border
        return true;
    };

    // Validation check
    let isValid = true;

    if (compType === 'bouldering') {
        // Validate all inputs first
        for (let i = 1; i <= 5; i++) {
            if (!validateInput(`route${i}`)) {
                isValid = false;
            }
        }

        // If not valid, show error and stop
        if (!isValid) {
            resultsDiv.innerHTML = '<p style="color: red;">Please check your inputs. All routes must be valid numbers.</p>';
            return;
        }

        // Scoring for Bouldering Competition
        for (let i = 1; i <= 5; i++) {
            const routeNumber = parseInt(document.getElementById(`route${i}`).value) || 0;
            const isFlash = document.getElementById(`flash${i}`).checked;

            if (isFlash) {
                // Flash bonus: base route score + 20 points + route number
                score += ((routeNumber * 100) + 20) + routeNumber;
                routeDetails.push(`${routeNumber} (Flash)`);
            } else {
                // Regular route score
                score += (routeNumber * 100);
                routeDetails.push(`${routeNumber}`);
            }
        }

        // Maximum score for Bouldering Competition
        const maxScore = 14240;
        const scorePercent = Math.round((score / maxScore * 10000)) / 100;

        // Display results
        resultsDiv.innerHTML = `
            <h3>Bouldering Competition Results</h3>
            <p>Total Score: ${Math.floor(score)}</p>
            <p>Total Score Percent: ${scorePercent}%</p>
            <p>Routes: ${routeDetails.join(', ')}</p>
        `;

    } else {
        // Mixed Competition - Validate all inputs
        const mixedInputIds = [
            'ropeRoute1', 'ropeRoute2', 
            'boulderRoute1', 'boulderRoute2', 
            'choiceRoute'
        ];

        mixedInputIds.forEach(inputId => {
            if (!validateInput(inputId)) {
                isValid = false;
            }
        });

        // If not valid, show error and stop
        if (!isValid) {
            resultsDiv.innerHTML = '<p style="color: red;">Please check your inputs. All routes must be valid numbers.</p>';
            return;
        }

        // Rope Routes
        for (let i = 1; i <= 2; i++) {
            const routeNumber = parseInt(document.getElementById(`ropeRoute${i}`).value) || 0;
            const isFlash = document.getElementById(`ropeFlash${i}`).checked;
            const isLead = document.getElementById(`ropeLead${i}`).checked;

            if (isFlash && isLead) {
                // Flash and Lead bonus: base route score + 65 points + route number
                score += (routeNumber * 100) + 65 + routeNumber;
                routeDetails.push(`${routeNumber} (Flash, Lead)`);
            } else if (isFlash) {
                // Flash bonus: base route score + 20 points + route number
                score += (routeNumber * 100) + 20 + routeNumber;
                routeDetails.push(`${routeNumber} (Flash)`);
            } else if (isLead) {
                // Lead bonus: base route score + 45 points + route number
                score += (routeNumber * 100) + 45 + routeNumber;
                routeDetails.push(`${routeNumber} (Lead)`);
            } else {
                // Regular route score
                score += (routeNumber * 100);
                routeDetails.push(`${routeNumber}`);
            }
        }

        // Boulder Routes
        for (let i = 1; i <= 2; i++) {
            const routeNumber = parseInt(document.getElementById(`boulderRoute${i}`).value) || 0;
            const isFlash = document.getElementById(`boulderFlash${i}`).checked;

            if (isFlash) {
                // Flash bonus: base route score + 20 points + route number
                score += (routeNumber * 100) + 20 + routeNumber;
                routeDetails.push(`${routeNumber} (Flash)`);
            } else {
                // Regular route score
                score += (routeNumber * 100);
                routeDetails.push(`${routeNumber}`);
            }
        }

        // Choice Route
        const choiceRouteNumber = parseInt(document.getElementById('choiceRoute').value) || 0;
        const isChoiceFlash = document.getElementById('choiceFlash').checked;
        const isChoiceLead = document.getElementById('choiceLead').checked;

        if (isChoiceFlash && isChoiceLead) {
            // Flash and Lead bonus: base route score + 65 points + route number
            score += (choiceRouteNumber * 100) + 65 + choiceRouteNumber;
            routeDetails.push(`${choiceRouteNumber} (Flash, Lead)`);
        } else if (isChoiceFlash) {
            // Flash bonus: base route score + 20 points + route number
            score += (choiceRouteNumber * 100) + 20 + choiceRouteNumber;
            routeDetails.push(`${choiceRouteNumber} (Flash)`);
        } else if (isChoiceLead) {
            // Lead bonus: base route score + 45 points + route number
            score += (choiceRouteNumber * 100) + 45 + choiceRouteNumber;
            routeDetails.push(`${choiceRouteNumber} (Lead)`);
        } else {
            // Regular route score
            score += (choiceRouteNumber * 100);
            routeDetails.push(`${choiceRouteNumber}`);
        }

        // Maximum score for Mixed Competition
        const maxScore = 9931;
        const scorePercent = Math.round((score / maxScore * 10000)) / 100;

        // Display results
        resultsDiv.innerHTML = `
            <h3>Mixed Competition Results</h3>
            <p>Total Score: ${Math.floor(score)}</p>
            <p>Total Score Percent: ${scorePercent}%</p>
            <p>Routes: ${routeDetails.join(', ')}</p>
        `;
    }
}

// Initialize with default inputs
generateInputs();


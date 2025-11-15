// Select elements
const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('oldtext');
const buttons = document.querySelectorAll('#butttons button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    // If button has no value (like invisible N), ignore
    if (!value) return;

    if (value === 'delete') {
      clearAll();
    } else if (value === '=') {
      calculateResult();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});

// Handle number and decimal inputs
function handleNumber(value) {
  // Prevent multiple dots
  if (value === '.' && currentInput.includes('.')) return;

  currentInput += value;
  updateResultDisplay(currentInput);
}

// Handle operator input
function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;

  // If there's already an operator, calculate first
  if (operator && currentInput) {
    calculateResult();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = '';
  updateHistoryDisplay(`${previousInput} ${operator}`);
}

// Perform calculation
function calculateResult() {
  if (previousInput === '' || currentInput === '' || !operator) return;

  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = curr !== 0 ? prev / curr : 'Error';
      break;
  }

  updateResultDisplay(result);
  updateHistoryDisplay(`${previousInput} ${operator} ${currentInput} =`);
  currentInput = result.toString();
  previousInput = '';
  operator = '';
}

// Clear all inputs
function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateResultDisplay('0');
  updateHistoryDisplay('0');
}

// Update display text
function updateResultDisplay(value) {
  resultDisplay.textContent = value;
}

function updateHistoryDisplay(value) {
  historyDisplay.textContent = value;
}




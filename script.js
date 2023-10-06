let displayValue = '0';
let isDarkTheme = true;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = value;
    } else {
        // Check if the last character is an operator
        const lastChar = displayValue.slice(-1);
        const isOperator = /[\+\-\*\/\^]/.test(lastChar);

        // If the last character is an operator and the new value is also an operator, replace the last one
        if (isOperator && /[\+\-\*\/\^]/.test(value)) {
            displayValue = displayValue.slice(0, -1) + value;
        } else {
            displayValue += value;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Remove trailing operator if present
        const lastChar = displayValue.slice(-1);
        if (/[\+\-\*\/\^]/.test(lastChar)) {
            displayValue = displayValue.slice(0, -1);
        }

        // Use Number() to avoid security issues with eval
        let result = eval(displayValue);
        
        // Check if the result is a finite number
        if (!isFinite(result)) {
            throw new Error('Infinity or NaN');
        }

        // Format the result to handle decimal values
        result = result.toFixed(10).replace(/\.?0+$/, '');

        displayValue = result;
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
    document.getElementById('display').classList.toggle('light-theme', !isDarkTheme);
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.toggle('light-theme', !isDarkTheme);
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('light-theme', !isDarkTheme);
    });
}

// Keyboard event handling
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Check if the pressed key is a number, operator, or special character
    if (/\d|\+|\-|\*|\/|\^|\(|\)/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});

// Prevent default behavior for certain keys to avoid unwanted actions
document.addEventListener('keydown', function(event) {
    const preventDefaultKeys = ['/', '*', '-', '+', '^', 'Backspace'];
    if (preventDefaultKeys.includes(event.key)) {
        event.preventDefault();
    }
});

function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

let displayValue = '0';
let isDarkTheme = true;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    try {
        displayValue = eval(displayValue).toString();
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
    } else if (key === 'c' || key === 'C') {
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

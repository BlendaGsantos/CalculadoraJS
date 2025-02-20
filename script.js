function appendNumber(number) {
    document.getElementById('display').value += number;
}

function appendOperation(operation) {
    document.getElementById('display').value += ' ' + operation + ' ';
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    const result = eval(display.value);
    display.value = result;
}

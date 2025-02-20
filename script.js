function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
}

function appendOperation(operation) {
    const display = document.getElementById('display');
    const currentValue = display.value.trim();

    if (currentValue === '' || isOperator(currentValue.slice(-1))) {
        return;
    }

    display.value += ' ' + operation + ' ';
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value.trim();

    if (expression === '') {
        display.value = 'Operação impossível';
        return;
    }

    expression = expression.replace(/\s+/g, ''); 

    if (!isValidExpression(expression)) {
        display.value = 'Valor inválido';
        return;
    }

    try {
        const result = calculate(expression); 

        if (isNaN(result)) {
            display.value = 'Não dá para dividir por zero';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Operação impossível'; 
    }
}

function isOperator(character) {
    return ['+', '-', '*', '/'].includes(character);
}

function isValidExpression(expression) {
    const validExpression = /^[0-9+\-*/\s]+$/;
    return validExpression.test(expression);
}

function calculate(expression) {
    const operator = findOperator(expression);
    const [firstOperand, secondOperand] = expression.split(operator).map(Number);

    if (operator === '/' && secondOperand === 0) {
        return NaN;
    }

    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            throw new Error('Operação inválida');
    }
}

function findOperator(expression) {
    if (expression.includes('+')) return '+';
    if (expression.includes('-')) return '-';
    if (expression.includes('*')) return '*';
    if (expression.includes('/')) return '/';
    throw new Error('Operador não encontrado');
}

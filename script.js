function appendNumber(number) {
    const display = document.getElementById('display');
    if (['Operação inválida', 'Valor inválido', 'Não dá para dividir por zero'].includes(display.value)) {
        display.value = '';  
    }
    display.value += number;
}

function appendOperation(operation) {
    const display = document.getElementById('display');
    const currentValue = display.value.trim();

    if (['Operação inválida', 'Valor inválido', 'Não dá para dividir por zero'].includes(display.value)) {
        display.value = '';  
    }

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

    if (expression === '' || isOperator(expression.slice(-1))) {
        display.value = 'Operação inválida';
        return;
    }

    expression = expression.replace(/\s+/g, '');

    if (!isValidExpression(expression)) {
        display.value = 'Valor inválido';
        return;
    }

    try {
        const result = evaluateExpression(expression);

        if (isNaN(result) || result === Infinity || result === -Infinity) {
            display.value = 'Não dá para dividir por zero';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Operação inválida';
    }
}

function isOperator(character) {
    return ['+', '-', '*', '/'].includes(character);
}

function isValidExpression(expression) {
    const validExpression = /^[0-9+\-*/\s]+$/;
    return validExpression.test(expression) && !isOperator(expression.slice(-1));
}

function evaluateExpression(expression) {
    const operators = expression.match(/[+\-*/]/g);
    const operands = expression.split(/[+\-*/]/).map(Number);

    while (operators.includes('*') || operators.includes('/')) {
        const index = operators.findIndex(op => op === '*' || op === '/');
        const operator = operators[index];
        const [left, right] = [operands[index], operands[index + 1]];

        if (operator === '/' && right === 0) {
            return NaN;  
        }

        const result = operator === '*' ? left * right : left / right;
        operands.splice(index, 2, result);
        operators.splice(index, 1);
    }

    while (operators.length > 0) {
        const operator = operators.shift();
        const [left, right] = [operands.shift(), operands.shift()];
        const result = operator === '+' ? left + right : left - right;
        operands.unshift(result);
    }

    return operands[0];
}

function applyOperator(left, right, operator) {
    switch (operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return right === 0 ? NaN : left / right;
        default: throw new Error('Operação inválida');
    }
}

const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');

const buttonPoint = document.querySelector('#point');
const buttonReset = document.querySelector('#reset');
const buttonBackspace = document.querySelector('#backspace');

const result = document.querySelector('#result');

let value = "0";
let keepValue;
let arrayOfValues = [];

const showResult = (num) => {
    let buttonText = num.target.innerText;

    if (value === "0") {
        value = '';
    }

    value += buttonText;
    result.innerText = value;
}

const calculations = (num) => {
    let operator = num.target.innerText;

    switch (operator) {
        case '+':
            keepValue = value;
            value = '0';
            result.innerText = value;
            arrayOfValues.push(keepValue);
            arrayOfValues.push('+');
            break;
        case '−':
            keepValue = value;
            value = '0';
            result.innerText = value;
            arrayOfValues.push(keepValue);
            arrayOfValues.push('-');
            break;
        case '×':
            keepValue = value;
            value = '0';
            result.innerText = value;
            arrayOfValues.push(keepValue);
            arrayOfValues.push('*');
            break;
        case '÷':
            keepValue = value;
            value = '0';
            result.innerText = value;
            arrayOfValues.push(keepValue);
            arrayOfValues.push('/');
            break;
        case '=':
            arrayOfValues.push(value);
            let evaluation = eval(arrayOfValues.join(' '));
            value = evaluation + '';
            result.innerText = value;
            arrayOfValues = [];
            break;
        default:
            break;
    }
}

numbers.forEach(number => {
    number.addEventListener('click', showResult)
})

operations.forEach(operation => {
    operation.addEventListener('click', calculations)
})

buttonReset.addEventListener('click', () => {
    value = '0';
    keepValue = undefined;
    arrayOfValues = [];
    result.innerHTML = value;
});

buttonBackspace.addEventListener('click', () => {
    let lengthOfValue = value.length;
    value = value.slice(0, lengthOfValue - 1);
    result.innerText = value;
    if (value === '') {
        value = '0'
    }
});

buttonPoint.addEventListener('click', () => {
    if (!value.includes('.')) {
        value += '.';
        result.innerText = value;
    }
});
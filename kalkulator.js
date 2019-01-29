const numbers = document.querySelectorAll('.number'); //pobranie wszystkich przecisków z cyframi
const operations = document.querySelectorAll('.operator'); //pobranie wszyskich przecisków funkcyjnych

const buttonPoint = document.querySelector('#point');
const buttonReset = document.querySelector('#reset');
const buttonBackspace = document.querySelector('#backspace');

const prevResult = document.querySelector('#previous__result'); //historia wprowadzonych obliczeń
const result = document.querySelector('#result'); //miejsce wyświetlania wyniku

let value = "0"; //wyświetlana zawartość
let keepValue; //przechowywana zawartość poprzedniego przycisku;
let arrayOfValues = []; //przechowywana tablica z pobranymi wartościami ze wszystkich przycisków

const showResult = (num) => {
    let buttonText = num.target.innerText;

    if (value === "0")
        value = ''; //jeżeli jest 0 i wcisnę jeden to nie chcę widzieć tego zero

    value += buttonText; //do zmiennej wyświetlającej zawatość jest dodawany tekst z przycisku
    result.innerText = value; //wyświetlany wynik     
}

const calculations = function (num) {
    let operator = num.target.innerText; //przechowujemy tekst z operatora

    if(operator == '+')  {
        keepValue = value; //wcześniejsza wartość = wyświetlana wartość
        prevResult.innerText += value + operator;
        value = ''; //po kliknięciu wartość znika i przechodzi do historii            
        result.innerText = value; // aktualizujemy wyświetlaną wartość
        arrayOfValues.push(keepValue); //dodajemy watość do tablicy
        arrayOfValues.push('+'); //dodajemy operator do tablicy
        // if(arrayOfValues[arrayOfValues.length-1] == '-') {
        //     // arrayOfValues[arrayOfValues.length-1] = "+";
        //     arrayOfValues = [];            
        // }
    } else if (operator == '-') {
        keepValue = value;
        prevResult.innerText += value + operator;
        value = '';
        result.innerText = value;
        arrayOfValues.push(keepValue);
        arrayOfValues.push('-');
    } else if (operator == 'x') {
        keepValue = value;
        prevResult.innerText = value + operator;
        value = '';
        result.innerText += value;
        arrayOfValues.push(keepValue);
        arrayOfValues.push('*');
    } else if (operator == '/') {
        keepValue += value;
        prevResult.innerText = value + operator;
        value = '';
        result.innerText = value;
        arrayOfValues.push(keepValue);
        arrayOfValues.push('/');
    } else if (operator == '=') {
        arrayOfValues.push(value);
        let evaluation = eval(arrayOfValues.join(' ')); //obliczamy wynik z połączonej tablicy
        value = evaluation + '';
        result.innerText = value;
        arrayOfValues = []; //po podaniu wyniku czyścimy tablicę
        prevResult.innerText = '';
    }
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', showResult);
}
for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', calculations);
}

buttonReset.addEventListener('click', () => {
    value = '';
    prevResult.innerText = '';
    keepValue = undefined;
    arrayOfValues = [];
    result.innerHTML = value;
});

buttonBackspace.addEventListener('click', () => {
    let lengthOfvalue = value.length; //długość tablicy z przechowywanymi warościami zapisujemy do zmiennej
    let lengthOfHistoryVal = prevResult.length
    value = value.slice(0, lengthOfvalue - 1); //usuwamy ostatnią wprowadzoną cyfrę
    result.innerText = value;
    value = value.slice(0, lengthOfvalue - 1);
    prevResult.innerText = value;
    // prevResult.innerText += value; 
});

buttonPoint.addEventListener('click', () => {
    if (!value.includes('.')) //jeżeli przechowywana wartość nie zawiera kropki
        value += '.'; //dodaj kropkę
    result.innerText = value; // wyświetlany wynik razem z kropką
});
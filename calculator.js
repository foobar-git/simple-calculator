'use strict'

let c = 0;
let n = 0;
let m = 0;
let number1;
let number2;
let input;
let result;
let operation = '';
let clear = true;
let bin = false;        // binary mode

function FnDisableNumbers (f) { // go through buttons (numbers) and disable them
    document.getElementById('btnDot').disabled = f;
    for (let i = 9; i > 1; i--) document.getElementById('btn'+i).disabled = f;
}

function FnBin () { // switch to binary notation
    if (!bin) {
        bin = true;
        document.getElementById('status').innerHTML = "BIN";
        // and if only a number given as input, convert to binary
        if (operation == '') {
            m = document.getElementById('res').innerHTML;
            input = parseInt(m, 10).toString(2);
            document.getElementById('res').innerHTML = input;
        }
        // if given a number and a mathematical operation, clear only
        else {
            c = 0;
            FnClear();
        }
        FnDisableNumbers(true);
    }
    else { // switch back to decimal notation
        bin = false;
        document.getElementById('status').innerHTML = "DEC";
        document.getElementById('res').innerHTML = m;
        FnDisableNumbers(false);
    }
    c = 0;
}

function FnDecimalDot () {
    document.getElementById('res').innerHTML += '.';
}

function FnClear () {
    c++;
    clear = true;
    operation = '';
    if (c >= 2) {       // C++ easter egg
        document.getElementById('res').innerHTML = 'C++';
        c = 0;
    }
    else document.getElementById('res').innerHTML = '0';
}

function FnOperation (op) {
    c = 0;
    operation = op;
    document.getElementById('res').innerHTML += operation;
}

function FnEql () {
    c = 0;
    input = document.getElementById('res').innerHTML;
    input = input.split(operation);
    number1 = input[0];
    number2 = input[1];
    if (operation == '') return null;
    else document.getElementById('res').innerHTML = FnCalc(operation, number1, number2);
}

function FnNumber (i) {
    c = 0;
    if (clear) {
        document.getElementById('res').innerHTML = i;
        clear = false;
    }
    else document.getElementById('res').innerHTML += i;
}

function FnCalc (op, n1, n2) {
    if (!bin) {         // Decimal operations
        switch (op) {
            case '+':
                result = (parseFloat(n1) + parseFloat(n2));
                break;
            case '-':
                result = (parseFloat(n1) - parseFloat(n2));
                break;
            case '*':
                result = (parseFloat(n1) * parseFloat(n2));
                break;
            case '/':
                result = (parseFloat(n1) / parseFloat(n2));
                break;
            default:
                return null;
        }
    }

    else {              // Binary operations
        switch (op) {
            case '+':
                result = (parseInt(n1, 2) + parseInt(n2, 2)).toString(2);
                break;
            case '-':
                result = (parseInt(n1, 2) - parseInt(n2, 2)).toString(2);
                break;
            case '*':
                result = (parseInt(n1, 2) * parseInt(n2, 2)).toString(2);
                break;
            case '/':
                result = (parseInt(n1, 2) / parseInt(n2, 2)).toString(2);
                break;
            default:
                return null;
        }
    }

    return result;
}

function FnMathFunctions (p) {
    if (operation == '') {
        input = document.getElementById('res').innerHTML;
        input = parseInt(input, 10);
        switch (p) {
            case 'sum':
                document.getElementById('res').innerHTML = FnSummation(input);
                break;
            case 'fac':
                document.getElementById('res').innerHTML = FnFactorial(input);
                break;
            case 'exp2':
                document.getElementById('res').innerHTML = FnExponentiation(input, 2);
                break;
            case 'exp3':
                document.getElementById('res').innerHTML = FnExponentiation(input, 3);
                break;
            case 'sqrt':
                document.getElementById('res').innerHTML = Math.sqrt(input);
                break;
            case 'overx':
                document.getElementById('res').innerHTML = 1/input;
                break;
            default:
                return null;
        }
    }
    else FnClear();
}

function FnSummation (n) {
    return n <= 0 ? 0 : n + FnSummation(n-1);
}

function FnFactorial (n) {
    return n <= 0 ? 1 : n * FnFactorial(n-1);
}

function FnExponentiation (m, n) {  // hardcoded (can be changed)
    return n <= 0 ? 1 : m * FnExponentiation(m, n-1);
}
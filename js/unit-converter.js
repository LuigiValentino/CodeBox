const decimalInput = document.getElementById('decimalInput');
const binaryInput = document.getElementById('binaryInput');
const octalInput = document.getElementById('octalInput');
const hexInput = document.getElementById('hexInput');
const clearButton = document.getElementById('clearButton');

function convertFromDecimal(decimalValue) {
    binaryInput.value = parseInt(decimalValue, 10).toString(2);
    octalInput.value = parseInt(decimalValue, 10).toString(8);
    hexInput.value = parseInt(decimalValue, 10).toString(16).toUpperCase();
}

function convertFromBinary(binaryValue) {
    const decimal = parseInt(binaryValue, 2);
    if (!isNaN(decimal)) {
        decimalInput.value = decimal;
        convertFromDecimal(decimal);
    }
}

function convertFromOctal(octalValue) {
    const decimal = parseInt(octalValue, 8);
    if (!isNaN(decimal)) {
        decimalInput.value = decimal;
        convertFromDecimal(decimal);
    }
}

function convertFromHex(hexValue) {
    const decimal = parseInt(hexValue, 16);
    if (!isNaN(decimal)) {
        decimalInput.value = decimal;
        convertFromDecimal(decimal);
    }
}

decimalInput.addEventListener('input', function() {
    if (decimalInput.value) {
        convertFromDecimal(decimalInput.value);
    } else {
        clearInputs();
    }
});

binaryInput.addEventListener('input', function() {
    if (binaryInput.value) {
        convertFromBinary(binaryInput.value);
    } else {
        clearInputs();
    }
});

octalInput.addEventListener('input', function() {
    if (octalInput.value) {
        convertFromOctal(octalInput.value);
    } else {
        clearInputs();
    }
});

hexInput.addEventListener('input', function() {
    if (hexInput.value) {
        convertFromHex(hexInput.value);
    } else {
        clearInputs();
    }
});

clearButton.addEventListener('click', function() {
    clearInputs();
});

function clearInputs() {
    decimalInput.value = '';
    binaryInput.value = '';
    octalInput.value = '';
    hexInput.value = '';
}

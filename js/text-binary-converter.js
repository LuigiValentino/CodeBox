const textInput = document.getElementById('textInput');
const binaryInput = document.getElementById('binaryInput');
let isUpdating = false;  

function textToBinary(text) {
    return text.split('').map(function(char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(function(bin) {
        return String.fromCharCode(parseInt(bin, 2));
    }).join('');
}

textInput.addEventListener('input', function() {
    if (isUpdating) return; 
    isUpdating = true;

    const text = textInput.value;

    if (text.trim() === "") {
        binaryInput.value = "";
        isUpdating = false;
        return;
    }

    binaryInput.value = textToBinary(text);
    isUpdating = false;
});

binaryInput.addEventListener('input', function() {
    if (isUpdating) return; 
    isUpdating = true;

    const binary = binaryInput.value.trim();

    if (binary === "") {
        textInput.value = "";
        isUpdating = false;
        return;
    }

    if (/^[01 ]+$/.test(binary)) {
        try {
            textInput.value = binaryToText(binary);
        } catch (e) {
            textInput.value = "Error: Formato binario inválido.";
        }
    } else {
        textInput.value = "Error: Solo se permite binario (0 y 1).";
    }

    isUpdating = false;
});

function clearFields() {
    textInput.value = "";
    binaryInput.value = "";
}

const regexInput = document.getElementById('regexInput');
const flagsInput = document.getElementById('flagsInput');
const textInput = document.getElementById('textInput');
const outputDiv = document.getElementById('output');

regexInput.addEventListener('input', updateRegexMatches);
flagsInput.addEventListener('input', updateRegexMatches);
textInput.addEventListener('input', updateRegexMatches);

function updateRegexMatches() {
    const regexText = regexInput.value;
    const flags = flagsInput.value;
    const text = textInput.value;
    if (!regexText) {
        outputDiv.innerHTML = text;
        return;
    }

    try {
        const regex = new RegExp(regexText, flags);
        const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
        outputDiv.innerHTML = highlightedText;
    } catch (e) {
        outputDiv.innerHTML = `<span class="text-red-600">Error en la expresión regular: ${e.message}</span>`;
    }
}

function clearFields() {
    regexInput.value = "";
    flagsInput.value = "";
    textInput.value = "";
    outputDiv.innerHTML = "";
}

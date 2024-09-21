function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charset = '';
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

const passwordLength = document.getElementById('passwordLength');
const includeLowercase = document.getElementById('includeLowercase');
const includeUppercase = document.getElementById('includeUppercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generatedPassword = document.getElementById('generatedPassword');
const generateButton = document.getElementById('generateButton');
const clearButton = document.getElementById('clearButton');
const copyButton = document.getElementById('copyButton');

generateButton.addEventListener('click', function() {
    const length = parseInt(passwordLength.value);
    const hasLowercase = includeLowercase.checked;
    const hasUppercase = includeUppercase.checked;
    const hasNumbers = includeNumbers.checked;
    const hasSymbols = includeSymbols.checked;

    if (!hasLowercase && !hasUppercase && !hasNumbers && !hasSymbols) {
        alert('Selecciona al menos una opción para incluir en la contraseña.');
        return;
    }

    const password = generatePassword(length, hasLowercase, hasUppercase, hasNumbers, hasSymbols);
    generatedPassword.value = password;
});

clearButton.addEventListener('click', function() {
    passwordLength.value = '12';
    includeLowercase.checked = true;
    includeUppercase.checked = true;
    includeNumbers.checked = true;
    includeSymbols.checked = true;
    generatedPassword.value = '';
});

copyButton.addEventListener('click', function() {
    if (generatedPassword.value !== '') {
        generatedPassword.select();
        document.execCommand('copy');
        alert('Contraseña copiada al portapapeles.');
    } else {
        alert('No hay contraseña generada para copiar.');
    }
});

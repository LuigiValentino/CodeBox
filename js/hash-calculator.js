function calculateHash(data, type) {
    switch (type) {
        case 'MD5':
            return CryptoJS.MD5(data).toString();
        case 'SHA-1':
            return CryptoJS.SHA1(data).toString();
        case 'SHA-256':
            return CryptoJS.SHA256(data).toString();
        case 'SHA-512':
            return CryptoJS.SHA512(data).toString();
        default:
            return '';
    }
}

const hashType = document.getElementById('hashType');
const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const hashResult = document.getElementById('hashResult');
const clearButton = document.getElementById('clearButton');

textInput.addEventListener('input', function() {
    const hash = calculateHash(textInput.value, hashType.value);
    hashResult.value = hash;
});

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileData = e.target.result;
            const hash = calculateHash(CryptoJS.enc.Latin1.parse(fileData), hashType.value);
            hashResult.value = hash;
        };
        reader.readAsBinaryString(file); 
    }
});

clearButton.addEventListener('click', function() {
    textInput.value = '';
    fileInput.value = '';
    hashResult.value = '';
});

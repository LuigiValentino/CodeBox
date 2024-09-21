const qrType = document.getElementById('qrType');
const qrTextInputContainer = document.getElementById('qrTextInputContainer');
const qrTextInput = document.getElementById('qrTextInput');
const qrWifiInputContainer = document.getElementById('qrWifiInputContainer');
const wifiSSID = document.getElementById('wifiSSID');
const wifiPassword = document.getElementById('wifiPassword');
const wifiEncryption = document.getElementById('wifiEncryption');
const qrCanvas = document.getElementById('qrCanvas');
const generateButton = document.getElementById('generateButton');
const downloadButton = document.getElementById('downloadButton');

qrType.addEventListener('change', function() {
    const selectedType = qrType.value;

    if (selectedType === 'wifi') {
        qrTextInputContainer.classList.add('hidden');
        qrWifiInputContainer.classList.remove('hidden');
    } else {
        qrTextInputContainer.classList.remove('hidden');
        qrWifiInputContainer.classList.add('hidden');
    }
});

generateButton.addEventListener('click', function() {
    const selectedType = qrType.value;
    let qrData = '';

    if (selectedType === 'url' || selectedType === 'text') {
        qrData = qrTextInput.value;
    } else if (selectedType === 'wifi') {
        const ssid = wifiSSID.value;
        const password = wifiPassword.value;
        const encryption = wifiEncryption.value;
        qrData = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
    }

    QRCode.toCanvas(qrCanvas, qrData, { width: 200 }, function(error) {
        if (error) console.error(error);
        else {
            downloadButton.classList.remove('hidden');
        }
    });
});

downloadButton.addEventListener('click', function() {
    const canvas = qrCanvas;
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    const link = document.createElement('a');
    link.href = image;
    link.download = 'codigo-qr.png';
    link.click();
});

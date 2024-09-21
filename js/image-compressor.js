const fileInput = document.getElementById('fileInput');
const qualityInput = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const imageCanvas = document.getElementById('imageCanvas');
const downloadButton = document.getElementById('downloadButton');

let imageFile = null;
let compressedImageDataUrl = null;


qualityInput.addEventListener('input', function() {
    qualityValue.textContent = `Calidad: ${qualityInput.value}%`;
    if (imageFile) {
        compressImageInRealTime(); 
    }
});

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const ctx = imageCanvas.getContext('2d');
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                imageFile = img;
                compressImageInRealTime(); 
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function compressImageInRealTime() {
    if (imageFile) {
        const canvas = imageCanvas;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageFile, 0, 0);

        compressedImageDataUrl = canvas.toDataURL('image/jpeg', qualityInput.value / 100);

        const img = new Image();
        img.src = compressedImageDataUrl;
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            downloadButton.classList.remove('hidden'); 
        };
    }
}

downloadButton.addEventListener('click', function() {
    if (compressedImageDataUrl) {
        const link = document.createElement('a');
        link.href = compressedImageDataUrl;
        link.download = 'imagen-comprimida.jpg';
        link.click();
    }
});

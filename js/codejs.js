const htmlInput = document.getElementById('html');
const cssInput = document.getElementById('css');
const jsInput = document.getElementById('js');
const outputFrame = document.getElementById('output');

htmlInput.addEventListener('input', updateOutput);
cssInput.addEventListener('input', updateOutput);
jsInput.addEventListener('input', updateOutput);

function updateOutput() {
    const htmlCode = htmlInput.value;
    const cssCode = `<style>${cssInput.value}</style>`;
    const jsCode = `<script>${jsInput.value}<\/script>`;

    const fullCode = `
        ${htmlCode}
        ${cssCode}
        ${jsCode}
    `;

    const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
    outputDocument.open();
    outputDocument.write(fullCode);
    outputDocument.close();
}

document.addEventListener('DOMContentLoaded', () => {
    htmlInput.value = `<h1>¡Hola, mundo!</h1>`;
    cssInput.value = `h1 { color: blue; text-align: center; }`;
    jsInput.value = `console.log("Hola desde JavaScript!");`;

    updateOutput(); 
});

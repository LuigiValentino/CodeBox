const jsonInput = document.getElementById('jsonInput');
const jsonError = document.getElementById('jsonError');

function validateJson() {
    try {
        JSON.parse(jsonInput.value);
        jsonError.classList.add('hidden');
        alert('¡El JSON es válido!');
    } catch (e) {
        jsonError.textContent = `Error: ${e.message}`;
        jsonError.classList.remove('hidden');
    }
}

function formatJson() {
    try {
        const parsedJson = JSON.parse(jsonInput.value);
        const formattedJson = JSON.stringify(parsedJson, null, 4);
        jsonInput.value = formattedJson;
        jsonError.classList.add('hidden');
    } catch (e) {
        jsonError.textContent = `Error: ${e.message}`;
        jsonError.classList.remove('hidden');
    }
}

function downloadJson() {
    try {
        const parsedJson = JSON.parse(jsonInput.value);
        const formattedJson = JSON.stringify(parsedJson, null, 4);
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'mi-json.json';
        a.click();
        jsonError.classList.add('hidden');
    } catch (e) {
        jsonError.textContent = `Error: ${e.message}`;
        jsonError.classList.remove('hidden');
    }
}

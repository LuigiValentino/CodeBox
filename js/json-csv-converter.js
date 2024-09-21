function jsonToCsv(jsonData) {
    try {
        const jsonParsed = JSON.parse(jsonData);
        const headers = Object.keys(jsonParsed[0]);
        const csvRows = [];

        csvRows.push(headers.join(','));

        jsonParsed.forEach(row => {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    } catch (error) {
        return `Error al convertir JSON a CSV: ${error.message}`;
    }
}

function csvToJson(csvData) {
    try {
        const [headers, ...rows] = csvData.split('\n').map(row => row.split(','));
        const jsonArray = rows.map(row => {
            const jsonObject = {};
            row.forEach((value, index) => {
                jsonObject[headers[index]] = value.replace(/"/g, ''); 
            });
            return jsonObject;
        });
        return JSON.stringify(jsonArray, null, 2);
    } catch (error) {
        return `Error al convertir CSV a JSON: ${error.message}`;
    }
}

const jsonInput = document.getElementById('jsonInput');
const csvInput = document.getElementById('csvInput');
const clearButton = document.getElementById('clearButton');

jsonInput.addEventListener('input', function() {
    if (jsonInput.value.trim() !== '') {
        const csvData = jsonToCsv(jsonInput.value);
        csvInput.value = csvData;
    }
});

csvInput.addEventListener('input', function() {
    if (csvInput.value.trim() !== '') {
        const jsonData = csvToJson(csvInput.value);
        jsonInput.value = jsonData;
    }
});

clearButton.addEventListener('click', function() {
    jsonInput.value = '';
    csvInput.value = '';
});

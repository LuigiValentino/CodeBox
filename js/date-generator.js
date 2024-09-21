function getFormattedDates(date) {
    const unixTimestamp = Math.floor(date.getTime() / 1000); 
    const iso8601 = date.toISOString(); 
    const readableDate = date.toDateString(); 
    const rfc2822 = date.toUTCString(); 

    return `Fecha legible: ${readableDate}\nISO 8601: ${iso8601}\nUNIX Timestamp: ${unixTimestamp}\nRFC 2822: ${rfc2822}`;
}

const dateInput = document.getElementById('dateInput');
const resultOutput = document.getElementById('resultOutput');
const currentDateButton = document.getElementById('currentDateButton');
const clearButton = document.getElementById('clearButton');

dateInput.addEventListener('input', function() {
    const inputDate = dateInput.value ? new Date(dateInput.value) : null;

    if (inputDate) {
        const formattedDates = getFormattedDates(inputDate);
        resultOutput.value = formattedDates;
    } else {
        resultOutput.value = '';
    }
});

currentDateButton.addEventListener('click', function() {
    const currentDate = new Date();
    dateInput.value = currentDate.toISOString().substring(0, 16); 
    const formattedDates = getFormattedDates(currentDate);
    resultOutput.value = formattedDates;
});


clearButton.addEventListener('click', function() {
    dateInput.value = '';
    resultOutput.value = '';
});

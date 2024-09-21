    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    const pageKeywords = document.getElementById('pageKeywords');
    const pageAuthor = document.getElementById('pageAuthor');
    const viewport = document.getElementById('viewport');
    const metaTagResult = document.getElementById('metaTagResult');
    const generateButton = document.getElementById('generateButton');
    const clearButton = document.getElementById('clearButton');

        generateButton.addEventListener('click', function() {
            const titleTag = `<title>${pageTitle.value}</title>\n`;
            const descriptionTag = `<meta name="description" content="${pageDescription.value}">\n`;
            const keywordsTag = `<meta name="keywords" content="${pageKeywords.value}">\n`;
            const authorTag = `<meta name="author" content="${pageAuthor.value}">\n`;
            const viewportTag = `<meta name="viewport" content="${viewport.value}">\n`;

            metaTagResult.textContent = `${titleTag}${descriptionTag}${keywordsTag}${authorTag}${viewportTag}`;
        });

        clearButton.addEventListener('click', function() {
            pageTitle.value = '';
            pageDescription.value = '';
            pageKeywords.value = '';
            pageAuthor.value = '';
            viewport.value = 'width=device-width, initial-scale=1.0';
            metaTagResult.textContent = '';
        });
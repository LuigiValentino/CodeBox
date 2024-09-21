function convertColors() {
    const rgbInput = document.getElementById('rgb').value;
    const hexInput = document.getElementById('hex').value;
    const hslInput = document.getElementById('hsl').value;
    const cmykInput = document.getElementById('cmyk').value;

    if (hexInput) {
        const rgb = hexToRgb(hexInput);
        const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
        updateInputs(rgb, hsl, cmyk);
    } else if (rgbInput) {
        const [r, g, b] = rgbInput.split(',').map(Number);
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);
        const cmyk = rgbToCmyk(r, g, b);
        updateInputs([r, g, b], hsl, cmyk, hex);
    } else if (hslInput) {
        const [h, s, l] = hslInput.replace(/[^\d,]/g, '').split(',').map(Number);
        const rgb = hslToRgb(h, s, l);
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
        updateInputs(rgb, [h, s, l], cmyk, hex);
    } else if (cmykInput) {
        const [c, m, y, k] = cmykInput.replace(/[^\d,]/g, '').split(',').map(Number);
        const rgb = cmykToRgb(c, m, y, k);
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        updateInputs(rgb, hsl, [c, m, y, k], hex);
    }
}

function updateInputs(rgb, hsl, cmyk, hex = null) {
    document.getElementById('rgb').value = rgb.join(', ');
    document.getElementById('hsl').value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    document.getElementById('cmyk').value = `${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%`;
    if (hex) {
        document.getElementById('hex').value = hex;
    }
}

document.getElementById('colorPicker').addEventListener('input', function(event) {
    const color = event.target.value;
    document.getElementById('selectedColor').textContent = color;
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
    const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    updateInputs(rgb, hsl, cmyk, color);

    document.getElementById('selectedColorRGB').textContent = rgb.join(', ');
    document.getElementById('selectedColorRGBA').textContent = rgba;
    document.getElementById('selectedColorHex').textContent = color;
    document.getElementById('selectedColorHSL').textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    document.getElementById('selectedColorCMYK').textContent = `${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%`;

    updateColorDetails(color);
});

function updateColorDetails(color) {
    const complementaryColor = getComplementaryColor(color);
    setElementColor(document.getElementById('complementaryColor'), complementaryColor);

    const shades = getShades(color);
    const shadesContainer = document.getElementById('shades');
    shadesContainer.innerHTML = '';
    shades.forEach(shade => {
        const shadeDiv = document.createElement('div');
        setElementColor(shadeDiv, shade);
        shadesContainer.appendChild(shadeDiv);
    });

    const tints = getTints(color);
    const tintsContainer = document.getElementById('tints');
    tintsContainer.innerHTML = '';
    tints.forEach(tint => {
        const tintDiv = document.createElement('div');
        setElementColor(tintDiv, tint);
        tintsContainer.appendChild(tintDiv);
    });

    const analogousColors = getAnalogousColors(color);
    const analogousContainer = document.getElementById('analogousColors');
    analogousContainer.innerHTML = '';
    analogousColors.forEach(analog => {
        const analogDiv = document.createElement('div');
        setElementColor(analogDiv, analog);
        analogousContainer.appendChild(analogDiv);
    });

    const invertedColor = invertColor(color);
    setElementColor(document.getElementById('invertedColor'), invertedColor);

    const colorBlindSim = simulateColorBlindness(color);
    setElementColor(document.getElementById('colorBlindSim'), colorBlindSim);
}

function setElementColor(element, color) {
    element.style.backgroundColor = color;
    element.textContent = color;
    const [r, g, b] = hexToRgb(color);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    element.style.color = luminance > 0.5 ? 'black' : 'white';
    element.className = 'flex items-center justify-center h-10 w-full rounded-lg border text-center font-semibold';
}

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return [r, g, b];
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function cmykToRgb(c, m, y, k) {
    const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
    const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
    const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
    return [r, g, b];
}

function getComplementaryColor(hex) {
    const [r, g, b] = hexToRgb(hex);
    const compColor = rgbToHex(255 - r, 255 - g, 255 - b);
    return compColor;
}

function getShades(hex) {
    const [r, g, b] = hexToRgb(hex);
    const shades = [];
    for (let i = 0.2; i <= 1; i += 0.2) {
        shades.push(rgbToHex(Math.floor(r * i), Math.floor(g * i), Math.floor(b * i)));
    }
    return shades;
}

function getTints(hex) {
    const [r, g, b] = hexToRgb(hex);
    const tints = [];
    for (let i = 0.2; i <= 1; i += 0.2) {
        tints.push(rgbToHex(Math.floor(r + (255 - r) * i), Math.floor(g + (255 - g) * i), Math.floor(b + (255 - b) * i)));
    }
    return tints;
}

function getAnalogousColors(hex) {
    const [h, s, l] = rgbToHsl(...hexToRgb(hex));
    const analogous1 = hslToRgb((h + 30) % 360, s, l);
    const analogous2 = hslToRgb((h - 30 + 360) % 360, s, l);
    return [rgbToHex(...analogous1), rgbToHex(...analogous2)];
}

function invertColor(hex) {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}

function simulateColorBlindness(hex) {
    const [r, g, b] = hexToRgb(hex);
    const newR = r * 0.56667 + g * 0.43333;
    const newG = r * 0.55833 + g * 0.44167;
    const newB = b * 1;
    return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const glitchButton = document.getElementById('glitch-button');
    const glitchSlider = document.getElementById('glitch-slider');
    const sliderLabel = document.getElementById('slider-label');
    const fontSelect = document.getElementById('font-select');

    const GLITCH_MAP = {
        'a': ['а', 'α', 'å', 'ä', 'ą', 'ア', 'ㅏ', 'ค', 'α', 'а', 'א'],
        'b': ['b', 'в', 'ь', 'б', 'β', 'ㅂ', '฿', 'ß', 'ב'],
        'c': ['c', 'с', 'ç', '¢', 'ㄷ', 'כ'],
        'd': ['d', 'ԁ', 'ð', 'δ', 'д', '₫', 'ד'],
        'e': ['e', 'е', 'ё', 'э', 'є', 'ㅌ', '€', 'ヨ', '૯', 'ε', 'е', 'ה'],
        'f': ['f', 'ƒ', 'Ϝ', '₣', 'ㅍ'],
        'g': ['g', 'ġ', 'ğ', 'ģ', 'פ'],
        'h': ['h', 'н', 'ħ', 'ђ', 'н', 'ㅐ', 'ח'],
        'i': ['i', 'і', 'ï', 'ι', 'ί', '丨', 'ן'],
        'j': ['j', 'ј', 'נ'],
        'k': ['k', 'к', 'κ', 'ㅋ', 'ק'],
        'l': ['l', 'і', 'ł', 'ㅣ', 'ן'],
        'm': ['m', 'м', 'ㅆ', 'מ'],
        'n': ['n', 'п', 'η', 'ή', 'л', 'ห', 'ท'],
        'o': ['o', 'о', 'ø', 'ö', 'ο', 'ό', '¤', 'ㅇ', '๏', '๐', 'ס'],
        'p': ['p', 'р', 'ρ', '₱', 'ר'],
        'q': ['q', 'ɋ', '৭'],
        'r': ['r', 'я', 'г', 'Я', '®', 'ㄹ'],
        's': ['s', 'ѕ', 'š', '§', '$', 'ร', 'ى'],
        't': ['t', 'т', 'τ', 'т', 'ㅜ', 'ט'],
        'u': ['u', 'υ', 'ц', 'µ', 'บ', 'ย'],
        'v': ['v', 'ν', 'ѵ', 'ש'],
        'w': ['w', 'ш', 'щ', 'ѡ', 'พ', 'ฟ'],
        'x': ['x', 'х', 'χ', 'ж', '×', 'จ'],
        'y': ['y', 'у', 'ү', 'ұ', 'γ', 'у'],
        'z': ['z', 'ž', 'ż', 'ź', 'ʐ', 'ż', 'ד'],
        'A': ['А', 'Å', 'Ä', 'Ѧ', 'Λ', 'Д'],
        'B': ['В', 'Б', '฿', 'ß'],
        'C': ['С', 'Ç', '¢', '匚'],
        'D': ['D', 'Ð', 'Ď', 'Đ', '刁'],
        'E': ['Е', 'Ё', 'Э', 'Є', 'ㅌ', '€', 'ヨ', 'ᄐ'],
        'F': ['F', 'Ƒ', '₣', '下'],
        'G': ['G', 'Ġ', 'Ģ'],
        'H': ['Н', 'Ħ', 'ђ', 'н', 'ㅐ', '廾'],
        'I': ['I', 'І', 'Ї', '丨'],
        'J': ['J', 'Ј'],
        'K': ['К', 'Ҝ', 'Ҡ', 'ㅈ'],
        'L': ['L', 'Ł', '丨'],
        'M': ['М', '从'],
        'N': ['N', 'П', 'Л'],
        'O': ['O', 'О', 'Ø', 'Ö', '¤', 'ㅇ', 'ㄖ'],
        'P': ['Р', '₽', '尸'],
        'Q': ['Q', 'Ɋ'],
        'R': ['R', 'Я', '®', '尺'],
        'S': ['S', 'Š', '§', '$', '丂'],
        'T': ['Т', 'ㅜ'],
        'U': ['U', 'Ц', 'μ', 'ப'],
        'V': ['V', 'Ѵ', 'ᐯ'],
        'W': ['W', 'Ш', 'Щ', 'Ꮤ'],
        'X': ['X', 'Х', 'Ж', '×', '乂'],
        'Y': ['Y', 'У', 'Ү', 'Ұ'],
        'Z': ['Z', 'Ž', 'Ż', 'Ź'],
        '0': ['O', 'o', 'О', 'ο', '০', 'ଠ', '〇'],
        '1': ['1', 'l', 'I', 'ן', '۱'],
        '2': ['2', 'Ƨ', '২'],
        '3': ['3', 'З', 'з', 'Э', 'э', '੩'],
        '4': ['4', 'Ч', 'ч', 'A'],
        '5': ['5', 'S', 's', 'Ƽ', 'ऽ'],
        '6': ['6', 'b', 'б', 'Ь', 'ь'],
        '7': ['7', 'T', 't', 'Г', 'г'],
        '8': ['8', 'B', 'B', 'Ց'],
        '9': ['9', 'g', 'q', '९'],
        ' ': [' ', '  ', '_'],
        '!': ['¡', '!', '丨'],
        '?': ['¿', '?', 'ʔ'],
        '$': ['§', 'š', 'ร', 'ى', '$$']
    };

    function glitchText(text, level) {
        let glitched = '';
        for (const char of text) {
            const lowerChar = char.toLowerCase();
            if (GLITCH_MAP[char] && Math.random() < level) {
                const substitutes = GLITCH_MAP[char];
                glitched += substitutes[Math.floor(Math.random() * substitutes.length)];
            } else if (GLITCH_MAP[lowerChar] && Math.random() < level) {
                const substitutes = GLITCH_MAP[lowerChar];
                glitched += substitutes[Math.floor(Math.random() * substitutes.length)];
            } else {
                glitched += char;
            }
        }
        return glitched;
    }

    glitchButton.addEventListener('click', () => {
        const level = glitchSlider.value / 100;
        outputText.value = glitchText(inputText.value, level);
    });

    glitchSlider.addEventListener('input', () => {
        sliderLabel.textContent = `Glitch Level: ${glitchSlider.value}%`;
    });

    fontSelect.addEventListener('change', (e) => {
        document.body.style.fontFamily = e.target.value;
    });

    // Set initial font
    document.body.style.fontFamily = fontSelect.value;
});

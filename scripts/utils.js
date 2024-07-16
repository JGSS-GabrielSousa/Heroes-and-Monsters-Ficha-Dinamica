export function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function rollDice(formula) {
    const [numDice, numFaces, bonus] = formula.split(/[d\+]/).map(Number);
  
    const rollTotal = Array.from({ length: numDice }, () => Math.floor(Math.random() * numFaces) + 1)
                         .reduce((sum, val) => sum + val, 0);
  
    return rollTotal + bonus;
}

export function shuffleArr(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function roundToMultiple(number, multiple) {
    if (multiple === 0) {
        return number;
    }

    const quotient = Math.floor(number / multiple);
    const remainder = number % multiple;
    const differenceToNextMultiple = multiple - remainder;

    const rounding = (remainder < differenceToNextMultiple) ? -remainder : differenceToNextMultiple;

    return number + rounding;
}

export function blankSpaceRmv(string){
    return string.replace(/\s/g, "_");
}

export function genID(string){
    string = string.replace(/\s/g, "-");
    string = string.replace(/\./g, "-");
    string = string.replace(/'/g, "-");
    string = accentsTidy(string);
    return string;
}

export function accentsTidy(string){
    let r = string.toLowerCase();
    const non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    
    for(let i in non_asciis){
        r = r.replace(new RegExp(non_asciis[i], 'g'), i);
    }

    return r;
}

export function loadHTMLContent(url, selector) {
    fetch("./views/" + url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo: ', error);
        });
}
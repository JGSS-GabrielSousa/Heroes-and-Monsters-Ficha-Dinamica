export function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
    setTimeout(e => {
        fetch("./views/" + url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar o conteúdo: ', url);

                setTimeout(e => {
                    loadHTMLContent(url, selector);
                }, rand(0,1000))
            });
    }, rand(0,1000));
}


export function rollDice(diceString) {
    
    /*
    export function rollDice(formula) {
        const [numDice, numFaces, bonus] = formula.split(/[d\+]/).map(Number);
    
        const rollTotal = Array.from({ length: numDice }, () => Math.floor(Math.random() * numFaces) + 1)
                            .reduce((sum, val) => sum + val, 0);
    
        return rollTotal + bonus;
    }*/

    function rollDiceFunc(diceString){
        function diceRoll(sides) {
            return Math.floor(Math.random() * sides) + 1;
        }

        function rollSingleDiceExpression(expression) {
            const regex = /(\d*)d(\d+)(\+\d+)?/;
            const matches = expression.match(regex);
            const roll = [];
            roll.subroll = [];

            if (matches) {
                const count = matches[1] ? parseInt(matches[1]) : 1; // Quantidade de dados
                const sides = parseInt(matches[2]); // Lados do dado
                const modifier = matches[3] ? parseInt(matches[3]) : 0; // Modificador adicional

                let total = 0;

                for (let i = 0; i < count; i++) {
                    const rollValue = diceRoll(sides);
                    
                    const subroll = {
                        roll: 0,
                        sides: 0,
                    }

                    subroll.sides = sides;
                    subroll.roll = rollValue;

                    roll.subroll.push(subroll);

                    total += rollValue;
                }

                roll.expression = matches.input;
                roll.modifier = modifier;
                roll.total = total+modifier;

                total += modifier;

                return roll;

            } else {
                throw new Error("Invalid dice expression format");
            }
        }

        const diceExpressions = diceString.split(' + ');

        const results = diceExpressions.map(rollSingleDiceExpression);

        return {results, total: results.reduce((total, roll) => total + roll.total, 0)};
    }

    const damageString = "d20"+diceString;
    const roll = rollDiceFunc(damageString);
    let html = ``;
    html += `<table class="roll-table">`

    roll.results.forEach(result => {
        
        html += `
        <tr>
            <td>${result.expression}:</td>
            <td>(
        `

        for (let i = 0; i < result.subroll.length; i++) {
            const r = result.subroll[i];
            
            html += `
                ${r.roll}
            `

            if(i+1 < result.subroll.length){
                html += ` + `
            }
            else if(result.modifier != 0) {
                html += `) + ${result.modifier}`
            }
            else {
                html += `)`
            }
        }

        html += `
                <td>=</td>
                <td><b>${result.total}</b></td>
            <tr>
        `
    });


    Swal.fire({
        html: `
            ${html}
            <h1>${roll.total}</h1>
        `,
        showCloseButton: true,
        focusConfirm: false,
    });
}
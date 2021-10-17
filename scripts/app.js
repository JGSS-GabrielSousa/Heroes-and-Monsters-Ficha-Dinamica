const characterName = document.getElementById("character-name");
const characterRace = document.getElementById("race-select");
const characterBackground = document.getElementById("background-select");
const characterClass = document.getElementById("class-select");
const characterSubClass = document.getElementById("subclass-select");

const subraceBackup = document.getElementById("subrace-element").innerHTML;
const subclassBackup = document.getElementById("subclass-element").innerHTML;

const player = {
    name: "",
    race: "",
    background: "",
    alignment: "",
    classes: [],
    level: 0
};


let classPreSelected = false;
function addClass(){
    let level = document.querySelector("#class-level");
    level.value = level.value.replace(/[^0-9]/g, '');
    
    const selectedClass = characterClass.options[characterClass.selectedIndex].text;

    if(characterClass.selectedIndex == 0 || level.value == "" || parseInt(level.value) <= 0){
        return;
    }

    if(!classPreSelected){
        if(parseInt(level.value) > subclasses["availableAt"][selectedClass] && subclasses["availableAt"][selectedClass] > 0){
            document.querySelector("#subclass-element").style.display = "inline-block";
            classPreSelected = true;
            characterClass.setAttribute("disabled", "");
            level.setAttribute("disabled", "");
            
            for(let i = 0; i < subclasses["subclasses"][selectedClass].length; i++){
                const option = document.createElement("option");
                option.value = subclasses["subclasses"][selectedClass][i];
                option.innerHTML = subclasses["subclasses"][selectedClass][i];
                document.getElementById("subclass-select").appendChild(option);
            }
        }
        else{
            addClassToClassTable(
                selectedClass,
                "",
                level.value
            );            
        }
    }
    else{
        if(characterSubClass.value != "null"){
            addClassToClassTable(
                characterClass.options[characterClass.selectedIndex].text,
                document.getElementById("subclass-select").options[document.getElementById("subclass-select").selectedIndex].text,
                level.value
            );
        }
    }
}

function clearClass() {
    clearClassTable();
    player.classes = [];
    player.level = 0;
}

function addClassToClassTable(CharClass, CharSubClass, CharClassLevel){
    const level = document.querySelector("#class-level");
    const table = document.querySelector("#classes-table");

    level.value = "";
    characterClass.selectedIndex = 0;
    document.querySelector("#subclass-element").style.display = "none";
    document.getElementById("subclass-element").innerHTML = subclassBackup;
    classPreSelected = false;
    characterClass.removeAttribute("disabled")
    level.removeAttribute("disabled")

    const newRow = table.insertRow(-1);
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(CharClassLevel);
    newCell.appendChild(newText);

    newCell = newRow.insertCell(1);
    newText = document.createTextNode(CharClass);
    newCell.appendChild(newText);

    newCell = newRow.insertCell(2);
    newText = document.createTextNode(CharSubClass);
    newCell.appendChild(newText);

    newCell = newRow.insertCell(3);
    newText = document.createTextNode("R");
    newCell.appendChild(newText);


    player.classes.push({
        class: CharClass,
        level: CharClassLevel,
        subclass: CharSubClass,
    });

    player.level = 0;
    for(let i = 0; i < player.classes.length; i++){
        player.level += parseInt(player.classes[i].level);
    }
}


function clearClassTable(){
    const table = document.querySelector("#classes-table");

    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
}


document.getElementById("clear-sheet").addEventListener("click", function (event) {
    clearClassTable();
    characterName.value = "";
    characterRace.selectedIndex = 0;
    characterBackground.selectedIndex = 0;
    
    document.getElementById("lawful-good").checked = false;
    document.getElementById("neutral-good").checked = false;
    document.getElementById("chaotic-good").checked = false;
    document.getElementById("lawful-neutral").checked = false;
    document.getElementById("neutral-neutral").checked = false;
    document.getElementById("chaotic-neutral").checked = false;
    document.getElementById("lawful-evil").checked = false;
    document.getElementById("neutral-evil").checked = false;
    document.getElementById("chaotic-evil").checked = false;
});


document.getElementById("race-select").addEventListener("change", function (event) {
    player.race = characterRace.options[characterRace.selectedIndex].text;

    document.getElementById("subrace-element").innerHTML = subraceBackup;

    if(subraces[player.race].length > 1){
        document.getElementById("subrace-element").style.display = "flex";

        for(let i = 0; i < subraces[player.race].length; i++){
            const option = document.createElement("option");
            option.value = subraces[player.race][i];
            option.innerHTML = subraces[player.race][i];
            document.getElementById("subrace-select").appendChild(option);
        }
    }
    else{
        document.getElementById("subrace-element").style.display = "none";
    }
});
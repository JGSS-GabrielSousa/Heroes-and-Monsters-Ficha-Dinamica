const characterName = document.getElementById("character-name");
const characterRace = document.getElementById("race-select");
const characterBackground = document.getElementById("background-select");
const characterClass = document.getElementById("class-select");
const characterSubClass = document.getElementById("subclass-select");

const fileSelect = document.getElementById("fileSelect");
const fileElement = document.getElementById("fileElem");

let classPreSelected = false;


fileSelect.addEventListener("click", function (e) {
    fileElement.click();
});


fileElement.addEventListener("change", function (event) {
    var reader = new FileReader();
    reader.onload = HandleLoadedCharacter;
    reader.readAsText(event.target.files[0]);
});


function HandleLoadedCharacter(event){
    console.log("file");
    var obj = JSON.parse(event.target.result);
    console.log(obj);

    characterName.value = obj.name;
    characterRace.value = obj.race;
    characterBackground.value = obj.background;
    clearClassTable();

    switch(obj.alignment){
        case "lawful-good":
            document.getElementById("lawful-good").checked = true;
            break;
        case "neutral-good":
            document.getElementById("neutral-good").checked = true;
            break;
        case "chaotic-good":
            document.getElementById("chaotic-good").checked = true;
            break;
        case "lawful-neutral":
            document.getElementById("lawful-neutral").checked = true;
            break;
        case "neutral-neutral":
            document.getElementById("neutral-neutral").checked = true;
            break;
        case "chaotic-neutral":
            document.getElementById("chaotic-neutral").checked = true;
            break;
        case "lawful-evil":
            document.getElementById("lawful-evil").checked = true;
            break;
        case "neutral-evil":
            document.getElementById("neutral-evil").checked = true;
            break;
        case "chaotic-evil":
            document.getElementById("chaotic-evil").checked = true;
            break;
        default:
            break;
    }
}


function addClass(){
    const level = document.querySelector("#class-level");

    if(characterClass.selectedIndex == 0 || level.value == ""){
        return;
    }

    if(!classPreSelected){
        if(parseInt(level.value) > 3){
            document.querySelector("#subclass").style.display = "inline-block";
            classPreSelected = true;
            characterClass.setAttribute("disabled", "");
            level.setAttribute("disabled", "");
        }
        else{
            addClassToClassTable(
                characterClass.options[characterClass.selectedIndex].text,
                "",
                level.value
            );
        }
    }
    else{
        if(characterSubClass.value != "null"){
            addClassToClassTable(
                characterClass.options[characterClass.selectedIndex].text,
                characterSubClass.options[characterSubClass.selectedIndex].text,
                level.value
            );
        }
    }
}

function addClassToClassTable(CharClass, CharSubClass, CharClassLevel){
    const level = document.querySelector("#class-level");
    const table = document.querySelector("#classes-table");

    level.value = "";
    characterClass.selectedIndex = 0;
    document.querySelector("#subclass").style.display = "none";
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
}

function clearClassTable(){
    const table = document.querySelector("#classes-table");

    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
}
const characterName = document.getElementById("character-name");
const characterRace = document.getElementById("race-select");
const characterBackground = document.getElementById("background-select");

const fileSelect = document.getElementById("fileSelect");
const fileElement = document.getElementById("fileElem");


fileSelect.addEventListener("click", function (e) {
    if(fileElement){
        fileElement.click();
    }
}, false);


fileElement.addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = HandleLoadedCharacter;
    reader.readAsText(event.target.files[0]);
});


function HandleLoadedCharacter(event){
    var obj = JSON.parse(event.target.result);
    console.log(obj);

    characterName.value = obj.name;
    characterRace.value = obj.race;
    characterBackground.value = obj.background;

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
const loadCharSelect = document.getElementById("loadChar");
const loadCharElement = document.getElementById("loadCharElement");
const saveCharSelect = document.getElementById("saveChar");


loadCharSelect.addEventListener("click", function (e) {
    loadCharElement.click();
});


loadCharElement.addEventListener("change", function (event) {
    var reader = new FileReader();
    reader.onload = HandleLoadedCharacter;
    reader.readAsText(event.target.files[0]);
});


saveCharSelect.addEventListener("click", function (event) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(player, null, 4)], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "test.json";
    a.click();
});


function HandleLoadedCharacter(event){
    var obj = JSON.parse(event.target.result);

    characterName.value = obj.name;
    characterRace.value = obj.race;
    characterBackground.value = obj.background;
    player.name = obj.name;
    player.race = obj.race;
    player.background = obj.background;

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
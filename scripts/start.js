import { getCharacterData, getGameData } from "./apiHandler.js";

let game;
let character;

await loadInitialData();

async function loadInitialData(){
   // game = await getGameData();

    const savedSetting = JSON.parse(localStorage.getItem("hnm-ficha-dinamica"));
    if(savedSetting && savedSetting["lastLoadedCharacter"]){
        character = await getCharacterData(savedSetting["lastLoadedCharacter"]);
    }
    else {
        character = {
            name: "Nepheri",
            race: "Tiefling",
            background: "Charlatão",
            alignment: "Neutro e Bom",
            class: {
                0: {
                    name: "Clérigo",
                    subclass: "da Guerra",
                    level: 8,
                    spellcaster: true
                }
            },
            attributes: {
                strength: 12,
                dexterity: 12,
                constitution: 14,
                intelligence: 16,
                wisdom: 18,
                willforce: 20,
                charisma: 10
            },
            skills: {
                acrobatics: 1,
                animalHandling: 1,
                arcana: 1,
                athletics: 2,
                deception: 6,
                history: 2,
                insight: 1,
                intimidation: -2,
                investigation: -2,
                medicine: 0,
                nature: 0,
                perception: 0,
                performance: 0,
                persuasion: 0,
                religion: 0,
                sleightOfHand: -2,
                stealth: 0,
                survival: 6
            },
            hitpoints: {
                current: 10,
                max: 10
            },
            armor: 15,
            movement: 30,
            items: {
                "Simple Armor": {
                    name: "Simple Armor",
                    range: 0,
                    defense: 5,
                    hit: "",
                    damage: "",
                    typeofDamage: "",
                    description: [""],
                    effects: [""]
                }
            },
        }
    }
}


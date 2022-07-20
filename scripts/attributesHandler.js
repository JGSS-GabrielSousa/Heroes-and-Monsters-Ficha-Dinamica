import { player } from "./app.js";

const att = ["strength","vitality","agility","charisma","willpower","wisdom","intelligence"];

function DrawAttributesValue(){
    for(let i = 0; i < att.length; i++){
        document.getElementById(att[i]+"-value").innerText = player.attributes[att[i]].total;
        document.getElementById(att[i]+"-race").innerText = player.attributes[att[i]].racial;
        document.getElementById(att[i]+"-class").innerText = player.attributes[att[i]].class;
        document.getElementById(att[i]+"-level").innerText = player.attributes[att[i]].level;
        document.getElementById(att[i]+"-others").innerText = player.attributes[att[i]].others;
    }
}


function CalculateAttributesValue(){
    for(let i = 0; i < att.length; i++){

        if(parseInt(document.getElementById(att[i]+"-base").value) > 30){
            document.getElementById(att[i]+"-base").value = "30";
        }

        player.attributes[att[i]].total = parseInt(document.getElementById(att[i]+"-base").value) + player.attributes[att[i]].racial + player.attributes[att[i]].class + player.attributes[att[i]].level + player.attributes[att[i]].others;
    }

    console.log((document.getElementById(att[0]+"-base").value));

    DrawAttributesValue();
}CalculateAttributesValue();


const attributesInputIDs = ["strength-base","vitality-base","agility-base","charisma-base","willpower-base","wisdom-base","intelligence-base"];
window.onchange = e => {
    if(attributesInputIDs.includes(e.target.id)){
        CalculateAttributesValue();
    }
}
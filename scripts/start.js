import { getCharacterData, getGameData } from "./apiHandler.js";

const game = await getGameData();
let character = await getCharacterData();

function loadMainContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const mainElement = document.createElement('main');
            mainElement.innerHTML = data;

            const body = document.querySelector('body');
            body.appendChild(mainElement);
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
        });
}
loadMainContent();

console.log(game)
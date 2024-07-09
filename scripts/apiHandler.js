export let races;
export let classes;

const API_URL = "https://jgss-web-service.onrender.com/hnm/";

export async function getGameData(){
    let response = await fetch(API_URL+"query-classes");
    classes = await response.json();

    response = await fetch(API_URL+"query-races");
    races = await response.json();

    // Criar uma série de requisições para cada classe
    let classRequests = classes.map(className => fetch(API_URL + "query-" + className));
    let racesRequests = races.map(racesName => fetch(API_URL + "query-" + racesName));

    // Esperar todas as requisições serem completadas
    let classResponses = await Promise.all(classRequests);
    let racesResponses = await Promise.all(racesRequests);

    // Processar as respostas das requisições
    let classData = await Promise.all(classResponses.map(response => response.json()));
    let racesData = await Promise.all(racesResponses.map(response => response.json()));

    return { 
        classes: classData,
        races: racesData
    }
};

export async function getCharacterData(){
    ;
};
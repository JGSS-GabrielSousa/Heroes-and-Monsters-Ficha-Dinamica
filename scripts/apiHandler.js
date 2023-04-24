let subraces;
let subclasses;

//const API_URL = "http://127.0.0.1:5000/";
const API_URL = "https://heroes-and-monsters-api.onrender.com/";


async function getData(){
    let response = await fetch(API_URL+"query-subclasses");
    subclasses = await response.json();

    response = await fetch(API_URL+"query-subraces");
    subraces = await response.json();

    console.log(subclasses);
    console.log(subraces);
}

getData();
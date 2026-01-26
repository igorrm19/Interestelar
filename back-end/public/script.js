/**
 * "id": "101",
    "name": "Xenomorph XX121",
    "type": "Biological",
    "dangerLevel": "Extreme",
    "description": "Highly aggressive endoparasitoid extraterrestrial species.",
    "status": "active"
 */

let names;
let type;
let dangerLevel;
let description;
let status;

async function ServidorConnection() {
    await fetch("http://localhost:5000/entries")
        .then(response => response.json())
        .then(data => {

            names = data.map(element => element[0].name);
            type = data.map(element => element[0].type);
            dangerLevel = data.map(element => element[0].dangerLevel);
            description = data.map(element => element[0].description);
            status = data.map(element => element[0].status);

        })
        .catch(error => console.log(error));

}


ServidorConnection();


let color = true;
const archive = document.getElementById("archive");
const nameElement = document.getElementById("name");
const typeElement = document.getElementById("type");
const dangerLevelElement = document.getElementById("danger-level");
const descriptionElement = document.getElementById("description");
const statusElement = document.getElementById("status");

window.addEventListener("load", () => {
    nameElement.textContent = names;
    typeElement.textContent = type;
    dangerLevelElement.textContent = dangerLevel;
    descriptionElement.textContent = description;
    statusElement.textContent = status;
});

archive.addEventListener("click", () => {
    if (color) {
        archive.style.backgroundColor = "#3e961cff";
        color = false;
    } else {
        archive.style.backgroundColor = "#1f795b";
        color = true;
    }
});
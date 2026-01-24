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

            // names = data.map(element => element.name);

        })
        .catch(error => console.log(error));

}


ServidorConnection();   


async function ServidorConnection() {
    const response = await fetch("http://localhost:5000/entries")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const entries = document.getElementById("entries");
                entries.textContent = JSON.stringify(element.name);
                console.log(element.name);
            });
        })
        .catch(error => console.log(error));

}


ServidorConnection();   

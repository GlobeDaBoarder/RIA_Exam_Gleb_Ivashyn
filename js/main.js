let tableBody = document.getElementById("tbody");
let rowIndex = 0;

//initial loading
(function () {
    console.log(window.localStorage.length)

    if(window.localStorage.length === 0){
        fetch('../resources/initialProjects.json')
            .then(response => response.json())
            .then(async jsonArray => {
                console.log(jsonArray)
                console.log(jsonArray.length)

                for (let i = 0; i < jsonArray.length; i++) {
                    let city = jsonArray[i].city;
                    console.log(city)
                    let coordinates = await fetchCoordinates(city)
                    console.log(coordinates);

                    await writeToLocalStorage(jsonArray[i]);

                }

                location.reload();
            })
    }


})();

updateTable()



self.addEventListener("message", async (ev) => {
    //retrieving submitted data
    const fieldsObject = ev.data;
    const formFieldsJson = JSON.parse(fieldsObject);

    await writeToLocalStorage(formFieldsJson)


    location.reload();

    updateTable()
})

async function writeToLocalStorage(formFieldsJson){
    const projectName = formFieldsJson.projectName;
    const city = formFieldsJson.city;
    const description = formFieldsJson.projectDescription;
    let coordinates = await fetchCoordinates()

    let dataForTableJson = JSON.stringify({
        projectName: projectName,
        city: city,
        description: description,
        coordinates: coordinates
    })

    localStorage.setItem(projectName, dataForTableJson);
}

async function fetchCoordinates(city){
    let json = await fetch(`http://nominatim.openstreetmap.org/search?q=${city}&limit=1&format=json`)
        .then(response => response.json());

    return json[0].lat.toString()
                .concat(", \n")
                .concat(json[0].lon.toString())
}

function updateTable(){
    for (let i = 0; i < localStorage.length; i++){
        writeEntryToTable(localStorage.getItem(localStorage.key(i)));
    }
}

function writeEntryToTable(localStorageKey){
    const formFields = JSON.parse(localStorageKey)
    let newRow = tableBody.insertRow(-1);

    newRow.insertCell(0).innerText = rowIndex.toString();
    rowIndex++;
    newRow.insertCell(1).innerText = formFields.projectName;
    newRow.insertCell(2).innerText = formFields.city;
    newRow.insertCell(3).innerText = formFields.description;
    newRow.insertCell(4).innerText = formFields.coordinates;
    let newDeleteButton = document.createElement('button');
    newDeleteButton.innerText = "delete";
    newDeleteButton.onclick = () => {
        let deleteStorageKey = newDeleteButton.parentElement.parentElement.children[1].textContent;
        let deleteRowKey = newDeleteButton.parentElement.parentElement.firstChild.textContent;
        localStorage.removeItem(deleteStorageKey)
        tableBody.deleteRow(deleteRowKey)
        location.reload();
    }
    newRow.insertCell(5).insertAdjacentElement('beforeend', newDeleteButton);

}

//map

const map = L.map('mymap').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

let lng = 0;
let lat = 0;
map.on('click', function(e) {
    console.log(e.latlng.lat,e.latlng.lng,e.layerPoint.x,e.layerPoint.y);
    lng = e.latlng.lng;
    lat = e.latlng.lat

    L.marker([e.latlng.lat,e.latlng.lng])
        .addTo(map)
        .bindPopup('City')
        .openPopup();
});

fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(response => {
        console.log(response.json())
    })
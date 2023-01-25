let tableBody = document.getElementById("tbody");
let rowIndex = 0;

//initial loading
(function () {
    fetch('../resources/initialProjects.json')
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })

})();

updateTable()



self.addEventListener("message", async (ev) => {
    //retrieving submitted data
    const fieldsJson = ev.data;
    const formFieldsObject = JSON.parse(fieldsJson);
    const projectName = formFieldsObject.projectName;
    const city = formFieldsObject.city;
    const description = formFieldsObject.projectDescription;
    let coordinates = await fetchCoordinates()

    let dataForTableJson = JSON.stringify({
        projectName: projectName,
        city: city,
        description: description,
        coordinates: coordinates
    })

    localStorage.setItem(projectName, dataForTableJson);

    location.reload();

    setTimeout(() => updateTable(), 500);
})

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
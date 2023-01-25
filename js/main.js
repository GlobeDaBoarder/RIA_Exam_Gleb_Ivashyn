let tableBody = document.getElementById("tbody");
let rowIndex = 0;

  updateTable()

// fetch('../resources/initialProjects.json')
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//     })
//

self.addEventListener("message", (ev)=>{
    //retrieving submitted data
    const fieldsJson = ev.data;
    const formFieldsObject = JSON.parse(fieldsJson);
    const projectName = formFieldsObject.projectName;
    const city = formFieldsObject.city;
    const description = formFieldsObject.projectDescription;
    let coordinates = "";

    fetch(`http://nominatim.openstreetmap.org/search?q=${city}&limit=1&format=json`)
        .then(response => response.json())
        .then(json => {
            coordinates = coordinates
                .concat(json[0].lat.toString())
                .concat(", \n")
                .concat(json[0].lon.toString())

            let dataForTableJson = JSON.stringify({
                projectName: projectName,
                city: city,
                description: description,
                coordinates: coordinates
            })

            //storing data to local storage
            localStorage.setItem(projectName, dataForTableJson);

            //reloading
            location.reload();

            // //adding to the list
            setTimeout(() => updateTable(), 500);
        })
})

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
    newRow.insertCell(5).insertAdjacentElement('beforeend', newDeleteButton);

}
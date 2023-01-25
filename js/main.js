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
    let latitude;
    let longitude;
    let coordinates = "";

    fetch(`http://nominatim.openstreetmap.org/search?q=${city}&limit=1&format=json`)
        .then(response => response.json())
        .then(json => {
            console.log(json[0])

            console.log(json[0].lat)
            console.log(json[0].lon)
            latitude = json[0].lat
            longitude = json[0].lon
            coordinates = coordinates
                .concat(longitude.toString())
                .concat(", \n")
                .concat(latitude.toString())

            console.log(projectName);
            console.log(city)
            console.log(description)
            console.log(latitude)
            console.log(longitude)
            console.log(coordinates)

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
    console.log(localStorageKey)
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
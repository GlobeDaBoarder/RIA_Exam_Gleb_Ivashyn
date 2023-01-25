let tableBody = document.getElementById("tbody");
let rowIndex = 0;

// fetch('../resources/initialProjects.json')
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//     })
//
 //fetchCityInfo("Paris")
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
                .concat("\n")
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
        })





    // //adding to the list
    // setTimeout(() => updateTable(), 500);

})

function fetchCityInfo(city){
    fetch(`http://nominatim.openstreetmap.org/search?q=${city}&limit=1&format=json`)
        .then(response => response.json())
        .then(json => {
            console.log(json[0])

            console.log(json[0].lat)
            console.log(json[0].lon)
        })

}
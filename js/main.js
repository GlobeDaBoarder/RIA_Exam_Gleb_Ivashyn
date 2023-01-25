let tableBody = document.getElementById("tbody");
let rowIndex = 0;

// fetch('../resources/initialProjects.json')
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//     })

fetchCityInfo()
self.addEventListener("message", (ev)=>{
    //retrieving submitted data
    const fieldsJson = ev.data;
    const formFieldsObject = JSON.parse(fieldsJson);
    const projectName = formFieldsObject.projectName;
    const city = formFieldsObject.city;
    const description = formFieldsObject.projectDescription;

    console.log(projectName);
    console.log(city)
    console.log(description)

    fetchCityInfo()

    //storing data to local storage
    localStorage.setItem(projectName, fieldsJson);

    // //adding to the list
    // setTimeout(() => updateTable(), 500);

})

function fetchCityInfo(){
    fetch(`http://nominatim.openstreetmap.org/search?q=paris&limit=1&format=json`)
        .then(response => response.json())
        .then(json => {
            console.log(json[0])

            console.log(json[0].lat)
            console.log(json[0].lon)
        })

}
let tableBody = document.getElementById("tbody");
let rowIndex = 0;

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

    //storing data to local storage
    localStorage.setItem(projectName, fieldsJson);

    // //adding to the list
    // setTimeout(() => updateTable(), 500);

})
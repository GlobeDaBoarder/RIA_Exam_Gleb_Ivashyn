(function () {
    const formElement = document.getElementById("form");

    formElement.addEventListener('submit', function (event) {
        if (!formElement.checkValidity()) {
            console.log("validity check triggered")
            event.preventDefault()
            event.stopImmediatePropagation()
        }
        else {
            const projectNameValue = document.getElementById("projectName").value;
            const cityValue = document.getElementById("city").value;
            const descriptionValue = document.getElementById("description").value;
            const json = JSON.stringify({projectName: projectNameValue, city: cityValue, projectDescription: descriptionValue})
            console.log("submit...");
            self.postMessage(json);
        }

        formElement.classList.add('was-validated')
    });
})()
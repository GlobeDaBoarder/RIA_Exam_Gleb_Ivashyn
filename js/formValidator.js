(function () {
    const formElement = document.getElementById("form");

    formElement.addEventListener('submit', function (event) {
        if (!formElement.checkValidity()) {
            console.log("validity check triggered")
            event.preventDefault()
            event.stopImmediatePropagation()
        }
        else {
            const titleValue = document.getElementById("title").value;
            const ageValue = document.getElementById("age").value;
            const json = JSON.stringify({title: titleValue, age: ageValue})
            console.log("submit...");
            self.postMessage(json);
        }

        formElement.classList.add('was-validated')
    });
})()
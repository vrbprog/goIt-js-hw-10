
const formData = {
    email: "",
    message: ""
}

const inputForm = document.querySelector("form");
const formState = localStorage.getItem("feedback-form-state");

if (formState !== null) {
    formData.email = JSON.parse(formState).email;
    inputForm.elements.email.value = formData.email;

    formData.message = JSON.parse(formState).message;
    inputForm.elements.message.value = formData.message;
}

inputForm.addEventListener("input", event => {
    if (event.target.name === "email") {
        formData.email = event.target.value;
    } else if (event.target.name === "message") {
        formData.message = event.target.value;
    }
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
});

const submit = document.querySelector(".feedback-form");
submit.addEventListener("submit", event => {
    event.preventDefault();
    
    if (formData.email === '' || formData.message === '') {
        alert("Fill please all fields");
    }
    else {
        console.log(formData);
        submit.reset(); 
        formData.email = '';
        formData.message = '';
        localStorage.removeItem("feedback-form-state");
    }

});
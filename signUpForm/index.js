
const nameRegex = /^[A-Z][a-z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+91[-\s]?|0)?[6-9]\d{9}$/;
let errorSubmit = document.querySelector('.error-submit')

function validateFirstName() {
    const firstNameInput = document.getElementById("firstName")
    const firstNameError = document.querySelector(".error-message-firstname");

    const value = firstNameInput.value.trim();

    if (value.length == 0) {
        firstNameError.innerHTML = "Name is Required";
        return false;
    }
    if (!nameRegex.test(value)) {
        firstNameError.innerHTML = "Please Enter Valid Name  (Start with capital)";
        firstNameError.style.display = 'block'
        return false;
    }

    firstNameError.innerHTML = `<i class="ri-check-double-line"></i>`
    return true

}

function validateLastName() {
    const lastNameInput = document.getElementById("lastName")
    const lastNameEror = document.querySelector(".last-name-error");

    const value = lastNameInput.value.trim();

    if (value.length == 0) {
        lastNameEror.innerHTML = "Name is Required";
        return false;
    }
    if (!nameRegex.test(value)) {
        lastNameEror.innerHTML = "Please Enter Valid Name  (Start with capital)";
        lastNameEror.style.display = 'block'
        return false;
    }

    lastNameEror.innerHTML = `<i class="ri-check-double-line"></i>`
    return true
}

function validEmail() {
    const emailInput = document.querySelector('#email');
    const emailError = document.querySelector('.error-message-email');

    let value = emailInput.value.trim();

    if (value == 0) {
        lastNameEror.innerHTML = "Email is Required";
        return false
    }
    if (!emailRegex.test(value)) {
        emailError.innerHTML = "Please Enter Valid Email  ";
        emailError.style.display = 'block'
        return false

    }
    emailError.innerHTML = `<i class="ri-check-double-line"></i>`
    return true

}



function validPhoneNum() {
    const phoneInput = document.getElementById("phone")
    const phoneError = document.querySelector(".error-message-phone");

    const value = phoneInput.value.trim();

    if (value.length == 0) {
        phoneError.innerHTML = "phone is Required";
        return false;
    }
    if (!phoneRegex.test(value)) {
        phoneError.innerHTML = "Please Enter Valid phone Number  ";
        phoneError.style.display = 'block'
        return false;
    }

    phoneError.innerHTML = `<i class="ri-check-double-line"></i>`
    return true
}

function handleSubmit(e) {
    if (!validateFirstName || !validPhoneNum || !validEmail || !validPhoneNum) {
        e.preventDefault()
        errorSubmit.innerHTML = "Please fill Form"
        return false
    }
}
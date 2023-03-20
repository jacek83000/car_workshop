function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    const errorMessageRequired = document.getElementById('errorMessage-required').innerText;
    const errorMessageLen2to50 = document.getElementById('errorMessage-len_2_50').innerText;
    const errorMessageLen5to50 = document.getElementById('errorMessage-len_5_50').innerText;
    const errorMessageIsEmail = document.getElementById('errorMessage-isEmail').innerText;
    const errorMessageSummary = document.getElementById('errorMessage-summary').innerText;

    resetErrors([firstNameInput, lastNameInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorEmail, errorPassword], errorsSummary);
    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = errorMessageRequired;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = errorMessageLen2to50;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorMessageRequired;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 50)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorMessageLen2to50;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 50)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = errorMessageLen5to50;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = errorMessageIsEmail;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = errorMessageRequired;
    }

    if (!valid) {
        errorsSummary.innerText = errorMessageSummary;
    }

    return valid;
}


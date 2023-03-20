function validateForm() {
    const nameInput = document.getElementById('name');
    const mileageInput = document.getElementById('mileage');
    const colorInput = document.getElementById('color');

    const errorName = document.getElementById('errorName');
    const errorMileage = document.getElementById('errorMileage');
    const errorColor = document.getElementById('errorColor');
    const errorsSummary = document.getElementById('errorsSummary');

    const errorMessageRequired = document.getElementById('errorMessage-required').innerText;
    const errorMessageLen2to50 = document.getElementById('errorMessage-len_2_50').innerText;
    const errorMessageIsNumber = document.getElementById('errorMessage-isNumber').innerText;
    const errorMessageRan0to10mil = document.getElementById('errorMessage-ran_0_10mil').innerText;
    const errorMessageSummary = document.getElementById('errorMessage-summary').innerText;

    resetErrors([nameInput, mileageInput, colorInput], [errorName, errorMileage, errorColor], errorsSummary);
    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = errorMessageRequired;
    } else if (!checkTextLengthRange(nameInput.value, 2, 50)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = errorMessageLen2to50;
    }

    if (!checkRequired(mileageInput.value)) {
        valid = false;
        mileageInput.classList.add("error-input");
        errorMileage.innerText = errorMessageRequired;
    } else if (!checkNumber(mileageInput.value)) {
        valid = false;
        mileageInput.classList.add("error-input");
        errorMileage.innerText = errorMessageIsNumber;
    } else if (!checkNumberRange(mileageInput.value, 0, 10_000_000)) {
        valid = false;
        mileageInput.classList.add("error-input");
        errorMileage.innerText = errorMessageRan0to10mil;
    }

    if (!checkRequired(colorInput.value)) {
        valid = false;
        colorInput.classList.add("error-input");
        errorColor.innerText = errorMessageRequired;
    } else if (!checkTextLengthRange(colorInput.value, 2, 50)) {
        valid = false;
        colorInput.classList.add("error-input");
        errorColor.innerText = errorMessageLen2to50;
    }

    if (!valid) {
        errorsSummary.innerText = errorMessageSummary;
    }

    return valid;
}
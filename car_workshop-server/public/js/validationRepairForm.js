function validateForm() {
    const carInput = document.getElementById('cr_id');
    const mechanicInput = document.getElementById('mc_id');
    const startDateInput = document.getElementById('startDate');
    const expectedEndDateInput = document.getElementById('expectedEndDate');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');

    const errorCar = document.getElementById('errorCar');
    const errorMechanic = document.getElementById('errorMechanic');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorExpectedEndDate = document.getElementById('errorExpectedEndDate');
    const errorPrice = document.getElementById('errorPrice');
    const errorDescription = document.getElementById('errorDescription');
    const errorsSummary = document.getElementById('errorsSummary');

    const errorMessageRequired = document.getElementById('errorMessage-required').innerText;
    const errorMessageDateFormat = document.getElementById('errorMessage-dateFormat').innerText;
    const errorMessageDateNotLater = document.getElementById('errorMessage-dateNotLater').innerText;
    const errorMessageIsNumber = document.getElementById('errorMessage-isNumber').innerText;
    const errorMessageRan0to1mil = document.getElementById('errorMessage-ran_0_1mil').innerText;
    const errorMessageLenMax200 = document.getElementById('errorMessage-len_max_200').innerText;
    const errorMessageSummary = document.getElementById('errorMessage-summary').innerText;

    resetErrors([carInput, mechanicInput, startDateInput, expectedEndDateInput, priceInput, descriptionInput],
        [errorCar, errorMechanic, errorStartDate, errorExpectedEndDate, errorPrice, errorDescription], errorsSummary);

    let valid = true;

    if (!checkRequired(carInput.value)) {
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = errorMessageRequired;
    }

    if (!checkRequired(mechanicInput.value)) {
        valid = false;
        mechanicInput.classList.add("error-input");
        errorMechanic.innerText = errorMessageRequired;
    }

    if (!checkRequired(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = errorMessageRequired;
    } else if (!checkDate(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = errorMessageDateFormat;
    }

    if (!checkRequired(expectedEndDateInput.value)) {
        valid = false;
        expectedEndDateInput.classList.add("error-input");
        errorExpectedEndDate.innerText = errorMessageRequired;
    } else if (!checkDate(expectedEndDateInput.value)) {
        valid = false;
        expectedEndDateInput.classList.add("error-input");
        errorExpectedEndDate.innerText = errorMessageDateFormat;
    } else if (checkRequired(expectedEndDateInput.value) && checkDate(expectedEndDateInput.value) &&
        !checkDateIsAfter(expectedEndDateInput.value, startDateInput.value)) {
        valid = false;
        expectedEndDateInput.classList.add("error-input");
        errorExpectedEndDate.innerText = errorMessageDateNotLater;
    }


    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessageRequired;
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessageIsNumber;
    } else if (!checkNumberRange(priceInput.value, 0, 1_000_000)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessageRan0to1mil;
    }

    if (!checkDescLengthRange(descriptionInput.value, 200)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = errorMessageLenMax200;
    }

    if (!valid) {
        errorsSummary.innerText = errorMessageSummary;
    }

    return valid;
}
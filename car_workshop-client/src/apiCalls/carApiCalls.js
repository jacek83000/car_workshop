import { getCurrentUser } from "../helpers/authHelper";

const carsBaseUrl = 'http://localhost:3000/api/cars'

export function getCarsApiCall() {
    const promise = fetch(carsBaseUrl)
    return promise;
}

export function getCarByIdApiCall(crId) {
    const url = `${carsBaseUrl}/${crId}`;
    const promise = fetch(url);
    return promise;
}

export function addCarApiCall(cr) {
    const user = getCurrentUser()
    const crString = JSON.stringify(cr)
    let token
    if (user && user.token) {
        token = user.token
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: crString
    }
    const promise = fetch(carsBaseUrl, options);
    return promise;
}

export function updateCarApiCall(crId, cr) {
    const user = getCurrentUser()
    const url = `${carsBaseUrl}/${crId}`;
    const crString = JSON.stringify(cr)
    let token

    if (user && user.token) {
        token = user.token
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: crString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCarApiCall(crId) {
    const user = getCurrentUser()
    const url = `${carsBaseUrl}/${crId}`;
    let token

    if (user && user.token) {
        token = user.token
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}
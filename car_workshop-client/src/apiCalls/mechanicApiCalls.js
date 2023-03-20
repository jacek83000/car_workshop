import { getCurrentUser } from "../helpers/authHelper";

const mechanicsBaseUrl = 'http://localhost:3000/api/mechanics'

export function getMechanicsApiCall() {
    const promise = fetch(mechanicsBaseUrl)
    return promise;
}

export function getMechanicByIdApiCall(mcId) {
    const url = `${mechanicsBaseUrl}/${mcId}`;
    const promise = fetch(url);
    return promise;
}

export function findByEmail(email) {
    const url = `${mechanicsBaseUrl}/exist/email`
    const user = getCurrentUser()
    const userString = JSON.stringify(email)
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
        body: userString
    }
    const promise = fetch(url, options);
    return promise
}

export function addMechanicApiCall(mc) {
    const user = getCurrentUser()
    const mcString = JSON.stringify(mc)
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
        body: mcString
    }
    const promise = fetch(mechanicsBaseUrl, options);
    return promise;
}

export function updateMechanicApiCall(mcId, mc) {
    const user = getCurrentUser()
    const url = `${mechanicsBaseUrl}/${mcId}`;
    const mcString = JSON.stringify(mc)
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
        body: mcString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteMechanicApiCall(mcId) {
    const user = getCurrentUser()
    const url = `${mechanicsBaseUrl}/${mcId}`;
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
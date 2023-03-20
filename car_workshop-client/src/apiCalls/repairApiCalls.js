import { getCurrentUser } from "../helpers/authHelper";

const repairsBaseUrl = 'http://localhost:3000/api/repairs'

export function getRepairsApiCall() {
    const promise = fetch(repairsBaseUrl)
    return promise;
}

export function getRepairbyIdApiCall(repId) {
    const url = `${repairsBaseUrl}/${repId}`;
    const promise = fetch(url)
    return promise;
}

export function addRepairApiCall(rep) {
    const user = getCurrentUser()
    const repString = JSON.stringify(rep)
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
        body: repString
    }
    const promise = fetch(repairsBaseUrl, options);
    return promise;
}

export function updateRepairApiCall(repId, rep) {
    const user = getCurrentUser()
    const url = `${repairsBaseUrl}/${repId}`;
    const repString = JSON.stringify(rep)
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
        body: repString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteRepairApiCall(repId) {
    const user = getCurrentUser()
    const url = `${repairsBaseUrl}/${repId}`;
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
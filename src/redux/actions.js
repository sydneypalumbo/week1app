export const actionTypes = {
    SET_AUTH_URL: 'SET_AUTH_URL',
    ADD_VEHICLES: 'ADD_VEHICLES',
    REMOVE_VEHICLE: 'REMOVE_VEHICLE',
}

function setAuthUrl(url) {
    return {
        type: actionTypes.SET_AUTH_URL,
        authUrl: url
    }
}

function addVehicles(vehicles) {
    return {
        type: actionTypes.ADD_VEHICLES,
        vehicles: vehicles
    }
}

function removeVehicle(vehicle) {
    return {
        type: actionTypes.REMOVE_VEHICLE,
        vehicle: vehicle
    }
}

export const actionCreators = {
    setAuthUrl,
    addVehicles,
    removeVehicle
}
import { actionTypes } from "./actions"

const initialState = {
    authUrl: null,
    vehicles: []
}

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case actionTypes.SET_AUTH_URL:
            console.log(action.authUrl)
            return Object.assign({}, state, {
                authUrl: action.authUrl
            })
        case actionTypes.ADD_VEHICLES:
            const oldVehicles = Object.assign([], state.vehicles)
            const newVehicles = Object.assign([], action.vehicles)
            for (const i in newVehicles) {
                const vehicle = oldVehicles.find(vehicle => vehicle.id === newVehicles[i].id)
                if (!vehicle) {
                    oldVehicles.push(newVehicles[i])
                }
            }
            return Object.assign({}, state, {
                vehicles: oldVehicles
            })
        case actionTypes.REMOVE_VEHICLE:
            const vehicleIndex = state.items.indexOf(action.vehicle)
            const newList = Object.assign([], state.vehicles)
            if (vehicleIndex > -1) {
                newList.splice(vehicleIndex, 1)
            }
            return Object.assign({}, state, {
                vehicles: newList
            })
        default:
            return state
    }
}
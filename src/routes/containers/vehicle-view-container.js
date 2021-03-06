import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './../../redux/actions'
import VehicleView from '../vehicle-view'
import { withRouter } from 'react-router-dom'

const mapStatesToProps = function (state) {
    return {
        vehicles: state.vehicles,
        authUrl: state.authUrl
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        handleAddVehicles: (vehicles) => {
            dispatch(actionCreators.addVehicles(vehicles))
        },
        handleRemoveVehicle: (vehicle) => {
            dispatch(actionCreators.removeVehicle(vehicle))
        }
    }
}

class VehicleViewContainer extends React.Component{

    render() {
        return(
            <VehicleView {...this.props}/>
        )
    }
}

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(VehicleViewContainer))
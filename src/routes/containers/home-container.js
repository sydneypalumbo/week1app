import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './../../redux/actions'
import Home from './../home'
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

class HomeContainer extends React.Component{

    render() {
        return(
            <Home {...this.props}/>
        )
    }
}

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(HomeContainer))
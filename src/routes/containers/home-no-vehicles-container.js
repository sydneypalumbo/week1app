import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './../../redux/actions'
import HomeNoVehicles from './../home-no-vehicles'
import { withRouter } from 'react-router-dom'

const mapStateToProps = function (state) {
    return {
        authUrl: state.authUrl
    }
}

const mapDispatchToProps = function (dispatch) {

    return {
        handleAddVehicles: (vehicles) => {
            dispatch(actionCreators.addVehicles(vehicles))
        },
        handleSetAuthUrl: (url) => {
            dispatch(actionCreators.setAuthUrl(url))
        }
    }
}

class HomeNoVehiclesContainer extends React.Component{

    render() {
        return(
            <HomeNoVehicles {...this.props}/>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeNoVehiclesContainer))
import React from 'react'
import VehicleCard from './../components/vehicle-card/vehicle-card'
import './scss/home.scss'
import axios from "axios/index";

export default class Home extends React.Component{

    componentDidMount() {
        axios.get('/vehicles')
            .then(res => {
                this.props.handleAddVehicles(res.data)
                this.props.history.push({
                    pathname: '/home'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    buildVehicleCards() {
        return this.props.vehicles.map((vehicle) => {
            return(
                <VehicleCard vehicle={vehicle}/>
            )
        })
    }

    render() {

        return(
            <div>
                Hello
                <a href={this.props.authUrl}>
                    <button/>
                </a>
                {
                    this.props.vehicles && this.props.vehicles.length > 0 && this.buildVehicleCards()
                }
            </div>
        )
    }
}
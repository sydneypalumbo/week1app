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
                <VehicleCard history={this.props.history} vehicle={vehicle}/>
            )
        })
    }

    render() {

        return(
            <div>
                <img src="https://sbi.insure/wp-content/uploads/2017/10/Teenager-Driving.jpg" className="background"/>
                <div className="home-wrapper">
                    <div className="home-header">Family Vehicles</div>
                    <div className="home-subheader">Select a vehicle to interact with or add new vehicles below!</div>
                    {
                        this.props.vehicles && this.props.vehicles.length > 0 &&
                        <div className="home-vehicles">
                            {this.buildVehicleCards()}
                        </div>
                    }
                    <a href={this.props.authUrl}>
                        <button className="button">Add More Vehicles!</button>
                    </a>
                </div>
            </div>
        )
    }
}
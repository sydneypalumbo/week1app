import React from 'react'
import './vehicle-card.scss'

export default class VehicleCard extends React.Component{

    constructor(props){
        super(props)

        this.viewVehicle = this.viewVehicle.bind(this)
    }

    viewVehicle() {
        this.props.history.push({pathname: '/vehicle-view', state:{vehicle:this.props.vehicle}})
    }

    render() {
        const {year, make, model} = this.props.vehicle
        return(
            <div className="vehicle-card-wrapper">
                    <div onClick={this.viewVehicle} className="vehicle-card">
                        <img className="vehicle-card-background" src="https://cdn.onlinewebfonts.com/svg/img_553938.png"/>
                        <div className="vehicle-card-info">
                            {year} {make} {model}
                        </div>
                    </div>
            </div>
        )
    }
}

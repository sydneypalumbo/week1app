import React from 'react'
import './scss/login.scss'
import axios from 'axios'

const STATIC_TEXT = {
    locate: 'LOCATE'
}

export default class VehicleView extends React.Component{

    constructor(props){
        super(props)

        this.locate = this.locate.bind(this)
    }

    componentDidMount() {
        this.locate()
    }

    locate() {
        console.log('locating')
        this.makeVehicleRequest(STATIC_TEXT.locate)
    }

    makeVehicleRequest(type) {
        const vehicle = this.props.location.state.vehicle
        axios.get('/request', {params: {
            type: type,
            id: vehicle.id
        }})
            .then((res)=>{
                console.log(res.data)
            })
    }


    render(){
        const vehicle = this.props.location.state.vehicle
        return(
            <div>
                <iframe>

                </iframe>
                <div>{vehicle.id}</div>
                <div>{vehicle.year}</div>
                <div>{vehicle.make}</div>
                <div>{vehicle.model}</div>
            </div>
        )
    }
}

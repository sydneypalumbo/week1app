import React from 'react'
import axios from 'axios'

const STATIC_TEXT = {
    locate: 'LOCATE'
}

export default class VehicleDetail extends React.Component{

    constructor(props){
        super(props)

        this.locate = this.locate.bind(this)
    }

    componentDidMount() {
        this.locate()
    }

    locate() {
        this.makeVehicleRequest(STATIC_TEXT.locate)
    }

    makeVehicleRequest(type) {
        axios.get('/request', {params: {
            type: type,
            id: this.props.vehicle.id
        }})
            .then((res)=>{
                console.log(res.data)
            })
    }

    render() {
        const {year, make, model} = this.props.vehicle
        return(
            <div>
                {year}
                {make}
                {model}
            </div>
        )
    }
}
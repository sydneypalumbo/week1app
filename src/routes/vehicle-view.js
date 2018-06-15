import React from 'react'
import './scss/login.scss'
import axios from 'axios'

const STATIC_TEXT = [
    {type: 'LOCATE', message: 'REFRESH LOCATION'},
    {type: 'LOCK', message: 'LOCK THIS CAR'},
    {type: 'UNLOCK', message: 'UNLOCK THIS CAR'},
    {type: 'ODOMETER', message: 'CHECK ODOMETER'},
]

export default class VehicleView extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            message: null,
            location: null
        }

        this.locate = this.locate.bind(this)
        this.makeVehicleRequest = this.makeVehicleRequest.bind(this)
    }

    componentDidMount() {
        this.locate()
    }

    locate() {
        this.makeVehicleRequest('LOCATE')
    }

    makeVehicleRequest(type) {
        console.log('made call')
        const vehicle = this.props.location.state.vehicle
        axios.get('/request', {params: {
            type: type,
            id: vehicle.id
        }})
            .then((res)=>{
                if (type === 'LOCATE') {
                    this.setState({
                        location: res.data.data
                    })
                }
            })
    }

    buildButtons() {
        return STATIC_TEXT.map((action) => {
            return(
                <button className="button request-button"
                        onClick={() => {this.makeVehicleRequest(action.type)}}>
                    {action.message}
                </button>
            )
        })
    }


    render(){
        const vehicle = this.props.location.state.vehicle
        return(
            <div>
                <img className="background"/>
                {this.state.location &&
                        <iframe
                            width="600"
                            height="600"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBjJTE9t8cl5g_2Gzh94q47X1AuyvXh6Gc
                            &q=${this.state.location.latitude},${this.state.location.longitude}`}
                        />
                    }
                    <div>{vehicle.year} {vehicle.make} {vehicle.model}</div>
                {this.buildButtons()}
            </div>
        )
    }
}

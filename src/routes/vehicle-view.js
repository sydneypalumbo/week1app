import React from 'react'
import './scss/vehicle-view.scss'
import axios from 'axios'

const BUTTONS = [
    {type: 'LOCATE', text: 'REFRESH LOCATION', message: 'Want to check on the location of your child`s car?'},
    {type: 'LOCK', text: 'LOCK THIS CAR', message: 'Need to make sure the doors were locked?'},
    {type: 'UNLOCK', text: 'UNLOCK THIS CAR', message: 'Someone accidentally get locked out?'},
    {type: 'ODOMETER', text: 'CHECK ODOMETER', message: 'Time to get the car serviced?'},
]

const RESPONSES = {
    LOCATE: 'Successfully located this vehicle - check out the map!',
    LOCK: 'Successfully locked this vehicle!',
    UNLOCK: 'Successfully unlocked this vehicle!',
    ODOMETER: 'The odometer reading is '
}

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
        this.setState({
            message: null
        })
        const vehicle = this.props.location.state.vehicle
        axios.get('/request', {params: {
            type: type,
            id: vehicle.id
        }})
            .then((res)=>{
                switch(type) {
                    case 'LOCATE':
                        this.setState({
                            location: res.data.data,
                            message: RESPONSES.LOCATE
                        })
                        break
                    case 'LOCK':
                        this.setState({
                            message: RESPONSES.LOCK
                        })
                        break
                    case 'UNLOCK':
                        this.setState({
                            message: RESPONSES.UNLOCK
                        })
                        break
                    default:
                        this.setState({
                            message: RESPONSES.ODOMETER + `${res.data.data.distance} km!`
                        })

                }
                console.log(res)
            })
    }

    buildButtons() {
        return BUTTONS.map((action) => {
            return(
                <div>
                    <div className="request-button-prompt">{action.message}</div>
                    <button className="button request-button"
                            onClick={() => {this.makeVehicleRequest(action.type)}}>
                        {action.text}
                    </button>
                </div>
            )
        })
    }


    render(){
        const vehicle = this.props.location.state.vehicle
        return(
            <div className="vehicle-view-wrapper">
                <img src="https://sbi.insure/wp-content/uploads/2017/10/Teenager-Driving.jpg" className="background"/>
                {this.state.message && <div className="vehicle-view-message">{this.state.message}</div>}
                <div className='vehicle-view-left'>
                    {this.state.location &&
                            <iframe
                                className='google-maps'
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBjJTE9t8cl5g_2Gzh94q47X1AuyvXh6Gc
                                &q=${this.state.location.latitude},${this.state.location.longitude}`}
                            />
                    }
                </div>
                <div className='vehicle-view-right'>
                    <div className="vehicle-view-header">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="request-button-wrapper">
                        {this.buildButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

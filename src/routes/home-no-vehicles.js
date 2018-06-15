import React from 'react'
import axios from 'axios'
import './scss/home-no-vehicles.scss'

export default class Home extends React.Component{

    componentDidMount() {

        axios.get('/authUrl')
            .then(res => {
                this.props.handleSetAuthUrl(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return(
            <div>
                <img src="https://sbi.insure/wp-content/uploads/2017/10/Teenager-Driving.jpg" className="background"/>
                <div className="overlay">
                    <div className="get-started-header">KidsOnTheGo</div>
                    <div className="get-started-subheader">
                        Help your young driver manage their newfound mobility -
                        lock, unlock & locate their vehicle no matter where you are!
                    </div>
                    <a href={this.props.authUrl}>
                        <button className="button">Connect Your Vehicles!</button>
                    </a>
                </div>
            </div>
        )
    }
}
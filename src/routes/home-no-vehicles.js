import React from 'react'
import axios from 'axios'
import './scss/home.scss'

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
        console.log(this.props.authUrl)
        return(
            <div>
                Hello
                <a href={this.props.authUrl}>
                    <button/>
                </a>

            </div>
        )
    }
}
import React from 'react'
import './scss/login.scss'

export default class Login extends React.Component{

    constructor(props) {
        super(props)

        this.login = this.login.bind(this)
    }

    login() {
        this.props.history.push({
            pathname: '/homeNoVehicles'
        })
    }

    render() {
        return(
            <div>
                <input type={'text'} placeholder={'Username'} required />
                <input type={'text'} placeholder={'Password'} required />
                <button type={'submit'} onClick={this.login} />
            </div>
        )
    }
}

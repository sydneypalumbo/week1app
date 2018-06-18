import React from 'react'
import { setIdToken, setAccessToken } from './../AuthService'

export default class AuthCallback extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        setAccessToken()
        setIdToken()
        window.location.href = "/"
    }

    render() {
        return null
    }
}

'use strict';
import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Store from './redux/create-store'

import Login from './routes/login'
import HomeContainer from './routes/containers/home-container'
import HomeNoVehiclesContainer from './routes/containers/home-no-vehicles-container'
import VehicleViewContainer from './routes/containers/vehicle-view-container'

render(
    <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeNoVehiclesContainer}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={HomeContainer}/>
                    <Route path="/vehicle-view" component={VehicleViewContainer}/>
                </Switch>
            </Router>
        </PersistGate>
    </Provider>,

document.getElementById('main')
);
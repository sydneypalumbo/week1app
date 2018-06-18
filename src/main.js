'use strict';
import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Store from './redux/create-store'
import { requireAuth } from './AuthService';

import Login from './routes/login'
import AuthCallback from './routes/auth-callback'
import HomeContainer from './routes/containers/home-container'
import HomeNoVehiclesContainer from './routes/containers/home-no-vehicles-container'
import VehicleViewContainer from './routes/containers/vehicle-view-container'

render(
    <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeNoVehiclesContainer} onEnter={requireAuth}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/auth-callback" commponent={AuthCallback}/>
                    <Route path="/home" component={HomeContainer} onEnter={requireAuth}/>
                    <Route path="/vehicle-view" component={VehicleViewContainer} onEnter={requireAuth}/>
                </Switch>
            </Router>
        </PersistGate>
    </Provider>,

document.getElementById('main')
);
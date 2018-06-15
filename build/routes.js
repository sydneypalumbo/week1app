const express = require('express');
const routes = express.Router();
const smartcar = require('smartcar');
const Promise = require('bluebird');
const cors = require('cors');

const PORT = process.env.PORT || 80;
const SMARTCAR_CLIENT_ID = process.env.SMARTCAR_CLIENT_ID;
const SMARTCAR_SECRET = process.env.SMARTCAR_SECRET;
const SMARTCAR_REDIRECT_URI = process.env.SMARTCAR_REDIRECT_URI || `http://localhost:${PORT}/callback`;
const SMARTCAR_MODE = process.env.SMARTCAR_MODE || 'development';

const client = new smartcar.AuthClient({
    clientId: SMARTCAR_CLIENT_ID,
    clientSecret: SMARTCAR_SECRET,
    redirectUri: SMARTCAR_REDIRECT_URI,
    development: SMARTCAR_MODE === 'development',
});

let ACCESS_TOKEN;
let AUTH_URL;
let CODE;
let NEW;
let VEHICLES = [];

routes.use(cors());

routes.get('/authUrl', (req, res, next)=>{
    if (AUTH_URL) {
        res.json(AUTH_URL)
    }
    else {
        res.json(client.getAuthUrl())
    }
});

routes.get('/callback', (req, res, next)=>{
    CODE = req.query ? req.query.code : null
    NEW = true
    res.redirect('/home')
});

routes.get('/vehicles', (req, res, next)=>{
    if (CODE && NEW) {
        res.redirect('/access')
    }
    else {
        throw 'No code yet'
    }
});

routes.get('/access', (req, res, next)=>{
    client.exchangeCode(CODE)
        .then((access) => {
            ACCESS_TOKEN = access ? access.accessToken : null
            if (ACCESS_TOKEN) {
                res.redirect('/newInfo')
            }
            else {
                throw "Failed to obtain access token"
            }
        })
});

routes.get('/newInfo', (req, res, next)=>{
    smartcar.getVehicleIds(ACCESS_TOKEN)
        .then((response)=>{
            const vehicleIds = response.vehicles
            const vehiclePromises = vehicleIds.map((vehicleId) => {
                const vehicle = new smartcar.Vehicle(vehicleId, ACCESS_TOKEN)
                VEHICLES.push({id: vehicleId, vehicle: vehicle})
                return vehicle.info()
            });
            Promise.all(vehiclePromises)
                .then((vehicles)=> {
                    NEW = false
                    res.json(vehicles)
                })
        })
        .catch(

        )

});


routes.get('/request', (req, res, next)=> {
    const {type, id} = req.query
    const vehicleObject = VEHICLES.find(vehicle => vehicle.id === id)
    let vehicle;
    if (vehicleObject) {
        vehicle = vehicleObject.vehicle
    }
    else {
        vehicle = new smartcar.Vehicle(id, ACCESS_TOKEN)
    }

    switch(type) {
        case 'INFO':
            vehicle.info()
                .then((response)=>{
                    res.json(response)
                })
                .catch((err)=>{
                    throw 'Could not retrieve vehicle info'
                });
            break;
        case 'LOCATE':
            vehicle.location()
                .then((response)=>{
                    res.json(response)
                })
                .catch((err)=>{
                    console.log(err)
                    throw 'Could not retrieve vehicle location'
                });
            break;
        case 'LOCK':
            vehicle.lock()
                .then((response)=>{
                    res.json(response)
                })
                .catch((err)=>{
                    throw 'Failed lock request'
                });
            break;
        case 'UNLOCK':
            vehicle.unlock()
                .then((response)=>{
                    res.json(response)
                })
                .catch((err)=>{
                    throw 'Failed unlock request'
                });
            break;
        case 'ODOMETER':
            vehicle.odometer()
                .then((response)=>{
                    res.json(response)
                })
                .catch((err)=>{
                    throw 'Could not retrieve vehicle odometer reading'
                });
            break;
        default:
            console.log(type)
            throw 'Not an valid type of request'
    }

});

module.exports = routes
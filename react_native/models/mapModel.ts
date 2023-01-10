import config from '../config/config.json';
import { IP } from '@env'
import Bike from '../interfaces/bike';
import ChargingBike from '../interfaces/chargingbike';
import { LatLng } from 'react-native-maps/lib/sharedTypes';

import polyDecoder from '@mapbox/polyline';
// import * as polyDecoder from '@mapbox/polyline';


const mapsModel = {
    getStations: async function getStations() {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/station`);

        const result = await response.json();

        const stations = result.data;

        return stations;
    },
    getBikesInRadius: async function getBikesInRadius(centerPoint: LatLng, radiusDegrees: number): Promise<Bike[]> {

        // 1 degree = 111 km
        // 1 km = 1000 m
        // radius = 1/2 diameter

        const latitude = centerPoint.latitude;
        const longitude = centerPoint.longitude;
        const radius = radiusDegrees * 111 * 1000 / 2;

        const response = await fetch(`http://${IP}:${config.port}${config.version}/bike/${longitude}/${latitude}/${radius}`);

        const result = await response.json();

        const bikes = result.data;

        return bikes;
    },
    getBikes: async function getBikes(): Promise<Bike[]> {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/bike`);

        const result = await response.json();

        const bikes = result.data;

        return bikes;
    },
    getChargingBikes: async function getBikes(): Promise<ChargingBike[]> {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/bike/charging`);
        const result = await response.json();

        const chargingBikes = result.data;

        return chargingBikes;
    },
    getBike: async function getBike(bikeId: number): Promise<Bike> {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/bike/${bikeId}`);

        const result = await response.json();

        const bike = result.data;

        return bike[0];
    },
    getGeofences: async function getGeofences() {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/geofence`);

        const result = await response.json();

        const geofences = result.data;

        return geofences;
    },
    getRoute: async function getGeofences(rentedPosition: LatLng | null, destination: LatLng) {

        const startLat = rentedPosition?.latitude;
        const startLong = rentedPosition?.longitude;
        const destinationLat = destination.latitude;
        const destinationLong = destination.longitude;

        const response = await fetch(`http://router.project-osrm.org/route/v1/biking/${startLong},${startLat};${destinationLong},${destinationLat}?alternatives=true&geometries=polyline`);

        const result = await response.json();

        const coordArr: number[][] = polyDecoder.decode(result.routes[0].geometry);

        const latLngArr: LatLng[] = [];

        coordArr.forEach(e => {
            latLngArr.push({
                latitude: e[0],
                longitude: e[1]
            });
        });

        return latLngArr;
    },
    simulateRoute: async function simulateRoute(userId: number, bikeId: number, rentedPosition: LatLng | null, destination: LatLng) {
        // todo: Connect to FLASK
        // const response = await fetch(`http://${IP}:8000/activate`);

        const pos = `${rentedPosition?.latitude},${destination.longitude}`;
        const dest = `${destination.latitude},${destination.longitude}`;

        // const body = {
        //     bike_id: bikeId,
        //     user_id: userId,
        //     position: pos,
        //     destination: dest
        // };

        // console.log(typeof(body.bike_id))
        // console.log(typeof(body.user_id))
        // console.log(typeof(body.position))
        // console.log(typeof(body.destination))

        // console.log("NEWWWBODYYY");
        // console.log(JSON.stringify(body));
        // console.log(typeof (JSON.stringify(body)))


        // fetch('https://mywebsite.com/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstParam: 'yourValue',
        //         secondParam: 'yourOtherValue',
        //     }),
        // });



        const response = await fetch(`http://${IP}:8000/activate/${bikeId}/${userId}/${pos}/${dest}`);

        console.log(pos);
        console.log(dest);


        // const response = await fetch(`http://${IP}:8000/activate`, {
        //     body: JSON.stringify({
        //         test: "erik",
        //         halloj: "oops"
        //     }),
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     method: 'POST'
        // });

        // const response = await fetch(`http://${IP}:8000/enable-activation`);

        // const result = await response.json();
        const result = await response.text();

        // console.log("-------------------------");
        // console.log(result);

        return result

    }
};

export default mapsModel;

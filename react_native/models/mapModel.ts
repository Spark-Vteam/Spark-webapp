import config from '../config/config.json';
import { IP } from '@env'
import Bike from '../interfaces/bike';
import { LatLng } from 'react-native-maps/lib/sharedTypes';

import polyDecoder from '@mapbox/polyline';
// import * as polyDecoder from '@mapbox/polyline';


const mapsModel = {
    getStations: async function getStations() {
        const response = await fetch(`http://${IP}:${config.port}/station`);

        const result = await response.json();

        const stations = result[0];

        return stations;
    },
    getBikesInRadius: async function getBikesInRadius() {
        // todo: send in latitudeDelta as a parameter (divide by 2?)
        // const response = await fetch(`http://${IP}:${config.port}/bike`);

        // const result = await response.json();

        // const bikes = result[0];

        // return bikes;
    },
    getBikes: async function getBikes(): Promise<Bike[] | null> {
        const response = await fetch(`http://${IP}:${config.port}/bike`);

        const result = await response.json();

        const bikes = result[0];

        return bikes;
    },
    getBike: async function getBikes(bikeId: number): Promise<Bike> {
        const response = await fetch(`http://${IP}:${config.port}/bike/${bikeId}`);

        const result = await response.json();

        const bike = result[0][0];

        return bike;
    },
    getGeofences: async function getGeofences() {
        const response = await fetch(`http://${IP}:${config.port}/geofence`);

        const result = await response.json();

        const geofences = result[0];

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
};

export default mapsModel;

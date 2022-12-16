import config from '../config/config.json';
import { IP } from '@env'
import Bike from '../interfaces/bike';

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

        console.log(bike);

        return bike;
    },
    getGeofences: async function getGeofences() {
        const response = await fetch(`http://${IP}:${config.port}/geofence`);

        const result = await response.json();

        // const test = await JSON.parse(result);

        // console.log(test);
        const geofences = result[0];
        // return null;
        return geofences;
    },
};

export default mapsModel;

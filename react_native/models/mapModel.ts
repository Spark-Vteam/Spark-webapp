import config from "../config/config.json";
import { IP } from '@env'

const mapsModel = {
    getStations: async function getStations() {
        const response = await fetch(`http://${IP}:${config.port}/bike`);

        const stations = await response.json();

        return stations;
    },
    getBikes: async function getBikes() {
        const response = await fetch(`http://${IP}:${config.port}/bike`);

        const result = await response.json();

        const bikes = result[0];

        return bikes;
    },
};

export default mapsModel;

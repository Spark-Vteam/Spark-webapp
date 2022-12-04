import config from "../config/config.json";
import { IP } from '@env'

const mapsModel = {
    getStations: async function getStations() {
        const response = await fetch(`http://${IP}:${config.port}/station`);

        const result = await response.json();

        const stations = result[0];

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

import config from '../config/config.json';
import { IP } from '@env'

const priceModel = {
    getPrice: async function getPrice() {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/pricing`);

        const result = await response.json();

        const price = result.data;

        return price[0];
    },
};

export default priceModel;

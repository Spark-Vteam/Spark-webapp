import config from '../config/config.json';
import { IP, API_KEY } from '@env'

const priceModel = {
    getPrice: async function getPrice() {
        const response = await fetch(`http://${IP}:${config.port}${config.version}/pricing`, {
            headers: {
                key: API_KEY
            }
        });

        const result = await response.json();

        const price = result.data;

        return price[0];
    },
};

export default priceModel;

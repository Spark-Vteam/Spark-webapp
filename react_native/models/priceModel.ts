import config from '../config/config.json';
import { IP } from '@env'

import Rent from '../interfaces/rent';

const priceModel = {
    getPrice: async function getPrice() {
        const response = await fetch(`http://${IP}:${config.port}/pricing`);

        const result = await response.json();

        const price = result.data;

        return price[0];
    },
};

export default priceModel;

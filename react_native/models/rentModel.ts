import config from '../config/config.json';
import { IP } from '@env'

import Rent from '../interfaces/rent';

const rentModel = {
    startRent: async function startRent(userId: number, bikeId: number) {

        const body = {
            userId: userId,
            bikeId: bikeId
        }

        // todo: Lägg in userId
        // från login när oAuth har implementerats.
        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/user/1`, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })

        const result = response.status;

        return result;
    },
    getRentsOnUser: async function getRentOnUser(): Promise<Rent[] | null> {
        // Is used by method getOngoingRent below

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/user/1`);

        const result = await response.json();

        const rents = result.data;

        return rents;
    },
    getOngoingRents: async function getOngoingRents() {

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/active/1`);

        const result = await response.json();

        const ongoingRent = result.data;

        return ongoingRent;
    },
    stopRent: async function stopRent() {

        const ongoingRents = await this.getOngoingRents();
        // hopefully there is just one...
        if (ongoingRents && ongoingRents.length > 0) {

            // console.log(ongoingRents);
            // console.log(ongoingRents.length);
            // console.log("---------------------");
            // console.log(ongoingRents[ongoingRents.length - 1].id);

            // console.log(ongoingRents[3]);
            // console.log(ongoingRents[3].id);

            const lastOngoingRent = ongoingRents[ongoingRents.length - 1];
            const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/${lastOngoingRent.id}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            })

            const result = await response.json();

            return result;
        }

        return 'No active rents';
    }
};

export default rentModel;

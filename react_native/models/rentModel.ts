import config from '../config/config.json';
import { IP } from '@env'

import Rent from '../interfaces/rent';
import authModel from './authModel';

const rentModel = {
    startRent: async function startRent(bikeId: number) {

        const userId = await authModel.getUserId()

        console.log("================================")
        console.log(userId);

        const body = {
            userId: userId,
            bikeId: bikeId
        }

        // todo: TESTA SEN ATT TA BORT BODY
        // från login när oAuth har implementerats.
        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/user/${userId}`, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })

        const result = response.status;

        console.log(result);

        return result;
    },
    getRentsOnUser: async function getRentOnUser(): Promise<Rent[]> {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/user/${userId}`);

        const result = await response.json();


        const rents = result.data;

        return rents;
    },
    getOngoingRents: async function getOngoingRents() {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/active/${userId}`);

        const result = await response.json();

        const ongoingRent = result.data;

        return ongoingRent;
    },
    getInvoices: async function getInvoices() {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/invoice/user/${userId}`);

        const result = await response.json();

        const invoices = result.data;

        return invoices;
    },
    stopRent: async function stopRent() {

        const ongoingRents = await this.getOngoingRents();
        // hopefully there is just one...
        if (ongoingRents && ongoingRents.length > 0) {
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

import config from '../config/config.json';
import { IP, API_KEY } from '@env'

import Rent from '../interfaces/rent';
import authModel from './authModel';

const rentModel = {
    startRent: async function startRent(bikeId: number) {

        const userId = await authModel.getUserId()

        const body = {
            userId: userId,
            bikeId: bikeId
        }

        // console.log(userId);
        console.log(body);

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/create/${userId}`, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                key: API_KEY
            },
            method: 'POST'
        })

        const result = response.status;

        return result;
    },
    getRentsOnUser: async function getRentOnUser(): Promise<Rent[]> {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/user/${userId}`, {
            headers: {
                'content-type': 'application/json',
                'key': API_KEY
            },
        });

        const result = await response.json();


        const rents = result.data;

        return rents;
    },
    getOngoingRents: async function getOngoingRents() {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/rent/active/${userId}`, {
            headers: {
                'content-type': 'application/json',
                'key': API_KEY
            },
        });

        const result = await response.json();

        const ongoingRent = result.data;

        return ongoingRent;
    },
    getInvoices: async function getInvoices() {

        const userId = await authModel.getUserId()

        const response = await fetch(`http://${IP}:${config.port}${config.version}/invoice/user/${userId}`, {
            headers: {
                'content-type': 'application/json',
                'key': API_KEY
            },
        });

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
                    'content-type': 'application/json',
                    'key': API_KEY
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

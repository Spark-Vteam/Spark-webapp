import config from "../config/config.json";
import { IP } from '@env'

import Rent from "../interfaces/rent";

const rentModel = {
    startRent: async function startRent(userId: number, bikeId: number) {

        const body = {
            userId: userId,
            bikeId: bikeId
        }

        // todo: ta bort 1 från url sen och använd bara body
        // när backend har uppdaterats. Sen lägg in userId
        // från login när oAuth har implementerats.
        const response = await fetch(`http://${IP}:${config.port}/rent/user/1`, {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })

        // hantera om error om t.ex. cykeln redan hann bli uthyrd
        // todo: hantera om response.status !== 200 (skulle vara coolt att särkskilja
        // på olika fel typ bike är redan tagen vs något är fel i systemet)
        const result = response.status;

        return result;
    },
    getRentsOnUser: async function getRentOnUser(): Promise<Rent[] | null> {
        // Is used by method getOngoingRent below

        const response = await fetch(`http://${IP}:${config.port}/rent/user/1`);

        const result = await response.json();

        const rents = result[0];

        return rents;
    },
    getOngoingRent: async function getOngoingRent(userId: number) {
        const allRentsOnUser = await this.getRentsOnUser();

        if (allRentsOnUser) {
            const findActiveRent = allRentsOnUser.find((e) => {
                return e.Status === 10; // code for active
            });

            return findActiveRent;   // can be null
        }

        return null;
    },
    stopRent: async function stopRent(userId: number) {

        const ongoingRent = await this.getOngoingRent(userId);

        if (ongoingRent) {
            // todo: ha findRent.id i body istället för i param?
            const response = await fetch(`http://${IP}:${config.port}/rent/${ongoingRent.id}`, {
                // body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            })

            // todo: hantera om response.status !== 200 , typ nåt systemfel
            const result = response.status;

            return result;
        }

        return "No active rents";
    }
};

export default rentModel;

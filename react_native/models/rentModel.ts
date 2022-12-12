import config from "../config/config.json";
import { IP } from '@env'

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
    getRentsOnUser: async function getRentOnUser() {

        const response = await fetch(`http://${IP}:${config.port}/rent/user/1`);

        const result = await response.json();

        const rents = result[0];

        return rents;
    },
    stopRent: async function stopRent(userId: number, bikeId: number) {

        const allRentsOnUser = await this.getRentsOnUser(userId);

        // console.log(allRentsOnUser);

        const findRent = allRentsOnUser.find((e) => {
            return e.Bikes_id === bikeId;
        });

        // todo: ha findRent.id i body istället för i param?
        const response = await fetch(`http://${IP}:${config.port}/rent/${findRent.id}`, {
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
};

export default rentModel;

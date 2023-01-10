import config from '../config/config.json';
import { IP } from '@env'

import storageModel from './storageModel';

const authModel = {
    getUserId: async function getUserId() {
        const authInfo = await storageModel.readAuthInfo();
        return authInfo.userId;
    },
    getAuthStorage: async function loggedIn() {
        const authInfo = await storageModel.readAuthInfo();
        if (authInfo) {
            const twentyFourHours = 1000 * 60 * 60 * 24;
            const notExpired = (new Date().getTime() - authInfo.date) < twentyFourHours;
            if (notExpired) {
                return authInfo;
            }
            return false;
        }
        return false;
    },
    logIn: async function logIn(email: string, password: string) {
        const data = {
            // api_key: config.api_key,
            emailAdress: email,
            password: password,
        };

        const response = await fetch(`http://${IP}:${config.port}${config.version}/user/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        if (result?.data?.token) {
            // store both token and userId
            await storageModel.storeToken(result.data.token, result.data.info.user.id);
        }


        return result;
    },
    // register: async function register(email: string, password: string) {
    //     // const data = {
    //     //     api_key: config.api_key,
    //     //     email: email,
    //     //     password: password,
    //     // };
    //     // const response = await fetch(`${config.base_url}/auth/register`, {
    //     //     method: "POST",
    //     //     body: JSON.stringify(data),
    //     //     headers: {
    //     //         'content-type': 'application/json'
    //     //     },
    //     // });

    //     // const result = await response.json();

    //     // // errors kommer med som property om login inte lyckas, då returner
    //     // // vi istället ett flash meddelande.
    //     // if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
    //     //     return {
    //     //         title: "Misslyckat",
    //     //         message: `${email} är redan registrerad`,
    //     //         type: "danger",
    //     //     };
    //     // }

    //     // return {
    //     //     title: "Lyckat",
    //     //     message: "Du är registrerad",
    //     //     type: "success",
    //     // };
    // },
    logOut: async function logOut() {
        await storageModel.deleteToken();
    }
};

export default authModel;
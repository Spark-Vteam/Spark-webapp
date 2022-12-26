import config from "../config/config.json";

import storageModel from "./storageModel";

const authModel = {
    loggedIn: async function loggedIn() {
        // const token = await storageModel.readToken();
        // if (token) {
        //     const twentyFourHours = 1000 * 60 * 60 * 24;
        //     const notExpired = (new Date().getTime() - token.date) < twentyFourHours;
        //     return token && notExpired;
        // }
        // return false;
    },
    logIn: async function logIn(email: string, password: string) {
        // const data = {
        //     api_key: config.api_key,
        //     email: email,
        //     password: password,
        // };
        // const response = await fetch(`${config.base_url}/auth/login`, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        // });

        // const result = await response.json();

        // // errors kommer med som property om login inte lyckas, då returner
        // // vi istället ett flash meddelande.
        // if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
        //     return {
        //         title: "Misslyckat",
        //         message: "Fel e-post eller lösenord",
        //         type: "danger",
        //     };
        // }

        // await storageModel.storeToken(result.data.token);

        // return {
        //     title: "Lyckat",
        //     message: "Du är inloggad",
        //     type: result.data.type,
        // };
    },
    register: async function register(email: string, password: string) {
        // const data = {
        //     api_key: config.api_key,
        //     email: email,
        //     password: password,
        // };
        // const response = await fetch(`${config.base_url}/auth/register`, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        // });

        // const result = await response.json();

        // // errors kommer med som property om login inte lyckas, då returner
        // // vi istället ett flash meddelande.
        // if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
        //     return {
        //         title: "Misslyckat",
        //         message: `${email} är redan registrerad`,
        //         type: "danger",
        //     };
        // }

        // return {
        //     title: "Lyckat",
        //     message: "Du är registrerad",
        //     type: "success",
        // };
    },
    logOut: async function logOut() {
        // await storageModel.deleteToken();
    }
};

export default authModel;
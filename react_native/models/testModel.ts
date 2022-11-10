import config from "../config/config.json";


const testModel = {
    getSomething: async function getSomething() {
        const response = await fetch(`${config.base_url}/`);
        const result = await response.json();
        return result.data;
    },
};

export default testModel;
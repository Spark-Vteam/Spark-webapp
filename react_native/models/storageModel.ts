import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string, userId: number) {
        try {
            const tokenAndDate = {
                token: token,
                userId: userId,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@authInfo', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readAuthInfo: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@authInfo');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@authInfo');
    }
};

export default storage;
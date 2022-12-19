import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text } from 'react-native';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/557855b97d53b5914a63',
};

export default function LoginTest() {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: '557855b97d53b5914a63',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'reactNativeApp'
            }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log(code);
        }
    }, [response]);

    return (
        <View>
            <Text>TESTING LOGIN WITH GITHUB OAUTH</Text>
            <Button
                // disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
}
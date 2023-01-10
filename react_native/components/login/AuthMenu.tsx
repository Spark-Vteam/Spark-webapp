import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Auth from '../../interfaces/auth';

import authModel from '../../models/authModel'
import { Base } from '../../styles';

import AuthFields from './Authfields';


export default function AuthMenu(props: {
    setUserId: (value: number) => void,
    setIsLoggedIn: (vale: boolean) => void,
    isLoading: Boolean
}) {

    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {

        if (auth.email && auth.password) {
            const result = await authModel.logIn(auth.email, auth.password);
            if (result?.msg === "No user found" || result?.errors?.message === "Password not correct") {
                showMessage({
                    message: "Incorrect e-mail or password",
                    // description: `Incorrect e-mail or password`,
                    type: "warning",
                });
                return
            }
            if (result?.data?.token) {
                props.setUserId(result.data.info.user.id);
                props.setIsLoggedIn(true);
                return
            }
            showMessage({
                message: "Sorry, an unexpected error occured :(",
                // description: `Sorry, an unexpected error occured :(`,
                type: "danger",
            });
            return

        }

        showMessage({
            message: "One or more fields are not filled in",
            // description: "One or more fields are not filled in",
            type: "info",
        });

    }


    return (
        <View style={Base.base}>
        {
            props.isLoading ?
                    <View style={Base.centerChild as any}>
                        <ActivityIndicator animating={true} color='#FF5719' size={70} />
                    </View>
            :
            <AuthFields
                auth={auth}
                setAuth={setAuth}
                submit={doLogin}
            />
        }
        </View>
    );
}
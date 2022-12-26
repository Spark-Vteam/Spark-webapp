import { useState } from 'react';
// import { showMessage } from 'react-native-flash-message';
import Auth from '../../interfaces/auth';

// import AuthModel from '../../models/authModel'

import AuthFields from './Authfields';


export default function AuthMenu(props: {
    setIsLoggedIn: (vale: boolean) => void
}) {

    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        props.setIsLoggedIn(true);

        // Todo: replace above with this
        // if (auth.email && auth.password) {
        //     const result = await AuthModel.logIn(auth.email, auth.password);

        //     if (result.type === 'success') {
        //         props.setIsLoggedIn(true);
        //     }

        //     showMessage({
        //         message: result.title,
        //         description: result.message,
        //         type: result.type,
        //     });
        // } else {
        //     showMessage({
        //         message: 'Varning',
        //         description: 'E-post och/eller lösenord saknas',
        //         type: 'warning',
        //     });
        // }
    }

    return (
            <AuthFields
                auth={auth}
                setAuth={setAuth}
                submit={doLogin}
            />
    );
}
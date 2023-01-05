import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Typography, FormStyle, Base, ButtonStyle, Images } from '../../styles';

// import { IP } from '@env'
// import config from '../../config/config.json';

import Auth from '../../interfaces/auth';

export default function AuthFields(props: {
    auth: Partial<Auth>,
    setAuth: (auth: Partial<Auth>) => void,
    submit: () => void
}) {

    return (
        <View style={Base.paddedContent}>
            <Image
                style={Images.logo as any}
                source={require('../../assets/Logo.png')}
            />
            <TextInput
                style={FormStyle.input as any}
                onChangeText={(content: string) => {
                    props.setAuth({ ...props.auth, email: content })
                }}
                value={props.auth?.email}
                placeholder={'Email'}
                keyboardType="email-address"
                autoCapitalize="none"
                multiline={false}
                />
            <TextInput
                style={FormStyle.input as any}
                onChangeText={(content: string) => {
                    props.setAuth({ ...props.auth, password: content })
                }}
                value={props.auth?.password}
                placeholder={'Password'}
                secureTextEntry={true}
                autoCapitalize="none"
                multiline={false}
            />
            <TouchableOpacity
                testID="button"
                style={ButtonStyle.buttonBlue as any}
                onPress={props.submit}
            >
                <Text style={ButtonStyle.buttonText as any}>Log in</Text>
            </TouchableOpacity>
            <Text style={Base.bottomPosition as any}> Please note that you need to register at <Text style={Typography.bold as any}>http://localhost:3000/</Text> using a computer. This is currently not possible to do on mobile device.</Text>
            {/* <TouchableOpacity
                testID="button"
                style={ButtonStyle.buttonBlue as any}
                onPress={() => {
                    // Links to web client (not working there though with oAuth on mobie device)
                    Linking.openURL(`http://${IP}:3000/`);
                }}
            >
                <Text style={ButtonStyle.buttonText as any}>Register</Text>
            </TouchableOpacity> */}
        </View>
    );
}
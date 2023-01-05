import React from 'react';
import { View, Text, Image } from 'react-native';

import { MapStyle, Images } from '../../styles';



export default class UserPanel extends React.Component {

    render() {

        return (

            <View style={MapStyle.panelShort as any}>
                <Image
                    style={Images.panelLogo as any}
                    source={require('../../assets/logos/UserLogo.png')}
                />
                <Text style={MapStyle.panelTitle as any}>Your position</Text>
                <Text style={MapStyle.panelTextMiddle as any}>You look really good from here :)</Text>
                <Text></Text>
            </View>
        );
    }
}
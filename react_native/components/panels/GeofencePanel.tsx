import React from 'react';
import { Text, View, Image } from 'react-native';
import { MapStyle, Images } from '../../styles/index';



// Panel with info about rules inside geofence
export default class GeofencePanel extends React.Component<{
    name: string,
    info: string,
    logo: number
}> {
    render() {
        const { name, info, logo } = this.props;


        return (
            <View style={MapStyle.panelShort as any}>
                <Image
                    style={Images.panelLogo as any}
                    source={logo}
                />
                <Text style={MapStyle.panelTitle as any}>{name}</Text>
                <Text style={MapStyle.panelTextMiddlePadded as any}>{info}</Text>
            </View>
        );
    }
}
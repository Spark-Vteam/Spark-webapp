import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

import { Images } from '../../styles/index';

// Create a unique user Marker using
// cooridates from currectLocation.
export default class UserMarker extends React.Component<{ currentLocation: any }> {

    render() {
        const { currentLocation } = this.props;

        return (
            <Marker coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }}>
                <Image
                    style={Images.pinSquareSmall}
                    source={require("../../assets/User.png")} />
            </Marker>
        );
    }
}
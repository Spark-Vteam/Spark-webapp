import React from 'react';
import { Marker } from 'react-native-maps';

// Create a unique user Marker using
// cooridates from currectLocation.
export default class UserMarker extends React.Component<{ currentLocation: any }> {

    render() {


        console.log("please");

        return (
            <Marker coordinate={{
                latitude: this.props.currentLocation.latitude,
                longitude: this.props.currentLocation.longitude
            }}
                image={require('../../assets/User.png')}
                key={this.props.currentLocation.latitude}
            />

        );
    }
}
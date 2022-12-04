import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Base, Typography, Images } from '../styles/index';

// Create a custom Marker using
// cooridates and image from props.
export default class CustomMarker extends PureComponent<{ coordinates: LatLng, img: number }>{

    render() {
        const { coordinates, img } = this.props;
        return (
            <Marker
                coordinate={coordinates}
                tracksViewChanges={false}
            >
                <Image
                    style={Images.pin}
                    source={img}
                />
            </Marker>
        );
    }
}
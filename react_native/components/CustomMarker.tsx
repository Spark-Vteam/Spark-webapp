import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Base, Typography, Images } from '../styles/index';

import Map from './Map';


// Creates a custom Marker using cooridates and image from props.
export default class CustomMarker extends PureComponent
    <{
        coordinates: LatLng,
        id: number
        img: number
        onpress: Function
    }>{

    render() {
        const { coordinates, img, id, onpress } = this.props;
        return (
            <Marker
                coordinate={coordinates}
                tracksViewChanges={false}
                onPress={() => onpress(id)}
            >
                <Image
                    style={Images.pin}
                    source={img}
                />
            </Marker>
        );
    }
}
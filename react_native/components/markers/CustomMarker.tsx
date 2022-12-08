import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Images } from '../../styles/index';

import CustomMarkerOnPress from '../../interfaces/customMarkerOnPress';



// Creates a custom Marker using cooridates and image from props.
export default class CustomMarker extends PureComponent
    <{
        coordinates: LatLng,
        id: number
        img: number
        onpress: CustomMarkerOnPress
    }>{

    render() {

        const { coordinates, img, id, onpress } = this.props;
        return (
            <Marker
                coordinate={coordinates}
                tracksViewChanges={false}
                onPress={() => onpress(id, coordinates)}
            >
                <Image
                    style={Images.pin}
                    source={img}
                />
            </Marker>
        );
    }
}
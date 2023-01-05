import React, { PureComponent } from 'react';
import { LatLng, Marker } from 'react-native-maps';


// Creates a custom Marker using cooridates and image from props.
export default class CustomMarker extends PureComponent
    <{
        coordinates: LatLng,
        img: number
        onpress: any
    }>{

    render() {

        const { coordinates, img, onpress } = this.props;

        return (
            <Marker
                testID="marker"
                coordinate={coordinates}
                onPress={onpress}
                image={img}
            />
        );
    }
}
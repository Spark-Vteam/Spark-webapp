import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Images } from '../../styles/index';


// Creates a custom smaller Marker using cooridates and image from props.
export default class CustomMarkerSmall extends PureComponent
    <{
        coordinates: LatLng,
        img: number
        onpress: any
        trackViewChanges: boolean
    }>{

    render() {

        const { coordinates, img, onpress, trackViewChanges } = this.props;
        return (
            <Marker
                coordinate={coordinates}
                tracksViewChanges={trackViewChanges}
                onPress={onpress}
            >
                <Image
                    style={Images.pinSmall}
                    source={img}
                />
            </Marker>
        );
    }
}
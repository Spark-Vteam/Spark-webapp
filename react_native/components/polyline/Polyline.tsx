import React from 'react';
import { LatLng, Polyline } from 'react-native-maps';


// Creates a Polyline using arays of cooridates
export default class Pline extends React.Component
    <{
        coordinates: LatLng[], // array of arrays of numbers
    }>{

    render() {
        const { coordinates } = this.props;

        return (
            <Polyline
                coordinates={coordinates}
                strokeWidth={8}
                strokeColor={'#00B0FF'}
            />
        );
    }
}
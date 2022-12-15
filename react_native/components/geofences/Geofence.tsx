import React, { ReactNode } from 'react';
import { LatLng, Polygon } from 'react-native-maps';


// Creates a geofence using arays of cooridates, info, type and an onpress function.
export default class Geofence extends React.Component
    <{
        coordinates: number[][], // array of arrays of numbers
        color: string
        onpress: () => void
    }>{

    render() {
        const { coordinates, color, onpress } = this.props;

        const coordinatesCorrectFormat: LatLng[] = []

        coordinates.forEach((e) => {
            coordinatesCorrectFormat.push({
                latitude: e[0],
                longitude: e[1]
            })
        })

        return (
            <Polygon
                coordinates={coordinatesCorrectFormat}
                strokeWidth={0}
                strokeColor={'rgba(255, 244, 0, 0.0)'}
                fillColor={color}
                tappable={true}
                onPress={onpress}
            />
        );
    }
}
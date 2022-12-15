import React from 'react';
import { LatLng, Polygon } from 'react-native-maps';


// Creates a geofence using arays of cooridates, info, type and an onpress function.
export default class Geofence extends React.Component
    <{
        coordinates: number[][], // array of arrays of numbers
        color: string
        onpress: any
        // info: string,
        // onpress: () => void // får nog ändras sen
    }>{

    render() {
        const { coordinates, color, onpress } = this.props;

        let coordinatesCorrectFormat: LatLng[] = []

        coordinates.forEach((e) => {
            coordinatesCorrectFormat.push({
                latitude: e[0],
                longitude: e[1]
            })
        })

        // console.log(coordinatesCorrectFormat);

        return (
            <Polygon
                coordinates={coordinatesCorrectFormat}
                strokeWidth={0}
                fillColor={color}
                tappable={true}
                onPress={onpress}
            />
        );
    }
}
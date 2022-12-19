import React from 'react';
import { LatLng, Polygon } from 'react-native-maps';


// Creates a geofence using arays of cooridates, info, type and an onpress function.
export default class Geofence extends React.Component
    <{
        coordinates: number[][], // array of arrays of numbers
        color: string,
        borderColor: string,
        onpress: () => void,
    }>{

    render() {
        const { coordinates, color, borderColor, onpress } = this.props;

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
                strokeWidth={3}
                strokeColor={borderColor}
                fillColor={color}
                tappable={true}
                onPress={() => {
                    // Setting timer to let e.nativeEvent.action
                    // happen on MapView component first.
                    // Otherwise panel will be set to null from there.
                    setTimeout(function () {
                        onpress();
                    }, 50);

                }}
            />
        );
    }
}
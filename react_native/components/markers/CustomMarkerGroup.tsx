import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { LatLng } from 'react-native-maps';

import Bike from '../../interfaces/bike';
import Station from '../../interfaces/station';
import CustomMarkerOnPress from '../../interfaces/customMarkerOnPress';

import CustomMarker from './CustomMarker';


export default class CustomMarkerArr extends React.Component
    <{
        listOfObjects: Bike[] | Station[],
        img: number,
        onpress: CustomMarkerOnPress
    }> {


    /**
     * Class method to create group of custom markers (for example bikes and stations)
     * @param {Bikes[]} listOfObjects array with bikes or stations
     * @param {number} img for example <require("../assets/pin.png")>
     * @param {string} onpress set function called when pressing marker on map>
     * @return {ReactNode | null} returns an group of markers or null if not valid coordinates
     */
    createMarkers = (
        listOfObjects: Bike[] | Station[],
        img: number,
        onpress: (id: number, coordinates: LatLng) => void)
        :ReactNode | null => {
        return listOfObjects.map((listItem: Bike | Station, index: number) => {

            const lat = listItem.Position.split(',')[0];
            const long = listItem.Position.split(',')[1];

            if (typeof (lat) == 'string' &&
                lat.length > 0 &&
                typeof (long) == 'string' &&
                long.length > 0) {
                return <CustomMarker
                    key={index}
                    coordinates={{
                        latitude: parseFloat(lat),
                        longitude: parseFloat(long)
                    }}
                    img={img}
                    id={listItem.id}
                    onpress={onpress}
                />
            }
            // Invariant Violation error (when using wrong data format) is not caught by
            // catch-statement. Therefore the if statement above is used.
            console.warn('Invalid coordinates at' + JSON.stringify(listItem));
            return null
        })
    };

    render() {

        const { listOfObjects, img, onpress } = this.props;



        const listMarkers = this.createMarkers(listOfObjects, img, onpress);

        return (
            <View>
                {listMarkers}
            </View>
        );
    }
}
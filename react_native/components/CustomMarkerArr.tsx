import React, { ReactNode } from "react";
import { Image, View } from 'react-native';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import CustomMarker from './CustomMarker';


export default class CustomMarkerArr extends React.Component
    <{
        listOfObjects: Array<Bike> | Array<Station>,
        img: number,
        onpress:Function
    }> {


    /**
     * Class method to create array of custom markers (for example bikes and stations)
     * @param {Array<Bikes>} listOfObjects array with bikes or stations
     * @param {number} img for example <require("../assets/pin.png")>
     * @param {string} type specify 'bike' or 'station' to get proper onPress in CustomMarker>
     * @return {ReactNode | null} returns an array with markers or null if not valid coordinates
     */
    createMarkers = (
        listOfObjects: Array<Bike> | Array<Station>, img: number, onpress: Function): ReactNode | null => {
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
            console.warn("Invalid coordinates at" + JSON.stringify(listItem));
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
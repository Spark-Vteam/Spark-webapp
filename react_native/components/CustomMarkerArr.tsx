import React, { ReactNode } from "react";
import { Image, View } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Base, Typography, Images } from '../styles/index';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import CustomMarker from './CustomMarker';


export default class CustomMarkerArr extends React.Component
    <{
        listOfObjects: Array<Bike> | Array<Station>,
        img: number
    }> {


    /**
     * Method to create array of custom markers (for example bikes and stations)
     * @param {Array<Bikes>} listOfObjects array with bikes or stations
     * @param {number} img for example <require("../assets/pin.png")>
     * @return {ReactNode}
     */
    createMarkers = (
        listOfObjects: Array<Bike> | Array<Station>, img: number): ReactNode => {

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
                />
            }
            // Invariant Violation error (when using wrong data format) is not caught by
            // catch-statement. Therefore the if statement above is used.
            console.warn("Invalid coordinates at" + JSON.stringify(listItem));
            return null
        })
    };

    render() {
        const { listOfObjects, img } = this.props;

        const listMarkers = this.createMarkers(listOfObjects, img);

        return (
            <View>
                {listMarkers}
            </View>
        );
    }
}
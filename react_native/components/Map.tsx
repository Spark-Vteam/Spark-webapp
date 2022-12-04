import React, { ReactNode } from "react";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';
import mapsModel from '../models/mapModel';
import { Base, Typography, MapStyle, Images } from '../styles/index';


import CustomMarker from './CustomMarker';

export default class Map extends React.Component {

    state: {
        locationmarker: null | ReactNode,
        bikeMarkers: null | Array<ReactNode>,
        stationMarkers: null | Array<ReactNode>
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            locationmarker: null,
            bikeMarkers: null,
            stationMarkers: null
        };
    }

    /**
     * Method to create markers (for example bikes and stations)
     * @param {Array<Bikes>} listOfObjects array with bikes or stations
     * @param {number} img for example <require("../assets/pin.png")>
     * @return {any}
     */
    createMarkers = (listOfObjects: Array<Bike> | Array<Station>, img: number): ReactNode => {
        return listOfObjects.map((listItem: Bike | Station, index: number) => {

            const lat = listItem.Position.split(',')[0];
            const long = listItem.Position.split(',')[1];

            if (typeof(lat) == 'string' &&
                lat.length > 0 &&
                typeof (long) == 'string' &&
                long.length > 0)
            {
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

    // 'componentDidMount' is the equivalent of onEffect,
    // except it will only run once (no dependencies)
    async componentDidMount() {

        // GET USERS LOCATION AND SET LOCATIONMARKER    // todo: flytta ut till egen komponent?
        // ============================================
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // hantera på något sätt
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});

        this.setState({
            locationmarker:
            <Marker coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}>
                    <Image
                        style={Images.pinSquareSmall}
                        source={require("../assets/User.png")} />
            </Marker>
        });

        // GET BIKE AND STATIONS AND SET MARKERS
        // ============================================
        const bikes: Array<Bike> = await mapsModel.getBikes();
        const stations: Array<Station> = await mapsModel.getStations();
        this.setState({
            bikeMarkers: this.createMarkers(bikes, require("../assets/Active.png")),
            stationMarkers: this.createMarkers(stations, require("../assets/ChargingStation.png"))
        });
    }

    render() {
        // Initial region is set to Lund for testing. Replace later
        // to set initial region to where user is.
        const initialRegion = {
            latitude: 55.7047,
            longitude: 13.1910,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };

        return <View style={MapStyle.mapContainer}>
            <MapView style={MapStyle.map} initialRegion={initialRegion}>
                {this.state.locationmarker}
                {this.state.bikeMarkers}
                {this.state.stationMarkers}
            </MapView>
        </View>
    }
}
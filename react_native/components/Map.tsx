import React, { ReactNode } from "react";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';
import mapsModel from '../models/mapModel';
import { Base, Typography, MapStyle, Images } from '../styles/index';

import CustomMarkerArr from "./CustomMarkerArr";
import UserMarker from "./UserMarker";

export default class Map extends React.Component {

    state: {
        locationmarker: null | ReactNode,
        bikes: null | Array<Object>,
        bikeMarkers: null | Array<ReactNode>,
        stationMarkers: null | Array<ReactNode>
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            locationmarker: null,
            bikes: null,
            bikeMarkers: null,
            stationMarkers: null
        };
    }

    // 'componentDidMount' is the equivalent of onEffect,
    // except it will only run once (no dependencies)
    async componentDidMount() {

        // GET USERS LOCATION AND SET LOCATIONMARKER
        // ============================================
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // hantera på något sätt
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});

        this.setState({
            locationmarker: <UserMarker currentLocation={currentLocation} />
        });

        // GET BIKE AND STATIONS AND SET MARKERS
        // ============================================
        const bikes: Array<Bike> = await mapsModel.getBikes();
        const stations: Array<Station> = await mapsModel.getStations();
        this.setState({
            bikeMarkers: <CustomMarkerArr
                listOfObjects={bikes}
                img={require("../assets/Active.png")}
            />,
            stationMarkers: <CustomMarkerArr
                listOfObjects={stations}
                img={require("../assets/ChargingStation.png")}
            />
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
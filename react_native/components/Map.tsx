import React from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
// import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import mapsModel from '../models/mapModel';

import CustomMarker from './CustomMarker';

export default class Map extends React.Component {

    state: {
        locationmarker: null,
        bikeMarkers: null,
        stationMarkers: null
    }

    constructor(props: any) {
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
     * @param {number} img for example require("../assets/pin.png")
     * @return {any}
     */
    createMarkers = (listOfObjects: Array<Bike>, img: number): any => {
        return listOfObjects.map((listItem: Bike, index: number) => {
            if (typeof(listItem.Position.split(',')[0]) == 'string' &&
                listItem.Position.split(',')[0].length > 0 &&
                typeof (listItem.Position.split(',')[1]) == 'string' &&
                listItem.Position.split(',')[1].length > 0)
            {
                return <CustomMarker
                    key={index}
                    coordinates={{
                        latitude: parseFloat(listItem.Position.split(',')[0]),
                        longitude: parseFloat(listItem.Position.split(',')[1])
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

        // GET USERS LOCATION AND SET LOCATIONMARKER
        // ============================================
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // hantera på något sätt
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});

        this.setState({
            locationmarker: <Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="You"
                identifier="here"
                pinColor="blue"
            />
        });

        // GET BIKE AND STATIONS AND SET MARKERS
        // ============================================
        const bikes = await mapsModel.getBikes();
        const stations = await mapsModel.getStations();
        this.setState({
            bikeMarkers: this.createMarkers(bikes, require("../assets/Active.png")),
            stationMarkers: this.createMarkers(stations, require("../assets/ChargingStation.png"))
        })
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

        return <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={initialRegion}
                // Parameters below can be used for clustered MapView
                // from react-native-map-clustering
                // ---------------------
                // tracksViewChanges={false}
                // maxZoom={20}
                // spiralEnabled={false}
                // clusteringEnabled={false}
            >
                {this.state.locationmarker}
                {this.state.bikeMarkers}
                {this.state.stationMarkers}
            </MapView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    }
});

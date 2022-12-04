import React from "react";
// import MapView from "react-native-map-clustering";
// import { Marker } from "react-native-maps";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import mapsModel from '../models/mapModel';

import CustomMarker from './CustomMarker';

export default class Map extends React.Component {

    state: {
        locationmarker: null,
        bikeMarkers: null
    }

    constructor(props: any) {
        super(props);
        this.state = {
            locationmarker: null,
            bikeMarkers: null
        };
    }

    // 'componentDidMount' is the equivalent of onEffect,
    // except it will only run once (no dependencies)
    async componentDidMount() {

        // GET USERS LOCATION AND SET AS LOCATIONMARKER
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

        // GET BIKE LOCATIONS AND SET AS BIKESMARKERS
        // ============================================
        const bikes = await mapsModel.getBikes();

        let list = [];

        for (let i = 0; i < 1000; i++) {
            list.push(bikes[i]);
        }

        this.setState({
            bikeMarkers: bikes.map((bikeItem: Bike, index: number) => {
                return <CustomMarker
                    key={index}
                    coordinates={{
                        latitude: parseFloat(bikeItem.Position.split(',')[0]),
                        longitude: parseFloat(bikeItem.Position.split(',')[1])
                    }}
                    img={require("../assets/pin.png")}
                />
            })
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

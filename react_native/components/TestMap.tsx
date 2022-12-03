import React from "react";
// import MapView from "react-native-map-clustering";
// import { Marker } from "react-native-maps";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import mapsModel from '../models/mapModel';

import TestMarker from './CustomMarker/TestMarker';

export default class TestMap extends React.Component {

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

        // this.setState({
        //     locationmarker: <TestMarker
        //         coordinates={{
        //         latitude: currentLocation.coords.latitude,
        //         longitude: currentLocation.coords.longitude
        //     }} />
        // });
        // this.setState({
        //     locationmarker: <Marker
        //         coordinate={{
        //             latitude: currentLocation.coords.latitude,
        //             longitude: currentLocation.coords.longitude
        //         }}
        //         title="You"
        //         identifier="here"
        //         pinColor="blue"
        //     >
        //         <Image
        //             style={Images.pin}
        //             source={require("../assets/favicon.png")}
        //         />
        //     </Marker>
        // });
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
            bikeMarkers: bikes.map((bikeItem: Bike, index: number) => {  //
                return <TestMarker
                    key={index}
                    coordinates={{
                        latitude: parseFloat(bikeItem.Position.split(',')[0]),
                        longitude: parseFloat(bikeItem.Position.split(',')[1])
                    }}
                />
                // return <Marker
                //     coordinate={{
                //         latitude: parseFloat(bikeItem.Position.split(',')[0]),
                //         longitude: parseFloat(bikeItem.Position.split(',')[1])
                //     }}
                //     title="Bike"
                //     // tracksViewChanges={false}
                //     key={index}
                //     icon={require("../assets/testpin.png")}
                //     // identifier="here"
                //     pinColor="red"
                // />
            })
        })
    }

    render() {
        const initialRegion = {
            latitude: 55.7047,
            longitude: 13.1910,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
        // const initialRegion = {
        //     latitude: 37.72825,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.25,
        //     longitudeDelta: 0.15
        // };

        function renderRandomMarkers(n) {
            const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
            return new Array(n).fill().map((x, i) => (
                <Marker
                    key={i}
                    coordinate={{
                        latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
                        longitude: longitude + (Math.random() - 0.5) * longitudeDelta
                    }}
                />
            ));
        }

        return <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={initialRegion}
                // tracksViewChanges={false}
                // maxZoom={20}
                // spiralEnabled={false}
                // clusteringEnabled={false}
            >
                {/* {renderRandomMarkers(144)} */}
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

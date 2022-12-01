import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Base, Typography } from '../styles/index';
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

import mapsModel from '../models/mapModel';
import Bike from '../interfaces/bike';



export default class Map extends Component {

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

        this.setState({
            bikeMarkers: bikes.map((bikeItem:Bike, index:number) => {  //
                return <Marker
                    coordinate={{
                        latitude: parseFloat(bikeItem.Position.split(',')[0]),
                        longitude: parseFloat(bikeItem.Position.split(',')[1])
                    }}
                    title="Bike"
                    key={index}
                    // identifier="here"
                    pinColor="red"
                />
            })
        })
    }

    render() {

        return (
            <View style={styles.mapContainer}>

                <MapView
                    loadingEnabled={true}
                    loadingIndicatorColor='#63AF69'
                    style={styles.map}
                    // initialRegion={initRegion}
                    onPress={() => {
                        console.log("touched map")
                    }}
                // onMapLoaded={() => {
                //     if (Platform.OS === 'ios') {
                //         mapRef?.current?.fitToElements(true);
                //     } else {
                //         if (fitCoordinates) {
                //             mapRef?.current?.fitToCoordinates(fitCoordinates), {
                //                 animated: true
                //             }
                //         } else {
                //             mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
                //                 animated: true
                //             }
                //         }
                //     }
                // }}
                >
                    {this.state.locationmarker}
                    {this.state.bikeMarkers}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


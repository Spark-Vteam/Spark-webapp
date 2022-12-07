import React, { ReactNode } from "react";
import MapView, { Marker, Geojson, Callout, LatLng } from 'react-native-maps';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';
import mapsModel from '../models/mapModel';
import { Base, Typography, MapStyle, Images, ButtonStyle } from '../styles/index';

import CustomMarkerArr from "./CustomMarkerArr";
import UserMarker from "./UserMarker";

export default class Map extends React.Component {

    // -- In class component we keep all states in one object...
    state: {
        locationmarker: null | ReactNode,
        bikes: null | Array<Bike>,
        stations: null | Array<Station>,
        bikeMarkers: null | ReactNode,
        stationMarkers: null | ReactNode,
        rentedMarker: null | ReactNode
        panel: null | ReactNode
    }

    // -- ... and initialize them in in the constructor
    constructor(props: Object) {
        super(props);
        this.state = {
            locationmarker: null,
            bikes: null,
            stations: null,
            bikeMarkers: null,
            stationMarkers: null,
            rentedMarker: null,
            panel: null
        };
    }


    createRentedMarker = (bikeId: number, coordinates: LatLng) => {
        this.setState({
            rentedMarker: <Marker
                coordinate={coordinates}
                draggable
                onPress={(e) => {
                    // get info on rent + bike by id,
                    // fetch and show rent StartTimeStamp (+ price "so far"?)
                    // also bike id and battery left
                    this.setState({
                        panel:
                            <View style={MapStyle.panel as any}>
                                <TouchableOpacity
                                    style={ButtonStyle.button as any}
                                    onPress={() => {
                                        // here do a new scan for bikes instead
                                        // of bringing them all back
                                        this.setState({
                                            rentedMarker: null,
                                            panel: null,
                                            bikeMarkers: <CustomMarkerArr // <---
                                                listOfObjects={this.state.bikes}
                                                img={require("../assets/Available.png")}
                                                onpress={this.displayBike}
                                            />
                                        });
                                    }}
                                >
                                    <Text style={ButtonStyle.buttonText as any}>STOP RIDE</Text>
                                </TouchableOpacity>
                            </View>
                    })
                }}
                onDragEnd={(e) => {
                    console.log('dragEnd', e.nativeEvent.coordinate)
                }}
            >
                <Image
                    style={Images.pin}
                    source={require("../assets/Active.png")}
                />
            </Marker>
        })
    }


    displayStation = (id: number) => {
        if (this.state.stations !== null && this.state.stations !== undefined) {
            const station = this.state.stations.find((e) => {
                return e.id == id
            })
            if (station !== undefined) {
                this.setState({
                    panel:
                        <View style={MapStyle.panel as any}>
                            <Text style={MapStyle.panelTitle as any}>Station {station.Name}</Text>
                            <Text style={MapStyle.panelTextMiddle as any}>4 Available spots</Text>
                            {
                                this.state.rentedMarker === null &&
                                <Text style={MapStyle.panelTextMiddle as any}>3 bikes to rent</Text>
                            }
                        </View>
                })
            }
        }
    }

    displayBike = (id: number, coordinates: LatLng) => {
        if (this.state.bikes !== undefined && this.state.bikes !== null) {
            const bike = this.state.bikes.find((e) => {
                return e.id == id
            })
            if (bike !== undefined) {
                this.setState({
                    panel:
                        <View style={MapStyle.panel as any}>
                            <Text style={MapStyle.panelTitle as any}>Bike nr {bike.id}</Text>
                            <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                            <TouchableOpacity
                                style={ButtonStyle.button as any}
                                onPress={() => {
                                    // create rent that changes bikes status as well
                                    this.createRentedMarker(bike.id, coordinates);
                                    // instead of setting bikeMarkers to null (like below):
                                    // update state array 'lastScanBikes', find index by id,
                                    // remove that e and create new bikeMarkers from that
                                    this.setState({
                                        bikeMarkers: null,
                                        panel: null
                                    });
                                    // new search bikes so that markers get updated
                                }}
                            >
                                <Text style={ButtonStyle.buttonText as any}>START RIDE</Text>
                            </TouchableOpacity>
                            <Text style={MapStyle.panelTextMiddle as any}>SEK2.80/min</Text>
                            <Text style={MapStyle.panelTextMiddle as any}>20% discount if returned to a station</Text>
                        </View>
                })
            }
        }
    }

    // -- 'componentDidMount' is the equivalent of onEffect,
    // -- except it will only run once (no dependencies)
    async componentDidMount() {

        // GET USERS LOCATION AND SET LOCATIONMARKER
        // ============================================
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // handle somehow
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});

        // -- We set one or more state variables with this.setState
        this.setState({
            locationmarker: <UserMarker currentLocation={currentLocation} />
        });

        // GET BIKE AND STATIONS AND SET MARKERS
        // ============================================
        const bikes: Array<Bike> = await mapsModel.getBikes();
        const availableBikes = bikes.filter((e) => {
            return e.Status == 10;
        })
        const stations: Array<Station> = await mapsModel.getStations();

        // To not overload mobile phone (switch later to 'scan area')
        const shortAvailableBikes = availableBikes.slice(0, 100);
        const shortStations = stations.slice(0, 50);

        this.setState({
            bikes: shortAvailableBikes,
            stations: shortStations,
            bikeMarkers: <CustomMarkerArr
                listOfObjects={shortAvailableBikes}
                img={require("../assets/Available.png")}
                onpress = {this.displayBike}
                />,
            stationMarkers: <CustomMarkerArr
                listOfObjects={shortStations}
                img={require("../assets/ChargingStation.png")}
                onpress = {this.displayStation}
            />
        });
    }


    // -- Class component has a render() function in which we can
    // -- add more code and then specify output of component in return
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
            <MapView style={MapStyle.map}
                initialRegion={initialRegion}
                onPress={() => {
                    this.setState({
                        panel: null
                    })
                }}
            >
                {this.state.locationmarker}
                {this.state.bikeMarkers}
                {this.state.stationMarkers}
                {this.state.rentedMarker}
            </MapView>
            { this.state.panel }
        </View>
    }
}
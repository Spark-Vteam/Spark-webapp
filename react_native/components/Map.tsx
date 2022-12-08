import React, { ReactNode } from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { View } from 'react-native';
import * as Location from 'expo-location';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';
import mapsModel from '../models/mapModel';
import { MapStyle } from '../styles/index';

import CustomMarkerArr from './markers/CustomMarkerArr';
import UserMarker from './markers/UserMarker';
import RentedMarker from './markers/RentedMarker';

import RentedPanel from './panels/RentedPanel';
import StationPanel from './panels/StationPanel';
import BikePanel from './panels/BikePanel';

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
    constructor(props: Record<string, unknown>) {
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

    // RENTED BIKE MARKER
    // ===================================
    createRentedMarker = (bikeId: number, coordinates: LatLng) => {
        this.setState({
            rentedMarker: <RentedMarker
                bikeId={bikeId}
                coordinates={coordinates}
                onpress={(this.pressedRentedMarker)}  // see method below
            />
        })
    }

    // RENTED BIKE PANEL
    // ===================================
    pressedRentedMarker = () => {
        this.setState({
            panel: <RentedPanel onpress={() => {
                this.setState({
                    rentedMarker: null,
                    panel: null,
                    bikeMarkers: <CustomMarkerArr  // change later to do a new scan instead
                        listOfObjects={this.state.bikes}
                        img={require('../assets/Available.png')}
                        onpress={this.pressedBike}
                    />
                });
            }} />
        });
    }


    // STATION PANEL
    // ===================================
    pressedStation = (id: number) => {
        if (this.state.stations !== null && this.state.stations !== undefined) {
            const station = this.state.stations.find((e) => {
                return e.id == id
            })
            if (station !== undefined) {
                this.setState({
                    panel: <StationPanel
                            name={station.Name}
                            activeRent={this.state.rentedMarker === null}
                        />
                })
            }
        }
    }

    // AVAILABLE BIKE PANEL
    // ===================================
    pressedBike = (id: number, coordinates: LatLng) => {
        if (this.state.bikes !== undefined && this.state.bikes !== null) {
            const bike = this.state.bikes.find((e) => {
                return e.id == id
            })
            if (bike !== undefined) {
                this.setState({
                    panel: <BikePanel
                            bike={bike}
                            onpress={() => {
                            // add endpoint to create rent in backend
                            this.createRentedMarker(bike.id, coordinates);
                            this.setState({
                                bikeMarkers: null,
                                panel: null
                            });
                        }}
                        />
                })
            }
        }
    }

    // COMPONENT DID MOUNT
    // ===================================
    // -- 'componentDidMount' is the equivalent of onEffect,
    // -- except it will only run once (no dependencies)
    async componentDidMount() {

        // GET USERS LOCATION AND SET LOCATIONMARKER
        // ===================================
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

        // GET BIKES AND STATIONS AND SET MARKERS
        // ===================================
        const bikes: Array<Bike> = await mapsModel.getBikes();
        const availableBikes = bikes.filter((e) => {
            return e.Status == 10;
        })
        const stations: Array<Station> = await mapsModel.getStations();

        // Slicing array to not overload mobile phone (switch later to 'scan area')
        const shortAvailableBikes = availableBikes.slice(0, 100);
        const shortStations = stations.slice(0, 50);

        this.setState({
            bikes: shortAvailableBikes,
            stations: shortStations,
            bikeMarkers: <CustomMarkerArr
                listOfObjects={shortAvailableBikes}
                img={require('../assets/Available.png')}
                onpress={this.pressedBike}
                />,
            stationMarkers: <CustomMarkerArr
                listOfObjects={shortStations}
                img={require('../assets/ChargingStation.png')}
                onpress={this.pressedStation}
            />
        });
    }

    // -- Class component has a render() function in which we can
    // -- add more code and then specify output of component in return
    render() {

        // INITAL REGION FOR TESTING
        // ===================================
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
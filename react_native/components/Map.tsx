import React, { ReactNode } from 'react';
import MapView, { LatLng, Polygon } from 'react-native-maps';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

import { MapStyle, ButtonStyle } from '../styles/index';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import mapsModel from '../models/mapModel';
import rentModel from '../models/rentModel';

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
        bikes: null | Bike[],
        stations: null | Station[],
        bikeMarkers: null | ReactNode,
        stationMarkers: null | ReactNode,
        rentedMarker: null | ReactNode,

        panel: null | ReactNode,

        scanButton: null | ReactNode,
        centerPoint: null | LatLng,
        radius: number
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

            panel: null,

            scanButton: null,
            centerPoint: null,
            radius: 0.01 * 111 * 1000 / 2 // see below under onRegionChangeComplete
        };
    }

    // RENTED BIKE MARKER
    // ===================================
    createRentedMarker = (bikeId: number, coordinates: LatLng) => {
        this.setState({
            rentedMarker: <RentedMarker
                bikeId={bikeId}
                coordinates={coordinates}
                onpress={this.pressedRentedMarker}  // see method below
            />
        })
        // open panel with rent right after creating it
        this.pressedRentedMarker();
    }

    // RENTED BIKE PANEL
    // ===================================
    pressedRentedMarker = () => {
        this.setState({
            panel: <RentedPanel onpress={async () => {
                rentModel.stopRent();
                this.setState({
                    rentedMarker: null,
                    panel: null
                });
            }} />
        });
        this.scanArea();
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
                            activeRent={this.state.rentedMarker !== null}
                        />
                })
            }
        }
    }

    // AVAILABLE BIKE PANEL
    // ===================================
    pressedBike = (bikeId: number, coordinates: LatLng) => {
        if (this.state.bikes !== undefined && this.state.bikes !== null) {
            const bike = this.state.bikes.find((e) => {
                return e.id == bikeId
            })
            if (bike !== undefined) {
                this.setState({
                    panel: <BikePanel
                            bike={bike}
                            onpress={ async () => {
                                await rentModel.startRent(1, bikeId);
                            this.createRentedMarker(bikeId, coordinates);
                            this.setState({
                                bikeMarkers: null
                            });
                        }}
                        />
                })
            }
        }
    }

    scanArea = async () => {

        // Todo: Implement scan instead of getting all bikes and stations
        // use this.state.radius och this.state.centerPoint

        let bikes: Bike[] | null = null;

        // GET BIKES IF NO CURRENT RENT AND SET MARKERS
        // ===================================
        if (this.state.rentedMarker === null) {
            bikes = await mapsModel.getBikes();

            if (bikes !== null) {
                const availableBikes = bikes.filter((e) => {
                    return e.Status == 10;
                })

                 // todo: delete once scan radius works
                // Slicing array to not overload mobile phone (switch later to 'scan area')
                bikes = availableBikes.slice(0, 100);
            }
        }

        // GET STATIONS AND SET MARKERS
        // ===================================
        let stations: Station[] | null = await mapsModel.getStations();

        if (stations !== null) { // todo: delete once scan radius works
            // Slicing array to not overload mobile phone (switch later to 'scan area')
            stations = stations.slice(0, 50);
        }

        if (bikes !== null) {
            this.setState({
                bikes: bikes,
                bikeMarkers: <CustomMarkerArr
                    listOfObjects={bikes}
                    img={require('../assets/Available.png')}
                    onpress={this.pressedBike}
                />
            });
        }

        if (stations !== null) {
            this.setState({
                stations: stations,
                stationMarkers: <CustomMarkerArr
                    listOfObjects={stations}
                    img={require('../assets/ChargingStation.png')}
                    onpress={this.pressedStation}
                />
            });
        }


    }

    // COMPONENT DID MOUNT
    // ===================================
    // -- 'componentDidMount' is the equivalent of onEffect,
    // -- except it will only run once (no dependencies)
    async componentDidMount() {

        // SET SCAN BUTTON
        // ===================================
        this.setState({
            scanButton: <TouchableOpacity
                style={ButtonStyle.scanButton as any}
                onPress={() => {
                    this.scanArea();
                }}
            >
                <Text style={ButtonStyle.scanButtonText as any}>Scan this area</Text>
            </TouchableOpacity>
        })

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

        // INITAL CENTERPOINT FOR TESTING
        // ===================================
        // Initial centerpoint. Replace later
        // to set centerpoint to where user is.
        this.setState({
            centerPoint: {
                latitude: 55.7047,
                longitude: 13.1910
            }
        });

        // GET USERS ONGOING RENT (IF THERE IS ANY)
        // ===================================

        const ongoingRent = await rentModel.getOngoingRent();

        // todo: här ritas rentedMarker ut med start-koordinationer - egentligen behöver
        // todo: vi hämta current koordinationer på Python scriptet
        if (ongoingRent) {
            const bikeId = ongoingRent.Bikes_id;
            const coordinates = {
                latitude: parseFloat(ongoingRent.Start.split(',')[0]),
                longitude: parseFloat(ongoingRent.Start.split(',')[1])
            }
            this.createRentedMarker(bikeId, coordinates);
        }
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
                onRegionChange={(e) => {
                    // GET RADIUS AND CENTER POINT
                    // OF RENDERED MAP TO USE WHEN SCANNING
                    // ======================
                    const latDelta = e.latitudeDelta;
                    const lat = e.latitude;
                    const long = e.longitude;

                    this.setState({
                        // 1 degree = 111 km
                        // 1 km = 1000 m
                        // radius = 1/2 diameter
                        radius: latDelta * 111 * 1000 / 2,
                        centerPoint: { lat, long }
                    });
                }}
                onPress={(e) => {
                    // check if user pressed outside a marker
                    // in that case hide panel
                    if (e.nativeEvent.action !== 'marker-press') {
                        this.setState({
                            panel: null
                        })
                    }
                }}
            >
                {this.state.locationmarker}
                {this.state.bikeMarkers}
                {this.state.stationMarkers}
                {this.state.rentedMarker}
                <Polygon coordinates={[
                    // todo: detta är bara ett testa.
                    // todo: ersätt sen med att hämta från backend
                    { latitude: 55.70427, longitude: 13.20144 },
                    { latitude: 55.70522, longitude: 13.20112 },
                    { latitude: 55.70562, longitude: 13.20046 },
                    { latitude: 55.70587, longitude: 13.20114 },
                    { latitude: 55.70595, longitude: 13.20465 },
                    { latitude: 55.70342, longitude: 13.20514 },
                    { latitude: 55.70251, longitude: 13.20368 },
                    { latitude: 55.70133, longitude: 13.20132 },
                    { latitude: 55.70145, longitude: 13.20056 },
                    { latitude: 55.70263, longitude: 13.20126 },

                ]}
                    strokeWidth={0}
                    fillColor={'rgba(255, 0, 0, 0.5)'}
                    tappable={true}
                    onPress={
                        () => {
                            this.setState({
                                panel:
                                    <View style={MapStyle.panel as any}>
                                        <Text>Här får du inte köra.</Text>
                                    </View>
                            })
                        }
                    }
                />
            </MapView>
            { this.state.scanButton }
            { this.state.panel }
        </View>
    }
}
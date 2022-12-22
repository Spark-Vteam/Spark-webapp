import React, { ReactNode } from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

import { MapStyle, ButtonStyle } from '../styles/index';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import mapsModel from '../models/mapModel';
import rentModel from '../models/rentModel';

import GeofenceGroup from './geofences/GeofenceGroup';

import UserMarker from './markers/UserMarker';
import RentedMarker from './markers/RentedMarker';
import CustomMarkerSmall from './markers/CustomMarkerSmall';

import RentedPanel from './panels/RentedPanel';
import PricePanel from './panels/PricePanel';
import SetDestinationPanel from './panels/SetDestinationPanel';
import BikeMarkers from './markers/BikeMarkers';
import StationMarkers from './markers/StationMarkers';


export default class Map extends React.Component {

    // -- In class component we keep all states in one object...
    state: {
        locationmarker: null | ReactNode,
        bikes: null | Bike[],
        bikeMarkers: null | ReactNode,
        bikesCharging: null | Bike[],
        stations: null | Station[],
        stationMarkers: null | ReactNode,
        geofences: null | ReactNode,

        rentedPos: null | LatLng,
        rentedMarker: null | ReactNode,

        panel: null | ReactNode,

        destination: null | LatLng;
        destinationMarker: null | ReactNode;
        preDestinationMarker: null | ReactNode;
        route: null | ReactNode;

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
            bikeMarkers: null,
            bikesCharging: null,
            stations: null,
            stationMarkers: null,
            rentedPos: null,
            rentedMarker: null,
            geofences: null,

            panel: null,

            destination: null,
            destinationMarker: null,
            preDestinationMarker: null,
            route: null,

            scanButton: null,
            centerPoint: null,
            radius: 0.01 * 111 * 1000 / 2 // see below under onRegionChangeComplete
        };
    }

    // GET METHODS
    // =================================

    getCurrentDestination = () => {
        return this.state.destination;
    }

    getRentedPosition = () => {
        return this.state.rentedPos;
    }

    getIsActiveRent = () => {
        return this.state.rentedMarker !== null;
    }

    // SET METHODS
    // =================================

    setRentedPos = (newRentedPos: LatLng | null) => {
        this.setState({
            rentedPos: newRentedPos
        });
    }

    setRentedMarker = (newRentedMarker: ReactNode | null) => {
        this.setState({
            rentedMarker: newRentedMarker
        });
    }

    setRoute = (newRoute: ReactNode | null) => {
        this.setState({
            route: newRoute
        })
    }

    setPanel = (newpanel: ReactNode) => {
        this.setState({
            panel: newpanel
        });
    }

    setDestination = (coordinates: LatLng | null) => {
        // todo: if in simulation, get bike moving towards station
        this.setState({
            destination: coordinates,
        });
    }

    setPreDestinationMarker = (newPreDestinationMarker: ReactNode) => {
        this.setState({
            preDestinationMarker: newPreDestinationMarker,
        });
    }

    setDestinationMarker = (newDestinationMarker: ReactNode) => {
        this.setState({
            destinationMarker: newDestinationMarker,
        });
    }


    // STOP RENT
    // ===================================
    stopRent = async () => {
        await rentModel.stopRent();
        const allRents = await rentModel.getRentsOnUser();
        let price = 0;
        if (allRents) {
            const stoppedRent = allRents[allRents.length - 1];
            price = stoppedRent.Price;
        }
        this.setState({
            rentedMarker: null,
            rentedPos: null,
            route: null,
            panel: <PricePanel price={price} />
        });
    }

    // CREATE RENTED BIKE MARKER
    // ===================================
    createRentedMarker = (bike: Bike) => {
        const coordinates = {
            latitude: parseFloat(bike.Position.split(',')[0]),
            longitude: parseFloat(bike.Position.split(',')[1])
        }
        this.setState({
            rentedPos: coordinates,
            rentedMarker: <RentedMarker
                coordinates={coordinates}
                bike={bike}
                onpress={(bike: Bike) => {
                    this.setState({
                        panel: <RentedPanel
                            bike={bike}
                            onpress={async () => {
                                this.stopRent();
                                this.setDestinationMarker(null);
                            }} />
                    });
                    this.scanArea();
                }}  // see method below
            />,
            bikeMarkers: null
        })
        // open panel with rent right after creating it
        console.log("OPEN!!");
        this.pressedRentedMarker(bike);
    }

    // CREATE RENTED BIKE PANEL
    // ===================================
    pressedRentedMarker = (bike: Bike) => {
        console.log("PANEL");
        this.setState({
            panel: <RentedPanel
                bike={bike}
                onpress={async () => {
                this.stopRent();
                this.setDestinationMarker(null);
            }} />
        });
        this.scanArea();
    }


    // Scan the visible area for bikes and stations
    scanArea = async () => {

        // Todo: Implement scan instead of getting all bikes and stations
        // use this.state.radius och this.state.centerPoint

        let bikesAvailable: Bike[] | null = null;
        let bikesCharging: Bike[] | null = null;

        // GET BIKES IF NO CURRENT RENT AND SET MARKERS
        // ===================================
        // Makes so that one can only rent one at a time
        if (this.state.rentedMarker === null) {
            const bikesFromScan = await mapsModel.getBikes();    // todo: change to scan

            if (bikesFromScan !== null) {
                const availableBikes = bikesFromScan.filter((e) => {
                    return e.Status == 10;  // todo: lägg till && e.Battery > 50 eller nåt
                })

                const chargingBikes = bikesFromScan.filter((e) => {
                    return e.Status == 40;  // todo: lägg till && e.Battery > 50 eller nåt
                })

                // console.log(chargingBikes);

                 // todo: delete once scan radius works
                // Slicing array to not overload mobile phone (switch later when scan works)
                bikesAvailable = availableBikes.slice(0, 100);
                bikesCharging = chargingBikes.slice(0, 100);
            }
        }

        // GET STATIONS AND SET MARKERS
        // ===================================
        let stations: Station[] | null = await mapsModel.getStations();

        if (stations !== null) { // todo: delete once scan radius works
            // Slicing array to not overload mobile phone (switch later to 'scan area')
            stations = stations.slice(0, 50);
        }

        if (bikesAvailable !== null) {
            this.setState({
                bikes: bikesAvailable,
                bikeMarkers: <BikeMarkers
                    bikes={bikesAvailable}
                    setPanel={this.setPanel}
                    createRentedMarker={this.createRentedMarker}
                />
            });
        }


        if (bikesCharging !== null) {
            this.setState({
                bikesCharging: bikesAvailable
            });
        }


        if (stations !== null) {
            this.setState({
                stations: stations,
                stationMarkers: <StationMarkers
                    stations={stations}
                    setPanel={this.setPanel}
                    getCurrentDestination={this.getCurrentDestination}
                    setDestination={this.setDestination}
                    setDestinationMarker={this.setDestinationMarker}
                    getRentedPosition={this.getRentedPosition}
                    setRoute={this.setRoute}
                    getIsActiveRent={this.getIsActiveRent}
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

        // CREATE GEOFENCES
        // ===================================
        const geofences = await mapsModel.getGeofences();
        this.setState({
            geofences: <GeofenceGroup
                geofences={geofences}
                setPanel={this.setPanel}
            />
        })


        // GET USERS ONGOING RENT (IF THERE IS ANY)
        // ===================================
        const ongoingRents = await rentModel.getOngoingRents();
        // hopefully there is just one...
        if (ongoingRents && ongoingRents.length > 0) {
            const lastOngoingRent = ongoingRents[ongoingRents.length - 1];
            const bikeId = lastOngoingRent.Bikes_id;
            const bike = await mapsModel.getBike(bikeId);
            // console.log(bike.Position);
            // const coordinates = {
            //     latitude: parseFloat(bike.Position.split(',')[0]),
            //     longitude: parseFloat(bike.Position.split(',')[1])
            // }
            this.createRentedMarker(bike);
        }
    }

    // -- Class component has a render() function in which we can
    // -- add more code and then specify output of component in return
    render() {

        // INITIAL REGION FOR TESTING
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
                testID={'mapview'}
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
                        // console.log(e.nativeEvent.coordinate);
                        if (this.state.rentedMarker && this.state.panel == null) {
                            this.setState({
                                preDestinationMarker: <CustomMarkerSmall
                                coordinates={e.nativeEvent.coordinate}
                                img={require('../assets/PreDestination.png')}
                                    onpress={() => {
                                    // set destination panel when pressing red spot
                                    this.setPanel(<SetDestinationPanel
                                        setRoute={this.setRoute}
                                        rentedPosition={this.state.rentedPos}
                                        coordinates={e.nativeEvent.coordinate}
                                        setDestination={this.setDestination}
                                        setDestinationMarker={this.setDestinationMarker}
                                        setPreDestinationMarker={this.setPreDestinationMarker}
                                        setPanel={this.setPanel}
                                        />)
                                    }}
                                    trackViewChanges={false}
                                    />
                            })
                            // set destination panel when pressing map
                            this.setPanel(<SetDestinationPanel
                                setRoute={this.setRoute}
                                rentedPosition={this.state.rentedPos}
                                coordinates={e.nativeEvent.coordinate}
                                setDestination={this.setDestination}
                                setDestinationMarker={this.setDestinationMarker}
                                setPreDestinationMarker={this.setPreDestinationMarker}
                                setPanel={this.setPanel}
                            />)
                        } else {
                            this.setState({
                                panel: null
                            })
                        }
                    }
                }}
            >
                {this.state.route}
                {this.state.locationmarker}
                {this.state.bikeMarkers}
                {this.state.stationMarkers}
                {this.state.rentedMarker}
                {this.state.geofences}
                {this.state.preDestinationMarker}
                {this.state.destinationMarker}
            </MapView>
            { this.state.scanButton }
            {this.state.panel}
        </View>
    }
}
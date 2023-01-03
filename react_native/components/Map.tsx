import React, { ReactNode } from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import { MapStyle, ButtonStyle } from '../styles/index';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import mapModel from '../models/mapModel';
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

        // isSearchingBikes: Boolean,
        scanButton: null | ReactNode,

        centerPoint: LatLng,
        radius: number
    }

    // -- ... and initialize them in in the constructor
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            locationmarker: null,
            bikes: null,
            bikeMarkers: null,
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

            // isSearchingBikes: false,
            scanButton: this.getOriginalScanButton(),

            centerPoint: {           // see below under componentDidMount
                latitude: 55.7047,  // temporary, is set by on readyMount initalRegion
                longitude: 13.1910,
            },
            radius: 0.01
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

    getOriginalScanButton = () => {
        return <TouchableOpacity
            style={ButtonStyle.scanButton as any}
            onPress={() => {
                this.scanArea();
                this.setState({
                    isSearchingBikes: true,
                    scanButton: <TouchableOpacity
                        style={ButtonStyle.scanButton as any}
                        onPress={() => {
                            this.scanArea();
                            this.setState({
                                isSearchingBikes: true,
                                scanButton: <ActivityIndicator animating={true} color='white' size={28} />
                            })
                        }}
                    >
                        <ActivityIndicator animating={true} color='white' size={28} />
                    </TouchableOpacity>
                })
            }}
        >
            <Text style={ButtonStyle.scanButtonText as any}>Scan this area</Text>
        </TouchableOpacity>
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


    doneSearchingBikes = () => {
        this.setState({
            scanButton: this.getOriginalScanButton()
        })
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
        this.pressedRentedMarker(bike);
    }

    // CREATE RENTED BIKE PANEL
    // ===================================
    pressedRentedMarker = (bike: Bike) => {
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

        let bikesAvailable: Bike[] | null = null;

        // GET BIKES IF NO CURRENT RENT AND SET MARKERS
        // ===================================
        // Checking if rentedMarker exists.
        // This makes so that one can only scan for bikes
        // if there is no current rent
        if (this.state.rentedMarker === null) {
            // Scan for bikes
            const bikesFromScan = await mapModel.getBikesInRadius(
                this.state.centerPoint,
                this.state.radius
            );

            if (bikesFromScan !== null) {
                bikesAvailable = bikesFromScan.filter((e) => {
                    return e.Status == 10 && e.Battery > 50;
                })
            }
        }

        // GET STATIONS AND SET MARKERS
        // ===================================
        let stations: Station[] | null = await mapModel.getStations();

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
                    discount={true}
                    doneSearchingBikes={this.doneSearchingBikes}
                />
            });
        }

        if (stations !== null) {
            this.setState({
                stations: stations,
                stationMarkers: <StationMarkers
                    stations={stations}
                    createRentedMarker={this.createRentedMarker}
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
    // -- except it will always only run once (no dependencies)
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
        const geofences = await mapModel.getGeofences();
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
            const bike = await mapModel.getBike(bikeId);
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
                    this.setState({
                        radius: e.latitudeDelta,
                        centerPoint: {
                            latitude: e.latitude,
                            longitude: e.longitude
                        }
                    });
                }}
                onPress={(e) => {
                    // check if user pressed outside a marker
                    // in that case hide panel
                    if (e.nativeEvent.action !== 'marker-press') {
                        if (this.state.rentedMarker && this.state.panel == null) {
                            // set red dot
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
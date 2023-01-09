import React, { ReactNode } from 'react';
import MapView, { LatLng, Region } from 'react-native-maps';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { MapStyle, ButtonStyle } from '../styles/index';

import Bike from '../interfaces/bike';
import Station from '../interfaces/station';

import mapModel from '../models/mapModel';
import rentModel from '../models/rentModel';

import GeofenceGroup from './geofences/GeofenceGroup';

import UserMarker from './markers/UserMarker';
import RentedMarker from './markers/RentedMarker';

import CustomMarker from './markers/CustomMarker';

import RentedPanel from './panels/RentedPanel';
import PricePanel from './panels/PricePanel';
import LoadingPanel from './panels/LoadingPanel';
import SetDestinationPanel from './panels/SetDestinationPanel';
import BikeMarkers from './markers/BikeMarkers';
import StationMarkers from './markers/StationMarkers';


export default class Map extends React.Component<{
    userLocation: Region, centerPoint: LatLng,
    updateUserLocation: () => void,
    setNotTesting: () => void,
    userId: number
}> {

    // -- In class component we keep all states in one object...
    state: {
        locationmarker: null | ReactNode,
        trackUsersLocation: Boolean,
        bikes: null | Bike[],
        bikeMarkers: null | ReactNode,
        stations: null | Station[],
        stationMarkers: null | ReactNode,
        geofences: null | ReactNode,

        rentedId: null | number,
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
        radius: number,
    }

    // -- ... and initialize them in in the constructor
    constructor(props: any) {
        super(props);
        this.state = {
            locationmarker: null,
            trackUsersLocation: true,
            bikes: null,
            bikeMarkers: null,
            stations: null,
            stationMarkers: null,

            rentedId: null,
            rentedPos: null,
            rentedMarker: null,

            geofences: null,

            panel: null,

            destination: null,
            destinationMarker: null,
            preDestinationMarker: null,
            route: null,

            scanButton: this.getLoadingScanButton(),

            centerPoint: props.centerPoint,
            radius: 0.01,
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

    getLoadingScanButton = () => {
        return <TouchableOpacity
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
    }

    getOriginalScanButton = () => {
        return <TouchableOpacity
            style={ButtonStyle.scanButton as any}
            onPress={() => {
                this.scanArea();
                this.setState({
                    isSearchingBikes: true,
                    scanButton: this.getLoadingScanButton()
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

    // STOP SCAN BUTTON FROM LOADING
    // ===================================
    doneSearchingBikes = () => {
        // called from BikeMarkers on DidMount and DidUpdate
        this.setState({
            scanButton: this.getOriginalScanButton()
        })
    }


    // STOP RENT
    // ===================================
    stopRent = async () => {
        await rentModel.stopRent();
        this.setState({
            rentedMarker: null,
            rentedId: null,
            rentedPos: null,
            route: null,
            panel: <LoadingPanel />
        })
        // give database time to stop rent and create invoice
        // then show price panel and do new scan
        setTimeout(async () => {
            const allInvoices = await rentModel.getInvoices();
            const lastInvoice = allInvoices[allInvoices.length - 1];
            const price = lastInvoice.Amount;
            this.setState({
                panel: <PricePanel price={price} />,
                scanButton: this.getLoadingScanButton(),
                trackUsersLocation: true
            });
            this.scanArea();
        }, 2000);

    }

    // CREATE RENTED BIKE MARKER
    // ===================================
    createRentedMarker = (bike: Bike) => {
        const coordinates = {
            latitude: parseFloat(bike.Position.split(',')[0]),
            longitude: parseFloat(bike.Position.split(',')[1])
        }
        // stop tracking users location (the location marker will also stop rendering)
        this.setState({
            trackUsersLocation: false,
            rentedId: bike.id,
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
                }}
            />,
            bikeMarkers: null,
            scanButton: null
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
    }

    // UPDATE USER LOCATION
    // ===================================
    trackUserLocation = () => {
        setInterval(() => {
            // If tracking location - update and re-render location marker
            // Otherwise set location marker to null
            if (this.state.trackUsersLocation) {
                this.props.updateUserLocation();
                this.setState({
                    locationmarker: <UserMarker
                        currentLocation={this.props.userLocation}
                        setPanel={this.setPanel}
                    />
                })
            } else {
                this.setState({
                    locationmarker: null
                })
            }

        }, 1000);
    }

    // TRACK RENTED MARKER
    // ===================================
    trackRentedMarker = () => {
        // If rentedId exists - update coordinates and re-render marker
        // Otherwise set marker to null
        setInterval(async () => {
            if (this.state.rentedId) {
                const rentedBike = await mapModel.getBike(this.state.rentedId);
                const coordinates = {
                    latitude: parseFloat(rentedBike.Position.split(',')[0]),
                    longitude: parseFloat(rentedBike.Position.split(',')[1])
                }
                // console.log(rentedBike.Position);
                this.setState({
                    rentedMarker: <RentedMarker
                        bike={rentedBike}
                        coordinates={coordinates}
                        onpress={(bike: Bike) => {
                            this.setState({
                                panel: <RentedPanel
                                    bike={bike}
                                    onpress={async () => {
                                        this.stopRent();
                                        this.setDestinationMarker(null);
                                    }} />
                            });
                        }}
                    />
                })
            } else {
                this.setState({
                    rentedMarker: null
                })
            }
        }, 1000)
    }


    // SCAN (INSIDE RADIUS) FOR BIKES
    // ===================================
    scanArea = async () => {
        // this.props.setNotTesting();

        // GET BIKES IF NO CURRENT RENT AND SET MARKERS
        // ===================================
        // Checking if current rent exists.
        // This makes so that one can only scan for bikes
        // if there is no current rent
        if (this.state.rentedId === null) {
            // Scan for bikes
            const bikesFromScan = await mapModel.getBikesInRadius(
                this.state.centerPoint,
                this.state.radius
            );


            const bikesAvailable = bikesFromScan.filter((e) => {
                return e.Status >= 10 && e.Status < 20 && e.Battery > 50;
            })

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
    }


    // COMPONENT DID MOUNT
    // ===================================
    // -- 'componentDidMount' is the equivalent of
    // useEffect(() => {
    //      ...
    // }, []), (no dependencies)
    async componentDidMount() {

        // PERFORM FIRST SCAN (BIKES ONLY) RIGHT AWAY
        // ===================================
        this.scanArea();

        // GET STATIONS AND SET STATION MARKERS
        // ===================================
        let stations: Station[] = await mapModel.getStations();

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
        })

        // SET LOCATIONMARKER (Location position from props)
        // ===================================
        this.setState({
            locationmarker: <UserMarker
                currentLocation={this.props.userLocation}
                setPanel={this.setPanel}
            />
        });
        this.trackUserLocation();

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
        this.trackRentedMarker();
    }

    // -- Class component has a render() function in which we can
    // -- add more code and then specify output of component in return
    render() {

        return <View style={MapStyle.mapContainer}>
            <MapView style={MapStyle.map}
                testID={'mapview'}
                initialRegion={this.props.userLocation}
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
                    // SET DESTINATION
                    // ======================
                    // check if user pressed outside a marker
                    // in that case hide panel
                    if (e.nativeEvent.action !== 'marker-press') {
                        if (this.state.rentedMarker && this.state.panel == null) {
                            // set red dot
                            this.setState({
                                preDestinationMarker: <CustomMarker
                                coordinates={e.nativeEvent.coordinate}
                                img={require('../assets/PreDestination.png')}
                                    onpress={() => {
                                    // set destination panel when pressing red spot
                                    this.setPanel(<SetDestinationPanel
                                        setRoute={this.setRoute}
                                        // rentedId={this.state.rentedId}
                                        rentedPosition={this.state.rentedPos}
                                        coordinates={e.nativeEvent.coordinate}
                                        setDestination={this.setDestination}
                                        setDestinationMarker={this.setDestinationMarker}
                                        setPreDestinationMarker={this.setPreDestinationMarker}
                                        setPanel={this.setPanel}
                                        />)
                                    }}
                                    />
                            })
                            // set destination panel when pressing map
                            this.setPanel(<SetDestinationPanel
                                setRoute={this.setRoute}
                                // rentedId={this.state.rentedId}
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
                {this.state.geofences}
                {this.state.preDestinationMarker}
                {this.state.destinationMarker}
                {this.state.rentedMarker}
            </MapView>
            { this.state.scanButton }
            {this.state.panel}
        </View>
    }
}
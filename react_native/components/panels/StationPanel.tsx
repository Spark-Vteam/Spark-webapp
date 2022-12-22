import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';
import { LatLng } from 'react-native-maps';
import Bike from '../../interfaces/bike';
import Station from '../../interfaces/station';
import Pline from '../polyline/Polyline';

import mapModel from '../../models/mapModel';
import ChargBikeIconGroup from './ChargBikeIconGroup';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class StationPanel extends React.Component<{
    station: Station
    createRentedMarker: (bike: Bike) => void,
    currentDestination: LatLng | null,
    setDestinationMarker: (newPreDestinationMarker: ReactNode) => void,
    setDestination: (coordinates: LatLng | null) => void,
    rentedPosition: LatLng | null,
    setRoute: (newRoute: ReactNode) => void,
    setPanel: (newpanel: ReactNode) => void,
    activeRent: boolean,
}> {

    state: {
        chargingBikesCount: number | null,
        chargingBikes: ReactNode | null,
    }

    constructor(props: any) {
        super(props);
        this.state = {
            chargingBikesCount: null,
            chargingBikes: null,
        };
    }

    createChargingBikeIcons = async () => {
        const allChargingBikes = await mapModel.getChargingBikes()
        const correctChargingBikesArr = allChargingBikes.filter((e) => {
            return e.Name == this.props.station.Name && e.Battery > 50;
        });

        this.setState({
            chargingBikesCount: correctChargingBikesArr.length,
            chargingBikes: < ChargBikeIconGroup
                chargingBikes={correctChargingBikesArr}
                createRentedMarker={this.props.createRentedMarker}
                setPanel={this.props.setPanel}
            />
        })
    }


    render() {
        const { station,
            currentDestination,
            setDestination,
            setDestinationMarker,
            rentedPosition,
            setRoute,
            setPanel,
            activeRent } = this.props;

        const lat = parseFloat(station.Position.split(',')[0]);
        const long = parseFloat(station.Position.split(',')[1]);

        const stationCoordinates = {
            latitude: lat,
            longitude: long
        }

        this.createChargingBikeIcons();

        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Station {station.Name}</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{station.Available} available spots</Text>
                {/* Behöver vi number of occupied spots eller blir det överflödigt? */}
                <Text style={MapStyle.panelTextMiddle as any}>{station.Occupied} occupied spots</Text>
                {
                    // Show bikes to rent only if there are no active rents already
                    activeRent === false && this.state.chargingBikes &&
                        // todo: fetch bikes parked at station somehow and
                        // make it so that one can rent from here
                    <View>
                        <Text style={MapStyle.panelTextMiddle as any}>{this.state.chargingBikesCount} bikes ready to rent</Text>
                        {this.state.chargingBikes}
                    </View>
                }
                {
                    ((activeRent === true &&
                    currentDestination === null) ||
                    (activeRent === true &&
                    currentDestination &&
                    currentDestination.latitude !== lat &&
                    currentDestination.longitude !== long)) &&

                    // SET AS DESTINATION BUTTON
                    // ======================================
                    <TouchableOpacity
                        style={ButtonStyle.button as any}
                            onPress={async () => {
                                const coordArrForPline = await mapModel.getRoute(rentedPosition, stationCoordinates);
                                setRoute(<Pline
                                    coordinates={coordArrForPline}
                                />)
                                setDestination(stationCoordinates);
                                setPanel(null);
                                setDestinationMarker(null)
                            }}
                    >
                        <Text style={ButtonStyle.buttonText as any}>PLOT ROUTE</Text>
                    </TouchableOpacity>
                }
                {
                    activeRent === true &&
                    currentDestination &&
                    currentDestination.latitude === lat &&
                    currentDestination.longitude === long &&
                    // CANCEL DESTINATION BUTTON
                    // ======================================
                    <TouchableOpacity
                        style={ButtonStyle.button as any}
                            onPress={() => {
                                setDestination(null);
                                setPanel(null);
                                setDestinationMarker(null)
                                setRoute(null)
                            }}
                    >
                        <Text style={ButtonStyle.buttonText as any}>CANCEL ROUTE</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
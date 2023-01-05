import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MapStyle, ButtonStyle, Images } from '../../styles/index';

import { LatLng } from 'react-native-maps';
import CustomMarker from '../markers/CustomMarker';

import DestinationPanel from './DestinationPanel';
import Pline from '../polyline/Polyline';

import mapsModel from '../../models/mapModel';

// Panel that lets user keep track of destination
export default class SetDestinationPanel extends React.Component<{
    rentedPosition: LatLng | null,
    coordinates: LatLng,
    setDestination: (coordinates: LatLng | null) => void,
    setDestinationMarker: (newDestinationMarker: ReactNode) => void,
    setPreDestinationMarker: (newPreDestinationMarker: ReactNode) => void,
    setPanel: (newpanel: ReactNode) => void,
    setRoute: (newRoute: ReactNode) => void
}> {
    render() {
        const {
            rentedPosition,
            coordinates,
            setDestination,
            setDestinationMarker,
            setPreDestinationMarker,
            setPanel,
            setRoute
        } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Image
                    source={require('../../assets/logos/PreDestinationLogo.png')}
                    style={Images.panelLogo as any}
                />
                <Text style={MapStyle.panelTitleMoreMarginDown as any}>Set destination</Text>
                <TouchableOpacity
                    style={ButtonStyle.buttonBlue as any}
                    onPress={async () => {
                        setDestination(coordinates);
                        const coordArrForPline = await mapsModel.getRoute(rentedPosition, coordinates);
                        setRoute(<Pline
                            coordinates={coordArrForPline}
                        />)
                        setDestinationMarker(<CustomMarker
                            coordinates={coordinates}
                            img={require('../../assets/Destination.png')}
                            onpress={() => {
                                setPanel(<DestinationPanel
                                    onpressButton={() => {
                                        setPanel(null);
                                        setDestinationMarker(null);
                                        setDestination(null);
                                        setRoute(null);
                                    }}
                                />)
                            }}
                            trackViewChanges={true}
                        />)
                        setPanel(null);
                        setPreDestinationMarker(null);
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>PLOT ROUTE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';

import { LatLng } from 'react-native-maps';
import CustomMarker from '../markers/CustomMarker';

import DestinationPanel from './DestinationPanel';

// Panel that lets user keep track of destination
export default class SetDestinationPanel extends React.Component<{
    coordinates: LatLng,
    setDestination: (coordinates: LatLng | null) => void,
    setDestinationMarker: (newDestinationMarker: ReactNode) => void,
    setPreDestinationMarker: (newPreDestinationMarker: ReactNode) => void,
    setPanel: (newpanel: ReactNode) => void
}> {
    render() {
        const { coordinates,
            setDestination,
            setDestinationMarker,
            setPreDestinationMarker,
            setPanel } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                {/* <Text style={MapStyle.panelTitle as any}>{ title }</Text> */}
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        setDestination(coordinates);
                        setDestinationMarker(<CustomMarker
                            coordinates={coordinates}
                            img={require('../../assets/Destination.png')}
                            onpress={() => {
                                console.log("pressed destination marker!!!");
                                setPanel(<DestinationPanel
                                    onpressButton={() => {
                                        setPanel(null);
                                        setDestinationMarker(null);
                                        setDestination(null);
                                    }}
                                />)
                            }}
                            trackViewChanges={true}
                        />)
                        setPanel(null);
                        setPreDestinationMarker(null);
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>SET AS DESTINATION</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';

import { LatLng } from 'react-native-maps';
import CustomMarker from '../markers/CustomMarker';

// Panel that lets user keep track of destination
export default class DestinationPanel extends React.Component<{
    coordinates: LatLng,
    setDestination: (coordinates: LatLng) => void,
    setDestinationMarker: (newDestinationMarker: ReactNode) => void
}> {
    render() {
        const { coordinates, setDestination, setDestinationMarker } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                {/* <Text style={MapStyle.panelTitle as any}>{ title }</Text> */}
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        setDestination(coordinates);
                        setDestinationMarker(<CustomMarker
                            coordinates={coordinates}
                            img={require('../../assets/Available.png')}
                            onpress={() => {
                                console.log("pressed destination marker!!!");
                            }}
                        />)
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>SET AS DESTINATION</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
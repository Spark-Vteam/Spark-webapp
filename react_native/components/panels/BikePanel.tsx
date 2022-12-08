import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';

import Bike from '../../interfaces/bike';

// Panel with info about available bike. Button to start ride, OnPress function is injected.
export default class BikePanel extends React.Component<{ bike: Bike, onpress: () => void }> {
    render() {
        const { bike, onpress } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Bike nr {bike.id}</Text>
                <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        onpress();
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>START RIDE</Text>
                </TouchableOpacity>
                <Text style={MapStyle.panelTextMiddle as any}>SEK2.80/min</Text>
                <Text style={MapStyle.panelTextMiddle as any}>20% discount if returned to a station</Text>
            </View>
        );
    }
}
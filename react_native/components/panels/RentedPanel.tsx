import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';
import Bike from '../../interfaces/bike';


// Panel with button to stop the rent. OnPress function is injected.
export default class RentedPanel extends React.Component<{
    bike: Bike,
    onpress: () => void
}> {
    render() {
        const { bike, onpress } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Rented bike #{bike.id}</Text>
                <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        onpress();
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>STOP RIDE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
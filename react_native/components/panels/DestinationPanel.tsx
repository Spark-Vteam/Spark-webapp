import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';

// Panel that lets user keep track of destination
export default class DestinationPanel extends React.Component<{
    onpressButton: () => void,
}> {
    render() {
        const { onpressButton} = this.props;
        return (
            <View style={MapStyle.panel as any}>
                {/* <Text style={MapStyle.panelTitle as any}>Destination</Text> */}
                <TouchableOpacity
                    style={ButtonStyle.longButton as any}
                    onPress={onpressButton}
                >
                    <Text style={ButtonStyle.buttonText as any}>CANCEL DESTINATION</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
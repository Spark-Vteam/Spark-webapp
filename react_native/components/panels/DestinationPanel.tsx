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
                <TouchableOpacity
                    style={ButtonStyle.buttonBlue as any}
                    onPress={onpressButton}
                >
                    <Text style={ButtonStyle.buttonText as any}>CANCEL ROUTE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
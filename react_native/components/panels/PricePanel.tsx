import React from 'react';
import { Text, View } from 'react-native';
import { MapStyle } from '../../styles/index';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class PricePanel extends React.Component<{ price: number }> {
    render() {
        const { price } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Thank you for choosing Spark</Text>
                <Text style={MapStyle.panelTextMiddle as any}>Price for ride: {price}.</Text>
            </View>
        );
    }
}
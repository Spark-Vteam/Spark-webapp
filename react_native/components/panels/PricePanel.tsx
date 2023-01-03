import React from 'react';
import { Text, View } from 'react-native';
import { MapStyle, Typography } from '../../styles/index';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class PricePanel extends React.Component<{ price: number }> {
    render() {
        const { price } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Thank you for choosing Spark</Text>
                <Text style={MapStyle.panelTextMiddle as any}>Price for ride: {price}.</Text>
                <Text />
                <Text />
                <Text style={MapStyle.panelTextMiddle as any}>Log in to your account at <Text style={Typography.bold as any}>http://localhost:3000/</Text> using a computer to handle your payment. Please note that this is currently not possible to do on a mobile device</Text>
            </View>
        );
    }
}
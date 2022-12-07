import React, { ReactNode } from "react";
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Base, Typography, MapStyle, Images, ButtonStyle } from '../../styles/index';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class StationPanel extends React.Component<{ name: string, activeRent: boolean }> {
    render() {
        const { name, activeRent } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Station {name}</Text>
                <Text style={MapStyle.panelTextMiddle as any}>4 Available spots</Text>
                {
                    activeRent === false &&
                    <Text style={MapStyle.panelTextMiddle as any}>3 bikes to rent</Text>
                }
            </View>
        );
    }
}
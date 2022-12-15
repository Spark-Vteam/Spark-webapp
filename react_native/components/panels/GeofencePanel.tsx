import React from 'react';
import { Text, View } from 'react-native';
import { MapStyle } from '../../styles/index';


// Panel with info about rules inside geofence
export default class GeofencePanel extends React.Component<{ name: string, info: string }> {
    render() {
        const { name, info } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>{name}</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{info}</Text>
            </View>
        );
    }
}
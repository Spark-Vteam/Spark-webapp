import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { MapStyle } from '../../styles';



export default class LoadingPanel extends React.Component {

    render() {

        return (

            <View style={MapStyle.panel as any}>
                <Text />
                <ActivityIndicator animating={true} color='#FF5719' size={60} />
            </View>
        );
    }
}
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MapStyle, ButtonStyle, Images } from '../../styles/index';


// Panel that lets user keep track of destination
export default class DestinationPanel extends React.Component<{
    onpressButton: () => void,
}> {
    render() {
        const { onpressButton } = this.props;


        return (
            <View style={MapStyle.panel as any}>
                <Image
                    style={Images.panelLogo as any}
                    source={require('../../assets/logos/DestinationLogo.png')}
                />
                <Text style={MapStyle.panelTitleMoreMarginDown as any}>Your current destination</Text>
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={onpressButton}
                >
                    <Text style={ButtonStyle.buttonText as any}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
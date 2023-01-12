import React from 'react';
import { Text, View, Image } from 'react-native';
import { MapStyle, Images } from '../../styles/index';


// Panel that shows an error
export default class ErrorPanel extends React.Component<{
    message: string,
}> {
    render() {
        const { message } = this.props;

        return (
            <View style={MapStyle.panelShort as any}>
                <Image
                    style={Images.panelLogoBig as any}
                    source={require('../../assets/logos/Oops.png')}
                />
                <Text style={MapStyle.panelTitleMoreMarginDown as any}>Oops...</Text>
                <Text style={MapStyle.panelTextMiddlePadded as any}>{ message }</Text>
            </View>
        );
    }
}
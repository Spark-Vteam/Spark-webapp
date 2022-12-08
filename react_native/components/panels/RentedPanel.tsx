import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';


// Panel with button to stop the rent. OnPress function is injected.
export default class RentedPanel extends React.Component<{ onpress: ()=> void }> {
    render() {
        const { onpress } = this.props;
        return (
            <View style={MapStyle.panel as any}>
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
import React, { ReactNode } from 'react';
import { View, Image } from 'react-native';

import { Images, Base, MapStyle } from '../../styles/index';


export default class ChargBikeIconPanel extends React.Component
    <{
        img: number,
        content: ReactNode,
        useLongPanel: Boolean
    }> {

    render() {


        const { img, content, useLongPanel } = this.props;

        return (
            <View>
                <View style={useLongPanel ? MapStyle.panelLong as any : MapStyle.panel}>
                    {content}
                    <Image
                        style={Images.panelLogo as any}
                        source={img}
                    />
                </View>
            </View>
        );
    }
}
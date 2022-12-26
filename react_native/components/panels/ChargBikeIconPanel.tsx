import React, { ReactNode } from 'react';
import { View } from 'react-native';

import ChargingBike from '../../interfaces/chargingbike';
import ChargBikeIcon from './ChargBikeIcon';

import Bike from '../../interfaces/bike';

import { MapStyle } from '../../styles';



export default class ChargBikeIconPanel extends React.Component
    <{
        chargingBikes: ChargingBike[]
        createRentedMarker: (bike: Bike) => void,
        setPanel: (newpanel: ReactNode) => void,
    }> {

    render() {

        const { chargingBikes } = this.props;

        const chargGroup = chargingBikes.map((e, index) => {
            return <ChargBikeIcon
                id={e.id}
                battery={e.Battery}
                key={index}
                createRentedMarker={this.props.createRentedMarker}
                setPanel={this.props.setPanel}
            />
        })

        return (
            // <View style={Base.flexRow as any}>
            //     {chargGroup}
            // </View>

            <View style={MapStyle.panel as any}>
                {chargGroup}
            </View>
        );
    }
}
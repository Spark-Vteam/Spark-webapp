import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

import ChargingBike from '../../interfaces/chargingbike';
import { Base } from '../../styles';
import ChargBikeIcon from './ChargBikeIcon';

import Bike from '../../interfaces/bike';



export default class ChargBikeIconGroup extends React.Component
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
            <View style={Base.flexRow as any}>
                {chargGroup}
            </View>
        );
    }
}
import React, { ReactNode } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import ChargingBike from '../../interfaces/chargingbike';
import ChargBikeIcon from './ChargBikeIcon';

import Bike from '../../interfaces/bike';

import { MapStyle, Images } from '../../styles';
import Station from '../../interfaces/station';



export default class ChargBikeIconPanel extends React.Component
    <{
        chargingBikes: ChargingBike[]
        createRentedMarker: (bike: Bike) => void,
        setPanel: (newpanel: ReactNode) => void,
        station: Station
    }> {

    render() {

        const { chargingBikes, station } = this.props;

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

            <View style={MapStyle.panelLong as any}>
                <Image
                    style={Images.panelLogo as any}
                    source={require('../../assets/logos/StationLogo.png')}
                />
                <Text style={MapStyle.panelTitle as any}>Station {station.Name}</Text>
                <ScrollView>
                    <Text></Text>
                    {chargGroup}
                </ScrollView>
            </View>
        );
    }
}
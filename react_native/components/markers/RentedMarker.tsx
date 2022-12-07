import React, { ReactNode } from "react";
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Base, Typography, MapStyle, Images, ButtonStyle } from '../../styles/index';



export default class RentedMarker extends React.Component<{ bikeId: number, coordinates: LatLng, onpress: Function }> {


    createRentedMarker = (bikeId: number, coordinates: LatLng, onpress: Function): ReactNode | null => {
        return <Marker
                coordinate={coordinates}
                draggable
                onPress={(e) => {
                    onpress();
                }}
            onDragEnd={(e) => {
                    // In real word, the python script on the bike
                    // would send coordinates to update rent,
                    // but should we instead send it from here?
                    console.log('dragEnd', e.nativeEvent.coordinate)
                }}
            >
                <Image
                    style={Images.pin}
                    source={require("../../assets/Active.png")}
                />
            </Marker>
    }



    render() {
        const { bikeId, coordinates, onpress } = this.props;

        const rentedMarker = this.createRentedMarker(bikeId, coordinates, onpress);

        return (
            <View>
                {rentedMarker}
            </View>
        );
    }
}
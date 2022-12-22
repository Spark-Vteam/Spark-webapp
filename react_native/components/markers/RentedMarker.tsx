import React, { ReactNode } from 'react';
import { View, Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Images } from '../../styles/index';
import Bike from '../../interfaces/bike';



export default class RentedMarker extends React.Component<{
    coordinates: LatLng,
    bike:Bike,
    onpress: (bike: Bike) => void
}> {


    createRentedMarker = (coordinates: LatLng, bike:Bike, onpress: (bike:Bike) => void): ReactNode | null => {
        return <Marker
                coordinate={coordinates}
                draggable
            onPress={() => { onpress(bike); }}
                // onDragEnd={(e) => {
                //         // In real word, the python script on the bike
                //         // would send coordinates to update rent,
                //         // but should we instead send it from here?
                //         console.log('dragEnd', e.nativeEvent.coordinate)
                //     }}
            >
                <Image
                    style={Images.pin}
                    source={require('../../assets/Active.png')}
                />
            </Marker>
    }



    render() {
        const { coordinates, bike, onpress } = this.props;

        const rentedMarker = this.createRentedMarker(coordinates, bike, onpress);

        return (
            <View>
                {rentedMarker}
            </View>
        );
    }
}
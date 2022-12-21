import React, { ReactNode } from 'react';
import { View, Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Images } from '../../styles/index';



export default class RentedMarker extends React.Component<{ coordinates: LatLng, onpress: () => void }> {


    createRentedMarker = (coordinates: LatLng, onpress: () => void): ReactNode | null => {
        return <Marker
                coordinate={coordinates}
                draggable
                onPress={() => {
                    onpress();
                }}
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
        const { coordinates, onpress } = this.props;

        const rentedMarker = this.createRentedMarker(coordinates, onpress);

        return (
            <View>
                {rentedMarker}
            </View>
        );
    }
}
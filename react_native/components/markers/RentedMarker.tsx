import React from 'react';
import { LatLng } from 'react-native-maps';

import Bike from '../../interfaces/bike';

import CustomMarker from './CustomMarker';


export default class RentedMarker extends React.Component<{
    coordinates: LatLng,
    bike:Bike,
    onpress: (bike: Bike) => void
}> {


    render() {
        const { coordinates, bike, onpress } = this.props;

        return (
            <CustomMarker
                coordinates={coordinates}
                img={require('../../assets/Active.png')}
                onpress={() => { onpress(bike); }}
            />
        );
    }
}
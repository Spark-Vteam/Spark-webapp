import React, {ReactNode} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonStyle } from '../../styles/index';
import Bike from '../../interfaces/bike';
import mapsModel from '../../models/mapModel';

import BikePanel from './BikePanel';

export default class ChargBikeIcon extends React.Component
    <{
        id: number,
        battery: number,
        createRentedMarker: (bike: Bike) => void,
        setPanel: (newpanel: ReactNode) => void
    }> {

    render() {

        const { id, battery, createRentedMarker, setPanel } = this.props;

        return (
            <TouchableOpacity
                style={ButtonStyle.chargBikeButton as any}
                onPress={async () => {
                    const bike = await mapsModel.getBike(id);
                    setPanel(<BikePanel
                        bike={bike}
                        createRentedMarker={createRentedMarker}
                    />)
                    }}
                >
                <Text style={ButtonStyle.buttonText as any}>#{id}   {battery}%</Text>
            </TouchableOpacity>
        );
    }
}
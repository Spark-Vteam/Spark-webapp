import React, { ReactNode } from 'react';
import { View } from 'react-native';

import Bike from '../../interfaces/bike';
import BikePanel from '../panels/BikePanel';

import CustomMarker from './CustomMarker';


export default class BikeMarkers extends React.Component
    <{
    bikes: Bike[],
        discount: boolean,
        setPanel: (newpanel: ReactNode) => void,
        createRentedMarker: (bike:Bike) => void,
    }> {


    /**
     * Class method to create group of custom markers (for example bikes and stations)
     * @param {Bikes[]} bikes array with bikes
     * @param {Function} setPanel set function to display panel about bike when pressed
     * @return {ReactNode | null} returns an group of markers or null if not valid coordinates
     */
    createMarkers = (
        bikes: Bike[],
        discount: boolean,
        setPanel: (newPanel: ReactNode) => void,
        createRentedMarker: (bike:Bike) => void)
        : ReactNode | null => {
        return bikes.map((e: Bike, index: number) => {

            const lat = e.Position.split(',')[0];
            const long = e.Position.split(',')[1];

            const coordinates = {
                latitude: parseFloat(lat),
                longitude: parseFloat(long)
            };

            if (typeof (lat) == 'string' &&
                lat.length > 0 &&
                typeof (long) == 'string' &&
                long.length > 0) {
                return <CustomMarker
                    key={index}
                    coordinates={coordinates}
                    img={require('../../assets/Available.png')}
                    trackViewChanges={false}
                    // onpress={() => {
                    //     onpress(e.id, coordinates);
                    // }}
                    onpress={() => {
                        setPanel(<BikePanel
                            bike={e}
                            createRentedMarker={createRentedMarker}
                            discount={discount}
                            // onpress={
                            //     async () => {
                            //     await rentModel.startRent(1, e.id);
                            //     createRentedMarker(e);
                            //     this.setState({
                            //         bikeMarkers: null
                            //     });
                            //     }
                            // }
                        />);
                    }}
                />
            }
            // Invariant Violation error (when using wrong data format) is not caught by
            // catch-statement. Therefore the if statement above is used.
            console.warn('Invalid coordinates at' + JSON.stringify(e));
            return null
        })
    };

    render() {

        const { bikes, setPanel, createRentedMarker, discount } = this.props;

        const bikeMarkers = this.createMarkers(bikes, discount, setPanel, createRentedMarker);

        return (
            <View>
                {bikeMarkers}
            </View>
        );
    }
}
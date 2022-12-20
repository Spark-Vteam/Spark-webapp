import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { LatLng } from 'react-native-maps';

import Bike from '../../interfaces/bike';
import BikePanel from '../panels/BikePanel';

import CustomMarker from './CustomMarker';

import rentModel from '../../models/rentModel';


export default class BikeMarkers extends React.Component
    <{
        bikes: Bike[],
        setPanel: (newpanel: ReactNode) => void,
        createRentedMarker: (bikeId: number, coordinates: LatLng) => void,
    }> {


    /**
     * Class method to create group of custom markers (for example bikes and stations)
     * @param {Bikes[]} bikes array with bikes
     * @param {Function} setPanel set function to display panel about bike when pressed
     * @return {ReactNode | null} returns an group of markers or null if not valid coordinates
     */
    createMarkers = (
        bikes: Bike[],
        setPanel: (newPanel: ReactNode) => void,
        createRentedMarker: (bikeId: number, coordinates: LatLng) => void)
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
                            onpress={async () => {
                                await rentModel.startRent(1, e.id);
                                createRentedMarker(e.id, coordinates);
                                this.setState({
                                    bikeMarkers: null
                                });
                            }}
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

        const { bikes, setPanel, createRentedMarker } = this.props;

        const bikeMarkers = this.createMarkers(bikes, setPanel, createRentedMarker);

        return (
            <View>
                {bikeMarkers}
            </View>
        );
    }
}
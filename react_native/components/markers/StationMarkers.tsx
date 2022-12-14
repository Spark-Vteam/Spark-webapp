import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { LatLng } from 'react-native-maps';

import Station from '../../interfaces/station';
import StationPanel from '../panels/StationPanel';

import Bike from '../../interfaces/bike';

import CustomMarker from './CustomMarker';




export default class StationMarkers extends React.Component
    <{
        stations: Station[],
        setPanel: (newpanel: ReactNode) => void,
        createRentedMarker: (bike: Bike) => void,
        getCurrentDestination: () => LatLng | null,
        setDestinationMarker: (newPreDestinationMarker: ReactNode) => void,
        setDestination: (coordinates: LatLng | null) => void,
        getRentedPosition: () => LatLng | null,
        setRoute: (newRoute: ReactNode) => void,
        getIsActiveRent: () => boolean
    }> {



    // Class method to create group of station markers
    createMarkers = (
        stations: Station[],
        setPanel: (newpanel: ReactNode) => void,
        createRentedMarker: (bike: Bike) => void,
        getCurrentDestination: () => LatLng | null,
        setDestinationMarker: (newPreDestinationMarker: ReactNode) => void,
        setDestination: (coordinates: LatLng | null) => void,
        getRentedPosition: () => LatLng | null,
        setRoute: (newRoute: ReactNode) => void,
        getIsActiveRent: () => boolean
    )
        : ReactNode | null => {
        return stations.map((e: Station, index: number) => {

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
                    img={require('../../assets/ChargingStation.png')}
                    // trackViewChanges={false}
                    onpress={() => {
                        // setPanel(null);
                        // setTimeout(function () {
                        //     setPanel(<StationPanel
                        //         station={e}
                        //         currentDestination={getCurrentDestination()}
                        //         setDestinationMarker={setDestinationMarker}
                        //         setDestination={setDestination}
                        //         rentedPosition={getRentedPosition()}
                        //         setRoute={setRoute}
                        //         setPanel={setPanel}
                        //         activeRent={getIsActiveRent()}
                        //     />);
                        // }, 1);
                        setPanel(<StationPanel
                            station={e}
                            createRentedMarker={createRentedMarker}
                            currentDestination={getCurrentDestination()}
                            setDestinationMarker={setDestinationMarker}
                            setDestination={setDestination}
                            rentedPosition={getRentedPosition()}
                            setRoute={setRoute}
                            setPanel={setPanel}
                            activeRent={getIsActiveRent()}
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

        const { stations,
            setPanel,
            createRentedMarker,
            getCurrentDestination,
            setDestinationMarker,
            setDestination,
            getRentedPosition,
            setRoute,
            getIsActiveRent } = this.props;

        const stationMarkers = this.createMarkers(
            stations,
            setPanel,
            createRentedMarker,
            getCurrentDestination,
            setDestinationMarker,
            setDestination,
            getRentedPosition,
            setRoute,
            getIsActiveRent);

        return (
            <View>
                {stationMarkers}
            </View>
        );
    }
}
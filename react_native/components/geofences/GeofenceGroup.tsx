import React, { ReactNode } from 'react';
import { View } from 'react-native';

import GeofenceType from '../../interfaces/geofence';
import Geofence from './Geofence';

import GeofencePanel from '../panels/GeofencePanel';


export default class GeofenceGroup extends React.Component<{
    geofences: GeofenceType[],
    setPanel: (newpanel: ReactNode) => void
}> {

    /**
     * Class method to create group of geofences
     * @param {Geofence[]} geofences array with bikes or stations
     * @param {setPanel} setPanel function to set panel when pressing geofence
     * @return {ReactNode} returns an group of geofences
     */
    createMarkers = (geofences: GeofenceType[], setPanel: (newPanel: ReactNode) => void)
        : ReactNode => {
        return geofences.map((e, index: number) => {
            const coordinates = JSON.parse(e.Coordinates);
            const name = e.Info;
            const type = e.Type;

            if (type == 14) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 244, 0, 0.5)'}
                    borderColor={'#746F00'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={'Reduced speed area\nYour max speed will be reduced here.'}
                            logo={require('../../assets/logos/ReducedSpeedLogo.png')}
                        />)
                    }}
                />
            }
            if (type == 20) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 140, 0, 0.5)'}
                    borderColor={'#935000'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={'No parking area\nYou are not allowed to park here.'}
                            logo={require('../../assets/logos/NoParkingLogo.png')}
                        />)
                    }}
                />
            }
            if (type == 30) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 0, 0, 0.5)'}
                    borderColor={'#7E0000'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={'Off-limits area\nNo riding in this place. Your bike will stop if you try to drive here.'}
                            logo={require('../../assets/logos/StopLogo.png')}
                        />)
                    }}
                />
            }
            if (type == 50) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(0, 107, 255, 0.5)'}
                    borderColor={'#0E2443'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={'Parking area\n50% discount on Unlock fee if parked here or on a station.'}
                            logo={require('../../assets/logos/ParkingLogo.png')}
                        />)
                    }}
                />
            }
        })
    };

    render() {

        const { geofences, setPanel } = this.props;

        const geofenceGroup = this.createMarkers(geofences, setPanel);

        return (
            <View>
                {geofenceGroup}
            </View>
        );
    }
}
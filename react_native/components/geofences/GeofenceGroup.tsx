import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { LatLng } from 'react-native-maps';

import Bike from '../../interfaces/bike';
import Station from '../../interfaces/station';
import CustomMarkerOnPress from '../../interfaces/customMarkerOnPress';

import GeofenceType from '../../interfaces/geofence';
import Geofence from './Geofence';

import GeofencePanel from '../panels/GeofencePanel';




export default class GeofenceGroup extends React.Component<{
    geofences: GeofenceType[],
    setPanel: (newpanel: any) => void
}> {

    /**
     * Class method to create group of geofences
     * @param {Geofence[]} geofences array with bikes or stations
     * @param {setPanel} setPanel function to set panel when pressing geofence
     * @return {ReactNode} returns an group of geofences
     */
    createMarkers = (geofences: GeofenceType[], setPanel: (newPanel: any) => void)
        : ReactNode => {
        return geofences.map((e, index: number) => {
            const coordinates = JSON.parse(e.Coordinates);
            const name = e.Info;
            const type = e.Type;

            if (type == 10) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 244, 0, 0.5)'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={"Your max speed will be reduced here."}
                        />)
                    }}
                />
            }
            if (type == 20) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 140, 0, 0.5)'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={"You are not allowed to park here."}
                        />)
                    }}
                />
            }
            if (type == 30) {
                return <Geofence
                    coordinates={coordinates}
                    key={index}
                    color={'rgba(255, 0, 0, 0.5)'}
                    onpress={() => {
                        setPanel(<GeofencePanel
                            name={name}
                            info={"No riding in this area. The bike will stop if you try to drive here."}
                        />)
                    }}
                />
            }
        })
    };

    render() {

        const { geofences, setPanel } = this.props;

        const listMarkers = this.createMarkers(geofences, setPanel);

        return (
            <View>
                {listMarkers}
            </View>
        );
    }
}
import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';
import { LatLng } from 'react-native-maps';
// import Bike from '../../interfaces/bike';
// import BikePanel from './BikePanel';
import Station from '../../interfaces/station';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class StationPanel extends React.Component<{
    station: Station
    // name: string,
    // availableSpots: number,
    // occupiedSpots: number,
    // bikes: Bike[] | null,
    // setPanel: (newpanel: ReactNode) => void
    // coordinates: string,
    setDestination: (coordinates: LatLng) => void,
    setPanel: (newpanel: ReactNode) => void,
    activeRent: boolean,
}> {
    render() {
        const { station, setDestination, setPanel, activeRent } = this.props;
        // const { name, availableSpots, occupiedSpots, bikes, setPanel, activeRent } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Station {station.Name}</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{station.Available} available spots</Text>
                {/* Behöver vi number of occupied spots eller blir det överflödigt? */}
                <Text style={MapStyle.panelTextMiddle as any}>{station.Occupied} occupied spots</Text>
                {
                    // Show bikes to rent only if there are no active rents already
                    activeRent === false &&
                        // todo: fetch bikes parked at station somehow and
                        // make it so that one can rent from here
                        <Text style={MapStyle.panelTextMiddle as any}>{3} bikes ready to rent</Text>
                }
                {
                    activeRent === true && // && destination !== Station.coordinates
                    // SET AS DESTINATION
                    // ======================================
                    <TouchableOpacity
                        style={ButtonStyle.button as any}
                            onPress={() => {
                                const lat = station.Position.split(',')[0];
                                const long = station.Position.split(',')[1];
                                setDestination({
                                    latitude: parseFloat(lat),
                                    longitude: parseFloat(long)
                                });
                                setPanel(null);
                            }}
                    >
                        <Text style={ButtonStyle.buttonText as any}>SET AS DESTINATION</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
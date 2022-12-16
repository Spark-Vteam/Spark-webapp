import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';
// import Bike from '../../interfaces/bike';
// import BikePanel from './BikePanel';


// Panel with info about station. If no active rent, show existing bikes on station.
export default class StationPanel extends React.Component<{
    name: string,
    availableSpots: number,
    occupiedSpots: number,
    // bikes: Bike[] | null,
    // setPanel: (newpanel: ReactNode) => void
    activeRent: boolean,
}> {
    render() {
        const { name, availableSpots, occupiedSpots, activeRent } = this.props;
        // const { name, availableSpots, occupiedSpots, bikes, setPanel, activeRent } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Station {name}</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{availableSpots} available spots</Text>
                {/* Behöver vi number of occupied spots eller blir det överflödigt? */}
                <Text style={MapStyle.panelTextMiddle as any}>{occupiedSpots} occupied spots</Text>
                {
                    activeRent === false &&
                        // todo: fetch bikes parked at station somehow and
                        // make it so that one can rent from here
                        <Text style={MapStyle.panelTextMiddle as any}>{3} bikes ready to rent</Text>
                }
                {
                    activeRent === false && // && destination !== Station.coordinates
                    <TouchableOpacity
                        style={ButtonStyle.button as any}
                        onPress={() => {
                            // todo: Add polyline
                            // todo: if in simulation, get bike moving towards station
                        }}
                    >
                        <Text style={ButtonStyle.buttonText as any}>SET AS DESTINATION</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
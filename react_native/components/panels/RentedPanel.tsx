import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';
import Bike from '../../interfaces/bike';

import { Typography } from '../../styles/index';

import priceModel from '../../models/priceModel';


// Panel with button to stop the rent. OnPress function is injected.
export default class RentedPanel extends React.Component<{
    bike: Bike,
    onpress: () => void
}> {


    state: {
        discountEndParkingZone: number
    }

    constructor(props: any) {
        super(props);
        this.state = {
            discountEndParkingZone: 0
        };
    }

    componentDidMount() {
        this.fetchPricing();
    }

    fetchPricing = async () => {
        const pricing = await priceModel.getPrice();
        this.setState({
            discountEndParkingZone: pricing.DiscountEndParkingZone
        })
    }


    render() {

        const { bike, onpress } = this.props;
        return (
            <View style={MapStyle.panel as any}>
                <Text style={MapStyle.panelTitle as any}>Rented bike #{bike.id}</Text>
                <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                <TouchableOpacity
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        onpress();
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>STOP RIDE</Text>
                </TouchableOpacity>
                <Text style={MapStyle.panelTextMiddle as any}><Text style={Typography.bold as any}>Discount {this.state.discountEndParkingZone}%</Text> on Unlock fee if parked at a station or blue zone.</Text>
            </View>
        );
    }
}
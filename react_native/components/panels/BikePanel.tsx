import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MapStyle, ButtonStyle } from '../../styles/index';

import priceModel from '../../models/priceModel';

import Bike from '../../interfaces/bike';

// Panel with info about available bike. Button to start ride, OnPress function is injected.
export default class BikePanel extends React.Component<{ bike: Bike, onpress: () => void }> {

    state: {
        priceStart: number | null,
        priceMinute: number | null,
        priceFreeParking: number | null,
        discountStartFreeparking: number | null,
        discountEndParkingZone: number | null
    }

    constructor(props: any) {
        super(props);
        this.state = {
            priceStart: null,
            priceMinute: null,
            priceFreeParking: null,
            discountStartFreeparking: null,
            discountEndParkingZone: null
        };
    }

    async componentDidMount() {
        const pricing = await priceModel.getPrice();
        console.log(pricing);
        this.setState({
            priceStart: pricing.Start,
            priceMinute: pricing.Minute,
            priceFreeParking: pricing.Parking,
            discountStartFreeparking: pricing.DiscountStartFree,
            discountEndParkingZone: pricing.DiscountEndParkingZone
        })
        console.log(this.state.priceStart)
        console.log(this.state.priceMinute)
        console.log(this.state.priceFreeParking)
        console.log(this.state.discountStartFreeparking)
        console.log(this.state.discountEndParkingZone)
    }


    render() {
        const { bike, onpress } = this.props;

        return (
            <View style={MapStyle.panelLong as any}>
                <Text style={MapStyle.panelTitle as any}>Bike #{bike.id}</Text>
                <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                <TouchableOpacity
                    testID="button"
                    style={ButtonStyle.button as any}
                    onPress={() => {
                        onpress();
                    }}
                >
                    <Text style={ButtonStyle.buttonText as any}>START RIDE</Text>
                </TouchableOpacity>
                <Text style={MapStyle.panelTextMiddle as any}>Price / min: {this.state.priceMinute} kr   Unlock fee: {this.state.priceStart} kr</Text>
                <Text style={MapStyle.panelTextMiddle as any}>+{this.state.priceFreeParking} kr if parked outside station or parking</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{this.state.discountStartFreeparking} % discount on unlock fee if started from outside a station or parking</Text>
                <Text style={MapStyle.panelTextMiddle as any}>{this.state.discountEndParkingZone} % discount on unlock fee if returned to a station or parking</Text>
                <Text/>
            </View>
        );
    }
}
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MapStyle, ButtonStyle, Typography } from '../../styles/index';

import priceModel from '../../models/priceModel';

import Bike from '../../interfaces/bike';

import rentModel from '../../models/rentModel';

// Panel with info about available bike. Button to start ride, OnPress function is injected.
export default class BikePanel extends React.Component<{ bike: Bike, createRentedMarker: (bike: Bike) => void}> {

    state: {
        priceStart: number | null,
        priceMinute: number | null,
        priceFreeParking: number | null,
        discountStartFreeparking: number,
        discountEndParkingZone: number
    }

    constructor(props: any) {
        super(props);
        this.state = {
            priceStart: null,
            priceMinute: null,
            priceFreeParking: null,
            discountStartFreeparking: 0,
            discountEndParkingZone: 0
        };
    }

    createPricing = async () => {
        const pricing = await priceModel.getPrice();
        console.log(pricing);
        this.setState({
            priceStart: pricing.Start,
            priceMinute: pricing.Minute,
            priceFreeParking: pricing.Parking,
            discountStartFreeparking: pricing.DiscountStartFree,
            discountEndParkingZone: pricing.DiscountEndParkingZone
        })
    }


    render() {
        const { bike, createRentedMarker } = this.props;
        this.createPricing();

        return (
            <View style={MapStyle.panelLong as any}>
                <Text style={MapStyle.panelTitle as any}>Bike #{bike.id}</Text>
                <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text>
                <TouchableOpacity
                    testID="button"
                    style={ButtonStyle.button as any}
                    onPress={
                        async () => {
                            await rentModel.startRent(1, bike.id);
                            createRentedMarker(bike);
                            this.setState({
                                bikeMarkers: null
                            });
                        }
                    }
                >
                    <Text style={ButtonStyle.buttonText as any}>START RIDE</Text>
                </TouchableOpacity>
                {
                    this.state.priceStart !== null &&
                    <View>
                            <Text style={MapStyle.panelTextMiddle as any}><Text style={Typography.bold as any}>Price / min: {this.state.priceMinute} kr</Text>       Unlock fee: {this.state.priceStart * this.state.discountStartFreeparking / 100} kr <Text style={Typography.bold as any}>({this.state.discountStartFreeparking} % off!)</Text></Text>
                            <Text style={MapStyle.panelTextMiddle as any}>+{this.state.priceFreeParking} kr if parked outside station or blue zones</Text>
                    </View>
                }

            </View>
        );
    }
}
import React, {ReactNode} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MapStyle, ButtonStyle, Typography, Base, Images } from '../../styles/index';

import priceModel from '../../models/priceModel';

import Bike from '../../interfaces/bike';

import mapModel from '../../models/mapModel'
import rentModel from '../../models/rentModel';
import ErrorPanel from './ErrorPanel';


// Panel with info about available bike. Button to start ride, OnPress function is injected.
export default class BikePanel extends React.Component<{
    bike: Bike,
    setPanel: (newPanel: ReactNode) => void,
    createRentedMarker: (bike: Bike) => void,
    discount: boolean
}> {

    state: {
        priceStart: number | null,
        priceMinute: number | null,
        priceFreeParking: number | null,
        discountStartFreeparking: number,
    }

    constructor(props: any) {
        super(props);
        this.state = {
            priceStart: null,
            priceMinute: null,
            priceFreeParking: null,
            discountStartFreeparking: 0
        };
    }

    componentDidMount() {
        this.fetchPricing();
    }

    fetchPricing = async () => {
        const pricing = await priceModel.getPrice();
        // console.log(pricing);
        this.setState({
            priceStart: pricing.Start,
            priceMinute: pricing.Minute,
            priceFreeParking: pricing.Parking,
            discountStartFreeparking: pricing.DiscountStartFree,
            discountEndParkingZone: pricing.DiscountEndParkingZone
        })
    }


    render() {
        const { bike, setPanel, createRentedMarker, discount } = this.props;


        return (
            <View style = { MapStyle.panelLong as any} >
                <Image
                    style={Images.panelLogo as any}
                    source={require('../../assets/logos/AvailableBikeLogo.png')}
                />

                <View style={Base.flextRowNoFlex1 as any}>
                    <Text style={Typography.bold as any}>Bike #{bike.id}</Text>
                    <Text>      </Text>
                    <Image
                        source={require('../../assets/BatteryIcon.png')}
                        style={ButtonStyle.chargBikeButtonBatteryIcon}
                    />
                    <Text> </Text>
                    <Text style={Typography.bold as any}>{bike.Battery}%</Text>
                </View>
                {/* <Text style={MapStyle.panelText}>Battery left: {bike.Battery}%</Text> */}
                <TouchableOpacity
                    testID="button"
                    style={ButtonStyle.buttonGreen as any}
                    onPress={

                        async () => {
                            const infoBike = await mapModel.getBike(bike.id);
                            // console.log(infoBike.Status)
                            if (infoBike.Status >= 10 && infoBike.Status < 20 || infoBike.Status == 40) {
                                createRentedMarker(bike);
                                await rentModel.startRent(bike.id);
                                this.setState({
                                    bikeMarkers: null
                                });
                            } else {
                                setPanel(<ErrorPanel
                                    message='Sorry, it seems like your bike has already been rented by someone else. :/'
                                />)
                            }
                        }
                    }
                >
                    <Text style={ButtonStyle.buttonText as any}>START RIDE</Text>
                </TouchableOpacity>
                {
                    this.state.priceStart !== null && discount === true &&
                    <View>
                        <Text style={MapStyle.panelTextMiddle as any}><Text style={Typography.bold as any}>Price / min: {this.state.priceMinute} kr</Text>       Unlock fee: {this.state.priceStart * this.state.discountStartFreeparking / 100} kr <Text style={Typography.bold as any}>({this.state.discountStartFreeparking} % off!)</Text></Text>
                        <Text style={MapStyle.panelTextMiddle as any}>+{this.state.priceFreeParking} kr if parked outside station or blue zones</Text>
                    </View>
                }
                {
                    this.state.priceStart !== null && discount === false &&
                    <View>
                        <Text style={MapStyle.panelTextMiddle as any}><Text style={Typography.bold as any}>Price / min: {this.state.priceMinute} kr</Text>       Unlock fee: {this.state.priceStart} kr</Text>
                        <Text style={MapStyle.panelTextMiddle as any}>+{this.state.priceFreeParking} kr if parked outside station or blue zones</Text>
                    </View>
                }


            </View>
        );
    }
}
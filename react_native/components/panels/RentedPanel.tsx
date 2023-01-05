import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { MapStyle, ButtonStyle, Images } from '../../styles/index';
import Bike from '../../interfaces/bike';

import { Typography , Base} from '../../styles/index';

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
            <View style={MapStyle.panelLong as any}>
                <Image
                    source={require('../../assets/logos/RentedBikeLogo.png')}
                    style={Images.panelLogo as any}
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
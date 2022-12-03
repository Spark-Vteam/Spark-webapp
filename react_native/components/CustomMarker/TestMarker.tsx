import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

import { Base, Typography, Images } from '../../styles/index';


export default class TestMarker extends PureComponent {

    constructor(props: any) {
        super(props);
        this.state = {
            tracksViewChanges: true,
        };
    }

    stopTrackingViewChanges = () => {
        this.setState(() => ({
            tracksViewChanges: false,
        }));
    }

    render() {
        // const { tracksViewChanges } = this.state;
        const { coordinates } = this.props;
        // console.log("mark!!");
        // console.log(coordinates);
        return (
            <Marker
                coordinate={coordinates}
                // tracksViewChanges={tracksViewChanges}
                tracksViewChanges={false}
            >
                <Image
                    style={Images.pin}
                    source={require("../../assets/testpin.png")}
                    // onLoad={this.stopTrackingViewChanges}
                    fadeDuration={0}
                />
            </Marker>
        );
    }
}
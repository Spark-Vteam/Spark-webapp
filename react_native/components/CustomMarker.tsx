import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';

import { Base, Typography, Images } from '../styles/index';


// Create a custom Marker using
// cooridates and image from props.
export default class CustomMarker extends PureComponent<{ coordinates: LatLng, img: number, obj: any, type: string }>{

    render() {
        const { coordinates, img, obj, type } = this.props;
        return (
            <Marker
                coordinate={coordinates}
                tracksViewChanges={false}
                onPress={() => {
                    console.log(obj.id);
                    console.log(type);
                    if (type == "bikes") {
                        console.log("Bike selected");
                        console.log(obj.id);
                        console.log(obj.Battery);
                        console.log(obj.Status);
                        // todo: Antingen fetcha enskild bike med id eller utgå från alla bikes i Map.tsx (som är
                        // todo: uppkopplad till sockets?)
                    }
                    if (type == "station") {
                        console.log("Station selected");
                        console.log(obj.id);
                        console.log(obj.Name);
                        // todo: Fetcha denna station med id för att gå antal chargers/lediga platser?
                        // todo: Men då går idén om sockets bort?
                    }
                }}
            >
                <Image
                    style={Images.pin}
                    source={img}
                />
            </Marker>
        );
    }
}
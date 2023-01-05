import React, {ReactNode} from 'react';
import { Marker } from 'react-native-maps';
import UserPanel from '../panels/UserPanel';

// Create a user Marker using
// cooridates from state userLocation in App.tsx.
export default class UserMarker extends React.Component<{
    currentLocation: any,
    setPanel: (newpanel: ReactNode) => void
}> {

    render() {

        return (
            <Marker coordinate={{
                latitude: this.props.currentLocation.latitude,
                longitude: this.props.currentLocation.longitude
            }}
                image={require('../../assets/User.png')}
                onPress={() => {
                    this.props.setPanel(<UserPanel/>)
                }}
            />

        );
    }
}
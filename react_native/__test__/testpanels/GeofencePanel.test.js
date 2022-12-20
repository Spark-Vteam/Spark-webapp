import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomMarker from '../../components/markers/CustomMarker';
import { Text, View, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { Marker } from 'react-native-maps';
import GeofencePanel from '../../components/panels/GeofencePanel';

describe('GeofencePanel', () => {
    it('renders the Geofencepanel component with the correct props', () => {

        const { getByText } = render(
            <GeofencePanel name={"geofencePanel"} info={"this info"} />
        );

        expect(getByText('geofencePanel')).toBeDefined();
        expect(getByText('this info')).toBeDefined();
    });
});
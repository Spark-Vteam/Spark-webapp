import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomMarker from '../../components/markers/CustomMarker';
import { Text, View, TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { Marker } from 'react-native-maps';
import SetDestinationPanel from '../../components/panels/SetDestinationPanel';

describe('SetDestinationPanel', () => {
    it('should render a View element with the correct style prop', () => {

        const { getByText } = render(
            <SetDestinationPanel
                rentedPosition={null}
                coordinates={{ latitude: 0, longitude: 0 }}
                setDestination={jest.fn()}
                setDestinationMarker={jest.fn()}
                setPreDestinationMarker={jest.fn()}
                setPanel={jest.fn()}
                setRoute={jest.fn()}
            />
        );

        expect(getByText('PLOT ROUTE')).toBeDefined();
    });
});

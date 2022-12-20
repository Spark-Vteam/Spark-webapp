import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomMarker from '../../components/markers/CustomMarker';
import { act, create } from 'react-test-renderer';
import { Marker } from 'react-native-maps';

describe('CustomMarker', () => {
    it('renders a Marker', () => {
        let component;
        act(() => {
            component = create(
                <CustomMarker
                    coordinates={{ latitude: 0, longitude: 0 }}
                    img={1}
                    onpress={jest.fn()}
                    trackViewChanges={false}
                />
            );
        });
        const root = component.root;
        const marker = root.findByType(Marker);
        expect(marker).toBeTruthy();
    });

    it('sets the correct tracksViewChanges prop on the Marker', () => {
        const trackViewChanges = true;
        let component;
        const coordinates = { latitude: 0, longitude: 0 }
        act(() => {
            component = create(
                <CustomMarker
                    coordinates={coordinates}
                    img={1}
                    onpress={jest.fn()}
                    trackViewChanges={trackViewChanges}
                />
            );
        });
        const root = component.root;
        const marker = root.findByType(Marker);
        expect(marker.props.coordinate).toEqual(coordinates);
    });

    it('should have correct onPress prop', () => {
        const mockOnPress = jest.fn();
        const { getByTestId } = render(
            <CustomMarker
                coordinates={{ latitude: 0, longitude: 0 }}
                img={1}
                onpress={mockOnPress}
                trackViewChanges={false}
            />
        );
        const marker = getByTestId('marker');
        fireEvent.press(marker);
        expect(mockOnPress).toHaveBeenCalled();
    });
});
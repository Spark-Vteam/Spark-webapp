import React from 'react';
import Pline from '../../components/polyline/Polyline';
import { Polyline } from 'react-native-maps';
import { act, create } from 'react-test-renderer';



describe('Pline', () => {
    it('renders a Polyline with correct coordinates', () => {

        const mockCoordinates = [
            { latitude: 10, longitude: 20 },
            { latitude: 20, longitude: 30 },
        ];

        const props = {
            coordinates: mockCoordinates,
        };

        let component;
        act(() => {
            component = create(<Pline {...props} />);
        });
        const root = component.root;
        const polyline = root.findByType(Polyline);

        expect(polyline.props.coordinates).toEqual(mockCoordinates);
    });
});
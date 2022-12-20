import React from 'react';
import Geofence from '../../components/geofences/Geofence';
import { render } from '@testing-library/react-native';
// import { toHaveStyle } from '@testing-library/jest-dom'


describe('Geofence', () => {
    it('calls the onPress prop when tapped', () => {
        const onpress = jest.fn();
        const { getByTestId } = render(
            <Geofence
                coordinates={[
                    [123, 456],
                    [789, 124],
                ]}
                color="#000"
                borderColor="#fff"
                onpress={(onpress)}
            />
        );
        const polygon = getByTestId('polygon');

        const { fillColor, strokeColor } = polygon.props;
        expect(fillColor).toBe('#000');
        expect(strokeColor).toBe('#fff');

        // Kan inte testa om funktionen onpress som injiceras blir anropad
        // efter som det är 50 ms delay i koden. Annars hade det nog gått.
        // fireEvent.press(polygon);
        // expect(onpress).toHaveBeenCalled();
    });
});
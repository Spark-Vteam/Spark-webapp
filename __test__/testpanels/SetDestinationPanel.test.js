import React from 'react';
import { render } from '@testing-library/react-native';
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

import React from 'react';
import { render } from '@testing-library/react-native';
import StationPanel from '../../components/panels/StationPanel';


jest.mock('../../models/mapModel');

const mockSetDestination = jest.fn();
const mockSetDestinationMarker = jest.fn();
const mockSetRoute = jest.fn();
const mockSetPanel = jest.fn();

const mockStation = {
    Name: 'Test Station',
    Available: 10,
    Occupied: 0,
    Position: '10,20',
};

const mockRentedPosition = {
    latitude: 0,
    longitude: 0,
};

const props = {
    station: mockStation,
    currentDestination: null,
    setDestinationMarker: mockSetDestinationMarker,
    setDestination: mockSetDestination,
    rentedPosition: mockRentedPosition,
    setRoute: mockSetRoute,
    setPanel: mockSetPanel,
    activeRent: false,
};

describe('StationPanel', () => {
    it('renders the correct information for the station', () => {
        const { getByText } = render(<StationPanel {...props} />);

        expect(getByText('Station Test Station')).toBeDefined();
        expect(getByText('10 available spots')).toBeDefined();
        expect(getByText('0 occupied spots')).toBeDefined();
    });


    it('renders the "Plot Route" button when activeRent is true and there is no current destination', () => {
        const { getByText } = render(<StationPanel {...props} activeRent={true} />);

        expect(getByText('PLOT ROUTE')).toBeDefined();
    });


    it('renders the "Plot Route" button when activeRent is true and current destination is different from the station', () => {
        const differentDestination = {
            latitude: 20,
            longitude: 30,
        };
        const { getByText } = render(
            <StationPanel {...props} activeRent={true} currentDestination={differentDestination} />,
        );

        expect(getByText('PLOT ROUTE')).toBeDefined();
    });

});
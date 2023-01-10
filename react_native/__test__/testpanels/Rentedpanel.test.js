import React from 'react';
import { render } from '@testing-library/react-native';
import RentedPanel from '../../components/panels/RentedPanel';


describe('PricePanel', () => {
    it('renders the PricePanel component with the correct props', () => {
        const onPressMock = jest.fn();
        const bikeMock = {
            'Battery': 50,
            'Position': '0,0',
            'Speed': 50,
            'Status': 10,
            'id': 1
        }

        const { getByText } = render(
            <RentedPanel onpress={onPressMock} bike={bikeMock} />
        );

        expect(getByText('STOP RIDE')).toBeDefined();
    });
});
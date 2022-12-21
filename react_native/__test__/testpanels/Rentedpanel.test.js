import React from 'react';
import { render } from '@testing-library/react-native';
import RentedPanel from '../../components/panels/RentedPanel';

describe('PricePanel', () => {
    it('renders the PricePanel component with the correct props', () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <RentedPanel onpress={onPressMock} />
        );

        expect(getByText('STOP RIDE')).toBeDefined();
    });
});
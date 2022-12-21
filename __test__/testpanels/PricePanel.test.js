import React from 'react';
import { render } from '@testing-library/react-native';
import PricePanel from '../../components/panels/PricePanel';

describe('PricePanel', () => {
    it('renders the PricePanel component with the correct props', () => {

        const { getByText } = render(
            <PricePanel price={100} />
        );

        expect(getByText('Thank you for choosing Spark')).toBeDefined();
        expect(getByText('Price for ride: 100.')).toBeDefined();
    });
});
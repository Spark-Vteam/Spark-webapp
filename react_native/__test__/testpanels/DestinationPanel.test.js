import React from 'react';
import { render } from '@testing-library/react-native';
import DestinationPanel from '../../components/panels/DestinationPanel';

describe('DestinationPanel', () => {
    it('renders the DestinationPanel component with the correct props', () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <DestinationPanel onpressButton={onPressMock} />
        );

        expect(getByText('CANCEL')).toBeDefined();
    });
});
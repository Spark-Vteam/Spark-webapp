import React from 'react';
import { render } from '@testing-library/react-native';
import GeofencePanel from '../../components/panels/GeofencePanel';

describe('GeofencePanel', () => {
    it('renders the Geofencepanel component with the correct props', () => {

        const { getByText } = render(
            <GeofencePanel name={'geofencePanel'} info={'this info'} />
        );

        expect(getByText('geofencePanel')).toBeDefined();
        expect(getByText('this info')).toBeDefined();
    });
});
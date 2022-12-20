import GeofenceGroup from '../../components/geofences/GeofenceGroup';
import Geofence from '../../components/geofences/Geofence';
import { act, create } from 'react-test-renderer';

describe('GeofenceGroup', () => {
    it('renders geofences correctly', () => {
        const geofences = [
            { Coordinates: '[[123, 456], [789, 112]]', Info: 'Geofence 1', Type: 10 },
            { Coordinates: '[[123, 456], [789, 112]]', Info: 'Geofence 2', Type: 20 },
            { Coordinates: '[[123, 456], [789, 112]]', Info: 'Geofence 3', Type: 30 },
        ];
        let component;
        act(() => {
            component = create(
                <GeofenceGroup
                    geofences={geofences}
                    setPanel={jest.fn()}
                />
            );
        });
        const root = component.root;
        const geofencesAll = root.findAll(node => node.type === Geofence);
        expect(geofencesAll.length).toBe(3);
    });
});
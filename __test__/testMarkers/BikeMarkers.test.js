import React from 'react';
import BikeMarkers from '../../components/markers/BikeMarkers';
import CustomMarker from '../../components/markers/CustomMarker';
import { act, create } from 'react-test-renderer';

describe('BikeMarkers', () => {
    it('renders bike markers correctly', () => {
        const bikes = [
            {
                id: 1,
                Type: 1,
                Name: 'Bike 1',
                Brand: 'Brand 1',
                Model: 'Model 1',
                Status: 1,
                Position: '123.456, 789.12',
            },
            {
                id: 2,
                Type: 1,
                Name: 'Bike 2',
                Brand: 'Brand 2',
                Model: 'Model 2',
                Status: 1,
                Position: '123.456, 789.12',
            },
            {
                id: 3,
                Type: 1,
                Name: 'Bike 3',
                Brand: 'Brand 3',
                Model: 'Model 3',
                Status: 1,
                Position: '123.456, 789.12',
            },
        ];
        let component;
        act(() => {
            component = create(
                <BikeMarkers
                    bikes={bikes}
                    setPanel={jest.fn()}
                    createRentedMarker={jest.fn()}
                />
            );
        });
        const root = component.root;
        const markers = root.findAll(node => node.type === CustomMarker);
        expect(markers.length).toBe(3);
    });


    it('renders no markers for invalid bike positions', () => {
        const bikes = [{ id: 1, Type: 1, Name: 'Bike 1', Brand: 'Brand 1', Model: 'Model 1', Status: 1, Position: '', },];
        let component;
        act(() => {
            component = create(
                <BikeMarkers
                    bikes={bikes}
                    setPanel={jest.fn()}
                    createRentedMarker={jest.fn()}
                />
            );
        });
        const root = component.root;
        const markers = root.findAll(node => node.type === CustomMarker);
        expect(markers.length).toBe(0);
    });
});
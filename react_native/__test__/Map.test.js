// import { render } from '@testing-library/react-native';

import Map from '../components/Map';
// import { render } from '@testing-library/react-native';
import { act, create } from 'react-test-renderer';
import { Marker, Polygon } from 'react-native-maps';
import { View } from 'react-native';


// jest.mock("../components/Map", () => "Map");

describe('Map', () => {
    // it('renders the Map component with the scan button', async () => {

    //     const userLocationMock = { latidude: 0, longitude: 0 };
    //     const centerPointMock = { latidude: 0, longitude: 0 };
    //     const updateUserLocationMock = jest.fn();
    //     const setNotTestingMock = jest.fn();
    //     const userIdMock = 1;

    //     const { getByText, getByTestId } = render(<Map
    //         userLocation={userLocationMock}
    //         centerPoint={centerPointMock}
    //         updateUserLocation={updateUserLocationMock}
    //         setNotTesting={setNotTestingMock}
    //         userId={userIdMock}
    //     />);

    //     const mapview = getByTestId('mapview');

    //     // // uncomment to see what is rendered in Map component:
    //     // const { getByText, debug } = render(<Map />);
    //     // debug({ message: "Map component" })

    //     expect(mapview).toBeDefined();
    //     expect(getByText('Scan this area')).toBeDefined();
    // });


    it('calling state methods update states', () => {

        let component;

        // Test updating rentedPos
        act(() => {
            component = create(<Map />);
        });
        const instance = component.getInstance();
        act(() => {
            instance.setRentedPos({ latitude: 123, longitude: 456 });
        });

        expect(instance.state.rentedPos).toEqual({ latitude: 123, longitude: 456 });
        expect(instance.getRentedPosition()).toEqual({ latitude: 123, longitude: 456 });

        // Test updating rentedMarker state
        act(() => {
            instance.setRentedMarker(<Marker />);
        });
        expect(instance.state.rentedMarker).toEqual(<Marker />);

        // Test updating route state
        act(() => {
            instance.setRoute(<Polygon />);
        });
        expect(instance.state.route).toEqual(<Polygon />);

        // Test updating panel state
        act(() => {
            instance.setPanel(<View />);
        });
        expect(instance.state.panel).toEqual(<View />);

        // Test updating destination state
        act(() => {
            instance.setDestination({ latitude: 123, longitude: 456 });
        });
        expect(instance.state.destination).toEqual({
            latitude: 123, longitude: 456
        });
    });
});


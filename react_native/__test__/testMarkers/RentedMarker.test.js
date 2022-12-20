import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import RentedMarker from '../../components/markers/RentedMarker';
import { act, create } from 'react-test-renderer';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';

describe('RentedMarker', () => {
    it('renders a Marker element', () => {
        // const { getByTestId } = render(<RentedMarker coordinates={{ latitude: 0, longitude: 0 }} onpress={() => { }} />);
        // const marker = getByTestId('marker');
        // expect(marker).toBeDefined();



        let component;
        act(() => {
            component = create(
                <RentedMarker
                    coordinates={{ latitude: 0, longitude: 0 }}
                    onpress={jest.fn()} />
            );
        });
        const root = component.root;
        const marker = root.findByType(Marker);
        expect(marker).toBeDefined();
    });


    it('renders an Image element inside the Marker element', () => {
        let component;
        act(() => {
            component = create(
                <RentedMarker
                    coordinates={{ latitude: 0, longitude: 0 }}
                    onpress={jest.fn()} />
            );
        });
        const root = component.root;
        const image = root.findByType(Image);
        expect(image).toBeDefined();
    });

    it('calls the onPress prop of the Marker element when the Marker element is pressed', () => {
        const onPressMock = jest.fn();

        let component;
        act(() => {
            component = create(
                <RentedMarker
                    coordinates={{ latitude: 0, longitude: 0 }}
                    onpress={onPressMock} />
            );
        });
        const root = component.root;
        const marker = root.findByType(Marker);
        // expect(image).toBeDefined();

        fireEvent.press(marker);
        expect(onPressMock).toHaveBeenCalled();
    });
});
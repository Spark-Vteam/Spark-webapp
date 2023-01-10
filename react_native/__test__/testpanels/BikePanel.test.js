import BikePanel from '../../components/panels/BikePanel';
import { render } from '@testing-library/react-native';


describe('BikePanel', () => {

    it('renders the BikePanel component with the correct props', () => {
        const bike = {
            id: 1,
            Battery: 50
        };
        const onPress = jest.fn();

        const { getByText } = render(
            <BikePanel bike={bike} onPress={onPress} />
        );

        // // uncomment to see what is rendered in Map component:
        // const { getByText, debug } = render(
        //     <BikePanel bike={bike} onPress={onPress} />
        // );
        // debug({ message: "BikePanel component" })


        expect(getByText('Bike #1')).toBeDefined();
        expect(getByText('50%')).toBeDefined();
        expect(getByText('START RIDE')).toBeDefined();
    });

    // it('calls the onPress function when the start ride button is pressed', () => {
    //     const bike = {
    //         id: 1,
    //         battery: 50,
    //     };
    //     const onpress = jest.fn(bike);

    //     const { getByTestId } = render(
    //         <BikePanel
    //             bike={bike}
    //             createRentedMarker={onpress}
    //             discount={false}
    //         />
    //     );

    //     const button = getByTestId('button');
    //     fireEvent.press(button);

    //     expect(button).toBeDefined();
    //     expect(onpress).toHaveBeenCalled();

    // });
});
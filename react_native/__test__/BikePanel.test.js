import BikePanel from '../components/panels/BikePanel';
import { View, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';


test('renders the BikePanel component with the correct props', () => {
    const bike = { id: 1, Battery: 50 };
    const onPress = jest.fn();

    const { getByText } = render(
        <BikePanel bike={bike} onPress={onPress} />
    );

    // // uncomment to see what is rendered in Map component:
    // const { getByText, debug } = render(
    //     <BikePanel bike={bike} onPress={onPress} />
    // );
    // debug({ message: "BikePanel component" })


    expect(getByText('Bike nr 1')).toBeDefined();
    expect(getByText('Battery left: 50%')).toBeDefined();
    expect(getByText('START RIDE')).toBeDefined();
    // todo: lägg till när det kommit med och fecthar från backend
    // expect(getByText('SEK2.80/min')).toBeDefined();
    // expect(getByText('20% discount if returned to a station')).toBeDefined();

});

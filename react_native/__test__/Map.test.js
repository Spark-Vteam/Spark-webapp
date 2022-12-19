// import { render } from '@testing-library/react-native';

import Map from '../components/Map';
import { render } from '@testing-library/react-native';

// jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
// ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers

// jest.mock("../components/Map", () => "Map");

test('renders the Map component with the scan button', async () => {
    const { getByText } = render(<Map />);

    // // uncomment to see what is rendered in Map component:
    // const { getByText, debug } = render(<Map />);
    // debug({ message: "Map component" })

    expect(getByText('Scan this area')).toBeDefined();
});

// test('updates the rentedPos state when setRentedPos is called', () => {
//     const { getByTestId, rerender } = render(<Map />);
//     const map = shallow(<Map />);
//     const newRentedPos = { latitude: 0, longitude: 0 };
//     rerender(<Map />);
//     fireEvent(map, 'setRentedPos', newRentedPos);
//     rerender(<Map />);
//     expect(map.state.rentedPos).toEqual(newRentedPos);
// });

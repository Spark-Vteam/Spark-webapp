import { Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env'
import TestComponent from './components/TestComponent';


export default function App() {

  const [data, setData] = useState("Data not fetched yet");


  async function fetchData() {
    try {
      const response = await fetch(`http://${IP}:4000/bike`);
      const result = await response.json();
      const bikes = result[0];
      // console.log(bikes);
      let list = "";

      for (let i = 0; i < 10; i++) {
        list += `
bike ${i + 1}:
    position: ${bikes[i].Position}
    battery: ${bikes[i].Battery}
    status: ${bikes[i].Status}
    speed: ${bikes[i].Speed}
          `
      }

      setData(list);

    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return (
    <ScrollView style={Base.base}>
      <Button
        color='#4F4C4A'
        onPress={fetchData}
        title="Fetch dataTest"
        />
      <Text>IP is {IP}</Text>
      <Text>First 10 bikes in array:</Text>
      <Text>{data}</Text>
    </ScrollView>
  );
}

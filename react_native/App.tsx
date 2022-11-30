import { Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env'


export default function App() {

  const [data, setData] = useState("Data not fetched yet");


  async function fetchData() {
    try {
      const response = await fetch(`http://${IP}:4000/bike`);
      const result = await response.json();
      // console.log(result);
      let list = "";

      for (let i = 0; i < 10; i++) {
        list += `
bike ${i + 1}:
    position: ${result[i].Position}
    battery: ${result[i].Battery}
    status: ${result[i].Status}
    speed: ${result[i].Speed}
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

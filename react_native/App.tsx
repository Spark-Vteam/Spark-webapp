import { Text, View, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env'


export default function App() {

  const [data, setData] = useState("Data not fetched yet");


  async function fetchData() {
    try {
      const response = await fetch(`http://${IP}:3000/test`);
      const result = await response.json();
      console.log(result);
      setData(result.testing);

    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return (
    <View style={Base.base}>
      <Button
        color='#4F4C4A'
        onPress={fetchData}
        title="Fetch dataTest"
        />
      <Text>IP is {IP}</Text>
      <Text>Data:</Text>
      <Text>{data}</Text>
    </View>
  );
}

import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { Base, Typography } from './styles/index';
import testModel from './models/testModel'

export default function App() {

  const [data, setData] = useState(null);


  function fetchData() {
    {/* Todo: testa att hämta via testModel här när vi vet route */ }
  }

  return (
    <View style={Base.base}>
      <Button
        color='#4F4C4A'
        onPress={fetchData}
        title="Fetch some goddamn data testing change"
      />
      <Text>Testing push</Text>
      { data }
    </View>
  );
}

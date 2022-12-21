import React, { Component } from 'react';
// import { Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
// import LoginTest from './components/experiment/LoginTest';
// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/TestMap';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base } from './styles/index';
import Map from './components/Map';


export default class App extends Component {

  render() {

    return (
      <SafeAreaView style={Base.base}>
        {/* <TestMap /> */}
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        {/* <LoginTest  /> */}
        <Map />
      </SafeAreaView>
    );
  }
}

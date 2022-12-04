import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/Map';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base, Typography } from './styles/index';
import Map from './components/Map';


export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={Base.base}>
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        <Map />
    </SafeAreaView>
    );
  }
}

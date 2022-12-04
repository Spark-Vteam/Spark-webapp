import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env'
// import Test from './components/Test';
// import TestMap from './components/experiment/Map';
import mapsModel from './models/mapModel';
import Map from './components/Map';


export default class App extends Component {

  render() {

    return (
      <SafeAreaView style={Base.base}>
        {/* <Test animal={"monkey"} /> */}
        <Map />
    </SafeAreaView>
    );
  }
}

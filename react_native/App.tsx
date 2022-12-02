import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env'
// import Test from './components/Test';
import Map from './components/Map';
import mapsModel from './models/mapModel';


export default class App extends Component {

  render() {

    return (
      <SafeAreaView style={Base.base}>
        <Map />
        {/* <Test animal={"monkey"} /> */}
    </SafeAreaView>
    );
  }
}

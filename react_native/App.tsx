import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from './styles/index';
import { IP } from '@env';
import Test from './components/experiment/Test';
// import TestMap from './components/experiment/Map';
import ClusterMap from './components/experiment/ClusterMap';
import mapsModel from './models/mapModel';
import Map from './components/Map';


export default class App extends Component {

  state: {
    name: string,
    name2: string
  }

  constructor(props: any) {
    super(props);
    this.state = {
      name: "Erik",
      name2: "Sanji"
    };
  }

  setName = (newName:string) => {
    this.setState({
      name: newName
    })
  }


  render() {
    console.log(typeof (this.setName));
    return (
      <SafeAreaView style={Base.base}>
        <ClusterMap />
        {/* <Map /> */}
    </SafeAreaView>
    );
  }
}

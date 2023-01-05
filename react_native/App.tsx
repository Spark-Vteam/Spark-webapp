import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/TestMap';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base } from './styles/index';

import Map from './components/Map';
import AuthMenu from './components/login/AuthMenu';


export default class App extends Component {

  // -- In class component we keep all states in one object...
  state: {
    isLoggedIn: boolean,
    userLocation: Region | null,
    TESTING: Boolean
  }

  // -- ... and initialize them in in the constructor
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isLoggedIn: false,  // <-- todo: check if valid token exists
      userLocation: null,
      TESTING: true
    };
  }

  // setLocation = (coordinates: LatLng) => {
  //   this.setState({
  //     userLocation: coordinates
  //   })
  // }

  setNotTesting = () => {
    this.setState({
      TESTING: false
    })
  }

  setIsLoggedIn = (value: boolean) => {
    this.setState({
      isLoggedIn: value
    });
  }

  setUserLocation = async () => {
    // GET USERS LOCATION AND SET LOCATIONMARKER
    // ===================================
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // handle somehow
      return;
    }

    const userLocationObject = await Location.getCurrentPositionAsync({});

    const userLocation = {
      latitude: userLocationObject.coords.latitude,
      longitude: userLocationObject.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }

    if (this.state.TESTING) {
      this.setState({
        userLocation: {
          latitude: 55.7047,
          longitude: 13.1910,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
      })
    } else {
      this.setState({
        userLocation: userLocation
      })
    }

    // console.log(this.state.userLocation);
  }

  componentDidMount() {
    this.setUserLocation();
  }

  render() {

    return (

      <SafeAreaView style={Base.base}>
        {/* <TestMap /> */}
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        {
          this.state.isLoggedIn && this.state.userLocation ?
            <Map
              userLocation={this.state.userLocation}
              updateUserLocation={this.setUserLocation}
              centerPoint={{
                latitude: this.state.userLocation.latitude,
                longitude: this.state.userLocation.longitude
              }}
              setNotTesting={this.setNotTesting}
            />
            :
          <AuthMenu
              setIsLoggedIn={this.setIsLoggedIn}
            />
        }

      </SafeAreaView>
    );
  }
}

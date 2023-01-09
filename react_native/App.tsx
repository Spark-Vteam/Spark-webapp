import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';
import FlashMessage from 'react-native-flash-message';

// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/TestMap';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base, FlashStyle } from './styles/index';

import Map from './components/Map';
import AuthMenu from './components/login/AuthMenu';
import authModel from './models/authModel';


export default class App extends Component {

  // -- In class component we keep all states in one object...
  state: {
    isLoggedIn: boolean,
    userLocation: Region | null,
    TESTING: Boolean,
    isLoading: Boolean,
    userId: number
  }

  // -- ... and initialize them in in the constructor
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,  // <-- todo: check if valid token exists
      userLocation: null,
      TESTING: true,
      userId: -1
    };
  }

  // setLocation = (coordinates: LatLng) => {
  //   this.setState({
  //     userLocation: coordinates
  //   })
  // }

  setIsLoading = (value: Boolean) => {
    this.setState ({
      isLoading: value
    })
  }

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

  setUserId = (newUserId: number) => {
    this.setState({
      userId: newUserId
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

  async componentDidMount() {
    this.setUserLocation();

    FlashMessage.setColorTheme({
      success: "#36AA36",
      info: "#3375D0",
      warning: "#B64A06",
      danger: "#B62306",
    });

    const authStorage = await authModel.getAuthStorage();

    if (authStorage) {
      // Log in automatically if valid token is in storage
      this.setState({
        isLoggedIn: true,
        userId: authStorage.userId,
      })
    } else {
      this.setIsLoading(false);
    }



    // // Prevents loading from popping up if valid token is found
    // // instead keep showing loading bar
    // this.setIsLoading(isLoggedIn);

    // ONLY FOR TESTING!!
    // this.setIsLoading(false);
  }

  render() {

    return (

      <SafeAreaView style={Base.base}>
        {/* <TestMap /> */}
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        {
          this.state.isLoggedIn && this.state.userLocation ?
            <View style={Base.base}>
              <Map
              userId={this.state.userId}
              userLocation={this.state.userLocation}
              updateUserLocation={this.setUserLocation}
              centerPoint={{
                latitude: this.state.userLocation.latitude,
                longitude: this.state.userLocation.longitude
              }}
              setNotTesting={this.setNotTesting}
              />
            </View>
            :
          <View style={Base.base}>
              <AuthMenu
                setUserId={this.setUserId}
                isLoading={this.state.isLoading}
                setIsLoggedIn={this.setIsLoggedIn}
                />
              <FlashMessage
                position="top"
                duration={4000}
                style={FlashStyle.base}
                titleStyle={FlashStyle.title}
                textStyle={FlashStyle.text}
              />
          </View>
        }
      </SafeAreaView>
    );
  }
}

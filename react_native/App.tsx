import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/TestMap';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base } from './styles/index';

import Auth from './interfaces/auth';

import Map from './components/Map';
import AuthMenu from './components/login/AuthMenu';


export default class App extends Component {

  // -- In class component we keep all states in one object...
  state: {
    isLoggedIn: Boolean
  }

  // -- ... and initialize them in in the constructor
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isLoggedIn: false,  // <-- todo: check if valid token exists
    };
  }

  setIsLoggedIn = (value: Boolean) => {
    this.setState({
      isLoggedIn: value
    });
  }

  render() {

    return (

      <SafeAreaView style={Base.base}>
        {/* <TestMap /> */}
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        <AuthMenu
          setIsLoggedIn={this.setIsLoggedIn}
        />
        {/* <Map /> */}
      </SafeAreaView>
    );
  }
}

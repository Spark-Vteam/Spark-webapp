import React, { Component } from 'react';
// import { Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import LoginTest from './components/experiment/LoginTest';
// import Test from './components/experiment/Test';
// import TestMap from './components/experiment/TestMap';
// import ClusterMap from './components/experiment/ClusterMap';

import { Base } from './styles/index';
import Map from './components/Map';


export default class App extends Component {

  // FOR TESTING
  // =========================

  // state: {
  //   name: string,
  //   name2: string,
  //   textObj: any
  // }

  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     name: "Erik",
  //     name2: "Sanji",
  //     textObj: null
  //   };
  // }

  // setName = (newName: string) => {
  //   this.setState({
  //     name: newName
  //   })
  // }

  // setTextObj = (newTextObj: any) => {
  //   this.setState({
  //     textObj: newTextObj
  //   })
  // }





  render() {


    return (
      <SafeAreaView style={Base.base}>
        {/* <TestMap /> */}
        {/* <ClusterMap /> */}
        {/* <Test /> */}
        <LoginTest  />
        {/* <Map /> */}
      </SafeAreaView>


    // FOR TESTING
    //   <SafeAreaView style={Base.base}>
    //     <Test setName={this.setName} setTextobj={this.setTextObj} />
    //   <Text>{this.state.name}</Text>
    //     <Text>{this.state.name2}</Text>
    //     <View>{this.state.textObj}</View>
    // </SafeAreaView>
    );
  }
}




// state: {
//   name: string,
//     name2: string
// }

// constructor(props: any) {
//   super(props);
//   this.state = {
//     name: "Erik",
//     name2: "Sanji"
//   };
// }

// setName = (newName: string) => {
//   this.setState({
//     name: newName
//   })
// }


// render() {
//   console.log(typeof (this.setName));
//   return (
//     <SafeAreaView style={Base.base}>
//       <Test setName={this.setName} />
//       <Text>{this.state.name}</Text>
//       <Text>{this.state.name2}</Text>
//     </SafeAreaView>
//   );
// }

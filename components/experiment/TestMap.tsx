// import React, { Component } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
// import { useState, useEffect, useRef } from 'react';
// import { Base, Typography, Images } from '../../styles/index';
// import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';

// import Bike from '../../interfaces/bike';
// import mapsModel from '../../models/mapModel';


// export default class Map extends Component {


//     render() {

//         return (
//             <View style={styles.mapContainer}>
//                 <MapView
//                     loadingEnabled={true}
//                     loadingIndicatorColor='#63AF69'
//                     style={styles.map}
//                     // initialRegion={initRegion}
//                     onPress={() => {
//                         console.log('touched map')
//                     }}
//                 >
//                     <Marker
//                         coordinate={{
//                         latitude: 55.7058,
//                         longitude: 13.1932
//                         }}
//                         onPress={() => {
//                             console.log('pressed marker');
//                         }}
//                     />
//                 </MapView>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     mapContainer: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });


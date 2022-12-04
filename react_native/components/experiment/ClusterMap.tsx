// import React from "react";
// import { StyleSheet, View } from "react-native";
// import MapView from "react-native-map-clustering";
// import { Marker } from "react-native-maps";

// const initialRegion = {
//     latitude: 37.72825,
//     longitude: -122.4324,
//     latitudeDelta: 0.25,
//     longitudeDelta: 0.15
// };

// function renderRandomMarkers(n) {
//     const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
//     return new Array(n).fill().map((x, i) => (
//         <Marker
//             key={i}
//             coordinate={{
//                 latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
//                 longitude: longitude + (Math.random() - 0.5) * longitudeDelta
//             }}
//         />
//     ));
// }

// export default function ClusterMap() {
//     return (
//         <View style={styles.container}>
//             <MapView style={styles.map}
//                 initialRegion={initialRegion}
//                 maxZoom={10}
//                 extent={512}
//                 // Parameters below can be used for clustered MapView
//                 // from react-native-map-clustering
//                 // ---------------------
//                 // tracksViewChanges={false}
//                 // maxZoom={20}
//                 // spiralEnabled={false}
//                 // clusteringEnabled={false}
//             >
//                 {renderRandomMarkers(1500)}
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     map: {
//         width: "100%",
//         height: "100%"
//     }
// });

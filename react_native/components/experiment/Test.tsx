import { Text, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { Component } from 'react';
// import { useState } from 'react';
// import { Base, Typography } from '../../styles/index';
// import { IP } from '@env';
// import mapsModel from '../../models/mapModel';

//Testing setting state in parent
export default class Test extends React.Component<{ setName: Function, setTextobj: Function }> {


    // HERE:
    componentDidMount() {
        this.props.setName("Alexia")
        this.props.setTextobj(<Text>PLEASE WORK</Text>)
    }

    render() {
        return <Text>{ "Changed state in parent!" }</Text>
    }
}


// Testing props
// export default class Test extends React.Component<{ animal: String }> {
//     render() {
//         return <Text>{this.props.animal}</Text>
//     }
// }

// Testing componentDidMount
// export default class Test extends React.Component {

//     state: {
//         bikes: string
//     }

//     constructor(props: any) {
//         super(props);
//         this.state = {
//             bikes: "halloj"
//         };
//     }

//     async componentDidMount() {
//         console.log('componentDidMount() lifecycle');

//         // Trigger update
//         this.setState({ bikes: await mapsModel.getBikes() });
//     }

//     render() {
//         console.log('Render lifecycle')
//         return <Text>{this.state.bikes}</Text>
//     }
// }


// Testing fetching
// export default class Test extends Component {

//     state: {
//         data: string,
//     }

//     constructor(props: any) {
//         super(props);
//         this.state = {
//             data: "Data not fetched yet"
//         };
//     }

//     fetchData = async () => {
//         try {
//             const response = await fetch(`http://${IP}:4000/bike`);
//             const result = await response.json();
//             const bikes = result[0];
//             // console.log(bikes);
//             let list = "";

//             for (let i = 0; i < 10; i++) {
//                 list += `
// bike ${i + 1}:
//     position: ${bikes[i].Position}
//     battery: ${bikes[i].Battery}
//     status: ${bikes[i].Status}
//     speed: ${bikes[i].Speed}
//           `
//             }

//             this.setState({ data: list });

//         } catch (e) {
//             // console.log(e);
//             return false;
//         }
//     };

//     render() {

//         return (
//             <View style={Base.base}>
//                 <Button
//                     color='#4F4C4A'
//                     onPress={this.fetchData}
//                     title="Fetch dataTest"
//                 />
//                 <Text>IP is {IP}</Text>
//                 <Text>First 10 bikes in array:</Text>
//                 <Text>{this.state.data}</Text>
//             </View>
//         );
//     }
// }

/**
 * Samsung Smart TV controller example. Creates a few buttons that can control 
 * some aspects of the TV. Many more possible, check the NodeJS library linke below.
 *
 *  samsung-tv-remote NodeJS library: https://www.npmjs.com/package/nodejs-mobile-react-native
 * 
 * In order to use this library in React-Native I used a library for deploying NodeJS-scripts
 * a separate thread then the React-Native project. Link below.
 *
 *  nodejs-mobile-react-native library: https://www.npmjs.com/package/nodejs-mobile-react-native
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Imports nodejs option via RN-bridge
import nodejs from 'nodejs-mobile-react-native';

type Props = {};
export default class App extends Component<Props> {


  // Connect via a RN-tunnel to node-project that controls samsung smart tv.
  componentWillMount()
  {
    nodejs.start("samsung-control.js");
  }


  render() {

    nodejs.channel.addListener(
      "message", (msg) => {
        console.log("From node: " + msg);
      }, this
    );

    return (
      <View style={styles.container}>
        <Button title="MUTE" onPress={() => nodejs.channel.send('mute')} />
        <Button title="TURN OFF/ON" onPress={() => nodejs.channel.send('power')} />
        <Button title="UP" onPress={() => nodejs.channel.send('up')} />
        <Button title="DOWN" onPress={() => nodejs.channel.send('down')} />
        <Button title="MENU" onPress={() => nodejs.channel.send('menu')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

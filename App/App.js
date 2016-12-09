// require libs
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Toolbar from './Toolbar';
// import Drawer from './Drawer';

export default class App extends Component {
  render() {
    return (
      <View>
        <Toolbar />
        <View style={styles.linebreak}></View>
        {/*<Drawer />*/}
        <Text>This is the default page</Text>
        <Text>Here's how to use the app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linebreak: {
    width: Dimensions.get('window').width,
    height: 1,
    backgroundColor: 'red',
  },
});
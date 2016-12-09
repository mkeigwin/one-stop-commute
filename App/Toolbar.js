import React, { Component } from 'react';
import { View, Text, StyleSheet, ToolbarAndroid } from 'react-native';

const hamburgericon = require('../assets/hamburgericon-24dp.png');

export default class Toolbar extends Component {
  state = {
    drawIsOpen: false,
  };

  onActionSelected(position) {
    if (position === 0) { // index of 'hamburger'
      // openDrawer();
    }
  } 

  // hamburgericon() {
  //   return (
  //     <View>
  //       <View style={styles.hamburger}></View>
  //       <View style={styles.hamburger}></View>
  //       <View style={styles.hamburger}></View>
  //     </View>
  //   )
  // }

  render() {
    // const toolbarActions = [{
    //   title: 'hamburger',
    //   show: 'always',
    //   icon: hamburgericon,
    // }];

    const toolbarActions = [
      {title: 'Settings'},
      {title: 'NavigationDrawer', icon: hamburgericon, show: 'always'}
    ];

    return (
      <ToolbarAndroid
        style={styles.toolbar}
        actions={toolbarActions}
        onActionSelected={this.onActionSelected}
      />
    );
  }
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'lightblue',
    height: 50,
  },
  hamburger: {
    height: 10,
    width: 10,
    backgroundColor: 'black',
  },
  line: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    margin: 3,
  },
});
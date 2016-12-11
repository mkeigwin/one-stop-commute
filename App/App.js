// require libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  DrawerLayoutAndroid
} from 'react-native';


export default class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerLockMode='unlocked'
        style={{flex: 1, elevation: 16}}

        renderNavigationView={() => {
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}></Text>
          </View>
        }}
      >
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>world</Text>
      </DrawerLayoutAndroid>
    );
  }
} // class



/*
onDrawerSlide={}
onDrawerOpen={}
onDrawerClose={}
onDrawerStateChanged={}
*/
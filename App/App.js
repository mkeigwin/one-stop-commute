// require libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  DrawerLayoutAndroid
} from 'react-native';
import OpenApp from './OpenApp';


export default class App extends Component {
  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: 'orange'}}>
        <OpenApp url={'geo:40.7398476,-73.99020680000001'} title='General Assembly NYC Location' style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I'm in the drawer</OpenApp>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerLockMode='unlocked'
        style={{flex: 1, elevation: 16, backgroundColor: 'purple'}}

        renderNavigationView={() => navigationView}
      >
        <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>hello</Text>
        <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>world</Text>
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
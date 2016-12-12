// require libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  DrawerLayoutAndroid,
  TouchableOpacity
} from 'react-native';
import OpenApp from './OpenApp';


export default class App extends Component {
  onDrawerOpen() {

  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: 'orange'}}>
        <OpenApp url={'geo:40.7398476,-73.99020680000001'} title='General Assembly NYC Location' style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I'm in the drawer</OpenApp>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { return this.drawer = drawer  }}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left} // slide from left
        drawerLockMode='unlocked'
        style={{flex: 1, elevation: 16, backgroundColor: 'purple'}}
        renderNavigationView={() => navigationView}
        onDrawerOpen={this.onDrawerOpen}
      >
        {/* text outside of drawer */}
        <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>hello</Text>
        <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>world</Text>
        <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
          <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>Test Button</Text>
        </TouchableOpacity>
      </DrawerLayoutAndroid>
    );
  }
} // class



/*
onDrawerSlide={}
onDrawerOpen={}
onDrawerClose={}
onDrawerStateChanged={}
drawerLockMode={}
keyboardDismissMode='on-drag' // dismiss keyboard when dragging


onPress={this.toggleDrawer()}
*/
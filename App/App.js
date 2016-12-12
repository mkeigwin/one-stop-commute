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
import News from './News';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
    };
  }

  componentWillMount() {
    this.fetchNewsData();
  }

  fetchNewsData() {
    fetch('https://newsapi.org/v1/articles?source=time&sortBy=latest&apiKey=4fec1e9b10ef424590660a25f1ab9b23')
    .then(r => r.json())
    .then(data => {
      this.setState({
        articles: data.articles,
      })
    })
    .catch(err => console.log('fetch news error', err));

  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: 'orange'}}>
        <OpenApp url={'geo:40.7398476,-73.99020680000001'} title='General Assembly NYC Location' style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I'm in the drawer</OpenApp>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={(drawer) => {this.drawer = drawer}}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left} // slide from left
        drawerLockMode='unlocked'
        style={{flex: 1, elevation: 16, backgroundColor: '#F5F5F5'}}
        renderNavigationView={() => navigationView}
        onDrawerOpen={this.onDrawerOpen}
      >
        {/* text outside of drawer */}
        <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
          <Text style={{margin: 10, fontSize: 25, textAlign: 'right'}}>Test Button</Text>
        </TouchableOpacity>
      
        <News articles={this.state.articles}/>
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
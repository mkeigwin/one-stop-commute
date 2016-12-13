// require libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  DrawerLayoutAndroid,
  TouchableOpacity,
  ToolbarAndroid,
  Dimensions
} from 'react-native';
import OpenApp from './OpenApp';
import News from './News';
const hamburgerIcon = 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png';


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
    console.log('fetchNewsData')
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
      <View style={styles.navView}>
        <OpenApp url={'geo:40.7398476,-73.99020680000001'} title='General Assembly NYC Location' style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I'm in the drawer</OpenApp>
        <OpenApp url={'fb://notifications'} title='FaceBook'/>
        <OpenApp url={'twitter://user?screen_name=username'} title='Twitter'/>
        <OpenApp url={'instagram://user?username={USERNAME}'} title='Instagram'/>
        <OpenApp url={'linkedin://linkedin.com'} title='LinkedIn'/>
        <Text>Chat Zone</Text>
      </View>
    );


    return (
      <DrawerLayoutAndroid
        ref={(drawer) => {this.drawer = drawer}}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left} // slide from left
        drawerLockMode='unlocked'
        style={styles.drawerLayout}
        renderNavigationView={() => navigationView}
        onDrawerOpen={this.onDrawerOpen}
      >

        {/* text outside of drawer */}
        <ToolbarAndroid
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}
          title="One Stop Commute" 
          navIcon={{uri: hamburgerIcon, height: 31, width: 31}}
        />
        <View style={styles.linebreak}></View>
        <News articles={this.state.articles} refreshNews={this.fetchNewsData.bind(this)}/>
      </DrawerLayoutAndroid>
    );
  }
} // class


const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#03A9F4',
    height: 56,
    padding: 5,
  },
  drawerLayout: {
    flex: 1, 
    elevation: 16, 
    backgroundColor: '#F5F5F5',
  },
  navView: {
    flex: 1, 
    // backgroundColor: '#F5F5F5',
    backgroundColor: '#DCEDC8',
    padding: 10,
  },
  linebreak: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F44336',
    height: 1,
    padding: 2,
    opacity: .5,
  },
});
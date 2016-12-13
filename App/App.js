// require libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  DrawerLayoutAndroid,
  TouchableOpacity,
  TouchableHighlight,
  ToolbarAndroid,
  Dimensions,
  Navigator,
  Image
} from 'react-native';
import { Button } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/FontAwesome';
import OpenApp from './OpenApp';
import News from './News';
// const logo-fb       = '../assets/logo-fb.png';
// const logo-ga       = '../assets/logo-ga.png';
// const logo-li       = '../assets/logo-li.png';
// const logo-tw       = '../assets/logo-tw.png';
// const logo-insta    = '../assets/logo-insta.png';
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
    // <Text>Lorem <Icon name="twitter" color="#4F8EF7" /> Ipsum</Text>

    // Home
    const navigationView = (
      <View style={styles.navView}>
        <View style={styles.navHeader}></View>
        <OpenApp style={styles.button} url={'geo:40.7398476,-73.99020680000001'} title='General Assembly'>I'm in the drawer</OpenApp>
        <OpenApp style={styles.button} url={'fb://notifications'} title='FaceBook'/>
        <OpenApp style={styles.button} url={'twitter://user?screen_name=username'} title='Twitter'/>
        <OpenApp style={styles.button} url={'instagram://user?username={USERNAME}'} title='Instagram'/>
        <OpenApp style={styles.button} url={'linkedin://linkedin.com'} title='LinkedIn'/>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image source={{uri: 'https://theproductguy.files.wordpress.com/2011/03/ga_logo_1797.png'}} style={{width: 50, height: 50}}/>
          <Text>Inline text with icon!</Text>
        </View>
      </View>
    );

    const { navState } = this.state;

    return (

        <DrawerLayoutAndroid
          ref={(drawer) => {this.drawer = drawer}}
          drawerWidth={330}
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
    // padding: 10,
  },
  linebreak: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F44336',
    height: 1,
    padding: 2,
    opacity: .5,
  },
  navHeader: {
    // margin: -10,
    height: 200,
    width: Dimensions.get('window').width,
    backgroundColor: 'orange',
  },
  button: {
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: 'white',
  },
  iconButtonText: {
    textAlign: 'center',
    color: 'white',
    marginLeft: 20,
  },
});

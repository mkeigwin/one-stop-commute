// require libs
import React, { Component } from 'react';
import { 
  AsyncStorage, 
  Image,
  StyleSheet, 
  Dimensions,
  DrawerLayoutAndroid,
  FadeAndroid,
  Navigator,
  ScrollView,
  Text, 
  ToastAndroid,
  ToolbarAndroid,
  TouchableOpacity,
  View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OpenApp from './OpenApp';
import News from './News';
const logoga        = 'https://theproductguy.files.wordpress.com/2011/03/ga_logo_1797.png';
const logofb        = 'http://storage.googleapis.com/wzukusers/user-20049824/images/56c636270f074CpRLUkT/facebook-logo-png-transparent-background-i12_d200.png';
const logotw        = 'http://cloudjockeys.townsquareinteractive.com/files/2015/11/Twitter-bird.png';
const logoig        = 'http://ri2.sierraclub.org/sites/ri.sierraclub.org/files/instagram%20logo%20transparent.png';
const logoli        = 'http://www.clipartkid.com/images/8/clip-art-is-cookie-cutter-NcXVLO-clipart.png';
const logonw        = 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-512.png';
const hamburgerIcon = 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png';
const snow          = 'https://cdn4.iconfinder.com/data/icons/outline-2/64/weather-cloud-more-snow-512.png';
const rain          = 'https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png';
const clear         = 'https://cdn4.iconfinder.com/data/icons/wthr-color/32/sunny-512.png';
const cloudy        = 'http://megaicons.net/static/img/icons_sizes/8/178/512/weather-partly-cloudy-day-icon.png';
const STORAGE_NAME  = '@SavedArticles';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [], // array to hold time articles after fetch
      savedArticles: [], // array to hold saved articles
    };
  }

  // Access OpenWeatherMap API, set location, temperature, and description as App's state
  getWeather() {
    const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=New+York&units=imperial&APPID=daae38e3c7816408e5288de01f3a9bfb';
    fetch(weatherURL)
    .then(r => r.json())
    .then(weather => {
      // access openweathermap api of new york for location, temperature, and weather description
      this.setState({location: weather.name});
      this.setState({temp: weather.main.temp});
      this.setState({main: weather.weather[0].main.toLowerCase()});
    })
    .catch(err => console.log(err));
  }

  // determines the weather condition and return relevant weather icon
  getWeatherIcon() {
    const weatherState = this.state.main;
    switch(weatherState) {
      case 'snow':
        return ({uri: snow});
      case 'rain':
        return ({uri: rain});
      case 'cloudy':
        return ({uri: cloudy});
      case 'clear':
        return ({uri: clear});
    }
  }

  // using es 2017 asynchronous call
  // access AsyncStorage to save articles 
  async fetchSavedArticles() {
    try {
      const savedArticles = await AsyncStorage.getItem(STORAGE_NAME);
      // if there are saved articles 
      if (savedArticles !== null) {
        console.log('***** saved articles', JSON.parse(savedArticles));
        this.setState({savedArticles});
      } else {
        console.log('initialized with no saved articles');
      } 
    } catch (error) {
      console.log('AsyncStorage error', error.message);
    }
  };

  // fetch respective data
  componentDidMount() {
    this.fetchNewsData();
    this.fetchSavedArticles();
    this.getWeather();
  }

  // AsyncStorage only allows only type string to be saved
  // store article 
  saveArticle(article) {
    // console.log('**** article info', article);
    AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(article));
  }

  // access newsapi and fetch 10 latest articles by 'Time' and add to state
  fetchNewsData() {
    const ars = 'ars-technica';
    const time = 'time';
    fetch(`https://newsapi.org/v1/articles?source=${ars}&sortBy=latest&apiKey=4fec1e9b10ef424590660a25f1ab9b23`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        articles: data.articles,
      })
    })
    .catch(err => console.log('fetch news error', err));
  }

  render() {
    return (
      // for navigation through screens
      <Navigator
        ref='navigator'
        initialRoute={{id: 'drawer'}}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom} // screen transition using navigator
        renderScene={(route, navigator) => {

          // content rows for drawer
          const navigationView = (
            <ScrollView style={styles.navView}>
              <View style={styles.navHeader}> 
                <Text style={styles.weatherLocation}>{this.state.location}</Text>
                <Image source={{uri: snow}} style={styles.weatherIcon}/>
                <Text style={styles.weatherTemp}>{this.state.temp} ℉</Text>
              </View>
              <View style={styles.linebreak}/>
              <OpenApp url={'geo:40.7398476,-73.99020680000001'} title='General Assembly' imgURL={logoga}/>
              <OpenApp url={'fb://notifications'} title='FaceBook' imgURL={logofb}/>
              <OpenApp url={'twitter://user?screen_name=xsangmin'} title='Twitter' imgURL={logotw}/>
              <OpenApp url={'instagram://user?username={USERNAME}'} title='Instagram' imgURL={logoig}/>
              <OpenApp url={'linkedin://linkedin.com'} title='LinkedIn' imgURL={logoli}/>
              
              <TouchableOpacity 
                style={styles.navViewRow} 
                onPress={() => {
                  ToastAndroid.show(`Showing Favorite Articles`, ToastAndroid.SHORT);
                }}>
                <Image source={{uri: logonw}} style={styles.navIcon}/>
                <Text style={styles.navText}>Favorites</Text>
              </TouchableOpacity>
            </ScrollView>
          );

          return (
            // create drawer with weather and social media rows
            // create toolbar with hamburger icon, opening drawer when icon is pressed
            // render all 'time' 10 articles
            <DrawerLayoutAndroid
              ref={(drawer) => {this.drawer = drawer}}
              drawerWidth={290}
              drawerPosition={DrawerLayoutAndroid.positions.Left} // slide from left
              drawerLockMode='unlocked'
              style={styles.drawerLayout}
              renderNavigationView={() => navigationView}
              onDrawerOpen={this.onDrawerOpen}
            >
              <ToolbarAndroid
                onIconClicked={() => this.drawer.openDrawer()}
                style={styles.toolbar}
                titleColor='#070600'
                title="1-Stop Commute" 
                navIcon={{uri: hamburgerIcon, height: 26, width: 26}}
              />
              <View style={styles.linebreak}>
              </View>
              <News 
                test='fetch news'
                articles={this.state.articles} 
                refreshNews={this.fetchNewsData.bind(this)}
                saveArticle={this.saveArticle.bind(this)}
              />
            </DrawerLayoutAndroid>
          );
        }}
      />
    ); // navigator
  }
} // class


const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#23B5D3',
    height: 56,
    padding: 5,
  },
  drawerLayout: {
    flex: 1, 
    elevation: 16, 
    backgroundColor: '#DCDCDC',
  },
  navView: {
    flex: 1, 
    backgroundColor: '#F7F7FF',
  },
  linebreak: {
    width: Dimensions.get('window').width,
    backgroundColor: '#EA526F',
    height: 1,
    padding: 2,
    opacity: .5,
  },
  navHeader: {
    height: 200,
    width: Dimensions.get('window').width,
    backgroundColor: '#23B5D3',
  },
  navViewRow: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  navText: {
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    fontSize: 13,
    fontWeight: 'bold',

  },
  navIcon: {
    width: 28, 
    height: 28,
    margin: 15,
    marginLeft: 25,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  weatherIcon: {
    height: 80, 
    width: 140, 
    resizeMode: 'stretch',
    marginLeft: 70,
  },
  weatherLocation: {
    fontSize: 14,
    margin: 10,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  weatherTemp: {
    fontSize: 25,
    marginTop: 25,
    marginLeft: 175,
    marginBottom: -20,
  }
});

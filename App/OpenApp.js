import React, { Component } from 'react';
import { 
  Image,
  Linking, 
  StyleSheet, 
  Text, 
  ToastAndroid, 
  TouchableOpacity, 
  View,
} from 'react-native';
// import { Button } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class OpenApp extends Component {
  handleClick = () => {
    Linking.canOpenURL(this.props.url)
    .then(supported => {
      (supported) ? Linking.openURL(this.props.url) : ToastAndroid.show(`${this.props.title} is not installed`, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.navViewRow} onPress={this.handleClick}>
          <Image source={{uri: this.props.imgURL}} style={styles.navIcon}/>
          <Text style={styles.navText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
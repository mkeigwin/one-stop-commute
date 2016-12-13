import React, { Component } from 'react';
import { 
  Linking, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Image,
  ToastAndroid 
} from 'react-native';
import { Button } from 'react-native-material-design';
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
        <Button style={styles.button} text={this.props.title} onPress={this.handleClick}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'flex-start',
  },
  logo: {
    width: 20,
    height: 20,
    margin: 5,
  },
});
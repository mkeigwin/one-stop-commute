import React, { Component } from 'react';
import { 
  Linking, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  ToastAndroid 
} from 'react-native';
import { Button } from 'react-native-material-design';

export default class OpenApp extends Component {
  handleClick = () => {
    Linking.canOpenURL(this.props.url)
    .then(supported => {
      (supported) ? Linking.openURL(this.props.url) : ToastAndroid.show(`${this.props.title} is not installed`, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <Button style={styles.button} text={this.props.title} onPress={this.handleClick}></Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingBottom: 10,
  },
});
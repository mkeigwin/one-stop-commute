import React, { Component } from 'react';
import { 
  Linking, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  ToastAndroid 
} from 'react-native';

export default class OpenApp extends Component {
  handleClick = () => {
    Linking.canOpenURL(this.props.url)
    .then(supported => {
      (supported) ? Linking.openURL(this.props.url) : ToastAndroid.show(`${this.props.title} is not installed`, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View style={styles.button}>
          <Text>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#03A9F4',
    marginBottom: 3,
  },
});
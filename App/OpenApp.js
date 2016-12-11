import React, { Component } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class OpenApp extends Component {
  handleClick = () => {
    Linking.canOpenURL(this.props.url)
    .then(supported => {
      (supported) ? Linking.openURL(this.props.url) : console.log('Cannot open URI: ', this.props.url);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View style={styles.button}>
          <Text>Open {this.props.url}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});
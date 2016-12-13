import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  NavigationExperimental
} from 'react-native';
const { 
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
  Header: NavigationHeader,
} = NavigationExperimental;

export default class Header extends Component {
  const back = () => {
    this.props.navigate('pop');
  }

  const renderTitleComponent = (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }


  render() {
    return (
      <NavigationHeader 
        {...this.props}
        renderTitleComponent={this.renderTitleComponent}
        onNavigateBack={this.back}
      />
    );
  }
}
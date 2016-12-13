import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  RefreshControl
} from 'react-native';
import {
  Card,
  Button
} from 'react-native-material-design';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }

  // open link on the phone's browser
  handClick(url) {
    Linking.canOpenURL(url)
    .then(supported => {
      (supported) ? Linking.openURL(url) : console.log('Something went wrong :(')
    })
  }

  renderArticles() {
    const articles = this.props.articles;
    return this.props.articles.map((article, i) => {
      return (
        <View key={i}>
          <Card style={styles.cardBody}>
            <Card.Media
              image={<Image source={{uri: article.urlToImage}} overlay/>}
            />
            <Card.Body>
              <Text style={styles.articleTitle}>{article.title}</Text>
            </Card.Body>
            <Card.Actions>
              <Button text='Read full content' onPress={() => this.handClick(article.url)}/>
            </Card.Actions>
          </Card>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        refreshControl={
          <RefreshControl 
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              console.log('**** onrefresh');
              this.props.refreshNews();
            }}
        />}
      >
        {this.renderArticles()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleView: {
    backgroundColor: 'orange',
    padding: 20,
  },
  articleTitle: {
    fontWeight: 'bold',
  },
  cardBody: {
    // backgroundColor: '#B3E5FC',
    backgroundColor: 'lightgray',
  },
});


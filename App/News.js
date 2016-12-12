import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

export default class News extends Component {
  renderArticles() {
    const articles = this.props.articles;
    return this.props.articles.map((article, i) => {
    // return articles.map((article, i) => {
      return (
        <View key={i}>
          <Image source={{uri: article.urlToImage}} style={styles.articleImg}/>
          <Text>{article.title}</Text>
          <Text>{article.description}</Text>
          <Text>{article.author}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView>
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
    fontSize: 25,
    color: 'blue',
  },
  articleText: {
    color: 'red',
  },
  articleImg: {
    width: 50,
    height: 50,
    margin: 5,
  },
});
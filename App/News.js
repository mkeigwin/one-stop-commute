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
  handClick(url) {
    console.log('********** url', url)
  }

  renderArticles() {
    const articles = this.props.articles;
    return this.props.articles.map((article, i) => {
    // return articles.map((article, i) => {
      return (
        <TouchableOpacity key={i} style={styles.articleView} onPress={() => this.handClick(article.url)}>
          <Image source={{uri: article.urlToImage}} style={styles.articleImg}/>
          <Text>{article.title}</Text>
          <Text>{article.description}</Text>
          <Text>{article.author}</Text>
        </TouchableOpacity>
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
    margin: 5,
  },
  articleTitle: {
    fontSize: 25,
    color: 'blue',
    width: 50,
    flex: 1,
  },
  articleText: {
    color: 'red',
    width: 50,
    flex: 1,
  },
  articleImg: {
    width: 100,
    height: 100,
    margin: 5,
    flex: 2,
  },
});
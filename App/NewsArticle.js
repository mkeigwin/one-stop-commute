import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';

const NewsArticle = (props) => {
  test = () => {
    console.log('************ in NewsArticle.js ', props.article)
  };

  return (
    <View>
      {test()}
      <Image source={props.article.urlToImage} />
      <Text>{props.article.title}</Text>
      <Text>{props.article.author}</Text>
      <Text>{props.article.description}</Text>
    </View>
  );
}

export default NewsArticle;
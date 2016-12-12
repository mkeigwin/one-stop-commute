import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import {
  Card,
  Button
} from 'react-native-material-design';

export default class News extends Component {
  // open link on the phone's browser
  handClick(url) {
    // console.log('********** url', url)
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
          <Card>
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
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});

/*
<TouchableOpacity key={i} style={styles.articleView} onPress={() => this.handClick(article.url)}>
  <Image source={{uri: article.urlToImage}} style={styles.articleImg}/>
  <Text>{article.title}</Text>
  <Text>{article.description}</Text>
  <Text>{article.author}</Text>
</TouchableOpacity>
*/
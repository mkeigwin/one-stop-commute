import React, { Component } from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-material-design';
const favIcon = 'https://cdn3.iconfinder.com/data/icons/fillies-medium/64/star-512.png';


export default class News extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }

  // open appropriate app by the url props
  handClick(url) {
    Linking.canOpenURL(url)
    .then(supported => {
      (supported) ? Linking.openURL(url) : ToastAndroid.show(`Something went wrong :(`, ToastAndroid.SHORT);
    })
  }

  // render the latest articles using card design with unique key
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
              <Button primary='#070600' text='Read full content' onPress={() => this.handClick(article.url)}/>
              <TouchableOpacity 
                style={styles.floatingBtn}
                onPress={(e) => {
                  this.props.saveArticle(article);
                  ToastAndroid.show(`Saved`, ToastAndroid.SHORT);
                  }} >
                
                <Image source={{uri: favIcon}} style={styles.floatingBtnIcon}/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>
      );
    });
  }

  render() {
    // create scrollable container for articles
    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        refreshControl={
          <RefreshControl 
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              console.log('**** onrefresh');
              this.props.refreshNanimatingews();
            }}
        />}
      >
        {this.renderArticles()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleTitle: {
    fontWeight: 'bold',
    color: '#070600',
  },
  cardBody: {
    backgroundColor: '#f8f8f8',
    margin: 12,
  },
  floatingBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#23B5D3',
    borderRadius: 100,
    
    position: 'relative',
    bottom: 8,
    left: 162,
    // left: 110,
  },
  floatingBtnIcon: {
    width: 20,
    height: 20,
    margin: 15,
    opacity: 0.9,
  },
});


import React from 'react';
import {
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Icon,
  Right,
} from 'native-base';

import {Image, StyleSheet, Dimensions, Alert} from 'react-native';
const {width} = Dimensions.get('window');
const Post = ({item}) => {
  return (
    <Card style={styles.post}>
      <CardItem>
        <Left>
          <Thumbnail small source={{uri: item.avatar}} />
          <Body>
            <Text>{item.userName}</Text>
            <Text note>{item.createdAt}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Image
          source={{uri: item.imageUrl}}
          style={{
            height: width - 38,
            width: null,
            flex: 1,
            resizeMode: 'cover',
            borderRadius: 30,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 25},
            shadowRadius: 15,
          }}
        />
      </CardItem>
      <CardItem>
        <Button transparent>
          <Icon name="heart" type="EvilIcons" />
          <Text>{item.liked.length - 1}</Text>
        </Button>

        <Button transparent>
          <Icon name="comment" type="EvilIcons" />
          <Text>{item.comments.length - 1}</Text>
        </Button>
      </CardItem>
    </Card>
  );
};
const styles = StyleSheet.create({
  post: {
    borderWidth: 0,
    elevation: 0,
    marginBottom: 20,
    shadowColor: '#555555',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 25},
    shadowRadius: 15,
  },
});
export default Post;

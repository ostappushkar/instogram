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
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setLike} from '../../redux/posts/actions';
import {Image, StyleSheet, Dimensions, Alert} from 'react-native';
import {IPost} from '../../interfaces/post';
import {IStoreState} from 'src/interfaces/store';
interface IPostProps {
  item: IPost;
  setLike: Function;
}
const {width} = Dimensions.get('window');
const Post = (props: IPostProps) => {
  const {item, setLike} = props;
  const handleLike = () => {
    setLike(item.id);
  };
  const liked = item.liked?.includes(auth().currentUser?.uid);
  return (
    <Card style={styles.post}>
      <CardItem>
        <Left>
          {item.avatar ? (
            <Thumbnail small source={{uri: item.avatar}} />
          ) : (
            <Icon
              style={{
                borderRadius: 18,
                height: 36,
                overflow: 'hidden',
                width: 36,
                borderWidth: 1,
                fontSize: 25,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#000',
                //padding: 15,
              }}
              name="person-sharp"
            />
          )}

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
        <Button onPress={handleLike} transparent>
          <Icon
            style={liked ? styles.liked : styles.icon}
            name={liked ? 'heart' : 'hearto'}
            type="AntDesign"
          />
          <Text style={{color: '#000', paddingLeft: 0}}>
            {item.liked.length - 1}
          </Text>
        </Button>

        <Button transparent>
          <Icon style={styles.icon} name="message1" type="AntDesign" />
          <Text style={{color: '#000', paddingLeft: 0}}>
            {item.comments.length - 1}
          </Text>
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
  icon: {
    color: '#000',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  liked: {
    color: '#ff0000',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
});
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
  };
};
const mapDispatch = {setLike};
export default connect(mapState, mapDispatch)(Post);

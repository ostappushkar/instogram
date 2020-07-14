import React, {useState} from 'react';
import {
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Icon,
  View,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setLike} from '../../redux/posts/actions';
import {StyleSheet, Dimensions, Easing} from 'react-native';
import {IPost} from '../../interfaces/post';
import {IStoreState} from 'src/interfaces/store';
import Comments from '../CommentsModal';
import ZoomImage from 'react-native-zoom-image';
interface IPostProps {
  item: IPost;
  setLike: Function;
}
const {width} = Dimensions.get('window');

const Post = (props: IPostProps) => {
  const {item, setLike} = props;
  const [open, setOpen] = useState(false);
  const handleLike = () => {
    setLike(item.id);
  };
  const handleModal = () => {
    item.comments.length ? setOpen(true) : null;
  };
  console.log(item);
  const liked = item.liked?.includes(auth().currentUser?.uid);
  return (
    <Card style={styles.post}>
      <CardItem>
        <Left>
          {item.avatar ? (
            <Thumbnail small source={{uri: item.avatar}} />
          ) : (
            <View
              style={{
                borderRadius: 18,
                height: 36,
                width: 36,
                borderWidth: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#000',
              }}>
              <Icon
                style={{
                  fontSize: 18,
                }}
                name="person-sharp"
              />
            </View>
          )}
          <Body>
            <Text>{item.userName}</Text>
            <Text note>{item.createdAt}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <ZoomImage
          source={{uri: item.imageUrl}}
          imgStyle={{
            height: width - 38,
            width: null,
            flex: 1,
            elevation: 25,
            resizeMode: 'cover',
            borderRadius: 30,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 25},
            shadowRadius: 15,
          }}
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
          duration={200}
          enableScaling={true}
          easingFunc={Easing.ease}
        />
      </CardItem>
      {item.description ? (
        <CardItem>
          <Text>{item.description}</Text>
        </CardItem>
      ) : null}
      <CardItem>
        <Button onPress={handleLike} transparent>
          <Icon
            style={liked ? styles.liked : styles.icon}
            name={liked ? 'heart' : 'hearto'}
            type="AntDesign"
          />
          <Text style={{color: '#000', paddingLeft: 0}}>
            {item.liked.length}
          </Text>
        </Button>

        <Button onPress={handleModal} transparent>
          <Icon style={styles.icon} name="message1" type="AntDesign" />
          <Text style={{color: '#000', paddingLeft: 0}}>
            {item.comments.length}
          </Text>
        </Button>
        <Comments item={item} open={open} setOpen={setOpen} />
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

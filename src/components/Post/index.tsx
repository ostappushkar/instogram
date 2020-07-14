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
  Item,
  Input,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setLike} from '../../redux/posts/actions';
import {StyleSheet, Dimensions, Easing} from 'react-native';
import {IPost} from '../../interfaces/post';
import {IStoreState} from 'src/interfaces/store';
import Comments from '../CommentsModal';
import ZoomImage from 'react-native-zoom-image';
import {Formik} from 'formik';
interface IPostProps {
  item: IPost;
  user: firebase.User;
  setLike: Function;
}
const {width} = Dimensions.get('window');

const Post = (props: IPostProps) => {
  const {item, setLike, user} = props;
  const [open, setOpen] = useState(false);
  const handleLike = () => {
    setLike(item.id);
  };
  const handleModal = () => {
    item.comments.length ? setOpen(true) : null;
  };
  const handleAddComment = () => {};
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
          <Icon style={styles.icon} name="message-square" type="Feather" />
          <Text style={{color: '#000', paddingLeft: 0}}>
            {item.comments.length}
          </Text>
        </Button>
        <Comments item={item} open={open} setOpen={setOpen} />
      </CardItem>
      <CardItem>
        <Formik initialValues={{comment: ''}} onSubmit={handleAddComment}>
          {({handleBlur, handleChange, values, submitForm}) => (
            <Item style={styles.commentInputItem} rounded>
              <Thumbnail small source={{uri: user.photoURL}} />
              <Input
                placeholderTextColor="gray"
                placeholder="Add a comment..."
                nativeID="email"
                onBlur={handleBlur('comment')}
                onChangeText={handleChange('comment')}
                value={values.comment}
              />
              <Button style={styles.sendCommentButton}>
                <Icon style={{color: '#000'}} type="Feather" name="send" />
              </Button>
            </Item>
          )}
        </Formik>
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
  commentInputItem: {
    paddingLeft: 5,
    borderColor: '#fa5a2e',
  },
  sendCommentButton: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 0,
    elevation: 0,
  },
});
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
  };
};
const mapDispatch = {setLike};
export default connect(mapState, mapDispatch)(Post);

import React, {useState} from 'react';
import {
  Button,
  Text,
  Card,
  Icon,
  Layout,
  Avatar,
  Divider,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {setLike, addComment, deletePost} from '../../redux/posts/actions';
import {StyleSheet, Dimensions, Easing, Alert} from 'react-native';
import {IPost} from '../../interfaces/post';
import {IStoreState} from 'src/interfaces/store';
import ZoomImage from 'react-native-zoom-image';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../theme-context';
interface IPostProps {
  item: IPost;
  user: firebase.User;
  setLike: Function;
  addComment: Function;
  deletePost: Function;
}
const {width} = Dimensions.get('window');

const Post = (props: IPostProps) => {
  const {item, setLike, user, deletePost} = props;
  const router = useNavigation();
  const themeContext = React.useContext(ThemeContext);
  const handleLike = () => {
    setLike(item.id);
  };
  const handleActions = () => {
    Alert.alert(
      'Delete Post?',
      'Current post will be deleted',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deletePost(item),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const liked = item.liked?.includes(user?.uid);
  const ActionsIcon = (props) => (
    <Icon
      fill={themeContext.color}
      style={{marginHorizontal: 0}}
      {...props}
      name="more-vertical-outline"
    />
  );

  const LikeIcon = (props) => (
    <Icon
      style={{marginHorizontal: 0}}
      fill={themeContext.color}
      {...props}
      name={liked ? 'heart' : 'heart-outline'}
    />
  );
  const CommentsIcon = (props) => (
    <Icon
      style={{marginHorizontal: 0}}
      fill={themeContext.color}
      {...props}
      name="message-square-outline"
    />
  );
  return (
    <Card style={styles.post}>
      <Layout style={styles.postHeader}>
        <Layout style={styles.headerInfo}>
          {item.avatar ? (
            <Avatar shape="round" source={{uri: item.avatar}} />
          ) : (
            <Layout
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
              <Icon style={{height: 18, width: 18}} fill="#000" name="person" />
            </Layout>
          )}
          <Layout style={styles.postAuthor}>
            <Text style={{fontWeight: 'bold'}}>{item.userName}</Text>
            <Text appearance="hint">{item.createdAt}</Text>
          </Layout>
        </Layout>

        <Layout style={styles.postActions}>
          <Button
            children={() => (
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.liked.length}
              </Text>
            )}
            size="large"
            style={styles.actionButton}
            appearance="ghost"
            onPress={handleLike}
            accessoryLeft={LikeIcon}
          />
          <Button
            children={() => (
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.comments.length}
              </Text>
            )}
            size="large"
            style={styles.actionButton}
            appearance="ghost"
            onPress={() => {
              router.navigate('Post', {item: item.id});
            }}
            accessoryLeft={CommentsIcon}
          />
          {user?.uid === item.authorId ? (
            <Button
              size="medium"
              appearance="ghost"
              onPress={handleActions}
              accessoryLeft={ActionsIcon}
            />
          ) : null}
        </Layout>
      </Layout>
      <Divider />
      <ZoomImage
        source={{uri: item.imageUrl}}
        imgStyle={{
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
          marginTop: 15,
          marginBottom: 15,
        }}
        duration={200}
        enableScaling={true}
        easingFunc={Easing.ease}
      />
      <Divider />
      {item.description ? (
        <>
          <Text style={{marginVertical: 10}}>{item.description}</Text>
        </>
      ) : null}
    </Card>
  );
};
const styles = StyleSheet.create({
  post: {
    borderWidth: 0,
    elevation: 1,
    marginBottom: 10,
    marginTop: 10,
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
  actionButton: {
    color: '#000',
    paddingHorizontal: 0,
  },
  actionIcon: {
    color: 'gray',
    paddingHorizontal: 0,
  },
  sendCommentButton: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 0,
    elevation: 0,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
  },
  postAuthor: {
    marginLeft: 15,
  },
  postActions: {
    flexDirection: 'row',
  },
});
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
  };
};
const mapDispatch = {setLike, addComment, deletePost};
export default connect(mapState, mapDispatch)(Post);

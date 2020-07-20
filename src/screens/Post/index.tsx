import React, {useState, useEffect} from 'react';
import {
  Layout,
  Text,
  Icon,
  Input,
  Divider,
  Button,
} from '@ui-kitten/components';
import {
  ImageBackground,
  Easing,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Comments from '../../components/CommentsModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import ZoomImage from 'react-native-zoom-image';
import {Formik} from 'formik';
import Comment from '../../components/Comment';
import {addComment, setLike, getCurrentPost} from '../../redux/posts/actions';
import {IComment} from 'src/interfaces/post';
import {IStoreState} from 'src/interfaces/store';
import {ThemeContext} from '../../../theme-context';
const {width} = Dimensions.get('window');
const PostScreen = ({
  route,
  user,
  addComment,
  setLike,
  item,
  getCurrentPost,
}) => {
  useEffect(() => {
    getCurrentPost(route.params.item);
  }, [getCurrentPost]);
  const [open, setOpen] = useState(false);
  const liked = item?.liked?.includes(user?.uid);
  const themeContext = React.useContext(ThemeContext);
  const handleAddComment = (values) => {
    values.comment
      ? addComment(item.id, values.comment, () => {
          console.log('Commented');
          values.comment = '';
        })
      : null;
  };
  const handleLike = () => {
    setLike(item.id);
  };
  const handleModal = () => {
    item.comments.length ? setOpen(true) : null;
  };
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
  const renderItem: ListRenderItem<IComment> = ({item}) => {
    return <Comment item={item} />;
  };
  if (!item) {
    return <ActivityIndicator style={{alignSelf: 'center'}} />;
  }
  return (
    <Layout style={{flex: 1}}>
      <KeyboardAwareScrollView contentContainerStyle={styles.postContainer}>
        <Layout>
          <ImageBackground
            blurRadius={15}
            style={styles.illustration}
            source={{uri: item.imageUrl}}
            resizeMethod="resize">
            <ZoomImage
              source={{uri: item?.imageUrl}}
              imgStyle={{
                height: width - 80,
                width: width - 80,
                flex: 1,
                resizeMode: 'cover',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowOffset: {width: 0, height: 25},
                shadowRadius: 15,
              }}
              style={{
                alignSelf: 'center',
                height: width - 80,
                width: width - 80,
                elevation: 20,
                resizeMode: 'contain',
                borderRadius: 30,
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowOffset: {width: 0, height: 25},
                shadowRadius: 15,
                marginTop: 20,
                marginBottom: 15,
              }}
              duration={200}
              enableScaling={true}
              easingFunc={Easing.ease}
            />
          </ImageBackground>
          <Layout style={{flexDirection: 'row'}}>
            <Button
              children={() => (
                <Text
                  style={{
                    color: themeContext.color,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {item?.liked?.length}
                </Text>
              )}
              size="large"
              appearance="ghost"
              onPress={handleLike}
              accessoryLeft={LikeIcon}
            />
            <Button
              children={() => (
                <Text
                  style={{
                    color: themeContext.color,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {item?.comments?.length}
                </Text>
              )}
              size="large"
              appearance="ghost"
              onPress={handleModal}
              accessoryLeft={CommentsIcon}
            />
          </Layout>
          {item.comments.length ? (
            <Button
              onPress={handleModal}
              style={styles.allCommentsButton}
              appearance="ghost">
              all comments...
            </Button>
          ) : (
            <Text style={{paddingLeft: 10}} appearance="hint">
              no comments
            </Text>
          )}
          <Layout>
            <FlatList
              extraData={item?.comments}
              ItemSeparatorComponent={Divider}
              style={{paddingHorizontal: 10}}
              data={item?.comments.slice(0, 2)}
              renderItem={renderItem}
            />
          </Layout>
        </Layout>
        <Formik initialValues={{comment: ''}} onSubmit={handleAddComment}>
          {({handleBlur, handleChange, values, submitForm}) => {
            const SendButton = (props) => (
              <TouchableOpacity onPress={submitForm}>
                <Icon {...props} name="arrowhead-right-outline" />
              </TouchableOpacity>
            );

            return (
              <>
                <Input
                  placeholderTextColor="gray"
                  placeholder="Add a comment..."
                  nativeID="comment"
                  style={{margin: 10}}
                  onBlur={handleBlur('comment')}
                  onChangeText={handleChange('comment')}
                  value={values.comment}
                  accessoryRight={SendButton}
                />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
      <Comments item={item} open={open} setOpen={setOpen} />
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
    item: state.posts.currentPost,
    loading: state.posts.loading,
  };
};
const mapDispatch = {
  addComment,
  setLike,
  getCurrentPost,
};
export default connect(mapState, mapDispatch)(PostScreen);
const styles = StyleSheet.create({
  illustration: {
    resizeMode: 'contain',
    width: width,
    height: width - 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
  allCommentsButton: {
    minHeight: 20,
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  postContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

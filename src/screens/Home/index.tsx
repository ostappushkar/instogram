import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {IStoreState} from '../../interfaces/store';
import {Layout, useTheme, Text, List} from '@ui-kitten/components';
import {logOut} from '../../redux/user/actions';
import {getPosts} from '../../redux/posts/actions';
import Post from '../../components/Post';
import {
  StatusBar,
  Image,
  Dimensions,
  RefreshControl,
  ScrollView,
  ListRenderItem,
  FlatList,
} from 'react-native';
import {IPost} from 'src/interfaces/post';
import {ThemeContext} from '../../../theme-context';
const {width} = Dimensions.get('window');
const Home = ({getPosts, posts, loading}) => {
  const themeContext = React.useContext(ThemeContext);
  const theme = useTheme();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const onRefresh = () => {
    getPosts();
  };
  const renderItem: ListRenderItem<IPost> = ({item}) => {
    return <Post item={item} />;
  };
  return (
    <Layout>
      <StatusBar
        barStyle={
          themeContext.theme === 'light' ? 'dark-content' : 'light-content'
        }
        backgroundColor={
          themeContext.theme === 'light'
            ? theme['color-basic-100']
            : theme['color-basic-800']
        }
      />
      <Image
        style={{
          height: 50,
          width: width - 250,
          margin: 30,
          marginBottom: 5,
          marginTop: 5,
          alignSelf: 'center',
        }}
        source={
          themeContext.theme === 'light'
            ? require('../../assets/logo.png')
            : require('../../assets/logo-w.png')
        }
      />

      {posts.length ? (
        <List
          refreshControl={
            <RefreshControl
              colors={[theme['color-primary-default']]}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
          style={{minHeight: 30}}
          data={posts}
          renderItem={renderItem}
        />
      ) : (
        <Text
          style={{
            color: theme['color-primary-default'],
            paddingTop: 20,
            alignSelf: 'center',
          }}>
          no posts available
        </Text>
      )}
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
    isLogged: state.login.isLogged,
    newPostsAvailable: state.posts.newPostsAvailable,
  };
};
const mapDispatch = {
  logOut,
  getPosts,
};
export default connect(mapState, mapDispatch)(Home);

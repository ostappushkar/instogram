import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {IStoreState} from '../../interfaces/store';
import {Button, Text, Layout, List, useTheme} from '@ui-kitten/components';
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
const {width} = Dimensions.get('window');
const Home = ({getPosts, logOut, posts, loading}) => {
  const theme = useTheme();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const handleLogout = () => {
    logOut();
  };
  const onRefresh = () => {
    getPosts();
  };
  const renderItem: ListRenderItem<IPost> = ({item}) => {
    return <Post item={item} />;
  };
  return (
    <Layout style={{backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image
        style={{
          height: 50,
          width: width - 250,
          margin: 30,
          marginBottom: 5,
          marginTop: 5,
          alignSelf: 'center',
        }}
        source={require('../../assets/logo.png')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme['color-primary-default']]}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{backgroundColor: '#edf1f7'}}>
        <FlatList
          refreshing={loading}
          style={{minHeight: 30}}
          data={posts}
          renderItem={renderItem}
        />
      </ScrollView>
      {/* <Button onPress={handleLogout}>Logout</Button> */}
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

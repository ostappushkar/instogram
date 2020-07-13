import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {Button, Content, Text, Container} from 'native-base';
import {logOut} from '../../redux/user/actions';
import {getPosts} from '../../redux/posts/actions';
import Post from '../../components/Post';
import {StatusBar, Image, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const Home = ({getPosts, logOut, posts}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const handleLogout = () => {
    logOut();
  };
  return (
    <Container style={{backgroundColor: '#d7d9e8'}}>
      <Content style={{paddingLeft: 0, paddingRight: 0}}>
        <Image
          style={{
            height: 50,
            width: width - 250,
            margin: 30,
            alignSelf: 'center',
          }}
          source={require('../../assets/logo.png')}
        />
        <StatusBar barStyle="dark-content" backgroundColor="#d7d9e8" />
        {posts?.map((post, index) => {
          return <Post item={post} key={index} />;
        })}
        <Button onPress={handleLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
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

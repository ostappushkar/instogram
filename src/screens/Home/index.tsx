import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {Button} from 'native-base';
import {logOut} from '../../redux/user/actions';
const Home = ({getPosts, logOut}) => {
  const handleLogout = () => {
    logOut();
  };
  return (
    <View>
      <Text>Posts .</Text>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};
const mapState = (state: IStoreState) => {
  return {
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
    isLogged: state.login.isLogged,
    newPostsAvailable: state.posts.newPostsAvailable,
  };
};
const mapDispatch = {
  logOut,
};
export default connect(mapState, mapDispatch)(Home);

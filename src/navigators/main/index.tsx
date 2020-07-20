import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from '../bottom';
import auth from '@react-native-firebase/auth';
import Auth from '../../screens/Auth';
import Post from '../../screens/Post';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {GoogleSignin} from '@react-native-community/google-signin';
import {onAuthStateChanged} from '../../redux/user/actions';
import Config from 'react-native-config';
import {postsWatcher} from '../../redux/posts/actions';
type MainNavigatorList = {
  Auth: undefined;
  Dashboard: undefined;
};
const Main = createStackNavigator<MainNavigatorList>();
const MainNavigator = ({isLogged, onAuthStateChanged, postsWatcher}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.FIREBASE_WEB_ID,
    });
    postsWatcher();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLogged ? (
        <>
          <Main.Screen name="Dashboard" component={BottomTabs} />
          <Main.Screen
            options={{
              headerTransparent: true,
              headerShown: true,
              headerTitle: null,
              headerLeftContainerStyle: {
                backgroundColor: '#fff',
                borderRadius: 50,
                margin: 10,
                width: 50,
                height: 45,
              },
            }}
            name="Post"
            component={Post}
          />
        </>
      ) : (
        <Main.Screen name="Auth" component={Auth} />
      )}
    </Main.Navigator>
  );
};
const mapState = (state: IStoreState) => {
  return {
    isLogged: state.login.isLogged,
    currentUser: state.login.currentUser,
  };
};
const mapDispatch = {onAuthStateChanged, postsWatcher};
export default connect(mapState, mapDispatch)(MainNavigator);

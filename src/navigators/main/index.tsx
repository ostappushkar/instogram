import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from '../bottom';
import auth from '@react-native-firebase/auth';
import Auth from '../../components/Auth';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {GoogleSignin} from '@react-native-community/google-signin';
import {onAuthStateChanged} from '../../redux/user/actions';
import {FIREBASE_WEB_ID} from 'react-native-dotenv';
type MainNavigatorList = {
  Auth: undefined;
  Dashboard: undefined;
};
const Main = createStackNavigator<MainNavigatorList>();
const MainNavigator = ({isLogged, onAuthStateChanged}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_ID,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLogged ? (
        <Main.Screen name="Dashboard" component={BottomTabs} />
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
const mapDispatch = {onAuthStateChanged};
export default connect(mapState, mapDispatch)(MainNavigator);

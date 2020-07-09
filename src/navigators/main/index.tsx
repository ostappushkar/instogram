import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {authRef} from '../../../config/firebase';
import BottomTabs from '../bottom';
import Auth from '../../components/Auth';
type MainNavigatorList = {
  Auth: undefined;
  Dashboard: undefined;
};
const Main = createStackNavigator<MainNavigatorList>();
const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authRef.currentUser ? (
        <Main.Screen name="Dashboard" component={BottomTabs} />
      ) : (
        <Main.Screen name="Auth" component={Auth} />
      )}
    </Main.Navigator>
  );
};
export default MainNavigator;

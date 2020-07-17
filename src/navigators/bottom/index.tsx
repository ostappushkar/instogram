import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import AddPost from '../../screens/Add';
import {StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {logOut} from '../../redux/user/actions';
import {IStoreState} from 'src/interfaces/store';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Avatar,
  useTheme,
} from '@ui-kitten/components';

const BottomNavigator = createBottomTabNavigator();
const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

const BottomTabs = ({user}) => {
  const theme = useTheme();
  const FeedIcon = (props) => <Icon {...props} name="compass" />;
  const AddIcon = (props) => <Icon {...props} name="plus-square-outline" />;
  const ProfileIcon = (props) =>
    user?.photoURL ? (
      <Avatar size="small" source={{uri: user?.photoURL}} />
    ) : (
      <Icon {...props} name="person-outline" />
    );
  const State = useBottomNavigationState();
  const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      selectedIndex={state.index}>
      <BottomNavigationTab icon={FeedIcon} />
      <BottomNavigationTab icon={AddIcon} />
      <BottomNavigationTab icon={ProfileIcon} />
    </BottomNavigation>
  );

  return (
    <>
      <BottomNavigator.Navigator
        screenOptions={{headerShown: true}}
        tabBar={(props) => <BottomTabBar {...props} />}
        initialRootName="Home">
        <BottomNavigator.Screen name="Home" component={Home} />
        <BottomNavigator.Screen
          options={{
            /*      headerStyle: {
              backgroundColor: '#fff',
            }, */
            headerTitle: 'Add post',
            headerTintColor: theme['color-primary-default'],
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
          name="Add"
          component={AddPost}
        />
        <BottomNavigator.Screen name="Profile" component={Home} />
      </BottomNavigator.Navigator>
    </>
  );
};
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
  };
};
const mapDispatch = {
  logOut,
};
export default connect(mapState, mapDispatch)(BottomTabs);
const styles = StyleSheet.create({
  iconView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    flex: 0,
    flexDirection: 'row',
    height: 80,
    elevation: 24,
  },
});

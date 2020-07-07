import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Add from '../../screens/Add';
import {Icon} from 'native-base';
type BottomNavList = {
  Home: undefined;
  Second: undefined;
};
const BottomNavigator = createBottomTabNavigator<BottomNavList>();
const BottomTabs = () => {
  return (
    <BottomNavigator.Navigator
      initialRootName="Home"
      screenOptions={({route}) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Icon name={iconName} fontSize={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <BottomNavigator.Screen name="Home" component={Home} />
      <BottomNavigator.Screen name="Add" component={Add} />
      <BottomNavigator.Screen name="Profile" component={Home} />
    </BottomNavigator.Navigator>
  );
};
export default BottomTabs;

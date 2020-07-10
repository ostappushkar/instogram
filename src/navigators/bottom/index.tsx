import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Add from '../../screens/Add';
import {Icon, View} from 'native-base';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
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
        tabBarIcon: ({focused, color, size, margin}) => {
          let iconName;
          color = focused ? 'black' : '#888888';
          if (route.name === 'Home') {
            iconName = 'images-sharp';
            size = 30;
            margin = 0;
          } else if (route.name === 'Add') {
            iconName = 'add-circle-sharp';
            size = 80;
            margin = 30;
          } else if (route.name === 'Profile') {
            iconName = 'person-circle';
            size = 35;
            margin = 0;
          }
          return route.name === 'Add' ? (
            <MaskedView
              style={styles.shadow}
              maskElement={
                <View style={styles.iconView}>
                  <Icon
                    style={styles.addIcon}
                    name="add-circle-sharp"
                    color="white"
                  />
                </View>
              }>
              <LinearGradient
                angle={130}
                useAngle
                locations={[0, 0.33, 0.66]}
                colors={['#fa5a2e', '#fa6148', '#e7200d']}
                style={{flex: 1}}
              />
            </MaskedView>
          ) : (
            <Icon
              name={iconName}
              style={{fontSize: size, color: color, marginBottom: margin}}
            />
          );
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
const styles = StyleSheet.create({
  addIcon: {
    marginBottom: 38,
    fontSize: 75,
  },
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

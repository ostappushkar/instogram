import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import AddPost from '../../screens/Add';
import {Icon, View, Thumbnail} from 'native-base';
import {StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {logOut} from '../../redux/user/actions';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {IStoreState} from 'src/interfaces/store';
type BottomNavList = {
  Home: undefined;
  Profile: undefined;
};
const BottomNavigator = createBottomTabNavigator<BottomNavList>();
const BottomTabs = ({user, logOut}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
              return (
                <Thumbnail
                  style={focused ? styles.profileIcon : null}
                  small
                  source={{uri: user?.photoURL}}
                />
              );
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
        <BottomNavigator.Screen component={AddPost} name="Add" />
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
  profileIcon: {
    borderWidth: 1,
    borderColor: '#000',
  },
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

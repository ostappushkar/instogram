import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleProvider} from 'native-base';
import getTheme from './src/theme/components';
import platform from './src/theme/variables/platform';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/components/MainNavigator';
const App = () => {
  return (
    <Provider store={Store}>
      <StyleProvider style={getTheme(platform)}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </StyleProvider>
    </Provider>
  );
};

export default App;

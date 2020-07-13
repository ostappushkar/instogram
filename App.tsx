import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleProvider, Root} from 'native-base';
import getTheme from './src/theme/components';
import platform from './src/theme/variables/platform';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/main';
import {StatusBar} from 'react-native';
const App = () => {
  console.disableYellowBox = true;
  return (
    <Root>
      <Provider store={Store}>
        <StyleProvider style={getTheme(platform)}>
          <NavigationContainer>
            <StatusBar backgroundColor="#fa5a2e" />
            <MainNavigator />
          </NavigationContainer>
        </StyleProvider>
      </Provider>
    </Root>
  );
};

export default App;

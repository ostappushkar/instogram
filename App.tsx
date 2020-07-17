import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/main';
import {StatusBar, LogBox} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  LogBox.ignoreAllLogs(true);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={Store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <StatusBar backgroundColor="#fa5a2e" />
            <MainNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
};
export default App;

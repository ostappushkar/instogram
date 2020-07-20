import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/main';
import {LogBox} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './theme-context';

const App = () => {
  LogBox.ignoreAllLogs(true);
  const [theme, setTheme] = React.useState('light');
  const [color, setColor] = React.useState('#000');
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const nextColor = theme === 'light' ? '#fff' : '#000';
    setTheme(nextTheme);
    setColor(nextColor);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={Store}>
        <ThemeContext.Provider value={{theme, toggleTheme, color}}>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </Provider>
    </>
  );
};
export default App;

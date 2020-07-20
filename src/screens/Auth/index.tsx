import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image} from 'react-native';
import {IStoreState} from '../../interfaces/store';
import {Layout, TabView, Tab} from '@ui-kitten/components';
import styles from './styles';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ThemeContext} from '../../../theme-context';
const Auth = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const themeContext = React.useContext(ThemeContext);
  return (
    <Layout style={styles.main}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={
            themeContext.theme === 'light'
              ? require('../../assets/logo.png')
              : require('../../assets/logo-w.png')
          }
          style={styles.logo}
        />
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <Tab title="Log in">
            <LoginTab />
          </Tab>
          <Tab title="Sign up">
            <SignupTab />
          </Tab>
        </TabView>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {
    theme: state.app.theme,
  };
};

export default Auth;

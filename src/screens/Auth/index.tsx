import React from 'react';
import {connect} from 'react-redux';
import {Image, ImageBackground} from 'react-native';
import {logIn, googleLogin} from '../../redux/user/actions';
import {IStoreState} from '../../interfaces/store';
import {Layout, TabView, Tab} from '@ui-kitten/components';
import styles from './styles';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const Auth = () => {
  return (
    <Layout style={styles.main}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          paddingLeft: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingTop: 0,
        }}>
        <ImageBackground
          style={styles.illustration}
          source={require('../../assets/back.png')}
          imageStyle={styles.backImage}
          resizeMethod="resize">
          <Image
            source={require('../../assets/logo-white.png')}
            style={styles.logo}
          />
          <TabView
            /*             tabContainerStyle={{
              height: 40,
              width: 200,
              alignSelf: 'flex-start',
              backgroundColor: '#7558F3',
              borderRadius: 15,
              marginBottom: 0,
              marginLeft: 15,
            }} */
            style={{
              backgroundColor: 'transparent',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flex: 1,
            }}>
            <Tab
              // tabStyle={styles.tabLeft}
              //activeTabStyle={[styles.tabLeft, styles.tabActive]}
              //textStyle={{color: '#e7200d'}}
              title="Login">
              <LoginTab />
            </Tab>
            <Tab
              // tabStyle={styles.tabRight}
              // activeTabStyle={[styles.tabRight, styles.tabActive]}
              // activeTextStyle={{color: '#fff'}}
              // textStyle={{color: '#e7200d'}}
              title="Signup">
              <SignupTab />
            </Tab>
          </TabView>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {
    loading: state.login.userLoading,
  };
};
const mapDispatch = {
  logIn,
  googleLogin,
};
export default connect(mapState, mapDispatch)(Auth);

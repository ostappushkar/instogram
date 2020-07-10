import React from 'react';
import {connect} from 'react-redux';
import {Image, ImageBackground} from 'react-native';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import {Container, Tabs, Tab, Content} from 'native-base';
import styles from './styles';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';

const Auth = () => {
  return (
    <Container style={styles.main}>
      <Content
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
          <Tabs
            tabContainerStyle={{
              height: 40,
              width: 200,
              alignSelf: 'flex-start',
              backgroundColor: '#7558F3',
              borderRadius: 15,
              marginBottom: 0,
              marginLeft: 15,
            }}
            style={{
              backgroundColor: 'transparent',

              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Tab
              activeTextStyle={{color: '#fff'}}
              tabStyle={styles.tabLeft}
              activeTabStyle={[styles.tabLeft, styles.tabActive]}
              textStyle={{color: '#e7200d'}}
              heading="Login">
              <LoginTab />
            </Tab>
            <Tab
              tabStyle={styles.tabRight}
              activeTabStyle={[styles.tabRight, styles.tabActive]}
              activeTextStyle={{color: '#fff'}}
              textStyle={{color: '#e7200d'}}
              heading="Signup">
              <SignupTab />
            </Tab>
          </Tabs>
        </ImageBackground>
      </Content>
    </Container>
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

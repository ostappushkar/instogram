import React from 'react';
import {connect} from 'react-redux';
import {Image} from 'react-native';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import {Container, Tabs, Tab, Content} from 'native-base';
import validate from '../../validation';
import styles from './styles';
import {Formik} from 'formik';
import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
interface IAuthProps {
  loading: boolean;
  logIn: Function;
  googleLogin: Function;
  navigation: any;
}

const Auth = ({loading, logIn, googleLogin, navigation}: IAuthProps) => {
  const handleLogIn = (values) => {
    console.log(values);
  };
  return (
    <Container style={styles.main}>
      <Content style={{flex: 1}}>
        <Image
          source={require('../../assets/logo-white.png')}
          style={styles.illustration}
        />
        <Tabs
          tabContainerStyle={{
            height: 40,
            width: 200,
            alignSelf: 'center',
            backgroundColor: '#7558F3',
            borderRadius: 15,
          }}>
          <Tab
            activeTextStyle={{color: '#fff'}}
            tabStyle={styles.tabLeft}
            activeTabStyle={[styles.tabLeft, styles.tabActive]}
            textStyle={{color: '#b8b8b8'}}
            heading="Login">
            <LoginTab />
          </Tab>
          <Tab
            tabStyle={styles.tabRight}
            activeTabStyle={[styles.tabRight, styles.tabActive]}
            activeTextStyle={{color: '#fff'}}
            textStyle={{color: '#b8b8b8'}}
            heading="Signup">
            <SignupTab />
          </Tab>
        </Tabs>
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

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {
  H1,
  Container,
  Tabs,
  Tab,
  Button,
  Text,
  View,
  Item,
  Label,
  Input,
  Content,
  H2,
  Icon,
} from 'native-base';
import * as Yup from 'yup';
const {height, width} = Dimensions.get('window');
import {Formik} from 'formik';
interface IAuthProps {
  loading: boolean;
  logIn: Function;
  googleLogin: Function;
  navigation: any;
}
const validationLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required()
    .min(6, 'Min 6 symbols')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Invalid password',
    ),
});
const validationSignup = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(6, 'Min 6 symbols')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Invalid password',
    ),
});
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
            <View style={styles.content}>
              <H2 style={styles.tabHeader}>Login</H2>
              <Formik
                validateOnChange
                validationSchema={validationLogin}
                initialValues={{email: '', password: ''}}
                onSubmit={handleLogIn}>
                {({
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                }) => (
                  <View>
                    <Item regular style={styles.inputItem}>
                      <Icon
                        name={
                          errors.email && touched.email
                            ? 'alert-circle'
                            : 'mail-outline'
                        }
                        style={
                          errors.email && touched.email
                            ? styles.error
                            : {color: '#fff'}
                        }
                      />
                      <Input
                        placeholderTextColor="#fff"
                        placeholder="Email"
                        nativeID="email"
                        keyboardType="email-address"
                        onBlur={handleBlur}
                        onChangeText={handleChange('email')}
                        value={values.email}
                        style={
                          errors.email && touched.email
                            ? styles.inputError
                            : styles.input
                        }
                      />
                    </Item>
                    {errors.email && touched.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                    <Item regular style={styles.inputItem}>
                      <Icon name="shield-outline" style={{color: '#fff'}} />
                      <Input
                        placeholderTextColor="#fff"
                        placeholder="Password"
                        nativeID="password"
                        onChangeText={handleChange('password')}
                        secureTextEntry
                        onBlur={handleBlur}
                        style={styles.input}
                        value={values.password}
                      />
                    </Item>
                    <Button style={styles.submit} onPress={handleSubmit}>
                      <Text
                        style={{
                          color: '#6149c9',
                          textTransform: 'capitalize',
                        }}>
                        Login
                      </Text>
                    </Button>
                  </View>
                )}
              </Formik>
              <GoogleButton style={styles.googleButton}>
                Sign in with Google
              </GoogleButton>
            </View>
          </Tab>
          <Tab
            tabStyle={styles.tabRight}
            activeTabStyle={[styles.tabRight, styles.tabActive]}
            activeTextStyle={{color: '#fff'}}
            textStyle={{color: '#b8b8b8'}}
            heading="Signup">
            <View style={styles.content}>
              <H2 style={styles.tabHeader}>Signup</H2>
              <Formik
                validationSchema={validationSignup}
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={handleLogIn}>
                {({handleBlur, handleChange, handleSubmit, values}) => (
                  <View>
                    <Item regular style={styles.inputItem}>
                      <Icon name="person-outline" style={{color: '#fff'}} />
                      <Input
                        placeholderTextColor="#fff"
                        placeholder="Username"
                        nativeID="username"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur}
                        style={styles.input}
                        value={values.username}
                      />
                    </Item>

                    <Item regular style={styles.inputItem}>
                      <Icon name="mail-outline" style={{color: '#fff'}} />
                      <Input
                        placeholderTextColor="#fff"
                        placeholder="Email"
                        nativeID="email"
                        keyboardType="email-address"
                        onBlur={handleBlur}
                        onChangeText={handleChange('email')}
                        value={values.email}
                        style={styles.input}
                      />
                    </Item>
                    <Item regular style={styles.inputItem}>
                      <Icon name="shield-outline" style={{color: '#fff'}} />
                      <Input
                        placeholderTextColor="#fff"
                        placeholder="Password"
                        nativeID="password"
                        onChangeText={handleChange('password')}
                        secureTextEntry
                        onBlur={handleBlur}
                        style={styles.input}
                        value={values.password}
                      />
                    </Item>
                    <Button style={styles.submit} onPress={handleSubmit}>
                      <Text
                        style={{
                          color: '#6149c9',
                          textTransform: 'capitalize',
                        }}>
                        Signup
                      </Text>
                    </Button>
                  </View>
                )}
              </Formik>
              <GoogleButton style={styles.googleButton}>
                Sign up with Google
              </GoogleButton>
            </View>
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

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#7558F3',
  },
  content: {
    flex: 1,
    backgroundColor: '#7558F3',
    justifyContent: 'flex-start',
    padding: 25,
  },
  inputItem: {
    shadowColor: '#6149c9',
    elevation: 3,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 25,
    backgroundColor: '#6149c9',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    borderColor: 'transparent',
  },
  input: {
    color: 'white',
    paddingLeft: 15,
  },
  inputError: {
    color: 'red',
    paddingLeft: 15,
  },
  tabLeft: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#fff',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  tabRight: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#fff',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  tabActive: {
    borderColor: '#6149c9',
    backgroundColor: '#6149c9',
  },
  illustration: {
    resizeMode: 'contain',
    width: width - 150,
    height: 200,
    alignSelf: 'center',
  },
  backImage: {resizeMode: 'contain'},
  logo: {
    width: 200,
    height: 70,
    alignSelf: 'center',
    margin: 110,
    marginTop: 100,
  },
  tabHeader: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 32,
    marginBottom: 10,
    lineHeight: 40,
  },
  submit: {
    backgroundColor: 'white',
    marginTop: 10,
    color: '#6149c9',
    shadowColor: '#6149c9',
    elevation: 5,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 25,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  googleButton: {
    marginTop: 20,
    borderRadius: 20,
  },
  googleLogo: {
    width: 18,
    height: 18,
  },
  error: {
    color: '#ff0000',
  },
  errorText: {
    color: '#fff',
    marginTop: -10,
    marginBottom: 10,
  },
});

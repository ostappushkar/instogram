import React from 'react';
import {connect} from 'react-redux';
import {logIn, googleLogin} from '../../redux/user/actions';
import {IStoreState} from '../../interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon, Toast} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
const Login = ({logIn, googleLogin, loading}) => {
  const handleLogin = (values) => {
    logIn(
      values.email,
      values.password,
      () => {},
      (message) => {
        Toast.show({
          text: message,
          type: 'warning',
          duration: 5000,
          textStyle: {
            color: '#fa5a2e',
          },
          style: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#fa5a2e',
            margin: 10,
            borderRadius: 15,
          },
        });
      },
    );
  };
  const handleGoogleSignIn = () => {
    googleLogin(
      () => {
        console.log('Logged in with Google');
      },
      (message) => {
        Toast.show({
          text: message,
          type: 'warning',
          duration: 5000,
          textStyle: {
            color: '#fa5a2e',
          },
          style: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#fa5a2e',
            margin: 10,
            borderRadius: 15,
          },
        });
      },
    );
  };
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Login</H2>
      <View>
        <Formik
          validateOnChange
          validationSchema={validate.login}
          initialValues={{email: '', password: ''}}
          onSubmit={handleLogin}>
          {({
            handleBlur,
            handleChange,
            values,
            touched,
            errors,
            submitForm,
          }) => (
            <View>
              <Item style={styles.inputItem}>
                <Icon
                  name={
                    errors.email && touched.email
                      ? 'alert-circle'
                      : 'mail-outline'
                  }
                  style={
                    errors.email && touched.email
                      ? styles.error
                      : {color: 'black'}
                  }
                />
                <Input
                  placeholderTextColor="black"
                  placeholder="Email"
                  nativeID="email"
                  keyboardType="email-address"
                  onBlur={handleBlur('email')}
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
              <Item style={styles.inputItem}>
                <Icon
                  name={
                    errors.password && touched.password
                      ? 'alert-circle'
                      : 'shield-outline'
                  }
                  style={
                    errors.password && touched.password
                      ? styles.error
                      : {color: 'black'}
                  }
                />
                <Input
                  placeholderTextColor="black"
                  placeholder="Password"
                  nativeID="password"
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  style={
                    errors.password && touched.password
                      ? styles.inputError
                      : styles.input
                  }
                  value={values.password}
                />
              </Item>
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              <TouchableOpacity style={styles.submit} onPress={submitForm}>
                <LinearGradient
                  style={styles.buttonGradient}
                  angle={130}
                  useAngle
                  colors={['#fa5a2e', '#fa6148', '#e7200d']}>
                  {!loading ? (
                    <Text
                      style={{
                        color: 'white',
                        textTransform: 'capitalize',
                      }}>
                      Login
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color="#fff" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <GoogleButton onPress={handleGoogleSignIn} style={styles.googleButton}>
          <Text>Sign in with Google</Text>
        </GoogleButton>
      </View>
    </View>
  );
};
const mapDispatch = {
  logIn,
  googleLogin,
};
const mapState = (state: IStoreState) => {
  return {
    loading: state.login.userLoading,
  };
};
export default connect(mapState, mapDispatch)(Login);

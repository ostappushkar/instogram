import React from 'react';
import {connect} from 'react-redux';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
const Login = ({navigator, logIn, googleLogin, loading}) => {
  const handleLogin = (values) => {
    console.log(values);
    logIn(values.email, values.password, () => {
      navigator.push('Dashboard');
    });
  };
  const handleGoogleSignIn = () => {
    googleLogin(() => {
      console.log('Logged in with Google');
      //navigator.push('Dashboard');
    });
  };
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Login</H2>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#fa5a2e" />
        ) : (
          <>
            <Formik
              validateOnChange
              validationSchema={validate.login}
              initialValues={{email: '', password: ''}}
              onSubmit={handleLogin}>
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                touched,
                errors,
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
                      onBlur={handleBlur}
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
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={handleSubmit}>
                    <LinearGradient
                      style={styles.buttonGradient}
                      angle={130}
                      useAngle
                      colors={['#fa5a2e', '#fa6148', '#e7200d']}>
                      <Text
                        style={{
                          color: 'white',

                          textTransform: 'capitalize',
                        }}>
                        Login
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <GoogleButton
              onPress={handleGoogleSignIn}
              style={styles.googleButton}>
              <Text>Sign in with Google</Text>
            </GoogleButton>
          </>
        )}
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

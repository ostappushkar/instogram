import React from 'react';
import {connect} from 'react-redux';
import {logIn, googleLogin} from '../../redux/user/actions';
import {IStoreState} from '../../interfaces/store';
import GoogleButton from 'react-native-google-button';
import {View, Item, Toast} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import {Text, Button, Input, Icon, Layout} from '@ui-kitten/components';
import {ActivityIndicator} from 'react-native';
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
  const MailIcon = (props) => <Icon {...props} name="email" />;
  const ShieldIcon = (props) => <Icon {...props} name="shield" />;
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
    <Layout>
      <Formik
        validateOnChange
        validationSchema={validate.login}
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}>
        {({handleBlur, handleChange, values, touched, errors, submitForm}) => (
          <View>
            <Input
              style={styles.input}
              accessoryLeft={MailIcon}
              placeholder="Email"
              nativeID="email"
              keyboardType="email-address"
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              value={values.email}
              status={errors.email && touched.email ? 'danger' : 'basic'}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <Input
              accessoryLeft={ShieldIcon}
              placeholder="Password"
              nativeID="password"
              onChangeText={handleChange('password')}
              secureTextEntry
              style={styles.input}
              onBlur={handleBlur('password')}
              status={errors.email && touched.email ? 'danger' : 'basic'}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <Button
              style={{marginVertical: 15}}
              onPress={submitForm}
              children={() =>
                loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
                )
              }
            />
          </View>
        )}
      </Formik>
      <GoogleButton onPress={handleGoogleSignIn}>
        <Text style={{color: '#000'}}>Sign in with Google</Text>
      </GoogleButton>
    </Layout>
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

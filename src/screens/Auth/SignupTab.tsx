import React from 'react';
import {connect} from 'react-redux';
import {googleLogin, signUp} from '../../redux/user/actions';
import {IStoreState} from '../../interfaces/store';
import GoogleButton from 'react-native-google-button';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import {Button, Layout, Input, Icon, Text} from '@ui-kitten/components';
import {ActivityIndicator} from 'react-native';
const Signup = ({signUp, googleLogin, loading}) => {
  const handleSignup = (values) => {
    signUp(values.email, values.password, values.usename, () => {});
  };
  const handleGoogleSignIn = () => {
    googleLogin(() => {
      console.log('Logged in with Google');
    });
  };
  const MailIcon = (props) => <Icon {...props} name="email" />;
  const ShieldIcon = (props) => <Icon {...props} name="shield" />;
  const PersonIcon = (props) => <Icon {...props} name="person" />;
  return (
    <Layout>
      <Formik
        validateOnChange
        validationSchema={validate.signup}
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={handleSignup}>
        {({handleBlur, handleChange, values, touched, errors, submitForm}) => (
          <Layout>
            <Input
              accessoryLeft={PersonIcon}
              placeholder="Username"
              nativeID="username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              style={styles.input}
              value={values.username}
              status={errors.username && touched.username ? 'danger' : 'basic'}
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
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
              style={styles.input}
              accessoryLeft={ShieldIcon}
              placeholder="Password"
              nativeID="password"
              onChangeText={handleChange('password')}
              secureTextEntry
              onBlur={handleBlur('password')}
              status={errors.password && touched.password ? 'danger' : 'basic'}
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
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Signup
                  </Text>
                )
              }
            />
          </Layout>
        )}
      </Formik>
      <GoogleButton onPress={handleGoogleSignIn} style={styles.googleButton}>
        <Text style={{color: '#000'}}>Sign up with Google</Text>
      </GoogleButton>
    </Layout>
  );
};
const mapDispatch = {
  signUp,
  googleLogin,
};
const mapState = (state: IStoreState) => {
  return {
    loading: state.login.userLoading,
  };
};
export default connect(mapState, mapDispatch)(Signup);

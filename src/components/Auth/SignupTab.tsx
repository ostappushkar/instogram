import React from 'react';
import {connect} from 'react-redux';
import {googleLogin, signUp} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Signup = ({signUp, googleLogin, loading}) => {
  const handleSignup = (values) => {
    signUp(values.email, values.password, values.usename, () => {});
  };
  const handleGoogleSignIn = () => {
    googleLogin(() => {
      console.log('Logged in with Google');
    });
  };
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Signup</H2>
      <View>
        <Formik
          validateOnChange
          validationSchema={validate.signup}
          initialValues={{email: '', username: '', password: ''}}
          onSubmit={handleSignup}>
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
                <Icon name="person-outline" style={{color: 'black'}} />
                <Input
                  placeholderTextColor="black"
                  placeholder="Username"
                  nativeID="username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  style={styles.input}
                  value={values.username}
                />
              </Item>
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
              <TouchableOpacity onPress={submitForm} style={styles.submit}>
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
                      Signup
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
          <Text>Sign up with Google</Text>
        </GoogleButton>
      </View>
    </View>
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

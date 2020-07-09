import React from 'react';
import {connect} from 'react-redux';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
export default () => {
  const handleLogin = () => {};
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Login</H2>
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
            <Item regular style={styles.inputItem}>
              <Icon
                name={
                  errors.email && touched.email
                    ? 'alert-circle'
                    : 'mail-outline'
                }
                style={
                  errors.email && touched.email ? styles.error : {color: '#fff'}
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
              <Icon
                name={
                  errors.password && touched.password
                    ? 'alert-circle'
                    : 'shield-outline'
                }
                style={
                  errors.password && touched.password
                    ? styles.error
                    : {color: '#fff'}
                }
              />
              <Input
                placeholderTextColor="#fff"
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
  );
};

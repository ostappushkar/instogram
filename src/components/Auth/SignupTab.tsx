import React from 'react';
import {connect} from 'react-redux';
import {googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
export default () => {
  const handleSignup = () => {};
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Signup</H2>
      <Formik
        validationSchema={validate.signup}
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={handleSignup}>
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
  );
};

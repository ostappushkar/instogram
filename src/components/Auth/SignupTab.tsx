import React from 'react';
import {connect} from 'react-redux';
import {googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import GoogleButton from 'react-native-google-button';
import {Button, Text, View, Item, Input, H2, Icon} from 'native-base';
import styles from './styles';
import validate from '../../validation';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default () => {
  const handleSignup = () => {};
  return (
    <View style={styles.content}>
      <H2 style={styles.tabHeader}>Signup</H2>
      <View>
        <Formik
          validationSchema={validate.signup}
          initialValues={{email: '', username: '', password: ''}}
          onSubmit={handleSignup}>
          {({handleBlur, handleChange, handleSubmit, values}) => (
            <View>
              <Item style={styles.inputItem}>
                <Icon name="person-outline" style={{color: 'black'}} />
                <Input
                  placeholderTextColor="black"
                  placeholder="Username"
                  nativeID="username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur}
                  style={styles.input}
                  value={values.username}
                />
              </Item>

              <Item style={styles.inputItem}>
                <Icon name="mail-outline" style={{color: 'black'}} />
                <Input
                  placeholderTextColor="black"
                  placeholder="Email"
                  nativeID="email"
                  keyboardType="email-address"
                  onBlur={handleBlur}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  style={styles.input}
                />
              </Item>
              <Item style={styles.inputItem}>
                <Icon name="shield-outline" style={{color: 'black'}} />
                <Input
                  placeholderTextColor="black"
                  placeholder="Password"
                  nativeID="password"
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  onBlur={handleBlur}
                  style={styles.input}
                  value={values.password}
                />
              </Item>
              <TouchableOpacity
                onPress={() => {
                  return handleSubmit;
                }}
                style={styles.submit}>
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
                    Signup
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <GoogleButton style={styles.googleButton}>
          <Text>Sign up with Google</Text>
        </GoogleButton>
      </View>
    </View>
  );
};

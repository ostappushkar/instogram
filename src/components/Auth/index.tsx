import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {logIn, googleLogin} from '../../../src/redux/user/actions';
import {IStoreState} from '../../../src/interfaces/store';
import {
  H1,
  Container,
  Content,
  Tabs,
  Tab,
  Button,
  Text,
  View,
} from 'native-base';
interface IAuthProps {
  loading: boolean;
  logIn: Function;
  googleLogin: Function;
  navigation: any;
}
const Auth = ({loading, logIn, googleLogin, navigation}: IAuthProps) => {
  return (
    <Container>
      <Tabs>
        <Tab textStyle={{color: '#e8e8e8'}} heading="Login">
          <View style={styles.content}>
            <H1>Login</H1>

            <Button
              onPress={() => {
                navigation.push('Dashboard');
              }}>
              <Text>Go to dashboard</Text>
            </Button>
          </View>
        </Tab>
        <Tab textStyle={{color: '#e8e8e8'}} heading="Signup">
          <View>
            <H1>Signup</H1>
          </View>
        </Tab>
      </Tabs>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

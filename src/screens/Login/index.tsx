import React, {useState} from 'react';
import {
  Button,
  Text,
  Container,
  H1,
  Content,
  Textarea,
  Icon,
  View,
  Item,
  Input,
  Label,
} from 'native-base';
import {Formik} from 'formik';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {addPost} from '../../redux/posts/actions';
const AddPost = ({navigation, addPost}) => {
  const handleSubmit = (values) => {
    console.log(values);
    addPost(values, () => {
      navigation.goBack();
    });
  };
  return (
    <Container>
      <Content>
        <H1>Login</H1>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={handleSubmit}>
          {({handleBlur, handleChange, handleSubmit, values}) => (
            <View>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
              </Item>
              <Button onPress={handleSubmit}>
                <Text>Confirm</Text>
              </Button>
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  uploadButton: {
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(248, 248, 255)',
    borderColor: '#dbdbdb',
    height: 250,
  },
  image: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

const mapState = (state: IStoreState) => {
  return {
    loading: state.posts.addLoading,
  };
};
const mapDispatch = {
  addPost,
};
export default connect(mapState, mapDispatch)(AddPost);

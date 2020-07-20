import React, {useState} from 'react';
import {Textarea} from 'native-base';
import {Formik} from 'formik';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {addPost} from '../../redux/posts/actions';
import {
  Layout,
  useTheme,
  Text,
  Button,
  Icon,
  Input,
} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ThemeContext} from '../../../theme-context';
const AddPost = ({addPost, navigation, loading}) => {
  const [image, setImage] = useState('');
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const handleImage = () => {
    const options = {
      title: 'Select image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setImage(response.data);
      }
    });
  };
  const handleSubmit = (values) => {
    values.photo = image;
    console.log(values);
    addPost(values, () => {
      setImage('');
      values.photo = '';
      navigation.navigate('Home');
    });
  };
  return (
    <Layout style={{flex: 1, padding: 15}}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Text
          style={{
            color: theme['color-primary-default'],
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 15,
          }}>
          Add Post
        </Text>
        <Formik
          style={{flex: 1}}
          initialValues={{photo: image, description: ''}}
          onSubmit={handleSubmit}>
          {({handleBlur, handleChange, values, submitForm}) => (
            <Layout style={{justifyContent: 'space-between', flex: 1}}>
              <Layout>
                <Layout level="2" style={{marginBottom: 10}}>
                  <TouchableOpacity
                    onPress={handleImage}
                    style={styles.uploadButton}>
                    {image ? (
                      <Image
                        resizeMode="contain"
                        height={250}
                        style={styles.image}
                        source={{uri: 'data:image/jpeg;base64,' + image}}
                      />
                    ) : (
                      <Icon
                        fill={themeContext.color}
                        style={{width: 36, height: 36}}
                        name="camera"
                      />
                    )}
                  </TouchableOpacity>
                </Layout>
                <Input
                  nativeID="description"
                  value={values.description}
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                  multiline
                  textStyle={{minHeight: 64}}
                  placeholder="Description"
                />
              </Layout>
              <Button
                style={{marginTop: 15}}
                onPress={submitForm}
                children={() =>
                  loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      Confirm
                    </Text>
                  )
                }
              />
            </Layout>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  uploadButton: {
    borderWidth: 0,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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

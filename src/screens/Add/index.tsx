import React, {useState} from 'react';
import {Textarea} from 'native-base';
import {Formik} from 'formik';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
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
const AddPost = ({addPost, open, setOpen}) => {
  const [image, setImage] = useState('');
  const theme = useTheme();
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
    /* values.photo = image;
    console.log(values);
    addPost(values, () => {
      setImage('');
      values.photo = '';
    }); */
  };
  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: '#fff', flex: 1, padding: 15}}>
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
                    fill="#000"
                    style={{width: 36, height: 36}}
                    name="camera"
                  />
                )}
              </TouchableOpacity>
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
            <Button style={{marginTop: 15}} onPress={submitForm}>
              Confirm
            </Button>
          </Layout>
        )}
      </Formik>
    </KeyboardAwareScrollView>
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
    marginBottom: 15,
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

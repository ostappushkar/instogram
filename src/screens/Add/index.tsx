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
} from 'native-base';
import {Formik} from 'formik';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {IStoreState} from 'src/interfaces/store';
import {addPost} from '../../redux/posts/actions';
const AddPost = ({addPost, open, setOpen}) => {
  const [image, setImage] = useState('');
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
    addPost(values, () => {});
  };
  return (
    /*  <BottomSheet isOpen={open}> */
    <View>
      <H1>Add Post</H1>
      <Formik
        initialValues={{photo: image, description: ''}}
        onSubmit={handleSubmit}>
        {({handleBlur, handleChange, handleSubmit, values}) => (
          <View>
            <TouchableOpacity onPress={handleImage} style={styles.uploadButton}>
              {image ? (
                <Image
                  resizeMode="contain"
                  height={250}
                  style={styles.image}
                  source={{uri: 'data:image/jpeg;base64,' + image}}
                />
              ) : (
                <Icon name="camera" type="Ionicons" />
              )}
            </TouchableOpacity>
            <Textarea
              nativeID="description"
              value={values.description}
              onBlur={handleBlur}
              onChangeText={handleChange('description')}
              rowSpan={4}
              underline
              bordered
              placeholder="Description"
            />
            <Button onPress={handleSubmit}>
              <Text>Confirm</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
    /*     </BottomSheet> */
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

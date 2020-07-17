import React, {useState} from 'react';
import {connect} from 'react-redux';
import {IStoreState} from '../../interfaces/store';
import {
  Layout,
  Icon,
  Text,
  useTheme,
  TabView,
  Tab,
  Tooltip,
} from '@ui-kitten/components';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {getUserPosts} from '../../redux/posts/actions';
import ImagePicker from 'react-native-image-crop-picker';
interface IProfileProps {
  user: firebase.User;
  getUserPosts: Function;
}
const Profile = ({user, getUserPosts}: IProfileProps) => {
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const GalleryIcon = (props) => <Icon {...props} name="grid" />;
  const ListIcon = (props) => <Icon {...props} name="menu" />;
  const shouldLoadComponent = (index) => index === selectedIndex;
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    }).then((image: any) => {
      console.log(image);
      setImage(image.path);
    });
  };
  const photoButton = () => {
    return (
      <TouchableOpacity onPress={handleImage} style={styles.uploadButton}>
        {user.photoURL ? (
          <Image
            resizeMode="contain"
            height={150}
            style={styles.image}
            source={{uri: user.photoURL || image}}
          />
        ) : (
          <Icon fill="#000" style={{width: 36, height: 36}} name="camera" />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <Layout>
      <Text
        style={{
          color: '#000',
          fontSize: 24,
          alignSelf: 'center',
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 5,
        }}>
        {user.displayName || user.email}
      </Text>

      <Tooltip
        anchor={photoButton}
        visible={visible}
        onBackdropPress={() => setVisible(false)}>
        Press to change photo
      </Tooltip>
      <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab icon={GalleryIcon}>
          <Layout style={styles.tabContainer}>
            <Text category="h5">posts gallery</Text>
          </Layout>
        </Tab>
        <Tab icon={ListIcon}>
          <Layout style={styles.tabContainer}>
            <Text category="h5">posts list</Text>
          </Layout>
        </Tab>
      </TabView>
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {user: state.login.currentUser};
};
const mapDispatch = {getUserPosts};
export default connect(mapState, mapDispatch)(Profile);
const styles = StyleSheet.create({
  uploadButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(248, 248, 255)',
    borderColor: '#dbdbdb',
    height: 150,
    width: 150,
    marginBottom: 15,
  },
  image: {
    borderRadius: 50,
    alignSelf: 'stretch',
    flex: 1,
  },
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

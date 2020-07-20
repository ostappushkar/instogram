import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {IStoreState} from '../../interfaces/store';
import {
  Layout,
  Icon,
  Text,
  useTheme,
  Tooltip,
  List,
} from '@ui-kitten/components';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  RefreshControl,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {logOut, uploadPhoto} from '../../redux/user/actions';
import {getUserPosts} from '../../redux/posts/actions';
import ImagePicker from 'react-native-image-crop-picker';
import {IPost} from '../../interfaces/post';
import {ThemeContext} from '../../../theme-context';
interface IProfileProps {
  user: firebase.User;
  getUserPosts: Function;
  posts: Array<IPost>;
  navigation: any;
  loading: boolean;
  logOut: Function;
  uploadPhoto: Function;
  userLoading: boolean;
}
const {width} = Dimensions.get('window');
const Profile = ({
  user,
  getUserPosts,
  posts,
  loading,
  navigation,
  logOut,
  userLoading,
  uploadPhoto,
}: IProfileProps) => {
  const [image, setImage] = useState('');
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const [visible, setVisible] = useState(true);
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    }).then((image: any) => {
      uploadPhoto(image, () => {
        setImage(image.path);
      });
    });
  };
  const handleTheme = () => {
    themeContext.toggleTheme();
  };
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  const handleLogout = () => {
    Alert.alert(
      'Log out?',
      null,
      [
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => logOut(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const LogoutButton = (props) => (
    <TouchableOpacity onPress={handleLogout}>
      <Icon
        style={{width: 28, height: 28}}
        {...props}
        fill={themeContext.color}
        name="log-out"
      />
    </TouchableOpacity>
  );
  const ThemeButton = (props) => (
    <TouchableOpacity style={{marginRight: 20}} onPress={handleTheme}>
      <Icon
        style={{width: 28, height: 28}}
        {...props}
        fill={themeContext.color}
        name={themeContext.theme === 'light' ? 'sun' : 'moon'}
      />
    </TouchableOpacity>
  );
  const renderItemGrid: ListRenderItem<IPost> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Post', {item: item.id});
        }}
        style={{
          width: width / 3,
          flex: 1 / 3,
          aspectRatio: 1,
        }}>
        <Image
          style={{flex: 1}}
          resizeMode="cover"
          source={{uri: item.imageUrl}}
        />
      </TouchableOpacity>
    );
  };
  const photoButton = () => {
    return (
      <TouchableOpacity onPress={handleImage} style={styles.uploadButton}>
        {userLoading ? (
          <ActivityIndicator
            color={
              themeContext.theme === 'light'
                ? theme['color-basic-100']
                : theme['color-basic-800']
            }
          />
        ) : image || user?.photoURL ? (
          <Image
            resizeMode="contain"
            height={150}
            style={styles.image}
            source={{uri: image || user?.photoURL}}
          />
        ) : (
          <Icon
            fill={themeContext.color}
            style={{width: 36, height: 36}}
            name="camera"
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <Layout style={{flex: 1}}>
      <Layout
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <Text
          style={{
            color: themeContext.color,
            fontSize: 24,
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {user?.displayName || user?.email}
        </Text>
        <Layout style={{flexDirection: 'row'}}>
          <ThemeButton />
          <LogoutButton />
        </Layout>
      </Layout>
      <Tooltip
        anchor={photoButton}
        visible={visible}
        onBackdropPress={() => setVisible(false)}>
        Press to change photo
      </Tooltip>
      {loading ? null : (
        <Text
          style={{
            color: theme['color-primary-default'],
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          {posts.length} posts
        </Text>
      )}

      <List
        refreshControl={
          <RefreshControl
            colors={[theme['color-primary-default']]}
            refreshing={loading}
          />
        }
        numColumns={3}
        data={posts}
        renderItem={renderItemGrid}
      />
    </Layout>
  );
};
const mapState = (state: IStoreState) => {
  return {
    user: state.login.currentUser,
    userLoading: state.login.userLoading,
    posts: state.posts.userPosts,
    loading: state.posts.loading,
  };
};
const mapDispatch = {getUserPosts, logOut, uploadPhoto};
export default connect(mapState, mapDispatch)(Profile);
const styles = StyleSheet.create({
  uploadButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
  },
});

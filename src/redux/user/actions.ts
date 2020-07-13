import auth from '@react-native-firebase/auth';
import action from '../actions';
import actionTypes from './actionTypes';
import {GoogleSignin} from '@react-native-community/google-signin';
export const onAuthStateChanged = (user) => (dispatch) => {
  user
    ? dispatch(
        action(actionTypes.GET_USER, {
          userLoading: false,
          isLogged: true,
          currentUser: user,
        }),
      )
    : dispatch(
        action(actionTypes.GET_USER, {
          userLoading: false,
          isLogged: false,
          currentUser: null,
        }),
      );
};
export const logOut = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => async (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  try {
    await auth().signOut();
    dispatch(action(actionTypes.USER_LOADED));
    successCallback();
  } catch (e) {
    const {message} = e;
    console.warn(message);
    dispatch(action(actionTypes.USER_LOADED));
    errorCallback(message);
  }
};

export const googleLogin = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => async (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn()
    .then(async (userInfo) => {
      console.log(userInfo);
      const {idToken} = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          successCallback();
        })
        .catch((e) => {
          console.warn(e);
          errorCallback(e.message);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const logIn = (
  email: string,
  password: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(action(actionTypes.USER_LOADED));
      successCallback();
    })
    .catch((e) => {
      const {message, code} = e;
      console.warn(code, message);
      let err: string;
      switch (code) {
        case 'auth/wrong-password':
          err = 'Wrong password';

          break;
        case 'auth/invalid-email':
          err = 'Invalid email';
          break;
        case 'auth/user-disabled':
          err = 'User is disabled';
          break;

        case 'auth/user-not-found':
          err = 'User not found';
          break;

        default:
          err = message;
          break;
      }
      dispatch(action(actionTypes.USER_LOADED));
      errorCallback(err);
    });
};
export const signUp = (
  email: string,
  password: string,
  username: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      auth()
        .currentUser.updateProfile({
          displayName: username,
        })
        .then(() => {
          dispatch(action(actionTypes.USER_LOADED));
          successCallback();
        })
        .catch((e) => {
          const {message} = e;
          dispatch(action(actionTypes.USER_LOADED));
          errorCallback(message);
        });
      dispatch(action(actionTypes.USER_LOADED));
    })
    .catch((e) => {
      const {message, code} = e;
      console.warn(message);
      let err: string;
      switch (code) {
        case 'auth/email-already-in-use':
          err = 'Email is already taken';

          break;
        case 'auth/invalid-email':
          err = 'Invalid email';
          break;
        case 'auth/operation-not-allowed':
          err = 'Operation is not permitted';
          break;

        case 'auth/weak-password':
          err = 'Weak password';
          break;

        default:
          err = message;
          break;
      }
      dispatch(action(actionTypes.USER_LOADED));
      errorCallback(err);
    });
};

/*export const uploadPhoto = (
  photo: File,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  if (photo.name) {
    dispatch(action(actionTypes.USER_LOADING));
    let formData = new FormData();
    formData.append('image', photo);
    Http.post('/3/image', formData).then((res) => {
      authRef.currentUser
        .updateProfile({
          photoURL: res.data.link,
        })
        .then(() => {
          dispatch(action(actionTypes.USER_LOADED, {photoURL: res.data.link}));
          successCallback();
        })
        .catch((e) => {
          const {message} = e;
          dispatch(action(actionTypes.USER_LOADED));
          errorCallback(message);
        });
    });
  }
};
 */

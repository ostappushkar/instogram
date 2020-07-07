import {authRef, GoogleProvider, persistance} from '../../../config/firebase';
/* import Http from '../../services/http' */
import action from '../actions';
import actionTypes from './actionTypes';
export const watchAuthState = () => (dispatch) => {
  authRef.onAuthStateChanged((user: firebase.User) => {
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
  });
};
export const logOut = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  authRef
    .signOut()
    .then(() => {
      localStorage.clear();
      console.log('Logged out...');
      dispatch(action(actionTypes.USER_LOADED));
      successCallback();
    })
    .catch((e) => {
      const {message} = e;
      console.warn(message);
      dispatch(action(actionTypes.USER_LOADED));
      errorCallback(message);
    });
};

export const googleLogin = (
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  authRef
    .setPersistence(persistance)
    .then(() => {
      authRef
        .signInWithRedirect(GoogleProvider)
        .then(() => {
          dispatch(action(actionTypes.USER_LOADED));
          successCallback();
        })
        .catch((e) => {
          const {message, code} = e;
          console.warn(message);
          let err: string;
          switch (code) {
            case 'auth/cancelled-popup-request':
              err = 'Cancelled';
              break;
            case 'auth/account-exists-with-different-credential':
              err = 'Try other method';
              break;
            case 'auth/auth-domain-config-required':
              err = 'Domain config required';
              break;
            case 'auth/popup-blocked':
              err = 'Popup blocked by browser';
              break;
            case 'auth/popup-closed-by-user':
              err = 'Popup closed by user';
              break;
            case 'auth/unauthorized-domain':
              err = 'Unauthorized domain';
              break;
            case 'auth/operation-not-allowed':
              err = 'Operation is not allowed';
              break;

            default:
              err = message;
              break;
          }
          dispatch(action(actionTypes.USER_LOADED));
          errorCallback(err);
        });
    })
    .catch((e) => {
      const {message} = e;
      console.warn(message);
      errorCallback(message);
    });
};
export const logIn = (
  email: string,
  password: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  authRef
    .setPersistence(persistance)
    .then(() => {
      authRef
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
    })
    .catch((e) => {
      const {message} = e;
      console.warn(message);
      errorCallback(message);
    });
};
/* export const signUp = (
  email: string,
  password: string,
  username: string,
  photo: File,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.USER_LOADING));
  authRef
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(photo);
      if (photo.name) {
        let formData = new FormData();
        formData.append('image', photo);
        Http.post('/3/image', formData).then((res) => {
          authRef.currentUser
            .updateProfile({
              photoURL: res.data.link,
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
        });
      } else {
        authRef.currentUser
          .updateProfile({
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
      }
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

export const uploadPhoto = (
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

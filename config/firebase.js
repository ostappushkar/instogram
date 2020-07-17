import * as firebase from 'firebase';
import 'firebase/auth';
import Config from 'react-native-config';
const config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const persistance = firebase.auth.Auth.Persistence.LOCAL;
export const authRef = firebase.auth();
export const storageRef = firebase.storage().ref();
export const databaseRef = firebase.database().ref();
export const postsRef = databaseRef.child('posts');

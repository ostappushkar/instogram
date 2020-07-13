import * as firebase from 'firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
import 'firebase/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_ID,
  FIREBASE_WEB_ID,
} from 'react-native-dotenv';
const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const persistance = firebase.auth.Auth.Persistence.LOCAL;
export const authRef = firebase.auth();
export const storageRef = firebase.storage().ref();
export const databaseRef = firebase.database().ref();
export const postsRef = databaseRef.child('posts');

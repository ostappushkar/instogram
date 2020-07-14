import action from '../actions';
import actionTypes from './actionTypes';
import {formatDistanceStrict, formatDistance} from 'date-fns';
import {postsRef, storageRef} from '../../../config/firebase';
import auth from '@react-native-firebase/auth';
import {IPost} from '../../interfaces/post';
export const getPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  postsRef.once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val();
      let posts = [];
      for (const post in postsSnap) {
        let comments = postsSnap[post].comments;
        comments.shift();
        if (comments.length > 0) {
          comments.forEach((comment) => {
            if (comment.date) {
              comment.date = formatDistanceStrict(Date.now(), comment.date, {
                addSuffix: false,
              });
            }
          });
        }
        let liked = postsSnap[post].liked;
        liked.shift();
        posts.unshift({
          id: post,
          authorId: postsSnap[post].authorId,
          imageUrl: postsSnap[post].imageUrl,
          likes: postsSnap[post].likes,
          userName: postsSnap[post].userName,
          avatar: postsSnap[post].avatar,
          description: postsSnap[post].description,
          liked: liked,
          comments: comments,
          createdAt: formatDistance(Date.now(), postsSnap[post].createdAt, {
            addSuffix: true,
            includeSeconds: true,
          }),
        });
      }
      dispatch(
        action(actionTypes.GET_POSTS_LOADED, {
          posts: posts,
          newPostsAvailable: false,
        }),
      );
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, {error: e}));
      console.warn(e);
    },
  );
};
export const getCurrentPost = (postId: string) => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  postsRef.child(postId).once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let post = snapshot.val();
      post.createdAt = formatDistance(Date.now(), post.createdAt, {
        addSuffix: true,
        includeSeconds: true,
      });
      let comments = post.comments;
      comments.shift();
      if (comments.length > 0) {
        comments.forEach((comment) => {
          if (comment.date) {
            comment.date = formatDistanceStrict(Date.now(), comment.date, {
              addSuffix: false,
            });
          }
        });
      }
      let liked = post.liked;
      liked.shift();
      post = {
        ...post,
        id: postId,
        comments: comments,
        liked: liked,
      };
      console.log(post);
      dispatch(action(actionTypes.GET_CURRENT_POST, {post: post}));
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, {error: e}));
      console.warn(e);
    },
  );
};
export const postsWatcher = () => (dispatch) => {
  postsRef.on('child_added', (snapshot) => {
    if (snapshot.val().authorId !== auth().currentUser?.uid) {
      dispatch(
        action(actionTypes.NEW_POSTS_AVAILABLE, {newPostId: snapshot.key}),
      ),
        (e) => {
          dispatch(action(actionTypes.LOADING_ERROR, null, {error: e}));
        };
    } else {
      getPosts()(dispatch);
    }
  });
};
export const getUserPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  postsRef.once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val();

      let posts = [];
      for (const post in postsSnap) {
        if (postsSnap[post].authorId === auth().currentUser.uid) {
          let comments = postsSnap[post].comments;
          if (comments.length > 1) {
            comments.forEach((comment) => {
              if (comment.date) {
                comment.date = formatDistanceStrict(Date.now(), comment.date, {
                  addSuffix: false,
                });
              }
            });
          }
          posts.unshift({
            id: post,
            liked: postsSnap[post].liked,
            authorId: postsSnap[post].authorId,
            imageUrl: postsSnap[post].imageUrl,
            likes: postsSnap[post].likes,
            userName: postsSnap[post].userName,
            avatar: postsSnap[post].avatar,
            description: postsSnap[post].description,
            comments: comments,
            createdAt: formatDistance(Date.now(), postsSnap[post].createdAt, {
              addSuffix: true,
              includeSeconds: true,
            }),
          });
        }
      }
      dispatch(action(actionTypes.GET_USER_POSTS_LOADED, {posts: posts}));
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, {error: e}));
      console.warn(e);
    },
  );
};
interface IPostValues {
  photo: string;
  fileName: string;
  description: string;
}
export const addPost = (
  values: IPostValues,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.ADD_POST_LOADING));

  postsRef
    .push({
      authorId: auth().currentUser.uid,
      imageUrl: 'data:image/jpeg;base64,' + values.photo,
      userName: auth().currentUser.displayName,
      avatar: auth().currentUser.photoURL,
      description: values.description,
      comments: [''],
      liked: [''],
      createdAt: Date.now(),
    })
    .then(() => {
      dispatch(action(actionTypes.POST_ADDED));
      successCallback();
    })
    .catch((e) => {
      const {message} = e;
      dispatch(action(actionTypes.POST_ADDED));
      errorCallback(message);
    });
};

export const setLike = (
  postId: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  if (auth().currentUser) {
    postsRef
      .child(postId)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        let likedArr: string[] = snapshot.val().liked;
        if (likedArr.includes(auth().currentUser.uid)) {
          let index = likedArr.indexOf(auth().currentUser.uid);
          likedArr.splice(index, 1);
          console.log('unliked');
        } else {
          likedArr.push(auth().currentUser.uid);
          console.log('liked');
        }
        postsRef.child(postId).update({liked: likedArr}, (e) => {
          likedArr.shift();
          dispatch(
            action(actionTypes.SET_LIKE, {liked: likedArr, postId: postId}),
          );
          if (e) {
            console.warn(e);
          }
        });
        successCallback();
      })
      .catch((e) => {
        console.warn(e);
      });
  } else {
    errorCallback('Not logged in');
  }
};

export const addComment = (
  postId: string,
  comment: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  if (auth().currentUser) {
    postsRef
      .child(postId)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        let commentsArr = snapshot.val().comments;
        commentsArr.push({
          user: auth().currentUser.displayName,
          comment: comment,
          date: Date.now(),
        });
        postsRef.child(postId).update({comments: commentsArr}, (e) => {
          if (commentsArr.length > 1) {
            commentsArr.forEach((comment) => {
              if (comment.date) {
                comment.date = formatDistanceStrict(Date.now(), comment.date, {
                  addSuffix: false,
                });
              }
            });
          }
          dispatch(
            action(actionTypes.ADD_COMMENT, {
              comments: commentsArr,
              postId: postId,
            }),
          );
          if (e) {
            console.warn(e);
          }
        });
        successCallback();
      })
      .catch((e) => {
        console.warn(e);
      });
  } else {
    errorCallback('Not logged in');
  }
};
export const deletePost = (
  post: IPost,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  if (post.authorId === auth().currentUser.uid) {
    postsRef
      .child(post.id)
      .remove()
      .then(() => {
        dispatch(action(actionTypes.DELETE_POST, {postId: post.id}));
        successCallback();
      })
      .catch((e) => {
        const {message} = e;
        console.warn(e);
        errorCallback(message);
      });
  }
};

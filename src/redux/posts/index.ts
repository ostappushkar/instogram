import actionTypes from './actionTypes';
import {IPostState, IDispatchAction} from '../../interfaces/store';

export const postsState: IPostState = {
  loading: false,
  posts: [],
  error: null,
  userPosts: [],
  addLoading: false,
  newPostsAvailable: false,
  currentPost: null,
};

const reducer = (state = postsState, action: IDispatchAction) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_POSTS_LOADED:
      return {
        ...state,
        loading: false,
        posts: action.payload.data.posts,
        newPostsAvailable: false,
      };
    case actionTypes.GET_USER_POSTS_LOADED:
      return {...state, loading: false, userPosts: action.payload.data.posts};
    case actionTypes.LOADING_ERROR:
      return {...state, loading: false, error: action.payload.error.error};
    case actionTypes.ADD_POST_LOADING:
      return {...state, addLoading: true};
    case actionTypes.POST_ADDED:
      return {...state, addLoading: false};
    case actionTypes.NEW_POSTS_AVAILABLE:
      if (state?.posts[0]?.id === action.payload.data.newPostId) {
        return {...state, newPostsAvailable: false};
      } else {
        return {...state, newPostsAvailable: true};
      }
    case actionTypes.GET_CURRENT_POST:
      return {...state, loading: false, currentPost: action.payload.data.post};
    case actionTypes.SET_LIKE: {
      let posts = state.posts;
      let userPosts = state.userPosts;
      let userPostsIndex = userPosts.findIndex(
        (post) => post.id === action.payload.data.postId,
      );
      let postIndex = posts.findIndex(
        (post) => post.id === action.payload.data.postId,
      );
      posts[postIndex] = {
        ...posts[postIndex],
        liked: action.payload.data.liked,
      };
      userPosts[userPostsIndex] = {
        ...userPosts[userPostsIndex],
        liked: action.payload.data.liked,
      };
      let currentPost = state.currentPost;
      if (currentPost?.id === action.payload.data.postId) {
        currentPost = {
          ...currentPost,
          liked: action.payload.data.liked,
        };
      }
      return {
        ...state,
        posts: [...posts],
        userPosts: [...userPosts],
        currentPost: currentPost,
      };
    }
    case actionTypes.ADD_COMMENT: {
      const posts = [...state.posts];
      let postIndex = posts.findIndex(
        (post) => post.id === action.payload.data.postId,
      );
      let userPosts = state.userPosts;
      let userPostsIndex = userPosts.findIndex(
        (post) => post.id === action.payload.data.postId,
      );
      posts[postIndex] = {
        ...posts[postIndex],
        comments: action.payload.data.comments,
      };
      userPosts[userPostsIndex] = {
        ...userPosts[userPostsIndex],
        comments: action.payload.data.comments,
      };
      let currentPost = state.currentPost;
      if (currentPost?.id === action.payload.data.postId) {
        currentPost = {
          ...currentPost,
          comments: action.payload.data.comments,
        };
      }
      return {
        ...state,
        posts: [...posts],
        userPosts: [...userPosts],
        currentPost: currentPost,
      };
    }
    case actionTypes.DELETE_POST: {
      let posts = [...state.posts];
      let postIndex = posts.findIndex(
        (post) => post.id === action.payload.data.postId,
      );
      posts.splice(postIndex, 1);
      console.log(posts);
      return {...state, posts: [...posts]};
    }
    default:
      return state;
  }
};
export default reducer;

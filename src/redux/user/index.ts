import actionTypes from './actionTypes'
import { ILoginState, IDispatchAction } from '../../interfaces/store/'

const loginState: ILoginState = {
  isLogged: false,
  currentUser: null,
  userLoading: false,
}

const loginReducer = (state = loginState, action: IDispatchAction): ILoginState => {
  switch (action.type) {
    case actionTypes.GET_USER:
      if (
        Object.is(state.currentUser, action.payload.data.currentUser) &&
        state.isLogged === action.payload.data.isLogged
      ) {
        return state
      } else {
        return {
          ...state,
          userLoading: false,
          isLogged: action.payload.data.isLogged,
          currentUser: action.payload.data.currentUser,
        }
      }
    case actionTypes.USER_LOADING:
      return {
        ...state,
        userLoading: true,
      }
    case actionTypes.USER_LOADED:
      let user = state.currentUser
      user = {
        ...user,
        photoURL: action.payload.data?.photoURL,
      }
      return {
        ...state,
        userLoading: false,
        currentUser: user,
      }
    default:
      return state
  }
}
export default loginReducer

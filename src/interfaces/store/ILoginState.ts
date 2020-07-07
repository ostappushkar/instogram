export default interface ILoginState {
  isLogged: boolean;
  currentUser: firebase.User;
  userLoading: boolean;
}

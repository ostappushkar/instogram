import ILoginState from "./ILoginState";
import IPostsState from "./IPostState";

export default interface IStoreState {
  login: ILoginState;
  posts: IPostsState;
}

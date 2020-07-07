import { IComment } from ".";

export default interface IPost {
  id: string;
  imageUrl: string;
  likes: number;
  userName: string;
  avatar: string;
  description: string;
  comments: Array<IComment>;
  createdAt: string;
  authorId: string;
  liked: Array<string>;
}

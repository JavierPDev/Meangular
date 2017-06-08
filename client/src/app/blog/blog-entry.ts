import { User } from '../user/user';
import { Comment } from './comment';

export class BlogEntry {
  public title: string;
  public content: string;
  public user?: User;
  public created?: Date;
  public _id?: string;
  public comments?: Array<Comment>;
}
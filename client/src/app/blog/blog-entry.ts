import { User } from '../user/user';

export class BlogEntry {
  public title: string;
  public content: string;
  public user?: User;
  public _id?: string;
}

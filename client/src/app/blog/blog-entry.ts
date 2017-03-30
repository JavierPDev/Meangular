import { User } from '../user/user';

export class BlogEntry {
  public title: string;
  public content: string;
  public user?: User;
  public created?: Date;
  public _id?: string;
}

import { User } from '../user/user';

export class Comment {
  public user?: User;
  public created?: Date;
  public _id?: string;

  constructor(public content: string) {}
}

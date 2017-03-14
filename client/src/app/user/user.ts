export class User {
  public email: string;
  public password?: string;
  public confirmPassword?: string;
  public token: string;
  public roles: string[];
  public oauth?: string;
  public profile: Object = {
    name: ''
  }
}

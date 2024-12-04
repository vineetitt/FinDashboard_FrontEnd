export interface IUser {
    userID: number; 
    username: string;
    email: string; 
  }
  
  export interface ILoginResponse {
    token: string | any; 
    user: IUser;
  }
  
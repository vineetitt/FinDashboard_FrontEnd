export interface IUser {
    userID: number; 
    username: string;
    email: string; 
    role:string;
  }
  
  export interface ILoginResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    token: string | any; 
    user: IUser;
  }
  
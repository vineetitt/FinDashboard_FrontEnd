import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://localhost:7217/api/Users";

const signUpUser = async (
  userName: string,
  email: string,
  hashPassword: string
) => {
  try 
  {
    const response = await axios.post(BASE_URL, {
      userName,
      email,
      hashPassword,
    });
    if (response.status === 200)
    {
      toast.success("User successfully added!");
    }
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) 
  {
    throw new Error(error.message)  
  }
};

export default signUpUser;



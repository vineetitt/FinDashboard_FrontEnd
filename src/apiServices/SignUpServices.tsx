/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;
const signUpUser = async (
  userName: string,
  email: string,
  hashPassword: string
) => {
  try {
    const response = await axios.post(`${apiUrl}/Users`, {
      userName,
      email,
      hashPassword,
    });
    if (response.status === 200) {
      toast.success("User successfully added!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default signUpUser;

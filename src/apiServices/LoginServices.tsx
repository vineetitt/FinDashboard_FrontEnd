import axios from "axios";
import { toast } from "react-toastify";
import { ILoginResponse } from "../utils/interface/ILogin";

const apiUrl  = import.meta.env.VITE_API_URL;
const loginUser = async (Email: string, Password: string):Promise<ILoginResponse | undefined> =>{ 
    try
    {
        const response = await axios.post(`${apiUrl}/Users/Login`, {Email, Password});        
        if(response.status === 200)
        {
            toast.success('Login Successful');
            return response.data;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any)
    {
        toast.error(error.response.data);
    }
    
}

export default loginUser;
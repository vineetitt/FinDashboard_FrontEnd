import axios from "axios";
import { toast } from "react-toastify";
import { ILoginResponse } from "../utils/interface/ILogin";

const Base_URL = 'https://localhost:7217/api/Users/Login';
const loginUser = async (Email: string, Password: string):Promise<ILoginResponse | undefined> =>{ 
    try
    {
        const response = await axios.post(`${Base_URL}`, {Email, Password});        
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
import axios from "axios";
import { toast } from "react-toastify";

const Base_URL = 'https://localhost:7217/api/Users/Login';
const loginUser = async (Email: string, Password: string)=>{ 
    try
    {
        const response = await axios.post(`${Base_URL}`, {Email, Password});
        if(response.status === 200)
        {
            toast.success('Login Successful');
            return response;
        }

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any)
    {
        toast.error(`${error.response.data}`);
        console.log(error.response.data);
    }
    
}

export default loginUser;
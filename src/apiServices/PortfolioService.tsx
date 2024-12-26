import axios from "axios";

const fetchPortfolioData= async (userID:number,token: string )=>{
    const apiUrl = import.meta.env.VITE_API_URL
    try
    {
        const response = await axios.get(`${apiUrl}/Portfolio/`, {
            params: {userID},
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any)
    {
        throw new Error(error.message);
    }

}
export default fetchPortfolioData;
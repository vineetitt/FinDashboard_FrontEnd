import axios from "axios";

const fetchPortfolioData= async (userID:number,token: string )=>{
    try
    {
       
        const response = await axios.get(`https://localhost:7217/api/Portfolio/`, {
            params: {userID},
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Check it out!", response.data);
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any)
    {
        throw new Error(error.message);
    }

}
export default fetchPortfolioData;
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
        console.log(response.data);
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any)
    {
        console.log(error.message);
    }

}
export default fetchPortfolioData;
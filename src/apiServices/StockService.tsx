import axios from "axios"

const getAllStock = async (token: string|null)=>{
    try
    {
        const response = await axios.get(`https://localhost:7217/api/Stock`,{
        headers:{
            Authorization: `Bearer ${token}`
        }

    });
    console.log(response.data);
    return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export default getAllStock;
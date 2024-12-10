import axios from "axios"
import { toast } from "react-toastify"

const deleteStock = async (id: number)=>{
    console.log("id ", id)
    try{
        const response = await axios.delete(`https://localhost:7217/api/Stock/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        console.log("hello",response)
        toast.success("Deleted Successfully");
        return response;
    }
    catch(error){
        console.error(error)
    }	
    
    
}

export default deleteStock;
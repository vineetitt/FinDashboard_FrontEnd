import axios from "axios"
import { toast } from "react-toastify"

const deleteStock = async (id: number)=>{
    const apiUrl = import.meta.env.VITE_API_URL;
    try{
        const response = await axios.delete(`${apiUrl}/Stock/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        toast.success("Deleted Successfully");
        return response;
    }
    catch(error){
        console.error(error)
    }	
    
    
}

export default deleteStock;
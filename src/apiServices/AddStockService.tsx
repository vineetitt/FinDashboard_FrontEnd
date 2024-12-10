import axios from "axios"
import { toast } from "react-toastify";

const AddStock = async(stockName: string, quantity:number)=>{
    try{
        const response = await axios.post(`https://localhost:7217/api/Stock`, {
            stockName,
            quantity,
          }, 
          {
            headers: 
            {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            }
          })
          toast.success("Added Successfully");
        console.log(response);
    }
    catch(error){
        console.error(error)
    }
}
export default AddStock;
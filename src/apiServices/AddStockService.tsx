import axios from "axios"
import { toast } from "react-toastify";

const AddStock = async(stockName: string, quantity:number)=>{
    if(!stockName || !quantity) throw new Error("enter valid stock name and quantity");
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
          return response;
    }
    catch(error){
        console.error(error)
    }
}
export default AddStock;
/* eslint-disable no-useless-catch */
import axios from "axios"
const token = localStorage.getItem("jwt");
const BuyHolding = async (stockID: number , currentPrice: number, stockSymbol: string, userID:number, quantity: number)=>{
    try
    {
        if(quantity==0){
            throw new Error("Quantity cannot be zero");
        }
        const response  = await axios.post(`https://localhost:7217/api/Holding`,  {userId:userID,  stockId: stockID, quantity: quantity},{
            
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
    catch(error ){
        throw error;
    }
   
}
export default BuyHolding;
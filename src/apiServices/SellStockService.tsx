import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("jwt");
console.log(token);
const handleSellStock = async (
  stockId: number,
  quantity: number,
  userId: number
) => {
  try {
    if(quantity>0){
    const response = await axios.delete("https://localhost:7217/api/Holding", {
      data: {
        userId,
        stockId,
        quantity,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  }
  else{
    toast.error("Quantity cannot be zero");
  }
 }
  catch (error) {
    console.log(error);
  }
};

export default handleSellStock;

import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("jwt");
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
  const message = axios.isAxiosError(error) 
      ? error.response?.data || "An unexpected error occurred." 
      : "An error occurred.";
  toast.error(message);
}
};

export default handleSellStock;

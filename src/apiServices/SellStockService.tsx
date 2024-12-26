import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("jwt");
const apiUrl = import.meta.env.VITE_API_URL
const handleSellStock = async (
  stockId: number,
  quantity: number,
  userId: number
) => {
  try {
    if(quantity>0){
    const response = await axios.delete(`${apiUrl}/Holding`, {
      data: {
        userId,
        stockId,
        quantity,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
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

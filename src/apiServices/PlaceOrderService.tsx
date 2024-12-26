/* eslint-disable no-useless-catch */
import axios from "axios";
import { Asset } from "../utils/interface/IAssets";
import { toast } from "react-toastify";


const BuyHolding = async (
  stockID: number,
  userID: number,
  quantity: number,
  assets: Asset[]
) => {
  try {
    const stock = assets.filter((item) => item.stockID === stockID);
    if (stock[0].quantity < quantity) {
      toast.error("Low stock cannot intitiate purchase ");
      return null;
    } else if (quantity == 0) {
      throw new Error("Quantity cannot be zero");
    } else {
      const token = localStorage.getItem("jwt");
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${apiUrl}/Holding`,
        { userId: userID, stockId: stockID, quantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    throw error;
  }
};
export default BuyHolding;

/* eslint-disable no-useless-catch */
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const getAllStock = async (token: string | null) => {
  if (!token) throw new Error("Authorization token is missing");
  try {
    const response = await axios.get(`${apiUrl}/Stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export default getAllStock;

export const getStockPriceHistory = async (stockId: number, token: string) => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const response = await axios.get(`${apiUrl}/StockPriceHistory`, {
      params: {
        stockID: stockId,
        date: today,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

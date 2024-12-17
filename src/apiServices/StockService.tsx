/* eslint-disable no-useless-catch */
import axios from "axios"

const getAllStock = async (token: string|null)=>{
    try
    {
        const response = await axios.get(`https://localhost:7217/api/Stock`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
    }
    catch(err){
        throw err;
    }
}
export default getAllStock;

export const getStockPriceHistory = async (stockId: number, token: string) => {
    const today = new Date().toISOString().split("T")[0];
    try {
        const response = await axios.get(`https://localhost:7217/api/StockPriceHistory`, {
            params: {
                stockID: stockId,
                date: today,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (err) {
        throw err; 
    }
};
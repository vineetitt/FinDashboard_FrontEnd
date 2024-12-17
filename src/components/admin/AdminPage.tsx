/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import AddStockForm from "./AddStockForm";
import StockList, { Stock } from "./StockList";
import getAllStock from "../../apiServices/StockService";
import deleteStock from "../../apiServices/DeleteStock";
import AddStock from "../../apiServices/AddStockService";
import { stockContext } from "../../context/StockContext";

const AdminPage: React.FC = () => {
const[stocks, setStocks] = useState<Stock[]>([]);

  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const fetchStock = async ()=>{
        try 
        {
            const response: Stock[] = await getAllStock(token);
            setStocks(response);
        } 
        catch (error)
        {
            console.error("Error fetching stock:", error);
        }
    }
    fetchStock();
  },[token]);

    const { assets } = useContext(stockContext);
    useEffect(() => {
      setStocks(assets);
    }, [assets]);
  

  const handleAddStock = async (name:string, quantity: number) => {
    const response = await AddStock(name, quantity);
  };

  const handleDeleteStock = async(id:number) => {
    const response= await deleteStock(id);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Stock Management</h1>
        <AddStockForm onAdd={handleAddStock} />
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Stock List</h2>
          <StockList stocks={stocks} onDelete={handleDeleteStock} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

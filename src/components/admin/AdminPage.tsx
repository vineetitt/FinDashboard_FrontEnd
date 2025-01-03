/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import AddStockForm from "./AddStockForm";
import StockList, { Stock } from "./StockList";
import getAllStock from "../../apiServices/StockService";
import deleteStock from "../../apiServices/DeleteStock";
import AddStock from "../../apiServices/AddStockService";
import { stockContext } from "../../context/StockContext";
import { Asset } from "../../utils/interface/IAssets";

const AdminPage: React.FC = () => {
  const { assets, setAssets, updateAssetQuantity } = useContext(stockContext);

  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await getAllStock(token);
        setAssets(response);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };
    fetchStock();
  }, [setAssets]);

  const handleAddStock = async (name: string, quantity: number) => {
    const existingStock: Asset | undefined = assets.find(
      (asset) => asset.stockName === name
    );

    if (!existingStock) {
      await AddStock(name, quantity);
      const responseData = await getAllStock(token);
      setAssets(responseData);
      return;
    }
    if (existingStock?.stockID > 0 && quantity > 0) {
      updateAssetQuantity(
        existingStock.stockID,
        existingStock.quantity + quantity
      );
    }
  };

  const handleDeleteStock = async (id: number) => {
    await deleteStock(id);
    const responseData = await getAllStock(token);
    setAssets(responseData);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Stock Management</h1>
        <AddStockForm onAdd={handleAddStock} />
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Stock List</h2>
          <StockList stocks={assets} onDelete={handleDeleteStock} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

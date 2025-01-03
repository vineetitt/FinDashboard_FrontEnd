import React, { useContext, useEffect, useState } from "react";
import StockCard from "./StockCard";
import axios from "axios";
import { stockContext } from "../../context/StockContext";

export interface Stock {
  stockID: number;
  stockName: string;
  quantity: number;
  currentPrice: number;
}

type StockListProps = {
  stocks: Stock[];
  onDelete: (id: number) => void;
};

const StockList: React.FC<StockListProps> = ({ stocks, onDelete }) => {
  const [holdingStockIDs, setHoldingIDs] = useState<number[]>([]);
  const { assets } = useContext(stockContext);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    axios
      .get("https://localhost:7217/api/Holding", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const stockIDs = response.data.map(
          (holding: { stockID: number }) => holding.stockID
        );
        setHoldingIDs(stockIDs);
      })
      .catch((error) => {
        console.error(
          "Error fetching holdings:",
          error.response || error.message
        );
      });
  }, [assets]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <StockCard
          key={stock.stockID}
          id={stock.stockID}
          name={stock.stockName}
          quantity={stock.quantity}
          value={stock.currentPrice}
          onDelete={onDelete}
          isDisabled={holdingStockIDs.includes(stock.stockID)}
        />
      ))}
    </div>
  );
};

export default StockList;

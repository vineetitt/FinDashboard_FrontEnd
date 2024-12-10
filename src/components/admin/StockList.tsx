import React from "react";
import StockCard from "./StockCard";

export type Stock = {
  stockID: number;
  stockName: string;
  quantity: number;
  currentPrice: number;
};

type StockListProps = {
  stocks: Stock[];
  onDelete: (id: number) => void;
};

const StockList: React.FC<StockListProps> = ({ stocks, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <StockCard
          key={stock.stockID}
          id= {stock.stockID}
          name={stock.stockName}
          quantity={stock.quantity}
          value={stock.currentPrice}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StockList;

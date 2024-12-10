// src/components/StockCard.tsx
import React from "react";

type StockCardProps = {
  id:number;
  name: string;
  quantity: number;
  value: number;
  onDelete: (id: number) => void;
};

const StockCard: React.FC<StockCardProps> = ({ id,name, quantity, value, onDelete }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-bold">{name}</h3>
        <p>Quantity: {quantity}</p>
        <p>Value: ${value}</p>
      </div>
      <button
        onClick={()=>onDelete(id)}
        className="bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default StockCard;

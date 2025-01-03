import React from "react";

type StockCardProps = {
  id: number;
  name: string;
  quantity: number;
  value: number;
  onDelete: (id: number) => void;
  isDisabled: boolean;
};

const StockCard: React.FC<StockCardProps> = ({
  id,
  name,
  quantity,
  value,
  onDelete,
  isDisabled,
}) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-bold">{name}</h3>
        <p>Units: {quantity}</p>
        <p>Value: ${value}</p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className={`py-1 px-3 rounded-md ${
          isDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-red-500 text-white"
        }`}
        disabled={isDisabled}
      >
        Delete
      </button>
    </div>
  );
};

export default StockCard;

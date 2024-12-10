import React, { useState } from "react";

type AddStockFormProps = {
  onAdd: (name: string, quantity: number) => void;
};

const AddStockForm: React.FC<AddStockFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">(""); 

  const handleSubmit = () => {
    if (!name || quantity === "" || quantity <= 0) {
      alert("Please provide valid stock details.");
      return;
    }
    onAdd(name, Number(quantity)); 
    setName("");
    setQuantity("");
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Stock Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity === "" ? "" : quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={handleSubmit} 
        className="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Add Stock
      </button>
    </div>
  );
};

export default AddStockForm;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import BuyHolding from "../apiServices/PlaceOrderService";

const PlaceOrder: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stockIDParam = searchParams.get("stockID");
  const percentageChange = searchParams.get("percentage");
  console.log(percentageChange);
  const stockID =
    stockIDParam !== null && !isNaN(parseInt(stockIDParam, 10))
      ? parseInt(stockIDParam, 10)
      : 0;
  const currentPrice = searchParams.get("currentPrice")
    ? parseInt(searchParams.get("currentPrice") as string, 10)
    : 0;
  const stockSymbol = searchParams.get("stockSymbol");
  const userID = searchParams.get("userID");

  console.log("Stock ID:", stockID);
  console.log("User ID:", userID);

  const [quantity, setQuantity] = useState(0);
  const totalAmount = quantity * currentPrice;

  const handlePlaceOrder = async () => {
    try
    {
      const data = await BuyHolding(
        stockID || 0,
        currentPrice,
        stockSymbol ?? "stockSymbol",
        user?.userID || 0,
        quantity
      );
      if (data) 
        {
            toast.success("Added");
            navigate("/Portfolio");
        }
    }
    catch(err:any)
    {
      toast.error(err.message);
    }
    
   
    
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{`Place Order for ${stockSymbol}`}</h1>
      <div className="w-full max-w-sm">
        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="0"
        />
        <div className="text-lg font-bold mb-4">{`Total Amount: $${totalAmount.toFixed(
          2
        )}`}</div>
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
import React, {useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import handleSellStock from '../apiServices/SellStockService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SellHolding:React.FC = () => {
  const { stockName, currentPrice, stockId } = useParams<{ stockName: string ; currentPrice: string, stockId: string}>();
  const currentPriceNumber = parseFloat(currentPrice || "0");
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
    calculateTotalAmount(value);
  };

  const calculateTotalAmount = (quantity: number) => {
    setTotalAmount(quantity * currentPriceNumber);
  };
  const handleSell = async() => {
    try
    {
        const stockIdNumber = Number(stockId);
        const response = await handleSellStock(stockIdNumber, quantity, user?.userID ?? 0)
        if(response===200)
        {
            toast.success("Successfully sold out");
            navigate("/Holdings");
        }
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
  };
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Sell Stock</h1>
          <div className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto">
            <h2 className="text-xl font-semibold mb-4">{stockName}</h2>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
                min="1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalAmount" className="block text-sm font-medium">Total Amount:</label>
              <div className="mt-2 text-lg font-semibold">${totalAmount.toFixed(2)}</div>
            </div>
            <button
              onClick={handleSell}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
            >
              Sell
            </button>
          </div>
        </div>
  );
}

export default SellHolding;
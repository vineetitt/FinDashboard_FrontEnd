import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const PlaceOrder: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    const { stockID, currentPrice, stockSymbol, userID } = location.state || {
        stockID: '',
        currentPrice: 0,
        stockSymbol: '',
        userID: '',
    };
    const [quantity, setQuantity] = useState(0);
    const totalAmount = quantity * currentPrice;

    const handlePlaceOrder = () => {
        console.log(`Placing order:`);
        console.log(`UserID: ${userID}`);
        console.log(`StockID: ${stockID}`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Total Amount: ${totalAmount}`);

        alert(`Order placed for ${quantity} shares of ${stockSymbol} by User ${user?.username}!`);
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
                <div className="text-lg font-bold mb-4">{`Total Amount: $${totalAmount.toFixed(2)}`}</div>
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

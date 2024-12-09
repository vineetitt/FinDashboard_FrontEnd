import React, { useEffect, useState } from "react";
import { HoldingAsset } from "../utils/interface/IAssets";
import fetchPortfolioData from "../apiServices/PortfolioService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Holdings: React.FC = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("jwt");
  const [assets, setAssets] = useState<HoldingAsset[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPortfolioData(user?.userID ?? 0, token!);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedAssets = data.holdings.map((holding: any) => ({
          stockID: holding.stock.stockID,
          stockName: holding.stock.stockName,
          quantity: holding.quantity,
          purchasePrice: holding.purchasePrice.toFixed(2),
          currentPrice: holding.stock.currentPrice.toFixed(2),
          totalValue: (holding.quantity * holding.stock.currentPrice).toFixed(
            2
          ),
        }));
        setAssets(transformedAssets);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user?.userID, token]);


  const handleSelling = (stockName: string, currentPrice: string, stockID: string)=>{
    navigate(`/SellHolding/${stockName}/${currentPrice}/ ${stockID}`);
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Assets</h1>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Stock Name</th>
            <th className="py-2 px-4 text-left">Quantity</th>
            <th className="py-2 px-4 text-left">Purchase Price</th>
            <th className="py-2 px-4 text-left">Current Price</th>
            <th className="py-2 px-4 text-left">Total Value</th>
            <th className="py-2 px-4 text-left">Trend</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset, index) => {
              const isPriceUp = asset.currentPrice > asset.purchasePrice;
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="py-2 px-4">{asset.stockName}</td>
                  <td className="py-2 px-4">{asset.quantity}</td>
                  <td className="py-2 px-4">${asset.purchasePrice}</td>
                  <td className="py-2 px-4">${asset.currentPrice}</td>
                  <td className="py-2 px-4">${asset.totalValue}</td>
                  <td className="py-2 px-4">
                    {isPriceUp ? (
                      <span className="text-green-500 font-bold flex items-center">
                        ▲
                        <span className="ml-1">Up</span>
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold flex items-center">
                        ▼
                        <span className="ml-1">Down</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600" onClick={
                      ()=>{
                        handleSelling(asset.stockName, asset.currentPrice, asset.stockID.toString())
                      }
                    }>
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-4 px-4 text-center" colSpan={7}>
                No assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;

import React, { useEffect, useState } from "react";
import AssetRow from "../components/AssetRow";
import getAllStock from "../apiServices/StockService";

interface Asset
{
  stockName: string;
  currentPrice: number;
  closePrice: number;
}
const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  
  useEffect(()=>{
    const LoadStockList = async ()=>{
      try
      {
        const token = localStorage.getItem('jwt');
        const response = await getAllStock(token);
        if(response && Array.isArray(response))
        setAssets(response);
      }
      catch(err)
      {
        console.error(err);
      }
    }
    LoadStockList();
  },[])

  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-1">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div>
        {assets.map((asset, index) =>{
          const percentageChange =(( asset.currentPrice - asset.closePrice)/asset.closePrice ) * 100;
          return (
          <AssetRow
            key={index}
            name={asset.stockName}
            // currentValue={asset.currentPrice}
            // previousClose={asset.closePrice}
            percentageChange={percentageChange}
          />
        )})}
      </div>
    </div>
  );
};

export default AssetList;

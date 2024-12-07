import React, { useContext, useEffect,} from "react";
import AssetRow from "../components/AssetRow";
import getAllStock from "../apiServices/StockService";
import { stockContext } from "../context/StockContext";

const AssetList: React.FC = () => {
  const {assets, setAssets} = useContext(stockContext);
  
  useEffect(()=>{
    const LoadStockList = async ()=>{
      try
      {
        const token = localStorage.getItem('jwt');
        const response = await getAllStock(token);
        if(response && Array.isArray(response))
        {
          setAssets(response);
        }

      }
      catch(err)
      {
        console.error(err);
      }
    }
    LoadStockList();
  },[])

  useEffect(() => {
    console.log("Assets have been updated:", assets);
  }, [setAssets])

  
  return (
    <stockContext.Provider value={{assets,setAssets}}>
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-1">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div>
        {assets?.length  ? (assets?.map((asset, index) =>{
          const percentageChange =(( asset.currentPrice - asset.closePrice)/asset.closePrice ) * 100;
          return (
          <AssetRow
            key={index}
            name={asset.stockName}
            percentageChange={percentageChange}
          />
        )})):''}
      </div>
    </div>
    </stockContext.Provider>
  );
};

export default AssetList;


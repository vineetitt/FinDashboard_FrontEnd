import React, { createContext, useEffect, useState } from "react";
import { Asset } from "../utils/interface/IAssets";
import getAllStock from "../apiServices/StockService";

type StockContextType ={
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  updateAssetPrice: (updatedStock: Asset) => void;
  updateAssetQuantity: (stockID: number, quantity:number) => void; 
}

export const stockContext = createContext<StockContextType >({
  assets:[],
  setAssets: () => {},
  updateAssetPrice: () => {},
  updateAssetQuantity: ()=>{}
});

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [assets, setAssets] = useState<Asset[]>([]);

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
  
  const updateAssetPrice = (updatedStock: Asset) => {
    setAssets((prevAssets) => {
      if (!prevAssets) return prevAssets;
      return prevAssets.map((asset) =>
        asset.stockID === updatedStock.stockID ? {...asset, currentPrice: updatedStock.currentPrice} : asset
      );
    });
  };

  const updateAssetQuantity = (stockID: number, quantity: number) => {
    setAssets((prevAssets) => {
      
      if (!prevAssets || prevAssets.length === 0) {
        return prevAssets;
      }
      
      const updatedAssets = prevAssets.map((asset) =>{
        return asset.stockID === stockID
          ? { ...asset, quantity: quantity}
          : asset
      }
      );
      return updatedAssets;
    });
  };
  return (
    <stockContext.Provider value={{ assets, setAssets , updateAssetPrice, updateAssetQuantity}}>
      {children}
    </stockContext.Provider>
  );
};

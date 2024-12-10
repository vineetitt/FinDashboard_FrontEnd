import React, { createContext, useState } from "react";
import { Asset } from "../utils/interface/IAssets";


interface StockContextType {
  assets: Asset[] | undefined;
  setAssets: React.Dispatch<React.SetStateAction<Asset[] | undefined>>;
}

export const stockContext = createContext<StockContextType>({
  assets: undefined,
  setAssets: () => {},
});

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>();
  return (
    <stockContext.Provider value={{ assets, setAssets }}>
      {children}
    </stockContext.Provider>
  );
};

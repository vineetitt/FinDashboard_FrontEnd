import React, { useContext } from "react";
import AssetRow from "../components/AssetRow";
import { stockContext } from "../context/StockContext";

const AssetList: React.FC = () => {
  const { assets } = useContext(stockContext);
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-1">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div>
        {assets?.length
          ? assets?.map((asset, index) => {
              const percentageChange =
                ((asset.currentPrice - asset.closePrice) / asset.closePrice) *
                100;
              return (
                <AssetRow
                  key={index}
                  name={asset.stockName}
                  percentageChange={percentageChange}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default AssetList;

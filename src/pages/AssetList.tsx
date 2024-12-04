import React from "react";
import AssetRow from "../components/AssetRow";
const AssetList: React.FC = () => {
  const assets = [
    {
      name: "Meta Platforms, Inc. (META)",
      currentValue: 150,
      previousClose: 145,
    },
    { name: "Alphabet Inc. (GOOGL)", currentValue: 2800, previousClose: 2825 },
    { name: "Apple Inc. (AAPL)", currentValue: 175, previousClose: 175 },
    {
      name: "Meta Platforms, Inc. (META)",
      currentValue: 150,
      previousClose: 145,
    },
    {
      name: "Alphabet Inc. (GOOGL/GOOG)",
      currentValue: 2800,
      previousClose: 2825,
    },
    { name: "Apple Inc. (AAPL)", currentValue: 175, previousClose: 175 },
  ];
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-1">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div>
        {assets.map((asset, index) => (
          <AssetRow
            key={index}
            name={asset.name}
            currentValue={asset.currentValue}
            previousClose={asset.previousClose}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetList;

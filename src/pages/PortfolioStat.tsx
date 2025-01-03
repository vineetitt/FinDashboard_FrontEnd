import React from "react";
import { IPortfolioStatProps } from "../utils/interface/IPortfolioStatProps";

const PortfolioStat: React.FC<IPortfolioStatProps> = ({ title, value, beta, isProfitLoss }) => {
  const riskPercentage = beta !=null  ? Math.min(beta * 50, 100) : 0;

  const riskColor =
    riskPercentage <= 50
      ? "bg-green-500"
      : riskPercentage <= 75
      ? "bg-yellow-500"
      : "bg-red-500";

  const formattedValue =
    value !== null && value !== undefined
      ? `$${value.toLocaleString()}`
      : "N/A";

  const valueColor = isProfitLoss && value !== 'N/A' && Number(value) < 0 ? "text-red-600" : "text-green-600";

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className={`text-3xl mt-3 font-bold ${isProfitLoss ? valueColor : ""}`}>
      {formattedValue}
      </p>

      {beta !== undefined && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Portfolio Risk (Beta: {beta?.toFixed(2)})
          </label>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-full rounded-full ${riskColor}`}
              style={{ width: `${riskPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-gray-500">{`Risk Level: ${Math.round(
            riskPercentage
          )}%`}</p>
        </div>
      )}
      
    </div>
  );
};

export default PortfolioStat;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PortfolioPerformance from "./PortfolioPerformance";
import PortfolioStat from "./PortfolioStat";
import fetchPortfolioData from "../apiServices/PortfolioService";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Portfolio: React.FC = () => {
  const key = "Csosa8hr01qt3r34gusgcsosa8hr01qt3r34gut0";
  const { user } = useAuth();
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number | null>(
    null
  );
  const [netGainLoss, setNetGainLoss] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [portfolioBeta, setPortfolioBeta] = useState<number | null>(null);
  const apiKey = key;
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("User is not authenticated");

        const data = await fetchPortfolioData(user?.userID ?? 0, token);
        const transformedAssets = data.holdings.map((holding: any) => ({
          stockName: holding.stock.stockName,
          quantity: holding.quantity,
          purchasePrice: holding.purchasePrice.toFixed(2),
          totalValue: (holding.quantity * holding.stock.currentPrice).toFixed(
            2
          ),
        }));
        setAssets(transformedAssets);
        setTotalPortfolioValue(data.investedValue);
        setCurrentValue(data.currentValue);
        setNetGainLoss(data.profitLoss);

        const betaPromises = assets.map(async (asset) => {
          const response = await axios.get(
            "https://finnhub.io/api/v1/stock/metric",
            {
              params: { symbol: asset.stockName, metric: "all", token: apiKey },
            }
          );
          return { ...asset, beta: response.data.metric.beta || 0 };
        });
        const assetsWithBeta = await Promise.all(betaPromises);
        const portfolioBeta = assetsWithBeta.reduce((sum, asset) => {
          const totalValueNum = parseFloat(asset.totalValue);
          const weight =
            totalPortfolioValue && totalPortfolioValue > 0
              ? totalValueNum / totalPortfolioValue
              : 0;
          return sum + weight * asset.beta;
        }, 0);
        setPortfolioBeta(portfolioBeta);
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      }
    };
    loadPortfolioData();
  }, [user, totalPortfolioValue]);

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PortfolioStat
            title="Total Portfolio Value"
            value={totalPortfolioValue ?? 0}
            beta={portfolioBeta ?? undefined}
          ></PortfolioStat>
          <PortfolioStat
            title="Current Value"
            value={currentValue ?? "N/A"}
          ></PortfolioStat>
          <PortfolioStat
            title="Net Gain/Loss"
            value={netGainLoss ?? "N/A"}
          ></PortfolioStat>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <PortfolioPerformance />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

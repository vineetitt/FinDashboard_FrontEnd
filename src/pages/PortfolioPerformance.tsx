/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState } from "react";
import fetchPortfolioPerformanceData from "../apiServices/PortfolioPerformanceHistoryServices";
import { useAuth } from "../context/AuthContext";
import LineChart from "../components/LineChart";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}
const PortfolioPerformance: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData| null>(null);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();
  const { user } = useAuth();
  const fetchPortfolioPerformance = async (
    userId: number | undefined,
    date: Date
  ) => {
    if (userId === undefined) throw new Error(`User ${userId} required`);
    try {
      setLoading(true);
      const response = await fetchPortfolioPerformanceData(userId, date);
      if (response?.data.length > 0) {
        const labels = response?.data.map((item: any) => item.date);
        const data = response?.data.map((item: any) => item.portfolioValue);        
        const formattedData = {
          labels, 
          datasets: [
            {
              label: "Portfolio Value",
              data, 
              borderColor: "blue",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        };
        setChartData(formattedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPortfolioPerformance(user?.userID, currentDate);
  }, [user?.userID,PortfolioPerformance, Response]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">
        Portfolio Performance
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Track your portfolio&apos;s performance.
      </p>
      {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : chartData ? (
          <LineChart title="Portfolio Performance History" chartData={chartData}  />
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
    </div>
  );
};

export default PortfolioPerformance;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineChart from "../components/LineChart";
import { stockContext } from "../context/StockContext";
import { getStockPriceHistory } from "../apiServices/StockService";
import { useAuth } from "../context/AuthContext";
import PriceCard from "../components/PriceCard";
import regression from "regression";
const StockDetails: React.FC = () => {
  const { user } = useAuth();
  const { symbol } = useParams<{ symbol: string }>();
  const { assets } = useContext(stockContext);
  const token = localStorage.getItem("jwt");
  const [stockPriceHistory, setStockPriceHistory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  let foundData = assets?.find((item) => item.stockName === symbol);
  const navigate = useNavigate();

  let count = 1;
  useEffect(() => {
    foundData = assets?.find((item) => item.stockName === symbol);
  }, [assets]);
  useEffect(() => {
    const fetchStockPriceHistory = async () => {
      if (assets && token) {
        const stockData = assets.find((item) => item.stockName === symbol);
        if (stockData) {
          try {
            const data = await getStockPriceHistory(stockData.stockID, token);
            setStockPriceHistory(data);
          } catch (error) {
            console.error("Error fetching stock price history:", error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchStockPriceHistory();
  }, [assets, symbol, token]);

  if (loading) {
    return <div>Loading stock details...</div>;
  }

  if (!stockPriceHistory) {
    return <div>No stock price history available.</div>;
  }

  const prices = stockPriceHistory.map((item: any) => item.price);
  const dates = stockPriceHistory.map((item: any) => item.date.split("T")[0]);
  const dataForRegression = stockPriceHistory.map(
    (item: any, index: number) => [index, item.price]
  );

  const result = regression.linear(dataForRegression);
  const slope = result.equation[0];
  const intercept = result.equation[1];

  const futureDays = [6, 7, 8, 9, 10, 11];
  const forecastedPrices = futureDays.map((day) => slope * day + intercept);

  const realTimeData = {
    labels: dates,
    datasets: [
      {
        label: "Stock Price",
        data: prices,
        borderColor: "purple",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const minPrice = Math.min(...prices) - 10;
  const maxPrice = Math.max(...prices) + 10;

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: minPrice,
        max: maxPrice,
      },
    },
  };

  const forecastingData = {
    labels: [...dates, ...futureDays],
    datasets: [
      {
        label: "Forecasting Trend",
        data: [...prices, ...forecastedPrices],
        borderColor: "blue",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const handleBuyNow = () => {
    navigate(
      `/PlaceOrder/${symbol}?stockID=${foundData?.stockID}&currentPrice=${foundData?.currentPrice}&stockSymbol=${symbol}&userID=${user?.userID}`
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="absolute top-6 right-6">
        <button
          className="bg-black text-white font-bold py-1 px-8 rounded hover:bg-blue-600 transition"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">{`Stock Details for ${symbol}`}</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"CurrentPrice"}
          value={foundData ? foundData.currentPrice : 0}
          showCurrency={false}
        />
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"PreviousClosePrice"}
          value={foundData ? foundData.closePrice : 0}
          showCurrency={false}
        />
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"OpenPrice"}
          value={foundData ? foundData.openPrice : 0}
          showCurrency={false}
        />
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"HighPrice"}
          value={foundData ? foundData.highPrice : 0}
          showCurrency={false}
        />
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"LowPrice"}
          value={foundData ? foundData.lowPrice : 0}
          showCurrency={false}
        />
        <PriceCard
          key={`foundData?.stockID -${count++}`}
          label={"Units"}
          value={foundData ? foundData.quantity : 0}
          showCurrency={true}
        />
      </div>

      <div className="flex items-center gap-28 max-h-96 w-full pl-10">
        <LineChart
          title="Stock Price Tracking"
          chartData={realTimeData}
          options={options}
        />
        <LineChart title="Forecasting Trend" chartData={forecastingData} />
      </div>
    </div>
  );
};

export default StockDetails;

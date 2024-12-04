import React from 'react'
import { useParams } from 'react-router-dom'
import PriceCard from '../components/PriceCard';
import LineChart from '../components/LineChart';

const StockDetails:React.FC = () => {
  const {symbol} = useParams<{symbol: string}>();

  const priceData = [
    {label: 'Current Price', value: 200},
    {label: 'Previous Close Price', value:199},
    {label: 'Open Price', value:200},
    {label: 'High Price', value: 550 },
    {label: 'Low Price', value: 480 },  
  ];

  const realTimeData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: 'Stock Price',
        data: [200, 700, 300, 600, 400, 8000],
        borderColor: 'purple',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const forecastingData = {
    labels: [0, 1, 2, 3, 4, 5],
    datasets: [
      {
        label: 'Forecasting Trend',
        data: [500, 520, 500, 560, 580, 400],
        borderColor: 'blue',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{`Stock Details for ${symbol}`}</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {priceData.map((item, index) => (
          <PriceCard key={index} label={item.label} value={item.value} />
        ))}
      </div>
        <div className="flex items-center gap-28 max-h-96 w-full pl-10">
        <LineChart title="Stock Price Tracking" chartData={realTimeData} />
        <LineChart title="Forecasting Trend" chartData={forecastingData} /> 
        </div>
         
    </div>
  )
}

export default StockDetails
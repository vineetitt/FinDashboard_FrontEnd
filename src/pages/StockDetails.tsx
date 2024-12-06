import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LineChart from '../components/LineChart';
import { stockContext } from '../context/StockContext';
import { getStockPriceHistory } from '../apiServices/StockService'; 
import { useAuth } from '../context/AuthContext'; 
import PriceCard from '../components/PriceCard';

const StockDetails: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const { assets } = useContext(stockContext);
    const token = localStorage.getItem('jwt');
    const [stockPriceHistory, setStockPriceHistory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const foundData = assets?.find((item)=>item.stockName === symbol)
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (assets) {
            const stockData = assets.find((item) => item.stockName === symbol);
            if (stockData) {
                const stockID = stockData.stockID;

                const fetchStockPriceHistory = async () => {
                    try {
                        const data = await getStockPriceHistory(stockID, token!);
                        setStockPriceHistory(data);
                    } catch (error) {
                        console.error("Error fetching stock price history:", error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchStockPriceHistory();
            }
        }
    }, [assets, symbol, token]);

    if (loading) {
        return <div>Loading stock details...</div>;
    }

    if (!stockPriceHistory) {
        return <div>No stock price history available.</div>;
    }

    const prices = stockPriceHistory.map((item: any) => item.price);
    const dates = stockPriceHistory.map((item: any) => item.date);

    const realTimeData = {
        labels: dates,
        datasets: [
            {
                label: 'Stock Price',
                data: prices,
                borderColor: 'purple',
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

    const handleBuyNow = ()=>{
        navigate(`/PlaceOrder/${symbol}`,
        {
            state: {
                stockId : foundData?.stockID ,
                currentPrice: foundData?.currentPrice,
                stockSymbol : symbol ,
                userId : user?.userID
            },

        }
             
        );

    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{`Stock Details for ${symbol}`}</h1>
            <div className="grid grid-cols-4 gap-4 mb-6">
                <PriceCard key={foundData?.stockID} label={"CurrentPrice"} value={foundData? foundData.currentPrice: 0} />
                <PriceCard key={foundData?.stockID} label={"PreviousClosePrice"} value={foundData? foundData.closePrice: 0} />
                <PriceCard key={foundData?.stockID} label={"OpenPrice"} value={foundData? foundData.openPrice: 0} />
                <PriceCard key={foundData?.stockID} label={"HighPrice"} value={foundData? foundData.highPrice: 0} />
                <PriceCard key={foundData?.stockID} label={"LowPrice"} value={foundData? foundData.lowPrice: 0} />
            </div>
            
            <div className="flex items-center gap-28 max-h-96 w-full pl-10">
                <LineChart title="Stock Price Tracking" chartData={realTimeData} options={options} />
                <LineChart title="Forecasting Trend" chartData={forecastingData} />
            </div>

            <div className="flex justify-center mt-6">
            <button
                className="bg-black text-white font-bold py-3 px-24 rounded hover:bg-blue-600 transition"
                onClick={handleBuyNow}
            >
                Buy Now
            </button>
        </div>
        </div>
    );
};

export default StockDetails;
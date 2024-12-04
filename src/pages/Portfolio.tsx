import React, { useEffect, useState } from 'react';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioStat from './PortfolioStat';

import fetchPortfolioData from '../apiServices/PortfolioService';
import { useAuth } from '../context/AuthContext';
const Portfolio: React.FC = () => {

  const {user}=useAuth();


  const[totalPortfolioValue, setTotalPortfolioValue]=useState<number | null>(null);
  // const[percentageChange, setPercentageChange]= useState<number | null>(null);
  const[netGainLoss, setNetGainLoss]= useState<number | null>(null);
  const [currentValue, setCurrentValue]= useState<number | null>(null);

  useEffect(()=>{
    const loadPortfolioData = async ()=>{
      try{
        const token = localStorage.getItem('jwt');
        if(!token) throw new Error("User is not authenticated");

        const data = await fetchPortfolioData(user?.userID ?? 0, token);
        setTotalPortfolioValue(data.investedValue);
        // setPercentageChange(data.profitLoss);
        setCurrentValue(data.currentValue);
        setNetGainLoss(data.profitLoss);
        console.log("data of portfolio",data);
        
    }
    catch(err){
      console.error('Failed to load portfolio data:', err);
    }
  }
      loadPortfolioData();
  },[])
  return (
    <div>

      <div className="container mx-auto px-4 py-6">

        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PortfolioStat title="Total Portfolio Value" value= {totalPortfolioValue?? '' }  ></PortfolioStat>
          <PortfolioStat title="Current Value" value= {currentValue?? 'N/A'} ></PortfolioStat>
          <PortfolioStat title="Net Gain/Loss" value= {netGainLoss?? 'N/A'} ></PortfolioStat>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <PortfolioPerformance/>
        </div>

      </div>

    </div>
  );
};

export default Portfolio;

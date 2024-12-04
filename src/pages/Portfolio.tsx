import React from 'react';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioStat from './PortfolioStat';
const Portfolio: React.FC = () => {

  console.log("env file check",import.meta.env.REACT_APP_USER_API_URL);

  return (
    <div>

      <div className="container mx-auto px-4 py-6">

        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PortfolioStat title="Total Portfolio Value" value= {125000} change={2.5} ></PortfolioStat>
          <PortfolioStat title="Net Gain/Loss" value= {10000} ></PortfolioStat>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <PortfolioPerformance/>
        </div>

      </div>

    </div>
  );
};

export default Portfolio;

import React from 'react'

const PortfolioPerformance:React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Portfolio Performance</h2>
      <p className="text-sm text-gray-500 mt-1">
        Track your portfolio&apos;s performance over the selected time range.
      </p>
      <div className="mt-6 h-64 bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Chart Placeholder</p>
      </div>
    </div>
  )
}

export default PortfolioPerformance
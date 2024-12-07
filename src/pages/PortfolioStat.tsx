import React from 'react'
import { IPortfolioStatProps } from '../utils/interface/IPortfolioStatProps'

const PortfolioStat:React.FC<IPortfolioStatProps> = ({title, value}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl mt-3 font-bold text-green-600">{`₹${value.toLocaleString()}`}</p>
    </div>
  )
}

export default PortfolioStat
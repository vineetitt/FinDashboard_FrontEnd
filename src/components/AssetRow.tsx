import React from 'react'
import { useNavigate } from 'react-router-dom';

const getChangeColor = (percentageChange: number): string =>{
  if(percentageChange>0)
  {
    return 'bg-green-500 text-white';
  }
  if(percentageChange<0)
  {
    return 'bg-red-500 text-white';
  }
  return 'bg-orange-400 text-white';
};

const AssetRow:React.FC<{name: string,percentageChange:number}> = ({name,percentageChange})=> {
  
  const changeColor= getChangeColor(percentageChange);
  const navigate = useNavigate();
  const goToStockDetails = ()=>{
  navigate(`/StockDetails/${name}`);
  }

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-3 hover:bg-gray-100 w-full" 
    onClick={goToStockDetails}>
      <span className="text-gray-800 font-medium cursor-pointer ">{name}</span>
      <span className={`px-4 py-2 rounded-full text-sm font-bold ${changeColor}`}>
        {percentageChange.toFixed(2)}%
      </span>
    </div>
  )
}

export default AssetRow
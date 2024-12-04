import React from 'react'

const PriceCard:React.FC<{label: string, value: number}> = ({label, value}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-sm font-medium text-gray-500">{label}</h2>
        <p className="text-2xl font-bold text-gray-800">${value}</p>
    </div>
  )
}

export default PriceCard
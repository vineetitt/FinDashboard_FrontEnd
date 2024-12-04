import React from 'react'

const BuyButton:React.FC = () => {
  return (
    <button
    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
    onClick={()=>alert("clicked")}
  >
    Buy Now
  </button>
  )
}

export default BuyButton
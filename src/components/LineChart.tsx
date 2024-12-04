import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJs.register(
  CategoryScale,
   LinearScale, 
   PointElement, 
   LineElement, 
   Legend, 
   Title, 
   Tooltip);

const LineChart:React.FC<{title: string, chartData: any}> = ({title,chartData}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <Line data={chartData} width={500} height={200} />
    </div>
  )
}
export default LineChart
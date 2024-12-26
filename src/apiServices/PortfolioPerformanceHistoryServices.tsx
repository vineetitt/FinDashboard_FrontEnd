import axios from "axios";
import fetchPortfolioData from "./PortfolioService";
interface Mydata {
  portfolioId: number;
}

const fetchPortfolioPerformanceData = async (userId: number, date: Date) => {
  const token = localStorage.getItem("jwt");
  const apiUrl = import.meta.env.VITE_API_URL
  if (token !== null) {
    const gotdata: Mydata = await fetchPortfolioData(userId, token);
    const response = await axios.get(
      `${apiUrl}/PortfolioPerformanceHistory`,
      {
        params: {
          portfolioID: gotdata.portfolioId,
          date: date.toISOString().split("T")[0]
        },
      }
    );
    return response;
  }
};

export default fetchPortfolioPerformanceData;

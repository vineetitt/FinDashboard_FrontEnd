import axios from "axios";
import fetchPortfolioData from "./PortfolioService";
interface Mydata {
  portfolioId: number;
}

const fetchPortfolioPerformanceData = async (userId: number, date: Date) => {
  const token = localStorage.getItem("jwt");
  if (token !== null) {
    const gotdata: Mydata = await fetchPortfolioData(userId, token);
    const response = await axios.get(
      `https://localhost:7217/api/PortfolioPerformanceHistory`,
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

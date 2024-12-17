export interface Asset {
    stockName: string;
    stockID: number;
    currentPrice: number;
    closePrice: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    quantity: number;
  }

  export interface HoldingAsset {
    stockName: string;
    quantity: number;
    purchasePrice: string;
    currentPrice: string;
    totalValue: string;
    stockID: number;
  }
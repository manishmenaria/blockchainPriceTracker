import { Injectable, Logger } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class SwapService {
  private readonly logger = new Logger(SwapService.name);

  async getEthToBtcSwapRate(ethAmount: number): Promise<{
    btcReceived: number;
    ethFee: number;
    usdFee: number;
  }> {
    try {
      // Fetch ETH price in USD
      const ethPrice = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0x1', // Ethereum mainnet
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH address
      });
      const ethUsdPrice = ethPrice.raw.usdPrice;

      // Fetch BTC price in USD
      const btcPrice = await Moralis.EvmApi.token.getTokenPrice({
        chain: '0x1', // Ethereum mainnet
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC address
      });
      const btcUsdPrice = btcPrice.raw.usdPrice;

      // Calculate swap details
      const ethFee = ethAmount * 0.03; // 0.03% fee in ETH
      const usdFee = ethFee * ethUsdPrice; // Fee in USD
      const ethAfterFee = ethAmount - ethFee;
      const btcReceived = (ethAfterFee * ethUsdPrice) / btcUsdPrice;

      return {
        btcReceived,
        ethFee,
        usdFee,
      };
    } catch (error) {
      this.logger.error(`Error fetching swap rate: ${error.message}`);
      throw new Error('Failed to fetch swap rate. Please try again later.');
    }
  }
}

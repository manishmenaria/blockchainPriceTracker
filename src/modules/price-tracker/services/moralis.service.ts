import { Injectable, OnModuleInit } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class MoralisService implements OnModuleInit {
  async onModuleInit() {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  async getPrice(chainId: string, address: string): Promise<number> {
    const options = {
      chain: chainId, // Use correct chain ID
      address, // Token contract address
    };

    try {
      const response = await Moralis.EvmApi.token.getTokenPrice(options);
      return response.raw.usdPrice; // USD price of the token
    } catch (error) {
      throw new Error(
        `Failed to fetch price for chain ${chainId}: ${error.message}`,
      );
    }
  }
}

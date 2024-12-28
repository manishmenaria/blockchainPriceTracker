import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Price } from '../entities/price.entity';
import { Cron } from '@nestjs/schedule';
import { MoralisService } from './moralis.service';

@Injectable()
export class PriceTrackerService {
  private readonly logger = new Logger(PriceTrackerService.name);

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly moralisService: MoralisService,
  ) {}

  async fetchAndSavePrice(
    chainId: string,
    chainName: string,
    address: string,
  ): Promise<void> {
    try {
      const price = await this.moralisService.getPrice(chainId, address);
      const newPrice = this.priceRepository.create({ chain: chainName, price });
      await this.priceRepository.save(newPrice);
      this.logger.log(`Saved ${chainName} price: ${price}`);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @Cron('*/5 * * * *') // Run every 5 minutes
  async updatePrices(): Promise<void> {
    this.logger.log('Fetching latest prices for Ethereum and Polygon');
    await this.fetchAndSavePrice(
      '0x1',
      'Ethereum',
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    ); // Ethereum Mainnet
    await this.fetchAndSavePrice(
      '0x89',
      'Polygon',
      '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    ); // Polygon Mainnet
  }

  async getHourlyPrices(): Promise<Price[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({
      where: { createdAt: MoreThanOrEqual(oneDayAgo) },
      order: { createdAt: 'ASC' },
    });
  }
}

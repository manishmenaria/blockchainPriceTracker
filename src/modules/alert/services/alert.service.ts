import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Alert } from '../entities/alert.entity';
import { Price } from '../../price-tracker/entities/price.entity';
import { EmailUtil } from '../../../common/utils/email.util';

@Injectable()
export class AlertService {
  @Cron('*/5 * * * *') // Every 5 minutes
  async handlePercentageIncreaseChecks() {
    console.log('Checking for percentage increase alerts...');
    await this.checkPercentageIncrease();
  }

  private readonly logger = new Logger(AlertService.name);

  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async createAlert(
    chain: string,
    threshold: number,
    email: string,
  ): Promise<Alert> {
    const newAlert = this.alertRepository.create({
      chain,
      threshold,
      email,
    });
    return await this.alertRepository.save(newAlert);
  }

  async checkPriceAlerts(): Promise<void> {
    this.logger.log('Checking price alerts...');
    const alerts = await this.alertRepository.find();

    for (const alert of alerts) {
      const latestPrice = await this.priceRepository.findOne({
        where: { chain: alert.chain },
        order: { createdAt: 'DESC' },
      });

      if (latestPrice && Number(latestPrice.price) >= alert.threshold) {
        await EmailUtil.sendEmail(
          alert.email,
          'Price Alert Triggered!',
          `The price of ${alert.chain} has reached ${latestPrice.price} USD, which meets or exceeds your threshold of ${alert.threshold} USD.`,
        );

        this.logger.log(`Alert sent to ${alert.email} for ${alert.chain}`);
      }
    }
  }

  async checkPercentageIncrease(): Promise<void> {
    const chains = ['Ethereum', 'Polygon']; // Add more chains if necessary
    for (const chain of chains) {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      const [latestPrice, oldPrice] = await Promise.all([
        this.priceRepository.findOne({
          where: { chain },
          order: { createdAt: 'DESC' },
        }),
        this.priceRepository.findOne({
          where: { chain, createdAt: MoreThanOrEqual(oneHourAgo) },
          order: { createdAt: 'ASC' },
        }),
      ]);
      console.log('latestPrice', latestPrice, oldPrice);

      if (latestPrice && oldPrice) {
        const percentageChange =
          ((Number(latestPrice.price) - Number(oldPrice.price)) /
            Number(oldPrice.price)) *
          100;

        const absolutePercentageChange = Math.abs(percentageChange);
        console.log('percentageChange', percentageChange);

        if (absolutePercentageChange > 3) {
          const direction = percentageChange > 0 ? 'increased' : 'decreased';
          await EmailUtil.sendEmail(
            'hyperhire_assignment@hyperhire.in',
            `Price Alert: ${chain}`,
            `The price of ${chain} has ${direction} by ${absolutePercentageChange.toFixed(
              2,
            )}% in the last hour.`,
          );

          this.logger.log(
            `Percentage change alert sent for ${chain}: ${direction} by ${absolutePercentageChange.toFixed(
              2,
            )}%`,
          );
        }
      }
    }
  }
}

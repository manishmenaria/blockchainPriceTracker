import { Controller, Get } from '@nestjs/common';
import { PriceTrackerService } from '../services/price-tracker.service';

@Controller('prices')
export class PriceTrackerController {
  constructor(private readonly priceTrackerService: PriceTrackerService) {}

  @Get('hourly')
  async getHourlyPrices() {
    return await this.priceTrackerService.getHourlyPrices();
  }
}

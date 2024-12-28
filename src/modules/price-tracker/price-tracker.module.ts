import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceTrackerService } from './services/price-tracker.service';
import { MoralisService } from './services/moralis.service';
import { PriceTrackerController } from './controllers/price-tracker.controller';
import { Price } from './entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PriceTrackerController],
  providers: [PriceTrackerService, MoralisService],
})
export class PriceTrackerModule {}

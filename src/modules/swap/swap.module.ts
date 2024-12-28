import { Module } from '@nestjs/common';
import { SwapService } from './services/swap.service';
import { SwapController } from './controllers/swap.controller';

@Module({
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}

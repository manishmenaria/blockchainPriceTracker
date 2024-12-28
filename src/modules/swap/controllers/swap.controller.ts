import { Controller, Post, Body } from '@nestjs/common';
import { SwapService } from '../services/swap.service';
import { SwapDto } from '../dto/swap.dto';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Post('eth-to-btc')
  async swapEthToBtc(@Body() swapDto: SwapDto) {
    const { ethAmount } = swapDto;
    return await this.swapService.getEthToBtcSwapRate(ethAmount);
  }
}

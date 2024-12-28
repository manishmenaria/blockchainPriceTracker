import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SwapDto {
  @IsNumber()
  @Min(0.0001) // Minimum ETH amount for a swap
  @IsNotEmpty()
  ethAmount: number; // Amount of ETH to swap
}

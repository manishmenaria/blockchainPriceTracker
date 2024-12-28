import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  chain: string; // Chain name (e.g., Ethereum, Polygon)

  @IsNumber()
  @IsNotEmpty()
  threshold: number; // Threshold price in USD

  @IsEmail()
  @IsNotEmpty()
  email: string; // Email address
}

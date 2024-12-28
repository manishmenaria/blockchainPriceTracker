// Import necessary modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PriceTrackerModule } from './modules/price-tracker/price-tracker.module';
import { AlertModule } from './modules/alert/alert.module';
import { SwapModule } from './modules/swap/swap.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables globally
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    ScheduleModule.forRoot(), // Enable scheduling
    PriceTrackerModule,
    AlertModule,
    SwapModule,
  ],
})
export class AppModule {}

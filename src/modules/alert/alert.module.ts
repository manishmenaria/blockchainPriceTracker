import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertService } from './services/alert.service';
import { AlertController } from './controllers/alert.controller';
import { Alert } from './entities/alert.entity';
import { Price } from '../price-tracker/entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Price])],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from '../services/alert.service';
import { CreateAlertDto } from '../dto/create-alert.dto';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    const { chain, threshold, email } = createAlertDto;
    return await this.alertService.createAlert(chain, threshold, email);
  }
}

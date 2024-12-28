import { AlertService } from '../services/alert.service';
import { CreateAlertDto } from '../dto/create-alert.dto';
export declare class AlertController {
    private readonly alertService;
    constructor(alertService: AlertService);
    createAlert(createAlertDto: CreateAlertDto): Promise<import("../entities/alert.entity").Alert>;
}

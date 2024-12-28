import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import { Price } from '../../price-tracker/entities/price.entity';
export declare class AlertService {
    private readonly alertRepository;
    private readonly priceRepository;
    handlePercentageIncreaseChecks(): Promise<void>;
    private readonly logger;
    constructor(alertRepository: Repository<Alert>, priceRepository: Repository<Price>);
    createAlert(chain: string, threshold: number, email: string): Promise<Alert>;
    checkPriceAlerts(): Promise<void>;
    checkPercentageIncrease(): Promise<void>;
}

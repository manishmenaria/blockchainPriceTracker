import { PriceTrackerService } from '../services/price-tracker.service';
export declare class PriceTrackerController {
    private readonly priceTrackerService;
    constructor(priceTrackerService: PriceTrackerService);
    getHourlyPrices(): Promise<import("../entities/price.entity").Price[]>;
}

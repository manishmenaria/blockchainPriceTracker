import { Repository } from 'typeorm';
import { Price } from '../entities/price.entity';
import { MoralisService } from './moralis.service';
export declare class PriceTrackerService {
    private readonly priceRepository;
    private readonly moralisService;
    private readonly logger;
    constructor(priceRepository: Repository<Price>, moralisService: MoralisService);
    fetchAndSavePrice(chainId: string, chainName: string, address: string): Promise<void>;
    updatePrices(): Promise<void>;
    getHourlyPrices(): Promise<Price[]>;
}

import { SwapService } from '../services/swap.service';
import { SwapDto } from '../dto/swap.dto';
export declare class SwapController {
    private readonly swapService;
    constructor(swapService: SwapService);
    swapEthToBtc(swapDto: SwapDto): Promise<{
        btcReceived: number;
        ethFee: number;
        usdFee: number;
    }>;
}

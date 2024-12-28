export declare class SwapService {
    private readonly logger;
    getEthToBtcSwapRate(ethAmount: number): Promise<{
        btcReceived: number;
        ethFee: number;
        usdFee: number;
    }>;
}

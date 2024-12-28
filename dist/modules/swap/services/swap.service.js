"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SwapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapService = void 0;
const common_1 = require("@nestjs/common");
const moralis_1 = require("moralis");
let SwapService = SwapService_1 = class SwapService {
    constructor() {
        this.logger = new common_1.Logger(SwapService_1.name);
    }
    async getEthToBtcSwapRate(ethAmount) {
        try {
            const ethPrice = await moralis_1.default.EvmApi.token.getTokenPrice({
                chain: '0x1',
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            });
            const ethUsdPrice = ethPrice.raw.usdPrice;
            const btcPrice = await moralis_1.default.EvmApi.token.getTokenPrice({
                chain: '0x1',
                address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            });
            const btcUsdPrice = btcPrice.raw.usdPrice;
            const ethFee = ethAmount * 0.03;
            const usdFee = ethFee * ethUsdPrice;
            const ethAfterFee = ethAmount - ethFee;
            const btcReceived = (ethAfterFee * ethUsdPrice) / btcUsdPrice;
            return {
                btcReceived,
                ethFee,
                usdFee,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching swap rate: ${error.message}`);
            throw new Error('Failed to fetch swap rate. Please try again later.');
        }
    }
};
exports.SwapService = SwapService;
exports.SwapService = SwapService = SwapService_1 = __decorate([
    (0, common_1.Injectable)()
], SwapService);
//# sourceMappingURL=swap.service.js.map
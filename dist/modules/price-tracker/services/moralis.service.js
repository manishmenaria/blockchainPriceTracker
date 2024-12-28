"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoralisService = void 0;
const common_1 = require("@nestjs/common");
const moralis_1 = require("moralis");
let MoralisService = class MoralisService {
    async onModuleInit() {
        await moralis_1.default.start({ apiKey: process.env.MORALIS_API_KEY });
    }
    async getPrice(chainId, address) {
        const options = {
            chain: chainId,
            address,
        };
        try {
            const response = await moralis_1.default.EvmApi.token.getTokenPrice(options);
            return response.raw.usdPrice;
        }
        catch (error) {
            throw new Error(`Failed to fetch price for chain ${chainId}: ${error.message}`);
        }
    }
};
exports.MoralisService = MoralisService;
exports.MoralisService = MoralisService = __decorate([
    (0, common_1.Injectable)()
], MoralisService);
//# sourceMappingURL=moralis.service.js.map
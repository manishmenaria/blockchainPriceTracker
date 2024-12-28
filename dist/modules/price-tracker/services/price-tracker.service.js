"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PriceTrackerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTrackerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const price_entity_1 = require("../entities/price.entity");
const schedule_1 = require("@nestjs/schedule");
const moralis_service_1 = require("./moralis.service");
let PriceTrackerService = PriceTrackerService_1 = class PriceTrackerService {
    constructor(priceRepository, moralisService) {
        this.priceRepository = priceRepository;
        this.moralisService = moralisService;
        this.logger = new common_1.Logger(PriceTrackerService_1.name);
    }
    async fetchAndSavePrice(chainId, chainName, address) {
        try {
            const price = await this.moralisService.getPrice(chainId, address);
            const newPrice = this.priceRepository.create({ chain: chainName, price });
            await this.priceRepository.save(newPrice);
            this.logger.log(`Saved ${chainName} price: ${price}`);
        }
        catch (error) {
            this.logger.error(error.message);
        }
    }
    async updatePrices() {
        this.logger.log('Fetching latest prices for Ethereum and Polygon');
        await this.fetchAndSavePrice('0x1', 'Ethereum', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
        await this.fetchAndSavePrice('0x89', 'Polygon', '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
    }
    async getHourlyPrices() {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return this.priceRepository.find({
            where: { createdAt: (0, typeorm_2.MoreThanOrEqual)(oneDayAgo) },
            order: { createdAt: 'ASC' },
        });
    }
};
exports.PriceTrackerService = PriceTrackerService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PriceTrackerService.prototype, "updatePrices", null);
exports.PriceTrackerService = PriceTrackerService = PriceTrackerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        moralis_service_1.MoralisService])
], PriceTrackerService);
//# sourceMappingURL=price-tracker.service.js.map
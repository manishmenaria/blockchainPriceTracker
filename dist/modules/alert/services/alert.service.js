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
var AlertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const alert_entity_1 = require("../entities/alert.entity");
const price_entity_1 = require("../../price-tracker/entities/price.entity");
const email_util_1 = require("../../../common/utils/email.util");
let AlertService = AlertService_1 = class AlertService {
    async handlePercentageIncreaseChecks() {
        console.log('Checking for percentage increase alerts...');
        await this.checkPercentageIncrease();
    }
    constructor(alertRepository, priceRepository) {
        this.alertRepository = alertRepository;
        this.priceRepository = priceRepository;
        this.logger = new common_1.Logger(AlertService_1.name);
    }
    async createAlert(chain, threshold, email) {
        const newAlert = this.alertRepository.create({
            chain,
            threshold,
            email,
        });
        return await this.alertRepository.save(newAlert);
    }
    async checkPriceAlerts() {
        this.logger.log('Checking price alerts...');
        const alerts = await this.alertRepository.find();
        for (const alert of alerts) {
            const latestPrice = await this.priceRepository.findOne({
                where: { chain: alert.chain },
                order: { createdAt: 'DESC' },
            });
            if (latestPrice && Number(latestPrice.price) >= alert.threshold) {
                await email_util_1.EmailUtil.sendEmail(alert.email, 'Price Alert Triggered!', `The price of ${alert.chain} has reached ${latestPrice.price} USD, which meets or exceeds your threshold of ${alert.threshold} USD.`);
                this.logger.log(`Alert sent to ${alert.email} for ${alert.chain}`);
            }
        }
    }
    async checkPercentageIncrease() {
        const chains = ['Ethereum', 'Polygon'];
        for (const chain of chains) {
            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            const [latestPrice, oldPrice] = await Promise.all([
                this.priceRepository.findOne({
                    where: { chain },
                    order: { createdAt: 'DESC' },
                }),
                this.priceRepository.findOne({
                    where: { chain, createdAt: (0, typeorm_2.MoreThanOrEqual)(oneHourAgo) },
                    order: { createdAt: 'ASC' },
                }),
            ]);
            console.log('latestPrice', latestPrice, oldPrice);
            if (latestPrice && oldPrice) {
                const percentageChange = ((Number(latestPrice.price) - Number(oldPrice.price)) /
                    Number(oldPrice.price)) *
                    100;
                const absolutePercentageChange = Math.abs(percentageChange);
                console.log('percentageChange', percentageChange);
                if (absolutePercentageChange > 0.001) {
                    const direction = percentageChange > 0 ? 'increased' : 'decreased';
                    await email_util_1.EmailUtil.sendEmail('demotest1@yopmail.com', `Price Alert: ${chain}`, `The price of ${chain} has ${direction} by ${absolutePercentageChange.toFixed(2)}% in the last hour.`);
                    this.logger.log(`Percentage change alert sent for ${chain}: ${direction} by ${absolutePercentageChange.toFixed(2)}%`);
                }
            }
        }
    }
};
exports.AlertService = AlertService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertService.prototype, "handlePercentageIncreaseChecks", null);
exports.AlertService = AlertService = AlertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __param(1, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlertService);
//# sourceMappingURL=alert.service.js.map
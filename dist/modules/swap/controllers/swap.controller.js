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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapController = void 0;
const common_1 = require("@nestjs/common");
const swap_service_1 = require("../services/swap.service");
const swap_dto_1 = require("../dto/swap.dto");
let SwapController = class SwapController {
    constructor(swapService) {
        this.swapService = swapService;
    }
    async swapEthToBtc(swapDto) {
        const { ethAmount } = swapDto;
        return await this.swapService.getEthToBtcSwapRate(ethAmount);
    }
};
exports.SwapController = SwapController;
__decorate([
    (0, common_1.Post)('eth-to-btc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [swap_dto_1.SwapDto]),
    __metadata("design:returntype", Promise)
], SwapController.prototype, "swapEthToBtc", null);
exports.SwapController = SwapController = __decorate([
    (0, common_1.Controller)('swap'),
    __metadata("design:paramtypes", [swap_service_1.SwapService])
], SwapController);
//# sourceMappingURL=swap.controller.js.map
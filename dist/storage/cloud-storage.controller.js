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
exports.CloudStorageController = void 0;
const common_1 = require("@nestjs/common");
const generate_presigned_url_dto_1 = require("../storage/dto/generate-presigned-url.dto");
let CloudStorageController = class CloudStorageController {
    constructor(cloudStorageService) {
        this.cloudStorageService = cloudStorageService;
    }
    async generatePresignedUrl(dto) {
        const { url, fields } = await this.cloudStorageService.generatePresignedUrl(dto);
        return { url, fields };
    }
};
exports.CloudStorageController = CloudStorageController;
__decorate([
    (0, common_1.Post)('presigned-url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_presigned_url_dto_1.GeneratePresignedUrlDto]),
    __metadata("design:returntype", Promise)
], CloudStorageController.prototype, "generatePresignedUrl", null);
exports.CloudStorageController = CloudStorageController = __decorate([
    (0, common_1.Controller)('storage'),
    __param(0, (0, common_1.Inject)('CloudStorageService')),
    __metadata("design:paramtypes", [Object])
], CloudStorageController);
//# sourceMappingURL=cloud-storage.controller.js.map
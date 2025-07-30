"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CloudStorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorageModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_storage_controller_1 = require("./cloud-storage.controller");
const aws_s3_service_1 = require("./services/aws-s3.service");
let CloudStorageModule = CloudStorageModule_1 = class CloudStorageModule {
    static register(config) {
        return {
            module: CloudStorageModule_1,
            controllers: [cloud_storage_controller_1.CloudStorageController],
            providers: [
                {
                    provide: 'CLOUD_STORAGE_CONFIG',
                    useValue: config,
                },
                {
                    provide: 'CloudStorageService',
                    useFactory: (config) => {
                        switch (config.provider) {
                            case 'aws':
                                return new aws_s3_service_1.AwsS3Service(config);
                            default:
                                throw new Error(`Unsupported cloud storage provider: ${config.provider}`);
                        }
                    },
                    inject: ['CLOUD_STORAGE_CONFIG'],
                },
            ],
            exports: ['CloudStorageService', 'CLOUD_STORAGE_CONFIG'],
        };
    }
};
exports.CloudStorageModule = CloudStorageModule;
exports.CloudStorageModule = CloudStorageModule = CloudStorageModule_1 = __decorate([
    (0, common_1.Module)({})
], CloudStorageModule);
//# sourceMappingURL=cloud-storage.module.js.map
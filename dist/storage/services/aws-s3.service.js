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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_presigned_post_1 = require("@aws-sdk/s3-presigned-post");
let AwsS3Service = class AwsS3Service {
    constructor(config) {
        this.s3Client = new client_s3_1.S3Client({
            region: config.region,
            credentials: {
                accessKeyId: config.credentials.accessKeyId,
                secretAccessKey: config.credentials.secretAccessKey,
            },
        });
        this.bucket = config.bucket;
    }
    async generatePresignedUrl(options) {
        const { key, expiresIn, contentType, metadata, sizeLimit } = options;
        const conditions = [
            ['content-length-range', 0, sizeLimit],
            ['eq', '$Content-Type', contentType],
            ['eq', '$key', key],
        ];
        const metadataConditions = metadata
            ? Object.entries(metadata).map(([key, value]) => ['eq', `$x-amz-meta-${key}`, value])
            : [];
        const { url, fields } = await (0, s3_presigned_post_1.createPresignedPost)(this.s3Client, {
            Bucket: this.bucket,
            Key: key,
            Conditions: [...conditions, ...metadataConditions],
            Expires: expiresIn,
            Fields: Object.assign({ 'Content-Type': contentType, 'key': key }, (metadata && Object.entries(metadata).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [`x-amz-meta-${key}`]: value })), {}))),
        });
        return { url, fields };
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AwsS3Service);
//# sourceMappingURL=aws-s3.service.js.map
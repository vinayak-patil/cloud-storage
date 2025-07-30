import { CloudStorageService } from '../storage/interfaces/cloud-storage.interface';
import { GeneratePresignedUrlDto } from '../storage/dto/generate-presigned-url.dto';
export declare class CloudStorageController {
    private readonly cloudStorageService;
    constructor(cloudStorageService: CloudStorageService);
    generatePresignedUrl(dto: GeneratePresignedUrlDto): Promise<{
        url: string;
        fields: Record<string, string>;
    }>;
}

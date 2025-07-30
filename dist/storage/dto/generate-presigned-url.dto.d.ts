export declare class GeneratePresignedUrlDto {
    key: string;
    contentType?: string;
    metadata?: Record<string, string>;
    expiresIn?: number;
    sizeLimit?: number;
}

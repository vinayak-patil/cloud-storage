import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { CloudStorageService, CloudStorageConfig } from '../interfaces/cloud-storage.interface';
import { GeneratePresignedUrlDto } from '../dto/generate-presigned-url.dto';

@Injectable()
export class AwsS3Service implements CloudStorageService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(config: CloudStorageConfig) {
    this.s3Client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.credentials.accessKeyId!,
        secretAccessKey: config.credentials.secretAccessKey!,
      },
    });
    this.bucket = config.bucket;
  }

  async generatePresignedUrl(options: GeneratePresignedUrlDto): Promise<{ url: string; fields: Record<string, string> }> {
    const { 
      key, 
      expiresIn,
      contentType, 
      metadata,
      sizeLimit
    } = options;

    const { url, fields } = await createPresignedPost(this.s3Client, {
      Bucket: this.bucket,
      Key: key,
      Conditions: [
        ['content-length-range', 0, sizeLimit],
        ['eq', '$Content-Type', contentType],
        ['eq', '$key', key],
        ...(metadata ? Object.entries(metadata).map(([key, value]) => 
          ['eq', `$x-amz-meta-${key}`, value]
        ) : []),
      ],
      Expires: expiresIn,
      Fields: {
        'Content-Type': contentType,
        'key': key,
        ...(metadata && Object.entries(metadata).reduce((acc, [key, value]) => ({
          ...acc,
          [`x-amz-meta-${key}`]: value,
        }), {})),
      },
    });

    return { url, fields };
  }
} 
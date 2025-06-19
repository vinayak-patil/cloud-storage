import { Module, DynamicModule } from '@nestjs/common';
import { CloudStorageController } from './cloud-storage.controller';
import { AwsS3Service } from './services/aws-s3.service';
import { CloudStorageConfig } from './interfaces/cloud-storage.interface';

@Module({})
export class CloudStorageModule {
  static register(config: CloudStorageConfig): DynamicModule {
    return {
      module: CloudStorageModule,
      controllers: [CloudStorageController],
      providers: [
        {
          provide: 'CLOUD_STORAGE_CONFIG',
          useValue: config,
        },
        {
          provide: 'CloudStorageService',
          useFactory: (config: CloudStorageConfig) => {
            switch (config.provider) {
              case 'aws':
                return new AwsS3Service(config);
              // Add cases for other providers as they are implemented
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
} 
import { DynamicModule } from '@nestjs/common';
import { CloudStorageConfig } from './interfaces/cloud-storage.interface';
export declare class CloudStorageModule {
    static register(config: CloudStorageConfig): DynamicModule;
}

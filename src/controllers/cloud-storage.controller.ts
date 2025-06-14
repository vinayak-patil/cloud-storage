import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CloudStorageService } from '../interfaces/cloud-storage.interface';
import { GeneratePresignedUrlDto } from '../dto/generate-presigned-url.dto';

@Controller('storage')
export class CloudStorageController {
  constructor(
    @Inject('CloudStorageService')
    private readonly cloudStorageService: CloudStorageService
  ) {}

  @Post('presigned-url')
  async generatePresignedUrl(@Body() dto: GeneratePresignedUrlDto) {
    const { url, fields } = await this.cloudStorageService.generatePresignedUrl(dto);
    return { url, fields };
  }
} 
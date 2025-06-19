import { IsString, IsOptional, IsObject, IsNumber } from 'class-validator';


export class GeneratePresignedUrlDto {

  @IsString()
  key: string;

  @IsString()
  @IsOptional()
  contentType?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, string>;

  @IsNumber()
  @IsOptional()
  expiresIn?: number = 3600; // Default 1 hour

  @IsNumber()
  @IsOptional()
  sizeLimit?: number;

} 
# @nestjs/cloud-storage

A NestJS package for cloud storage operations with presigned URL support. Currently supports AWS S3, with extensibility for other cloud providers.

## Installation

```bash
npm install git+https://github.com/vinayak-patil/cloud-storage.git
```

## Usage

### Basic Setup

```typescript
import { Module } from '@nestjs/common';
import { CloudStorageModule } from '@nestjs/cloud-storage';

@Module({
  imports: [
    CloudStorageModule.register({
      provider: 'aws',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'your-access-key',
        secretAccessKey: 'your-secret-key',
      },
      bucket: 'your-bucket-name',
    }),
  ],
})
export class AppModule {}
```

### Using the Service

```typescript
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CloudStorageService } from '@nestjs/cloud-storage';

@Injectable()
export class YourService {
  constructor(
    @Inject('CloudStorageService')
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async getPresignedUrl() {
    const { url, fields } = await this.cloudStorageService.generatePresignedUrl({
      key: 'path/to/file.jpg',
      expiresIn: 3600, // URL expires in 1 hour
      contentType: 'image/jpeg',
      metadata: {
        userId: '123',
        category: 'profile',
      },
      sizeLimit: 5242880, // 5MB
    });

    return { url, fields };
  }
}
```

### API Endpoints

#### Generate Presigned URL

```http
POST /storage/presigned-url
Content-Type: application/json

{
  "key": "path/to/file.jpg",
  "expiresIn": 3600,
  "contentType": "image/jpeg",
  "metadata": {
    "userId": "123",
    "category": "profile"
  },
  "sizeLimit": 5242880
}
```

Response:
```json
{
  "url": "https://your-bucket.s3.amazonaws.com",
  "fields": {
    "key": "path/to/file.jpg",
    "Content-Type": "image/jpeg",
    "x-amz-meta-userId": "123",
    "x-amz-meta-category": "profile",
    "policy": "...",
    "x-amz-algorithm": "AWS4-HMAC-SHA256",
    "x-amz-credential": "...",
    "x-amz-date": "...",
    "x-amz-signature": "..."
  }
}
```

### Browser Upload Example

When using the presigned POST URL for direct browser uploads, you can use them with a form like this:

```html
<form action="[URL]" method="post" enctype="multipart/form-data">
  <!-- Hidden fields from the response -->
  <input type="hidden" name="key" value="[fields.key]">
  <input type="hidden" name="Content-Type" value="[fields.Content-Type]">
  <input type="hidden" name="x-amz-meta-userId" value="[fields.x-amz-meta-userId]">
  <input type="hidden" name="x-amz-meta-category" value="[fields.x-amz-meta-category]">
  <input type="hidden" name="policy" value="[fields.policy]">
  <input type="hidden" name="x-amz-algorithm" value="[fields.x-amz-algorithm]">
  <input type="hidden" name="x-amz-credential" value="[fields.x-amz-credential]">
  <input type="hidden" name="x-amz-date" value="[fields.x-amz-date]">
  <input type="hidden" name="x-amz-signature" value="[fields.x-amz-signature]">
  
  <!-- File input -->
  <input type="file" name="file">
  <button type="submit">Upload</button>
</form>
```

### Available Options

The `GeneratePresignedUrlDto` includes the following options:

- `key`: The object key in the bucket
- `contentType`: The content type of the file (optional)
- `metadata`: Additional metadata to attach to the object (optional)
- `expiresIn`: URL expiration time in seconds (default: 3600)
- `sizeLimit`: Maximum file size in bytes (default: 10485760 - 10MB)

## Extending for New Cloud Providers

To add support for a new cloud provider:

1. Create a new service class implementing the `CloudStorageService` interface
2. Add the new provider case in the `CloudStorageModule.register()` method
3. Update the `CloudStorageConfig` interface if needed

Example for adding Azure Blob Storage:

```typescript
@Injectable()
export class AzureBlobService implements CloudStorageService {
  // Implementation
}

// In CloudStorageModule
case 'azure':
  return new AzureBlobService(config);
```

## License

MIT 
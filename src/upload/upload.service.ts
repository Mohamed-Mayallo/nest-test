import { Injectable } from '@nestjs/common';
import { createWriteStream, unlinkSync, existsSync, mkdirSync } from 'fs';
import { Upload } from './upload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  async graphqlUpload(
    file: Upload,
    saveTo: string,
    oldFile: string = null
  ): Promise<boolean | string> {
    let { filename, createReadStream } = await file;
    let diskStorage = `${process.cwd()}/public/${saveTo}`;
    let fileUrl = `${this.configService.get('API_BASE')}/${saveTo}`;
    let name = `${Date.now()}-${filename}`;
    if (!existsSync(diskStorage)) mkdirSync(diskStorage, { recursive: true });

    // Delete the old file
    if (oldFile) {
      let filePath = `${diskStorage}/${this.getFileNameFromUrl(oldFile)}`;
      if (existsSync(filePath)) this.deleteFile(filePath);
    }

    // Save the new file
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`${diskStorage}/${name}`))
        .on('finish', () => resolve(`${fileUrl}/${name}`))
        .on('error', () => reject(false))
    );
  }

  private getFileNameFromUrl(url: string): string {
    return url.split('/').reverse()[0];
  }

  deleteFile(file: string, saveTo?: string): void {
    let filePath = file;
    if (saveTo)
      filePath = `${process.cwd()}/public/${saveTo}/${this.getFileNameFromUrl(
        file
      )}`;
    if (existsSync(filePath)) unlinkSync(filePath);
  }
}

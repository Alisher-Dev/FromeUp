import { Injectable, BadRequestException } from '@nestjs/common';
import cloudinary from '../../config/cloudinary.config'; // Импортируй свою конфигурацию
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      return await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'uploads/FromeUp' }, // Укажи папку на Cloudinary
            (
              error: UploadApiErrorResponse | null,
              result: UploadApiResponse | undefined,
            ) => {
              if (error) reject(error);
              resolve(result);
            },
          )
          .end(file.buffer); // Передаем содержимое файла
      });
    } catch (error) {
      throw new BadRequestException('File upload failed');
    }
  }
}

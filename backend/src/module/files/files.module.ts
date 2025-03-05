import { Module } from '@nestjs/common';
import { FileUploadController } from './files.controller';
import { FileUploadService } from './cloudinary.service';
import { FilesService } from './files.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, FilesService],
})
export class FilesModule {}

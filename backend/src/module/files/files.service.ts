import { ApiResponse } from 'src/helpers/apiRespons';
import { Prisma } from 'src/prisma.service';

export class FilesService {
  constructor(private prisma: Prisma) {}

  upload(file: any) {
    console.log();

    return new ApiResponse('');
  }
}

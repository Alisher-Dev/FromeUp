import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Prisma } from 'src/prisma.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, Prisma],
})
export class ContentModule {}

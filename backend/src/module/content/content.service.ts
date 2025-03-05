import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiResponse } from 'src/helpers/apiRespons';
import { IPayload } from 'src/helpers/type';
import { Prisma } from 'src/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: Prisma) {}

  async create(createContentDto: CreateContentDto, { username }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    // await this.prisma.content.create({
    //   data: { ...createContentDto, status: true, userId: user.id },
    // });
    return new ApiResponse('');
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}

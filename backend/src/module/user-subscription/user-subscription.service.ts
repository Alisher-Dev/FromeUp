import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserSubscriptionDto,
  findAllSubscribeDto,
} from './dto/create-user-subscription.dto';
import { ApiResponse } from 'src/helpers/apiRespons';
import { Prisma } from 'src/prisma.service';
import { Pagination } from 'src/helpers/pagination';
import { IPayload, IQuery } from 'src/helpers/type';

@Injectable()
export class UserSubscriptionService {
  constructor(private prisma: Prisma) {}

  async create(
    createUserSubscriptionDto: CreateUserSubscriptionDto,
    { username }: IPayload,
  ) {
    const { subscribedToId } = createUserSubscriptionDto;
    const { id: subscriberId } = await this.prisma.user.findFirst({
      where: { username },
      select: { id: true },
    });

    if (subscriberId === subscribedToId) {
      throw new ConflictException('User cannot subscribe to himself');
    }

    const existingData = await this.prisma.user.findMany({
      where: {
        OR: [{ id: subscriberId }, { id: subscribedToId }],
      },
      select: { id: true },
    });

    if (existingData.length !== 2) {
      throw new NotFoundException('One or both users not found');
    }

    const existingSubscription = await this.prisma.userSubscription.findFirst({
      where: {
        subscriberId,
        subscribedToId,
      },
    });

    if (existingSubscription) {
      throw new ConflictException('Subscription already exists');
    }

    await this.prisma.userSubscription.create({
      data: {
        status: true,
        subscribedToId,
        subscriberId,
      },
    });

    return new ApiResponse('User subscription created');
  }

  async findAllSubscribe(
    { id, type }: findAllSubscribeDto,
    { limit, page }: IQuery,
  ) {
    const PageNumber = Number(page) || 1;
    const PageSize = Number(limit) || 10;
    const where: any = { status: true };

    where[type] = id;

    const userSubscription = await this.prisma.userSubscription.findMany({
      where,
      take: PageSize,
      skip: (PageNumber - 1) * PageSize,
    });
    const count = await this.prisma.userSubscription.count({
      where: { status: true },
    });

    const pagination = new Pagination(count, PageNumber, PageSize);

    return new ApiResponse(userSubscription, 200, pagination);
  }

  async findAll({ limit, page }: IQuery) {
    const PageNumber = Number(page) || 1;
    const PageSize = Number(limit) || 10;

    const userSubscription = await this.prisma.userSubscription.findMany({
      where: { status: true },
      take: PageSize,
      skip: (PageNumber - 1) * PageSize,
    });
    const count = await this.prisma.userSubscription.count({
      where: { status: true },
    });

    const pagination = new Pagination(count, PageNumber, PageSize);

    return new ApiResponse(userSubscription, 200, pagination);
  }

  async findOne(id: string) {
    const user_subscription = await this.prisma.userSubscription.findUnique({
      where: { id, status: true },
    });
    if (!user_subscription)
      throw new NotFoundException('user_subscription not found');

    return new ApiResponse(user_subscription);
  }

  async remove(id: string) {
    const user_subscription = await this.prisma.userSubscription.findUnique({
      where: { id, status: true },
    });
    if (!user_subscription)
      throw new NotFoundException('user_subscription not found');

    await this.prisma.userSubscription.update({
      where: { id },
      data: { status: false },
    });
    return new ApiResponse('user_subscription deleted');
  }
}

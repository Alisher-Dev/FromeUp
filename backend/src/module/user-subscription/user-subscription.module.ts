import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { Prisma } from 'src/prisma.service';

@Module({
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService, Prisma],
})
export class UserSubscriptionModule {}

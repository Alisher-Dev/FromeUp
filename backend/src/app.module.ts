import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { UserSubscriptionModule } from './module/user-subscription/user-subscription.module';
import { ContentModule } from './module/content/content.module';
import { FilesModule } from './module/files/files.module';

@Module({
  imports: [UserModule, UserSubscriptionModule, ContentModule, FilesModule],
})
export class AppModule {}

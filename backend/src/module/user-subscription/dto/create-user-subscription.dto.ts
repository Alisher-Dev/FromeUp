import { IsEnum, IsString } from 'class-validator';

enum IType {
  subscribedToId = 'subscribedToId', // каму
  subscriberId = 'subscriberId', //кто
}

export class CreateUserSubscriptionDto {
  @IsString()
  subscribedToId: string; // каму
}

export class findAllSubscribeDto {
  @IsString()
  id: string;

  @IsEnum(IType)
  type: IType;
}

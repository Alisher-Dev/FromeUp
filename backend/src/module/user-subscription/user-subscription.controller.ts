import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import {
  CreateUserSubscriptionDto,
  findAllSubscribeDto,
} from './dto/create-user-subscription.dto';
import { IPayload, IQuery } from 'src/helpers/type';
import { AuthGuard } from 'src/helpers/authGuard';

@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Req() req: IPayload,
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
  ) {
    return this.userSubscriptionService.create(createUserSubscriptionDto, req);
  }

  @Get('/sub')
  findAllSubscribe(@Body() body: findAllSubscribeDto, @Query() query: IQuery) {
    return this.userSubscriptionService.findAllSubscribe(body, query);
  }

  @Get()
  findAll(@Query() query: IQuery) {
    return this.userSubscriptionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSubscriptionService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userSubscriptionService.remove(id);
  }
}

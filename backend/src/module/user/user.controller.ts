import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Verify } from './dto/verify';
import { login } from './dto/login';
import { AuthGuard } from 'src/helpers/authGuard';
import { IPayload } from 'src/helpers/type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.userService.signin(createUserDto);
  }

  @Post('login')
  login(@Body() body: login) {
    return this.userService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body: Verify) {
    return this.userService.refresh(body);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: IPayload) {
    return this.userService.logout(req);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: IPayload) {
    return this.userService.me(req);
  }
}

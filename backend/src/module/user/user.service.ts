import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import token from 'src/helpers/token';
import { ApiResponse } from 'src/helpers/apiRespons';
import { Verify } from './dto/verify';
import { login } from './dto/login';
import { IPayload } from 'src/helpers/type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async signin(createUserDto: CreateUserDto) {
    let newUser = { ...createUserDto, status: true, token: null };
    const user = await this.prisma.user.findFirst({
      where: { username: newUser.username, status: true },
    });
    if (user) {
      throw new NotFoundException('user exists');
    }

    const accessToekn = token.generateAccessToken({
      username: createUserDto.username,
    });
    const refreshToken = token.generateRefreshToken({
      username: createUserDto.username,
    });

    newUser.token = hashSync(refreshToken, 10);
    newUser.password = hashSync(newUser.password, 10);

    await this.prisma.user.create({
      data: newUser,
    });

    return new ApiResponse({ accessToekn, refreshToken });
  }

  async login({ password, username }: login) {
    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword) throw new BadRequestException('password is wrong');

    const accessToekn = token.generateAccessToken({
      username: user.username,
    });
    const refreshToken = token.generateRefreshToken({
      username: user.username,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: hashSync(refreshToken, 10) },
    });

    return new ApiResponse({ accessToekn, refreshToken });
  }

  async me({ username }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
      include: {
        content: {
          where: { status: true },
        },
        subscribedTo: {
          where: { status: true },
        },
        userSubscriptions: {
          where: { status: true },
        },
      },
    });

    if (!user || !username) throw new NotFoundException('user not found');

    return new ApiResponse({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      content: user.content.length || 0, // Количество контента
      subscribers: user.subscribedTo.length || 0, // Подписчики
      subscriptions: user.userSubscriptions.length || 0, // Подписки
    });
  }

  async refresh({ token: refresh }: Verify) {
    const { username } = token.verifyRefreshToken(refresh);

    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
    });
    if (!user) throw new NotFoundException('user not found');

    const accessToken = token.generateAccessToken({ username: user.username });

    return new ApiResponse({ accessToken });
  }

  async logout({ username }: IPayload) {
    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
    });
    if (!user || !username) throw new NotFoundException('user not found');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: null },
    });

    return new ApiResponse('user logout');
  }
}

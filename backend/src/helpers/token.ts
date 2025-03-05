import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from '../config/env.config';
import { IPayload } from './type';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
class token {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpire: string;
  private readonly refreshExpire: string;

  constructor() {
    this.accessSecret = env.jwt.accessSecret;
    this.refreshSecret = env.jwt.refreshSecret;
    this.accessExpire = env.jwt.accessExpire;
    this.refreshExpire = env.jwt.refreshExpire;
  }

  generateAccessToken(payload: IPayload) {
    return sign(payload, this.accessSecret, { expiresIn: this.accessExpire });
  }

  generateRefreshToken(payload: IPayload) {
    return sign(payload, this.refreshSecret, { expiresIn: this.refreshExpire });
  }

  verifyAccessToken(accessToken: string) {
    try {
      return verify(accessToken, this.accessSecret) as IPayload;
    } catch (error) {
      throw new UnauthorizedException('Неверный токен');
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      return verify(refreshToken, this.refreshSecret) as IPayload;
    } catch (error) {
      throw new UnauthorizedException('Неверный токен');
    }
  }
}

export default new token();

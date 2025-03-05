import { IsString } from 'class-validator';

export class login {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

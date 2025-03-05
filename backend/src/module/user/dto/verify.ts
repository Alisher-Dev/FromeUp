import { IsString } from 'class-validator';

export class Verify {
  @IsString()
  token: string;
}

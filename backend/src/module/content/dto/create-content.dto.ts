import { IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;
}

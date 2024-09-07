import {
  IsString,
  MinLength,
  IsOptional,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
  @ApiProperty({ example: 'test' })
  @IsString()
  @IsNotEmpty()
 
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

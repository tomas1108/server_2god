import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Ví dụ về quy tắc xác thực mật khẩu ít nhất 6 ký tự
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}

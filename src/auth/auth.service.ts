import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}


  async register(username: string, fullName: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  
    await this.prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
      },
    });

    return { message: 'Đăng ký thành công' };
  }

  async login(username: string, password: string) {
   
    const user = await this.prisma.user.findUnique({ where: { username } });

  
    if (!user) {
      console.log(`User not found: ${username}`);
      throw new UnauthorizedException('Username does not exist');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password attempt');
      throw new UnauthorizedException('Invalid credentials');
    }


    return this.generateToken(user.id, user.username);
  }

  private generateToken(userId: string, username: string) {
    const payload = { sub: userId, username };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }
}

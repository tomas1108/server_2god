import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataService } from './data/data.controller';
// import { LoginService } from './login/login.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    PrismaModule, 
  ],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}

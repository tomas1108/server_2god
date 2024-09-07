import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Đặt prefix cho tất cả route
  app.setGlobalPrefix('api');

  // Kích hoạt CORS
  app.enableCors();

  // Dùng global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Cấu hình Swagger cho tài liệu API
  const config = new DocumentBuilder()
    .setTitle('Seamless API')
    .setDescription('The Seamless API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  // Lấy cổng từ biến môi trường, mặc định là 3030
  const port = process.env.PORT || 8080;

  // Thêm log để kiểm tra khi ứng dụng bắt đầu lắng nghe trên cổng
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();

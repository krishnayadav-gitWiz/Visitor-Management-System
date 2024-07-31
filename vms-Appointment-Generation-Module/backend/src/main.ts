import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guards';
import {ValidationPipe} from "@nestjs/common";
 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
 
  app.useGlobalGuards(new JwtAuthGuard());
  

  await app.listen(3000);
}
bootstrap();

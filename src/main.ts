import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const PORT = 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => Logger.log(`App is listening on port ${PORT}`));
}
bootstrap();

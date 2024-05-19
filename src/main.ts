import { NestFactory } from '@nestjs/core';
import * as process from 'process';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.BASE_URL as string);
  await app.listen(parseInt(process.env.PORT as string, 10) || 3000,);
}
bootstrap();

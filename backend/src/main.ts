import 'dotenv';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDbConnectionOptions, runDbMigrations } from 'src/shared/utils/db';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const connectionOptions = await getDbConnectionOptions();

  const app = await NestFactory.create(AppModule.forRoot(connectionOptions));

  app.useGlobalPipes(new ValidationPipe({}));

  await runDbMigrations();

  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();

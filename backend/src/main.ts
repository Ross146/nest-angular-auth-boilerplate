// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionOptions } from 'typeorm';

export const getDbConnectionOptions = async (connectionName = 'default') => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  return {
    ...options,
    name: connectionName,
  };
};

const port = process.env.PORT || 3000;

async function bootstrap() {
  const connectionOptions = await getDbConnectionOptions(process.env.NODE_ENV);

  const app = await NestFactory.create(AppModule.forRoot(connectionOptions), {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();

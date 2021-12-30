import { Module, DynamicModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

@Module({})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(connOptions)],
    };
  }
}

// apps/api/src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@api/database';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}

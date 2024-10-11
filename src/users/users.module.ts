import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnsService } from 'src/colums/columns.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ColumnsService],
  imports: [forwardRef(() => AuthModule)]
})
export class UsersModule {}
